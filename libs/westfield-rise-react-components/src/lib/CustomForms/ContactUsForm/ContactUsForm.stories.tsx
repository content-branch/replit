import { ContactUsForm } from './index';
import { Meta } from '@storybook/react';
import { ContactUsFormStepOne } from './ContactUsFormStepOne';
import { ContactUsFormStepTwo } from './ContactUsFormStepTwo';
import { ContactUsFormStepThree } from './ContactUsFormStepThree';
import styles from './ContactUsForm.module.scss';
import { ContactUsFormStepFour } from './ContactUsFormStepFour';

export default {
  title: 'Form/ContactUsForm',
  component: ContactUsForm,
} as Meta<typeof ContactUsForm>;

export const ContactFormAllSteps = () => <ContactUsForm />;

export const ContactUsFormStepOneComponent = () => (
  <div className={styles.contact_form}>
    {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
    <ContactUsFormStepOne onSubmit={() => {}} />
  </div>
);

export const ContactUsFormStepTwoComponent = () => (
  <div className={styles.contact_form}>
    {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
    <ContactUsFormStepTwo onSubmit={() => {}} />
  </div>
);

export const ContactUsFormStepThreeComponent = () => (
  <div className={styles.contact_form}>
    {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
    <ContactUsFormStepThree onSubmit={() => {}} />
  </div>
);

export const ContactUsFormStepFourComponent = () => (
  <div className={styles.contact_form}>
    {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
    <ContactUsFormStepFour onSubmit={() => {}} />
  </div>
);
