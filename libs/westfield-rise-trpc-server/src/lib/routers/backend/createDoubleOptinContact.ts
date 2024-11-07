import * as zod from 'zod';
import { z } from 'zod';
import { createDoubleOptInContactHandler } from '@westfield-rise/westfield-rise-backend-handlers';
import { CREATE_DOUBLE_OPT_IN_CONTACT_COMMAND } from '@westfield-rise/westfield-rise-backend-utils';
import { publicProcedure } from '../../trpc';
import { getMailingList, getRedirectUrl } from '../../utils';

export const createDoubleOptinInput = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  firstName: zod.string().nonempty({ message: 'First name is required' }),
  lastName: zod.string().nonempty({ message: 'Last name is required' }),
  jobTitle: zod.string().default(''),
  companyName: zod.string().nonempty({ message: 'Company name is required' }),
  agreeWithTerms: zod.boolean().refine(v => {
    return v === true;
  }),
  industries: zod.array(zod.record(zod.string().min(1), zod.boolean())).refine(
    values => {
      return values.some(v => Object.values(v)[0] === true);
    },
    { message: 'Please select at least one industry' },
  ),
  countries: zod.array(zod.string()).refine(
    values => {
      return values && values.length > 0;
    },
    { message: 'Please select at least one country' },
  ),
  services: zod.array(zod.record(zod.string().min(1), zod.boolean())).refine(
    values => {
      return values.some(v => Object.values(v)[0] === true);
    },
    { message: 'Please select at least one service' },
  ),
  locale: zod.string().default('en-US')
});

export const mutation = async ({
  input,
}: {
  input: zod.infer<typeof createDoubleOptinInput>;
}) => {
  const mailingList: number[] = getMailingList(input.countries);
  const redirectUrl = await getRedirectUrl(input.locale);

  return createDoubleOptInContactHandler({
    type: CREATE_DOUBLE_OPT_IN_CONTACT_COMMAND,
    data: {
      email: input.email,
      mailingList,
      attributes: {
        ...input,
      },
      locale: input.locale,
      redirectUrl: redirectUrl,
    },
  });
};

export default publicProcedure.input(createDoubleOptinInput).mutation(mutation);


