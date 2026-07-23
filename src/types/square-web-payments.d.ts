/**
 * Minimal ambient types for the Square Web Payments SDK, loaded via
 * <script src="https://sandbox.web.squarecdn.com/v1/square.js"> at runtime.
 * Square does not publish a browser type package, so only the subset of
 * the API this app actually uses is declared here.
 */
type SquareTokenizeResult = {
  status: 'OK' | 'ERROR';
  token?: string;
  errors?: { message: string }[];
};

type SquareCard = {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<SquareTokenizeResult>;
  destroy: () => Promise<void>;
};

type SquarePayments = {
  card: () => Promise<SquareCard>;
};

interface Window {
  Square?: {
    payments: (applicationId: string, locationId: string) => SquarePayments;
  };
}
