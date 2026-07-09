'use client';

import { motion } from 'framer-motion';
import { Clock3, MapPin, Mic2, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SectionIntro } from '@/components/ui/section-intro';
import { Textarea } from '@/components/ui/textarea';
import { businessHours, contactInfo } from '@/data/content';

export default function ContactPage() {
  return (
    <>
      {/* Location / Map */}
      <section className="py-20 md:py-28">
        <div className="container-shell grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-stretch">
          <Card className="overflow-hidden border-white/8 bg-white/5">
            <CardContent className="p-0">
              <div className="relative min-h-105 overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.2),transparent_32%),linear-gradient(180deg,rgba(15,23,42,0.88),rgba(2,6,23,0.96))]" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[48px_48px] opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-[28px] border border-white/10 bg-black/30 px-6 py-5 text-center shadow-[0_20px_60px_rgba(2,6,23,0.35)] backdrop-blur-xl">
                    <MapPin className="mx-auto h-8 w-8 text-accent-cyan" />
                    <div className="mt-3 text-lg font-semibold text-white">
                      {contactInfo.locationLabel}
                    </div>
                    <div className="mt-1 text-sm text-slate-300">
                      Map placeholder for the live location embed.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/8 bg-white/5">
            <CardContent className="space-y-5 p-6 md:p-7">
              <SectionIntro
                level={1}
                eyebrow="Location & Hours"
                title="Easy to find, easy to call, easy to visit."
                description="The right-side contact card should be one of the fastest scanning surfaces on the page."
              />

              <div className="space-y-3 rounded-2xl border border-white/8 bg-white/6 p-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-accent-cyan" />
                  <div>
                    <div className="text-sm uppercase tracking-[0.2em] text-slate-400">
                      Address
                    </div>
                    <p className="mt-1 text-sm text-slate-100">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 h-5 w-5 text-accent-cyan" />
                  <div>
                    <div className="text-sm uppercase tracking-[0.2em] text-slate-400">
                      Hours
                    </div>
                    <p className="mt-1 text-sm text-slate-100">
                      {businessHours.join(' | ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-accent-cyan" />
                  <div>
                    <div className="text-sm uppercase tracking-[0.2em] text-slate-400">
                      Phone
                    </div>
                    <p className="mt-1 text-sm text-slate-100">
                      {contactInfo.phone}
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full" variant="secondary" size="lg">
                Directions
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-gradient py-20 md:py-28">
        <div className="container-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <SectionIntro
              eyebrow="Contact"
              title="A modern contact form that feels confident and simple."
              description="Parents on phones should be able to reach out quickly without dealing with cramped inputs or vague calls to action."
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-white/8 bg-white/5">
                <CardContent className="flex items-center gap-3 p-5">
                  <Phone className="h-5 w-5 text-accent-cyan" />
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Call
                    </div>
                    <div className="text-sm font-medium text-white">
                      {contactInfo.phone}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-white/8 bg-white/5">
                <CardContent className="flex items-center gap-3 p-5">
                  <Mic2 className="h-5 w-5 text-neon-primary" />
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Email
                    </div>
                    <div className="text-sm font-medium text-white">
                      {contactInfo.email}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-white/8 bg-white/5">
              <CardContent className="p-6 md:p-7">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input placeholder="Name" aria-label="Name" />
                    <Input
                      placeholder="Email"
                      type="email"
                      aria-label="Email address"
                    />
                  </div>
                  <Input
                    placeholder="Phone"
                    type="tel"
                    aria-label="Phone number"
                  />
                  <Textarea
                    placeholder="Tell us about your party, class question, or fundraiser request."
                    aria-label="Message"
                  />
                  <Button className="w-full" size="lg" type="submit">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  );
}
