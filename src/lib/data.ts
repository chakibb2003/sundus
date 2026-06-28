export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  description: string;
  isNew?: boolean;
  isBestSeller?: boolean;
};

export const categories = [
  { name: "Roses", slug: "roses" },
  { name: "Bouquets", slug: "bouquets" },
  { name: "Wedding Flowers", slug: "wedding-flowers" },
  { name: "Birthday Flowers", slug: "birthday-flowers" },
];

export const products: Product[] = [
  // --- Bouquets ---
  {
    id: "1",
    name: "Pink Dream Bouquet",
    price: 4500,
    originalPrice: 5500,
    rating: 4.8,
    reviews: 120,
    image: "/images/products/blush_pink.png",
    category: "Bouquets",
    description:
      "A beautiful mix of pink roses, baby's breath and greenery. Perfect for any occasion — birthdays, anniversaries, or just because.",
    isNew: true,
    isBestSeller: true,
  },
  {
    id: "4",
    name: "Lavender Bliss",
    price: 5200,
    originalPrice: 6000,
    rating: 4.5,
    reviews: 340,
    image: "/images/products/purple_roses.png",
    category: "Bouquets",
    description:
      "A magical arrangement of purple roses and fresh lavender. Smells as beautiful as it looks.",
  },
  {
    id: "6",
    name: "Sweet Love Flowers",
    price: 7000,
    rating: 4.9,
    reviews: 110,
    image: "/images/products/mixed_pastel.png",
    category: "Bouquets",
    description:
      "A gorgeous pastel mix of fresh seasonal blooms, perfect for birthdays and special moments.",
    isBestSeller: true,
  },
  {
    id: "7",
    name: "Spring Garden Mix",
    price: 5800,
    rating: 4.8,
    reviews: 95,
    image: "/images/products/spring_garden_mix.png",
    category: "Bouquets",
    description:
      "Vibrant spring flowers mixed to perfection for a colorful gift that brightens any room.",
  },
  {
    id: "9",
    name: "Pink Tulip Embrace",
    price: 4200,
    rating: 4.7,
    reviews: 78,
    image: "/images/products/pink_tulips.png",
    category: "Bouquets",
    description:
      "Soft pink tulips wrapped in delicate paper, a timeless symbol of grace and care.",
    isNew: true,
  },

  // --- Roses ---
  {
    id: "2",
    name: "Red Romance Roses",
    price: 6500,
    originalPrice: 8000,
    rating: 4.9,
    reviews: 350,
    image: "/images/products/red_roses.png",
    category: "Roses",
    description:
      "The ultimate symbol of love. Hand-picked premium red roses beautifully wrapped in elegant paper.",
    isBestSeller: true,
  },
  {
    id: "10",
    name: "Blush Rose Garden",
    price: 5500,
    rating: 4.6,
    reviews: 198,
    image: "/images/products/blush_pink.png",
    category: "Roses",
    description:
      "Delicate blush pink roses arranged with baby's breath for a romantic, soft aesthetic.",
  },
  {
    id: "11",
    name: "Royal Purple Roses",
    price: 6800,
    originalPrice: 7500,
    rating: 4.8,
    reviews: 142,
    image: "/images/products/purple_roses.png",
    category: "Roses",
    description:
      "Rare and stunning purple roses that convey elegance and enchantment. A truly unique gift.",
    isNew: true,
  },

  // --- Wedding Flowers ---
  {
    id: "3",
    name: "White Elegance",
    price: 4800,
    rating: 4.6,
    reviews: 210,
    image: "/images/products/white_lilies.png",
    category: "Wedding Flowers",
    description:
      "Elegant white lilies and soft roses in a serene and calming arrangement, perfect for ceremonies.",
  },
  {
    id: "8",
    name: "Luxury Wedding Bouquet",
    price: 12000,
    originalPrice: 15000,
    rating: 5.0,
    reviews: 42,
    image: "/images/products/luxury_wedding_bouquet.png",
    category: "Wedding Flowers",
    description:
      "The most luxurious white peonies and roses arranged for the perfect wedding day.",
    isBestSeller: true,
  },
  {
    id: "12",
    name: "Bridal White Roses",
    price: 8500,
    rating: 4.9,
    reviews: 67,
    image: "/images/products/wedding_white_roses.png",
    category: "Wedding Flowers",
    description:
      "Classic bridal bouquet featuring pristine white roses and eucalyptus greenery tied with satin ribbon.",
    isNew: true,
  },

  // --- Birthday Flowers ---
  {
    id: "5",
    name: "Sunshine Bouquet",
    price: 3500,
    rating: 4.7,
    reviews: 85,
    image: "/images/products/sunflowers.png",
    category: "Birthday Flowers",
    description:
      "Bright and cheerful sunflowers to bring a smile to anyone's face. Freshly picked and arranged.",
  },
  {
    id: "13",
    name: "Birthday Celebration",
    price: 4000,
    rating: 4.8,
    reviews: 156,
    image: "/images/products/birthday_colorful.png",
    category: "Birthday Flowers",
    description:
      "Colorful gerbera daisies and carnations arranged to bring maximum joy on any birthday!",
    isBestSeller: true,
  },
  {
    id: "14",
    name: "Pastel Birthday Surprise",
    price: 5500,
    originalPrice: 6500,
    rating: 4.6,
    reviews: 89,
    image: "/images/products/mixed_pastel.png",
    category: "Birthday Flowers",
    description:
      "A gorgeous mix of pastel-colored blooms, perfect for making someone's birthday unforgettable.",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(
    (p) => p.category.toLowerCase().replace(/\s+/g, "-") === category
  );
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller);
}

export const formatPrice = (price: number) => {
  return (
    new Intl.NumberFormat("fr-DZ", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price) + " DZD"
  );
};
