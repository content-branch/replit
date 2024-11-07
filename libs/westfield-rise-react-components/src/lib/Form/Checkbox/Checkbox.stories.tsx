import { Checkbox } from './index';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Form',
  component: Checkbox,
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = args => {
  return <Checkbox {...args} />;
};
export const CheckboxComponentSimple = Template.bind({});

CheckboxComponentSimple.args = {
  label: 'I wish to receive marketing communications from Westfield',
  variant: 'simple',
};

export const CheckboxComponentOutlined = Template.bind({});

CheckboxComponentOutlined.args = {
  label: 'I wish to receive marketing communications from Westfield',
  variant: 'outlined',
};
