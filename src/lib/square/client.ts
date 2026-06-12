import { SquareClient, SquareEnvironment } from 'square';

/**
 * Initialized Square Client.
 * Note: Credentials must be set in .env.local
 */
export const squareClient = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment:
    process.env.NODE_ENV === 'production'
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});
