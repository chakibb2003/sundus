import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, products, formatPrice } from "@/lib/data";
import { Star, Heart, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="flex-1 container mx-auto px-4 py-8 mb-16">
      {/* breadcrumb */}
      <div className="text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>{" "}
        /{" "}
        <Link
          href={`/shop?category=${product.category
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
          className="hover:text-primary"
        >
          {product.category}
        </Link>{" "}
        / <span className="text-foreground">{product.name}</span>
      </div>

      <div className="bg-white border border-border rounded-3xl p-8 shadow-sm mb-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative bg-secondary/20 rounded-2xl overflow-hidden min-h-[400px]">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            )}
            {/* badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  NEW
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  -
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}
                  % OFF
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1
                className="text-4xl font-bold text-foreground mb-2"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-current"
                          : "fill-current opacity-30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-end gap-4">
              <span className="text-4xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through pb-1">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">
              {product.description}
            </p>

            <div className="space-y-3 pt-4">
              {[
                {
                  icon: Truck,
                  text: "Fresh Delivery — same day delivery available",
                },
                {
                  icon: ShieldCheck,
                  text: "Secure Payment — 100% secure checkout",
                },
                { icon: RefreshCw, text: "Easy Returns — 7 days return" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm text-foreground"
                >
                  <div className="p-2 bg-secondary rounded-full text-primary">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <hr className="border-border my-6" />

            <div className="space-y-4">
              <span className="text-sm font-semibold text-foreground">
                Quantity
              </span>
              <AddToCartButton product={product} />
            </div>

            <button className="w-full bg-white border border-border text-foreground hover:text-primary py-4 rounded-full font-medium hover:border-primary transition-colors flex items-center justify-center gap-2 mt-4 shadow-sm">
              <Heart className="w-5 h-5" /> Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2
            className="text-3xl font-bold text-foreground mb-8"
            style={{ fontFamily: "Georgia, serif" }}
          >
            You might also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
