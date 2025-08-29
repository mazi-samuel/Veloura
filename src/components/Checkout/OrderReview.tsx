import React from 'react'
import Image from 'next/image'
import { Address } from '@/lib/api'

interface OrderReviewProps {
  customerData: {
    email: string
    firstName: string
    lastName: string
    phone: string
  }
  shippingAddress: Partial<Address>
  billingAddress: Partial<Address>
  cartItems: any[]
  subtotal: number
  shipping: number
  tax: number
  total: number
}

const OrderReview: React.FC<OrderReviewProps> = ({
  customerData,
  shippingAddress,
  billingAddress,
  cartItems,
  subtotal,
  shipping,
  tax,
  total,
}) => {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-900">Review Your Order</h2>

      {/* Order Items */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={`${item.product.id}-${item.shade?.id}`} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden">
                <Image
                  src={item.product.images?.[0] || '/placeholder-product.jpg'}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                {item.shade && (
                  <p className="text-sm text-gray-600">Shade: {item.shade.name}</p>
                )}
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Name</p>
              <p className="text-gray-900">{customerData.firstName} {customerData.lastName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Email</p>
              <p className="text-gray-900">{customerData.email}</p>
            </div>
            {customerData.phone && (
              <div>
                <p className="text-sm font-medium text-gray-700">Phone</p>
                <p className="text-gray-900">{customerData.phone}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-900">{shippingAddress.firstName} {shippingAddress.lastName}</p>
          {shippingAddress.company && (
            <p className="text-gray-900">{shippingAddress.company}</p>
          )}
          <p className="text-gray-900">{shippingAddress.address1}</p>
          {shippingAddress.address2 && (
            <p className="text-gray-900">{shippingAddress.address2}</p>
          )}
          <p className="text-gray-900">
            {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
          </p>
          <p className="text-gray-900">{shippingAddress.country || 'United States'}</p>
          {shippingAddress.phone && (
            <p className="text-gray-900 mt-2">Phone: {shippingAddress.phone}</p>
          )}
        </div>
      </div>

      {/* Billing Address */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Address</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          {billingAddress === shippingAddress ? (
            <p className="text-gray-600 italic">Same as shipping address</p>
          ) : (
            <>
              <p className="text-gray-900">{billingAddress.firstName} {billingAddress.lastName}</p>
              {billingAddress.company && (
                <p className="text-gray-900">{billingAddress.company}</p>
              )}
              <p className="text-gray-900">{billingAddress.address1}</p>
              {billingAddress.address2 && (
                <p className="text-gray-900">{billingAddress.address2}</p>
              )}
              <p className="text-gray-900">
                {billingAddress.city}, {billingAddress.state} {billingAddress.zipCode}
              </p>
              <p className="text-gray-900">{billingAddress.country || 'United States'}</p>
            </>
          )}
        </div>
      </div>

      {/* Order Summary */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-900">
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="text-gray-900">${tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-lg font-semibold text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            className="h-4 w-4 text-veloura-burgundy focus:ring-veloura-burgundy border-gray-300 rounded mt-0.5"
            required
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
            I agree to the{' '}
            <a href="/terms" className="text-veloura-burgundy hover:underline" target="_blank">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-veloura-burgundy hover:underline" target="_blank">
              Privacy Policy
            </a>
          </label>
        </div>
      </div>
    </div>
  )
}

export default OrderReview
