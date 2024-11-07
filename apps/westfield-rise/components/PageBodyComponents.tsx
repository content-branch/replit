import { IEntry } from '@westfield-rise/westfield-rise-contentful-client';

import { contentTypeFromEntry } from '../utils/contentful';

import AsyncComponent from '../components/AsyncComponent';

interface PageBodyComponentsProps {
  bodyItems: IEntry[];
  locale: string;
  prefix: string;
  pageTheme: string;
}

export const PageBodyComponents = ({
  bodyItems,
  locale,
  prefix,
  pageTheme,
}: PageBodyComponentsProps) => {
  return (
    <>
      {bodyItems?.map(entry => {
        const contentType = contentTypeFromEntry(entry);
        const key = `${entry.sys.id}-${contentType}`;

        return (
          <AsyncComponent
            key={key}
            entry={entry}
            theme={pageTheme}
            prefix={prefix}
            contentType={contentType}
            locale={locale}
          />
        );
      })}
    </>
  );
};
