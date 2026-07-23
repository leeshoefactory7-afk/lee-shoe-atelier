import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { SITE } from "@/lib/site-config";
import { toast } from "sonner";
import { subscribeNewsletter } from "@/lib/forms.functions";
import { useServerFn } from "@tanstack/react-start";

const cols = [
  {
    title: "Shop",
    links: [
      { to: "/products", label: "All Products" },
      { to: "/category/men", label: "Men's" },
      { to: "/category/women", label: "Women's" },
      { to: "/category/sneakers", label: "Sneakers" },
      { to: "/category/leather", label: "Leather Shoes" },
      { to: "/category/sports", label: "Sports" },
    ],
  },
  {
    title: "Manufacturing",
    links: [
      { to: "/manufacturing", label: "Our Process" },
      { to: "/oem", label: "OEM" },
      { to: "/private-label", label: "Private Label" },
      { to: "/wholesale", label: "Wholesale" },
      { to: "/bulk-orders", label: "Bulk Orders" },
      { to: "/become-distributor", label: "Become a Distributor" },
      { to: "/request-quote", label: "Request a Quote" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/gallery", label: "Factory Gallery" },
      { to: "/factory-tour", label: "Factory Tour" },
      { to: "/sustainability", label: "Sustainability" },
      { to: "/careers", label: "Careers" },
      { to: "/blog", label: "Journal" },
    ],
  },
  {
    title: "Support",
    links: [
      { to: "/contact", label: "Contact" },
      { to: "/track-order", label: "Track Order" },
      { to: "/shipping", label: "Shipping" },
      { to: "/returns", label: "Returns" },
      { to: "/size-guide", label: "Size Guide" },
      { to: "/shoe-care", label: "Shoe Care" },
      { to: "/faq", label: "FAQ" },
    ],
  },
];

export function Footer() {
  const subscribe = useServerFn(subscribeNewsletter);
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="container-lux py-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr_2.5fr]">
          <div>
            <div className="font-serif text-3xl">Lee<span className="text-accent">.</span> Shoe Factory</div>
            <p className="text-sm text-primary-foreground/70 mt-4 max-w-sm">
              A premium global footwear manufacturer supplying retailers, brands and distributors in {SITE.stats.countriesServed}+ countries.
            </p>
            <div className="mt-6 space-y-2 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2"><Mail className="size-4 text-accent" /> {SITE.email}</div>
              <div className="flex items-center gap-2"><Phone className="size-4 text-accent" /> {SITE.whatsapp}</div>
              <div className="flex items-center gap-2"><MapPin className="size-4 text-accent" /> {SITE.address}</div>
            </div>
            <form
              className="mt-6 flex max-w-sm"
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const email = String(fd.get("email") ?? "");
                if (!email.includes("@")) return toast.error("Please enter a valid email");
                try {
                  await subscribe({ data: { email } });
                  (e.target as HTMLFormElement).reset();
                  toast.success("Subscribed. Welcome to Lee.");
                } catch { toast.error("Subscription failed"); }
              }}
            >
              <input name="email" type="email" placeholder="Your email" className="flex-1 bg-transparent border border-primary-foreground/20 px-4 py-2.5 text-sm placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent" />
              <button className="bg-accent text-accent-foreground px-4 text-sm font-medium hover:bg-accent/90">Subscribe</button>
            </form>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <h4 className="text-xs uppercase tracking-[0.2em] text-accent mb-4 font-sans">{c.title}</h4>
                <ul className="space-y-2 text-sm text-primary-foreground/70">
                  {c.links.map((l) => (
                    <li key={l.to}><Link to={l.to} className="hover:text-accent transition-colors">{l.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 pt-8 border-t border-primary-foreground/10 flex flex-wrap items-center justify-between gap-4 text-xs text-primary-foreground/60">
          <div>© {new Date().getFullYear()} Lee Shoe Factory. All rights reserved.</div>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-accent">Privacy</Link>
            <Link to="/terms" className="hover:text-accent">Terms</Link>
            <Link to="/cookies" className="hover:text-accent">Cookies</Link>
            <Link to="/refund-policy" className="hover:text-accent">Refund</Link>
          </div>
          <div className="flex gap-3">
            <a href={SITE.social.instagram} aria-label="Instagram" className="hover:text-accent"><Instagram className="size-4" /></a>
            <a href={SITE.social.facebook} aria-label="Facebook" className="hover:text-accent"><Facebook className="size-4" /></a>
            <a href={SITE.social.linkedin} aria-label="LinkedIn" className="hover:text-accent"><Linkedin className="size-4" /></a>
            <a href={SITE.social.twitter} aria-label="Twitter" className="hover:text-accent"><Twitter className="size-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
