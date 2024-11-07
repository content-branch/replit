import type { Meta } from '@storybook/react';
import { ImageTextNative } from './ImageTextNative';

import { environmentContextDecorator } from '../storybookhelpers/EnvironmentContextDecorator';
import { IMAGE_TEXT_DEFAULT, IMAGE_TEXT_PEOPLE } from '../constants';

const Story: Meta<typeof ImageTextNative> = {
  component: ImageTextNative,
  title: 'ImageTextNative',
  decorators: [environmentContextDecorator],
};
export default Story;

export const Default = {
  args: { ...IMAGE_TEXT_DEFAULT },
};

export const People = {
  args: { ...IMAGE_TEXT_PEOPLE }
}
