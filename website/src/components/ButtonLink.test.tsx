import { render, screen } from '@testing-library/react';

import { ButtonLink } from './ButtonLink';

describe('ButtonLink', () => {
  it('renders an internal link without a target', () => {
    render(<ButtonLink label="ENGAGE" href="#contact" />);
    const link = screen.getByRole('link', { name: 'ENGAGE' });
    expect(link).toHaveAttribute('href', '#contact');
    expect(link).not.toHaveAttribute('target');
  });

  it('opens external links in a new tab safely', () => {
    render(<ButtonLink label="GITHUB" href="https://github.com/ironbear" external />);
    const link = screen.getByRole('link', { name: 'GITHUB' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
