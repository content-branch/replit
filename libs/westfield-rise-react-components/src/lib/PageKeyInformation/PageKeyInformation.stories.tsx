import type { Meta } from '@storybook/react';
import { PageKeyInformation } from './PageKeyInformation';
import { INFO_LIST } from '../constants';

const Story: Meta<typeof PageKeyInformation> = {
  component: PageKeyInformation,
  title: 'PageKeyInformation',
};
export default Story;

export const Primary = {
  args: {
    theme: 'ultraviolet',
    brandName: 'Sasung',
    title: 'Beautiful smiles with Benefit Cosmetics',
    text: 'Tellus lorem nec id integer neque purus eget. Nibh adipiscing nunc lectus viverra consequat feugiat. Amet turpis aenean massa pharetra etiam risus. ',
    rowVariation: false,
    infoList: INFO_LIST
  },
};
