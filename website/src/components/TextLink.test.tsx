import { render, screen } from '@testing-library/react';

import { TextLink } from './TextLink';

describe('TextLink', () => {
  it('renders a link when an href is given', () => {
    render(<TextLink label="GITHUB / FORGE" href="https://github.com/ironbear" />);
    expect(screen.getByRole('link', { name: 'GITHUB / FORGE' })).toHaveAttribute(
      'href',
      'https://github.com/ironbear',
    );
  });

  it('renders inert text, not a link, when there is no href', () => {
    render(<TextLink label="LinkedIn" />);
    expect(screen.getByText(/LinkedIn/)).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
