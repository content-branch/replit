import { Input } from './index';
import { Meta, StoryFn } from '@storybook/react';
export default {
  title: 'Form',
  component: Input,
  parameters: {
    type: 'text',
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = args => <Input {...args} />;

export const InputComponent = Template.bind({});
InputComponent.args = {
  label: 'Name',
  placeholder: 'Enter your name',
  type: 'text',
}
