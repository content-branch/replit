import { ECRMFormStepProps } from '../types';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ecrmFormSchemaStep2 } from './schema';
import classnames from 'classnames';
import styles from '../ContactUsForm/ContactUsForm.module.scss';
import textStyles from '../../styles/text-styles.module.scss';
import formStyles from '../../Form/Form.module.scss';
import Button from '../../Button/Button';
import { CheckboxList } from '../../Form/CheckboxList';
import { defaultIndustries } from '../common-consts';

export const ECRMFormStep2 = ({
  onSubmit,
  onPrevious,
  defaultValues,
  formElements,
}: ECRMFormStepProps) => {
  const { ...methods } = useForm({
    resolver: zodResolver(ecrmFormSchemaStep2),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const industriesOptions =
    formElements?.industries?.options ?? defaultIndustries;

  return (
    <div
      className={classnames(formStyles.form__step, styles.ecrm_form__step__one)}
    >
      <h3 className={textStyles['heading-3']}>
        {formElements?.formSteps?.options?.[1].description ??
          'Industries you are interested in'}
      </h3>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={formStyles.form__step__form_row}>
            <CheckboxList
              label={formElements?.industries?.label ?? 'Industries'}
              errorMessages={formElements?.industries?.errorMessages ?? []}
              id={'industries'}
              options={industriesOptions}
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
