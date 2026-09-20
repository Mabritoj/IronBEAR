import { render, screen } from '@testing-library/react';

import { Container } from './Container';

describe('Container', () => {
  it('renders its children', () => {
    render(
      <Container>
        <p>content</p>
      </Container>,
    );
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
