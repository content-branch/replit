import { createNextApiHandler } from "@trpc/server/adapters/next";

import { createTRPCContext, appRouter } from "@westfield-rise/westfield-rise-trpc-server";
import { env } from "../../../env.mjs";
import { draftMode } from "next/dist/client/components/headers";
import { NextApiRequest, NextApiResponse } from "next";


// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
        console.error(
          `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
        );
      }
      : undefined,
  responseMeta(opts) {
    const { ctx, paths, errors, type } = opts;
    

    // List of procedures you want to cache
    const proceduresToCache = ['page', 'component','globalSettings','componentByType',
    'componentBySlug','getEntitiesByIds'];

    // Check if any of the paths match your procedures to cache
    const shouldCache = paths ? paths.some(path => proceduresToCache.includes(path)) : false;

    // checking that no procedures errored
    const allOk = errors.length === 0;
    // checking we're doing a query request
    const isQuery = type === 'query';
    const context = ctx as any;
    if (context?.res && shouldCache && allOk && isQuery && ctx?.draftMode == false) {
      // cache request for 5 minutes + revalidate once every second
      const ONE_DAY_IN_SECONDS = 300;
      console.log('Caching request for 5 minutes');
      return {
        headers: {
          'cache-control': `s-maxage=10, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
        },
      };
    }
    return {};
  },
});
