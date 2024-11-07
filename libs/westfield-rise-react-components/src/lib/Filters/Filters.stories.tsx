import { Meta } from '@storybook/react';
import { Filters } from './Filters';
import { sampleFilterData } from "./constants";

const Story: Meta<typeof Filters> = {
  component: Filters,
  title: 'Filters',
};

export default Story;

export const FiltersComponent = {
  args: {
    ...sampleFilterData
  },
};
