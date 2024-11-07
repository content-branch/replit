import { render } from '@testing-library/react';

import ImageText from './ImageText';
import { IMAGE_TEXT_LIST } from '../constants';

describe('ImageText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageText {...IMAGE_TEXT_LIST[0]} />);
    expect(baseElement).toBeTruthy();
  });
});
