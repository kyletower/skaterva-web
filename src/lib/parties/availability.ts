import type { PartyPackage } from '@/types/party-reservation';

import {
  PARTY_HOURS_BY_DAY,
  RINK_TIMEZONE,
  SLOT_INTERVAL_MINUTES,
} from './constants';

type ReservationInterval = {
  starts_at: string;
  ends_at: string;
};

/**
 * Returns true when two half-open intervals overlap.
 */
export function intervalsOverlap(
  aStart: Date,
  aEnd: Date,
  bStart: Date,
  bEnd: Date
): boolean {
  return aStart < bEnd && bStart < aEnd;
}

/**
 * Parses a YYYY-MM-DD date in the rink timezone.
 */
export function parseRinkDate(date: string): Date {
  return new Date(`${date}T12:00:00`);
}

/**
 * Gets the day of week (0–6) for a date string in the rink timezone.
 */
export function getRinkDayOfWeek(date: string): number {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: RINK_TIMEZONE,
    weekday: 'short',
  });
  const weekday = formatter.format(parseRinkDate(date));
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return map[weekday] ?? 0;
}

/**
 * Builds a UTC Date for a local rink date/time.
 */
export function rinkLocalToUtc(
  date: string,
  hour: number,
  minute: number
): Date {
  const [year, month, day] = date.split('-').map(Number);
  let utcMs = Date.UTC(year, month - 1, day, hour, minute, 0);

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: RINK_TIMEZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(new Date(utcMs));

    const read = (type: Intl.DateTimeFormatPartTypes) =>
      Number(parts.find((part) => part.type === type)?.value ?? '0');

    let localHour = read('hour');
    if (localHour === 24) {
      localHour = 0;
    }

    if (
      read('year') === year &&
      read('month') === month &&
      read('day') === day &&
      localHour === hour &&
      read('minute') === minute
    ) {
      return new Date(utcMs);
    }

    const desiredMs = Date.UTC(year, month - 1, day, hour, minute, 0);
    const actualMs = Date.UTC(
      read('year'),
      read('month') - 1,
      read('day'),
      localHour,
      read('minute'),
      0
    );
    utcMs += desiredMs - actualMs;
  }

  return new Date(utcMs);
}

/**
 * Returns start/end bounds for querying reservations on a local date.
 */
export function getRinkDayBounds(date: string): {
  dayStart: Date;
  dayEnd: Date;
} {
  const dayStart = rinkLocalToUtc(date, 0, 0);
  const dayEnd = new Date(dayStart);
  dayEnd.setUTCDate(dayEnd.getUTCDate() + 1);
  return { dayStart, dayEnd };
}

/**
 * Generates candidate party start times for a date and package duration.
 */
export function generateCandidateStarts(
  date: string,
  durationMinutes: number
): Date[] {
  const dayOfWeek = getRinkDayOfWeek(date);
  const hours = PARTY_HOURS_BY_DAY[dayOfWeek];

  if (!hours) {
    return [];
  }

  const candidates: Date[] = [];
  const latestStartMinutes = hours.closeHour * 60 - durationMinutes;
  const earliestStartMinutes = hours.openHour * 60;

  for (
    let minutes = earliestStartMinutes;
    minutes <= latestStartMinutes;
    minutes += SLOT_INTERVAL_MINUTES
  ) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    candidates.push(rinkLocalToUtc(date, hour, minute));
  }

  return candidates;
}

/**
 * Filters candidate starts by removing overlaps with existing reservations.
 */
export function getAvailableSlots(
  date: string,
  partyPackage: PartyPackage,
  existingReservations: ReservationInterval[]
): { startsAt: string; endsAt: string }[] {
  const candidates = generateCandidateStarts(
    date,
    partyPackage.duration_minutes
  );

  return candidates
    .map((start) => {
      const end = new Date(
        start.getTime() + partyPackage.duration_minutes * 60_000
      );

      const hasOverlap = existingReservations.some((reservation) =>
        intervalsOverlap(
          start,
          end,
          new Date(reservation.starts_at),
          new Date(reservation.ends_at)
        )
      );

      if (hasOverlap) {
        return null;
      }

      return {
        startsAt: start.toISOString(),
        endsAt: end.toISOString(),
      };
    })
    .filter(
      (slot): slot is { startsAt: string; endsAt: string } => slot !== null
    );
}

/**
 * Formats an ISO timestamp for display in the rink timezone.
 */
export function formatRinkTime(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: RINK_TIMEZONE,
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));
}
