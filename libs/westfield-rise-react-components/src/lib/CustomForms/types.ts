import { ContactFormSchema } from './ContactUsForm/schema';
import type { FormElementOption } from '../Form/Form.types';
import { ECRMFormSchema } from './ECRMForm/schema';

export type FormStepProps = {
  onPrevious?: () => void;
  formElements?: {
    [key: string]: {
      label: string;
      placeholder?: string;
      errorMessages?: string[];
      options?: FormElementOption[];
    };
  };
};

export type ContactUsStepProps = FormStepProps & {
  defaultValues?: ContactFormSchema;
  onSubmit: (data: ContactFormSchema) => void;
};

export type ECRMFormStepProps = FormStepProps & {
  defaultValues?: ECRMFormSchema;
  onSubmit: (data: ECRMFormSchema) => void;
};
