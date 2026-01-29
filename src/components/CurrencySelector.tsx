'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DollarSign } from 'lucide-react';

export function CurrencySelector() {
  const [currency, setCurrency] = React.useState('USD');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-[90px] justify-start">
          <DollarSign className="h-4 w-4" />
          <span className="ml-2">{currency}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => setCurrency('USD')}>
          USD
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setCurrency('EUR')}>
          EUR
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setCurrency('JPY')}>
          JPY
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setCurrency('GBP')}>
          GBP
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
