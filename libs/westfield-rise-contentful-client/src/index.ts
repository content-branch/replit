import { refreshAllClients } from './lib/contentful-initializer';

async function start() {
  await refreshAllClients();
}

start();

export { refreshAllClients };
export * from './lib/westfield-rise-contentful-client';
export { getSitemapData } from './lib/sitemap';
export { getRobotsTxtData } from './lib/robots';
export * from '../@types/generated/contentful.d';
export type { LocalizedPageFields } from "./lib/types";
export type { LocalizedData } from "./lib/types";
export * from './lib/locale-utils';