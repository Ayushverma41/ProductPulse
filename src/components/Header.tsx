'use client';

import { CurrencySelector } from './CurrencySelector';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Header = () => {
  return (
    <header className="flex h-16 shrink-0 items-center border-b bg-background px-4 sm:px-6 lg:px-8">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="ml-auto flex items-center gap-4">
        <CurrencySelector />
      </div>
    </header>
  );
};

export default Header;
