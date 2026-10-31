import { render, screen, within } from '@testing-library/react';

import type { Project } from './data';
import { ProjectCard } from './ProjectCard';

const project: Project = {
  id: 'demo',
  index: '01',
  title: 'DEMO SYSTEM',
  description: 'A demo project.',
  technologies: ['RUST', 'GO'],
  metric: 'AT SCALE',
  repoLabel: 'GITHUB / DEMO',
  repoUrl: 'https://github.com/mabritoj/demo',
  tone: 'light',
};

describe('ProjectCard', () => {
  it('renders the title, description, headline and technologies', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole('heading', { level: 3, name: 'DEMO SYSTEM' })).toBeInTheDocument();
    expect(screen.getByText('A demo project.')).toBeInTheDocument();
    expect(screen.getByText('AT A GLANCE')).toBeInTheDocument();
    expect(screen.getByText('AT SCALE')).toBeInTheDocument();
    const tags = within(screen.getByRole('list', { name: 'Technologies' })).getAllByRole(
      'listitem',
    );
    expect(tags.map((tag) => tag.textContent)).toEqual(['RUST', 'GO']);
  });

  it('links to the repository', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole('link', { name: 'GITHUB / DEMO' })).toHaveAttribute(
      'href',
      'https://github.com/mabritoj/demo',
    );
  });

  it('shows no live-site link when the project has no site', () => {
    render(<ProjectCard project={project} />);
    expect(screen.queryByText(/LIVE SITE/)).not.toBeInTheDocument();
  });

  it('links the live site when a URL is provided', () => {
    render(<ProjectCard project={{ ...project, siteUrl: 'https://example.com' }} />);
    expect(screen.getByRole('link', { name: 'LIVE SITE' })).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });

  it('applies the surface for its tone', () => {
    const { rerender } = render(<ProjectCard project={project} />);
    expect(screen.getByRole('article')).toHaveClass('light');
    rerender(<ProjectCard project={{ ...project, tone: 'dark' }} />);
    expect(screen.getByRole('article')).toHaveClass('dark');
  });
});
