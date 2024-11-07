import { NextApiRequest, NextApiResponse } from 'next';
import { getRobotsTxtData } from '@westfield-rise/westfield-rise-contentful-client';

export default async function RobotsTxt(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  // making sure we cache the response for at least 30 minutes
  const secondsInThirtyMinutes = 30 * 60;
  const secondsInFifteenMinutes = 15 * 60;

  // it is a text file
  res.setHeader('Content-Type', 'text/plain');

  res.setHeader(
    'Cache-Control',
    `public, max-age=${secondsInThirtyMinutes}, s-maxage=${secondsInThirtyMinutes}, stale-while-revalidate=${secondsInFifteenMinutes}`,
  );

  // fetching all seo data from contentful with an async generator
  for await (const page of getRobotsTxtData()) {
    res.write(`User-agent: *\n${page.disallowedFiles}\n\n`);
    res.write(`User-agent: *\n${page.allowedFiles}\n\n`);
    res.write(`Sitemap: ${process.env.PUBLIC_ROOT_URL}/sitemap.xml\n`);
  }

  res.end();
}
