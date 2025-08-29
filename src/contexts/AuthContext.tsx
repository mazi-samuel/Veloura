'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  isVelouraMember: boolean
  membershipTier: 'bronze' | 'silver' | 'gold' | 'platinum'
  points: number
  wishlist: string[]
  addresses: Address[]
}

interface Address {
  id: string
  type: 'shipping' | 'billing'
  firstName: string
  lastName: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<{
  state: AuthState
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  addToWishlist: (productId: string) => void
  removeFromWishlist: (productId: string) => void
} | undefined>(undefined)

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  acceptsMarketing: boolean
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('veloura-token')
        const userData = localStorage.getItem('veloura-user')
        
        if (token && userData) {
          const user = JSON.parse(userData)
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
          })
        } else {
          setState(prev => ({ ...prev, isLoading: false }))
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setState(prev => ({ ...prev, isLoading: false }))
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // For now, simulate successful login with mock data
      // In production, this would make an actual API call
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful login for any valid email/password
      if (email && password.length >= 6) {
        const mockUser: User = {
          id: `user_${Date.now()}`,
          email,
          firstName: 'Welcome',
          lastName: 'User',
          isVelouraMember: true,
          membershipTier: 'bronze',
          points: 150,
          wishlist: [],
          addresses: []
        }
        
        const mockToken = `token_${Date.now()}`
        
        localStorage.setItem('veloura-token', mockToken)
        localStorage.setItem('veloura-user', JSON.stringify(mockUser))
        
        setState({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
        })
        
        return true
      }
      return false
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const register = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    try {
      // For now, simulate successful registration with mock data
      // In production, this would make an actual API call
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create mock user
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        firstName,
        lastName,
        isVelouraMember: true,
        membershipTier: 'bronze',
        points: 0,
        wishlist: [],
        addresses: []
      }
      
      const mockToken = `token_${Date.now()}`
      
      localStorage.setItem('veloura-token', mockToken)
      localStorage.setItem('veloura-user', JSON.stringify(mockUser))
      
      setState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      })
      
      return true
    } catch (error) {
      console.error('Registration failed:', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('veloura-token')
    localStorage.removeItem('veloura-user')
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  const updateUser = (userData: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...userData }
      localStorage.setItem('veloura-user', JSON.stringify(updatedUser))
      setState(prev => ({
        ...prev,
        user: updatedUser,
      }))
    }
  }

  const addToWishlist = (productId: string) => {
    if (state.user && !state.user.wishlist.includes(productId)) {
      const updatedWishlist = [...state.user.wishlist, productId]
      updateUser({ wishlist: updatedWishlist })
    }
  }

  const removeFromWishlist = (productId: string) => {
    if (state.user) {
      const updatedWishlist = state.user.wishlist.filter(id => id !== productId)
      updateUser({ wishlist: updatedWishlist })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        register,
        logout,
        updateUser,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
