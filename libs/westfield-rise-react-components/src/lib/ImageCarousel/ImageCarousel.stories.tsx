import type { Meta } from '@storybook/react';
import { ImageCarousel } from './ImageCarousel';

import { environmentContextDecorator } from '../storybookhelpers/EnvironmentContextDecorator';
import { IMAGE_CAROUSEL_LIST, NEWS_INSIGHTS_LIST, PEOPLE_CAROUSEL_LIST } from '../constants';

const Story: Meta<typeof ImageCarousel> = {
  component: ImageCarousel,
  title: 'ImageCarousel',
  decorators: [environmentContextDecorator],
};
export default Story;

export const ImageGallery = {
  args: {
    imageList: IMAGE_CAROUSEL_LIST,
  },
};

export const PeopleGallery = {
  args: {
    type: 'people',
    title: 'Our poeple',
    imageList: PEOPLE_CAROUSEL_LIST,
    ctaProps: {
      label: 'View all team',
      href: 'allteam'
    }
  }
}

export const NewsAndInsights = {
  args: {
    type: 'news-insights',
    title: 'News & Insights',
    imageList: NEWS_INSIGHTS_LIST,
  }
}
