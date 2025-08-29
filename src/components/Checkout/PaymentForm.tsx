import React from 'react'
import { CreditCardIcon, DevicePhoneMobileIcon, WalletIcon } from '@heroicons/react/24/outline'

interface PaymentFormProps {
  paymentMethod: string
  onPaymentMethodChange: (method: string) => void
  errors: Record<string, string>
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  paymentMethod,
  onPaymentMethodChange,
  errors,
}) => {
  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit or Debit Card',
      icon: CreditCardIcon,
      description: 'Visa, Mastercard, American Express',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: WalletIcon,
      description: 'Pay with your PayPal account',
    },
    {
      id: 'apple_pay',
      name: 'Apple Pay',
      icon: DevicePhoneMobileIcon,
      description: 'Pay with Touch ID or Face ID',
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Payment Information</h2>
      
      {/* Payment Method Selection */}
      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const IconComponent = method.icon
          return (
            <label
              key={method.id}
              className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
                paymentMethod === method.id
                  ? 'border-veloura-burgundy bg-rose-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={(e) => onPaymentMethodChange(e.target.value)}
                className="h-4 w-4 text-veloura-burgundy focus:ring-veloura-burgundy border-gray-300 mt-1"
              />
              <div className="ml-3 flex-1">
                <div className="flex items-center">
                  <IconComponent className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="font-medium text-gray-900">{method.name}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{method.description}</p>
              </div>
            </label>
          )
        })}
      </div>

      {errors.payment && (
        <p className="text-sm text-red-600">{errors.payment}</p>
      )}

      {/* Credit Card Form */}
      {paymentMethod === 'card' && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Card Number *
            </label>
            <div id="card-number-element" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
              {/* Stripe Elements will be mounted here */}
              <div className="text-gray-500 text-sm">Card number field will appear here</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date *
              </label>
              <div id="card-expiry-element" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                <div className="text-gray-500 text-sm">MM/YY</div>
              </div>
            </div>

            <div>
              <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">
                CVC *
              </label>
              <div id="card-cvc-element" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                <div className="text-gray-500 text-sm">CVC</div>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
              Name on Card *
            </label>
            <input
              type="text"
              id="cardName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
              placeholder="Full name as it appears on card"
            />
          </div>

          <div className="flex items-center pt-2">
            <input
              type="checkbox"
              id="saveCard"
              className="h-4 w-4 text-veloura-burgundy focus:ring-veloura-burgundy border-gray-300 rounded"
            />
            <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-900">
              Save this card for future purchases
            </label>
          </div>
        </div>
      )}

      {/* PayPal */}
      {paymentMethod === 'paypal' && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700 mb-3">
            You will be redirected to PayPal to complete your payment.
          </p>
          <div className="flex justify-center">
            <div className="bg-blue-600 text-white px-6 py-2 rounded text-sm font-medium">
              PayPal Button (Demo)
            </div>
          </div>
        </div>
      )}

      {/* Apple Pay */}
      {paymentMethod === 'apple_pay' && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700 mb-3">
            Use Touch ID or Face ID to pay with Apple Pay.
          </p>
          <div className="flex justify-center">
            <div className="bg-black text-white px-6 py-2 rounded text-sm font-medium">
              Apple Pay Button (Demo)
            </div>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-green-800">Secure Payment</h4>
            <p className="text-sm text-green-700 mt-1">
              Your payment information is encrypted and secure. We never store your credit card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentForm
