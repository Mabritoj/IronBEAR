import { render, screen } from '@testing-library/react';

import { Navigation } from './Navigation';

describe('Navigation', () => {
  it('links to the page sections and the contact anchor', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '#work');
    expect(screen.getByRole('link', { name: 'Methodology' })).toHaveAttribute(
      'href',
      '#methodology',
    );
    expect(screen.getByRole('link', { name: 'ENGAGE' })).toHaveAttribute('href', '#contact');
  });

  it('exposes the site identity as a link back to the top', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: 'ironbear.dev' })).toHaveAttribute('href', '#top');
  });
});
