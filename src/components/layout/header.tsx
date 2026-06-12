'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Classes', href: '/classes' },
  { label: 'Parties', href: '/parties' },
  { label: 'Fundraisers', href: '/fundraisers' },
  { label: 'Snack Bar', href: '/snack-bar' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Site-wide sticky header with desktop nav, mobile drawer, and mobile bottom CTA bar.
 */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/6 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
        <a
          href="#main-content"
          className="sr-only rounded-full border border-accent-cyan/40 bg-background px-4 py-2 text-sm text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70]"
        >
          Skip to content
        </a>
        <div className="container-shell flex h-20 items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-3 text-left">
            <div className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-white/10 bg-white/6 shadow-[0_0_30px_rgba(217,70,239,0.22)]">
              <Sparkles className="h-6 w-6 text-neon-primary transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <div>
              <div className="text-heading text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-slate-300">
                Ashland Skateland
              </div>
              <div className="text-[0.68rem] uppercase tracking-[0.34em] text-slate-400">
                Est. 1986
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm transition-colors',
                  pathname === item.href
                    ? 'bg-white/10 text-white'
                    : 'text-slate-300 hover:bg-white/6 hover:text-white'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild className="hidden md:inline-flex" size="md">
              <Link href="/parties">Book a Party</Link>
            </Button>
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-[16px] border border-white/10 bg-white/6 text-slate-50 transition hover:bg-white/10 xl:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Fixed mobile bottom CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/8 bg-background/85 px-4 py-3 backdrop-blur-xl md:hidden">
        <Button asChild className="w-full" size="lg">
          <Link href="/parties" className="inline-flex items-center gap-2">
            Book a Party <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/65 backdrop-blur-sm xl:hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className="ml-auto flex h-full w-full max-w-sm flex-col border-l border-white/8 bg-background p-5"
              id="mobile-navigation"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div
                    id="mobile-navigation-title"
                    className="text-heading text-xl font-semibold text-white"
                  >
                    ASHLAND SKATELAND
                  </div>
                  <div className="text-xs uppercase tracking-[0.28em] text-slate-400">
                    Est. 1986
                  </div>
                </div>
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/10 bg-white/6"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-8 grid gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      'rounded-[18px] border border-white/8 px-4 py-4 text-base text-slate-100 transition',
                      pathname === item.href
                        ? 'bg-white/12 text-white'
                        : 'bg-white/5 hover:bg-white/10'
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 rounded-[22px] border border-white/8 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  Quick Info
                </div>
                <div className="mt-3 grid gap-3 text-sm text-slate-200">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-400">Hours</span>
                    <span>Mon - Sun · 12 PM - 10 PM</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-400">Phone</span>
                    <span>(804) 555-0196</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto space-y-4">
                <Button asChild className="w-full" size="lg">
                  <Link href="/parties" onClick={() => setMobileOpen(false)}>
                    Book a Party
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full"
                  variant="secondary"
                  size="lg"
                >
                  <Link href="/schedule" onClick={() => setMobileOpen(false)}>
                    View Schedule
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
