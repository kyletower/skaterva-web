import { Clock, Dumbbell, DollarSign } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { SectionIntro } from '@/components/ui/section-intro';

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

const classInfo = [
  {
    icon: Clock,
    label: 'Schedule',
    value: 'Saturdays 10 AM – 12 PM · Sundays 11 AM – 1 PM',
    color: 'text-accent-cyan-mid',
    bg: 'bg-accent-cyan/10',
  },
  {
    icon: DollarSign,
    label: 'Pricing',
    value: '$18 per session · $60 for a 4-session pack · rentals included',
    color: 'text-neon-hover-light',
    bg: 'bg-neon-primary/10',
  },
  {
    icon: Dumbbell,
    label: 'What to bring',
    value: 'Comfortable clothing and socks. Skates and safety gear provided.',
    color: 'text-accent-cyan-light',
    bg: 'bg-accent-cyan/10',
  },
];

export default function ClassesPage() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-shell space-y-10">
        <SectionIntro
          level={1}
          eyebrow="Skating Classes"
          title="Organized instruction for skaters who want to improve."
          description="From first-timers finding their footing to experienced skaters refining their technique — structured classes for every level."
        />

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="animate-fade-in-left">
            <Card className="border-white/8 bg-white/5">
              <CardContent className="space-y-5 p-6 md:p-7">
                <div className="flex items-center gap-3 text-accent-cyan-mid">
                  <Dumbbell className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-[0.24em]">
                    Class Progression
                  </span>
                </div>
                <ol className="space-y-4">
                  {classes.map((item, index) => (
                    <li key={item.level} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/8 text-sm font-semibold text-white">
                          {index + 1}
                        </div>
                        {index < classes.length - 1 ? (
                          <div className="mt-2 h-full w-px bg-white/10" />
                        ) : null}
                      </div>
                      <div className="pb-6">
                        <h2 className="text-lg font-semibold text-white">
                          {item.level}
                        </h2>
                        <p className="mt-2 text-sm leading-7 text-slate-300">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 content-start">
            {classInfo.map((info, index) => (
              <div
                key={info.label}
                className="animate-fade-in-right"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <Card className="border-white/8 bg-white/5">
                  <CardContent className="flex items-start gap-4 p-5 md:p-6">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-[16px] ${info.bg} ${info.color}`}
                    >
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
                        {info.label}
                      </div>
                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        {info.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
