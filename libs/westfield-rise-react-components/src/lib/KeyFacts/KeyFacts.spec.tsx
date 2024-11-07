import { render } from '@testing-library/react';

import KeyFacts from './KeyFacts';

describe('KeyFacts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<KeyFacts />);
    expect(baseElement).toBeTruthy();
  });
});
