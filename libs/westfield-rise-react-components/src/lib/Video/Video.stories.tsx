import type { StoryFn, Meta } from '@storybook/react';

import Video from './Video';

import { environmentContextDecorator } from '../storybookhelpers/EnvironmentContextDecorator';

const Story: Meta<typeof Video> = {
  component: Video,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Video',
  decorators: [environmentContextDecorator],
};
export default Story;

const Template: StoryFn<typeof Video> = args => <Video {...args} />;

export const VideoComponent = Template.bind({});
VideoComponent.args = {
  theme: 'ultraviolet',
  videoCode: '70591644',
  image: {
    src: 'https://generation-sessions.s3.amazonaws.com/4090a1592e5e34321ef3e60ee0d366ab/img/image-16.png',
    alt: 'Default image',
  },
};
