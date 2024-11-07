import type { StoryFn, Meta } from '@storybook/react';
import { environmentContextDecorator } from "../storybookhelpers/EnvironmentContextDecorator";

import { Button } from './Button';

const Story: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    environmentContextDecorator
  ],
};
export default Story;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const PrimaryMediumBlack = Template.bind({});
PrimaryMediumBlack.args = {
  label: 'Button',
  variant: 'default',
  style: 'primary',
  colourWhite: false,
  link: 'services'
};

export const SecondarySmallWhite = Template.bind({});
SecondarySmallWhite.args = {
  label: 'Button',
  variant: 'default',
  style: 'secondary',
  colourWhite: true,
  onClick: () => console.log('Secondary button clicked'),
};
SecondarySmallWhite.parameters = {
  backgrounds: {
    default: 'dark'
  }
}

export const SecondaryFilterBlack = Template.bind({});
SecondaryFilterBlack.args = {
  label: 'Button',
  variant: 'filter',
  colourWhite: true
};
SecondaryFilterBlack.parameters = {
  backgrounds: {
    default: 'dark'
  }
}

export const SecondarySortWhite = Template.bind({});
SecondarySortWhite.args = {
  label: 'Button',
  variant: 'filter',
  colourWhite: false
};
