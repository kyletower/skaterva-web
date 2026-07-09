'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { testimonials } from '@/data/content';

/**
 * A homepage testimonials section with an auto-rotating quote panel.
 *
 * Displays a featured testimonial with motion transitions and a list of
 * selectable testimonial cards for user navigation.
 */
export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex]
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      setActiveIndex((index) => (index + 1) % testimonials.length);
    }, 5200);

    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section className="py-14 md:py-16" aria-labelledby="testimonials-title">
      <div className="container-shell space-y-7">
        <div className="max-w-3xl space-y-4">
          <Badge className="border-accent-cyan/20 bg-accent-cyan/10 text-accent-cyan-light">
            Testimonials
          </Badge>
          <h2
            id="testimonials-title"
            className="text-heading text-3xl font-semibold tracking-tight text-white md:text-4xl"
          >
            Trusted by families and community organizers.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full border-white/8 bg-white/5">
                <CardContent className="space-y-4 p-5 md:p-6">
                  <div className="flex gap-1 text-accent-cyan">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xl leading-9 text-white md:text-2xl">
                    &ldquo;{activeTestimonial.quote}&rdquo;
                  </p>
                  <div>
                    <div className="text-base font-semibold text-white">
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

          <div className="grid gap-3">
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'rounded-[18px] border p-4 text-left transition-all duration-300',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  index === activeIndex
                    ? 'border-neon-primary/30 bg-neon-primary/12 shadow-[0_10px_30px_rgba(217,70,239,0.12)]'
                    : 'border-white/8 bg-white/5 hover:bg-white/8'
                )}
                aria-label={`View testimonial from ${item.name}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-white">
                    {item.name}
                  </div>
                  <div className="rounded-full border border-white/8 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-400">
                    {index + 1}
                  </div>
                </div>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  {item.detail}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
