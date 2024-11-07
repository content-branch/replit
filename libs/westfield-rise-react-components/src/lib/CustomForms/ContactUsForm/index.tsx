import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import { ContactUsFormStepOne } from './ContactUsFormStepOne';
import { ContactFormSchema } from './schema';
import { ContactUsFormStepTwo } from './ContactUsFormStepTwo';
import { ContactUsFormStepThree } from './ContactUsFormStepThree';
import { ContactUsFormStepFour } from './ContactUsFormStepFour';
import { ProgressBar } from '../../ProgressBar';
import { contactUsDefaultFormElements, contactUsFormSteps } from './consts';
import { MessageCard } from '../../MessageCard';
import type { ContactUsFormProps } from './ContactUsForm.types';
import styles from './ContactUsForm.module.scss';
import { globalSettingsBySlug } from '@westfield-rise/westfield-rise-contentful-client';

export type { ContactUsFormProps } from './ContactUsForm.types';

type Message = {
  title: string;
  message: string;
};

const lastStep = 5;
export const ContactUsForm = ({
  onSubmit,
  formElements = contactUsDefaultFormElements,
  setHideTitle,
  locale
  }: ContactUsFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({} as ContactFormSchema);
  const [message, setMessage] = useState<Message>();

  useEffect(() => {
    async function awaitContent() {
      const response = await globalSettingsBySlug('thank-you-message', locale, false);
      setMessage(JSON.parse(response));
    }
    awaitContent();
  }, []);

  const debouncedSubmit = useCallback(
    debounce(async (data: ContactFormSchema) => {
      console.log('ContactUsForm.tsx: ContactUsForm: onFormSubmit: data: ', data);
      await onSubmit?.(data);
    }, 300), // 300ms debounce time
    [onSubmit]
  );

  const onFormSubmit = (data: ContactFormSchema) => {
    debouncedSubmit(data);
  };

  const steps = useMemo(
    () =>
      (formElements?.formSteps?.options?.map(step => {
        return step.label;
      }) as string[]) ?? contactUsFormSteps,
    [formElements],
  );

  const formRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (formRef.current && currentStep !== 1) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (currentStep === lastStep) {
      setHideTitle(true);
    }
  };

  useEffect(() => {
    handleScroll();
  }, [currentStep]);

  return (
    <div className={styles.contact_form} ref={formRef}>
      {currentStep < lastStep && (
        <ProgressBar steps={steps} currentStep={currentStep} />
      )}
      {currentStep === 1 && (
        <ContactUsFormStepOne
          formElements={formElements}
          defaultValues={formData}
          onSubmit={data => {
            setFormData({ ...formData, ...data });
            setCurrentStep(2);
          }}
        />
      )}
      {currentStep === 2 && (
        <ContactUsFormStepTwo
          formElements={formElements}
          defaultValues={formData}
          onSubmit={data => {
            setFormData({ ...formData, ...data });
            setCurrentStep(3);
          }}
          onPrevious={() => setCurrentStep(1)}
        />
      )}
      {currentStep === 3 && (
        <ContactUsFormStepThree
          formElements={formElements}
          defaultValues={formData}
          onSubmit={data => {
            setFormData({ ...formData, ...data });
            setCurrentStep(4);
          }}
          onPrevious={() => setCurrentStep(2)}
        />
      )}
      {currentStep === 4 && (
        <ContactUsFormStepFour
          formElements={formElements}
          defaultValues={formData}
          onSubmit={data => {
            setFormData(prevFormData => {
              const updatedFormData = { ...prevFormData, ...data, locale };
              onFormSubmit(updatedFormData);
              return updatedFormData;
            });
            setCurrentStep(5);
          }}
          onPrevious={() => setCurrentStep(3)}
        />
      )}
      {currentStep === lastStep &&
        (handleScroll(),
          (<MessageCard message={message?.message} title={message?.title} />))}
    </div>
  );
};

