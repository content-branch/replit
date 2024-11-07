import { render } from '@testing-library/react';

import ImageCarousel from './ImageCarousel';

describe('ImageCarousel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageCarousel title={''} imageList={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
