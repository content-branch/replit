import { createServerSideHelpers } from '@trpc/react-query/server';
import {
  appRouter,
  createTRPCContext,
} from '@westfield-rise/westfield-rise-trpc-server';

import superjson from 'superjson';

export const getHelpers = (context: any) => {
  return createServerSideHelpers({
    router: appRouter,
    ctx: createTRPCContext(context),
    transformer: superjson,
  });
};
