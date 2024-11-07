import { ContactFormSchema } from './schema';
import { FormElement } from '../../Form/Form.types';

export type ContactUsFormProps = {
  formElements?: {
    [key: string]: FormElement;
  };
  onSubmit?: (data: ContactFormSchema) => void;
  setHideTitle: (hideTitle: boolean) => void;
  locale?: string;
};
