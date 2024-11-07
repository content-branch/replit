import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import {
  getFullPageBySlug,
  getComponentById,
  globalSettingsBySlug,
  getComponentByType,
  getComponentBySlug,
  getFilters,
  getPaginatedFilteredList,
  getLinkedEntities,
  fallbackLocale,
  getEntitiesByIds
} from '@westfield-rise/westfield-rise-contentful-client';

export const pagesRouter = createTRPCRouter({
  page: publicProcedure
    .input(z.object({
      slug: z.string(),
      locale: z.string().optional().default(fallbackLocale),
    }))
    .query(({ ctx, input }) => {
      return getFullPageBySlug(input.slug,input.locale, ctx.draftMode)
    } ),
  component: publicProcedure
    .input(
      z.object({
        entryId: z.string(),
        locale: z.string().optional().default('en-US'),
      }),
    ) // or whatever your input schema is
    .query(({ ctx, input }) => getComponentById(input.entryId, input.locale,
      ctx.draftMode)),
  globalSettings: publicProcedure
    .input(
      z.object({
        key: z.string(),
        locale: z.string().optional().default('en-US'),
      }),
    )
    .query(({ ctx, input }) =>
      globalSettingsBySlug(input.key, input.locale, ctx.draftMode),
    ),
  componentByType: publicProcedure
    .input(z.object({ contentType: z.string() }))
    .query(({ ctx, input }) =>
      getComponentByType({ contentType: input.contentType, preview: ctx.draftMode}),
    ),
  componentBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
        contentType: z.string(),
        include: z.number().optional(),
        locale: z.string().optional().default('en-US'),
      }),
    )
    .query(({ ctx, input }) => {
      return  getComponentBySlug({
        slug: input.slug,
        contentType: input.contentType,
        include: input.include,
        locale: input.locale,
        preview: ctx.draftMode
      })
    } ),
    getFilters: publicProcedure
    .input(
      z.object({
        contentType: z.string(),
        locale: z.string().optional().default('en-US'),
        limit: z.number().optional(),
        skip: z.number().optional(),
        orderField: z.string().optional(),
        sortDirection: z.string().optional(),
        include: z.number(),
        filters: z.array(z.object({
          field: z.string(),
          value: z.union([z.string(), z.number(), z.boolean(), z.null()]).optional(),
          exists: z.boolean().optional(),
          isUnion: z.boolean().optional(),
        })).optional(),
      }))
    .query(({ ctx, input }) =>
      getFilters({
        contentType: input.contentType,
        locale: input.locale,
        limit: input.limit,
        skip: input.skip,
        orderField: input.orderField,
        sortDirection: input.sortDirection,
        include: input.include,
        filters: input.filters,
        preview: ctx.draftMode
      }),
    ),
  getPaginatedFilteredList: publicProcedure
    .input(
      z.object({
        contentType: z.string(),
        locale: z.string().optional().default('en-US'),
        limit: z.number().optional(),
        skip: z.number().optional(),
        orderField: z.string().optional(),
        sortDirection: z.string().optional(),
        include: z.number(),
        order: z.array(z.string()).optional(),
        filters: z.array(z.object({
          field: z.string(),
          value: z.union([z.string(), z.number(), z.boolean(), z.null()]).optional(),
          exists: z.boolean().optional(),
          isUnion: z.boolean().optional(),
        })).optional(),
      }))
    .query(({ ctx, input }) =>
      getPaginatedFilteredList({
        contentType: input.contentType,
        locale: input.locale,
        limit: input.limit,
        skip: input.skip,
        orderField: input.orderField,
        order: input.order,
        sortDirection: input.sortDirection,
        include: input.include,
        filters: input.filters,
        preview: ctx.draftMode
      }),
    ),
  getLinkedEntities: publicProcedure
    .input(
      z.object({
        contentType: z.string(),
        entryIds: z.array(z.string()),
      }),
    )
    .query(({ ctx, input }) =>
      getLinkedEntities({
        contentType: input.contentType,
        entryIds: input.entryIds,
        preview: ctx.draftMode
      }),
    ),
  getEntitiesByIds: publicProcedure
    .input(
      z.object({
        entryIds: z.array(z.string()),
        locale: z.string().default(fallbackLocale)
      }),
    )
    .query(({ ctx, input }) =>
      getEntitiesByIds({
        entryIds: input.entryIds,
        locale: input.locale,
        preview: ctx.draftMode
      }),
    ),
 
});
