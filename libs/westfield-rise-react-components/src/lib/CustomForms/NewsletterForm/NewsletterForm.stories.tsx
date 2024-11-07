import { NewsletterForm } from './NewsletterForm';
import { Meta, StoryFn } from '@storybook/react';
export default {
  title: 'Newsletter Form',
  component: NewsletterForm,
  parameters: {
    type: 'text',
  },
} as Meta<typeof NewsletterForm>;

const Template: StoryFn<typeof NewsletterForm> = args => <NewsletterForm {...args} />;

export const Newsletter = Template.bind({});
Newsletter.args = {
    text: 'Get the latest insight and case studies',    
    placeholder: 'Enter your email',
    error: 'Please enter a valid email'
}