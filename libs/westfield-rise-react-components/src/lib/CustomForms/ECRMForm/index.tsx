import styles from './styles.module.scss';
import { ProgressBar } from '../../ProgressBar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

import { ecrmDefaultFormElements, ecrmFormSteps } from './consts';
import { ECRMFormStep1 } from './ECRMFormStep1';
import { MessageCard } from '../../MessageCard';
import { ECRMFormStep2 } from './ECRMFormStep2';
import { ECRMFormStep3 } from './ECRMFormStep3';
import { ECRMFormStep4 } from './ECRMFormStep4';
import { ECRMFormSchema } from './schema';
import { FormElement } from '../../Form/Form.types';
import { globalSettingsBySlug } from '@westfield-rise/westfield-rise-contentful-client';

type ECRMFormProps = {
  formElements?: {
    [key: string]: FormElement;
  };
  onSubmit?: (data: ECRMFormSchema) => void;
  locale?: string;
};

type Message = {
  title: string;
  message: string;
};

export const ECRMForm = ({
  onSubmit,
  formElements = ecrmDefaultFormElements,
  locale
}: ECRMFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({} as ECRMFormSchema);
  const [message, setMessage] = useState<Message>();

  useEffect(() => {
    async function awaitContent() {
      const response = await globalSettingsBySlug(
        'thank-you-message', locale,
      );
      setMessage(JSON.parse(response));
    }
    awaitContent();
  }, []);

  const debouncedSubmit = useCallback(
    debounce(async (data: ECRMFormSchema) => {
      await onSubmit?.(data);
    }, 300), // 300ms debounce time
    [onSubmit]
  );

  const onFormSubmit = (data: ECRMFormSchema) => {
    debouncedSubmit(data);
  };

  const steps = useMemo(
    () =>
      (formElements?.formSteps?.options?.map(step => {
        return step.label;
      }) as string[]) ?? ecrmFormSteps,
    [formElements],
  );

  return (
    <div className={styles.ecrm_form}>
      {currentStep < 5 && (
        <ProgressBar steps={steps} currentStep={currentStep} />
      )}
      {currentStep === 1 && (
        <ECRMFormStep1
          formElements={formElements}
          onSubmit={data => {
            setFormData({ ...formData, ...data });
            setCurrentStep(2);
          }}
          defaultValues={formData}
        />
      )}
      {currentStep === 2 && (
        <ECRMFormStep2
          formElements={formElements}
          onSubmit={data => {
            setFormData({ ...formData, ...data });
            setCurrentStep(3);
          }}
          onPrevious={() => setCurrentStep(1)}
          defaultValues={formData}
        />
      )}
      {currentStep === 3 && (
        <ECRMFormStep3
          formElements={formElements}
          onSubmit={data => {
            setFormData({ ...formData, ...data });
            setCurrentStep(4);
          }}
          onPrevious={() => setCurrentStep(2)}
          defaultValues={formData}
        />
      )}
      {currentStep === 4 && (
        <ECRMFormStep4
          formElements={formElements}
          onSubmit={data => {
            const newData = { ...formData, ...data, locale };
            setFormData(newData);
            onFormSubmit(newData);
            setCurrentStep(5);
          }}
          onPrevious={() => setCurrentStep(3)}
          defaultValues={formData}
        />
      )}
      {currentStep === 5 && (
        <MessageCard message={message?.message} title={message?.title} />
      )}
    </div>
  );
};
