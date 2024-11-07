import type { Meta } from '@storybook/react';
import { BodyCopy } from './BodyCopy';
import { environmentContextDecorator } from '../storybookhelpers/EnvironmentContextDecorator';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const Story: Meta<typeof BodyCopy> = {
  component: BodyCopy,
  title: 'BodyCopy',
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'smallDesktop',
    },
  },
  decorators: [environmentContextDecorator],
};
export default Story;

export const Primary = {
  args: {
    bodyCopyText: {},
    forStorybook: true
  },
};
