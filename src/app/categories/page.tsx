import Image from "next/image";
import Link from "next/link";
import { categories, products } from "@/lib/data";

const categoryImages: Record<string, string> = {
  roses: "/images/products/red_roses.png",
  bouquets: "/images/products/blush_pink.png",
  "wedding-flowers": "/images/products/luxury_wedding_bouquet.png",
  "birthday-flowers": "/images/products/birthday_colorful.png",
};

const categoryDescriptions: Record<string, string> = {
  roses: "Express your deepest emotions with our premium hand-picked roses.",
  bouquets:
    "Stunning mixed bouquets handcrafted for every special occasion.",
  "wedding-flowers":
    "Make your dream wedding unforgettable with our bridal arrangements.",
  "birthday-flowers":
    "Celebrate another year with vibrant and cheerful birthday blooms.",
};

export default function CategoriesPage() {
  return (
    <div className="flex-1 container mx-auto px-4 py-8 mb-16">
      <div className="text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>{" "}
        / <span className="text-foreground">Categories</span>
      </div>

      <div className="text-center mb-16">
        <h1
          className="text-5xl font-bold text-foreground mb-3"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Our Collections
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Explore our beautiful flower collections, each designed with love.
        </p>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {categories.map((cat) => {
          const count = products.filter(
            (p) =>
              p.category.toLowerCase().replace(/\s+/g, "-") === cat.slug
          ).length;
          return (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group block"
            >
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300">
                <Image
                  src={categoryImages[cat.slug] || "/images/products/blush_pink.png"}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h2
                    className="text-3xl font-bold mb-2"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {cat.name}
                  </h2>
                  <p className="text-sm text-white/80 mb-3">
                    {categoryDescriptions[cat.slug]}
                  </p>
                  <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold">
                    {count} Products →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
