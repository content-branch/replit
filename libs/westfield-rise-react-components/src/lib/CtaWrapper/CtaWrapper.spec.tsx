import { render } from '@testing-library/react';

import CtaWrapper from './CtaWrapper';

const DEFAULT_PROPS = {
    name: 'Title',
    ctas: [
        {
        label: 'Label',
        href: 'https://www.example.com',
        },
    ],
};

describe('CtaWrapper', (props = {}) => {
  it('should render successfully', () => {
    const { baseElement } = render(<CtaWrapper {...DEFAULT_PROPS} {...props}/>);
    expect(baseElement).toBeTruthy();
  });
});