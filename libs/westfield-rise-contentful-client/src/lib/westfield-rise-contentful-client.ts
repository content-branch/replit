import { EntryCollection, Entry } from 'contentful';
import {
  contentfulDeliveryClient,
  refreshAllClients,
} from './contentful-initializer';
import { LocalizedData } from './types';
import {
  IBodyCopyFields,
  IPageFields,
} from '../../@types/generated/contentful';
import {
  LocalizedPageFields,
  GetFilteredListInput,
  GetPaginatedFilteredListInput,
} from './types';
import PaginatedResults from './paginatedResults'

type Task = [any, string | number, any];

function removeDocumentNodes(root: any): any {
  const stack: Task[] = [[root, -1, null]];

  while (stack.length > 0) {
    const [current, key, parent] = stack.pop() as Task;

    if (Array.isArray(current)) {
      for (let i = current.length - 1; i >= 0; i--) {
        stack.push([current[i], i, current]);
      }
    } else if (typeof current === 'object' && current !== null) {
      if (key === 'sys' || key === 'contentType') {
        for (const k of Object.keys(current)) {
          if (k !== 'id' && k !== 'contentType' && k !== 'locale') {
            delete current[k];
          }
        }
        continue;
      }

      for (const k of Object.keys(current).reverse()) {
        stack.push([current[k], k, current]);
      }
    }
  }

  return root;
}

interface SysObject {
  sys: { id: string; type: string };
}

function moveToTopById(
  objects: EntryCollection<any>,
  ids: string[],
  skip?: number,
  limit?: number,
): EntryCollection<any> {
  // Creating a copy of the array to avoid mutating the original array
  const objectsCopy = [...objects.items];

  // Iterate over the ids array in reverse order
  for (let i = ids.length - 1; i >= 0; i--) {
    // Find the index of the object where sys.id matches the current id
    const index = objectsCopy.findIndex(obj => obj.sys.id === ids[i]);

    // If the object is found and it's not already the first element
    if (index > 0) {
      // Remove the object from its current position
      const [item] = objectsCopy.splice(index, 1);
      // Insert the object at the beginning of the array
      objectsCopy.unshift(item);
    }
  }

  if (skip && limit) {
    objects.items = objectsCopy.slice(skip, skip + limit);
  } else {
    objects.items = objectsCopy.slice(0, limit);
  }
  return objects;
}

export async function getFullPageByCodename(
  contentType: any,
): Promise<EntryCollection<IPageFields>> {
  await refreshAllClients(false);
  const entries = await contentfulDeliveryClient.getEntries<IPageFields>({
    content_type: contentType, // Replace with your Content Type ID
  });
  return entries;
}

export async function fetchBodyCopy(
  contentType: string,
  preview: boolean
): Promise<EntryCollection<IBodyCopyFields>> {
  await refreshAllClients(preview);
  const entries = await contentfulDeliveryClient.getEntries<IBodyCopyFields>({
    content_type: contentType,
  });
  return entries;
}

export async function getFullPageBySlug(
  slug: string,
  locale: string,
  preview: boolean
): Promise<Entry<LocalizedData<IPageFields>>[]> {
  await refreshAllClients(preview);

  const slugLowerCase = slug.toLowerCase();

  const entries =
    await contentfulDeliveryClient.getEntries<LocalizedPageFields>({
      content_type: 'page', // Replace with your Content Type ID
      locale,
      'fields.slug': slugLowerCase,
      include: 10//default value is 1, max is 10
    });

  const { items } = entries;

  const filteredObj = removeDocumentNodes(items);

  return filteredObj;
}

export async function getComponentById(
  entryId: string,
  locale: string,
  preview: boolean
): Promise<EntryCollection<any>> {
  await refreshAllClients(preview);
  const entries = await contentfulDeliveryClient.getEntries<any>({
    'sys.id': entryId,
    locale,
    include: 10, //default value is 1, max is 10
  });
  return entries;
}

export async function globalSettingsBySlug(
  key: string,
  locale = 'en-US',
  preview = false
): Promise<string> {
  await refreshAllClients(preview);
  console.log(`key ${key}`)
  const entries = await contentfulDeliveryClient.getEntries<any>({
    'fields.key': key,
    locale,
    content_type: 'globalSettings',
  });
  return (entries?.items?.[0]?.fields?.value as unknown as string) || '';
}

export async function getComponentByType({
  contentType,
  preview
}: {
  contentType: string;
  
  preview: boolean
}): Promise<EntryCollection<any>> {
  await refreshAllClients(preview);
  const entries = await contentfulDeliveryClient.getEntries<any>({
    content_type: contentType,
  });
  return entries;
}

