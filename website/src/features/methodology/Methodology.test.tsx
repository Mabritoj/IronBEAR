import { render, screen } from '@testing-library/react';

import { Methodology } from './Methodology';

describe('Methodology', () => {
  it('renders the heading and is the #methodology anchor target', () => {
    const { container } = render(<Methodology />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'DEVELOP | DEPLOY | ITERATE.' }),
    ).toBeInTheDocument();
    expect(container.querySelector('#methodology')).toBeInTheDocument();
  });

  it('lists the three phases in order', () => {
    render(<Methodology />);
    const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual(['DEVELOP', 'DEPLOY', 'ITERATE']);
  });

  it('shows a tools line on each phase card', () => {
    render(<Methodology />);
    expect(screen.getByText('TypeScript · React · Claude Code')).toBeInTheDocument();
    expect(screen.getByText('AWS SAM · CloudFront')).toBeInTheDocument();
    expect(screen.getByText('Jira · Confluence')).toBeInTheDocument();
  });

  it('renders the operating principle quote with its caption', () => {
    render(<Methodology />);
    expect(screen.getByRole('figure')).toBeInTheDocument();
    expect(screen.getByText('IRONBEAR / OPERATING PRINCIPLE')).toBeInTheDocument();
    expect(
      screen.getByText(/Every project starts with an idea worth exploring/),
    ).toBeInTheDocument();
  });
});
