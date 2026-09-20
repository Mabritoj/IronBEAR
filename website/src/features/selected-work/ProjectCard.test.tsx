import { render, screen, within } from '@testing-library/react';

import type { Project } from './data';
import { ProjectCard } from './ProjectCard';

const project: Project = {
  id: 'demo',
  index: '01',
  title: 'DEMO SYSTEM',
  description: 'A demo project.',
  technologies: ['RUST', 'GO'],
  metric: '10X FASTER',
  repoLabel: 'GITHUB / DEMO',
  repoUrl: 'https://github.com/mabritoj',
};

describe('ProjectCard', () => {
  it('renders the title, description, metric and technologies', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole('heading', { level: 3, name: 'DEMO SYSTEM' })).toBeInTheDocument();
    expect(screen.getByText('A demo project.')).toBeInTheDocument();
    expect(screen.getByText('10X FASTER')).toBeInTheDocument();
    const tags = within(screen.getByRole('list', { name: 'Technologies' })).getAllByRole(
      'listitem',
    );
    expect(tags.map((tag) => tag.textContent)).toEqual(['RUST', 'GO']);
  });

  it('links to the repository', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole('link', { name: 'GITHUB / DEMO' })).toHaveAttribute(
      'href',
      'https://github.com/mabritoj',
    );
  });

  it('shows the case study as inert text until a URL exists', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText(/CASE STUDY/)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'CASE STUDY' })).not.toBeInTheDocument();
  });

  it('links the case study once a URL is provided', () => {
    render(<ProjectCard project={{ ...project, caseStudyUrl: 'https://example.com/case' }} />);
    expect(screen.getByRole('link', { name: 'CASE STUDY' })).toHaveAttribute(
      'href',
      'https://example.com/case',
    );
  });
});
