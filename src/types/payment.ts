import { z } from 'zod';

/**
 * Schema for Square Payment Requests.
 * `amount` is in the smallest currency unit (cents for USD), matching
 * `price_cents` elsewhere in the app and Square's `Money.amount` field.
 * Enforces Zod validation as per Tech Spec v1.8.
 */
export const PaymentRequestSchema = z.object({
  sourceId: z.string().min(1, 'Source ID is required'),
  amount: z.number().int().positive('Amount must be greater than 0'),
  idempotencyKey: z.string().uuid('Must be a valid UUID'),
  locationId: z.string().optional(),
});

export type PaymentRequest = z.infer<typeof PaymentRequestSchema>;

/**
 * Successful payment result surfaced to the client after server-side processing.
 */
export type PaymentResult = {
  id: string;
  status: string;
  receiptUrl?: string;
};
