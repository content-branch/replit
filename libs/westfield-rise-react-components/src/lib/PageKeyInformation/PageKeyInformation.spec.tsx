import { render } from '@testing-library/react';

import PageKeyInformation from './PageKeyInformation';

describe('PageKeyInformation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageKeyInformation />);
    expect(baseElement).toBeTruthy();
  });
});
