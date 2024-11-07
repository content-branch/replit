import type { Meta } from '@storybook/react';
import { BrandLogosCarousel } from './BrandLogosCarousel';
import { LOGO_LIST } from '../constants';

const Story: Meta<typeof BrandLogosCarousel> = {
  component: BrandLogosCarousel,
  title: 'BrandLogosCarousel',
};
export default Story;

export const Primary = {
  args: {
    logoList: [...LOGO_LIST, ...LOGO_LIST]
  },
};
