import { render } from '@testing-library/react';

import Accordion from './Accordion';
import { ACCORDION_ITEMS } from '../constants';

describe('Accordion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Accordion theme='peacock' withNumber items={ACCORDION_ITEMS} />);
    expect(baseElement).toBeTruthy();
  });
});
