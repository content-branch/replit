import type { Meta } from '@storybook/react';
import { ImageTextList } from './ImageTextList';

import { environmentContextDecorator } from '../storybookhelpers/EnvironmentContextDecorator';
import { IMAGE_TEXT_LIST_DEFAULT, IMAGE_TEXT_LIST_PEOPLE } from '../constants';

const Story: Meta<typeof ImageTextList> = {
  component: ImageTextList,
  title: 'ImageTextList',
  decorators: [environmentContextDecorator],
};
export default Story;

export const Primary = {
  args: {
    title: 'Default title',
    imageTextList: IMAGE_TEXT_LIST_DEFAULT,
  },
};

export const People = {
  args: {
    title: 'Our core media partners',
    imageTextList: IMAGE_TEXT_LIST_PEOPLE,
  }
}
