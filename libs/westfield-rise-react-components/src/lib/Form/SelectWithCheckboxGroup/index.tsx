import { ChangeEvent, useState } from 'react';
import { Controller } from 'react-hook-form';
import classnames from 'classnames';
import customInputStyles from '../../styles/custom-form-elements-classes.module.scss';
import styles from './SelectWithCheckboxGroup.module.scss';
import { DropDownArrowIcon } from '../../Icons/DropDownArrowIcon';
import { CheckBoxIcon } from '../../Icons/CheckBoxIcon';
import { CloseIcon } from '../../Icons/CloseIcon';

type SelectWithCheckboxOption = {
  label?: string;
  value: string;
};

type SelectWithCheckboxGroupProps = {
  id: string;
  options: SelectWithCheckboxOption[];
  required?: boolean;
  label: string;
  errorMessages?: string[];
  message?: string;
  control?: any;
  errors?: any;
  initialSelectedOptions?: string[];
};

export const SelectWithCheckboxGroup = ({
  id,
  options,
  label,
  errorMessages,
  required,
  control,
  errors,
  message,
  initialSelectedOptions
}: SelectWithCheckboxGroupProps) => {

  const [selectedOptions, setSelectedOptions] = useState<SelectWithCheckboxOption[]>(
    getSelectedOptionsFromInitialSelectedOptions(initialSelectedOptions, options));

  const [dropdownOpened, setDropdownOpened] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpened(opened => !opened);
  };

  return (
    <div className={styles.select_with_checkbox_group}>
      <label
        className={styles.select_with_checkbox_group__label}
        htmlFor={id}
        onClick={toggleDropdown}
      >
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      {errors && (errors[id]?.message || errors[id]?.root.message) && (
        <div className={styles.select_with_checkbox_group__error}>
          {(errorMessages && errorMessages[0]) ?? ((errors?.[id]?.message as string) ?? ' ')}
        </div>
      )}
      <Controller
        name={id}
        control={control}
        render={({ field }) => {
          const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
            const { checked, value } = e.target;
            const selectedOptionsSet = new Set(
              selectedOptions.sort((a, b) => {
                const aValue = a.label || a.value;
                const bValue = b.label || b.value;
                return aValue.localeCompare(bValue);
              }),
            );
            const validOption = options.find(o => o.value === value);
            if (checked && validOption) {
              selectedOptionsSet.add(validOption);
            }

            if (!checked && validOption) {
              selectedOptionsSet.delete(validOption);
            }
            setSelectedOptions(Array.from(selectedOptionsSet));
            field.onChange(Array.from(selectedOptionsSet).map(o => o.value));
          };

          const handleOptionsClear = () => {
            setSelectedOptions([]);
            field.onChange([]);
          };

          const handleRemoveOption = (option: {
            value: string;
            label?: string;
          }) => {
            const selectedOptionsSet = new Set(selectedOptions.sort());
            selectedOptionsSet.delete(option);
            setSelectedOptions(Array.from(selectedOptionsSet));
            field.onChange(Array.from(selectedOptionsSet).map(o => o.value));
          };

          return (
            <>
              <div className={styles.select_with_checkbox_group__dropdown}>
                <div
                  className={styles.select_with_checkbox_group__message}
                  onClick={toggleDropdown}
                >
                  {message}
                  {dropdownOpened ? (
                    <DropDownArrowIcon transform={'rotate(180)'} />
                  ) : (
                    <DropDownArrowIcon />
                  )}
                </div>
                {dropdownOpened && (
                  <div
                    className={classnames(
                      styles.select_with_checkbox_group__options,
                    )}
                  >
                    {options.map(option => {
                      const optionId = `${option.value}`;
                      return (
                        <div
                          key={optionId}
                          className={styles.select_with_checkbox_group__option}
                        >
                          <input
                            type={'checkbox'}
                            id={optionId}
                            value={option.value}
                            onChange={handleOptionChange}
                            checked={
                              selectedOptions.includes(option) ?? false
                            }
                            className={customInputStyles.custom_checkbox}
                          />
                          <label htmlFor={optionId}>
                            <CheckBoxIcon />
                            {option.label || option.value}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {!dropdownOpened && (
                <div
                  className={
                    styles.select_with_checkbox_group__selected_options
                  }
                >
                  {selectedOptions?.map(option => {
                    return (
                      <div
                        key={option.value}
                        className={
                          styles.select_with_checkbox_group__selected_options__option
                        }
                      >
                        {option.label || option.value}
                        <span
                          className={
                            styles.select_with_checkbox_group__selected_options__option__remove
                          }
                          onClick={() => handleRemoveOption(option)}
                        >
                          <CloseIcon />
                        </span>
                      </div>
                    );
                  }) ?? ''}
                  {selectedOptions?.length > 0 && (
                    <div
                      onClick={handleOptionsClear}
                      className={
                        styles.select_with_checkbox_group__selected_options__clear_button
                      }
                    >
                      Clear all
                    </div>
                  )}
                </div>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

SelectWithCheckboxGroup.defaultProps = {
  required: false,
  message: 'Select...',
};

function getSelectedOptionsFromInitialSelectedOptions(initialSelectedOptions: string[] = [], options: SelectWithCheckboxOption[]):
  SelectWithCheckboxOption[] | (() => SelectWithCheckboxOption[]) {
  if (initialSelectedOptions.length < 0)
    return [];
  return options.filter(o => initialSelectedOptions.includes(o.value));
}

