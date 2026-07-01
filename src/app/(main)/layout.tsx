import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { Header } from '@/components/layout/header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col text-slate-50">
      <Header />
      <main
        id="main-content"
        className="flex-1 pb-24 md:pb-0 supports-[env(safe-area-inset-bottom)]:pb-[calc(6rem+env(safe-area-inset-bottom))] md:supports-[env(safe-area-inset-bottom)]:pb-0"
      >
        {children}
      </main>
      <footer className="border-t border-white/6 bg-background/90">
        <div className="container-shell py-14 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-4">
              <div className="text-heading text-2xl font-semibold text-white">
                ASHLAND SKATELAND
              </div>
              <div className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Est. 1986
              </div>
              <p className="max-w-md text-sm leading-7 text-slate-300">
                Family skating, birthday parties, classes, fundraisers, and
                snack bar experiences in a modern premium environment.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="space-y-3 text-sm text-slate-300">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  Navigation
                </div>
                <ul className="space-y-3">
                  {[
                    { label: 'Home', href: '/' },
                    { label: 'Schedule', href: '/schedule' },
                    { label: 'Parties', href: '/parties' },
                    { label: 'Contact', href: '/contact' },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="transition hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  Hours
                </div>
                <div>Mon - Thu: 4 PM - 9 PM</div>
                <div>Fri - Sun: 12 PM - 10 PM</div>
              </div>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  Socials
                </div>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-[14px] border border-white/8 bg-white/5 px-3 py-2 transition hover:bg-white/10"
                >
                  <ExternalLink className="h-4 w-4 text-accent-cyan" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-[14px] border border-white/8 bg-white/5 px-3 py-2 transition hover:bg-white/10"
                >
                  <ExternalLink className="h-4 w-4 text-neon-primary" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/6 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
            <div>© 2026 Ashland Skateland. All rights reserved.</div>
            <div className="inline-flex items-center gap-2 text-slate-400">
              <div className="h-2 w-2 rounded-full bg-neon-primary shadow-[0_0_18px_rgba(217,70,239,0.85)]" />
              Premium mobile-first skating experience
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
