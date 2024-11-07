import type { Meta } from '@storybook/react';
import { ListCard } from './ListCard';
import { environmentContextDecorator } from '../storybookhelpers/EnvironmentContextDecorator';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import { CASE_STUDY_CARD, INSIGHT_CARD, SERVICE_CARD } from '../constants';

const Story: Meta<typeof ListCard> = {
  component: ListCard,
  title: 'ListCard',
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'mobile',
    },
  },
  decorators: [environmentContextDecorator],
};
export default Story;

export const CaseStudyCard = {
  args: CASE_STUDY_CARD,
};

export const InsightCard = {
  args: INSIGHT_CARD
}

export const ServiceCard = {
  args: SERVICE_CARD
}
