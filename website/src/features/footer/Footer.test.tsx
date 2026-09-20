import { render, screen } from '@testing-library/react';

import { Footer } from './Footer';

describe('Footer', () => {
  it('renders as the contentinfo landmark with the logo', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'IronBEAR' })).toBeInTheDocument();
  });

  it('links GitHub and shows LinkedIn as inert text until a URL exists', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/ironbear',
    );
    expect(screen.getByText(/LinkedIn/)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'LinkedIn' })).not.toBeInTheDocument();
  });

  it('shows the current year in the copyright line', () => {
    render(<Footer />);
    expect(
      screen.getByText(`© ${new Date().getFullYear()} IRONBEAR. ALL RIGHTS RESERVED.`),
    ).toBeInTheDocument();
  });
});
