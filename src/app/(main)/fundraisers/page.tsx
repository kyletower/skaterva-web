import { ChevronRight, Gift } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { SectionIntro } from '@/components/ui/section-intro';

const groups = [
  'Schools',
  'Churches',
  'Sports Teams',
  'Community Organizations',
];

const steps = [
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

export default function FundraisersPage() {
  return (
    <section className="section-gradient py-20 md:py-28">
      <div className="container-shell space-y-10">
        <SectionIntro
          level={1}
          eyebrow="Fundraisers"
          title="A dependable revenue night for schools and community groups."
          description="Schedule it, share it, skate, and raise funds. Simple, repeatable, and effective."
        />

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="animate-fade-in-left">
            <Card className="border-white/8 bg-white/5">
              <CardContent className="space-y-5 p-6 md:p-7">
                <div className="flex items-center gap-3 text-accent-cyan-light">
                  <Gift className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-[0.24em]">
                    Groups We Support
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {groups.map((group) => (
                    <div
                      key={group}
                      className="rounded-[18px] border border-white/8 bg-white/6 px-4 py-3 text-sm font-medium text-slate-100"
                    >
                      {group}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="animate-fade-in-right">
            <Card className="border-white/8 bg-white/5">
              <CardContent className="p-6 md:p-7">
                <ol className="grid gap-4 md:grid-cols-4">
                  {steps.map((step, index) => (
                    <li
                      key={step.title}
                      className="relative rounded-[20px] border border-white/8 bg-white/6 p-4"
                    >
                      <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
                        0{index + 1}
                      </div>
                      <h2 className="mt-2 text-base font-semibold text-white">
                        {step.title}
                      </h2>
                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        {step.detail}
                      </p>
                      {index < steps.length - 1 ? (
                        <ChevronRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-accent-cyan md:block" />
                      ) : null}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
