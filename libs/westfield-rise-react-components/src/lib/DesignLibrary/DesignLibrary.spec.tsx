import { render } from '@testing-library/react';

import DesignLibrary from './DesignLibrary';

describe('DesignLibrary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DesignLibrary />);
    expect(baseElement).toBeTruthy();
  });
});
