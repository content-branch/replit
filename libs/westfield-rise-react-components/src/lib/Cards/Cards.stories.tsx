import type { Meta } from '@storybook/react';
import { Cards } from './Cards';
import { environmentContextDecorator } from '../storybookhelpers/EnvironmentContextDecorator';

import { CASE_STUDY_CARD_LIST, INSIGHT_CARD_LIST, SERVICE_CARD_LIST } from '../constants';
import availableThemeTypes from '../styles/themes.module.scss';
const themeTypes = Object.keys(availableThemeTypes);

const Story: Meta<typeof Cards> = {
  component: Cards,
  title: 'Cards',
  parameters: {
    layout: 'fullscreen',
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

export const CaseStudyCardList = {
  args: {
    theme: themeTypes[0],
    title: 'This is a title',
    cardList: CASE_STUDY_CARD_LIST,
  },
};

export const InsightCardList = {
  args: {
    theme: themeTypes[1],
    title: 'This is a title',
    cardList: INSIGHT_CARD_LIST,
  },
};

export const ServiceCardList = {
  args: {
    theme: themeTypes[2],
    title: 'This is a title',
    cardList: SERVICE_CARD_LIST,
  },
};
