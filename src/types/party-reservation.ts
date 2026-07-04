import { z } from 'zod';

export const ReservationStatusSchema = z.enum([
  'pending',
  'confirmed',
  'cancelled',
]);

export type ReservationStatus = z.infer<typeof ReservationStatusSchema>;

export const PartyPackageSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  price_cents: z.number().int().nonnegative(),
  duration_minutes: z.number().int().positive(),
  is_active: z.boolean(),
});

export type PartyPackage = z.infer<typeof PartyPackageSchema>;

export const AvailabilityQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  packageId: z.string().uuid().optional(),
});

export type AvailabilityQuery = z.infer<typeof AvailabilityQuerySchema>;

export const AvailableSlotSchema = z.object({
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
});

export type AvailableSlot = z.infer<typeof AvailableSlotSchema>;

export const CreateReservationSchema = z.object({
  packageId: z.string().uuid(),
  startsAt: z.string().datetime(),
  contactName: z.string().min(1, 'Name is required').max(120),
  contactEmail: z.string().email('Valid email is required'),
  contactPhone: z.string().max(30).optional(),
  guestCount: z.number().int().positive().max(50).optional(),
  childName: z.string().max(120).optional(),
  notes: z.string().max(1000).optional(),
});

export type CreateReservationInput = z.infer<typeof CreateReservationSchema>;

export const PartyReservationSchema = z.object({
  id: z.string().uuid(),
  package_id: z.string().uuid(),
  starts_at: z.string(),
  ends_at: z.string(),
  contact_name: z.string(),
  contact_email: z.string(),
  contact_phone: z.string().nullable(),
  guest_count: z.number().nullable(),
  child_name: z.string().nullable(),
  notes: z.string().nullable(),
  status: ReservationStatusSchema,
  created_at: z.string(),
});

export type PartyReservation = z.infer<typeof PartyReservationSchema>;
