import { render } from '@testing-library/react';

import StatisticList from './StatisticList';

describe('StatisticList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StatisticList width={'full'} statistics={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
