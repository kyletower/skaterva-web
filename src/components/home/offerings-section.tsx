import {
  ChevronRight,
  Gift,
  GraduationCap,
  Music3,
  PartyPopper,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Tickets,
  Users,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { services, trustIndicators } from '@/data/content';

const serviceIcons = {
  play: PlayCircle,
  party: PartyPopper,
  class: GraduationCap,
};

const trustIcons = {
  users: Users,
  shield: ShieldCheck,
  sparkles: Sparkles,
  ticket: Tickets,
  music: Music3,
  gift: Gift,
};

export function OfferingsSection() {
  return (
    <section
      className="section-gradient py-14 md:py-16"
      aria-labelledby="offerings-title"
    >
      <div className="container-shell space-y-8">
        <div className="max-w-3xl space-y-4">
          <Badge className="border-accent-cyan/20 bg-accent-cyan/10 text-accent-cyan-light">
            What We Offer + Why Families Choose Us
          </Badge>
          <h2
            id="offerings-title"
            className="text-heading text-3xl font-semibold tracking-tight text-white md:text-4xl"
          >
            Everything families need for a great rink day.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Open skating, classes, and parties in a trusted environment with a
            clear, family-first experience.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {services.map((item) => {
            const Icon = serviceIcons[item.icon];
            return (
              <Card key={item.title} className="group h-full border-white/10">
                <CardContent className="flex h-full flex-col gap-4 p-5 md:p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[16px] border border-white/8 bg-white/6 text-neon-primary-light transition-colors group-hover:bg-neon-primary/15 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-heading text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-7 text-slate-300">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <Button asChild variant="secondary" size="sm">
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-2"
                      >
                        Learn More <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {trustIndicators.map((item) => {
            const Icon = trustIcons[item.icon];
            return (
              <div
                key={item.title}
                className="rounded-[18px] border border-white/8 bg-white/5 p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-accent-cyan/10 text-accent-cyan-mid">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
