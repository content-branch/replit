import { createTRPCRouter, publicProcedure } from '../trpc';
import { getLocales } from '@westfield-rise/westfield-rise-contentful-client';

export const configRouter = createTRPCRouter({
  locales: publicProcedure.query(async () => {
    const locales=   await getLocales(false);

    return locales.items
  }),
});
