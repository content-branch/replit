import { useMemo } from 'react';
import { ParsedUrlQuery } from 'querystring';
import dynamic from 'next/dynamic';

import { PageBodyComponents } from '../components/PageBodyComponents';
import {
  DefaultLayout,
  SEOMetaTags as SEO,
  AppFooter,
} from '@westfield-rise/westfield-rise-react-components';

import { fallbackLocale } from '@westfield-rise/westfield-rise-contentful-client';

import { componentMapping } from '../mapping/component-mapping';
import { getValidUrlPrefixAndLocale } from '../utils/url';
import UseRenderingData from '../hooks/useRenderingData';
import { IPageFields } from '@westfield-rise/westfield-rise-contentful-client';
import { mapFooterData, mapHeaderData } from '../utils/constants';
import { getHelpers } from '../utils/serverSideHelpers';
import { api } from '../utils/api';
import ThankYouMeassge from '../components/ThankYouMessage';
import { draftMode } from 'next/dist/client/components/headers';
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  PreviewData,
} from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export type SlugParams = ParsedUrlQuery & {
  slug: string[];
};
const defaultSlug = 'homepage';
const defaultContactPageSlug =
  'page-contact-us-in-development-dont-use-as-default';

const DynamicContactUsFlow = dynamic(
  () => import('../components/ContactUsFlow'),
  { ssr: false },
);

const DynamicSubscribeToNewsletterFlow = dynamic(
  () => import(`../components/SubscribeToNewsletterFlow`),
  { ssr: false },
);

