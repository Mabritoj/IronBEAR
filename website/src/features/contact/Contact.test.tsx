import { render, screen } from '@testing-library/react';

import { Contact } from './Contact';

describe('Contact', () => {
  it('renders the heading and is the #contact anchor target', () => {
    const { container } = render(<Contact />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'OPEN TO INSPECTION' }),
    ).toBeInTheDocument();
    expect(container.querySelector('#contact')).toBeInTheDocument();
  });

  it('links to the repositories on GitHub', () => {
    render(<Contact />);
    const link = screen.getByRole('link', { name: 'View repositories' });
    expect(link).toHaveAttribute('href', 'https://github.com/ironbear');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
