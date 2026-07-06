import { render, screen } from '@testing-library/react';
import type { ComponentPropsWithoutRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { HeroSection } from '@/components/home/hero-section';

vi.mock('framer-motion', async () => {
  return {
    motion: {
      div: ({ children, ...props }: ComponentPropsWithoutRef<'div'>) => (
        <div {...props}>{children}</div>
      ),
      aside: ({ children, ...props }: ComponentPropsWithoutRef<'aside'>) => (
        <aside {...props}>{children}</aside>
      ),
    },
    useReducedMotion: () => true,
  };
});

describe('HeroSection', () => {
  it('renders headline and key CTAs', () => {
    render(<HeroSection />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /RVA's Premier Roller Skating Experience/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Book a Party/i })).toBeVisible();
    expect(screen.getByRole('link', { name: /View Schedule/i })).toBeVisible();
  });
});
