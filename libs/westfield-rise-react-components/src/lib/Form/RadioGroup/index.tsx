import { UseFormRegister } from 'react-hook-form';
import type { CheckBoxProps } from '../Form.types';
import styles from './RadioGroup.module.scss';
import customInputStyles from '../../styles/custom-form-elements-classes.module.scss';
import classnames from 'classnames';

type RadioGroupProps = {
  label: string;
  errorMessages?: string[];
  id: string;
  register?: UseFormRegister<any>;
  options: CheckBoxProps[];
  errors?: any;
  selected?: string;
  handleChange?: any;
};

export const RadioGroup = ({
  label,
  errorMessages,
  id,
  register,
  options,
  errors,
  selected,
  handleChange,
}: RadioGroupProps) => {

  return (
    <div className={styles.radio_group}>
      {label && (
        <label htmlFor={id} className={styles.radio_group__label}>
          {label}
        </label>
      )}
      {errors && errors[id]?.message && (
        <div className={styles.radio_group__error}>
          {(errorMessages && errorMessages[0]) ?? ((errors?.[id]?.message as string) ?? ' ')}
        </div>
      )}
      <div className={styles.radio_group__options}>
        {options.map((option, index) => {
          return (
            <div className={styles.radio_group__option} key={option.value}>
              <input
                className={classnames(
                  styles.radio_group__option__input,
                  customInputStyles.custom_radio,
                )}
                name={id}
                id={id + '_' + index}
                type={'radio'}
                {...(register && register(id))}
                value={option.value}
                {...(selected ? { checked: selected === option.value } : {})}
                onChange={handleChange ? handleChange : () => undefined}
              />
              <label
                className={styles.radio_group__option__label}
                htmlFor={id + '_' + index}
              >
                {option.label ?? option.value}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
