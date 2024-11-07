//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

// const withBundleAnalyzer = require('@next/bundle-analyzer');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
    deviceSizes: [360, 768, 1280, 1920]
  },
  env: {
    NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT ||  process.env.ENV_TYPE === 'production' ? 'master' : 'preprod'
  },
  productionBrowserSourceMaps: false,
  publicRuntimeConfig: {
    publicRootURL: process.env.PUBLIC_ROOT_URL || 'http://localhost:4200',
    ENV_TYPE: process.env.ENV_TYPE || 'production',
  },
  // this is the best practice when you want to add other types of responses than html for non static elements
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  // withBundleAnalyzer({ enabled: true }),
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
