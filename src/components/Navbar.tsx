"use client";

import Link from 'next/link';
import { Search, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur shadow-sm">
      <div className="container mx-auto px-8 md:px-16 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center">
          <span className="font-serif text-3xl text-primary tracking-tight">
            Sundus Flowers
          </span>
        </Link>



        {/* Icons */}
        <div className="flex items-center space-x-5">
          <button className="text-foreground hover:text-primary transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button className="text-foreground hover:text-primary transition-colors">
            <Heart className="h-5 w-5" />
          </button>
          <Link href="/cart" className="text-foreground hover:text-primary transition-colors relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
