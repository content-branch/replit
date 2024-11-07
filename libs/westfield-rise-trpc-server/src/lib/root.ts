import { createTRPCRouter } from './trpc';
import { pagesRouter } from './routers/pages';
import { apiRouter } from './routers/backend/backend';
import { configRouter } from './routers/config';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  pages: pagesRouter,
  backend: apiRouter,
  config: configRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
