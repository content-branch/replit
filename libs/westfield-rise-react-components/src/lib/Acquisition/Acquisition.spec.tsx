import { render } from '@testing-library/react';

import Acquisition from './Acquisition';

describe('Acquisition', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Acquisition logo={{
      src: '',
      alt: ''
    }} title={''} text={''} hasPrimaryCta={false} hasSecondaryCta={false} />);
    expect(baseElement).toBeTruthy();
  });
});
