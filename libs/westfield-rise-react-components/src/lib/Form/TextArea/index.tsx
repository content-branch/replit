import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import classNames from 'classnames';

import styles from './TextArea.module.scss';

type TextAreaProps = {
  label: string;
  errorMessages?: string[];
  id: string;
  placeholder: string;
  required?: boolean;
  errors?: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
  register: UseFormRegister<any>;
};
export const TextArea = ({
  label,
  errorMessages,
  id,
  placeholder,
  required,
  errors,
  register,
}: TextAreaProps) => {
  return (
    <div className={styles.text_area}>
      <label htmlFor={id} className={styles.text_area__label}>
        {label}
      </label>
      <textarea
        className={classNames(
          styles.text_area__input,
          errors?.[id] ? styles.text_area__input__has_error : '',
        )}
        id={id}
        placeholder={placeholder}
        required={required}
        {...register(id)}
      />
      {/*error field*/}
      {errors?.[id] && (
        <div className={styles.text_area__error}>
          {(errorMessages && (errors?.[id]?.type === "invalid_string" ? errorMessages[1] : errorMessages[0])) ?? ((errors?.[id]?.message as string) ?? ' ')}
        </div>
      )}
    </div>
  );
};

TextArea.defaultProps = {
  required: false,
};
