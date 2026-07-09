import { CheckCircle2 } from 'lucide-react';

import { CheckAvailabilityButton } from '@/components/parties/check-availability-button';
import { ReservePartyButton } from '@/components/parties/reserve-party-button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { SectionIntro } from '@/components/ui/section-intro';
import { partyInclusions } from '@/data/content';

export default function PartiesPage() {
  return (
    <section className="section-gradient py-20 md:py-28">
      <div className="container-shell grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="animate-fade-in-left space-y-6">
          <SectionIntro
            level={1}
            eyebrow="Birthday Parties"
            title="The kind of party parents remember for the right reasons."
            description="Reserved space, easy planning, and flexible food add-ons make this a strong conversion section for families who want the celebration to feel simple and special."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {partyInclusions.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-[18px] border border-white/8 bg-white/6 px-4 py-3"
              >
                <CheckCircle2 className="h-5 w-5 text-accent-cyan" />
                <span className="text-sm font-medium text-slate-100">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <ReservePartyButton size="lg">Reserve Your Party</ReservePartyButton>
        </div>

        <div className="animate-fade-in-right">
          <Card className="overflow-hidden border-white/10">
            <CardHeader className="space-y-3 p-6 md:p-7">
              <Badge className="border-neon-primary/25 bg-neon-primary/12 text-neon-hover-light">
                Party Packages
              </Badge>
              <h2 className="text-heading text-2xl font-semibold text-white">
                Premium pricing that feels organized.
              </h2>
              <p className="text-sm leading-7 text-slate-300">
                Showcase the pricing tiers, package value, and optional upgrades
                so parents can make a fast decision.
              </p>
            </CardHeader>

            <CardContent className="grid gap-4 p-6 pt-0 md:p-7 md:pt-0">
              <div className="rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(217,70,239,0.12),rgba(15,23,42,0.6))] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      Most Popular
                    </div>
                    <div className="mt-2 text-2xl font-semibold text-white">
                      The Glow Package
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">Starting at</div>
                    <div className="text-3xl font-semibold text-white">
                      $249
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
                  <div className="rounded-[16px] bg-white/6 px-4 py-3">
                    90 minutes of party time
                  </div>
                  <div className="rounded-[16px] bg-white/6 px-4 py-3">
                    Admission and rentals
                  </div>
                  <div className="rounded-[16px] bg-white/6 px-4 py-3">
                    Reserved seating area
                  </div>
                  <div className="rounded-[16px] bg-white/6 px-4 py-3">
                    Add-on food packages
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t border-white/8 p-6 md:p-7">
              <div className="text-sm text-slate-400">
                Dates fill quickly on weekends.
              </div>
              <CheckAvailabilityButton variant="secondary" size="sm">
                Check Availability
              </CheckAvailabilityButton>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
