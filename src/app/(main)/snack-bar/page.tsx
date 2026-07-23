import { Utensils } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SectionIntro } from '@/components/ui/section-intro';
import { preorderCategories, preorderItems } from '@/data/content';
import { calculatePreorderTotalCents, formatCents } from '@/lib/pricing';

import { PreorderForm } from './preorder-form';

const totalCents = calculatePreorderTotalCents(preorderItems);

export default function SnackBarPage() {
  return (
    <section className="section-gradient py-20 md:py-28">
      <div className="container-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="animate-fade-in-up space-y-6">
          <SectionIntro
            level={1}
            eyebrow="Preorder Experience"
            title="A visual checkout preview that makes future ecommerce feel exciting."
            description="Preorder admission, skate rentals, drinks, food, and snack bar items before you arrive. Fast, premium, and easy."
          />

          <div className="grid gap-3 sm:grid-cols-2">
            {preorderCategories.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/6 px-4 py-3"
              >
                <Utensils className="h-4 w-4 text-accent-cyan" />
                <span className="text-sm font-medium text-slate-100">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <Card className="overflow-hidden border-white/10">
            <CardHeader className="flex items-start justify-between gap-4 p-6 md:p-7">
              <div>
                <Badge className="border-neon-primary/25 bg-neon-primary/12 text-neon-primary-light">
                  Square Sandbox Checkout
                </Badge>
                <h2 className="mt-4 text-heading text-2xl font-semibold text-white">
                  Preorder summary preview
                </h2>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/6 px-3 py-2 text-sm text-slate-200">
                Secure
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-6 pt-0 md:p-7 md:pt-0">
              {preorderItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/6 px-4 py-3"
                >
                  <span className="text-sm text-slate-200">{item.label}</span>
                  <span className="text-sm font-semibold text-white">
                    {formatCents(item.priceCents)}
                  </span>
                </div>
              ))}
              <div className="rounded-[20px] border border-accent-cyan/16 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent-cyan)_10%,transparent),color-mix(in_srgb,var(--neon-primary)_8%,transparent))] p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Estimated Total</span>
                  <span className="text-2xl font-semibold text-white">
                    {formatCents(totalCents)}
                  </span>
                </div>
              </div>
              <PreorderForm totalCents={totalCents} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
