import { render } from '@testing-library/react';

import BodyCopy from './BodyCopy';

describe('BodyCopy', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BodyCopy contentTypeId={''} />);
    expect(baseElement).toBeTruthy();
  });
});
