import { render } from '@testing-library/react';

import  IMAGE_STATISTICS_DEFAULT  from './ImageStatistics';
import { IMAGE_TEXT_LIST } from '../constants';

describe('ImageStatistics', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IMAGE_STATISTICS_DEFAULT {...IMAGE_TEXT_LIST[0]} />);
    expect(baseElement).toBeTruthy();
  });
});
