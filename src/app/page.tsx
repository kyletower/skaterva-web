"use client";

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Dumbbell,
  Gift,
  GraduationCap,
  MapPin,
  Menu,
  Mic2,
  Music3,
  PartyPopper,
  Phone,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Tickets,
  Users,
  Utensils,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type NavItem = {
  label: string;
  href: string;
};

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type EventItem = {
  day: string;
  title: string;
  time: string;
  badge: string;
  description: string;
};

type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Classes', href: '#classes' },
  { label: 'Parties', href: '#parties' },
  { label: 'Fundraisers', href: '#fundraisers' },
  { label: 'Snack Bar', href: '#snack-bar' },
  { label: 'Contact', href: '#contact' },
];

const quickStats = [
  { label: 'Family Owned', value: 'Local roots, modern experience' },
  { label: 'Since 1986', value: 'Ashland favorite for generations' },
  { label: 'RVA Favorite', value: 'Trusted by families and schools' },
  { label: 'Safe & Fun', value: 'Friendly staff and organized sessions' },
];

const offerings: Feature[] = [
  {
    title: 'Open Skate',
    description:
      'Public sessions with energetic lighting, clear pacing, and room for every skill level.',
    icon: PlayCircle,
  },
  {
    title: 'Birthday Parties',
    description:
      'Private party options, food add-ons, and premium packages built to impress families.',
    icon: PartyPopper,
  },
  {
    title: 'Skating Classes',
    description:
      'Structured instruction for beginners through advanced skaters who want to improve fast.',
    icon: GraduationCap,
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

const classes = [
  {
    level: 'Beginner Classes',
    detail:
      'Learn balance, stopping, turning, and rink confidence in a supportive setting.',
  },
  {
    level: 'Intermediate Classes',
    detail:
      'Develop stride control, smoother transitions, and better control in group sessions.',
  },
  {
    level: 'Advanced Skills',
    detail:
      'Challenge yourself with speed, style, precision work, and polished floor technique.',
  },
];

const fundraiserSteps = [
  {
    title: 'Schedule',
    detail:
      'Lock in a date for your school, church, sports team, or neighborhood group.',
  },
  {
    title: 'Promote',
    detail:
      'Share a clear invitation with families and supporters before the event night.',
  },
  {
    title: 'Skate Night',
    detail:
      'Hosts, families, and skaters enjoy a smooth event with a built-in revenue window.',
  },
  {
    title: 'Earn Funds',
    detail:
      'Raise money through a simple, dependable, and repeatable community event.',
  },
];

const upcomingEvents: EventItem[] = [
  {
    day: 'Fri 14',
    title: 'Glow Night Skate',
    time: '7:00 PM - 10:00 PM',
    badge: 'Theme Night',
    description:
      'Blacklight energy, neon vibes, and a packed floor with family-friendly music.',
  },
  {
    day: 'Sat 15',
    title: 'Family Afternoon Session',
    time: '1:00 PM - 4:00 PM',
    badge: 'Popular',
    description:
      'A smoother tempo with space for beginners, birthday groups, and all ages.',
  },
  {
    day: 'Sun 16',
    title: 'Holiday Team Skate',
    time: '5:30 PM - 8:30 PM',
    badge: 'Special Event',
    description:
      'Great for youth teams, church groups, and pre-planned celebration nights.',
  },
];

const preorderItems = [
  { label: 'Admission', price: '$12.00' },
  { label: 'Skate Rentals', price: '$4.00' },
  { label: 'Snack Bar Items', price: '$8.50' },
  { label: 'Drink Bundle', price: '$5.25' },
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

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className='max-w-3xl space-y-4'>
      <Badge className='border-[#22d3ee]/20 bg-[#22d3ee]/10 text-[#a5f3fc]'>
        {eyebrow}
      </Badge>
      <h2 className='text-heading text-3xl font-semibold tracking-tight text-white md:text-5xl'>
        {title}
      </h2>
      <p className='max-w-2xl text-base leading-8 text-slate-300 md:text-lg'>
        {description}
      </p>
    </div>
  );
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className='rounded-[20px] border border-white/8 bg-white/6 px-4 py-3 backdrop-blur-md'>
      <div className='text-xs uppercase tracking-[0.24em] text-slate-400'>{label}</div>
      <div className='mt-1 text-sm font-semibold text-white'>{value}</div>
    </div>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const activeTestimonial = useMemo(
    () => testimonials[activeTestimonialIndex],
    [activeTestimonialIndex],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonialIndex((current) => (current + 1) % testimonials.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <div className='flex min-h-screen flex-col text-slate-50'>
      <a
        href='#home'
        className='sr-only rounded-full border border-[#22d3ee]/40 bg-[#020617] px-4 py-2 text-sm text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70]'
      >
        Skip to content
      </a>

      <header className='sticky top-0 z-50 border-b border-white/6 bg-[#020617]/75 backdrop-blur-xl supports-[backdrop-filter]:bg-[#020617]/65'>
        <div className='container-shell flex h-20 items-center justify-between gap-4'>
          <a href='#home' className='group flex items-center gap-3 text-left'>
            <div className='flex h-12 w-12 items-center justify-center rounded-[16px] border border-white/10 bg-white/6 shadow-[0_0_30px_rgba(217,70,239,0.22)]'>
              <Sparkles className='h-6 w-6 text-[#d946ef] transition-transform duration-300 group-hover:rotate-12' />
            </div>
            <div>
              <div className='text-heading text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-slate-300'>
                Ashland Skateland
              </div>
              <div className='text-[0.68rem] uppercase tracking-[0.34em] text-slate-500'>
                Est. 1986
              </div>
            </div>
          </a>

          <nav className='hidden items-center gap-1 xl:flex'>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className='rounded-full px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-white/6 hover:text-white'
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className='flex items-center gap-3'>
            <Button asChild className='hidden md:inline-flex' size='md'>
              <a href='#parties'>Book a Party</a>
            </Button>
            <button
              type='button'
              className='inline-flex h-12 w-12 items-center justify-center rounded-[16px] border border-white/10 bg-white/6 text-slate-50 transition hover:bg-white/10 xl:hidden'
              onClick={() => setMobileOpen(true)}
              aria-label='Open navigation menu'
              aria-expanded={mobileOpen}
              aria-controls='mobile-navigation'
            >
              <Menu className='h-5 w-5' />
            </button>
          </div>
        </div>
      </header>

      <main id='home' className='flex-1'>
        <section className='relative overflow-hidden'>
          <div className='absolute inset-0'>
            <div className='hero-glow absolute left-[8%] top-[14%] h-64 w-64 rounded-full bg-[#d946ef]/20' />
            <div className='hero-glow absolute right-[10%] top-[26%] h-72 w-72 rounded-full bg-[#22d3ee]/16' />
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,rgba(2,6,23,0.25),rgba(2,6,23,0.9))]' />
            {!prefersReducedMotion ? (
              <>
                <motion.div
                  className='absolute left-[14%] top-[20%] h-3 w-3 rounded-full bg-[#22d3ee] shadow-[0_0_24px_rgba(34,211,238,0.85)]'
                  animate={{ y: [0, -18, 0], opacity: [0.65, 1, 0.65] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className='absolute right-[22%] top-[24%] h-4 w-4 rounded-full bg-[#d946ef] shadow-[0_0_28px_rgba(217,70,239,0.85)]'
                  animate={{ y: [0, 20, 0], x: [0, 8, 0] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className='absolute left-[56%] top-[34%] h-2.5 w-2.5 rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.7)]'
                  animate={{ y: [0, -14, 0], opacity: [0.45, 0.9, 0.45] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </>
            ) : null}
          </div>

          <div className='container-shell relative grid min-h-[100svh] items-center py-10 pb-24 pt-8 md:pb-28 md:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10'>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className='max-w-3xl space-y-8'
            >
              <Badge className='border-[#d946ef]/30 bg-[#d946ef]/12 text-[#f5d0fe]'>
                Est. 1986
              </Badge>

              <div className='space-y-5'>
                <h1 className='text-heading max-w-4xl text-[2.25rem] font-semibold leading-[0.92] tracking-tight text-white sm:text-[3rem] md:text-[4.5rem] lg:text-[4.75rem]'>
                  RVA&apos;s Premier Roller Skating Experience
                </h1>
                <p className='max-w-2xl text-lg leading-8 text-slate-300 md:text-xl'>
                  Create unforgettable memories with public skating, birthday
                  parties, classes, and special events in a premium rink that feels
                  built for today&apos;s families.
                </p>
              </div>

              <div className='flex flex-col gap-3 sm:flex-row'>
                <Button asChild size='lg'>
                  <a href='#parties' className='inline-flex items-center gap-2'>
                    Book a Party <ArrowRight className='h-5 w-5' />
                  </a>
                </Button>
                <Button asChild variant='secondary' size='lg'>
                  <a href='#schedule' className='inline-flex items-center gap-2'>
                    View Schedule <CalendarDays className='h-5 w-5' />
                  </a>
                </Button>
              </div>

              <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
                {quickStats.map((item) => (
                  <QuickStat key={item.label} label={item.label} value={item.value} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className='relative mt-8 lg:mt-0'
            >
              <div className='absolute -inset-4 rounded-[32px] bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.22),transparent_42%),radial-gradient(circle_at_bottom,rgba(34,211,238,0.16),transparent_44%)] blur-3xl' />
              <Card className='relative overflow-hidden border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.86))] p-0'>
                <CardContent className='space-y-6 p-6 md:p-8'>
                  <div className='flex items-start justify-between gap-4'>
                    <div>
                      <Badge className='border-white/10 bg-white/6 text-slate-200'>
                        Live Venue Preview
                      </Badge>
                      <p className='mt-3 max-w-sm text-sm leading-7 text-slate-300'>
                        Dark atmosphere, neon accents, and a crisp layout built to
                        make party booking feel exciting from the first glance.
                      </p>
                    </div>
                    <div className='flex h-14 w-14 items-center justify-center rounded-[18px] border border-[#22d3ee]/20 bg-[#22d3ee]/10 text-[#67e8f9]'>
                      <Sparkles className='h-6 w-6' />
                    </div>
                  </div>

                  <div className='grid gap-4 sm:grid-cols-2'>
                    <div className='rounded-[22px] border border-white/8 bg-white/6 p-5'>
                      <div className='flex items-center justify-between text-sm text-slate-300'>
                        <span>Tonight&apos;s Session</span>
                        <span className='rounded-full bg-[#d946ef]/15 px-2.5 py-1 text-xs text-[#f5d0fe]'>
                          Almost Full
                        </span>
                      </div>
                      <div className='mt-3 text-3xl font-semibold text-white'>7:00 PM</div>
                      <div className='mt-2 text-sm text-slate-400'>Glow skate and open floor.</div>
                    </div>

                    <div className='rounded-[22px] border border-white/8 bg-white/6 p-5'>
                      <div className='flex items-center justify-between text-sm text-slate-300'>
                        <span>Next Party Slot</span>
                        <span className='rounded-full bg-[#22d3ee]/15 px-2.5 py-1 text-xs text-[#a5f3fc]'>
                          Available
                        </span>
                      </div>
                      <div className='mt-3 text-3xl font-semibold text-white'>Saturday</div>
                      <div className='mt-2 text-sm text-slate-400'>Reserve before it fills.</div>
                    </div>
                  </div>

                  <div className='grid gap-3 rounded-[24px] border border-white/8 bg-[linear-gradient(135deg,rgba(217,70,239,0.12),rgba(34,211,238,0.08))] p-5 sm:grid-cols-3'>
                    <div>
                      <div className='text-xs uppercase tracking-[0.2em] text-slate-400'>
                        Capacity
                      </div>
                      <div className='mt-2 text-lg font-semibold text-white'>Family-sized floor</div>
                    </div>
                    <div>
                      <div className='text-xs uppercase tracking-[0.2em] text-slate-400'>Music</div>
                      <div className='mt-2 text-lg font-semibold text-white'>Modern, upbeat, clean</div>
                    </div>
                    <div>
                      <div className='text-xs uppercase tracking-[0.2em] text-slate-400'>Service</div>
                      <div className='mt-2 text-lg font-semibold text-white'>Helpful and fast</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className='border-y border-white/6 bg-[#0f172a]/65'>
          <div className='container-shell py-4 md:py-5'>
            <div className='marquee-track'>
              <div className='marquee gap-8 text-sm text-slate-200 md:text-base'>
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
                    className='inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-white/8 bg-white/6 px-4 py-2'
                  >
                    <Sparkles className='h-4 w-4 text-[#22d3ee]' />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className='section-gradient py-20 md:py-28'>
          <div className='container-shell space-y-12'>
            <SectionIntro
              eyebrow='What We Offer'
              title='Everything families need for a great rink day.'
              description='Open skating, birthday parties, and structured classes all live under one premium, easy-to-understand experience.'
            />

            <div className='grid gap-5 lg:grid-cols-3'>
              {offerings.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={prefersReducedMotion ? undefined : { y: -8 }}
                >
                  <Card className='group h-full transition-shadow duration-300 hover:shadow-[0_24px_70px_rgba(217,70,239,0.18)]'>
                    <CardContent className='flex h-full flex-col gap-6 p-6 md:p-7'>
                      <div className='flex h-16 w-16 items-center justify-center rounded-[20px] border border-white/8 bg-white/6 text-[#f5d0fe] transition-colors group-hover:bg-[#d946ef]/15 group-hover:text-white'>
                        <item.icon className='h-7 w-7 transition-transform duration-300 group-hover:scale-110' />
                      </div>
                      <div className='space-y-3'>
                        <h3 className='text-heading text-2xl font-semibold text-white'>
                          {item.title}
                        </h3>
                        <p className='text-base leading-7 text-slate-300'>
                          {item.description}
                        </p>
                      </div>
                      <div className='mt-auto'>
                        <Button variant='secondary' size='sm'>
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className='py-20 md:py-28'>
          <div className='container-shell'>
            <SectionIntro
              eyebrow='Why Families Choose Us'
              title='A rink experience built on trust, comfort, and momentum.'
              description='Every detail supports the feeling parents want: safe, easy to understand, and worth coming back to all year long.'
            />

            <div className='mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
              {familyFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className='h-full border-white/8 bg-white/5'>
                    <CardContent className='flex items-start gap-4 p-5 md:p-6'>
                      <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[#22d3ee]/10 text-[#67e8f9]'>
                        <feature.icon className='h-5 w-5' />
                      </div>
                      <div className='space-y-2'>
                        <h3 className='text-lg font-semibold text-white'>{feature.title}</h3>
                        <p className='text-sm leading-7 text-slate-300'>{feature.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id='parties' className='section-gradient py-20 md:py-28'>
          <div className='container-shell grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center'>
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
              className='space-y-6'
            >
              <SectionIntro
                eyebrow='Birthday Parties'
                title='The kind of party parents remember for the right reasons.'
                description='Reserved space, easy planning, and flexible food add-ons make this a strong conversion section for families who want the celebration to feel simple and special.'
              />

              <div className='grid gap-4 sm:grid-cols-2'>
                {[
                  'Private party options',
                  'Group packages',
                  'Food add-ons',
                  'Skate rentals included',
                  'Party rooms',
                  'Staff support on site',
                ].map((item) => (
                  <div
                    key={item}
                    className='flex items-center gap-3 rounded-[18px] border border-white/8 bg-white/6 px-4 py-3'
                  >
                    <CheckCircle2 className='h-5 w-5 text-[#22d3ee]' />
                    <span className='text-sm font-medium text-slate-100'>{item}</span>
                  </div>
                ))}
              </div>

              <Button size='lg'>Reserve Your Party</Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
            >
              <Card className='overflow-hidden border-white/10'>
                <CardHeader className='space-y-3 p-6 md:p-7'>
                  <Badge className='border-[#d946ef]/25 bg-[#d946ef]/12 text-[#f9a8d4]'>
                    Party Packages
                  </Badge>
                  <h3 className='text-heading text-2xl font-semibold text-white'>
                    Premium pricing that feels organized.
                  </h3>
                  <p className='text-sm leading-7 text-slate-300'>
                    Showcase the pricing tiers, package value, and optional upgrades so parents can make a fast decision.
                  </p>
                </CardHeader>

                <CardContent className='grid gap-4 p-6 pt-0 md:p-7 md:pt-0'>
                  <div className='rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(217,70,239,0.12),rgba(15,23,42,0.6))] p-5'>
                    <div className='flex items-center justify-between gap-4'>
                      <div>
                        <div className='text-xs uppercase tracking-[0.24em] text-slate-400'>
                          Most Popular
                        </div>
                        <div className='mt-2 text-2xl font-semibold text-white'>The Glow Package</div>
                      </div>
                      <div className='text-right'>
                        <div className='text-sm text-slate-400'>Starting at</div>
                        <div className='text-3xl font-semibold text-white'>$249</div>
                      </div>
                    </div>
                    <div className='mt-4 grid gap-3 text-sm text-slate-200 sm:grid-cols-2'>
                      <div className='rounded-[16px] bg-white/6 px-4 py-3'>90 minutes of party time</div>
                      <div className='rounded-[16px] bg-white/6 px-4 py-3'>Admission and rentals</div>
                      <div className='rounded-[16px] bg-white/6 px-4 py-3'>Reserved seating area</div>
                      <div className='rounded-[16px] bg-white/6 px-4 py-3'>Add-on food packages</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='flex items-center justify-between border-t border-white/8 p-6 md:p-7'>
                  <div className='text-sm text-slate-400'>Dates fill quickly on weekends.</div>
                  <Button variant='secondary' size='sm'>
                    Check Availability
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </section>

        <section id='classes' className='py-20 md:py-28'>
          <div className='container-shell space-y-10'>
            <SectionIntro
              eyebrow='Skating Classes'
              title='Organized instruction for skaters who want to improve.'
              description='The presentation stays structured and professional so classes feel like a serious offering, not a filler section.'
            />

            <div className='grid gap-5 lg:grid-cols-[0.9fr_1.1fr]'>
              <Card className='border-white/8 bg-white/5'>
                <CardContent className='space-y-5 p-6 md:p-7'>
                  <div className='flex items-center gap-3 text-[#67e8f9]'>
                    <Dumbbell className='h-5 w-5' />
                    <span className='text-sm font-semibold uppercase tracking-[0.24em]'>Class Progression</span>
                  </div>
                  <div className='space-y-4'>
                    {classes.map((item, index) => (
                      <div key={item.level} className='flex gap-4'>
                        <div className='flex flex-col items-center'>
                          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-white/8 text-sm font-semibold text-white'>
                            {index + 1}
                          </div>
                          {index < classes.length - 1 ? (
                            <div className='mt-2 h-full w-px bg-white/10' />
                          ) : null}
                        </div>
                        <div className='pb-6'>
                          <h3 className='text-lg font-semibold text-white'>{item.level}</h3>
                          <p className='mt-2 text-sm leading-7 text-slate-300'>{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className='grid gap-4'>
                {[
                  'Clear skill levels help families understand where to start.',
                  'Class scheduling should be easy to scan from mobile.',
                  'Pricing and sessions can be added once the booking flow is live.',
                ].map((point) => (
                  <Card key={point} className='border-white/8 bg-white/5'>
                    <CardContent className='flex items-start gap-4 p-5 md:p-6'>
                      <div className='flex h-11 w-11 items-center justify-center rounded-[16px] bg-[#d946ef]/10 text-[#f9a8d4]'>
                        <Star className='h-5 w-5' />
                      </div>
                      <p className='text-sm leading-7 text-slate-300'>{point}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id='fundraisers' className='section-gradient py-20 md:py-28'>
          <div className='container-shell space-y-10'>
            <SectionIntro
              eyebrow='Fundraisers'
              title='A dependable revenue night for schools and community groups.'
              description='This section is intentionally revenue-focused and easy to understand: schedule it, share it, skate, and raise funds.'
            />

            <div className='grid gap-6 lg:grid-cols-[0.95fr_1.05fr]'>
              <Card className='border-white/8 bg-white/5'>
                <CardContent className='space-y-5 p-6 md:p-7'>
                  <div className='flex items-center gap-3 text-[#a5f3fc]'>
                    <Gift className='h-5 w-5' />
                    <span className='text-sm font-semibold uppercase tracking-[0.24em]'>Groups We Support</span>
                  </div>
                  <div className='grid gap-3 sm:grid-cols-2'>
                    {['Schools', 'Churches', 'Sports Teams', 'Community Organizations'].map(
                      (group) => (
                        <div
                          key={group}
                          className='rounded-[18px] border border-white/8 bg-white/6 px-4 py-3 text-sm font-medium text-slate-100'
                        >
                          {group}
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className='border-white/8 bg-white/5'>
                <CardContent className='p-6 md:p-7'>
                  <div className='grid gap-4 md:grid-cols-4'>
                    {fundraiserSteps.map((step, index) => (
                      <div
                        key={step.title}
                        className='relative rounded-[20px] border border-white/8 bg-white/6 p-4'
                      >
                        <div className='text-xs uppercase tracking-[0.24em] text-slate-500'>
                          0{index + 1}
                        </div>
                        <h3 className='mt-2 text-base font-semibold text-white'>{step.title}</h3>
                        <p className='mt-2 text-sm leading-7 text-slate-300'>{step.detail}</p>
                        {index < fundraiserSteps.length - 1 ? (
                          <ChevronRight className='absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-[#22d3ee] md:block' />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id='schedule' className='py-20 md:py-28'>
          <div className='container-shell space-y-10'>
            <SectionIntro
              eyebrow='Calendar Preview'
              title='Upcoming events should be obvious within seconds.'
              description='Use a premium event card layout to highlight theme nights, special sessions, and holiday events without feeling cluttered.'
            />

            <div className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
              <Card className='border-white/8 bg-white/5'>
                <CardHeader className='flex items-start justify-between gap-4 p-6 md:p-7'>
                  <div>
                    <Badge className='border-[#22d3ee]/20 bg-[#22d3ee]/10 text-[#a5f3fc]'>
                      Upcoming Events
                    </Badge>
                    <h3 className='mt-4 text-heading text-2xl font-semibold text-white md:text-3xl'>
                      Smooth, modern calendar preview.
                    </h3>
                  </div>
                  <Button variant='secondary' size='sm'>
                    View Full Calendar
                  </Button>
                </CardHeader>
                <CardContent className='grid gap-4 p-6 pt-0 md:p-7 md:pt-0'>
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.title}
                      className='grid gap-4 rounded-[22px] border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-4 md:grid-cols-[100px_1fr_auto] md:items-center'
                    >
                      <div className='rounded-[20px] border border-white/8 bg-[#020617]/70 px-4 py-4 text-center'>
                        <div className='text-xs uppercase tracking-[0.24em] text-slate-400'>{event.day}</div>
                        <div className='mt-1 text-lg font-semibold text-white'>
                          {event.time.split(' - ')[0]}
                        </div>
                      </div>
                      <div>
                        <div className='flex items-center gap-2'>
                          <h4 className='text-lg font-semibold text-white'>{event.title}</h4>
                          <span className='rounded-full bg-[#d946ef]/12 px-2.5 py-1 text-xs text-[#f5d0fe]'>
                            {event.badge}
                          </span>
                        </div>
                        <p className='mt-2 text-sm leading-7 text-slate-300'>{event.description}</p>
                      </div>
                      <div className='text-sm font-medium text-slate-200 md:text-right'>{event.time}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className='grid gap-5'>
                {[
                  {
                    label: 'Theme Nights',
                    value: 'Glow skates, music nights, and family favorites',
                  },
                  {
                    label: 'Special Sessions',
                    value: 'Extra sessions for holidays and busy weekends',
                  },
                  {
                    label: 'Holiday Events',
                    value: 'Premium dates that deserve standout promotion',
                  },
                ].map((item) => (
                  <Card key={item.label} className='border-white/8 bg-white/5'>
                    <CardContent className='flex items-start gap-4 p-5 md:p-6'>
                      <div className='flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#22d3ee]/10 text-[#67e8f9]'>
                        <CalendarDays className='h-5 w-5' />
                      </div>
                      <div>
                        <div className='text-sm uppercase tracking-[0.2em] text-slate-500'>
                          {item.label}
                        </div>
                        <p className='mt-2 text-sm leading-7 text-slate-300'>{item.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id='snack-bar' className='section-gradient py-20 md:py-28'>
          <div className='container-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center'>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
              className='space-y-6'
            >
              <SectionIntro
                eyebrow='Preorder Experience Preview'
                title='A visual checkout preview that makes future ecommerce feel exciting.'
                description='Customers can preorder admission, skate rentals, drinks, food, and snack bar items before they arrive. The layout should make that future workflow feel premium and easy.'
              />

              <div className='grid gap-3 sm:grid-cols-2'>
                {['Admission', 'Skate Rentals', 'Food', 'Drinks', 'Snack Bar Items'].map((item) => (
                  <div
                    key={item}
                    className='flex items-center gap-3 rounded-[18px] border border-white/8 bg-white/6 px-4 py-3'
                  >
                    <Utensils className='h-4 w-4 text-[#22d3ee]' />
                    <span className='text-sm font-medium text-slate-100'>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <Card className='overflow-hidden border-white/10'>
              <CardHeader className='flex items-start justify-between gap-4 p-6 md:p-7'>
                <div>
                  <Badge className='border-[#d946ef]/25 bg-[#d946ef]/12 text-[#f5d0fe]'>
                    Mock Checkout
                  </Badge>
                  <h3 className='mt-4 text-heading text-2xl font-semibold text-white'>
                    Preorder summary preview
                  </h3>
                </div>
                <div className='rounded-[16px] border border-white/8 bg-white/6 px-3 py-2 text-sm text-slate-200'>
                  Secure
                </div>
              </CardHeader>
              <CardContent className='space-y-4 p-6 pt-0 md:p-7 md:pt-0'>
                {preorderItems.map((item) => (
                  <div
                    key={item.label}
                    className='flex items-center justify-between rounded-[18px] border border-white/8 bg-white/6 px-4 py-3'
                  >
                    <span className='text-sm text-slate-200'>{item.label}</span>
                    <span className='text-sm font-semibold text-white'>{item.price}</span>
                  </div>
                ))}
                <div className='rounded-[20px] border border-[#22d3ee]/16 bg-[linear-gradient(135deg,rgba(34,211,238,0.1),rgba(217,70,239,0.08))] p-4'>
                  <div className='flex items-center justify-between text-sm text-slate-300'>
                    <span>Estimated Total</span>
                    <span className='text-2xl font-semibold text-white'>$29.75</span>
                  </div>
                </div>
                <div className='grid gap-3 sm:grid-cols-2'>
                  <Input placeholder='Pickup name' />
                  <Input placeholder='Email for receipt' />
                </div>
                <Button className='w-full' size='lg'>
                  Continue to Preorder
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className='py-20 md:py-28'>
          <div className='container-shell space-y-10'>
            <SectionIntro
              eyebrow='Testimonials'
              title='Real-sounding feedback that builds trust fast.'
              description='A rotating testimonial area helps the page feel active and credible while reinforcing birthday-party and family-night conversions.'
            />

            <div className='grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeTestimonial.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                >
                  <Card className='h-full border-white/8 bg-white/5'>
                    <CardContent className='space-y-6 p-6 md:p-8'>
                      <div className='flex gap-1 text-[#22d3ee]'>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star key={index} className='h-4 w-4 fill-current' />
                        ))}
                      </div>
                      <p className='text-2xl leading-10 text-white md:text-[2rem]'>
                        “{activeTestimonial.quote}”
                      </p>
                      <div>
                        <div className='text-lg font-semibold text-white'>{activeTestimonial.name}</div>
                        <div className='text-sm text-slate-400'>{activeTestimonial.detail}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>

              <div className='grid gap-4'>
                {testimonials.map((item, index) => (
                  <button
                    key={item.name}
                    type='button'
                    onClick={() => setActiveTestimonialIndex(index)}
                    className={cn(
                      'rounded-[22px] border p-5 text-left transition-all duration-300',
                      index === activeTestimonialIndex
                        ? 'border-[#d946ef]/30 bg-[#d946ef]/12 shadow-[0_12px_40px_rgba(217,70,239,0.12)]'
                        : 'border-white/8 bg-white/5 hover:bg-white/8',
                    )}
                  >
                    <div className='flex items-center justify-between gap-4'>
                      <div className='text-base font-semibold text-white'>{item.name}</div>
                      <div className='rounded-full border border-white/8 px-2.5 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-400'>
                        {index + 1}
                      </div>
                    </div>
                    <p className='mt-2 text-sm leading-7 text-slate-300'>{item.detail}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className='section-gradient py-20 md:py-28'>
          <div className='container-shell space-y-10'>
            <SectionIntro
              eyebrow='Gallery'
              title='A dark, energetic masonry grid with room to breathe.'
              description='The gallery should feel alive without depending on stock photography. Use mood, lighting, and contrast to suggest the experience.'
            />

            <div className='grid-masonry'>
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
                        : 'min-h-[280px]',
                  )}
                >
                  <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_35%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100' />
                  <div className='absolute inset-0 border border-white/0 transition-colors group-hover:border-white/10' />
                  <div className='relative flex h-full flex-col justify-between'>
                    <div className='flex items-center justify-between'>
                      <Badge className='border-white/10 bg-black/20 text-slate-200'>
                        Photo Moment
                      </Badge>
                      <Sparkles className='h-5 w-5 text-[#22d3ee]' />
                    </div>
                    <div className='mt-auto'>
                      <div className='text-heading text-2xl font-semibold text-white'>{tile}</div>
                      <div className='mt-2 flex items-center gap-2 text-sm text-slate-300'>
                        <ChevronRight className='h-4 w-4 text-[#d946ef]' />
                        Hover for glow and depth.
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className='py-20 md:py-28'>
          <div className='container-shell grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-stretch'>
            <Card className='overflow-hidden border-white/8 bg-white/5'>
              <CardContent className='p-0'>
                <div className='relative min-h-[420px] overflow-hidden rounded-[24px]'>
                  <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.2),transparent_32%),linear-gradient(180deg,rgba(15,23,42,0.88),rgba(2,6,23,0.96))]' />
                  <div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60' />
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='rounded-[28px] border border-white/10 bg-black/30 px-6 py-5 text-center shadow-[0_20px_60px_rgba(2,6,23,0.35)] backdrop-blur-xl'>
                      <MapPin className='mx-auto h-8 w-8 text-[#22d3ee]' />
                      <div className='mt-3 text-lg font-semibold text-white'>Ashland, Virginia</div>
                      <div className='mt-1 text-sm text-slate-300'>Map placeholder for the live location embed.</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='border-white/8 bg-white/5'>
              <CardContent className='space-y-5 p-6 md:p-7'>
                <SectionIntro
                  eyebrow='Location & Hours'
                  title='Easy to find, easy to call, easy to visit.'
                  description='The right-side contact card should be one of the fastest scanning surfaces on the page.'
                />

                <div className='space-y-3 rounded-[22px] border border-white/8 bg-white/6 p-5'>
                  <div className='flex items-start gap-3'>
                    <MapPin className='mt-0.5 h-5 w-5 text-[#22d3ee]' />
                    <div>
                      <div className='text-sm uppercase tracking-[0.2em] text-slate-500'>Address</div>
                      <p className='mt-1 text-sm text-slate-100'>123 Main Street, Ashland, VA 23005</p>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <Clock3 className='mt-0.5 h-5 w-5 text-[#22d3ee]' />
                    <div>
                      <div className='text-sm uppercase tracking-[0.2em] text-slate-500'>Hours</div>
                      <p className='mt-1 text-sm text-slate-100'>Mon - Thu: 4 PM - 9 PM | Fri - Sun: 12 PM - 10 PM</p>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <Phone className='mt-0.5 h-5 w-5 text-[#22d3ee]' />
                    <div>
                      <div className='text-sm uppercase tracking-[0.2em] text-slate-500'>Phone</div>
                      <p className='mt-1 text-sm text-slate-100'>(804) 555-0196</p>
                    </div>
                  </div>
                </div>

                <Button className='w-full' variant='secondary' size='lg'>
                  Directions
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id='contact' className='section-gradient py-20 md:py-28'>
          <div className='container-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start'>
            <div className='space-y-6'>
              <SectionIntro
                eyebrow='Contact'
                title='A modern contact form that feels confident and simple.'
                description='Parents on phones should be able to reach out quickly without dealing with cramped inputs or vague calls to action.'
              />

              <div className='grid gap-4 sm:grid-cols-2'>
                <Card className='border-white/8 bg-white/5'>
                  <CardContent className='flex items-center gap-3 p-5'>
                    <Phone className='h-5 w-5 text-[#22d3ee]' />
                    <div>
                      <div className='text-xs uppercase tracking-[0.2em] text-slate-500'>Call</div>
                      <div className='text-sm font-medium text-white'>(804) 555-0196</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className='border-white/8 bg-white/5'>
                  <CardContent className='flex items-center gap-3 p-5'>
                    <Mic2 className='h-5 w-5 text-[#d946ef]' />
                    <div>
                      <div className='text-xs uppercase tracking-[0.2em] text-slate-500'>Email</div>
                      <div className='text-sm font-medium text-white'>hello@ashlandskateland.com</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className='border-white/8 bg-white/5'>
              <CardContent className='space-y-4 p-6 md:p-7'>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <Input placeholder='Name' />
                  <Input placeholder='Email' type='email' />
                </div>
                <Input placeholder='Phone' type='tel' />
                <Textarea placeholder='Tell us about your party, class question, or fundraiser request.' />
                <Button className='w-full' size='lg'>
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className='border-t border-white/6 bg-[#020617]/90'>
        <div className='container-shell py-14 md:py-16'>
          <div className='grid gap-10 lg:grid-cols-[1.05fr_0.95fr]'>
            <div className='space-y-4'>
              <div className='text-heading text-2xl font-semibold text-white'>ASHLAND SKATELAND</div>
              <div className='text-xs uppercase tracking-[0.28em] text-slate-500'>Est. 1986</div>
              <p className='max-w-md text-sm leading-7 text-slate-300'>
                Family skating, birthday parties, classes, fundraisers, and snack bar experiences in a modern premium environment.
              </p>
            </div>
            <div className='grid gap-6 sm:grid-cols-3'>
              <div className='space-y-3 text-sm text-slate-300'>
                <div className='text-xs uppercase tracking-[0.24em] text-slate-500'>Navigation</div>
                {['Home', 'Schedule', 'Parties', 'Contact'].map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
              <div className='space-y-3 text-sm text-slate-300'>
                <div className='text-xs uppercase tracking-[0.24em] text-slate-500'>Hours</div>
                <div>Mon - Thu: 4 PM - 9 PM</div>
                <div>Fri - Sun: 12 PM - 10 PM</div>
              </div>
              <div className='space-y-3 text-sm text-slate-300'>
                <div className='text-xs uppercase tracking-[0.24em] text-slate-500'>Socials</div>
                <a
                  href='#'
                  className='flex items-center gap-3 rounded-[14px] border border-white/8 bg-white/5 px-3 py-2 transition hover:bg-white/10'
                >
                  <Music3 className='h-4 w-4 text-[#22d3ee]' />
                  <span>Instagram</span>
                </a>
                <a
                  href='#'
                  className='flex items-center gap-3 rounded-[14px] border border-white/8 bg-white/5 px-3 py-2 transition hover:bg-white/10'
                >
                  <Users className='h-4 w-4 text-[#d946ef]' />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          <div className='mt-10 flex flex-col gap-4 border-t border-white/6 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between'>
            <div>© 2026 Ashland Skateland. All rights reserved.</div>
            <div className='inline-flex items-center gap-2 text-slate-400'>
              <div className='h-2 w-2 rounded-full bg-[#d946ef] shadow-[0_0_18px_rgba(217,70,239,0.85)]' />
              Premium mobile-first skating experience
            </div>
          </div>
        </div>
      </footer>

      <div className='fixed inset-x-0 bottom-0 z-50 border-t border-white/8 bg-[#020617]/85 px-4 py-3 backdrop-blur-xl md:hidden'>
        <Button asChild className='w-full' size='lg'>
          <a href='#parties' className='inline-flex items-center gap-2'>
            Book a Party <ArrowRight className='h-5 w-5' />
          </a>
        </Button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-[60] bg-black/65 backdrop-blur-sm xl:hidden'
            role='dialog'
            aria-modal='true'
            aria-labelledby='mobile-navigation-title'
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className='ml-auto flex h-full w-full max-w-sm flex-col border-l border-white/8 bg-[#020617] p-5'
              id='mobile-navigation'
              onClick={(event) => event.stopPropagation()}
            >
              <div className='flex items-center justify-between'>
                <div>
                  <div id='mobile-navigation-title' className='text-heading text-xl font-semibold text-white'>ASHLAND SKATELAND</div>
                  <div className='text-xs uppercase tracking-[0.28em] text-slate-500'>Est. 1986</div>
                </div>
                <button
                  type='button'
                  className='flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/10 bg-white/6'
                  onClick={() => setMobileOpen(false)}
                  aria-label='Close navigation menu'
                >
                  <X className='h-5 w-5' />
                </button>
              </div>

              <nav className='mt-8 grid gap-2'>
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className='rounded-[18px] border border-white/8 bg-white/5 px-4 py-4 text-base text-slate-100 transition hover:bg-white/10'
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className='mt-6 rounded-[22px] border border-white/8 bg-white/5 p-4'>
                <div className='text-xs uppercase tracking-[0.24em] text-slate-500'>Quick Info</div>
                <div className='mt-3 grid gap-3 text-sm text-slate-200'>
                  <div className='flex items-center justify-between gap-4'>
                    <span className='text-slate-400'>Hours</span>
                    <span>Mon - Sun · 12 PM - 10 PM</span>
                  </div>
                  <div className='flex items-center justify-between gap-4'>
                    <span className='text-slate-400'>Phone</span>
                    <span>(804) 555-0196</span>
                  </div>
                </div>
              </div>

              <div className='mt-auto space-y-4'>
                <Button asChild className='w-full' size='lg'>
                  <a href='#parties'>Book a Party</a>
                </Button>
                <Button asChild className='w-full' variant='secondary' size='lg'>
                  <a href='#schedule'>View Schedule</a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
