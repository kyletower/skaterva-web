import { NextResponse } from 'next/server';

import { getAvailableSlots } from '@/lib/parties/availability';
import {
  getActivePackage,
  listActivePackages,
  listReservationsForDate,
} from '@/lib/parties/reservations';
import { AvailabilityQuerySchema } from '@/types/party-reservation';

/**
 * Returns available party start times for a given date.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = AvailabilityQuerySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid request' },
        { status: 400 }
      );
    }

    const { date, packageId } = parsed.data;
    let activePackages;

    if (packageId) {
      const partyPackage = await getActivePackage(packageId);
      activePackages = partyPackage ? [partyPackage] : [];
    } else {
      activePackages = await listActivePackages();
    }

    if (activePackages.length === 0) {
      return NextResponse.json(
        { error: 'No active party packages found' },
        { status: 404 }
      );
    }

    const existingReservations = await listReservationsForDate(date);
    const availability = activePackages.map((partyPackage) => ({
      package: partyPackage,
      slots: getAvailableSlots(date, partyPackage, existingReservations),
    }));

    return NextResponse.json({ date, availability });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to check availability';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
