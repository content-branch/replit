import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

// eslint-disable-next-line @nx/enforce-module-boundaries
// import '../../../apps/westfield-rise/pages/global.scss';
const customViewports = {
  mobile: {
    name: 'Mobile',
    styles: {
      width: '360px',
      height: '600px',
    },
  },
  smallDesktop: {
    name: 'Small Desktop',
    styles: {
      width: '1280px',
      height: '1024px',
    },
  },
  largeDesktop: {
    name: 'Large Desktop',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
};

const preview = {
  parameters: {
    viewport: { viewports: { ...MINIMAL_VIEWPORTS, ...customViewports } },
  },
};

export default preview;
