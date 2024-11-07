import { Meta, StoryFn } from '@storybook/react';
import { ProgressBar } from './index';

export default {
  title: 'ProgressBarWithSteps',
  component: ProgressBar,
} as Meta<typeof ProgressBar>;

const Template: StoryFn<typeof ProgressBar> = args => {
  return (
    <div
      style={{
        width: '90%',
        margin: '0 auto',
      }}
    >
      <ProgressBar {...args} />
    </div>
  );
};

export const ProgressBarWithStepsComponent = Template.bind({});
ProgressBarWithStepsComponent.args = {
  currentStep: 1,
  steps: ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'],
};
