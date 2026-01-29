'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  DollarSign,
  Euro,
  IndianRupee,
  JapaneseYen,
  PoundSterling,
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

const currencyOptions: {
  [key: string]: { label: string; icon: React.ElementType };
} = {
  USD: { label: 'USD', icon: DollarSign },
  EUR: { label: 'EUR', icon: Euro },
  JPY: { label: 'JPY', icon: JapaneseYen },
  GBP: { label: 'GBP', icon: PoundSterling },
  INR: { label: 'INR', icon: IndianRupee },
  CAD: { label: 'CAD', icon: DollarSign },
  AUD: { label: 'AUD', icon: DollarSign },
};

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const CurrencyIcon = currencyOptions[currency]?.icon || DollarSign;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-[90px] justify-start">
          <CurrencyIcon className="h-4 w-4" />
          <span className="ml-2">{currency}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(currencyOptions).map(([key, value]) => (
          <DropdownMenuItem key={key} onSelect={() => setCurrency(key)}>
            {value.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
