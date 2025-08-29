// Multi-Currency Support System
import React from 'react';
import { analytics } from './analytics';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  decimals: number;
  position: 'before' | 'after';
  enabled: boolean;
  defaultForCountries: string[];
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  timestamp: string;
  source: string;
}

export interface CurrencyConversion {
  originalAmount: number;
  originalCurrency: string;
  convertedAmount: number;
  convertedCurrency: string;
  exchangeRate: number;
  timestamp: string;
}

export interface CountryInfo {
  code: string;
  name: string;
  defaultCurrency: string;
  timezone: string;
  continent: string;
}

class CurrencyService {
  private baseCurrency = 'USD';
  private exchangeRates: Map<string, ExchangeRate> = new Map();
  private lastUpdate: Date | null = null;
  private updateInterval = 60 * 60 * 1000; // 1 hour

  private supportedCurrencies: Currency[] = [
    {
      code: 'USD',
      name: 'US Dollar',
      symbol: '$',
      decimals: 2,
      position: 'before',
      enabled: true,
      defaultForCountries: ['US', 'EC', 'SV', 'ZW'],
    },
    {
      code: 'EUR',
      name: 'Euro',
      symbol: '€',
      decimals: 2,
      position: 'before',
      enabled: true,
      defaultForCountries: ['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'PT', 'IE', 'GR', 'FI'],
    },
    {
      code: 'GBP',
      name: 'British Pound',
      symbol: '£',
      decimals: 2,
      position: 'before',
      enabled: true,
      defaultForCountries: ['GB'],
    },
    {
      code: 'CAD',
      name: 'Canadian Dollar',
      symbol: 'C$',
      decimals: 2,
      position: 'before',
      enabled: true,
      defaultForCountries: ['CA'],
    },
    {
      code: 'AUD',
      name: 'Australian Dollar',
      symbol: 'A$',
      decimals: 2,
      position: 'before',
      enabled: true,
      defaultForCountries: ['AU'],
    },
    {
      code: 'JPY',
      name: 'Japanese Yen',
      symbol: '¥',
      decimals: 0,
      position: 'before',
      enabled: true,
      defaultForCountries: ['JP'],
    },
    {
      code: 'CHF',
      name: 'Swiss Franc',
      symbol: 'CHF',
      decimals: 2,
      position: 'after',
      enabled: true,
      defaultForCountries: ['CH'],
    },
    {
      code: 'SEK',
      name: 'Swedish Krona',
      symbol: 'kr',
      decimals: 2,
      position: 'after',
      enabled: true,
      defaultForCountries: ['SE'],
    },
    {
      code: 'NOK',
      name: 'Norwegian Krone',
      symbol: 'kr',
      decimals: 2,
      position: 'after',
      enabled: true,
      defaultForCountries: ['NO'],
    },
    {
      code: 'DKK',
      name: 'Danish Krone',
      symbol: 'kr',
      decimals: 2,
      position: 'after',
      enabled: true,
      defaultForCountries: ['DK'],
    },
    {
      code: 'SGD',
      name: 'Singapore Dollar',
      symbol: 'S$',
      decimals: 2,
      position: 'before',
      enabled: true,
      defaultForCountries: ['SG'],
    },
    {
      code: 'HKD',
      name: 'Hong Kong Dollar',
      symbol: 'HK$',
      decimals: 2,
      position: 'before',
      enabled: true,
      defaultForCountries: ['HK'],
    },
    {
      code: 'NZD',
      name: 'New Zealand Dollar',
      symbol: 'NZ$',
      decimals: 2,
      position: 'before',
      enabled: true,
      defaultForCountries: ['NZ'],
    },
  ];

  // Initialize currency service
  async initialize() {
    try {
      await this.updateExchangeRates();
      this.startPeriodicUpdates();
    } catch (error) {
      console.error('Failed to initialize currency service:', error);
    }
  }

  // Get supported currencies
  getSupportedCurrencies(): Currency[] {
    return this.supportedCurrencies.filter(currency => currency.enabled);
  }

  // Get currency info
  getCurrency(code: string): Currency | null {
    return this.supportedCurrencies.find(currency => currency.code === code) || null;
  }

  // Detect user's currency based on location
  async detectUserCurrency(): Promise<string> {
    try {
      // Try to get user's location
      const response = await fetch('/api/geo/location');
      if (response.ok) {
        const location = await response.json();
        const currency = this.getCurrencyForCountry(location.country);
        if (currency) {
          return currency;
        }
      }
    } catch (error) {
      console.log('Could not detect user location for currency');
    }

    // Fallback: try to detect from browser locale
    try {
      const locale = navigator.language || 'en-US';
      const parts = locale.split('-');
      if (parts.length > 1) {
        const countryCode = parts[1].toUpperCase();
        const currency = this.getCurrencyForCountry(countryCode);
        if (currency) {
          return currency;
        }
      }
    } catch (error) {
      console.log('Could not detect currency from locale');
    }

    // Default to USD
    return 'USD';
  }

  // Get currency for country
  getCurrencyForCountry(countryCode: string): string | null {
    const currency = this.supportedCurrencies.find(currency =>
      currency.defaultForCountries.includes(countryCode)
    );
    return currency?.code || null;
  }

  // Update exchange rates
  async updateExchangeRates(): Promise<void> {
    try {
      const response = await fetch('/api/currency/rates');
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }

      const data = await response.json();
      
      // Update rates
      Object.entries(data.rates).forEach(([currency, rate]) => {
        this.exchangeRates.set(`${this.baseCurrency}-${currency}`, {
          from: this.baseCurrency,
          to: currency,
          rate: rate as number,
          timestamp: data.timestamp,
          source: data.source,
        });
      });

      this.lastUpdate = new Date();
      
      console.log(`Updated ${this.exchangeRates.size} exchange rates`);
    } catch (error) {
      console.error('Error updating exchange rates:', error);
      
      // Use fallback rates if API fails
      this.useFallbackRates();
    }
  }

