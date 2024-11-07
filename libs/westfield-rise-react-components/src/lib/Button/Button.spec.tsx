import { render } from '@testing-library/react';

import Button, { ButtonProps, ConditionalButtonProps } from './Button';

const DEFAULT_PROPS: ButtonProps & ConditionalButtonProps = {
  label: 'Title',
  variant: 'default',
  style: 'primary',
  size: 'medium',
  colourWhite: false,
  onClick: jest.fn(),
}

describe('Button', (props = {}) => {
  it('should render successfully', () => {
    const { baseElement } = render(<Button {...DEFAULT_PROPS} {...props} />);
    expect(baseElement).toBeTruthy();
  });
});
