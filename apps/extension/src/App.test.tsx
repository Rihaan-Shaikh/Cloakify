import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
  it('renders the header title', () => {
    render(<App />);
    expect(screen.getByText('Cloakify')).toBeDefined();
  });

  it('renders active status', () => {
    render(<App />);
    expect(screen.getByText('ACTIVE')).toBeDefined();
  });

  it('renders the security button', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /Check Runtime Status/i });
    expect(button).toBeDefined();
  });
});
