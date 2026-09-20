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

  it('renders one card per project', () => {
    render(<SelectedWork />);
    expect(screen.getAllByRole('article')).toHaveLength(3);
    expect(
      screen.getByRole('heading', { level: 3, name: 'FORGE / EVENT CORE' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'NORTHSTAR CLI' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'BASTION CONTROL' })).toBeInTheDocument();
  });
});
