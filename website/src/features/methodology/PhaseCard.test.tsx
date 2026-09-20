import { render, screen } from '@testing-library/react';

import type { Phase } from './data';
import { PhaseCard } from './PhaseCard';

const phase: Phase = {
  id: 'demo',
  index: '01',
  phaseLabel: 'PHASE ONE',
  title: 'DEMO',
  description: 'A demo phase.',
  stack: 'AWS · MCP',
};

describe('PhaseCard', () => {
  it('renders the phase details', () => {
    render(<PhaseCard phase={phase} />);
    expect(screen.getByRole('heading', { level: 3, name: 'DEMO' })).toBeInTheDocument();
    expect(screen.getByText('PHASE ONE')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('A demo phase.')).toBeInTheDocument();
    expect(screen.getByText('AWS · MCP')).toBeInTheDocument();
  });
});
