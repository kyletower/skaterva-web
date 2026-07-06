import { describe, expect, it } from 'vitest';

import {
  businessHours,
  contactInfo,
  footerLinks,
  galleryImages,
  navItems,
  quickStats,
  services,
  testimonials,
  trustIndicators,
  upcomingEvents,
} from '@/data/content';
import { cn } from '@/lib/utils';

describe('content exports', () => {
  it('exports required static content collections', () => {
    expect(navItems.length).toBeGreaterThan(0);
    expect(quickStats.length).toBeGreaterThan(0);
    expect(services.length).toBeGreaterThan(0);
    expect(upcomingEvents.length).toBeGreaterThan(0);
    expect(testimonials.length).toBeGreaterThan(0);
    expect(trustIndicators.length).toBeGreaterThan(0);
    expect(galleryImages.length).toBeGreaterThan(0);
    expect(footerLinks.length).toBeGreaterThan(0);
    expect(businessHours.length).toBe(2);
    expect(contactInfo.phone).toMatch(/^\(\d{3}\)\s\d{3}-\d{4}$/);
  });

  it('ensures nav and footer links are route-like', () => {
    for (const item of [...navItems, ...footerLinks]) {
      expect(item.href.startsWith('/')).toBe(true);
    }
  });

  it('ensures service card and gallery content has no empty values', () => {
    for (const item of services) {
      expect(item.title.trim()).not.toBe('');
      expect(item.description.trim()).not.toBe('');
      expect(item.href.trim()).not.toBe('');
    }

    for (const image of galleryImages) {
      expect(image.alt.trim()).not.toBe('');
      expect(image.src.startsWith('/gallery/')).toBe(true);
    }
  });
});

describe('utility functions', () => {
  it('cn merges classes and removes conflicting tailwind values', () => {
    expect(cn('px-2', 'px-4', 'text-white')).toBe('px-4 text-white');
  });

  it('cn handles conditional and falsy values', () => {
    expect(cn('block', false && 'hidden', undefined, 'md:flex')).toBe(
      'block md:flex'
    );
  });
});
