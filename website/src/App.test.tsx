import { render, screen } from '@testing-library/react';

import { App } from './App';

describe('App', () => {
  it('renders the banner, main and contentinfo landmarks', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('has a single h1 and every nav anchor resolves to a section', () => {
    const { container } = render(<App />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    for (const id of ['top', 'work', 'methodology', 'contact']) {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    }
  });
});
