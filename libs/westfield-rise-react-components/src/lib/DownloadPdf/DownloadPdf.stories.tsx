import type { Meta } from '@storybook/react';
import { DownloadPdf } from './DownloadPdf';
import { environmentContextDecorator } from '../storybookhelpers/EnvironmentContextDecorator';

import availableThemeTypes from '../styles/themes.module.scss';

const themeTypes = Object.keys(availableThemeTypes);

const Story: Meta<typeof DownloadPdf> = {
  component: DownloadPdf,
  title: 'DownloadPdf',
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    theme: {
      options: themeTypes,
      control: { type: 'select' },
    },
  },
  decorators: [environmentContextDecorator],
};
export default Story;

export const Download = {
  args: {
    theme: themeTypes[4],
    text: 'Download the PDF version here!',
    ctaProps: {
      href: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      label: 'Download',
      isExternal: false,
    },
  }
}