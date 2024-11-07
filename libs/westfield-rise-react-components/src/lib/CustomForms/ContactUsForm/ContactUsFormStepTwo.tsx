import { zodResolver } from '@hookform/resolvers/zod';
import classnames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';
import { PhoneNumberUtil } from 'google-libphonenumber';

import { contactUsFormSchemaStep2 } from './schema';
import { Input } from '../../Form/Input';
import Button from '../../Button/Button';
import type { ContactUsStepProps } from '../types';
import {
  defaultOptIntoMarketingOptions,
} from './consts';
import { RadioGroup } from '../../Form/RadioGroup';
import { defaultServicesOptions } from '../common-consts';

import formStyles from '../../Form/Form.module.scss';
import styles from './ContactUsForm.module.scss';
import textStyles from '../../styles/text-styles.module.scss';
import { CheckboxList } from '../../Form/CheckboxList';

export const ContactUsFormStepTwo = ({
  onPrevious,
  onSubmit,
  defaultValues,
  formElements,
}: ContactUsStepProps) => {
  const { ...methods } = useForm({
    resolver: zodResolver(contactUsFormSchemaStep2),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  const {
    getValues,
    handleSubmit,
    register,
    formState: { errors },
    setError
  } = methods;

  const servicesOptions =
    formElements?.services?.options ?? defaultServicesOptions;

  const optIntoMarketingOptions =
    formElements?.optIntoMarketing?.options ?? defaultOptIntoMarketingOptions;

  return (
    <div
      className={classnames(
        formStyles.form__step,
        styles.contact_form__step__one,
      )}
    >
      <h3 className={textStyles['heading-3']}>{formElements?.formSteps?.options?.[1].description ??
        'Services you are interested in'}</h3>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(data => {
            if (data.phone) {
              const phoneUtil = PhoneNumberUtil.getInstance();

              try {
                const number = phoneUtil.parseAndKeepRawInput(data.phone);
                if (!phoneUtil.isValidNumber(number)) {
                  setError('phone', {
                    type: 'manual',
                    message:  formElements?.phone?.errorMessages ? formElements?.phone?.errorMessages[0]: 'Invalid phone number',
                  });
                  return;
                }
              } catch (err) {
                setError('phone', {
                  type: 'manual',
                  message: formElements?.phone?.errorMessages ? formElements?.phone?.errorMessages[0]: 'Invalid phone number',
                });
                return;
              }
            }
            onSubmit(data)
          }, err => {
            console.log(getValues());
            console.log(err);
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
            <Input
              label={formElements?.email?.label ?? 'Email'}
              placeholder={formElements?.email?.placeholder ?? 'Email'}
              errorMessages={formElements?.email?.errorMessages ?? []}
              id={'email'}
              required
              register={register}
              errors={errors}
            />
            <Input
              label={formElements?.phone?.label ?? 'Phone (Optional)'}
              placeholder={formElements?.phone?.placeholder ?? 'Phone'}
              id={'phone'}
              register={register}
              errorMessages={formElements?.phone?.errorMessages ?? []}
              errors={errors}
            />
          </div>
          <div className={formStyles.form__step__form_row}>
            <RadioGroup
              label={
                formElements?.optIntoMarketing?.label ?? 'Opt into marketing'
              }
              errorMessages={formElements?.optIntoMarketing?.errorMessages ?? []}
              id={'marketingOptIn'}
              options={optIntoMarketingOptions}
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
