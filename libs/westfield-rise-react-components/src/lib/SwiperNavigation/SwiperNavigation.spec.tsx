import { render } from '@testing-library/react';

import SwiperNavigation from './SwiperNavigation';

describe('SwiperNavigation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SwiperNavigation />);
    expect(baseElement).toBeTruthy();
  });
});
