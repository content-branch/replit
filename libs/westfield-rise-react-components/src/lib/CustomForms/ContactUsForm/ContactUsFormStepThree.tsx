import React,{ useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import classnames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { contactUsFormSchemaStep3 } from './schema';
import Button from '../../Button/Button';
import { SelectWithCheckboxGroup } from '../../Form/SelectWithCheckboxGroup';
import { defaultCountryOptions } from "../common-consts";

import type { ContactUsStepProps } from "../types";

import formStyles from '../../Form/Form.module.scss'
import styles from './ContactUsForm.module.scss';
import textStyles from '../../styles/text-styles.module.scss';

export const ContactUsFormStepThree = ({
  onPrevious,
  onSubmit,
  defaultValues,
  formElements,
}: ContactUsStepProps) => {

  const { ...methods } = useForm({
    resolver: zodResolver(contactUsFormSchemaStep3),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  const {
    getValues,
    handleSubmit,
    formState: { errors },
    control
  } = methods;

  const countryOptions =
    formElements?.countries?.options ?? defaultCountryOptions;
   
  return (
    <div
      className={classnames(
        formStyles.form__step,
        styles.contact_form__step__four,
      )}
    >
      <h3 className={textStyles['heading-3']}>
        {formElements?.formSteps?.options?.[2].description ??
          'Country of interest'}
      </h3>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit, err => {
            console.log(getValues());
            console.log(err);
          })}
        >
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
