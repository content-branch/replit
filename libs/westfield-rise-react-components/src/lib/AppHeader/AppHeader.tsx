// libs/shared-ui/src/lib/AppHead.tsx
import React from 'react';
import Head from 'next/head';
import Navigation from '../Navigation/Navigation';

import logoNavBar from '../assets/img/logo-nav-bar.png';
import { StaticImageData } from 'next/image';

interface AppHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  // TODO: add proper type
  headerProps?: any;
  definedLocales: any;
  locale: string;
  prefix: string;
}

const logo: StaticImageData = logoNavBar as unknown as StaticImageData;
const organisationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Westfield Rise',
  logo: `https://www.westfieldrise.com${logo.src}`,
};

export function AppHeader(props: AppHeadProps) {
  const { headerProps, definedLocales, locale, prefix } = props;

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json"   dangerouslySetInnerHTML={{
          __html: JSON.stringify(organisationStructuredData),
        }}>
        
        </script>
      </Head>
      {headerProps && (
        <Navigation
          {...headerProps}
          definedLocales={definedLocales}
          locale={locale}
          prefix={prefix}
        />
      )}
    </div>
  );
}

export default AppHeader;
