import { Client, Environment } from 'square';

/**
 * Initialized Square Client.
 * Note: Credentials must be set in .env.local
 */
export const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment:
    process.env.NODE_ENV === 'production'
      ? Environment.Production
      : Environment.Sandbox,
});
