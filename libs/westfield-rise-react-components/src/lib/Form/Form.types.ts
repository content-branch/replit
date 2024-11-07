export type CheckBoxProps = {
  variant?: 'simple' | 'outlined';
  label?: string;
  value: string;
  id?: string;
};

export type FormElement = {
  label: string;
  placeholder?: string;
  options?: FormElementOption[];
  errorMessages?: string[];
  description?: string;
};

export type FormElementOption = {
  label?: string;
  id?: string;
  value: string;
  description?: string;
};
