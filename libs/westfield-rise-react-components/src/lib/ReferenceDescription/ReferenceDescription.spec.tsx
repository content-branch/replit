import { render } from '@testing-library/react';

import ReferenceDescription from './ReferenceDescription';

describe('ReferenceDescription', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReferenceDescription descriptionList={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