export async function getLocales(preview: boolean) {
  await refreshAllClients(preview);
  return await contentfulDeliveryClient.getLocales();
}

export async function getComponentBySlug({
  slug,
  contentType,
  include,
  locale = 'en-US',
  preview
}: {
  slug: string;
  contentType: string;
  include?: number;
  locale?: string;
  preview: boolean;
}): Promise<any | undefined> {
  await refreshAllClients(preview);
  const entries = await contentfulDeliveryClient.getEntries<IPageFields>({
    content_type: contentType,
    'fields.slug': slug,
    include,
    locale,
  });

  const { fields } = entries?.items?.[0] ?? {};

  return { fields };
}

export async function getFilters({
  contentType,
  locale,
  skip,
  limit,
  orderField,
  sortDirection,
  include,
  filters,
  preview
}: GetFilteredListInput): Promise<EntryCollection<any>> {
  await refreshAllClients(preview);
  
  const sortOrder = sortDirection === 'desc' ? `-${orderField}` : orderField;
  
  const query: any = {
    content_type: contentType,
    locale: locale,
    skip: skip,
    limit: limit,
    order: sortOrder,
    include: include,
  };
  
  if (filters && filters.length > 0) {
    filters.forEach(filter => {
      if (filter.exists !== undefined) {
        query[`fields.${filter.field}[exists]`] = filter.exists;
      } else if (!filter.isUnion) {
        query[`fields.${filter.field}`] = filter.value;
      }
      if (filter.isUnion) {
        query[`fields.${filter.field}[in]`] = filter.value;
      }
    });
  }  
  const entries = await contentfulDeliveryClient.getEntries(query);

  return entries;
}

export async function getPaginatedFilteredList({
  contentType,
  locale,
  skip,
  limit,
  orderField,
  order,
  sortDirection,
  include,
  filters,
  preview
}: GetPaginatedFilteredListInput): Promise<PaginatedResults<any>> {
  await refreshAllClients(preview);

  let query: any = {};

  const sortOrder = sortDirection === 'desc' ? `-${orderField}` : orderField;


  const idsQuery: any = {
    content_type: contentType,
    locale: locale,
    limit: 1000,
    order: sortOrder,
    select: 'sys.id',
  };

  applyFilter(idsQuery);

  //get id's for entries which match the filter
  const ids = await contentfulDeliveryClient.getEntries<SysObject>(idsQuery);

  if (order != undefined) {

    //order the id's based on the order field in contentful and select id's for the current page
    const orderedList = moveToTopById(ids, order, skip, limit);
    
    query = {
      content_type: contentType,
      locale: locale,
      include: include,
      order: sortOrder
    };

    query[`sys.id[in]`] = orderedList.items
      .map(function (item: Entry<any>) {
        return item.sys.id;
      })
      .toString();

    //get only the entries which match the selected id's above
    const entries = await contentfulDeliveryClient.getEntries(query);

    //re-apply order to make sure the order is what we expect
    return {
      totalResults: ids.total,
      results: moveToTopById(entries, order)
    }
  } else {
    
    query = {
      content_type: contentType,
      locale: locale,
      skip: skip,
      limit: limit,
      order: sortOrder,
      include: include,
    };
    
    applyFilter(query);

    const entries = await contentfulDeliveryClient.getEntries(query);

    return {
      totalResults: ids.total,
      results: entries
    }
  }

  function applyFilter(query: any) {
    if (filters && filters.length > 0) {
      filters.forEach(filter => {
        if (filter.exists !== undefined) {
          query[`fields.${filter.field}[exists]`] = filter.exists;
        } else if (!filter.isUnion) {
          query[`fields.${filter.field}`] = filter.value;
        }
        if (filter.isUnion) {
          query[`fields.${filter.field}[in]`] = filter.value;
        }
      });
    }
  }
}

export async function getLinkedEntities({
  contentType,
  entryIds,
  preview
}: {
  contentType: string;
  entryIds: string[];
  
  preview: boolean
}): Promise<EntryCollection<any>> {
  await refreshAllClients(preview);

  const entries = await contentfulDeliveryClient.getEntries({
    content_type: contentType,
    'links_to_entry[in]': entryIds.join(','),
  });

  return entries;
}

export async function getEntitiesByIds({
  entryIds,
  locale,
  preview
}: {
  entryIds: string[];
  locale: string;
  preview: boolean
}) {
  await refreshAllClients(preview);

  try {
    const entries = await contentfulDeliveryClient.getEntries({
      'sys.id[in]': entryIds.join(','),
      locale: locale,
      include: 10,
    });

    const { items } = entries;

    return { items };
  } catch (error) {
    console.error('Error fetching entries by IDs:', error);
    throw error;
  }
}
