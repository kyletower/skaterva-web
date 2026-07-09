import { createAdminClient } from '@/lib/supabase/admin';
import type {
  CreateReservationInput,
  PartyPackage,
  PartyReservation,
} from '@/types/party-reservation';

import { getRinkDayBounds, intervalsOverlap } from './availability';

/**
 * Fetches all active party packages.
 */
export async function listActivePackages(): Promise<PartyPackage[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('party_packages')
    .select('id, slug, name, price_cents, duration_minutes, is_active')
    .eq('is_active', true)
    .order('price_cents', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

/**
 * Fetches a single active package by id.
 */
export async function getActivePackage(
  packageId: string
): Promise<PartyPackage | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('party_packages')
    .select('id, slug, name, price_cents, duration_minutes, is_active')
    .eq('id', packageId)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Fetches non-cancelled reservations overlapping a local rink date.
 */
export async function listReservationsForDate(date: string) {
  const supabase = createAdminClient();
  const { dayStart, dayEnd } = getRinkDayBounds(date);

  const { data, error } = await supabase
    .from('party_reservations')
    .select('starts_at, ends_at')
    .neq('status', 'cancelled')
    .lt('starts_at', dayEnd.toISOString())
    .gt('ends_at', dayStart.toISOString());

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

/**
 * Creates a party reservation after validating package and availability.
 */
export async function createPartyReservation(
  input: CreateReservationInput
): Promise<PartyReservation> {
  const supabase = createAdminClient();
  const partyPackage = await getActivePackage(input.packageId);

  if (!partyPackage) {
    throw new Error('Party package not found');
  }

  const startsAt = new Date(input.startsAt);
  const endsAt = new Date(
    startsAt.getTime() + partyPackage.duration_minutes * 60_000
  );

  const { data: overlapping, error: overlapError } = await supabase
    .from('party_reservations')
    .select('starts_at, ends_at')
    .neq('status', 'cancelled')
    .lt('starts_at', endsAt.toISOString())
    .gt('ends_at', startsAt.toISOString());

  if (overlapError) {
    throw new Error(overlapError.message);
  }

  const hasConflict = (overlapping ?? []).some((reservation) =>
    intervalsOverlap(
      startsAt,
      endsAt,
      new Date(reservation.starts_at),
      new Date(reservation.ends_at)
    )
  );

  if (hasConflict) {
    throw new Error('That time slot is no longer available');
  }

  const { data, error } = await supabase
    .from('party_reservations')
    .insert({
      package_id: input.packageId,
      starts_at: startsAt.toISOString(),
      ends_at: endsAt.toISOString(),
      contact_name: input.contactName,
      contact_email: input.contactEmail,
      contact_phone: input.contactPhone ?? null,
      guest_count: input.guestCount ?? null,
      child_name: input.childName ?? null,
      notes: input.notes ?? null,
      status: 'pending',
    })
    .select(
      'id, package_id, starts_at, ends_at, contact_name, contact_email, contact_phone, guest_count, child_name, notes, status, created_at'
    )
    .single();

  if (error) {
    if (error.code === '23P01') {
      throw new Error('That time slot is no longer available');
    }

    throw new Error(error.message);
  }

  return data;
}
