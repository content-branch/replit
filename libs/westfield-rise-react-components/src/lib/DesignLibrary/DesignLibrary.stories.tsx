import type { Meta } from '@storybook/react';
import { DesignLibrary } from './DesignLibrary';

const Story: Meta<typeof DesignLibrary> = {
  component: DesignLibrary,
  title: 'DesignLibrary',
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    headingClass: {
      options: ['display-l', 'display-m', 'display-s', 'heading-1', 'heading-2', 'heading-3', 'heading-4', 'heading-5', 'heading-6', 'heading-7', 'subheading-1', 'subheading-2'],
      control: {
        type: 'radio',
        labels: {
          'display-l': 'display l',
          'display-m': 'display m',
          'display-s': 'display s',
          'heading-1': 'heading 1',
          'heading-2': 'heading 2',
          'heading-3': 'heading 3',
          'heading-4': 'heading 4',
          'heading-5': 'heading 5',
          'heading-6': 'heading 6',
          'heading-7': 'heading 6',
          'subheading-1': 'subheading 1',
          'subheading-2': 'subheading 2'
        },
      },
    },
    paragraphClass: {
      options: ['text-24', 'text-22', 'text-20', 'text-18', 'text-16'],
      control: {
        type: 'radio',
        labels: {
          'text-24': 'text 24',
          'text-22': 'text 22',
          'text-20': 'text 20',
          'text-18': 'text 18',
          'text-16': 'text 16',
        }
      }
    }
  },
};
export default Story;

export const Typography = {
  args: {
    headingText: 'This is a heading',
    headingClass: 'heading-1',
    paragraphText: 'Lectus tempor lacus felis elementum ipsum dignissim tellus. Nunc duis etiam sed aenean aliquam purus quis. Ac morbi enim vitae quam. Orci amet aliquam id porta duis ipsum quis.',
    paragraphClass: 'text-24'
  },
};
