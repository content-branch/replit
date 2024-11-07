import { render } from '@testing-library/react';

import Statistic from './Statistic';

describe('Statistic', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Statistic text={''} value={0} withAnimation={false} />);
    expect(baseElement).toBeTruthy();
  });
});
