import type { Meta } from '@storybook/react';
import { Map } from './Map';
import { REGIONS_LIST } from '../constants';
import { environmentContextDecorator } from '../storybookhelpers/EnvironmentContextDecorator';

const Story: Meta<typeof Map> = {
  component: Map,
  title: 'Map',
  decorators: [environmentContextDecorator]
};
export default Story;

export const Primary = {
  args: {
    theme: 'canary',
    regionsList: REGIONS_LIST
  },
};
