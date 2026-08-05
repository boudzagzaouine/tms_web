/**
 * Cash a driver declared collecting at a stop ("retour de fonds"), as recorded by the mobile app.
 * Append-only on the backend: a correction is a new row, so the history is preserved.
 */
export class CashCollection {
  id: number;
  /** 1 = enlevement (pickup), 2 = livraison (delivery). */
  leg: number;
  /** What the order expected to be collected, captured when the driver confirmed. */
  expectedAmount: number;
  /** What the driver reported actually collecting. */
  collectedAmount: number;
  paymentTypeCode: string;
  driverId: number;
  collectedAt: Date;
  /** Reason given by the driver when the collected amount differs from the expected one. */
  note: string;
}
