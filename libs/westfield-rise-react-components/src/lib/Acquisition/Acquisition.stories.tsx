import type { Meta } from '@storybook/react';
import { Acquisition } from './Acquisition';

const Story: Meta<typeof Acquisition> = {
  component: Acquisition,
  title: 'Acquisition',
};
export default Story;

export const Book = {
  args: {
    theme: 'peacock',
    variant: 'book',
    title: 'Next steps',
    text: 'Vestibulum vitae ullamcorper turpis. Praesent ultricies urna non dui congue, sit adiam finibus eu urna suscipit.',
    author: '',
    jobTitle: '',
    hasPrimaryCta: true,
    hasSecondaryCta: true,
  },
};

export const Quote = {
  args: {
    theme: 'ultraviolet',
    variant: 'quote',
    title: 'Get in touch',
    text: 'Vestibulum vitae ullamcorper turpis. Praesent ultricies urna non dui congue, sit adiam finibus eu urna suscipit.',
    hasPrimaryCta: false,
    hasSecondaryCta: true,
    author: 'Name of person',
    jobTitle: 'Job Title',
  },
};
