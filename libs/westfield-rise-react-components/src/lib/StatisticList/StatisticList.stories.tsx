import type { Meta } from '@storybook/react';
import { StatisticList } from './StatisticList';
import { STATISTICS_LIST } from '../constants';

const Story: Meta<typeof StatisticList> = {
  component: StatisticList,
  title: 'StatisticList',
};
export default Story;

export const fullWidth = {
  args: {
    width: 'full',
    title: 'We are at point of purchase, with an audience who have the mindset to explore new experiences.',
    statistics: STATISTICS_LIST
  },
};
