import { Accordion, AccordionItem } from '@szhsin/react-accordion';

import { FilterGroup, FilterSorting } from './Filters.types';
import { ReactComponent as IconChevronDown } from '../assets/svg/icon-chevron-down-btn.svg';
import { CheckBoxIcon } from '../Icons/CheckBoxIcon';

import '../styles/accordionStyles.scss';
import styles from './Filters.module.scss';
import { Checkbox } from '../Form/Checkbox';
import Button from '../Button/Button';
import { useFilters } from './Filters.hooks';

type RotationStates = {
  [key: string]: {
    checkboxId: string;
    direction: 'asc' | 'desc';
  };
};

export type FiltersProps = {
  title: string;
  sorting: FilterSorting;
  filterGroups: FilterGroup[];
  onSubmit?: (data: {
    [key: string]: string | boolean | number | undefined;
  }) => void;
  rotationStates: RotationStates;
  setRotationStates: React.Dispatch<React.SetStateAction<RotationStates>>;
  selectedCheckbox?: string;
  setSelectedCheckbox?: React.Dispatch<React.SetStateAction<string>>;
};

type FilterAccordionItemProps = {
  title: string;
  index: number;
  children?: React.ReactNode;
};

const FilterAccordionItem = ({
  title,
  index,
  ...rest
}: FilterAccordionItemProps) => {
  return (
    <AccordionItem
      {...rest}
      header={
        <>
          <div className={styles.filter__group__title}>
            <span className="text">
              {title}
              <CheckBoxIcon className={styles.hidden_icon} />
            </span>
          </div>
          <IconChevronDown className="chevron-down" />
        </>
      }
    />
  );
};

/**
 * @description Filters component.
 * @description Renders a form with checkboxes and a submit button.
 * @description Uses react-hook-form for form management. Uses Accordion component for filter groups. Uses Checkbox component for checkboxes. Uses Button component for submit and clear buttons. Uses useFilters hook for form management.
 *
 * @description OnSubmit function is called with form data when form is submitted. Sample data:
 *
 * ```json
 * {
 *     "sorting": [
 *         {
 *             "sort1": false
 *         }
 *     ],
 *     "filters": [
 *         {
 *             "all": false,
 *             "option1": false,
 *             "option2": true
 *         },
 *         {
 *             "all": false,
 *             "option3": true,
 *             "option4": true,
 *             "option5": false
 *         }
 *     ]
 * }
 * ```
 *
 * @param title - title of the filters
 * @param sorting - sorting options
 * @param filterGroups - array of filter groups. Filter option SHOULD NOT contain the "all" option.
 * @param onSubmit - function to be called when form is submitted with form data
 *
 */
export const Filters = ({
  title,
  sorting,
  filterGroups,
  onSubmit,
  rotationStates,
  setRotationStates,
  setSelectedCheckbox,
  selectedCheckbox,
}: FiltersProps) => {
  const {
    onOneChecked,
    createFilterCheckboxId,
    onAllChecked,
    createAllId,
    form: { register, reset, handleSubmit },
    onFormSubmit,
  } = useFilters({
    filterGroups,
    onSubmit,
  });

  const handleCheckboxChange = (id: any) => {
    if (setSelectedCheckbox) {
      setSelectedCheckbox(id);
    }
  };

  const handleSortChange = (checkboxId: string) => {
    setRotationStates(prevRotationStates => {
      const currentRotation =
        prevRotationStates[checkboxId]?.direction || 'asc';
      const newRotation = currentRotation === 'asc' ? 'desc' : 'asc';

      const newRotationStates: RotationStates = {};

      newRotationStates[checkboxId] = {
        checkboxId,
        direction: newRotation,
      };

      return newRotationStates;
    });
  };
  return (
    <div className={styles.filters}>
      <div className={styles.filters__title}>{title}</div>
      <form
        id={title}
        onSubmit={handleSubmit(onFormSubmit)}
        className={styles.form}
      >
        <Accordion
          title={''}
          transition
          transitionTimeout={250}
          allowMultiple
          className={styles.accordion}
        >
          {sorting && sorting.fields.length > 0 && (
            <FilterAccordionItem
              key={'sorting'}
              title={sorting.title}
              index={-1}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  id={sorting?.fields[0].id}
                  key={sorting?.fields[0].id}
                  label={sorting?.fields[0].label}
                  variant={'simple'}
                  register={register}
                  onChange={() => handleCheckboxChange(sorting?.fields[0].id)}
                  checked={selectedCheckbox === sorting?.fields[0].id}
                />
                <div
                  onClick={() => handleSortChange(sorting?.fields[0].id)}
                  style={{
                    transform:
                      rotationStates[sorting?.fields[0].id]?.direction ===
                      'desc'
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)',
                    transition: 'transform 0.3s',
                    cursor: 'pointer',
                  }}
                >
                  ↑
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  id={sorting?.fields[1].id}
                  key={sorting?.fields[1].id}
                  label={sorting?.fields[1].label}
                  variant={'simple'}
                  register={register}
                  onChange={() => handleCheckboxChange(sorting?.fields[1].id)}
                  checked={selectedCheckbox === sorting?.fields[1].id}
                />
                <div
                  onClick={() => handleSortChange(sorting?.fields[1].id)}
                  style={{
                    transform:
                      rotationStates[sorting?.fields[1].id]?.direction ===
                      'desc'
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)',
                    transition: 'transform 0.3s',
                    cursor: 'pointer',
                  }}
                >
                  ↑
                </div>
              </div>
            </FilterAccordionItem>
          )}
          {filterGroups?.map((filterGroup, index) => {
            const allId = createAllId(index);
            return (
              <FilterAccordionItem
                key={index}
                title={filterGroup.title}
                index={index}
              >
                <Checkbox
                  id={allId}
                  label={'All'}
                  variant={'simple'}
                  register={register}
                  onChange={e => onAllChecked(e, index)}
                />
                <div className={styles.filter__options_wrapper}>
                  {filterGroup.options.map(option => {
                    const checkboxId = createFilterCheckboxId(index, option);
                    return (
                      <Checkbox
                        id={checkboxId}
                        key={checkboxId}
                        label={option.label}
                        variant={'simple'}
                        register={register}
                        onChange={e => {
                          onOneChecked(e, index);
                        }}
                      />
                    );
                  })}
                </div>
              </FilterAccordionItem>
            );
          }) ?? ''}
        </Accordion>
        <div className={styles.filters__actions}>
          {/* TODO: apply the onSubmit propely upon reset */}
          <Button
            variant={'default'}
            label={'Clear'}
            style={'secondary'}
            onClick={() => {
              reset();
              if (setSelectedCheckbox) {
                setSelectedCheckbox('');
              }
              // onFormSubmit?.({});
            }}
          />
          <Button
            variant={'default'}
            type={'submit'}
            label={'Apply'}
            style={'primary'}
          />
        </div>
      </form>
    </div>
  );
};
