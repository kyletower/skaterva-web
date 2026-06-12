'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Gift,
  GraduationCap,
  Music3,
  PartyPopper,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Tickets,
  Users,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type Offering = Feature & { href: string };

type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

const quickStats = [
  { label: 'Family Owned', value: 'Local roots, modern experience' },
  { label: 'Since 1986', value: 'Ashland favorite for generations' },
  { label: 'RVA Favorite', value: 'Trusted by families and schools' },
  { label: 'Safe & Fun', value: 'Friendly staff and organized sessions' },
];

const offerings: Offering[] = [
  {
    title: 'Open Skate',
    description:
      'Public sessions with energetic lighting, clear pacing, and room for every skill level.',
    icon: PlayCircle,
    href: '/schedule',
  },
  {
    title: 'Birthday Parties',
    description:
      'Private party options, food add-ons, and premium packages built to impress families.',
    icon: PartyPopper,
    href: '/parties',
  },
  {
    title: 'Skating Classes',
    description:
      'Structured instruction for beginners through advanced skaters who want to improve fast.',
    icon: GraduationCap,
    href: '/classes',
  },
];

const familyFeatures: Feature[] = [
  {
    title: 'Family Friendly',
    description:
      'A welcoming rink where parents, kids, and grandparents all feel at home.',
    icon: Users,
  },
  {
    title: 'Safe Environment',
    description:
      'Helpful staff, clear rink supervision, and a layout built for confidence.',
    icon: ShieldCheck,
  },
  {
    title: 'Experienced Staff',
    description:
      'A team that knows how to keep sessions organized, lively, and on time.',
    icon: Sparkles,
  },
  {
    title: 'Affordable Fun',
    description:
      'Great value for birthdays, group nights, classes, and weekend skating.',
    icon: Tickets,
  },
  {
    title: 'Great Music',
    description:
      'A modern soundtrack that keeps the rink energized without overwhelming guests.',
    icon: Music3,
  },
  {
    title: 'Community Favorite',
    description:
      'A local tradition for Ashland families, schools, and youth organizations.',
    icon: Gift,
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      'We booked a birthday party here and the whole process was polished, easy, and stress-free. The kids did not want to leave.',
    name: 'Sarah M.',
    detail: 'Birthday party parent',
  },
  {
    quote:
      'The rink feels modern, clean, and upbeat. Our family has made this a regular weekend plan because it is such a good value.',
    name: 'Derrick T.',
    detail: 'Weekend skater',
  },
  {
    quote:
      'Our fundraiser night was organized and successful. The staff kept things moving and our group raised more than expected.',
    name: 'Melanie R.',
    detail: 'Community organizer',
  },
];

