import { render } from '@testing-library/react';

import CaseStudy from './CaseStudy';

describe('CaseStudy', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CaseStudy />);
    expect(baseElement).toBeTruthy();
  });
});
