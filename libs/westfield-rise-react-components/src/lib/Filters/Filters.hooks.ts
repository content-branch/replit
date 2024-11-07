import { FieldValues, useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { FilterGroup, FilterOption } from './Filters.types';

export const useFilters = ({
  filterGroups,
  onSubmit,
}: {
  filterGroups: FilterGroup[];
  onSubmit?: (data: FieldValues) => void;
}) => {
  // form hook
  const { setValue, getValues, reset, handleSubmit, register } = useForm();

  // form submit
  const onFormSubmit = useCallback(
    (data: FieldValues) => {
      onSubmit?.(data);
    },
    [onSubmit],
  );

  // checkbox ids
  const createFilterCheckboxId = useCallback(
    (groupIndex: number, option: FilterOption) =>
      `filters.${groupIndex}.${option.id ?? option.value}`,
    [],
  );

  const createAllId = useCallback(
    (groupIndex: number) => `filters.${groupIndex}.all`,
    [],
  );

  /**
   *
   * @description when all is checked, we check all the checkboxes
   *
   * @param e - react change event
   * @param groupIndex - index of the group
   */
  const onAllChecked = (
    e: React.ChangeEvent<HTMLInputElement>,
    groupIndex: number,
  ) => {
    const filterGroup = filterGroups[groupIndex];
    if (e.target.checked) {
      filterGroup.options?.forEach(option => {
        const checkboxId = createFilterCheckboxId(groupIndex, option);
        setValue(checkboxId, true);
      });
    } else {
      filterGroup.options?.forEach(option => {
        const checkboxId = createFilterCheckboxId(groupIndex, option);
        setValue(checkboxId, false);
      });
    }
  };

  /**
   *
   * @description when one checkbox is checked we check if all others are checked and we check the all checkbox
   *
   *
   * @param e - react change event
   * @param groupIndex - index of the group
   *
   */
  const onOneChecked = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, groupIndex: number) => {
      const allId = createAllId(groupIndex);
      if (!e.target.checked) {
        setValue(allId, false);
      }
      // checking if all others are checked so we set the all to checked
      const filterGroup = filterGroups[groupIndex];
      const allChecked =
        filterGroup?.options?.every(option => {
          const checkboxId = createFilterCheckboxId(groupIndex, option);
          return getValues(checkboxId);
        }) ?? false;
      if (allChecked) {
        setValue(allId, true);
      }
    },
    [createAllId, filterGroups, setValue, createFilterCheckboxId, getValues],
  );

  return {
    register,
    onFormSubmit,
    createAllId,
    createFilterCheckboxId,
    onAllChecked,
    onOneChecked,
    form: {
      handleSubmit,
      reset,
      register,
    },
  };
};
