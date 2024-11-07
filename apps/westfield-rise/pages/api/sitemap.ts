import getConfig from 'next/config';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSitemapData } from '@westfield-rise/westfield-rise-contentful-client';

export default async function Sitemap(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    publicRuntimeConfig: { publicRootURL },
  } = getConfig();

  res.setHeader('Content-Type', 'text/xml');

  res.write(`<?xml version="1.0" encoding="UTF-8"?>`);
  res.write(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`);

  for await (const page of getSitemapData()) {
    res.write(`
      <url>
        <loc>${publicRootURL}/${page.loc}</loc>
        <lastmod>${page.lastmod}</lastmod>
      </url>
    `);
  }

  // closing tags
  res.write(`</urlset>`);
  res.end();
}
