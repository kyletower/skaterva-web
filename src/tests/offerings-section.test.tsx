import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { OfferingsSection } from '@/components/home/offerings-section';
import { services, trustIndicators } from '@/data/content';

describe('OfferingsSection', () => {
  it('renders all service cards and trust indicators', () => {
    render(<OfferingsSection />);

    for (const service of services) {
      expect(
        screen.getByRole('heading', { name: service.title })
      ).toBeInTheDocument();
    }

    for (const indicator of trustIndicators) {
      expect(screen.getByText(indicator.title)).toBeInTheDocument();
    }
  });
});
