'use client';

import Script from 'next/script';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCents } from '@/lib/pricing';

const SQUARE_SDK_SRC =
  process.env.NODE_ENV === 'production'
    ? 'https://web.squarecdn.com/v1/square.js'
    : 'https://sandbox.web.squarecdn.com/v1/square.js';

const CARD_CONTAINER_ID = 'square-card-container';

const SQUARE_APPLICATION_ID = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;
const SQUARE_LOCATION_ID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

type CheckoutStatus = 'idle' | 'ready' | 'submitting' | 'success' | 'error';

type PreorderFormProps = {
  totalCents: number;
};

export function PreorderForm({ totalCents }: PreorderFormProps) {
  const [scriptLoaded, setScriptLoaded] = React.useState(false);
  const [status, setStatus] = React.useState<CheckoutStatus>(
    SQUARE_APPLICATION_ID && SQUARE_LOCATION_ID ? 'idle' : 'error'
  );
  const [message, setMessage] = React.useState<string | null>(
    SQUARE_APPLICATION_ID && SQUARE_LOCATION_ID
      ? null
      : 'Square is not configured for this environment.'
  );
  const cardRef = React.useRef<SquareCard | null>(null);

  React.useEffect(() => {
    if (
      !scriptLoaded ||
      !window.Square ||
      !SQUARE_APPLICATION_ID ||
      !SQUARE_LOCATION_ID
    ) {
      return;
    }

    let cancelled = false;

    async function setupCard() {
      const payments = window.Square!.payments(
        SQUARE_APPLICATION_ID!,
        SQUARE_LOCATION_ID!
      );
      const card = await payments.card();
      await card.attach(`#${CARD_CONTAINER_ID}`);

      if (cancelled) {
        await card.destroy();
        return;
      }

      cardRef.current = card;
      setStatus('ready');
    }

    setupCard().catch(() => {
      if (!cancelled) {
        setStatus('error');
        setMessage('Could not load the card entry form.');
      }
    });

    return () => {
      cancelled = true;
      cardRef.current?.destroy();
      cardRef.current = null;
    };
  }, [scriptLoaded]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!cardRef.current || status === 'submitting') {
      return;
    }

    setStatus('submitting');
    setMessage(null);

    try {
      const tokenizeResult = await cardRef.current.tokenize();

      if (tokenizeResult.status !== 'OK' || !tokenizeResult.token) {
        setStatus('error');
        setMessage(
          tokenizeResult.errors?.[0]?.message ?? 'Card details are invalid.'
        );
        return;
      }

      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceId: tokenizeResult.token,
          amount: totalCents,
          idempotencyKey: crypto.randomUUID(),
          locationId: SQUARE_LOCATION_ID,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setMessage(data.error ?? 'Payment failed. Please try again.');
        return;
      }

      setStatus('success');
      setMessage(
        `Payment received (${formatCents(totalCents)}). See you soon!`
      );
    } catch {
      setStatus('error');
      setMessage('Payment failed. Please try again.');
    }
  }

  return (
    <>
      <Script
        src={SQUARE_SDK_SRC}
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Input placeholder="Pickup name" aria-label="Pickup name" required />
          <Input
            placeholder="Email for receipt"
            type="email"
            aria-label="Email for receipt"
            required
          />
        </div>

        <div
          id={CARD_CONTAINER_ID}
          className="min-h-12 rounded-[16px] border border-white/10 bg-white/5 px-4 py-3"
        />

        {message ? (
          <p
            className={
              status === 'success'
                ? 'rounded-[16px] border border-accent-cyan/30 bg-accent-cyan/10 px-4 py-3 text-sm text-cyan-100'
                : 'rounded-[16px] border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200'
            }
          >
            {message}
          </p>
        ) : null}

        <Button
          className="w-full"
          size="lg"
          type="submit"
          disabled={status === 'submitting' || status === 'idle'}
        >
          {status === 'submitting'
            ? 'Processing...'
            : `Pay ${formatCents(totalCents)}`}
        </Button>
      </form>
    </>
  );
}
