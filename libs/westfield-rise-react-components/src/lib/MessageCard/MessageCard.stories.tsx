import { Meta, StoryFn } from '@storybook/react';
import { MessageCard } from './index';

export default {
  title: 'MessageCard',
  component: MessageCard,
} as Meta<typeof MessageCard>;

const Template: StoryFn<typeof MessageCard> = args => {
  return (
    <div style={{ width: '80%', display: 'flex', margin: '0 auto' }}>
      <MessageCard {...args} />
    </div>
  );
};

export const MessageCardComponent = Template.bind({});
MessageCardComponent.args = {
  title: 'Message Card Title',
  message:
    'Message card message here so you can see what it looks like. Change this text to see what it looks like with a longer message.',
  style: {
    border: '1px solid #e5e5e5',
  },
};
