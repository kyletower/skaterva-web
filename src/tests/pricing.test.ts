import { describe, expect, it } from 'vitest';

import { preorderItems } from '@/data/content';
import { calculatePreorderTotalCents, formatCents } from '@/lib/pricing';

describe('calculatePreorderTotalCents', () => {
  it('sums item prices in cents', () => {
    const total = calculatePreorderTotalCents([
      { label: 'A', priceCents: 1200 },
      { label: 'B', priceCents: 400 },
    ]);

    expect(total).toBe(1600);
  });

  it('returns 0 for an empty list', () => {
    expect(calculatePreorderTotalCents([])).toBe(0);
  });

  it('matches the sum of the real preorder menu', () => {
    const expected = preorderItems.reduce(
      (sum, item) => sum + item.priceCents,
      0
    );

    expect(calculatePreorderTotalCents(preorderItems)).toBe(expected);
    expect(calculatePreorderTotalCents(preorderItems)).toBe(2975);
  });
});

describe('formatCents', () => {
  it('formats whole dollar amounts', () => {
    expect(formatCents(1200)).toBe('$12.00');
  });

  it('formats amounts with cents', () => {
    expect(formatCents(2975)).toBe('$29.75');
  });

  it('formats zero', () => {
    expect(formatCents(0)).toBe('$0.00');
  });
});
