import * as zod from 'zod';

export const contactUsFormSchemaStep1 = zod.object({
  firstName: zod.string().nonempty({ message: 'First name is required' }),
  lastName: zod.string().nonempty({ message: 'Last name is required' }),
  jobTitle: zod.string().default(''),
  companyName: zod.string().nonempty({ message: 'Company name is required' }),
});

export const contactUsFormSchemaStep2 = zod.object({
  services: zod.array(zod.record(zod.string().min(1), zod.boolean())).refine(
    values => {
      return values.some(v => Object.values(v)[0] === true);
    },
    { message: 'Please select at least one service' },
  ),
  email: zod
    .string()
    .nonempty({ message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  phone: zod.string(),
  marketingOptIn: zod.any().refine(
    v => {
      return v === 'yes' || v === 'no';
    },
    {
      message: 'Please select an option',
    },
  ),
});

export const contactUsFormSchemaStep3 = zod.object({
  countries: zod.array(zod.string()).refine(
    values => {
      return values && values.length > 0;
    },
    { message: 'Please select at least one country' },
  ),
});

export const contactUsFormSchemaStep4 = zod.object({
  description: zod
    .string()
    .max(500, { message: 'Message must be less than 500 characters' }),
});
export const contactUsFormSchema = contactUsFormSchemaStep1
  .merge(contactUsFormSchemaStep2)
  .merge(contactUsFormSchemaStep3)
  .merge(contactUsFormSchemaStep4);

export type ContactFormSchema = zod.infer<typeof contactUsFormSchema>;
