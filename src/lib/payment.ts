// Stripe Payment Integration
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'apple_pay' | 'google_pay' | 'klarna' | 'afterpay';
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
  billingDetails: {
    name: string;
    email: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
}

export interface ShippingRate {
  id: string;
  displayName: string;
  fixedAmount: {
    amount: number;
    currency: string;
  };
  deliveryEstimate: {
    minimum: {
      unit: 'day' | 'week';
      value: number;
    };
    maximum: {
      unit: 'day' | 'week';
      value: number;
    };
  };
}

class PaymentService {
  private stripe: Promise<Stripe | null>;

  constructor() {
    this.stripe = stripePromise;
  }

  async createPaymentIntent(amount: number, currency: string = 'usd', metadata?: Record<string, string>) {
    try {
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to cents
          currency,
          metadata,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const paymentIntent: PaymentIntent = await response.json();
      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  async confirmPayment(
    clientSecret: string,
    elements: StripeElements,
    returnUrl: string = `${window.location.origin}/checkout/success`
  ) {
    const stripe = await this.stripe;
    if (!stripe) throw new Error('Stripe not loaded');

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
    });

    if (error) {
      throw error;
    }

    return paymentIntent;
  }

  async createSetupIntent(customerId?: string) {
    try {
      const response = await fetch('/api/payments/create-setup-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create setup intent');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating setup intent:', error);
      throw error;
    }
  }

  async savePaymentMethod(setupIntentClientSecret: string, elements: StripeElements) {
    const stripe = await this.stripe;
    if (!stripe) throw new Error('Stripe not loaded');

    const { error, setupIntent } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/account/payment-methods`,
      },
    });

    if (error) {
      throw error;
    }

    return setupIntent;
  }

  async getPaymentMethods(customerId: string): Promise<PaymentMethod[]> {
    try {
      const response = await fetch(`/api/payments/payment-methods?customerId=${customerId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch payment methods');
      }

      const data = await response.json();
      return data.paymentMethods;
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      throw error;
    }
  }

  async deletePaymentMethod(paymentMethodId: string) {
    try {
      const response = await fetch(`/api/payments/payment-methods/${paymentMethodId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete payment method');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting payment method:', error);
      throw error;
    }
  }

  async getShippingRates(address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }): Promise<ShippingRate[]> {
    try {
      const response = await fetch('/api/shipping/rates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch shipping rates');
      }

      const data = await response.json();
      return data.shippingRates;
    } catch (error) {
      console.error('Error fetching shipping rates:', error);
      throw error;
    }
  }

  async calculateTax(address: {
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }, amount: number) {
    try {
      const response = await fetch('/api/tax/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, amount }),
      });

      if (!response.ok) {
        throw new Error('Failed to calculate tax');
      }

      return await response.json();
    } catch (error) {
      console.error('Error calculating tax:', error);
      throw error;
    }
  }

  async processRefund(paymentIntentId: string, amount?: number, reason?: string) {
    try {
      const response = await fetch('/api/payments/refund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentIntentId,
          amount: amount ? Math.round(amount * 100) : undefined,
          reason,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process refund');
      }

      return await response.json();
    } catch (error) {
      console.error('Error processing refund:', error);
      throw error;
    }
  }

  // Apple Pay / Google Pay Support
  async canMakePayment(): Promise<{
    applePay: boolean;
    googlePay: boolean;
  }> {
    const stripe = await this.stripe;
    if (!stripe) return { applePay: false, googlePay: false };

    const paymentRequest = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Test',
        amount: 100,
      },
    });

    const canMakePayment = await paymentRequest.canMakePayment();
    
    return {
      applePay: canMakePayment?.applePay || false,
      googlePay: canMakePayment?.googlePay || false,
    };
  }

  async createPaymentRequest(amount: number, currency: string = 'usd') {
    const stripe = await this.stripe;
    if (!stripe) throw new Error('Stripe not loaded');

    return stripe.paymentRequest({
      country: 'US',
      currency,
      total: {
        label: 'Veloura',
        amount: Math.round(amount * 100),
      },
      requestPayerName: true,
      requestPayerEmail: true,
      requestPayerPhone: true,
      requestShipping: true,
      shippingOptions: [
        {
          id: 'standard',
          label: 'Standard Shipping',
          detail: '5-7 business days',
          amount: 599,
        },
        {
          id: 'express',
          label: 'Express Shipping',
          detail: '2-3 business days',
          amount: 1299,
        },
      ],
    });
  }
}

export const paymentService = new PaymentService();

// Utility functions for payment formatting
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatPaymentMethodDisplay = (paymentMethod: PaymentMethod): string => {
  if (paymentMethod.type === 'card' && paymentMethod.card) {
    return `${paymentMethod.card.brand.toUpperCase()} •••• ${paymentMethod.card.last4}`;
  }
  return paymentMethod.type.replace('_', ' ').toUpperCase();
};

// Payment validation utilities
export const validateCardNumber = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\s/g, '');
  return /^\d{13,19}$/.test(cleaned);
};

export const validateCVV = (cvv: string, cardType?: string): boolean => {
  if (cardType === 'amex') {
    return /^\d{4}$/.test(cvv);
  }
  return /^\d{3}$/.test(cvv);
};

export const validateExpiryDate = (month: string, year: string): boolean => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  
  const expYear = parseInt(year);
  const expMonth = parseInt(month);
  
  if (expYear < currentYear) return false;
  if (expYear === currentYear && expMonth < currentMonth) return false;
  
  return expMonth >= 1 && expMonth <= 12;
};

export default paymentService;
