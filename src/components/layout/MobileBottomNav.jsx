'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { Home, Compass, Search, Heart, User } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { wishlist, setIsSearchOpen } = useShop();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Shop', href: '/shop', icon: Compass },
    { label: 'Search', action: () => setIsSearchOpen(true), icon: Search },
    { label: 'Wishlist', href: '/wishlist', icon: Heart, badge: wishlist.length },
    { label: 'Account', href: '/account', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-borderSubtle z-40 flex items-center justify-around px-2 shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.href && pathname === item.href;

        if (item.action) {
          return (
            <button
              key={item.label}
              onClick={item.action}
              className="flex flex-col items-center justify-center gap-1 text-mutedText hover:text-primary transition-colors flex-1 py-1"
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] font-medium leading-none">{item.label}</span>
            </button>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 relative flex-1 py-1 transition-colors ${
              isActive ? 'text-primary font-bold' : 'text-mutedText hover:text-primary font-medium'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {item.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-accent text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[11px] leading-none">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