  // Use fallback exchange rates
  private useFallbackRates(): void {
    const fallbackRates = {
      'USD-EUR': 0.85,
      'USD-GBP': 0.73,
      'USD-CAD': 1.25,
      'USD-AUD': 1.35,
      'USD-JPY': 110,
      'USD-CHF': 0.92,
      'USD-SEK': 8.5,
      'USD-NOK': 8.8,
      'USD-DKK': 6.3,
      'USD-SGD': 1.35,
      'USD-HKD': 7.8,
      'USD-NZD': 1.4,
    };

    Object.entries(fallbackRates).forEach(([pair, rate]) => {
      const [from, to] = pair.split('-');
      this.exchangeRates.set(pair, {
        from,
        to,
        rate,
        timestamp: new Date().toISOString(),
        source: 'fallback',
      });
    });

    console.log('Using fallback exchange rates');
  }

  // Start periodic updates
  private startPeriodicUpdates(): void {
    setInterval(async () => {
      await this.updateExchangeRates();
    }, this.updateInterval);
  }

  // Convert amount between currencies
  convert(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): CurrencyConversion | null {
    if (fromCurrency === toCurrency) {
      return {
        originalAmount: amount,
        originalCurrency: fromCurrency,
        convertedAmount: amount,
        convertedCurrency: toCurrency,
        exchangeRate: 1,
        timestamp: new Date().toISOString(),
      };
    }

    let exchangeRate: number;
    let rateKey: string;

    if (fromCurrency === this.baseCurrency) {
      // Converting from base currency
      rateKey = `${fromCurrency}-${toCurrency}`;
      const rate = this.exchangeRates.get(rateKey);
      if (!rate) return null;
      exchangeRate = rate.rate;
    } else if (toCurrency === this.baseCurrency) {
      // Converting to base currency
      rateKey = `${this.baseCurrency}-${fromCurrency}`;
      const rate = this.exchangeRates.get(rateKey);
      if (!rate) return null;
      exchangeRate = 1 / rate.rate;
    } else {
      // Converting between non-base currencies
      const fromRate = this.exchangeRates.get(`${this.baseCurrency}-${fromCurrency}`);
      const toRate = this.exchangeRates.get(`${this.baseCurrency}-${toCurrency}`);
      
      if (!fromRate || !toRate) return null;
      
      exchangeRate = toRate.rate / fromRate.rate;
    }

    const convertedAmount = amount * exchangeRate;

    return {
      originalAmount: amount,
      originalCurrency: fromCurrency,
      convertedAmount,
      convertedCurrency: toCurrency,
      exchangeRate,
      timestamp: new Date().toISOString(),
    };
  }

