import { Locale } from 'contentful';
import { defaultPrefixToLocalesMap, fallbackLocale } from '@westfield-rise/westfield-rise-contentful-client';


export const getValidUrlPrefixAndLocale = async ({
  definedLocales,
  context,
}: {
  context: any; // NextPageContext
  definedLocales: Locale[];
}) => {
  const {
    params: { slug },
  } = context;

  const parsedPrefixToLocalesMap =
    definedLocales.reduce(
      (
        acc: Record<string, string[]>,
        locale: {
          code: string;
        },
      ) => {
        const prefix = locale.code.split('-')[0];
        if (!prefix) {
          return acc;
        }
        acc[prefix] = acc[prefix] || [];
        acc[prefix].push(locale.code);
        return acc;
      },
      {} as Record<string, string[]>,
    ) || undefined;

  const prefixToLocalesMap =
    parsedPrefixToLocalesMap ?? defaultPrefixToLocalesMap;

  if (!slug) {
    return {
      prefix: '',
      url: '/',
      locale: fallbackLocale,
    };
  }

  const rawPrefix = slug[0];
  if (!prefixToLocalesMap[rawPrefix]) {
    return {
      prefix: '',
      url: slug ? slug.join('/') : '/',
      locale: fallbackLocale,
    };
  }

  const prefix = rawPrefix;
  const url = slug.slice(1)?.join('/') || '/';

  return {
    prefix,
    url,
    locale: prefixToLocalesMap[prefix],
  };
};
