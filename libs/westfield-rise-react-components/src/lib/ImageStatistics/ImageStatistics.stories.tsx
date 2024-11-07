import type { StoryFn, Meta } from '@storybook/react';
import { ImageStatistics } from './ImageStatistics';

import { environmentContextDecorator } from '../storybookhelpers/EnvironmentContextDecorator';
import { IMAGE_STATISTICS_DEFAULT } from '../constants';

const Story: Meta<typeof ImageStatistics> = {
  component: ImageStatistics,
  title: 'ImageStatistics',
  decorators: [environmentContextDecorator],
};
export default Story;

const Template: StoryFn<typeof ImageStatistics> = (args) => (
  <>
    <div style={{ height: 300 }}></div>
    <ImageStatistics {...args} />
    <div style={{ height: 300 }}></div>

  </>
)

export const FeaturedCaseStudies = Template.bind({});
FeaturedCaseStudies.args = {
  theme: 'ultraviolet',
  title: IMAGE_STATISTICS_DEFAULT.title,
  caseStudyList: IMAGE_STATISTICS_DEFAULT.caseStudyList,
}


