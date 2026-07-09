import { NextResponse } from 'next/server';

import { createPartyReservation } from '@/lib/parties/reservations';
import { CreateReservationSchema } from '@/types/party-reservation';

/**
 * Creates a new party reservation request.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = CreateReservationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid request' },
        { status: 400 }
      );
    }

    const reservation = await createPartyReservation(parsed.data);

    return NextResponse.json({ reservation }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to create reservation';

    const status =
      message.includes('no longer available') ||
      message.includes('outside booking hours')
        ? 409
        : message.includes('not found')
          ? 404
          : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
