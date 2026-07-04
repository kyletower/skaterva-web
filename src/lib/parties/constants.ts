/** IANA timezone for Ashland Skateland. */
export const RINK_TIMEZONE = 'America/New_York';

/** Minutes between candidate party start times. */
export const SLOT_INTERVAL_MINUTES = 30;

/** Party booking windows by day of week (0 = Sunday). */
export const PARTY_HOURS_BY_DAY: Record<
  number,
  { openHour: number; closeHour: number } | null
> = {
  0: { openHour: 12, closeHour: 22 },
  1: null,
  2: null,
  3: null,
  4: { openHour: 16, closeHour: 21 },
  5: { openHour: 12, closeHour: 22 },
  6: { openHour: 12, closeHour: 22 },
};
