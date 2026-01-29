'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PackagePlus, ShoppingCart } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

const AppSidebar = () => {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <ShoppingCart className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-headline font-bold text-primary">
            ProductPulse
          </h1>
        </Link>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/">
              <SidebarMenuButton isActive={pathname === '/'}>
                <Home />
                <span>Recommendations</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/manage">
              <SidebarMenuButton isActive={pathname.startsWith('/manage')}>
                <PackagePlus />
                <span>Manage Products</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