  // Format currency display
  formatCurrency(
    amount: number,
    currencyCode: string,
    locale?: string
  ): string {
    const currency = this.getCurrency(currencyCode);
    if (!currency) {
      return amount.toString();
    }

    try {
      const formatter = new Intl.NumberFormat(locale || 'en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: currency.decimals,
        maximumFractionDigits: currency.decimals,
      });

      return formatter.format(amount);
    } catch (error) {
      // Fallback formatting
      const formattedAmount = amount.toFixed(currency.decimals);
      
      if (currency.position === 'before') {
        return `${currency.symbol}${formattedAmount}`;
      } else {
        return `${formattedAmount} ${currency.symbol}`;
      }
    }
  }

  // Get exchange rate between currencies
  getExchangeRate(fromCurrency: string, toCurrency: string): number | null {
    const conversion = this.convert(1, fromCurrency, toCurrency);
    return conversion?.exchangeRate || null;
  }

  // Check if rates are fresh
  areRatesFresh(): boolean {
    if (!this.lastUpdate) return false;
    
    const now = new Date();
    const timeDiff = now.getTime() - this.lastUpdate.getTime();
    
    return timeDiff < this.updateInterval;
  }

  // Get last update time
  getLastUpdateTime(): Date | null {
    return this.lastUpdate;
  }

  // Set user's preferred currency
  setUserCurrency(currencyCode: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred_currency', currencyCode);
      
      // Track currency change
      analytics.trackEvent({
        action: 'currency_changed',
        category: 'preference',
        label: currencyCode,
      });
    }
  }

  // Get user's preferred currency
  getUserCurrency(): string {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('preferred_currency') || 'USD';
    }
    return 'USD';
  }

  // Convert product prices for display
  convertProductPrices(
    products: Array<{ price: number; compareAtPrice?: number }>,
    fromCurrency: string,
    toCurrency: string
  ): Array<{ price: number; compareAtPrice?: number }> {
    return products.map(product => {
      const priceConversion = this.convert(product.price, fromCurrency, toCurrency);
      const compareAtConversion = product.compareAtPrice
        ? this.convert(product.compareAtPrice, fromCurrency, toCurrency)
        : null;

      return {
        price: priceConversion?.convertedAmount || product.price,
        compareAtPrice: compareAtConversion?.convertedAmount || product.compareAtPrice,
      };
    });
  }

  // Get currency selector options
  getCurrencyOptions(): Array<{ value: string; label: string; symbol: string }> {
    return this.getSupportedCurrencies().map(currency => ({
      value: currency.code,
      label: `${currency.code} - ${currency.name}`,
      symbol: currency.symbol,
    }));
  }

  // Validate currency code
  isValidCurrency(currencyCode: string): boolean {
    return this.supportedCurrencies.some(currency => 
      currency.code === currencyCode && currency.enabled
    );
  }

  // Get price range in different currencies
  getPriceRange(
    minPrice: number,
    maxPrice: number,
    fromCurrency: string,
    toCurrency: string
  ): { min: number; max: number } | null {
    const minConversion = this.convert(minPrice, fromCurrency, toCurrency);
    const maxConversion = this.convert(maxPrice, fromCurrency, toCurrency);

    if (!minConversion || !maxConversion) {
      return null;
    }

    return {
      min: minConversion.convertedAmount,
      max: maxConversion.convertedAmount,
    };
  }

  // Round currency amount to appropriate decimals
  roundCurrencyAmount(amount: number, currencyCode: string): number {
    const currency = this.getCurrency(currencyCode);
    if (!currency) return amount;

    const factor = Math.pow(10, currency.decimals);
    return Math.round(amount * factor) / factor;
  }
}

export const currencyService = new CurrencyService();

// React hook for currency
export const useCurrency = () => {
  const [currentCurrency, setCurrentCurrency] = React.useState('USD');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const initializeCurrency = async () => {
      try {
        // Initialize currency service
        await currencyService.initialize();
        
        // Get user's preferred currency
        let preferredCurrency = currencyService.getUserCurrency();
        
        // If no preference, detect from location
        if (preferredCurrency === 'USD') {
          preferredCurrency = await currencyService.detectUserCurrency();
        }
        
        setCurrentCurrency(preferredCurrency);
      } catch (error) {
        console.error('Error initializing currency:', error);
        setCurrentCurrency('USD');
      } finally {
        setIsLoading(false);
      }
    };

    initializeCurrency();
  }, []);

  const changeCurrency = (newCurrency: string) => {
    if (currencyService.isValidCurrency(newCurrency)) {
      setCurrentCurrency(newCurrency);
      currencyService.setUserCurrency(newCurrency);
    }
  };

  const formatPrice = (amount: number, currency?: string) => {
    return currencyService.formatCurrency(amount, currency || currentCurrency);
  };

  const convertPrice = (amount: number, fromCurrency: string = 'USD') => {
    const conversion = currencyService.convert(amount, fromCurrency, currentCurrency);
    return conversion?.convertedAmount || amount;
  };

  return {
    currentCurrency,
    changeCurrency,
    formatPrice,
    convertPrice,
    isLoading,
    supportedCurrencies: currencyService.getSupportedCurrencies(),
    currencyOptions: currencyService.getCurrencyOptions(),
  };
};

// Utility functions
export const formatCurrency = (amount: number, currencyCode: string) => {
  return currencyService.formatCurrency(amount, currencyCode);
};

export const convertCurrency = (amount: number, from: string, to: string) => {
  return currencyService.convert(amount, from, to);
};

export default currencyService;
