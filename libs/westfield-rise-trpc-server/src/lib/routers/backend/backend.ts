import { createTRPCRouter, publicProcedure } from '../../trpc';
import { z } from 'zod';
import { createDoubleOptInContactHandler } from '@westfield-rise/westfield-rise-backend-handlers';
import { sendEmailHandler } from '@westfield-rise/westfield-rise-backend-handlers';
import { CREATE_DOUBLE_OPT_IN_CONTACT_COMMAND } from '@westfield-rise/westfield-rise-backend-utils';
import createDoubleOptInContact from './createDoubleOptinContact';
import { getMarketInbox, createHtmlEmailBody, getRedirectUrl, getMailingList } from '../../utils';
import * as httpErrors from 'http-errors';

export const apiRouter = createTRPCRouter({
  createDoubleOptInContact,
  contactUs: publicProcedure
    .input(
      z.object({
        firstName: z.string().nonempty({ message: 'First name is required' }),
        lastName: z.string().nonempty({ message: 'Last name is required' }),
        jobTitle: z.string().optional(),
        companyName: z
          .string()
          .nonempty({ message: 'Company name is required' }),
        services: z.array(z.record(z.string().min(1), z.boolean())).refine(
          values => {
            return values.some(v => Object.values(v)[0] === true);
          },
          { message: 'Please select at least one service' },
        ),
        email: z
          .string()
          .nonempty({ message: 'Email is required' })
          .email({ message: 'Invalid email address' }),
        phone: z.string().optional(),
        marketingOptIn: z.any().refine(
          v => {
            return v === 'yes' || v === 'no';
          },
          {
            message: 'Please select an option',
          },
        ),
        countries: z.array(z.string()).refine(
          values => {
            return values && values.length > 0;
          },
          { message: 'Please select at least one country' },
        ),
        description: z
          .string()
          .max(500, { message: 'Message must be less than 500 characters' })
          .default(''),
        hostName: z.string().optional(),
        countryElements: z.any().optional(),
        locale: z.string().default("en-US"),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        if (input.marketingOptIn === 'yes') {
          const mailingList: number[] = getMailingList(input.countries);
          const redirectUrl = await getRedirectUrl(input.locale);

          await createDoubleOptInContactHandler({
            type: CREATE_DOUBLE_OPT_IN_CONTACT_COMMAND,
            data: {
              email: input.email,
              attributes: {
                ...input,
              },
              locale: input.locale,
              redirectUrl: redirectUrl,
              mailingList
            },
          });
        }

        const marketInbox = await getMarketInbox(input.countries);
        const emailBody = createHtmlEmailBody(input);

        await sendEmailHandler({
          marketInbox: marketInbox,
          hostName: input.hostName,
          emailBody: emailBody,
        });
      } catch (err: any) {
        console.error(`Error sending email: ${err.message}`);
        // Create and throw a tRPC-compatible HTTP error
        throw httpErrors.InternalServerError(err.response?._body?.message);
      }
    }),
});
