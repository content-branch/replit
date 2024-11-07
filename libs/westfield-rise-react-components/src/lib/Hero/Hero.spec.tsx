import { render } from '@testing-library/react';

import Hero from './Hero';

describe('Hero', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Hero theme={'peacock'} shortVideo={{
      url: ''
    }} vimeoId={''} title={''} text={''} />);
    expect(baseElement).toBeTruthy();
  });
});
