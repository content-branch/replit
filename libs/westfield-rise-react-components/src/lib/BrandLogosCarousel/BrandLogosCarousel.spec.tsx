import { render } from '@testing-library/react';

import BrandLogosCarousel from './BrandLogosCarousel';

describe('BrandLogosCarousel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BrandLogosCarousel logoList={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
