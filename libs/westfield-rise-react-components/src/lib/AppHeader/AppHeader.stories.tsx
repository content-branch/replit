import type { Meta } from '@storybook/react';
import { AppHeader } from './AppHeader';

const Story: Meta<typeof AppHeader> = {
  component: AppHeader,
  title: 'AppHeader',
};
export default Story;

export const Primary = {
  args: {},
};
