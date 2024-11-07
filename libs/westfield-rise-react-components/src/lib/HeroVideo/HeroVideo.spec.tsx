import { render } from '@testing-library/react';

import HeroVideo from './HeroVideo';

describe('HeroVideo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HeroVideo />);
    expect(baseElement).toBeTruthy();
  });
});
