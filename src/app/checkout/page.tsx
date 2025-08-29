'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { paymentService } from '@/lib/payment';
import { inventoryService } from '@/lib/inventory';
import { analytics } from '@/lib/analytics';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutSteps from '@/components/Checkout/CheckoutSteps';
import CartSummary from '@/components/Checkout/CartSummary';
import CustomerInfo from '@/components/Checkout/CustomerInfo';
import ShippingForm from '@/components/Checkout/ShippingForm';
import PaymentForm from '@/components/Checkout/PaymentForm';
import OrderReview from '@/components/Checkout/OrderReview';
import { Address } from '@/lib/api';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const router = useRouter();
  const { items: cartItems, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form data
  const [customerData, setCustomerData] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    createAccount: false,
    password: '',
  });
  
  const [shippingAddress, setShippingAddress] = useState<Partial<Address>>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: '',
  });
  
  const [billingAddress, setBillingAddress] = useState<Partial<Address>>({});
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [selectedShippingRate, setSelectedShippingRate] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  
  // Calculated totals
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  
  // Payment processing
  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  useEffect(() => {
    // Redirect if cart is empty
    if (cartItems.length === 0) {
      router.push('/shop');
      return;
    }

    // Track checkout initiation
    analytics.trackBeginCheckout(
      cartItems.map(item => ({
        item_id: item.product.id,
        item_name: item.product.name,
        category: item.product.category,
        quantity: item.quantity,
        price: item.product.price,
        item_brand: 'Veloura',
        item_variant: item.shade?.name,
      })),
      total
    );

    // Calculate initial subtotal
    const calculatedSubtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    setSubtotal(calculatedSubtotal);
    setFinalTotal(calculatedSubtotal);
  }, [cartItems, total, router]);

  const steps = [
    { number: 1, title: 'Customer Info', completed: currentStep > 1 },
    { number: 2, title: 'Shipping', completed: currentStep > 2 },
    { number: 3, title: 'Payment', completed: currentStep > 3 },
    { number: 4, title: 'Review', completed: false },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!customerData.email) newErrors.email = 'Email is required';
        if (!customerData.firstName) newErrors.firstName = 'First name is required';
        if (!customerData.lastName) newErrors.lastName = 'Last name is required';
        if (customerData.createAccount && !customerData.password) {
          newErrors.password = 'Password is required for account creation';
        }
        break;
        
      case 2:
        if (!shippingAddress.address1) newErrors.address1 = 'Address is required';
        if (!shippingAddress.city) newErrors.city = 'City is required';
        if (!shippingAddress.state) newErrors.state = 'State is required';
        if (!shippingAddress.zipCode) newErrors.zipCode = 'ZIP code is required';
        if (!selectedShippingRate) newErrors.shipping = 'Please select a shipping method';
        break;
        
      case 3:
        if (!paymentMethod) newErrors.payment = 'Please select a payment method';
        if (!sameAsShipping) {
          if (!billingAddress.address1) newErrors.billingAddress1 = 'Billing address is required';
          if (!billingAddress.city) newErrors.billingCity = 'Billing city is required';
          if (!billingAddress.state) newErrors.billingState = 'Billing state is required';
          if (!billingAddress.zipCode) newErrors.billingZipCode = 'Billing ZIP code is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setIsLoading(true);

    try {
      if (currentStep === 2) {
        // Calculate shipping and tax
        await calculateShippingAndTax();
      } else if (currentStep === 3) {
        // Create payment intent
        await createPaymentIntent();
      }

      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error('Error proceeding to next step:', error);
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateShippingAndTax = async () => {
    try {
      // Get shipping rates
      const shippingRates = await paymentService.getShippingRates(shippingAddress as any);
      const selectedRate = shippingRates.find(rate => rate.id === selectedShippingRate);
      
      if (selectedRate) {
        const shippingCost = selectedRate.fixedAmount.amount / 100; // Convert from cents
        setShipping(shippingCost);
        
        // Calculate tax
        const taxResult = await paymentService.calculateTax(shippingAddress as any, subtotal + shippingCost);
        const taxAmount = taxResult.tax || 0;
        setTax(taxAmount);
        
        setFinalTotal(subtotal + shippingCost + taxAmount);
      }
    } catch (error) {
      console.error('Error calculating shipping and tax:', error);
    }
  };

  const createPaymentIntent = async () => {
    try {
      const paymentIntent = await paymentService.createPaymentIntent(
        finalTotal,
        'usd',
        {
          customer_email: customerData.email,
          customer_name: `${customerData.firstName} ${customerData.lastName}`,
          cart_items: JSON.stringify(cartItems.map(item => ({
            product_id: item.product.id,
            shade_id: item.shade?.id,
            quantity: item.quantity,
            price: item.product.price,
          }))),
        }
      );
      
      setClientSecret(paymentIntent.clientSecret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(4)) return;

    setPaymentProcessing(true);

    try {
      // Reserve inventory
      const reservationResult = await inventoryService.reserveInventory(
        cartItems.map(item => ({
          productId: item.product.id,
          shadeId: item.shade?.id,
          quantity: item.quantity,
        })),
        user?.id || 'guest'
      );

      if (!reservationResult.success) {
        throw new Error('Unable to reserve inventory');
      }

      // Track payment info addition
      analytics.trackAddPaymentInfo(
        cartItems.map(item => ({
          item_id: item.product.id,
          item_name: item.product.name,
          category: item.product.category,
          quantity: item.quantity,
          price: item.product.price,
          item_brand: 'Veloura',
          item_variant: item.shade?.name,
        })),
        finalTotal
      );

      // Process payment would happen here
      // For demo purposes, we'll simulate success
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create order
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.product.id,
          shadeId: item.shade?.id,
          quantity: item.quantity,
        })),
        shippingAddress: shippingAddress as Address,
        billingAddress: sameAsShipping ? shippingAddress as Address : billingAddress as Address,
        paymentMethodId: paymentMethod,
      };

      // This would call the actual API
      // const order = await api.orders.create(orderData);

      // Track successful purchase
      analytics.trackPurchase({
        transaction_id: 'demo-order-' + Date.now(),
        value: finalTotal,
        currency: 'USD',
        items: cartItems.map(item => ({
          item_id: item.product.id,
          item_name: item.product.name,
          category: item.product.category,
          quantity: item.quantity,
          price: item.product.price,
          item_brand: 'Veloura',
          item_variant: item.shade?.name,
        })),
        shipping,
        tax,
      });

      // Clear cart and redirect to success page
      clearCart();
      router.push('/checkout/success?order=demo-order-' + Date.now());

    } catch (error) {
      console.error('Error placing order:', error);
      setErrors({ general: 'Failed to place order. Please try again.' });
    } finally {
      setPaymentProcessing(false);
    }
  };

  const stripeOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#6C1C2C',
        colorBackground: '#ffffff',
        colorText: '#000000',
        colorDanger: '#df1b41',
        fontFamily: 'Lato, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-playfair">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your Veloura purchase</p>
        </div>

        {/* Steps */}
        <CheckoutSteps steps={steps} currentStep={currentStep} />

        {/* Error Messages */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{errors.general}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {currentStep === 1 && (
                <CustomerInfo
                  data={customerData}
                  onChange={setCustomerData}
                  errors={errors}
                  isAuthenticated={isAuthenticated}
                />
              )}

              {currentStep === 2 && (
                <ShippingForm
                  shippingAddress={shippingAddress}
                  onShippingChange={setShippingAddress}
                  billingAddress={billingAddress}
                  onBillingChange={setBillingAddress}
                  sameAsShipping={sameAsShipping}
                  onSameAsShippingChange={setSameAsShipping}
                  selectedShippingRate={selectedShippingRate}
                  onShippingRateChange={setSelectedShippingRate}
                  errors={errors}
                />
              )}

              {currentStep === 3 && clientSecret && (
                <Elements stripe={stripePromise} options={stripeOptions}>
                  <PaymentForm
                    paymentMethod={paymentMethod}
                    onPaymentMethodChange={setPaymentMethod}
                    errors={errors}
                  />
                </Elements>
              )}

              {currentStep === 4 && (
                <OrderReview
                  customerData={customerData}
                  shippingAddress={shippingAddress}
                  billingAddress={sameAsShipping ? shippingAddress : billingAddress}
                  cartItems={cartItems}
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  total={finalTotal}
                />
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1 || isLoading}
                  className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>

                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    disabled={isLoading}
                    className="px-6 py-3 bg-veloura-burgundy text-white rounded-lg hover:bg-veloura-burgundy/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isLoading && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    )}
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={paymentProcessing}
                    className="px-8 py-3 bg-veloura-burgundy text-white rounded-lg hover:bg-veloura-burgundy/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center text-lg font-semibold"
                  >
                    {paymentProcessing && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    )}
                    Place Order
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              items={cartItems}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={finalTotal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
