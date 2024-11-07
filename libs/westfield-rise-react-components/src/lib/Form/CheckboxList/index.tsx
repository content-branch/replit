import { UseFormRegister } from 'react-hook-form';
import type { CheckBoxProps } from '../Form.types';

import styles from './CheckboxList.module.scss';
import { Checkbox } from '../Checkbox';

type CheckboxListProps = {
  label: string;
  errorMessages?: string[];
  id: string;
  register?: UseFormRegister<any>;
  options: CheckBoxProps[];
  errors?: any;
};

export const CheckboxList = ({
  label,
  errorMessages,
  id,
  register,
  options,
  errors,
}: CheckboxListProps) => {
  return (
    <div className={styles.checkbox_list}>
      <label className={styles.checkbox_list__label} htmlFor={id}>
        {label}
      </label>
      {errors && (errors[id]?.message || errors[id]?.root.message) && (
        <div className={styles.checkbox_list__error}>
          {(errorMessages && errorMessages[0]) ?? ((errors?.[id]?.message as string) ?? ' ')}
        </div>
      )}
      <div className={styles.checkbox_list__options}>
        {options.map((option, index) => {
          const optionId = `${id}.${index}.${option.id ?? option.value}`;
          return (
            <Checkbox
              {...option}
              key={optionId}
              id={optionId}
              label={option.label ?? option.value}
              errors={errors}
              register={register}
            />
          );
        })}
      </div>
    </div>
  );
};
