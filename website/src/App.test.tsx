import { render, screen } from '@testing-library/react';

import { App } from './App';

describe('App', () => {
  it('renders the banner and main landmarks', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
