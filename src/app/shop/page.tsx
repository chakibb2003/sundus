"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products, categories, formatPrice } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, X } from "lucide-react";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [activeCategories, setActiveCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [sortBy, setSortBy] = useState("popular");
  const [maxPrice, setMaxPrice] = useState(15000);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleCategory = (slug: string) => {
    setActiveCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setActiveCategories([]);
    setMaxPrice(15000);
    setSortBy("popular");
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // category filter
    if (activeCategories.length > 0) {
      result = result.filter((p) =>
        activeCategories.includes(
          p.category.toLowerCase().replace(/\s+/g, "-")
        )
      );
    }

    // price filter
    result = result.filter((p) => p.price <= maxPrice);

    // sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // popular – sort by reviews
        result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [activeCategories, sortBy, maxPrice]);

  const filtersActive = activeCategories.length > 0 || maxPrice < 15000;

  /* ─── filter sidebar (reused for mobile too) ─── */
  const FilterPanel = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
          Categories
        </h4>
        <ul className="space-y-3 text-sm">
          {categories.map((cat) => {
            const isActive = activeCategories.includes(cat.slug);
            const count = products.filter(
              (p) =>
                p.category.toLowerCase().replace(/\s+/g, "-") === cat.slug
            ).length;
            return (
              <li key={cat.slug}>
                <button
                  onClick={() => toggleCategory(cat.slug)}
                  className={`flex items-center justify-between w-full rounded-lg px-3 py-2 transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-xs">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Price */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
          Price Range
        </h4>
        <input
          type="range"
          className="w-full accent-primary"
          min={1000}
          max={15000}
          step={500}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>1 000 DZD</span>
          <span className="font-semibold text-foreground">
            {formatPrice(maxPrice)}
          </span>
        </div>
      </div>

      {filtersActive && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <X className="w-4 h-4" /> Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="flex-1 container mx-auto px-4 py-8 mb-16">
      {/* breadcrumb */}
      <div className="text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>{" "}
        / <span className="text-foreground">Shop</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop sidebar */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="bg-white border border-border rounded-2xl p-6 sticky top-28 shadow-sm">
            <h3
              className="font-bold text-foreground mb-6 text-lg"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Filters
            </h3>
            <FilterPanel />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* toolbar */}
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              {/* mobile filter toggle */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden flex items-center gap-2 bg-white border border-border rounded-lg px-4 py-2 text-sm shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>

              <p className="text-muted-foreground text-sm">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {filteredProducts.length}
                </span>{" "}
                products
              </p>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-border rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary shadow-sm"
            >
              <option value="popular">Sort by: Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* active filter chips */}
          {filtersActive && (
            <div className="flex flex-wrap gap-2 mb-6">
              {activeCategories.map((slug) => {
                const cat = categories.find((c) => c.slug === slug);
                return (
                  <button
                    key={slug}
                    onClick={() => toggleCategory(slug)}
                    className="flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full"
                  >
                    {cat?.name} <X className="w-3 h-3" />
                  </button>
                );
              })}
              {maxPrice < 15000 && (
                <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                  Max: {formatPrice(maxPrice)}
                </span>
              )}
            </div>
          )}

          {/* mobile filters panel */}
          {showMobileFilters && (
            <div className="md:hidden bg-white border border-border rounded-2xl p-6 mb-6 shadow-sm">
              <FilterPanel />
            </div>
          )}

          {/* product grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-4">
                No flowers match your filters
              </p>
              <button
                onClick={clearFilters}
                className="text-primary hover:underline font-semibold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
