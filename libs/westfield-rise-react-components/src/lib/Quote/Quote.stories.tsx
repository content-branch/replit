import type { Meta } from '@storybook/react';
import { Quote } from './Quote';

const Story: Meta<typeof Quote> = {
  component: Quote,
  title: 'Quote',
};
export default Story;

export const Primary = {
  args: {
    quote: 'Vestibulum vitae ullamcorper turpis. Praesent ultricies urna non dui congue, sit adiam finibus eu urna suscipit.',
    author: 'Famous Author',
    jobTitle: 'Job title'
  },
};
