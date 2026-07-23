import type { PreorderItem } from '@/data/content';

/**
 * Formats an integer cents amount as a USD currency string.
 */
export function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

/**
 * Sums preorder item prices into a single total, in cents.
 */
export function calculatePreorderTotalCents(items: PreorderItem[]): number {
  return items.reduce((total, item) => total + item.priceCents, 0);
}
