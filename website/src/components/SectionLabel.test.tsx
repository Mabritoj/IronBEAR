import { render, screen } from '@testing-library/react';

import { SectionLabel } from './SectionLabel';

describe('SectionLabel', () => {
  it('renders the label text', () => {
    render(<SectionLabel label="Approach" />);
    expect(screen.getByText('Approach')).toBeInTheDocument();
  });
});
