import type { Meta } from '@storybook/react';
import { HeaderTextSmall } from './HeaderTextSmall';
import { environmentContextDecorator } from '../storybookhelpers/EnvironmentContextDecorator';

import availableThemeTypes from '../styles/themes.module.scss';

let themeTypes = Object.keys(availableThemeTypes);

const Story: Meta<typeof HeaderTextSmall> = {
  component: HeaderTextSmall,
  title: 'HeaderTextSmall',
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    theme: {
      options: themeTypes,
      control: { type: 'radio' },
    },
  },
  decorators: [environmentContextDecorator],
};
export default Story;

export const CanaryTheme = {
  args: {
    theme: themeTypes[4],
    title: 'Insight & News',
  },
};
