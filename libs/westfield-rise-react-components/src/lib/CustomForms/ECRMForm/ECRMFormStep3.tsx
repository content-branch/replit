import { ECRMFormStepProps } from '../types';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ecrmFormSchemaStep3 } from './schema';
import classnames from 'classnames';
import styles from '../ContactUsForm/ContactUsForm.module.scss';
import textStyles from '../../styles/text-styles.module.scss';
import formStyles from '../../Form/Form.module.scss';
import Button from '../../Button/Button';
import { defaultCountryOptions } from '../common-consts';
import { SelectWithCheckboxGroup } from '../../Form/SelectWithCheckboxGroup';

export const ECRMFormStep3 = ({
  onSubmit,
  onPrevious,
  defaultValues,
  formElements,
}: ECRMFormStepProps) => {
  const { ...methods } = useForm({
    resolver: zodResolver(ecrmFormSchemaStep3),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  const {
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = methods;

  const countryOptions =
    formElements?.countries?.options ?? defaultCountryOptions;

  return (
    <div
      className={classnames(formStyles.form__step, styles.ecrm_form__step__one)}
    >
      <h3 className={textStyles['heading-3']}>
        {formElements?.formSteps?.options?.[2].description ??
          'Country of interest'}
      </h3>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={formStyles.form__step__form_row}>
            <SelectWithCheckboxGroup
              id={'countries'}
              label={formElements?.countries?.label ?? 'Country'}
              errorMessages={formElements?.countries?.errorMessages ?? []}
              required
              options={countryOptions}
              control={control}
              errors={errors}
              message={
                formElements?.countries?.placeholder ?? 'Select country...'
              }
              initialSelectedOptions={getValues('countries')}
            />
          </div>
          <div className={formStyles.form__step__form_row}>
            <Button
              variant={'default'}
              label={formElements?.previous?.label ?? 'Previous'}
              onClick={onPrevious}
              style={'secondary' as const}
            />
            <Button
              variant={'default'}
              type={'submit'}
              label={formElements?.next?.label ?? 'Next'}
              style={'primary' as const}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
