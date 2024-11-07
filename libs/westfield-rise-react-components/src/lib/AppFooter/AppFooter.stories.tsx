import type { Meta } from '@storybook/react';
import { AppFooter } from './AppFooter';

import { environmentContextDecorator } from '../storybookhelpers/EnvironmentContextDecorator';
import { FOOTER_VALUES } from '../constants';

const Story: Meta<typeof AppFooter> = {
  component: AppFooter,
  title: 'AppFooter',
  decorators: [environmentContextDecorator]
};
export default Story;

export const Primary = {
  args: { ...FOOTER_VALUES },
};
