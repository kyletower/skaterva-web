import { z } from 'zod';

/**
 * Schema for Square Payment Requests.
 * Enforces Zod validation as per Tech Spec v1.8.
 */
export const PaymentRequestSchema = z.object({
  sourceId: z.string().min(1, 'Source ID is required'),
  amount: z.number().positive('Amount must be greater than 0'),
  idempotencyKey: z.string().uuid('Must be a valid UUID'),
  locationId: z.string().optional(),
});

export type PaymentRequest = z.infer<typeof PaymentRequestSchema>;
