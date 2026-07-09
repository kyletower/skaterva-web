import { MapPin, Phone, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { contactInfo, marqueeHighlights } from '@/data/content';

/**
 * A condensed information bar for the homepage.
 *
 * Displays key venue highlights, a quick party booking action, and contact
 * details for location and phone.
 */
export function InfoBarSection() {
  return (
    <section
      className="border-y border-white/6 bg-surface/65"
      aria-label="Hours and location overview"
    >
      <div className="container-shell grid gap-4 py-4 md:grid-cols-[1fr_auto] md:items-center">
        <ul className="flex flex-wrap gap-2" aria-label="Key venue details">
          {marqueeHighlights.slice(0, 4).map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/6 px-3 py-1.5 text-xs text-slate-200 md:text-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent-cyan" />
              {item}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 md:justify-end">
          <Button asChild variant="secondary" size="sm">
            <Link href="/parties">Book a Party</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-slate-200">
            <Link href="/contact" className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {contactInfo.locationLabel}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-slate-200">
            <a
              href={`tel:${contactInfo.phone.replace(/[^\d]/g, '')}`}
              className="inline-flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              {contactInfo.phone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
