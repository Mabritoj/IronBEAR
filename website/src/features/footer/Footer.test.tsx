import { render, screen } from '@testing-library/react';

import { Footer } from './Footer';

describe('Footer', () => {
  it('renders as the contentinfo landmark with the logo', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'IronBEAR' })).toBeInTheDocument();
  });

  it('links GitHub and LinkedIn in a new tab', () => {
    render(<Footer />);
    const github = screen.getByRole('link', { name: 'GitHub' });
    expect(github).toHaveAttribute('href', 'https://github.com/mabritoj');
    const linkedin = screen.getByRole('link', { name: 'LinkedIn' });
    expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/jonathanmabrito/');
    expect(linkedin).toHaveAttribute('target', '_blank');
    expect(linkedin).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('shows the current year in the copyright line', () => {
    render(<Footer />);
    expect(
      screen.getByText(`© ${new Date().getFullYear()} IRONBEAR. ALL RIGHTS RESERVED.`),
    ).toBeInTheDocument();
  });
});
