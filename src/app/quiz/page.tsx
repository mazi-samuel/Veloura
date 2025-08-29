'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  CheckIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline'

interface QuizQuestion {
  id: string
  question: string
  options: Array<{
    id: string
    text: string
    value: string
    image?: string
  }>
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'skin-tone',
    question: 'What best describes your skin tone?',
    options: [
      { id: 'fair', text: 'Fair - Light with pink or yellow undertones', value: 'fair' },
      { id: 'light', text: 'Light - Light to medium with warm undertones', value: 'light' },
      { id: 'medium', text: 'Medium - Medium with golden or olive undertones', value: 'medium' },
      { id: 'deep', text: 'Deep - Deep with warm or cool undertones', value: 'deep' },
    ]
  },
  {
    id: 'undertone',
    question: 'What are your undertones?',
    options: [
      { id: 'cool', text: 'Cool - Pink, red, or blue undertones', value: 'cool' },
      { id: 'warm', text: 'Warm - Yellow, golden, or peach undertones', value: 'warm' },
      { id: 'neutral', text: 'Neutral - Mix of warm and cool', value: 'neutral' },
      { id: 'unsure', text: 'I\'m not sure', value: 'unsure' },
    ]
  },
  {
    id: 'style',
    question: 'What\'s your makeup style?',
    options: [
      { id: 'natural', text: 'Natural & Effortless', value: 'natural' },
      { id: 'glamorous', text: 'Glamorous & Bold', value: 'glamorous' },
      { id: 'trendy', text: 'Trendy & Experimental', value: 'trendy' },
      { id: 'classic', text: 'Classic & Timeless', value: 'classic' },
    ]
  },
  {
    id: 'occasion',
    question: 'When do you usually wear lip gloss?',
    options: [
      { id: 'everyday', text: 'Everyday casual wear', value: 'everyday' },
      { id: 'work', text: 'Professional/work settings', value: 'work' },
      { id: 'special', text: 'Special occasions & events', value: 'special' },
      { id: 'night', text: 'Night out & parties', value: 'night' },
    ]
  },
  {
    id: 'finish',
    question: 'What finish do you prefer?',
    options: [
      { id: 'glossy', text: 'High shine & glossy', value: 'glossy' },
      { id: 'satin', text: 'Satin & smooth', value: 'satin' },
      { id: 'matte', text: 'Matte & velvety', value: 'matte' },
      { id: 'shimmer', text: 'Shimmer & sparkle', value: 'shimmer' },
    ]
  }
]

interface QuizResult {
  collection: string
  shade: string
  description: string
  image: string
  features: string[]
  price: string
}

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<QuizResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      calculateResult()
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const calculateResult = () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      // Simple logic to determine result based on answers
      let collection = 'Signature Collection'
      let shade = 'Crystal Clear'
      
      if (answers['skin-tone'] === 'fair' && answers['style'] === 'natural') {
        collection = 'Golden Hour'
        shade = 'Rose Petal'
      } else if (answers['skin-tone'] === 'deep' && answers['style'] === 'glamorous') {
        collection = 'Midnight Muse'
        shade = 'Velvet Rose'
      } else if (answers['finish'] === 'matte' && answers['style'] === 'trendy') {
        collection = 'Velvet Dreams'
        shade = 'Rouge Noir'
      } else if (answers['undertone'] === 'warm' && answers['occasion'] === 'special') {
        collection = 'Limited Edition'
        shade = 'Golden Hour'
      }

      const mockResult: QuizResult = {
        collection,
        shade,
        description: `Based on your preferences, ${shade} from our ${collection} is perfect for you. This shade complements your skin tone and matches your style perfectly.`,
        image: '/products/crystal-clear-1.jpg',
        features: [
          'Long-lasting formula',
          'Hydrating ingredients',
          'Perfect color match',
          'Cruelty-free'
        ],
        price: '$24.99'
      }

      setResult(mockResult)
      setIsLoading(false)
    }, 2000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setResult(null)
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-veloura-gold rounded-full mb-6">
              <SparklesIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-playfair mb-4">
              Your Perfect Match!
            </h1>
            <p className="text-xl text-gray-600">
              We found the perfect shade just for you
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <div className="aspect-square bg-gray-100 rounded-2xl mb-6">
                  {/* Placeholder for product image */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Product Image
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 p-8">
                <div className="mb-4">
                  <span className="text-sm text-veloura-burgundy font-semibold uppercase tracking-wide">
                    {result.collection}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 font-playfair mt-2">
                    {result.shade}
                  </h2>
                  <p className="text-2xl text-veloura-burgundy font-semibold mt-2">
                    {result.price}
                  </p>
                </div>

                <p className="text-gray-600 mb-6">
                  {result.description}
                </p>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Why this shade is perfect for you:
                  </h3>
                  <ul className="space-y-2">
                    {result.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-veloura-burgundy mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <button className="w-full bg-veloura-burgundy text-white py-4 px-6 rounded-lg hover:bg-veloura-burgundy/90 transition-colors font-semibold">
                    Add to Cart
                  </button>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={resetQuiz}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:border-veloura-burgundy hover:text-veloura-burgundy transition-colors"
                    >
                      Retake Quiz
                    </button>
                    <Link
                      href="/shop"
                      className="flex-1 text-center border border-veloura-burgundy text-veloura-burgundy py-3 px-6 rounded-lg hover:bg-veloura-burgundy hover:text-white transition-colors"
                    >
                      Browse All
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-veloura-burgundy border-t-transparent mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Finding Your Perfect Match...
          </h2>
          <p className="text-gray-600">
            Analyzing your preferences to recommend the best shade for you
          </p>
        </div>
      </div>
    )
  }

  const currentQ = quizQuestions[currentQuestion]
  const currentAnswer = answers[currentQ.id]

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-playfair mb-4">
            Shade Quiz
          </h1>
          <p className="text-gray-600">
            Answer a few questions to find your perfect Veloura shade
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-veloura-burgundy h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {currentQ.question}
            </h2>

            <div className="space-y-4">
              {currentQ.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(currentQ.id, option.value)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    currentAnswer === option.value
                      ? 'border-veloura-burgundy bg-veloura-burgundy/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">{option.text}</span>
                    {currentAnswer === option.value && (
                      <CheckIcon className="h-5 w-5 text-veloura-burgundy" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
              currentQuestion === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:text-veloura-burgundy'
            }`}
          >
            <ChevronLeftIcon className="h-5 w-5 mr-2" />
            Previous
          </button>

          <button
            onClick={nextQuestion}
            disabled={!currentAnswer}
            className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
              !currentAnswer
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-veloura-burgundy text-white hover:bg-veloura-burgundy/90'
            }`}
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Get My Results' : 'Next'}
            <ChevronRightIcon className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuizPage
