import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products, categories, getBestSellers } from "@/lib/data";
import { Truck, ShieldCheck, Heart, Flower2 } from "lucide-react";

const categoryImages: Record<string, string> = {
  roses: "/images/products/red_roses.png",
  bouquets: "/images/products/blush_pink.png",
  "wedding-flowers": "/images/products/luxury_wedding_bouquet.png",
  "birthday-flowers": "/images/products/birthday_colorful.png",
};

const categoryCount: Record<string, number> = {};
products.forEach((p) => {
  const slug = p.category.toLowerCase().replace(/\s+/g, "-");
  categoryCount[slug] = (categoryCount[slug] || 0) + 1;
});

export default function Home() {
  const featuredProduct = products[0];
  const bestSellers = getBestSellers();
  const newArrivals = products.filter((p) => p.isNew);

  return (
    <main className="flex-1 flex flex-col">
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/60 via-background to-secondary/30 border-b border-border">
        {/* decorative blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-8 md:px-16 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full">
              🌸 Handcrafted with Love
            </span>

            <h1
              className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Flowers{" "}
              <span className="text-primary italic">Made&nbsp;With&nbsp;Love</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Beautiful handmade bouquets for every special occasion. From
              weddings to birthdays — we craft moments that bloom.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/shop"
                className="bg-primary hover:bg-primary-hover text-white px-10 py-4 rounded-full font-semibold transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Shop Now
              </Link>
              <Link
                href="/categories"
                className="bg-white hover:bg-secondary border border-border text-foreground px-10 py-4 rounded-full font-semibold transition-all shadow-sm hover:shadow-md"
              >
                Explore Collections
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="absolute w-80 h-80 md:w-[500px] md:h-[500px] bg-primary/10 rounded-full blur-3xl opacity-60" />
            <div className="relative z-10 w-full max-w-lg aspect-square">
              {featuredProduct?.image && (
                <Image
                  src={featuredProduct.image}
                  alt="Beautiful Bouquet"
                  fill
                  className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRUST BAR ═══════════════════ */}
      <section className="border-b border-border bg-white">
        <div className="container mx-auto px-8 md:px-16 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            {[
              { icon: Flower2, title: "Fresh Flowers", sub: "Handpicked Daily" },
              { icon: Truck, title: "Fast Delivery", sub: "On Time, Every Time" },
              {
                icon: ShieldCheck,
                title: "Secure Payments",
                sub: "100% Safe & Secure",
              },
              {
                icon: Heart,
                title: "Happy Customers",
                sub: "Loved by Thousands",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-center gap-3"
              >
                <div className="p-3 bg-secondary rounded-full text-primary">
                  <f.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{f.title}</h4>
                  <p className="text-xs text-muted-foreground">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CATEGORIES ═══════════════════ */}
      <section className="container mx-auto px-8 md:px-16 py-20">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold text-foreground mb-3"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Shop by Category
          </h2>
          <p className="text-muted-foreground">
            Find the perfect flowers for every occasion
          </p>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group block"
            >
              <div className="relative bg-white rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={categoryImages[cat.slug] || "/images/products/blush_pink.png"}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {cat.name}
                  </h3>
                  <p className="text-sm text-white/80">
                    {categoryCount[cat.slug] || 0} Products
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════ BEST SELLERS ═══════════════════ */}
      <section className="bg-white border-y border-border py-20">
        <div className="container mx-auto px-8 md:px-16">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2
                className="text-4xl font-bold text-foreground mb-3"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Best Sellers
              </h2>
              <p className="text-muted-foreground">
                Our most loved arrangements
              </p>
              <div className="w-16 h-1 bg-primary rounded-full mt-4" />
            </div>
            <Link
              href="/shop"
              className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors hidden md:block"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ NEW ARRIVALS ═══════════════════ */}
      {newArrivals.length > 0 && (
        <section className="container mx-auto px-8 md:px-16 py-20">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-3">
                ✨ NEW
              </span>
              <h2
                className="text-4xl font-bold text-foreground mb-3"
                style={{ fontFamily: "Georgia, serif" }}
              >
                New Arrivals
              </h2>
              <p className="text-muted-foreground">
                Fresh additions to our collection
              </p>
              <div className="w-16 h-1 bg-primary rounded-full mt-4" />
            </div>
            <Link
              href="/shop"
              className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors hidden md:block"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}



      {/* ═══════════════════ CONTACT ═══════════════════ */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-8 md:px-16">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold text-foreground mb-3"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Get in Touch
            </h2>
            <p className="text-muted-foreground">
              We&apos;d love to hear from you
            </p>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary shrink-0 text-xl">
                📞
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Phone Number</h3>
                <p className="text-muted-foreground">0561335241</p>
              </div>
            </div>

            <form className="bg-white p-8 rounded-2xl border border-border shadow-sm space-y-4">
              <h3
                className="font-bold text-xl text-foreground mb-4"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Send a Message
              </h3>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none transition"
              />
              <button
                type="button"
                className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold transition-colors shadow-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
