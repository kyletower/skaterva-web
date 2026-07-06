import { NextResponse } from 'next/server';
import { SquareError } from 'square';

import { squareClient } from '@/lib/square/client';
import { PaymentRequestSchema } from '@/types/payment';

/**
 * Processes a Square payment server-side from a client-generated source ID.
 * Per Tech Spec Section 6.1: secure source ID in, server-side processing,
 * idempotency key required on every request.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = PaymentRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid request' },
        { status: 400 }
      );
    }

    const { sourceId, amount, idempotencyKey, locationId } = parsed.data;

    const response = await squareClient.payments.create({
      sourceId,
      idempotencyKey,
      amountMoney: {
        amount: BigInt(amount),
        currency: 'USD',
      },
      locationId,
    });

    const payment = response.payment;

    if (!payment?.id || payment.status === 'FAILED') {
      return NextResponse.json(
        { error: 'Payment was not completed' },
        { status: 402 }
      );
    }

    return NextResponse.json(
      {
        payment: {
          id: payment.id,
          status: payment.status ?? 'UNKNOWN',
          receiptUrl: payment.receiptUrl,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof SquareError) {
      return NextResponse.json(
        {
          error:
            error.errors[0]?.detail ?? error.message ?? 'Square payment failed',
        },
        { status: error.statusCode ?? 502 }
      );
    }

    const message =
      error instanceof Error ? error.message : 'Failed to process payment';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
