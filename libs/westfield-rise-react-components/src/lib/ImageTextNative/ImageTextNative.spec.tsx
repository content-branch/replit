import { render } from '@testing-library/react';

import ImageTextNative from './ImageTextNative';
import { IMAGE_TEXT_LIST } from '../constants';

describe('ImageText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageTextNative {...IMAGE_TEXT_LIST[0]} />);
    expect(baseElement).toBeTruthy();
  });
});
