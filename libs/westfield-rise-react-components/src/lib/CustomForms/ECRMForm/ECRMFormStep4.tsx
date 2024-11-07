import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import classnames from 'classnames';
import type { ECRMFormStepProps } from '../types';
import { ecrmFormSchemaStep4 } from './schema';
import { Button } from '../../Button/Button';
import { CheckboxList } from '../../Form/CheckboxList';
import { defaultServicesOptions } from '../common-consts';

import styles from '../ContactUsForm/ContactUsForm.module.scss';
import textStyles from '../../styles/text-styles.module.scss';
import formStyles from '../../Form/Form.module.scss';

export const ECRMFormStep4 = ({
  onSubmit,
  onPrevious,
  defaultValues,
  formElements,
}: ECRMFormStepProps) => {
  const { ...methods } = useForm({
    resolver: zodResolver(ecrmFormSchemaStep4),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const servicesOptions =
    formElements?.services?.options ?? defaultServicesOptions;

  return (
    <div
      className={classnames(formStyles.form__step, styles.ecrm_form__step__one)}
    >
      <h3 className={textStyles['heading-3']}>
        {formElements?.formSteps?.options?.[3].description ??
          'Services you are interested in'}
      </h3>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit, err => {
            console.log(
              'ECRMFormStep4.tsx: ECRMFormStep4: onSubmit: err: ',
              err,
            );
          })}
        >
          <div className={formStyles.form__step__form_row}>
            <CheckboxList
              label={formElements?.services?.label ?? 'Services'}
              errorMessages={formElements?.services?.errorMessages ?? []}
              id={'services'}
              options={servicesOptions}
              register={register}
              errors={errors}
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
