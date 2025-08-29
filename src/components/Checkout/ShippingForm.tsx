import React, { useState, useEffect } from 'react'
import { Address } from '@/lib/api'

interface ShippingFormProps {
  shippingAddress: Partial<Address>
  onShippingChange: (address: Partial<Address>) => void
  billingAddress: Partial<Address>
  onBillingChange: (address: Partial<Address>) => void
  sameAsShipping: boolean
  onSameAsShippingChange: (same: boolean) => void
  selectedShippingRate: string
  onShippingRateChange: (rateId: string) => void
  errors: Record<string, string>
}

const ShippingForm: React.FC<ShippingFormProps> = ({
  shippingAddress,
  onShippingChange,
  billingAddress,
  onBillingChange,
  sameAsShipping,
  onSameAsShippingChange,
  selectedShippingRate,
  onShippingRateChange,
  errors,
}) => {
  const [shippingRates] = useState([
    { id: 'standard', name: 'Standard Shipping', price: 0, time: '5-7 business days' },
    { id: 'express', name: 'Express Shipping', price: 10, time: '2-3 business days' },
    { id: 'overnight', name: 'Overnight Shipping', price: 25, time: '1 business day' },
  ])

  const handleShippingChange = (field: keyof Address, value: string) => {
    onShippingChange({ ...shippingAddress, [field]: value })
  }

  const handleBillingChange = (field: keyof Address, value: string) => {
    onBillingChange({ ...billingAddress, [field]: value })
  }

  return (
    <div className="space-y-8">
      {/* Shipping Address */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="shipping-firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              id="shipping-firstName"
              value={shippingAddress.firstName || ''}
              onChange={(e) => handleShippingChange('firstName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="shipping-lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              id="shipping-lastName"
              value={shippingAddress.lastName || ''}
              onChange={(e) => handleShippingChange('lastName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="shipping-company" className="block text-sm font-medium text-gray-700 mb-1">
            Company (optional)
          </label>
          <input
            type="text"
            id="shipping-company"
            value={shippingAddress.company || ''}
            onChange={(e) => handleShippingChange('company', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="shipping-address1" className="block text-sm font-medium text-gray-700 mb-1">
            Address *
          </label>
          <input
            type="text"
            id="shipping-address1"
            value={shippingAddress.address1 || ''}
            onChange={(e) => handleShippingChange('address1', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
            placeholder="Street address"
          />
          {errors.address1 && (
            <p className="mt-1 text-sm text-red-600">{errors.address1}</p>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="shipping-address2" className="block text-sm font-medium text-gray-700 mb-1">
            Apartment, suite, etc. (optional)
          </label>
          <input
            type="text"
            id="shipping-address2"
            value={shippingAddress.address2 || ''}
            onChange={(e) => handleShippingChange('address2', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label htmlFor="shipping-city" className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              id="shipping-city"
              value={shippingAddress.city || ''}
              onChange={(e) => handleShippingChange('city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
          </div>

          <div>
            <label htmlFor="shipping-state" className="block text-sm font-medium text-gray-700 mb-1">
              State *
            </label>
            <select
              id="shipping-state"
              value={shippingAddress.state || ''}
              onChange={(e) => handleShippingChange('state', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
            >
              <option value="">Select State</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              {/* Add more states as needed */}
            </select>
            {errors.state && (
              <p className="mt-1 text-sm text-red-600">{errors.state}</p>
            )}
          </div>

          <div>
            <label htmlFor="shipping-zipCode" className="block text-sm font-medium text-gray-700 mb-1">
              ZIP Code *
            </label>
            <input
              type="text"
              id="shipping-zipCode"
              value={shippingAddress.zipCode || ''}
              onChange={(e) => handleShippingChange('zipCode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
            />
            {errors.zipCode && (
              <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="shipping-phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="shipping-phone"
            value={shippingAddress.phone || ''}
            onChange={(e) => handleShippingChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
          />
        </div>
      </div>

      {/* Shipping Methods */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Method</h3>
        <div className="space-y-3">
          {shippingRates.map((rate) => (
            <label key={rate.id} className="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-veloura-burgundy">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="shippingRate"
                  value={rate.id}
                  checked={selectedShippingRate === rate.id}
                  onChange={(e) => onShippingRateChange(e.target.value)}
                  className="h-4 w-4 text-veloura-burgundy focus:ring-veloura-burgundy border-gray-300"
                />
                <div className="ml-3">
                  <div className="font-medium text-gray-900">{rate.name}</div>
                  <div className="text-sm text-gray-600">{rate.time}</div>
                </div>
              </div>
              <div className="font-semibold text-gray-900">
                {rate.price === 0 ? 'FREE' : `$${rate.price}`}
              </div>
            </label>
          ))}
        </div>
        {errors.shipping && (
          <p className="mt-2 text-sm text-red-600">{errors.shipping}</p>
        )}
      </div>

      {/* Billing Address */}
      <div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="sameAsShipping"
            checked={sameAsShipping}
            onChange={(e) => onSameAsShippingChange(e.target.checked)}
            className="h-4 w-4 text-veloura-burgundy focus:ring-veloura-burgundy border-gray-300 rounded"
          />
          <label htmlFor="sameAsShipping" className="ml-2 block text-sm text-gray-900">
            Billing address is same as shipping address
          </label>
        </div>

        {!sameAsShipping && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="billing-firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  id="billing-firstName"
                  value={billingAddress.firstName || ''}
                  onChange={(e) => handleBillingChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="billing-lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="billing-lastName"
                  value={billingAddress.lastName || ''}
                  onChange={(e) => handleBillingChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="billing-address1" className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <input
                type="text"
                id="billing-address1"
                value={billingAddress.address1 || ''}
                onChange={(e) => handleBillingChange('address1', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
                placeholder="Street address"
              />
              {errors.billingAddress1 && (
                <p className="mt-1 text-sm text-red-600">{errors.billingAddress1}</p>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label htmlFor="billing-city" className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  id="billing-city"
                  value={billingAddress.city || ''}
                  onChange={(e) => handleBillingChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
                />
                {errors.billingCity && (
                  <p className="mt-1 text-sm text-red-600">{errors.billingCity}</p>
                )}
              </div>

              <div>
                <label htmlFor="billing-state" className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <select
                  id="billing-state"
                  value={billingAddress.state || ''}
                  onChange={(e) => handleBillingChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
                >
                  <option value="">Select State</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                </select>
                {errors.billingState && (
                  <p className="mt-1 text-sm text-red-600">{errors.billingState}</p>
                )}
              </div>

              <div>
                <label htmlFor="billing-zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  id="billing-zipCode"
                  value={billingAddress.zipCode || ''}
                  onChange={(e) => handleBillingChange('zipCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
                />
                {errors.billingZipCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.billingZipCode}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShippingForm
