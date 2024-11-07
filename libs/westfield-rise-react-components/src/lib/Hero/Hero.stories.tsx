import type { Meta } from '@storybook/react';
import { Hero } from './Hero';

const Story: Meta<typeof Hero> = {
  component: Hero,
  title: 'Hero',
};
export default Story;

export const Primary = {
  args: {
    theme: 'ultraviolet',
    title: 'Your vision, our stage',
    text: 'Westfield Rise brings memorable brand moments to life across the Westfield universe with exceptional impact.',
    shortVideo: {
      url: 'https://videos.ctfassets.net/tvi9upeknft2/6zvpG2Z2KeatcbR5ontvB0/348e62e4576eff72de94b1a0f519f704/file_example_MP4_1920_18MG.mp4'
    },
    vimeoId: '70591644',
  },
};
