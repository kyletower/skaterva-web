import type {
  AvailableSlot,
  CreateReservationInput,
  PartyPackage,
} from '@/types/party-reservation';

type PackagesResponse = {
  packages: PartyPackage[];
};

type AvailabilityResponse = {
  date: string;
  availability: {
    package: PartyPackage;
    slots: AvailableSlot[];
  }[];
};

type ReservationResponse = {
  reservation: {
    id: string;
    starts_at: string;
    ends_at: string;
    status: string;
  };
};

type ErrorResponse = {
  error: string;
};

/**
 * Fetches active party packages from the API.
 */
export async function fetchPartyPackages(): Promise<PartyPackage[]> {
  const response = await fetch('/api/parties/packages');
  const data = (await response.json()) as PackagesResponse & ErrorResponse;

  if (!response.ok) {
    throw new Error(data.error ?? 'Failed to load packages');
  }

  return data.packages;
}

/**
 * Checks available party slots for a date.
 */
export async function fetchAvailability(
  date: string,
  packageId?: string
): Promise<AvailabilityResponse> {
  const response = await fetch('/api/parties/availability', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, packageId }),
  });
  const data = (await response.json()) as AvailabilityResponse & ErrorResponse;

  if (!response.ok) {
    throw new Error(data.error ?? 'Failed to check availability');
  }

  return data;
}

/**
 * Submits a new party reservation request.
 */
export async function submitPartyReservation(
  input: CreateReservationInput
): Promise<ReservationResponse['reservation']> {
  const response = await fetch('/api/parties/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const data = (await response.json()) as ReservationResponse & ErrorResponse;

  if (!response.ok) {
    throw new Error(data.error ?? 'Failed to create reservation');
  }

  return data.reservation;
}

/**
 * Formats a price in cents for display.
 */
export function formatPackagePrice(priceCents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(priceCents / 100);
}

/**
 * Formats a slot time for display in the rink timezone.
 */
export function formatSlotTime(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));
}

/**
 * Returns today's date as YYYY-MM-DD in the rink timezone.
 */
export function getTodayInRinkTimezone(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
  }).format(new Date());
}
