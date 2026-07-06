import { CalendarDays } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SectionIntro } from '@/components/ui/section-intro';
import { calendarCategories, upcomingEvents } from '@/data/content';

export default function SchedulePage() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-shell space-y-10">
        <SectionIntro
          level={1}
          eyebrow="Calendar Preview"
          title="What's Coming Up"
          description="Theme nights, special sessions, and holiday events — all in one place so you can plan your visit before you arrive."
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-white/8 bg-white/5">
            <CardHeader className="flex items-start justify-between gap-4 p-6 md:p-7">
              <div>
                <Badge className="border-accent-cyan/20 bg-accent-cyan/10 text-accent-cyan-light">
                  Upcoming Events
                </Badge>
                <h2 className="mt-4 text-heading text-2xl font-semibold text-white md:text-3xl">
                  What&apos;s on this week
                </h2>
              </div>
              <Button variant="secondary" size="sm">
                View Full Calendar
              </Button>
            </CardHeader>
            <CardContent className="grid gap-4 p-6 pt-0 md:p-7 md:pt-0">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.title}
                  className="animate-fade-in-up grid gap-4 rounded-[22px] border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-4 md:grid-cols-[100px_1fr_auto] md:items-center"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="rounded-[20px] border border-white/8 bg-background/70 px-4 py-4 text-center">
                    <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      {event.day}
                    </div>
                    <div className="mt-1 text-lg font-semibold text-white">
                      {event.time.split(' - ')[0]}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-white">
                        {event.title}
                      </h3>
                      <span className="rounded-full bg-neon-primary/12 px-2.5 py-1 text-xs text-neon-primary-light">
                        {event.badge}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      {event.description}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-slate-200 md:text-right">
                    {event.time}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-5 content-start">
            {calendarCategories.map((item, index) => (
              <div
                key={item.label}
                className="animate-fade-in-right"
                style={{ animationDelay: `${100 + index * 80}ms` }}
              >
                <Card className="border-white/8 bg-white/5">
                  <CardContent className="flex items-start gap-4 p-5 md:p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-cyan/10 text-accent-cyan-mid">
                      <CalendarDays className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm uppercase tracking-[0.2em] text-slate-400">
                        {item.label}
                      </div>
                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        {item.value}
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
