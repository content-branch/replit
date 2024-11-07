import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import styles from './Checkbox.module.scss';
import customInputStyles from '../../styles/custom-form-elements-classes.module.scss';
import { CheckBoxIcon } from '../../Icons/CheckBoxIcon';
import TextWithAnchorTag from '../../helpers/TextWithAnchorTag';
import classNames from 'classnames';

type CheckboxProps = {
  label: string;
  errorMessages?: string[];
  id: string;
  register?: UseFormRegister<any>;
  errors?: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
  required?: boolean;
  variant?: 'simple' | 'outlined';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  disabled?: boolean;
};

export const Checkbox = ({
  label,
  errorMessages,
  variant = 'simple',
  id,
  register,
  errors,
  onChange,
  checked,
}: CheckboxProps) => {

  return (
    <div
      className={classNames(
        styles.checkbox_wrapper,
        variant === 'simple' ? styles.checkbox_wrapper__simple : '',
      )}
    >
      <input
        type="checkbox"
        id={id}
        {...(register &&
          register(id, {
            onChange: function (e) {
              e?.target?.onChange?.(e);
              onChange?.(e);
            },
          }))}
        className={customInputStyles.custom_checkbox}
        data-testid={id}
        checked={checked}
      />
      <label htmlFor={id}>
        <CheckBoxIcon />
        <TextWithAnchorTag content={label} />
      </label>
      {errors?.[id] && (
        <div className={styles.field_input__error}>
          {(errorMessages && errorMessages[0]) ??
            (errors?.[id]?.message as string) ??
            ' '}
        </div>
      )}
    </div>
  );
};

Checkbox.defaultProps = {
  variant: 'simple',
};