export function CatchAllPages({
  pageType: _pageType,
  url,
  contactUsPageSlug,
  definedLocales,
  locale,
  prefix,
  pageFields,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { bodyItems, pageTheme, seoMetadata } = UseRenderingData({
    url,
    locale,
    pageFields,
  });

  const { data: generalSlugConfigurationFromGlobalSettings } =
    api.pages.globalSettings.useQuery(
      {
        key: 'general-slug-configuration',
      },
      {
        select: data => JSON.parse(data),
      },
    );

  const { data: mappedHeaderMenuData } = api.pages.componentBySlug.useQuery(
    {
      slug:
        generalSlugConfigurationFromGlobalSettings?.headerMenuSlug ??
        'navigation-menu',
      contentType: 'navigationMenu',
      include: 6,
      locale,
    },
    {
      select: data => mapHeaderData(data),
      enabled: !!generalSlugConfigurationFromGlobalSettings?.headerMenuSlug,
    },
  );

  const { data: mappedFooterMenuData } = api.pages.componentBySlug.useQuery(
    {
      slug:
        generalSlugConfigurationFromGlobalSettings?.footerMenuSlug ??
        'footer-menu',
      contentType: 'footerMenu',
      locale,
    },
    {
      select: data => mapFooterData(data),
      enabled: !!generalSlugConfigurationFromGlobalSettings?.footerMenuSlug,
    },
  );
  // Transform data to match the DefaultLayout props

  const seoMetaTags = useMemo(() => {
    if (seoMetadata) {
      return componentMapping.seoMetaTags.mapEntryToProps(seoMetadata);
    }
    return null;
  }, [seoMetadata]);

  return (
    <>
      {seoMetaTags && (
        <SEO
          title={seoMetaTags?.title}
          description={seoMetaTags?.description}
          keywords={seoMetaTags?.keywords}
          noindex={seoMetaTags?.noindex}
          nofollow={seoMetaTags?.nofollow}
        />
      )}
      {url && (
        <DefaultLayout
          title={pageFields?.title}
          hasGradient={pageFields?.hasGradient ?? false}
          whiteNav={pageFields?.whiteNav ?? false}
          description={seoMetadata?.description}
          keywords={seoMetadata?.keywords}
          footer={
            <AppFooter
              prefix={undefined}
              logoText={mappedFooterMenuData?.logoText}
              mottoText={mappedFooterMenuData?.mottoText}
              copyRight={mappedFooterMenuData?.copyRight}
              linkButtonList={mappedFooterMenuData?.linkButtonList}
              socialButtonList={mappedFooterMenuData?.socialButtonList}
              socialText={mappedFooterMenuData?.socialText}
              key={'app-footer'}
            />
          }
          headerProps={mappedHeaderMenuData}
          definedLocales={definedLocales}
          locale={locale}
          prefix={prefix}
          theme={pageTheme as any}
        >
          {url === contactUsPageSlug && (
            <DynamicContactUsFlow
              key={'contact-us-flow'}
              title={pageFields?.title}
              locale={locale}
            >
              <PageBodyComponents
                locale={locale}
                prefix={prefix}
                pageTheme={pageTheme}
                bodyItems={bodyItems}
              />
            </DynamicContactUsFlow>
          )}
          {url === 'thank-you' && (
            <>
              <ThankYouMeassge locale={locale} />
            </>
          )}
          {url !== contactUsPageSlug && (
            <>
              <PageBodyComponents
                locale={locale}
                prefix={prefix}
                pageTheme={pageTheme}
                bodyItems={bodyItems}
              />
              <DynamicSubscribeToNewsletterFlow
                key={'subscribe-flow'}
                locale={locale}
              />
            </>
          )}
        </DefaultLayout>
      )}
    </>
  );
}
export default CatchAllPages;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = (async (
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>,
) => {
  const helpers = getHelpers(context);

  const definedLocales = await helpers.config.locales.fetch();
  const validUrlPrefixAndLocale = await getValidUrlPrefixAndLocale({
    context,
    definedLocales,
  });

  const { prefix, locale } = validUrlPrefixAndLocale;
  const parsedLocale =
    (Array.isArray(locale) ? locale[0] : locale) ?? fallbackLocale;
  let { url } = validUrlPrefixAndLocale;

  const generalSlugConfiguration = await helpers.pages.globalSettings.fetch({
    key: 'general-slug-configuration',
  });

  const generalSlugConfigurationFromGlobalSettings = JSON.parse(
    generalSlugConfiguration,
  );

  const contactUsPageSlug =
    generalSlugConfigurationFromGlobalSettings?.contactUsSlug ||
    defaultContactPageSlug;

  const homePageSlug =
    generalSlugConfigurationFromGlobalSettings?.homePageSlug || defaultSlug;

  if (url === '/') {
    url = homePageSlug;
  }

  const [items, _headerMenuData, _footerMenuData] = await Promise.all([
    helpers.pages.page.fetch({
      slug: url,
      locale: parsedLocale,
    }),
    helpers.pages.componentBySlug.prefetch({
      slug:
        generalSlugConfigurationFromGlobalSettings?.headerMenuSlug ??
        'navigation-menu',
      contentType: 'navigationMenu',
      include: 6,
      locale: parsedLocale,
    }),
    helpers.pages.componentBySlug.prefetch({
      slug:
        generalSlugConfigurationFromGlobalSettings?.footerMenuSlug ??
        'footer-menu',
      contentType: 'footerMenu',
      locale: parsedLocale,
    }),
  ]);

  // if (!items || items.length === 0) {
  //   return {
  //     notFound: true,
  //   };
  // }

  const pageFields = items[0].fields as unknown as IPageFields;
  console.timeEnd('Total Execution Time');
  return {
    props: {
      ...context.params,
      pageType: 'default',
      contactUsPageSlug,
      trpcState: helpers.dehydrate(),
      definedLocales: definedLocales,
      locale: parsedLocale,
      url,
      prefix,
      pageFields,
    },
    revalidate: 600, // `Revalidate every 10 minutes
  };
}) satisfies GetStaticProps<{
  pageType: string;
  url: string;
  contactUsPageSlug: string;
  definedLocales: any;
  locale: string;
  prefix: string;
  pageFields: IPageFields;
}>;
