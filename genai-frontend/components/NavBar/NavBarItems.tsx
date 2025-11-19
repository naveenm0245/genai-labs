"use client";

import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const NavBarItems = () => {
    const pathname = usePathname();

    const navLinks = [
      { href: "/", label: "Home" },
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
    ];
  return (
    <div>
      {/* Navigation Links */}
      <div className="flex items-center gap-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                isActive
                  ? "bg-emerald-100/80 dark:bg-emerald-200/30 text-emerald-600 dark:text-emerald-500 font-semibold"
                  : "text-gray-700 dark:text-gray-700 hover:text-emerald-500 dark:hover:text-emerald-400"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default NavBarItems
