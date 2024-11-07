import {
  contentfulDeliveryClient,
  refreshAllClients,
} from './contentful-initializer';
import { EntryCollection } from 'contentful';
import { IPageFields } from '../../@types/generated/contentful';

const getPagesBatchWithNoIndex = async ({
  skip = 0,
  limit = 100,
}: {
  skip: number;
  limit: number;
}): Promise<EntryCollection<IPageFields>> => {
  return await contentfulDeliveryClient.getEntries<IPageFields>({
    skip,
    limit,
    include: 2,
    content_type: 'page',
    'fields.seoMetadata.sys.contentType.sys.id': 'seoMetaTags',
    'fields.seoMetadata.fields.hidePageFromSearchEnginesNoindex': true,
  });
};

/**
 * This function will return an async generator that will yield all pages with noindex set to true
 * @returns {AsyncGenerator<{url: string, noindex: boolean, nofollow: boolean}>}
 * @example
 * for await (const page of getRobotsTxtData()) {
 *  if (page.noindex) {
 *  res.write(`User-agent: *\nDisallow: /${page.url}\n\n`);
 *  }
 *  }
 */
export async function* getRobotsTxtData(): AsyncGenerator<{
  url: string;
  noindex: boolean;
  nofollow: boolean;
  disallowedFiles?: string[];
  allowedFiles?: string[];
}> {
  await refreshAllClients();
  let skip = 0;
  const limit = 1000; // set this to a value that will not exceed the contentful api limit

  let pagesWithNoIndex = await getPagesBatchWithNoIndex({ skip, limit });
  if (pagesWithNoIndex.total === 0) {
    return;
  }

  function* yieldPages(pagesWithNoIndex: EntryCollection<IPageFields>) {
    for (const page of pagesWithNoIndex.items) {
      // TODO: update after checking if it works
      const disallowedFiles: any = [];
      const allowedFiles: any = ['fonts/', '_next/'];
      const mappedDisallowedFiles = disallowedFiles
        .map((file: any) => `Disallow
        : /${file}`)
        .join('\n');
      const mappedAllowedFiles = allowedFiles
        .map((file: any) => `Allow: /${file}`)
        .join('\n');

      yield {
        url: page.fields.slug,
        noindex:
          page?.fields?.seoMetadata?.fields.hidePageFromSearchEnginesNoindex ??
          false,
        nofollow:
          page?.fields?.seoMetadata?.fields
            .excludeLinksFromSearchRankingsNofollow ?? false,
        disallowedFiles: mappedDisallowedFiles,
        allowedFiles: mappedAllowedFiles,
      };
    }
  }

  yield* yieldPages(pagesWithNoIndex);

  while (pagesWithNoIndex.total > skip + limit) {
    skip += limit;
    pagesWithNoIndex = await getPagesBatchWithNoIndex({ skip, limit });
    yield* yieldPages(pagesWithNoIndex);
  }
}
