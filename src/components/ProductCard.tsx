"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { formatPrice, Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden group hover:border-primary/40 transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-lg hover:-translate-y-1">
      <Link
        href={`/product/${product.id}`}
        className="block relative aspect-square bg-secondary/30 overflow-hidden"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-3/4 h-3/4 bg-zinc-100 rounded-xl" />
        )}

        {/* badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              NEW
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground line-clamp-1 mb-1 hover:text-primary cursor-pointer transition-colors text-lg">
            {product.name}
          </h3>
        </Link>

        {/* rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? "fill-current"
                    : "fill-current opacity-30"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews})
          </span>
        </div>

        <div className="mt-auto">
          {/* price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white py-2.5 rounded-full transition-all duration-300 text-sm font-semibold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
