import { render } from '@testing-library/react';

import AppFooter from './AppFooter';

describe('AppFooter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AppFooter
        logoText={''}
        mottoText={''}
        copyRight={''}
        buttonList={[]}
        socialButtonList={[]}
        linkList={[]}
      />,
    );
    expect(baseElement).toBeTruthy();
  });
});
