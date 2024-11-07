import { Filters } from './Filters';
import { act, render } from '@testing-library/react';

describe('Filters', () => {
  it('should render successfully', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { baseElement } = render(<Filters />);
    expect(baseElement).toBeTruthy();
  });

  it('should render with title', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { baseElement } = render(<Filters title="Filters" />);
    expect(baseElement).toBeTruthy();
  });

  it('should render with sorting', () => {
    const { baseElement } = render(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Filters
        sorting={{
          title: 'Sorting',
          fields: [
            {
              id: 'sort1',
              label: 'Sort 1',
              value: 'sort1',
            },
          ],
        }}
      />,
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render with filterGroups', () => {
    const { baseElement } = render(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Filters
        filterGroups={[
          {
            title: 'Filter Group 1',
            options: [
              {
                id: 'filter1',
                label: 'Filter 1',
                value: 'filter1',
              },
              {
                id: 'filter2',
                label: 'Filter 2',
                value: 'filter2',
              },
            ],
          },
        ]}
      />,
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render with sorting and filterGroups', () => {
    const { baseElement } = render(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Filters
        sorting={{
          title: 'Sorting',
          fields: [
            {
              id: 'sort1',
              label: 'Sort 1',
              value: 'sort1',
            },
          ],
        }}
        filterGroups={[
          {
            title: 'Filter Group 1',
            options: [
              {
                id: 'filter1',
                label: 'Filter 1',
                value: 'filter1',
              },
              {
                id: 'filter2',
                label: 'Filter 2',
                value: 'filter2',
              },
            ],
          },
        ]}
      />,
    );
    expect(baseElement).toBeTruthy();
  });
  it('should check the all checkbox in a filter group when all checkboxes are checked', async () => {
    const { baseElement, findByTestId } = render(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Filters
        filterGroups={[
          {
            title: 'Filter Group 1',
            options: [
              {
                id: 'filter1',
                label: 'Filter 1',
                value: 'filter1',
              },
              {
                id: 'filter2',
                label: 'Filter 2',
                value: 'filter2',
              },
            ],
          },
        ]}
      />,
    );
    // try to check all checkboxes
    const allCheckbox = await findByTestId('filters.0.all');
    expect(allCheckbox).toBeTruthy();

    // trigger click on all checkbox
    act(() => {
      allCheckbox.click();
    });
    // expect all checkboxes to be checked
    const filter1Checkbox = await findByTestId('filters.0.filter1');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(filter1Checkbox.checked).toBeTruthy();
    const filter2Checkbox = await findByTestId('filters.0.filter2');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(filter2Checkbox.checked).toBeTruthy();
  });
  it('should uncheck all checkbox if any of the options is unchecked', async () => {
    const {  findByTestId } = render(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Filters
        filterGroups={[
          {
            title: 'Filter Group 1',
            options: [
              {
                id: 'filter1',
                label: 'Filter 1',
                value: 'filter1',
              },
              {
                id: 'filter2',
                label: 'Filter 2',
                value: 'filter2',
              },
            ],
          },
        ]}
      />,
    );
    // try to check all checkboxes
    const allCheckbox = await findByTestId('filters.0.all');
    expect(allCheckbox).toBeTruthy();

    // trigger click on all checkbox
    act(() => {
      allCheckbox.click();
    });
    // expect all checkboxes to be checked
    const filter1Checkbox = await findByTestId('filters.0.filter1');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(filter1Checkbox.checked).toBeTruthy();
    const filter2Checkbox = await findByTestId('filters.0.filter2');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(filter2Checkbox.checked).toBeTruthy();

    // trigger click on filter1 checkbox
    act(() => {
      filter1Checkbox.click();
    });
    // expect all checkbox to be unchecked
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(allCheckbox.checked).toBeFalsy();
  });
});
