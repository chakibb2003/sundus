"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/data";
import { Trash2, Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function CartCheckoutPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const deliveryFee = cartTotal > 0 ? 500 : 0; // 500 DZD shipping
  const total = cartTotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="flex-1 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 bg-secondary text-primary rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>Thank you for your order!</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Your beautiful bouquet is being prepared and will be delivered soon.
        </p>
        <Link href="/" className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-medium transition-colors shadow-sm">
          Return to Home
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex-1 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Let&apos;s find some beautiful flowers for you.</p>
        <Link href="/shop" className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-medium transition-colors shadow-sm">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 container mx-auto px-4 py-8 mb-16">
      <div className="text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">Home</Link> / <span className="text-foreground">Cart & Checkout</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Side: Cart */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: 'Georgia, serif' }}>Your Cart</h2>
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-white border border-border rounded-2xl p-4 flex gap-4 items-center shadow-sm">
                <div className="w-24 h-24 bg-secondary/30 rounded-xl flex items-center justify-center p-2 shrink-0 relative overflow-hidden">
                  {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground line-clamp-1">{item.name}</h3>
                  <div className="font-bold text-primary mt-1">{formatPrice(item.price)}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-between border border-border rounded-full p-1 w-24 bg-white">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-foreground text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-muted-foreground hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Checkout Form & Summary */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: 'Georgia, serif' }}>Checkout</h2>
          
          <form onSubmit={handlePlaceOrder} className="bg-white border border-border rounded-3xl p-8 shadow-sm">
            <div className="space-y-6 mb-8">
              <h3 className="font-semibold text-foreground border-b border-border pb-2">Contact Information</h3>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                <input required type="email" placeholder="sundus@example.com" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
              
              <h3 className="font-semibold text-foreground border-b border-border pb-2 mt-6">Delivery Information</h3>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                <input required type="text" placeholder="Sundus" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
                <input required type="text" placeholder="0561335241" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Address</label>
                <input required type="text" placeholder="123 Flower Street" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
            </div>

            <div className="bg-secondary/30 rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="text-foreground font-medium">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Fee</span>
                  <span className="text-foreground font-medium">{formatPrice(deliveryFee)}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between items-center mt-2">
                  <span className="font-bold text-foreground text-lg">Total</span>
                  <span className="font-bold text-primary text-xl">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-full font-bold text-lg transition-colors shadow-md shadow-primary/20">
              Place Order
            </button>
            <p className="text-center text-xs text-muted-foreground mt-4">Thank you for supporting Sundus Flowers! 🌸</p>
          </form>
        </div>
      </div>
    </div>
  );
}
