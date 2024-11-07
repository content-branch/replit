import { render } from '@testing-library/react';

import CustomImage from './CustomImage';

describe('CustomImage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomImage />);
    expect(baseElement).toBeTruthy();
  });
});
