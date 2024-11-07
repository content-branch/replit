import type { Meta } from '@storybook/react';
import { Accordion } from './Accordion';
import { environmentContextDecorator } from '../storybookhelpers/EnvironmentContextDecorator';

import { ACCORDION_ITEMS } from '../constants';

const Story: Meta<typeof Accordion> = {
  component: Accordion,
  title: 'Accordion',
  decorators: [environmentContextDecorator]
};
export default Story;

export const Primary = {
  args: {
    theme: 'ultraviolet',
    withNumber: true,
    title: 'How it works',
    accordionItems: ACCORDION_ITEMS,
  },
};

export const OneOpened = {
  args: {
    theme: 'peacock',
    withNumber: true,
    accordionItems: [ACCORDION_ITEMS[0]],
    indexOfOpened: 1,
  },
};
