import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import classnames from 'classnames';
import { ecrmFormSchemaStep1 } from './schema';
import type { ECRMFormStepProps } from '../types';
import { Input } from '../../Form/Input';
import { Button } from '../../Button/Button';
import { Checkbox } from '../../Form/Checkbox';

import styles from '../ContactUsForm/ContactUsForm.module.scss';
import textStyles from '../../styles/text-styles.module.scss';
import formStyles from '../../Form/Form.module.scss';

export const ECRMFormStep1 = ({
  onSubmit,
  defaultValues,
  formElements,
}: ECRMFormStepProps) => {
  const { ...methods } = useForm({
    resolver: zodResolver(ecrmFormSchemaStep1),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  return (
    <div
      className={classnames(formStyles.form__step, styles.ecrm_form__step__one)}
    >
      <h3 className={textStyles['heading-3']}>{formElements?.formSteps?.options?.[0]?.description ?? 'About you'}</h3>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={formStyles.form__step__form_row}>
            <Input
              label={formElements?.firstName?.label ?? 'First name'}
              placeholder={formElements?.firstName?.placeholder ?? 'First name'}
              errorMessages={formElements?.firstName?.errorMessages ?? []}
              id={'firstName'}
              required
              register={register}
              errors={errors}
            />
            <Input
              label={formElements?.lastName?.label ?? 'Last name'}
              placeholder={formElements?.lastName?.placeholder ?? 'Last name'}
              errorMessages={formElements?.lastName?.errorMessages ?? []}
              id={'lastName'}
              required
              errors={errors}
              register={register}
            />
          </div>
          <div className={formStyles.form__step__form_row}>
            <Input
              label={formElements?.jobTitle?.label ?? 'Job title (Optional)'}
              placeholder={formElements?.jobTitle?.placeholder ?? 'Job title'}
              errorMessages={formElements?.jobTitle?.errorMessages ?? []}
              id={'jobTitle'}
              errors={errors}
              register={register}
            />
            <Input
              label={formElements?.companyName?.label ?? 'Company name'}
              placeholder={
                formElements?.companyName?.placeholder ?? 'Company name'
              }
              errorMessages={formElements?.companyName?.errorMessages ?? []}
              id={'companyName'}
              required
              errors={errors}
              register={register}
            />
          </div>
          <div className={formStyles.form__step__form_row}>
            <Checkbox
              label={
                formElements?.agreeWithTerms?.label ??
                `Agree to vitae ullamcorper turpis. Praesent ultricies urna non dui congue, sit amet semper diam finibus eu urna suscipi. See Terms & Conditions’s`
              }
              errorMessages={formElements?.agreeWithTerms?.errorMessages ?? []}
              id={'agreeWithTerms'}
              errors={errors}
              register={register}
              required={true}
            />
          </div>
          {formElements?.legalInformation && <div dangerouslySetInnerHTML={{ __html: formElements?.legalInformation?.label }} style={{ fontSize: "14px", fontWeight: "lighter" }}></div>}
          <div className={formStyles.form__step__form_row}>
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
