import type { StoryFn, Meta } from '@storybook/react';
import { HeaderLarge } from './HeaderLarge';
import { environmentContextDecorator } from '../storybookhelpers/EnvironmentContextDecorator';

const Story: Meta<typeof HeaderLarge> = {
  component: HeaderLarge,
  title: 'HeaderLarge',
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    type: {
      options: ['text', 'image', 'video'],
      control: { type: 'radio' },
    },
  },
  decorators: [environmentContextDecorator],
};
export default Story;

const Template: StoryFn<typeof HeaderLarge> = args => (
  <HeaderLarge {...args} />
);

export const Text = Template.bind({});
Text.args = {
  theme: 'canary',
  type: 'text',
  title: 'Case studies',
  text: 'Posuere et lorem id nec urna commodo ut at. Imperdiet diam felis cras vivamus interdum turpis elementum fermentum. ',
  link: {
    href: 'http://externallink.com',
    label: 'See all services',
    isExternal: true
  }
}

export const Image = Template.bind({});
Image.args = {
  theme: 'candy',
  type: 'image',
  image: {
    src: 'https://generation-sessions.s3.amazonaws.com/83203455f6dd4a9f9ea138a781ad5e43/img/image-17.png',
    alt: 'Default image'
  }
}

export const Video = Template.bind({});
Video.args = {
  theme: 'ultraviolet',
  type: 'video',
  videoCode: '70591644',
  image: {
    src: 'https://generation-sessions.s3.amazonaws.com/4090a1592e5e34321ef3e60ee0d366ab/img/image-16.png',
    alt: 'Default image'
  }
}
