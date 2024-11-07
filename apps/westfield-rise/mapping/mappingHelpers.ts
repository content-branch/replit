import { EntryCollection } from 'contentful';
import { get } from 'http';

export const getCategories = (originalList: any[]) => {
  if (!originalList) return null;

  return originalList
    .map((item: any) => ({
      title: item.fields?.title || null,
      internalName: item.fields?.internalName || null,
      parentCategoryTitle: item.fields?.parentCategory?.fields?.title || null,
      parentCategoryInternalName:
        item.fields?.parentCategory?.fields?.internalName || null,
    }))
    .filter((item: any) => Object.values(item).every(value => value !== null));
};

const trauncateFractionAndFormat = (
  parts: { type: any; value: any }[],
  digits: number,
) => {
  return parts
    .map(({ type, value }) => {
      if (type !== 'fraction' || !value || value.length < digits) {
        return value;
      }

      let retVal = '';
      for (
        let idx = 0, counter = 0;
        idx < value.length && counter < digits;
        idx++
      ) {
        if (value[idx] !== '0') {
          counter++;
        }
        retVal += value[idx];
      }
      return retVal;
    })
    .reduce((string, part) => string + part);
};

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 10,
});

function getValueToDisplay({
  prefix,
  value,
  suffix,
}: {
  prefix: string;
  value: string;
  suffix: string;
}) {
  if (!prefix) prefix = '';

  if (!suffix) suffix = '';

  const trunctedFormattedNumber = trauncateFractionAndFormat(
    formatter.formatToParts(Number(value)),
    2,
  );
  return `${prefix}${trunctedFormattedNumber}${suffix}`.trim();
}

export function getMappedItem({
  item,
  contentTypeToFilter,
  pages,
}: {
  item: any;
  contentTypeToFilter: string;
  pages?: EntryCollection<any>;
}) {
  switch (contentTypeToFilter) {
    case 'caseStudy':
      return getMappedCaseStudies(item, pages);
    case 'newsAndInsight':
      return getMappedInsightCard(item);
    default:
      return getMappedListCard(item);
  }
}

export const getMappedCaseStudies = (
  item: any,
  pages?: EntryCollection<any>,
) => {
  const statisticsList = item.fields.statisticsList?.fields?.statisticsList;
  const firtStatisticItem =
    statisticsList && statisticsList.length > 0 ? statisticsList[0] : null;
  const title = firtStatisticItem ? firtStatisticItem.fields.text : null;
  const value = firtStatisticItem ? firtStatisticItem.fields.value : null;
  const prefix = firtStatisticItem
    ? firtStatisticItem.fields.valuePrefix
    : null;
  const suffix = firtStatisticItem
    ? firtStatisticItem.fields.valueSuffix
    : null;
  const valueToDisplay = getValueToDisplay({ prefix, value, suffix });
  const imageSrc = item.fields.image?.fields?.file?.url
    ? 'https://' + item.fields.image?.fields?.file?.url
    : null;
  const imageAlt = item.fields.image?.fields?.title;
  const text = item.fields.pageKeyInformation?.fields?.text;
  const brandName = item.fields.pageKeyInformation?.fields?.brandName;
  const type = 'case-study';
  const categories = getCategories(item.fields?.category);

  const page = pages?.items?.find((pageItem: any) => {
    return pageItem.fields.body.some(
      (bodyItem: any) => bodyItem.sys.id === item.sys.id,
    );
  });

  if (!title || !imageSrc || !imageAlt || !page) {
    console.log(
      item.fields.internalTitle,
      item.sys.id,
      'is missing some required fields',
    );
    return null;
  }

  const ctaHref = page.fields.slug;
  const ctaLabel = page.fields.title;

  return {
    type,
    title,
    valueToDisplay,
    image: {
      src: imageSrc,
      alt: imageAlt,
    },
    text,
    categories,
    brandName,
    ctaProps: ctaHref && ctaLabel ? { href: ctaHref, label: ctaLabel } : null,
  };
};

export const getMappedInsightCard = (item: any) => {  
  const type = 'insight';
  const title = item.fields.title;
  const imageSrc = 'https://' + item.fields.image?.fields?.file?.url;
  const imageAlt = item.fields.image?.fields?.title;
  const slug = item.fields.callToAction?.fields?.buttonLink;
  const text = item.fields.text;

  if (!title || !imageSrc || !imageAlt) return null;

  return {
    type,
    title,
    image: {
      src: imageSrc,
      alt: imageAlt,
    },
    text,
    slug,
  };
}

export const getMappedListCard = (item: any) => {
  const type = item.fields.type;
  const title = item.fields.title;
  const text = item.fields.text;
  const imageSrc = 'https://' + item.fields.image?.fields?.file?.url;
  const imageAlt = item.fields.image?.fields?.title;
  const brandName = item.fields.brandName;
  const value = item.fields.value;
  const ctaHref = item.fields.slug;
  const ctaLabel = item.fields.title;
  const categories = getCategories(item.fields?.category);

  if (!title || !imageSrc || !imageAlt) return null;

  return {
    type,
    title,
    value,
    image: {
      src: imageSrc,
      alt: imageAlt,
    },
    text,
    brandName,
    categories,
    ctaProps: ctaHref && ctaLabel ? { href: ctaHref, label: ctaLabel } : null,
  };
};

interface CategoryMap {
  [key: string]: {
    title: string;
    options: any[];
  };
}

interface Filter {
  title: string;
  options: any[];
}

interface OutputData {
  filters: Filter[];
}

export function getMappedCategories(inputData: any[]) {
  const outputData: OutputData = {
    filters: [],
  };

  const categoryMap: CategoryMap = {};

  inputData.forEach(item => {
    const parentCategoryInternalName = item.fields.parentCategory.fields
      ?.internalName as string;
    const parentCategoryTitle = item.fields.parentCategory.fields
      ?.title as string;
    const subCategoryTitle = item.fields.title as string;
    // const subCategoryInternalName = item.fields.internalName as string;
    const id = item.sys.id as string;

    if (!categoryMap[parentCategoryInternalName]) {
      categoryMap[parentCategoryInternalName] = {
        title: parentCategoryTitle,
        options: [],
      };
    }

    categoryMap[parentCategoryInternalName]['options'].push({
      id: id,
      label: subCategoryTitle,
      value: id,
    } as any);
  });

  for (const [key, value] of Object.entries(categoryMap)) {
    outputData.filters.push(value);
  }

  return outputData.filters;
}
