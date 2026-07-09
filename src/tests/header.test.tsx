import { fireEvent, render, screen } from '@testing-library/react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Header } from '@/components/layout/header';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

vi.mock('framer-motion', async () => {
  return {
    AnimatePresence: ({ children }: { children: ReactNode }) => children,
    motion: {
      div: ({ children, ...props }: ComponentPropsWithoutRef<'div'>) => (
        <div {...props}>{children}</div>
      ),
    },
  };
});

describe('Header', () => {
  it('renders desktop navigation links and party CTA', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Schedule' })).toBeInTheDocument();
    expect(
      screen.getAllByRole('link', { name: /Book a Party/i }).length
    ).toBeGreaterThan(0);
  });

  it('opens and closes mobile navigation', () => {
    render(<Header />);

    fireEvent.click(
      screen.getByRole('button', { name: /Open navigation menu/i })
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: /Close navigation menu/i })
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
