'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  ChatBubbleLeftRightIcon,
  ClockIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  HeartIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { analytics } from '@/lib/analytics';

interface ContactOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  action: string;
  available: boolean;
  responseTime: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function ContactPage() {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
    orderNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactOptions: ContactOption[] = [
    {
      id: 'email',
      title: 'Email Support',
      description: 'Get detailed help via email',
      icon: EnvelopeIcon,
      action: 'support@veloura.com',
      available: true,
      responseTime: 'Within 24 hours',
    },
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Chat with our beauty experts',
      icon: ChatBubbleLeftRightIcon,
      action: 'Start Chat',
      available: true,
      responseTime: 'Usually immediate',
    },
    {
      id: 'phone',
      title: 'Phone Support',
      description: 'Speak directly with our team',
      icon: PhoneIcon,
      action: '+1 (555) 123-GLOW',
      available: true,
      responseTime: 'Mon-Fri 9AM-6PM EST',
    },
  ];

  const categories = [
    { id: 'general', name: 'General Inquiry' },
    { id: 'order', name: 'Order Support' },
    { id: 'product', name: 'Product Questions' },
    { id: 'returns', name: 'Returns & Exchanges' },
    { id: 'technical', name: 'Technical Support' },
    { id: 'partnership', name: 'Partnerships' },
  ];

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I track my order?',
      answer: 'You can track your order by logging into your account and visiting the "Orders" section. You\'ll also receive tracking information via email once your order ships.',
      category: 'order',
    },
    {
      id: '2',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for unused products in original packaging. Returns are free for Veloura Society members, otherwise a $5 return fee applies.',
      category: 'returns',
    },
    {
      id: '3',
      question: 'Are your products cruelty-free?',
      answer: 'Yes! All Veloura products are 100% cruelty-free and never tested on animals. We are certified by Leaping Bunny.',
      category: 'product',
    },
    {
      id: '4',
      question: 'How do I join the Veloura Society?',
      answer: 'Simply create an account on our website and start earning points with your first purchase. Membership is free and includes exclusive benefits.',
      category: 'general',
    },
    {
      id: '5',
      question: 'Do you ship internationally?',
      answer: 'We currently ship to the US, Canada, UK, and EU. International shipping rates and times vary by destination.',
      category: 'order',
    },
    {
      id: '6',
      question: 'How long do your lip glosses last?',
      answer: 'Our lip glosses have a shelf life of 24 months unopened and 12 months after opening. Each product includes a period-after-opening symbol.',
      category: 'product',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Track form submission
      analytics.trackFormSubmission('contact_form', true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: '',
        orderNumber: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      analytics.trackFormSubmission('contact_form', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const filteredFAQs = selectedCategory === 'general' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-veloura-burgundy to-veloura-gold py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white font-playfair mb-6"
          >
            We're Here to Help
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 max-w-3xl mx-auto"
          >
            Have questions about our products, your order, or need beauty advice? 
            Our expert team is ready to assist you.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-veloura-burgundy rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 font-playfair mb-3">
                  {option.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {option.description}
                </p>
                
                <div className="mb-4">
                  {option.id === 'email' ? (
                    <a
                      href={`mailto:${option.action}`}
                      className="text-veloura-burgundy font-semibold hover:text-veloura-burgundy/80"
                    >
                      {option.action}
                    </a>
                  ) : option.id === 'phone' ? (
                    <a
                      href={`tel:${option.action.replace(/\D/g, '')}`}
                      className="text-veloura-burgundy font-semibold hover:text-veloura-burgundy/80"
                    >
                      {option.action}
                    </a>
                  ) : (
                    <button className="bg-veloura-burgundy text-white px-6 py-2 rounded-lg hover:bg-veloura-burgundy/90 transition-colors">
                      {option.action}
                    </button>
                  )}
                </div>
                
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {option.responseTime}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-8">
              Send us a Message
            </h2>
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-lg p-8 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeartIcon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-2">
                  Thank you for reaching out!
                </h3>
                <p className="text-green-700">
                  We've received your message and will get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veloura-burgundy/20 focus:border-veloura-burgundy"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veloura-burgundy/20 focus:border-veloura-burgundy"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veloura-burgundy/20 focus:border-veloura-burgundy"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veloura-burgundy/20 focus:border-veloura-burgundy"
                  />
                </div>
                
                {formData.category === 'order' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Number (optional)
                    </label>
                    <input
                      type="text"
                      name="orderNumber"
                      value={formData.orderNumber}
                      onChange={handleInputChange}
                      placeholder="VEL001234"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veloura-burgundy/20 focus:border-veloura-burgundy"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veloura-burgundy/20 focus:border-veloura-burgundy"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-veloura-burgundy text-white py-3 px-6 rounded-lg font-semibold hover:bg-veloura-burgundy/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-8">
              Frequently Asked Questions
            </h2>
            
            {/* FAQ Categories */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setSelectedCategory('general')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'general'
                    ? 'bg-veloura-burgundy text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {categories.slice(1).map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-veloura-burgundy text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-gray-200 rounded-lg"
                >
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer">
                      <h3 className="font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0">
                        <QuestionMarkCircleIcon className="w-5 h-5 text-veloura-burgundy group-open:rotate-180 transition-transform" />
                      </div>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <MapPinIcon className="w-8 h-8 text-veloura-burgundy mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Visit Our Studio</h3>
              <p className="text-gray-600 text-sm">
                123 Beauty Boulevard<br />
                New York, NY 10001<br />
                By appointment only
              </p>
            </div>
            
            <div>
              <ClockIcon className="w-8 h-8 text-veloura-burgundy mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
              <p className="text-gray-600 text-sm">
                Monday - Friday: 9 AM - 6 PM EST<br />
                Saturday: 10 AM - 4 PM EST<br />
                Sunday: Closed
              </p>
            </div>
            
            <div>
              <ShoppingBagIcon className="w-8 h-8 text-veloura-burgundy mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Order Support</h3>
              <p className="text-gray-600 text-sm">
                Need help with your order?<br />
                Check your account or<br />
                contact our support team
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
