import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Footer } from '@/components/layout/footer';

describe('Footer', () => {
  it('renders footer navigation and social links', () => {
    render(<Footer />);

    expect(screen.getAllByText(/Ashland Skateland/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute(
      'href',
      'https://instagram.com'
    );
    expect(screen.getByRole('link', { name: 'Facebook' })).toHaveAttribute(
      'href',
      'https://facebook.com'
    );
  });
});
