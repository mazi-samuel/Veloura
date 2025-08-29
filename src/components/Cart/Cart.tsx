'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'
import Link from 'next/link'

const Cart = () => {
  const { state, closeCart, removeItem, updateQuantity } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  return (
    <AnimatePresence>
      {state.isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={closeCart}
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-serif font-bold text-veloura-burgundy">
                Shopping Bag ({state.itemCount})
              </h2>
              <button
                onClick={closeCart}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Your bag is empty
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Add some luxury to your collection
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="btn-primary"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="p-6 space-y-6">
                  {state.items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.shade}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex space-x-4"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500 mb-2">
                          {item.shade} • {item.collection}
                        </p>
                        <p className="font-semibold text-veloura-burgundy">
                          {formatPrice(item.price)}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(`${item.id}-${item.shade}`, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 rounded transition-colors"
                            >
                              <MinusIcon className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(`${item.id}-${item.shade}`, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 rounded transition-colors"
                            >
                              <PlusIcon className="h-4 w-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(`${item.id}-${item.shade}`)}
                            className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t bg-gray-50 p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">
                    Subtotal
                  </span>
                  <span className="text-lg font-bold text-veloura-burgundy">
                    {formatPrice(state.total)}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mb-4">
                  Shipping and taxes calculated at checkout
                </p>

                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="btn-primary w-full text-center"
                  >
                    Checkout
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="btn-secondary w-full text-center"
                  >
                    View Full Cart
                  </Link>
                </div>

                {/* Free Shipping Banner */}
                {state.total < 75 && (
                  <div className="mt-4 p-3 bg-veloura-blush/30 rounded-lg">
                    <p className="text-sm text-veloura-burgundy text-center">
                      Add {formatPrice(75 - state.total)} more for free shipping!
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Cart
