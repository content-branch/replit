import type { Meta } from '@storybook/react';
import { ReferenceDescription } from './ReferenceDescription';
import { DESCRIPTION_LIST } from '../constants';

const Story: Meta<typeof ReferenceDescription> = {
  component: ReferenceDescription,
  title: 'ReferenceDescription',
};
export default Story;

export const Primary = {
  args: { descriptionList: DESCRIPTION_LIST },
};
