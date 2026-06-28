import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 mb-12 text-center md:text-left">
        <div>
          <h3 className="font-serif text-2xl text-primary mb-4">Sundus Flowers</h3>
          <p className="text-muted-foreground text-sm">
            Flowers Made With Love. Beautiful handmade bouquets for every special occasion.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">Shop</Link></li>
            <li><Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors">Categories</Link></li>
            <li><Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Sundus Flowers. All rights reserved.
      </div>
    </footer>
  );
}
