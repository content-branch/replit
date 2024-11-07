import { zodResolver } from '@hookform/resolvers/zod';
import classnames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { contactUsFormSchemaStep4 } from './schema';
import Button from '../../Button/Button';
import type { ContactUsStepProps } from "../types";

import formStyles from '../../Form/Form.module.scss';
import styles from './ContactUsForm.module.scss';
import textStyles from '../../styles/text-styles.module.scss';
import { TextArea } from '../../Form/TextArea';

export const ContactUsFormStepFour = ({
  onPrevious,
  onSubmit,
  defaultValues,
  formElements,
}: ContactUsStepProps) => {
  const { ...methods } = useForm({
    resolver: zodResolver(contactUsFormSchemaStep4),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  const {
    getValues,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  return (
    <div
      className={classnames(
        formStyles.form__step,
        styles.contact_form__step__one,
      )}
    >
      <h3 className={textStyles['heading-3']}>
        {formElements?.formSteps?.options?.[3].description ?? 'Would you like to tell us more'}
      </h3>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit, err => {
            console.log(getValues());
            console.log(err);
          })}
        >
          <div className={formStyles.form__step__form_row}>
            <TextArea
              label={
                formElements?.description?.label ?? 'Description (Optional)'
              }
              errors={errors}
              errorMessages={formElements?.description?.errorMessages ?? []}
              id={'description'}
              placeholder={
                formElements?.description?.placeholder ?? 'Enter a Description'
              }
              register={register}
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
