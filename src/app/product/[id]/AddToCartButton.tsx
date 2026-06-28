"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-between border border-border rounded-full p-2 w-32 bg-white shadow-sm">
        <button 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-foreground font-medium">{quantity}</span>
        <button 
          onClick={() => setQuantity(quantity + 1)}
          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      <button 
        onClick={handleAdd}
        className="flex-1 bg-primary hover:bg-primary-hover text-white py-4 rounded-full font-bold transition-colors shadow-md shadow-primary/20 flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-5 h-5" /> Add to Cart
      </button>
    </div>
  );
}
