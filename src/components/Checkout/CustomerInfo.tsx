import React from 'react'

interface CustomerInfoProps {
  data: {
    email: string
    firstName: string
    lastName: string
    phone: string
    createAccount: boolean
    password: string
  }
  onChange: (data: any) => void
  errors: Record<string, string>
  isAuthenticated: boolean
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({
  data,
  onChange,
  errors,
  isAuthenticated,
}) => {
  const handleChange = (field: string, value: string | boolean) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            value={data.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
            disabled={isAuthenticated}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            value={data.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
            disabled={isAuthenticated}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
          disabled={isAuthenticated}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          value={data.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
        />
      </div>

      {!isAuthenticated && (
        <div className="border-t pt-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="createAccount"
              checked={data.createAccount}
              onChange={(e) => handleChange('createAccount', e.target.checked)}
              className="h-4 w-4 text-veloura-burgundy focus:ring-veloura-burgundy border-gray-300 rounded"
            />
            <label htmlFor="createAccount" className="ml-2 block text-sm text-gray-900">
              Create an account for faster checkout next time
            </label>
          </div>

          {data.createAccount && (
            <div className="mt-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                id="password"
                value={data.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
                placeholder="Create a password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CustomerInfo
