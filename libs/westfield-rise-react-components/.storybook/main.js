const path = require('path');

console.log(
  `path ....${path.resolve(
    process.cwd(),
    './apps/westfield-rise/next.config.js',
  )}`,
);
const config = {
  stories: ['../src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'libs/westfield-rise-react-components/vite.config.ts',
      },
    },
  },
  staticDirs: ['../../../public'],
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
