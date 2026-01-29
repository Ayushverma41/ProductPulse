'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// For demo purposes, using static conversion rates relative to USD.
const conversionRates: { [key: string]: number } = {
  USD: 1,
  EUR: 0.92,
  JPY: 157.24,
  GBP: 0.79,
  INR: 83.54,
  CAD: 1.37,
  AUD: 1.5,
};

const currencySymbols: { [key: string]: string } = {
  USD: '$',
  EUR: '€',
  JPY: '¥',
  GBP: '£',
  INR: '₹',
  CAD: 'CA$',
  AUD: 'A$',
};

type CurrencyContextType = {
  currency: string;
  setCurrency: (currency: string) => void;
  formatPrice: (price: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState('USD');

  const formatPrice = (price: number) => {
    const rate = conversionRates[currency] || 1;
    const symbol = currencySymbols[currency] || '$';
    const convertedPrice = price * rate;

    if (currency === 'JPY') {
      return `${symbol}${convertedPrice.toFixed(0)}`;
    }
    return `${symbol}${convertedPrice.toFixed(2)}`;
  };

  const value = {
    currency,
    setCurrency,
    formatPrice,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
