/**
 * Simulated Payment Service for AI Cube Tech Demo Prototype
 *
 * NOTE: This is a front-end demonstration of the checkout flow.
 * No real credit cards are processed, no financial APIs are touched,
 * and no cardholder data is stored.
 *
 * In production:
 * Replace this module with Stripe Elements, Stripe Checkout session,
 * PayPal SDK, or a server-side payment intent gateway.
 */

import { formatCurrency } from '../utils/formatters';

export interface CheckoutRequest {
  courseId: string;
  courseTitle: string;
  amount: number;
  billingName: string;
  billingEmail: string;
  paymentMethod: 'card' | 'paypal' | 'free_enroll';
}

export interface CheckoutResult {
  success: boolean;
  transactionId: string;
  message: string;
  timestamp: string;
  isDemo: true;
}

export const paymentService = {
  /**
   * Simulates a payment processing transaction with realistic latency and feedback
   */
  async processSimulatedCheckout(request: CheckoutRequest): Promise<CheckoutResult> {
    // Simulate gateway roundtrip
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      transactionId: `DEMO-TX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      message: request.amount === 0
        ? `Successfully enrolled in "${request.courseTitle}" for free!`
        : `Simulated payment of ${formatCurrency(request.amount)} approved for "${request.courseTitle}".`,
      timestamp: new Date().toISOString(),
      isDemo: true,
    };
  },
};
