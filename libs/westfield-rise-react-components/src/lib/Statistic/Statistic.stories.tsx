import type { Meta } from '@storybook/react';
import { Statistic } from './Statistic';

import { STATISTICS_LIST } from '../constants';

const Story: Meta<typeof Statistic> = {
  component: Statistic,
  title: 'Statistic',
  argTypes: {
    referenceNumber: {
      control: {
        type: 'number',
        min: 1,
        max: 10,
        step: 1,
      },
    },
  },
};
export default Story;

export const Primary = {
  args: {
    ...STATISTICS_LIST[1],
    withAnimation: true,
  }
};