const galleryTiles = [
  'Family skate lighting',
  'Birthday party energy',
  'Snack bar and seating',
  'Group class moments',
  'Glow event atmosphere',
  'Community fundraiser night',
];

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

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex]
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      timer = setInterval(() => {
        setActiveIndex((i) => (i + 1) % testimonials.length);
      }, 5200);
    };

    const stop = () => {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [prefersReducedMotion]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="hero-glow absolute left-[8%] top-[14%] h-64 w-64 rounded-full bg-neon-primary/20" />
          <div className="hero-glow absolute right-[10%] top-[26%] h-72 w-72 rounded-full bg-accent-cyan/16" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,rgba(2,6,23,0.25),rgba(2,6,23,0.9))]" />
          {!prefersReducedMotion ? (
            <>
              <motion.div
                className="absolute left-[14%] top-[20%] h-3 w-3 rounded-full bg-accent-cyan shadow-[0_0_24px_rgba(34,211,238,0.85)]"
                animate={{ y: [0, -18, 0], opacity: [0.65, 1, 0.65] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute right-[22%] top-[24%] h-4 w-4 rounded-full bg-neon-primary shadow-[0_0_28px_rgba(217,70,239,0.85)]"
                animate={{ y: [0, 20, 0], x: [0, 8, 0] }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute left-[56%] top-[34%] h-2.5 w-2.5 rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.7)]"
                animate={{ y: [0, -14, 0], opacity: [0.45, 0.9, 0.45] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </>
          ) : null}
        </div>

        <div className="container-shell relative grid min-h-[100svh] items-center py-10 pb-24 pt-8 md:pb-28 md:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl space-y-8"
          >
            <Badge className="border-neon-primary/30 bg-neon-primary/12 text-neon-primary-light">
              Est. 1986
            </Badge>

            <div className="space-y-5">
              <h1 className="text-heading max-w-4xl text-[2.25rem] font-semibold leading-[0.92] tracking-tight text-white sm:text-[3rem] md:text-[4.5rem] lg:text-[4.75rem]">
                RVA&apos;s Premier Roller Skating Experience
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                Create unforgettable memories with public skating, birthday
                parties, classes, and special events in a premium rink that
                feels built for today&apos;s families.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link
                  href="/parties"
                  className="inline-flex items-center gap-2"
                >
                  Book a Party <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link
                  href="/schedule"
                  className="inline-flex items-center gap-2"
                >
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="absolute -inset-4 rounded-[32px] bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.22),transparent_42%),radial-gradient(circle_at_bottom,rgba(34,211,238,0.16),transparent_44%)] blur-3xl" />
            <Card className="relative overflow-hidden border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.86))] p-0">
              <CardContent className="space-y-6 p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Badge className="border-white/10 bg-white/6 text-slate-200">
                      Live Venue Preview
                    </Badge>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-slate-300">
                      Dark atmosphere, neon accents, and a crisp layout built to
                      make party booking feel exciting from the first glance.
                    </p>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-[18px] border border-accent-cyan/20 bg-accent-cyan/10 text-accent-cyan-mid">
                    <Sparkles className="h-6 w-6" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[22px] border border-white/8 bg-white/6 p-5">
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>Tonight&apos;s Session</span>
                      <span className="rounded-full bg-neon-primary/15 px-2.5 py-1 text-xs text-neon-primary-light">
                        Almost Full
                      </span>
                    </div>
                    <div className="mt-3 text-3xl font-semibold text-white">
                      7:00 PM
                    </div>
                    <div className="mt-2 text-sm text-slate-400">
                      Glow skate and open floor.
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-white/8 bg-white/6 p-5">
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>Next Party Slot</span>
                      <span className="rounded-full bg-accent-cyan/15 px-2.5 py-1 text-xs text-accent-cyan-light">
                        Available
                      </span>
                    </div>
                    <div className="mt-3 text-3xl font-semibold text-white">
                      Saturday
                    </div>
                    <div className="mt-2 text-sm text-slate-400">
                      Reserve before it fills.
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 rounded-[24px] border border-white/8 bg-[linear-gradient(135deg,rgba(217,70,239,0.12),rgba(34,211,238,0.08))] p-5 sm:grid-cols-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Capacity
                    </div>
                    <div className="mt-2 text-lg font-semibold text-white">
                      Family-sized floor
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Music
                    </div>
                    <div className="mt-2 text-lg font-semibold text-white">
                      Modern, upbeat, clean
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Service
                    </div>
                    <div className="mt-2 text-lg font-semibold text-white">
                      Helpful and fast
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-y border-white/6 bg-surface/65">
        <div className="container-shell py-4 md:py-5">
          <div className="marquee-track">
            <div className="marquee gap-8 text-sm text-slate-200 md:text-base">
              {[
                "Today's Hours: 12 PM - 10 PM",
                'Ashland, Virginia',
                'Phone: (804) 555-0196',
                'Upcoming Event: Glow Night Skate',
                'Family Parties Available Every Weekend',
                "Today's Hours: 12 PM - 10 PM",
                'Ashland, Virginia',
                'Phone: (804) 555-0196',
                'Upcoming Event: Glow Night Skate',
                'Family Parties Available Every Weekend',
              ].map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  aria-hidden={index >= 5 ? 'true' : undefined}
                  className="inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-white/8 bg-white/6 px-4 py-2"
                >
                  <Sparkles className="h-4 w-4 text-accent-cyan" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="section-gradient py-20 md:py-28">
        <div className="container-shell space-y-12">
          <div className="max-w-3xl space-y-4">
            <Badge className="border-accent-cyan/20 bg-accent-cyan/10 text-accent-cyan-light">
              What We Offer
            </Badge>
            <h2 className="text-heading text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Everything families need for a great rink day.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Open skating, birthday parties, and structured classes all live
              under one premium, easy-to-understand experience.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {offerings.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={prefersReducedMotion ? undefined : { y: -8 }}
              >
                <Card className="group h-full transition-shadow duration-300 hover:shadow-[0_24px_70px_rgba(217,70,239,0.18)]">
                  <CardContent className="flex h-full flex-col gap-6 p-6 md:p-7">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[20px] border border-white/8 bg-white/6 text-neon-primary-light transition-colors group-hover:bg-neon-primary/15 group-hover:text-white">
                      <item.icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-heading text-2xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-base leading-7 text-slate-300">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Families Choose Us */}
      <section className="py-20 md:py-28">
        <div className="container-shell">
          <div className="max-w-3xl space-y-4">
            <Badge className="border-accent-cyan/20 bg-accent-cyan/10 text-accent-cyan-light">
              Why Families Choose Us
            </Badge>
            <h2 className="text-heading text-3xl font-semibold tracking-tight text-white md:text-5xl">
              A rink experience built on trust, comfort, and momentum.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Every detail supports the feeling parents want: safe, easy to
              understand, and worth coming back to all year long.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {familyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="h-full border-white/8 bg-white/5">
                  <CardContent className="flex items-start gap-4 p-5 md:p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-accent-cyan/10 text-accent-cyan-mid">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-7 text-slate-300">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-gradient py-20 md:py-28">
        <div className="container-shell space-y-10">
          <div className="max-w-3xl space-y-4">
            <Badge className="border-accent-cyan/20 bg-accent-cyan/10 text-accent-cyan-light">
              Testimonials
            </Badge>
            <h2 className="text-heading text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Real-sounding feedback that builds trust fast.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              A rotating testimonial area helps the page feel active and
              credible while reinforcing birthday-party and family-night
              conversions.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                <Card className="h-full border-white/8 bg-white/5">
                  <CardContent className="space-y-6 p-6 md:p-8">
                    <div className="flex gap-1 text-accent-cyan">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-2xl leading-10 text-white md:text-[2rem]">
                      &ldquo;{activeTestimonial.quote}&rdquo;
                    </p>
                    <div>
                      <div className="text-lg font-semibold text-white">
                        {activeTestimonial.name}
                      </div>
                      <div className="text-sm text-slate-400">
                        {activeTestimonial.detail}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            <div className="grid gap-4">
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'rounded-[22px] border p-5 text-left transition-all duration-300',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    index === activeIndex
                      ? 'border-neon-primary/30 bg-neon-primary/12 shadow-[0_12px_40px_rgba(217,70,239,0.12)]'
                      : 'border-white/8 bg-white/5 hover:bg-white/8'
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-base font-semibold text-white">
                      {item.name}
                    </div>
                    <div className="rounded-full border border-white/8 px-2.5 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-400">
                      {index + 1}
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {item.detail}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 md:py-28">
        <div className="container-shell space-y-10">
          <div className="max-w-3xl space-y-4">
            <Badge className="border-accent-cyan/20 bg-accent-cyan/10 text-accent-cyan-light">
              Gallery
            </Badge>
            <h2 className="text-heading text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Life at the Rink
            </h2>
            <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Neon lights, smooth floors, and a crowd that comes back every
              weekend. This is what skating in Ashland looks like.
            </p>
          </div>

          <div className="grid-masonry">
            {galleryTiles.map((tile, index) => (
              <motion.div
                key={tile}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                className={cn(
                  'group relative overflow-hidden rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,24,39,0.95),rgba(2,6,23,0.95))] p-5',
                  index % 3 === 0
                    ? 'min-h-[320px]'
                    : index % 3 === 1
                      ? 'min-h-[240px]'
                      : 'min-h-[280px]'
                )}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_35%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 border border-white/0 transition-colors group-hover:border-white/10" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <Badge className="border-white/10 bg-black/20 text-slate-200">
                      Photo Moment
                    </Badge>
                    <Sparkles className="h-5 w-5 text-accent-cyan" />
                  </div>
                  <div className="mt-auto">
                    <div className="text-heading text-2xl font-semibold text-white">
                      {tile}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
