import { render, screen } from '@testing-library/react';

import { Hero } from './Hero';

describe('Hero', () => {
  it('renders the headline as the page h1', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /ORCHESTRATING\s*CLEAR\s*OUTCOMES/,
    );
  });

  it('links its calls to action to the work section and GitHub', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: 'VIEW SELECTED WORK' })).toHaveAttribute(
      'href',
      '#work',
    );
    expect(screen.getByRole('link', { name: 'GITHUB / IRONBEAR' })).toHaveAttribute(
      'href',
      'https://github.com/mabritoj',
    );
  });

  it('shows the bear mark image with alt text', () => {
    render(<Hero />);
    expect(screen.getByRole('img', { name: /IronBEAR logo/ })).toBeInTheDocument();
  });
});
