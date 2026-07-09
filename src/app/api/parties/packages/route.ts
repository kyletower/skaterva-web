import { NextResponse } from 'next/server';

import { listActivePackages } from '@/lib/parties/reservations';

/**
 * Returns active party packages.
 */
export async function GET() {
  try {
    const packages = await listActivePackages();
    return NextResponse.json({ packages });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to load packages';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
