import {
  IPageFields,
  ISeoMetaTagsFields,
} from '@westfield-rise/westfield-rise-contentful-client';


type UseRenderingDataProps = {
  url: string;
  locale: string;
  pageFields: IPageFields;
};
export const UseRenderingData = ({ pageFields }: UseRenderingDataProps) => {

  const pageTheme = pageFields?.theme ?? 'canary';

  return {
    bodyItems: pageFields.body as unknown as any[],
    pageTheme,
    seoMetadata: pageFields.seoMetadata?.fields as ISeoMetaTagsFields,
  };
};

export default UseRenderingData;
