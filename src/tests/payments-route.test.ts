import { SquareError } from 'square';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/square/client', () => ({
  squareClient: {
    payments: {
      create: vi.fn(),
    },
  },
}));

import { squareClient } from '@/lib/square/client';

import { POST } from '@/app/api/payments/route';

function jsonRequest(body: unknown) {
  return new Request('http://localhost/api/payments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const validBody = {
  sourceId: 'cnon:card-nonce-ok',
  amount: 2975,
  idempotencyKey: '3f9a2b1c-1111-4b2a-9c3d-8f1e2a7b9c10',
  locationId: 'L1234567890',
};

describe('POST /api/payments', () => {
  beforeEach(() => {
    vi.mocked(squareClient.payments.create).mockReset();
  });

  it('rejects a request missing required fields', async () => {
    const response = await POST(jsonRequest({ amount: 2975 }));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBeTruthy();
    expect(squareClient.payments.create).not.toHaveBeenCalled();
  });

  it('rejects a non-integer or non-positive amount', async () => {
    const response = await POST(jsonRequest({ ...validBody, amount: 19.99 }));

    expect(response.status).toBe(400);
  });

  it('processes a successful payment and returns payment details', async () => {
    vi.mocked(squareClient.payments.create).mockResolvedValue({
      payment: {
        id: 'pay_123',
        status: 'COMPLETED',
        receiptUrl: 'https://squareup.com/receipt/pay_123',
      },
    } as never);

    const response = await POST(jsonRequest(validBody));
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.payment).toEqual({
      id: 'pay_123',
      status: 'COMPLETED',
      receiptUrl: 'https://squareup.com/receipt/pay_123',
    });
    expect(squareClient.payments.create).toHaveBeenCalledWith(
      expect.objectContaining({
        sourceId: validBody.sourceId,
        idempotencyKey: validBody.idempotencyKey,
        amountMoney: { amount: BigInt(validBody.amount), currency: 'USD' },
      })
    );
  });

  it('returns 402 when Square reports the payment failed', async () => {
    vi.mocked(squareClient.payments.create).mockResolvedValue({
      payment: { id: 'pay_456', status: 'FAILED' },
    } as never);

    const response = await POST(jsonRequest(validBody));

    expect(response.status).toBe(402);
  });

  it('maps a SquareError to its status code and message', async () => {
    vi.mocked(squareClient.payments.create).mockRejectedValue(
      new SquareError({
        message: 'Card declined',
        statusCode: 402,
        body: {
          errors: [{ category: 'PAYMENT_METHOD_ERROR', code: 'CARD_DECLINED' }],
        },
      })
    );

    const response = await POST(jsonRequest(validBody));
    const data = await response.json();

    expect(response.status).toBe(402);
    expect(data.error).toBeTruthy();
  });
});
