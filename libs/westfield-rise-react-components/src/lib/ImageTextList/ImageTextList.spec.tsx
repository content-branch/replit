import { render } from '@testing-library/react';

import ImageTextList from './ImageTextList';
import { IMAGE_TEXT_LIST } from '../constants';

describe('ImageTextList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageTextList imageTextList={IMAGE_TEXT_LIST} />);
    expect(baseElement).toBeTruthy();
  });
});
