'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CalendarDays } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { quickStats } from '@/data/content';

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-white/8 bg-white/6 px-4 py-3 backdrop-blur-md">
      <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="hero-glow absolute left-[8%] top-[14%] h-64 w-64 rounded-full bg-neon-primary/20" />
        <div className="hero-glow absolute right-[10%] top-[26%] h-72 w-72 rounded-full bg-accent-cyan/16" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,rgba(2,6,23,0.25),rgba(2,6,23,0.9))]" />
      </div>

      <div className="container-shell relative grid items-center gap-8 py-10 pb-12 pt-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="max-w-3xl space-y-7"
        >
          <Badge className="border-neon-primary/30 bg-neon-primary/12 text-neon-primary-light">
            Est. 1986
          </Badge>

          <div className="space-y-4">
            <h1 className="text-heading max-w-4xl text-[2.2rem] font-semibold leading-[0.95] tracking-tight text-white sm:text-[3rem] md:text-[4.25rem]">
              RVA&apos;s Premier Roller Skating Experience
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              Public skating, birthday parties, classes, and community events in
              a premium rink experience built for modern families.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/parties" className="inline-flex items-center gap-2">
                Book a Party <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/schedule" className="inline-flex items-center gap-2">
                View Schedule <CalendarDays className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {quickStats.map((item) => (
              <QuickStat
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: 'easeOut' }}
          className="relative"
          aria-label="Venue snapshot"
        >
          <div className="absolute -inset-4 rounded-[32px] bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.22),transparent_42%),radial-gradient(circle_at_bottom,rgba(34,211,238,0.16),transparent_44%)] blur-3xl" />
          <div className="relative space-y-4 rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.86))] p-6 md:p-7">
            <Badge className="border-white/10 bg-white/6 text-slate-200">
              Live Venue Preview
            </Badge>
            <p className="text-sm leading-7 text-slate-300">
              Dark atmosphere, neon accents, and a crisp layout built to make
              booking feel exciting at first glance.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[18px] border border-white/8 bg-white/6 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Tonight&apos;s Session
                </div>
                <div className="mt-2 text-2xl font-semibold text-white">
                  7:00 PM
                </div>
                <div className="mt-1 text-sm text-slate-400">
                  Glow skate and open floor
                </div>
              </div>
              <div className="rounded-[18px] border border-white/8 bg-white/6 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Next Party Slot
                </div>
                <div className="mt-2 text-2xl font-semibold text-white">
                  Saturday
                </div>
                <div className="mt-1 text-sm text-slate-400">
                  Reserve before it fills
                </div>
              </div>
            </div>
            <div className="grid gap-3 rounded-[20px] border border-white/8 bg-[linear-gradient(135deg,rgba(217,70,239,0.12),rgba(34,211,238,0.08))] p-4 sm:grid-cols-3">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Capacity
                </div>
                <div className="mt-1 text-sm font-semibold text-white">
                  Family-sized floor
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Music
                </div>
                <div className="mt-1 text-sm font-semibold text-white">
                  Modern and upbeat
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Service
                </div>
                <div className="mt-1 text-sm font-semibold text-white">
                  Helpful and fast
                </div>
              </div>
            </div>
            {!prefersReducedMotion ? (
              <motion.div
                className="h-1 rounded-full bg-[linear-gradient(90deg,rgba(217,70,239,0.25),rgba(34,211,238,0.25))]"
                animate={{ opacity: [0.55, 1, 0.55] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ) : null}
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
