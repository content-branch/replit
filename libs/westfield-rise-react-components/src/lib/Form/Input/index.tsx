import { useId } from 'react';
import formStyles from '../Form.module.scss';
import styles from './InputText.module.scss';
import classNames from 'classnames';
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';

type InputProps = {
  label: string;
  placeholder: string;
  errorMessages?: string[];
  type?: HTMLInputElement['type'];
  id: string;
  errors?: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
  register?: UseFormRegister<any>;
  required?: boolean;
};

export const Input = ({
  label,
  placeholder,
  errorMessages,
  type = 'text',
  id,
  required = false,
  errors,
  register,
}: InputProps) => {
  const generatedId = useId();
  if (!id) {
    id = generatedId;
  }
  return (
    <div
      key={id}
      className={styles.field_input__wrapper}
      onClick={() => {
        const input = document.getElementById(id);
        if (input) {
          input.focus();
        }
      }}
    >
      <label htmlFor={id} className={styles.field_input__label}>
        {label}
        {required && <span className={styles.is_required}>*</span>}
      </label>
      <div
        className={classNames(
          styles.field_input__input_wrapper,
          errors?.[id] ? styles.field_input__input_wrapper__has_error : '',
        )}
      >
        <input
          id={id}
          type={type}
          className={styles.field_input__input}
          placeholder={placeholder}
          {...(register && register(id, { required }))}
        />
      </div>
      {/*error field*/}
      {errors?.[id] && (
        <div className={formStyles.field_input__error}>
          {(errorMessages && (errors?.[id]?.type === "invalid_string" ? errorMessages[1] : errorMessages[0])) ?? ((errors?.[id]?.message as string) ?? ' ')}
        </div>
      )}
    </div>
  );
};
