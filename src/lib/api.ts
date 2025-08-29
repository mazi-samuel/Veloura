// API Configuration and utilities
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  collection: string;
  shades: Shade[];
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  features: string[];
  ingredients: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface Shade {
  id: string;
  name: string;
  color: string;
  image: string;
  inStock: boolean;
  stockQuantity: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  loyaltyPoints: number;
  loyaltyTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  addresses: Address[];
  preferences: UserPreferences;
  createdAt: string;
  lastLogin: string;
}

export interface Address {
  id: string;
  type: 'shipping' | 'billing';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface UserPreferences {
  emailMarketing: boolean;
  smsMarketing: boolean;
  personalizedRecommendations: boolean;
  currency: string;
  language: string;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  shadeId?: string;
  quantity: number;
  price: number;
  product: Product;
  shade?: Shade;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
  images?: string[];
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    avatar?: string;
    isVerified: boolean;
  };
}

// API Client Class
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Products API
  async getProducts(params?: {
    category?: string;
    collection?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    page?: number;
    limit?: number;
    sort?: string;
  }): Promise<ApiResponse<{ products: Product[]; total: number; page: number; totalPages: number }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    return this.request(`/products?${queryParams}`);
  }

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    return this.request(`/products/${id}`);
  }

  async getRelatedProducts(productId: string, limit: number = 4): Promise<ApiResponse<Product[]>> {
    return this.request(`/products/${productId}/related?limit=${limit}`);
  }

  // User Authentication API
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.request('/auth/logout', { method: 'POST' });
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return this.request('/auth/profile');
  }

  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Orders API
  async createOrder(orderData: {
    items: { productId: string; shadeId?: string; quantity: number }[];
    shippingAddress: Address;
    billingAddress: Address;
    paymentMethodId: string;
  }): Promise<ApiResponse<Order>> {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrders(page: number = 1, limit: number = 10): Promise<ApiResponse<{ orders: Order[]; total: number }>> {
    return this.request(`/orders?page=${page}&limit=${limit}`);
  }

  async getOrder(id: string): Promise<ApiResponse<Order>> {
    return this.request(`/orders/${id}`);
  }

  // Reviews API
  async getProductReviews(productId: string, page: number = 1): Promise<ApiResponse<{ reviews: Review[]; total: number }>> {
    return this.request(`/products/${productId}/reviews?page=${page}`);
  }

  async createReview(productId: string, reviewData: {
    rating: number;
    title: string;
    content: string;
    images?: string[];
  }): Promise<ApiResponse<Review>> {
    return this.request(`/products/${productId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  // Wishlist API
  async getWishlist(): Promise<ApiResponse<Product[]>> {
    return this.request('/wishlist');
  }

  async addToWishlist(productId: string): Promise<ApiResponse<void>> {
    return this.request('/wishlist', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
  }

  async removeFromWishlist(productId: string): Promise<ApiResponse<void>> {
    return this.request(`/wishlist/${productId}`, { method: 'DELETE' });
  }

  // Newsletter API
  async subscribeNewsletter(email: string, preferences?: {
    productUpdates: boolean;
    exclusiveOffers: boolean;
    beautyTips: boolean;
  }): Promise<ApiResponse<void>> {
    return this.request('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email, preferences }),
    });
  }

  // Analytics API
  async trackEvent(event: string, properties?: Record<string, any>): Promise<void> {
    try {
      await this.request('/analytics/track', {
        method: 'POST',
        body: JSON.stringify({ event, properties, timestamp: new Date().toISOString() }),
      });
    } catch (error) {
      // Don't throw on analytics errors
      console.warn('Analytics tracking failed:', error);
    }
  }
}

export const apiClient = new ApiClient();

// Convenience functions
export const api = {
  products: {
    getAll: (params?: Parameters<typeof apiClient.getProducts>[0]) => apiClient.getProducts(params),
    getById: (id: string) => apiClient.getProduct(id),
    getRelated: (productId: string, limit?: number) => apiClient.getRelatedProducts(productId, limit),
  },
  auth: {
    login: (email: string, password: string) => apiClient.login(email, password),
    register: (userData: Parameters<typeof apiClient.register>[0]) => apiClient.register(userData),
    logout: () => apiClient.logout(),
    getProfile: () => apiClient.getProfile(),
    updateProfile: (userData: Partial<User>) => apiClient.updateProfile(userData),
  },
  orders: {
    create: (orderData: Parameters<typeof apiClient.createOrder>[0]) => apiClient.createOrder(orderData),
    getAll: (page?: number, limit?: number) => apiClient.getOrders(page, limit),
    getById: (id: string) => apiClient.getOrder(id),
  },
  reviews: {
    getForProduct: (productId: string, page?: number) => apiClient.getProductReviews(productId, page),
    create: (productId: string, reviewData: Parameters<typeof apiClient.createReview>[1]) => 
      apiClient.createReview(productId, reviewData),
  },
  wishlist: {
    get: () => apiClient.getWishlist(),
    add: (productId: string) => apiClient.addToWishlist(productId),
    remove: (productId: string) => apiClient.removeFromWishlist(productId),
  },
  newsletter: {
    subscribe: (email: string, preferences?: Parameters<typeof apiClient.subscribeNewsletter>[1]) => 
      apiClient.subscribeNewsletter(email, preferences),
  },
  analytics: {
    track: (event: string, properties?: Record<string, any>) => apiClient.trackEvent(event, properties),
  },
};

export default api;
