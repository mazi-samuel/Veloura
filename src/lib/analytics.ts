// Analytics and Tracking Service
import { api } from './api';

// Google Analytics 4 Integration
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

export interface EcommerceEvent {
  currency: string;
  value: number;
  items: EcommerceItem[];
  transaction_id?: string;
  coupon?: string;
  shipping?: number;
  tax?: number;
}

export interface EcommerceItem {
  item_id: string;
  item_name: string;
  category: string;
  quantity: number;
  price: number;
  item_brand?: string;
  item_category2?: string;
  item_variant?: string;
}

class AnalyticsService {
  private isInitialized = false;
  private debugMode = process.env.NODE_ENV === 'development';

  // Initialize Google Analytics
  initializeGA(measurementId: string) {
    if (typeof window === 'undefined' || this.isInitialized) return;

    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });

    this.isInitialized = true;
    
    if (this.debugMode) {
      console.log('Google Analytics initialized:', measurementId);
    }
  }

  // Track page views
  trackPageView(path: string, title?: string) {
    if (typeof window === 'undefined') return;

    window.gtag?.('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title || document.title,
    });

    // Also track in our custom analytics
    this.trackCustomEvent('page_view', {
      page_path: path,
      page_title: title || document.title,
      timestamp: new Date().toISOString(),
    });

    if (this.debugMode) {
      console.log('Page view tracked:', path, title);
    }
  }

  // Track custom events
  trackEvent(event: AnalyticsEvent) {
    if (typeof window === 'undefined') return;

    window.gtag?.('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.custom_parameters,
    });

    // Track in custom analytics
    this.trackCustomEvent(event.action, {
      category: event.category,
      label: event.label,
      value: event.value,
      ...event.custom_parameters,
    });

    if (this.debugMode) {
      console.log('Event tracked:', event);
    }
  }

  // E-commerce tracking
  trackPurchase(event: EcommerceEvent) {
    if (typeof window === 'undefined') return;

    window.gtag?.('event', 'purchase', {
      transaction_id: event.transaction_id,
      value: event.value,
      currency: event.currency,
      items: event.items,
      coupon: event.coupon,
      shipping: event.shipping,
      tax: event.tax,
    });

    this.trackCustomEvent('purchase', event);

    if (this.debugMode) {
      console.log('Purchase tracked:', event);
    }
  }

  trackAddToCart(item: EcommerceItem, currency: string = 'USD') {
    const event: EcommerceEvent = {
      currency,
      value: item.price * item.quantity,
      items: [item],
    };

    window.gtag?.('event', 'add_to_cart', event);
    this.trackCustomEvent('add_to_cart', { ...event, item });

    if (this.debugMode) {
      console.log('Add to cart tracked:', event);
    }
  }

  trackRemoveFromCart(item: EcommerceItem, currency: string = 'USD') {
    const event: EcommerceEvent = {
      currency,
      value: item.price * item.quantity,
      items: [item],
    };

    window.gtag?.('event', 'remove_from_cart', event);
    this.trackCustomEvent('remove_from_cart', { ...event, item });

    if (this.debugMode) {
      console.log('Remove from cart tracked:', event);
    }
  }

  trackViewItem(item: EcommerceItem, currency: string = 'USD') {
    const event: EcommerceEvent = {
      currency,
      value: item.price,
      items: [item],
    };

    window.gtag?.('event', 'view_item', event);
    this.trackCustomEvent('view_item', { ...event, item });

    if (this.debugMode) {
      console.log('View item tracked:', event);
    }
  }

  trackBeginCheckout(items: EcommerceItem[], value: number, currency: string = 'USD') {
    const event: EcommerceEvent = {
      currency,
      value,
      items,
    };

    window.gtag?.('event', 'begin_checkout', event);
    this.trackCustomEvent('begin_checkout', event);

    if (this.debugMode) {
      console.log('Begin checkout tracked:', event);
    }
  }

  trackAddPaymentInfo(items: EcommerceItem[], value: number, currency: string = 'USD') {
    const event: EcommerceEvent = {
      currency,
      value,
      items,
    };

    window.gtag?.('event', 'add_payment_info', event);
    this.trackCustomEvent('add_payment_info', event);

    if (this.debugMode) {
      console.log('Add payment info tracked:', event);
    }
  }

  trackSearch(searchTerm: string, results: number) {
    window.gtag?.('event', 'search', {
      search_term: searchTerm,
      results,
    });

    this.trackCustomEvent('search', {
      search_term: searchTerm,
      results,
    });

    if (this.debugMode) {
      console.log('Search tracked:', searchTerm, results);
    }
  }

  trackNewsletterSignup(method: string = 'website') {
    this.trackEvent({
      action: 'newsletter_signup',
      category: 'engagement',
      label: method,
    });
  }

  trackSocialShare(platform: string, content: string) {
    this.trackEvent({
      action: 'social_share',
      category: 'engagement',
      label: platform,
      custom_parameters: { content },
    });
  }

  trackVideoPlay(videoTitle: string, duration?: number) {
    this.trackEvent({
      action: 'video_play',
      category: 'engagement',
      label: videoTitle,
      value: duration,
    });
  }

  trackFormSubmission(formName: string, success: boolean) {
    this.trackEvent({
      action: 'form_submission',
      category: 'engagement',
      label: formName,
      custom_parameters: { success },
    });
  }

  trackUserRegistration(method: string = 'email') {
    window.gtag?.('event', 'sign_up', {
      method,
    });

    this.trackCustomEvent('user_registration', { method });
  }

  trackUserLogin(method: string = 'email') {
    window.gtag?.('event', 'login', {
      method,
    });

    this.trackCustomEvent('user_login', { method });
  }

  // Custom analytics for internal tracking
  private async trackCustomEvent(event: string, properties: Record<string, any>) {
    try {
      await api.analytics.track(event, {
        ...properties,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      });
    } catch (error) {
      // Don't break the user experience if analytics fail
      if (this.debugMode) {
        console.warn('Custom analytics tracking failed:', error);
      }
    }
  }

  // Conversion tracking
  trackConversion(conversionType: string, value?: number, currency: string = 'USD') {
    window.gtag?.('event', 'conversion', {
      send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID,
      value,
      currency,
      custom_parameters: {
        conversion_type: conversionType,
      },
    });

    this.trackCustomEvent('conversion', {
      type: conversionType,
      value,
      currency,
    });
  }

  // Performance tracking
  trackPageLoadTime() {
    if (typeof window === 'undefined') return;

    window.addEventListener('load', () => {
      const loadTime = performance.now();
      
      this.trackEvent({
        action: 'page_load_time',
        category: 'performance',
        value: Math.round(loadTime),
      });
    });
  }

  // Error tracking
  trackError(error: Error, context?: string) {
    window.gtag?.('event', 'exception', {
      description: error.message,
      fatal: false,
    });

    this.trackCustomEvent('error', {
      message: error.message,
      stack: error.stack,
      context,
    });

    if (this.debugMode) {
      console.error('Error tracked:', error, context);
    }
  }

  // User properties
  setUserProperties(properties: Record<string, any>) {
    window.gtag?.('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      custom_map: properties,
    });

    this.trackCustomEvent('user_properties_set', properties);
  }

  // Enhanced e-commerce events
  trackProductListView(listName: string, items: EcommerceItem[]) {
    window.gtag?.('event', 'view_item_list', {
      item_list_name: listName,
      items,
    });

    this.trackCustomEvent('product_list_view', {
      list_name: listName,
      items,
    });
  }

  trackSelectPromotion(promotionId: string, promotionName: string) {
    window.gtag?.('event', 'select_promotion', {
      promotion_id: promotionId,
      promotion_name: promotionName,
    });

    this.trackCustomEvent('select_promotion', {
      promotion_id: promotionId,
      promotion_name: promotionName,
    });
  }
}

export const analytics = new AnalyticsService();

// Convenience functions for common tracking
export const trackProductView = (product: { id: string; name: string; category: string; price: number }) => {
  analytics.trackViewItem({
    item_id: product.id,
    item_name: product.name,
    category: product.category,
    quantity: 1,
    price: product.price,
    item_brand: 'Veloura',
  });
};

export const trackAddToCart = (product: { id: string; name: string; category: string; price: number }, quantity: number = 1) => {
  analytics.trackAddToCart({
    item_id: product.id,
    item_name: product.name,
    category: product.category,
    quantity,
    price: product.price,
    item_brand: 'Veloura',
  });
};

export const trackPurchase = (order: {
  id: string;
  total: number;
  items: Array<{
    id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
  }>;
  shipping?: number;
  tax?: number;
  coupon?: string;
}) => {
  analytics.trackPurchase({
    transaction_id: order.id,
    value: order.total,
    currency: 'USD',
    items: order.items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      category: item.category,
      quantity: item.quantity,
      price: item.price,
      item_brand: 'Veloura',
    })),
    shipping: order.shipping,
    tax: order.tax,
    coupon: order.coupon,
  });
};

export default analytics;
