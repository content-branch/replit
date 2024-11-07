import { ECRMForm } from './index';
import { Meta } from '@storybook/react';
import styles from './styles.module.scss';
import { ECRMFormStep1 } from './ECRMFormStep1';
import { ECRMFormStep2 } from './ECRMFormStep2';
import { ECRMFormStep3 } from './ECRMFormStep3';
import { ECRMFormStep4 } from "./ECRMFormStep4";

export default {
  title: 'Form/ECRMForm',
  component: ECRMForm,
} as Meta<typeof ECRMForm>;

export const ECRMFormAllSteps = () => <ECRMForm />;

export const ECRMFormStepOneComponent = () => (
  <div className={styles.ecrm_form}>
    {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
    <ECRMFormStep1 onSubmit={() => {}} />
  </div>
);

export const ECRMFormStepTwoComponent = () => (
  <div className={styles.ecrm_form}>
    {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
    <ECRMFormStep2 onSubmit={() => {}} />
  </div>
);

export const ECRMFormStepThreeComponent = () => (
  <div className={styles.ecrm_form}>
    {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
    <ECRMFormStep3 onSubmit={() => {}} />
  </div>
);

export const ECRMFormStepFourComponent = () => (
  <div className={styles.ecrm_form}>
    {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
    <ECRMFormStep4 onSubmit={() => {}} />
  </div>
);
