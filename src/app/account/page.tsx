'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { loyaltyService } from '@/lib/loyalty';
import { analytics } from '@/lib/analytics';
import {
  UserIcon,
  CogIcon,
  ShoppingBagIcon,
  HeartIcon,
  GiftIcon,
  CreditCardIcon,
  MapPinIcon,
  BellIcon,
  LogoutIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

interface TabProps {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  count?: number;
}

export default function AccountPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loyaltyMember, setLoyaltyMember] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // Redirect to login
      window.location.href = '/login';
      return;
    }

    // Track page view
    analytics.trackPageView('/account', 'Account Dashboard');
    
    // Load user data
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    try {
      if (user?.id) {
        // Load loyalty information
        const member = await loyaltyService.getMemberInfo(user.id);
        setLoyaltyMember(member);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs: TabProps[] = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'orders', label: 'Orders', icon: ShoppingBagIcon, count: 12 },
    { id: 'wishlist', label: 'Wishlist', icon: HeartIcon, count: 8 },
    { id: 'loyalty', label: 'Veloura Society', icon: GiftIcon },
    { id: 'addresses', label: 'Addresses', icon: MapPinIcon },
    { id: 'payment', label: 'Payment Methods', icon: CreditCardIcon },
    { id: 'preferences', label: 'Preferences', icon: CogIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
  ];

  const handleLogout = async () => {
    await logout();
    analytics.trackEvent({
      action: 'user_logout',
      category: 'authentication',
    });
  };

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-veloura-burgundy"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-veloura-burgundy to-veloura-gold rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-playfair">
                  Welcome back, {user.firstName}!
                </h1>
                <p className="text-gray-600">
                  Manage your account and track your Veloura journey
                </p>
              </div>
            </div>
            
            {/* Loyalty Status */}
            {loyaltyMember && (
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-2xl">{loyaltyService.getTierInfo(loyaltyMember.tierLevel)?.icon}</span>
                  <span className="font-semibold text-gray-900">
                    {loyaltyService.getTierInfo(loyaltyMember.tierLevel)?.name}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {loyaltyMember.points.toLocaleString()} points
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-veloura-burgundy text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </div>
                      {tab.count && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors mt-4 border-t pt-6"
                >
                  <LogoutIcon className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-sm"
            >
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 font-playfair mb-6">
                    Profile Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={user.firstName || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veloura-burgundy/20 focus:border-veloura-burgundy"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={user.lastName || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veloura-burgundy/20 focus:border-veloura-burgundy"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user.email || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veloura-burgundy/20 focus:border-veloura-burgundy"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={user.phone || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veloura-burgundy/20 focus:border-veloura-burgundy"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={user.dateOfBirth || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veloura-burgundy/20 focus:border-veloura-burgundy"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <button className="bg-veloura-burgundy text-white px-6 py-3 rounded-lg hover:bg-veloura-burgundy/90 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 font-playfair mb-6">
                    Order History
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Sample orders */}
                    {[1, 2, 3].map((order) => (
                      <div key={order} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Order #VEL00{order}234
                            </h3>
                            <p className="text-sm text-gray-600">
                              Placed on January {15 - order}, 2024
                            </p>
                          </div>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            Delivered
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-veloura-burgundy to-veloura-gold rounded-lg"></div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              Velvet Rouge Lip Gloss Set
                            </h4>
                            <p className="text-sm text-gray-600">
                              Crimson Kiss, Ruby Velvet
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900">
                            Total: $86.00
                          </span>
                          <div className="space-x-3">
                            <button className="text-veloura-burgundy hover:text-veloura-burgundy/80 font-medium">
                              Track Order
                            </button>
                            <button className="text-veloura-burgundy hover:text-veloura-burgundy/80 font-medium">
                              Reorder
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Loyalty Tab */}
              {activeTab === 'loyalty' && loyaltyMember && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 font-playfair mb-6">
                    Veloura Society
                  </h2>
                  
                  {/* Tier Status */}
                  <div className="bg-gradient-to-r from-veloura-burgundy to-veloura-gold rounded-xl p-6 text-white mb-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold font-playfair">
                          {loyaltyService.getTierInfo(loyaltyMember.tierLevel)?.name}
                        </h3>
                        <p className="text-white/90">
                          Member since {new Date(loyaltyMember.memberSince).getFullYear()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">
                          {loyaltyMember.points.toLocaleString()}
                        </div>
                        <div className="text-white/90">points</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Benefits */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Your Benefits</h4>
                      <div className="space-y-3">
                        {loyaltyService.getMemberBenefits(loyaltyMember.tierLevel).map((benefit) => (
                          <div key={benefit.id} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-veloura-burgundy rounded-full"></div>
                            <span className="text-gray-700">{benefit.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Points History</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Purchase - Order #VEL001234</span>
                          <span className="text-green-600 font-medium">+86 pts</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Product Review</span>
                          <span className="text-green-600 font-medium">+25 pts</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Welcome Bonus</span>
                          <span className="text-green-600 font-medium">+100 pts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 font-playfair mb-6">
                    My Wishlist
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Sample wishlist items */}
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="h-48 bg-gradient-to-br from-veloura-burgundy to-veloura-gold"></div>
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Velvet Rouge Lip Gloss
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Shade: Crimson Kiss
                          </p>
                          <p className="font-bold text-veloura-burgundy mb-4">
                            $28.00
                          </p>
                          <div className="flex space-x-2">
                            <button className="flex-1 bg-veloura-burgundy text-white py-2 rounded-lg text-sm hover:bg-veloura-burgundy/90 transition-colors">
                              Add to Cart
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                              <HeartIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other tabs would go here... */}
              {activeTab !== 'profile' && activeTab !== 'orders' && activeTab !== 'loyalty' && activeTab !== 'wishlist' && (
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 font-playfair mb-4">
                    {tabs.find(tab => tab.id === activeTab)?.label}
                  </h2>
                  <p className="text-gray-600">
                    This section is coming soon. We're working hard to bring you more features!
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
