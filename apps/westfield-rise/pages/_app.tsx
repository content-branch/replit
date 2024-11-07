import { AppProps } from 'next/app';
import Link from 'next/link';
import { StaticImageData } from 'next/image';
import { EnvironmentContext } from '@westfield-rise/westfield-rise-react-components';
import { CustomImage } from '@westfield-rise/westfield-rise-react-components';
import { api } from '../utils/api';

import SEOWrapper from '../components/SEOWrapper';
import dynamic from 'next/dynamic';

import './global.css';

const LinkWrapper = ({
  href,
  children,
  isExternal,
  prefix,
  prefetch = true,
}: {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
  prefix?: string;
  prefetch?: boolean;
}) => {
  return isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link
      prefetch={prefetch}
      href={
        prefix !== '' && prefix !== undefined
          ? '/' + prefix + '/' + href.replace(/^\/+(.*)$/, '$1')
          : href
      }
    >
      {children}
    </Link>
  );
};

const ImageWrapper = ({
  src,
  width,
  height,
  alt,
  children = null,
}: {
  src: string | StaticImageData;
  width?: number | undefined;
  height?: number | undefined;
  alt: string;
  children?: React.ReactNode;
}) => {
  return <CustomImage src={src} width={width} height={height} alt={alt} />;
};

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <EnvironmentContext.Provider
      value={{ Link: LinkWrapper, Image: ImageWrapper, SEO: SEOWrapper }}
    >
      <Component {...pageProps} />
    </EnvironmentContext.Provider>
  );
}

export default api.withTRPC(CustomApp);