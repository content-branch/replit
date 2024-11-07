import * as zod from 'zod';
export const ecrmFormSchemaStep1 = zod.object({
  firstName: zod.string().nonempty({ message: 'First name is required' }),
  lastName: zod.string().nonempty({ message: 'Last name is required' }),
  jobTitle: zod.string().default(''),
  companyName: zod.string().nonempty({ message: 'Company name is required' }),
  agreeWithTerms: zod.boolean().refine(v => {
    return v === true;
  }),
});

export const ecrmFormSchemaStep2 = zod.object({
  industries: zod.array(zod.record(zod.string().min(1), zod.boolean())).refine(
    values => {
      return values.some(v => Object.values(v)[0] === true);
    },
    { message: 'Please select at least one industry' },
  ),
});

export const ecrmFormSchemaStep3 = zod.object({
  countries: zod.array(zod.string()).refine(
    values => {
      return values && values.length > 0;
    },
    { message: 'Please select at least one country' },
  ),
});

export const ecrmFormSchemaStep4 = zod.object({
  services: zod.array(zod.record(zod.string().min(1), zod.boolean())).refine(
    values => {
      return values.some(v => Object.values(v)[0] === true);
    },
    { message: 'Please select at least one service' },
  ),
});

export const ecrmFormSchema = ecrmFormSchemaStep1
  .merge(ecrmFormSchemaStep2)
  .merge(ecrmFormSchemaStep3)
  .merge(ecrmFormSchemaStep4);

export type ECRMFormSchema = zod.infer<typeof ecrmFormSchema>;
