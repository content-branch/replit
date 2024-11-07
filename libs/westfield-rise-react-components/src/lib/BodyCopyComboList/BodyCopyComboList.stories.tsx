import type { Meta } from '@storybook/react';

import { BodyCopyComboList } from './BodyCopyComboList';

import { REFERENCE_POINT_LIST } from '../constants';
import { environmentContextDecorator } from '../storybookhelpers/EnvironmentContextDecorator';

const Story: Meta<typeof BodyCopyComboList> = {
  component: BodyCopyComboList,
  title: 'Body Copy Combo List',
  decorators: [environmentContextDecorator],
};
export default Story;

export const BodyCopyComboListComponent = {
  args: {
    bodyCopyList: [
      {
        title: REFERENCE_POINT_LIST[0],
        text: {
          bodyCopyText: {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'Responsible for the contents of these web pages',
                    marks: [],
                    data: {},
                  },
                ],
              },
            ],
          },
          forStorybook: true,
        },
      },
      {
        title: REFERENCE_POINT_LIST[1],
        text: {
          bodyCopyText: {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'Manager',
                    marks: [],
                    data: {},
                  },
                ],
              },
            ],
          },
          forStorybook: true,
        },
      },
      {
        title: REFERENCE_POINT_LIST[2],
        text: {
          bodyCopyText: {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'Supervisory authority',
                    marks: [],
                    data: {},
                  },
                ],
              },
            ],
          },
          forStorybook: true,
        },
      },
    ],
  },
};
