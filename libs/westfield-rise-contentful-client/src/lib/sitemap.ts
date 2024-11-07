import {
  contentfulDeliveryClient,
  refreshAllClients,
} from './contentful-initializer';
import { EntryCollection } from 'contentful';
import { IPageFields } from '../../@types/generated/contentful';
import dayjs from 'dayjs';

const getSitemapDatabatch = async ({
  skip = 0,
  limit = 100,
}: {
  skip: number;
  limit: number;
}) => {
  return await contentfulDeliveryClient.getEntries<IPageFields>({
    skip,
    limit,
    include: 2,
    content_type: 'page',
    select: ['fields.slug', 'sys.updatedAt'],
  });
};

export async function* getSitemapData() {
  await refreshAllClients();
  let skip = 0;
  const limit = 1000; // set this to a value that will not exceed the contentful api limit
  const entries = await getSitemapDatabatch({ skip, limit });

  if (entries.total === 0) {
    return;
  }

  function* yieldPages(entries: EntryCollection<IPageFields>) {
    for (const page of entries.items) {
      yield {
        loc: page.fields.slug,
        lastmod: dayjs(page.sys.updatedAt).format('YYYY-MM-DD'),
      };
    }
  }

  yield* yieldPages(entries);
  while (entries.total > skip + limit) {
    skip += limit;
    const batch = await getSitemapDatabatch({
      skip,
      limit,
    });
    yield* yieldPages(batch);
  }
}
