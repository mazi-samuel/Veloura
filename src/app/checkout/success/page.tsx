'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircleIcon, TruckIcon, GiftIcon, HeartIcon } from '@heroicons/react/24/outline';
import { analytics } from '@/lib/analytics';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState<string>('');

  useEffect(() => {
    const order = searchParams.get('order');
    if (!order) {
      router.push('/');
      return;
    }

    setOrderNumber(order);

    // Track conversion
    analytics.trackConversion('purchase', undefined, 'USD');
    
    // Track page view
    analytics.trackPageView('/checkout/success', 'Order Confirmation');
  }, [searchParams, router]);

  const orderDetails = {
    estimatedDelivery: '3-5 business days',
    trackingAvailable: '24-48 hours',
    items: [
      {
        name: 'Velvet Rouge Lip Gloss',
        shade: 'Crimson Kiss',
        quantity: 2,
        price: 28.00,
      },
      {
        name: 'Golden Shimmer Lip Gloss',
        shade: 'Champagne Dreams',
        quantity: 1,
        price: 30.00,
      },
    ],
    total: 86.00,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-veloura-blush to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircleIcon className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 font-playfair mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your Veloura purchase
          </p>
          
          <p className="text-lg text-veloura-burgundy font-semibold">
            Order #{orderNumber}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 font-playfair mb-6">Order Details</h2>
            
            <div className="space-y-4 mb-6">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">Shade: {item.shade}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-900">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${orderDetails.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 font-playfair mb-6">What's Next?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-veloura-burgundy rounded-full flex items-center justify-center">
                  <TruckIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Shipping</h3>
                  <p className="text-gray-600">Your order will be delivered in {orderDetails.estimatedDelivery}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-veloura-gold rounded-full flex items-center justify-center">
                  <GiftIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Tracking</h3>
                  <p className="text-gray-600">Tracking information will be available in {orderDetails.trackingAvailable}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                  <HeartIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Enjoy!</h3>
                  <p className="text-gray-600">Get ready to experience luxury lip care like never before</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Email */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 font-playfair mb-4">
              Confirmation Email Sent
            </h2>
            <p className="text-gray-600 mb-6">
              We've sent a detailed order confirmation to your email address. 
              Check your inbox for tracking updates and delivery notifications.
            </p>
            
            <div className="bg-veloura-blush rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Join the Veloura Society</h3>
              <p className="text-gray-600 text-sm mb-4">
                Earn points on every purchase, get exclusive access to new collections, 
                and enjoy member-only perks and rewards.
              </p>
              <button className="bg-veloura-burgundy text-white px-6 py-2 rounded-lg hover:bg-veloura-burgundy/90 transition-colors">
                Join Now
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link
            href="/account/orders"
            className="bg-veloura-burgundy text-white px-8 py-3 rounded-lg hover:bg-veloura-burgundy/90 transition-colors text-center font-semibold"
          >
            View Order Status
          </Link>
          
          <Link
            href="/shop"
            className="bg-white text-veloura-burgundy border-2 border-veloura-burgundy px-8 py-3 rounded-lg hover:bg-veloura-burgundy hover:text-white transition-colors text-center font-semibold"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Social Sharing */}
        <div className="text-center mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Share Your Veloura Experience
          </h3>
          <p className="text-gray-600 mb-6">
            Tag us @veloura on social media with your new lip glosses for a chance to be featured!
          </p>
          
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => analytics.trackSocialShare('instagram', 'order_success')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Share on Instagram
            </button>
            <button 
              onClick={() => analytics.trackSocialShare('facebook', 'order_success')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Share on Facebook
            </button>
          </div>
        </div>

        {/* Customer Support */}
        <div className="bg-gray-50 rounded-2xl p-8 mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need Help?
          </h3>
          <p className="text-gray-600 mb-4">
            Our customer service team is here to assist you with any questions about your order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="text-veloura-burgundy hover:text-veloura-burgundy/80 font-semibold"
            >
              Contact Support
            </Link>
            <span className="hidden sm:block text-gray-400">|</span>
            <Link
              href="/faq"
              className="text-veloura-burgundy hover:text-veloura-burgundy/80 font-semibold"
            >
              View FAQ
            </Link>
            <span className="hidden sm:block text-gray-400">|</span>
            <a
              href="mailto:support@veloura.com"
              className="text-veloura-burgundy hover:text-veloura-burgundy/80 font-semibold"
            >
              Email Us
            </a>
          </div>
        </div>

        {/* Product Recommendations */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 font-playfair mb-8">
            You Might Also Love
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sample product recommendations */}
            {[
              { name: 'Lip Care Set', price: 45, image: '/placeholder-product-1.jpg' },
              { name: 'Travel Size Trio', price: 35, image: '/placeholder-product-2.jpg' },
              { name: 'Limited Edition Collection', price: 85, image: '/placeholder-product-3.jpg' },
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-veloura-burgundy to-veloura-gold"></div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-veloura-burgundy font-bold text-lg">${product.price}</p>
                  <button className="w-full mt-4 bg-veloura-burgundy text-white py-2 rounded-lg hover:bg-veloura-burgundy/90 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
