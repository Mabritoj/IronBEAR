import { render, screen } from '@testing-library/react';

import { SelectedWork } from './SelectedWork';

describe('SelectedWork', () => {
  it('renders the section heading and is the #work anchor target', () => {
    const { container } = render(<SelectedWork />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'BUILT IN THE OPEN.' }),
    ).toBeInTheDocument();
    expect(container.querySelector('#work')).toBeInTheDocument();
  });

  it('lists Filacrypt, the Prusa widget, then the plugins, in that order', () => {
    render(<SelectedWork />);
    const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual(['FILACRYPT', 'PRUSA STATUS WIDGET', 'IRONBEAR PLUGINS']);
  });

  it('alternates dark, light, dark card surfaces', () => {
    render(<SelectedWork />);
    const tones = screen
      .getAllByRole('article')
      .map((card) => (card.classList.contains('dark') ? 'dark' : 'light'));
    expect(tones).toEqual(['dark', 'light', 'dark']);
  });

  it('links each card to its GitHub repository', () => {
    render(<SelectedWork />);
    expect(screen.getByRole('link', { name: 'GITHUB / FILACRYPT' })).toHaveAttribute(
      'href',
      'https://github.com/mabritoj/Filacrypt',
    );
    expect(screen.getByRole('link', { name: 'GITHUB / PRUSA-WIDGET' })).toHaveAttribute(
      'href',
      'https://github.com/mabritoj/Corsair-Xeneon---Prusa-Widget',
    );
    expect(screen.getByRole('link', { name: 'GITHUB / CLAUDE' })).toHaveAttribute(
      'href',
      'https://github.com/mabritoj/claude',
    );
  });

  it('links a live site only for Filacrypt', () => {
    render(<SelectedWork />);
    const liveLinks = screen.getAllByRole('link', { name: 'LIVE SITE' });
    expect(liveLinks).toHaveLength(1);
    expect(liveLinks[0]).toHaveAttribute('href', 'https://filacrypt.com');
  });
});
