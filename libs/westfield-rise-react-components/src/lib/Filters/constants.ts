import { FiltersProps } from './Filters';

export const sampleFilterData: FiltersProps = {
  title: 'Filters Title',
  filterGroups: [
    {
      title: 'Filter 1',
      options: [
        {
          id: 'option1',
          label: 'Option 1',
          value: 'option1',
        },
        {
          id: 'option2',
          label: 'Option 2',
          value: 'option2',
        },
      ],
    },
    {
      title: 'Filter 2',
      options: [
        {
          id: 'option3',
          label: 'Option 3',
          value: 'option3',
        },
        {
          id: 'option4',
          label: 'Option 4',
          value: 'option4',
        },
        {
          id: 'option5',
          label: 'Option 5',
          value: 'option5',
        },
      ],
    },
  ],
  sorting: {
    fields: [
      {
        id: 'sort1',
        label: 'Sort 1',
        value: 'sort1',
      },
    ],
    title: 'Sort by',
  },
};
