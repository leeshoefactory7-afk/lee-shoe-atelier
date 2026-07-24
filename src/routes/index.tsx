import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { listProducts, listCategories, listReviews } from "@/lib/catalog.functions";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard, Stars } from "@/components/site/ProductCard";
import { SITE } from "@/lib/site-config";
import { ArrowRight, Award, Factory, Globe, Handshake, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { motion } from "framer-motion";

const featuredQ = queryOptions({ queryKey: ["home", "featured"], queryFn: () => listProducts({ data: { featured: true, limit: 8 } }) });
const newQ = queryOptions({ queryKey: ["home", "new"], queryFn: () => listProducts({ data: { isNew: true, limit: 4 } }) });
const bestQ = queryOptions({ queryKey: ["home", "best"], queryFn: () => listProducts({ data: { bestseller: true, limit: 4 } }) });
const limitedQ = queryOptions({ queryKey: ["home", "limited"], queryFn: () => listProducts({ data: { limited: true, limit: 4 } }) });
const catsQ = queryOptions({ queryKey: ["categories"], queryFn: () => listCategories() });
const revQ = queryOptions({ queryKey: ["home", "reviews"], queryFn: () => listReviews({ data: { limit: 6 } }) });

export const Route = createFileRoute("/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(featuredQ);
    context.queryClient.ensureQueryData(newQ);
    context.queryClient.ensureQueryData(bestQ);
    context.queryClient.ensureQueryData(limitedQ);
    context.queryClient.ensureQueryData(catsQ);
    context.queryClient.ensureQueryData(revQ);
  },
  head: () => ({
    meta: [
      { title: "Lee Shoe Factory · Premium Footwear Manufacturer & Global Wholesale Supplier" },
      { name: "description", content: "Lee Shoe Factory manufactures premium leather shoes, sneakers, boots and sports footwear for wholesale, OEM and private-label partners in 60+ countries." },
      { property: "og:title", content: "Lee Shoe Factory · Premium Footwear Manufacturer" },
      { property: "og:description", content: "Factory-direct luxury footwear for retailers, brands and distributors worldwide." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const stats = [
  { k: "35+", v: "Years of manufacturing" },
  { k: "12M+", v: "Pairs manufactured" },
  { k: "60+", v: "Countries served" },
  { k: "480", v: "Wholesale partners" },
];

const whyChoose = [
  { icon: Factory, title: "In-house manufacturing", body: "Every pair is made in our 35,000 sqm facility — no middlemen." },
  { icon: ShieldCheck, title: "Uncompromising QA", body: "Six-point QC pass on every SKU, backed by a 12-month tread warranty." },
  { icon: Globe, title: "Worldwide DDP shipping", body: "Door-to-door delivery in 60+ countries with all duties handled." },
  { icon: Handshake, title: "OEM & Private label", body: "Launch your own brand with our design, tooling and factory floor." },
  { icon: Sparkles, title: "Premium materials", body: "Full-grain Italian calf, sustainable rubber, waterproof membranes." },
  { icon: Award, title: "Award-winning craft", body: "Recognised by leading footwear associations for material and finish." },
];

const process = [
  { n: "01", t: "Design & Development", b: "Our in-house pattern makers translate your brief into last, upper and sole tooling." },
  { n: "02", t: "Sourcing", b: "Full-grain leathers from Tuscan tanneries, technical uppers from Vietnam, sustainable rubber from Malaysia." },
  { n: "03", t: "Production", b: "Cut, closing, lasting, bottoming and finishing across seven dedicated production lines." },
  { n: "04", t: "Quality Assurance", b: "A six-point inspection: shape, stitch, sole bond, symmetry, hardware, finish." },
  { n: "05", t: "Packaging", b: "Numbered boxes, cotton dust bags, and eco recycled paper wrap." },
  { n: "06", t: "Global Logistics", b: "DDP shipping to 60+ countries with real-time tracking." },
];

const faqs = [
  { q: "What is the minimum order quantity?", a: "For OEM and private label, MOQs typically start at 300 pairs per SKU. Standard wholesale orders start at 24 pairs per SKU." },
  { q: "Do you ship worldwide?", a: "Yes — we deliver DDP (duties and taxes paid) to 60+ countries via air and sea freight." },
  { q: "Can you produce under our brand?", a: "Absolutely. Our OEM and private-label programs handle design, sourcing, tooling, production and packaging under your brand." },
  { q: "What lead time should I plan for?", a: "Standard lead time is 45–60 days from PO for OEM, or 20–30 days for in-stock wholesale." },
];

function Home() {
  const { data: featured } = useSuspenseQuery(featuredQ);
  const { data: latest } = useSuspenseQuery(newQ);
  const { data: best } = useSuspenseQuery(bestQ);
  const { data: limited } = useSuspenseQuery(limitedQ);
  const { data: categories } = useSuspenseQuery(catsQ);
  const { data: reviews } = useSuspenseQuery(revQ);
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-primary text-primary-foreground">
        <img
          src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1920&q=80"
          alt="Craftsman shaping a leather shoe at the Lee factory"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/20" />
        <div className="relative container-lux pb-20 pt-32 md:pb-28 md:pt-40 grid md:grid-cols-[1.4fr_1fr] gap-10 items-end">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-xs uppercase tracking-[0.32em] text-accent">Manufacturing since 1990</p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mt-6">
              Premium footwear,<br />crafted for the world.
            </h1>
            <p className="mt-6 max-w-xl text-primary-foreground/75 text-lg">
              Lee Shoe Factory produces luxury leather shoes, sneakers, boots and sports footwear for retailers, brands and distributors in {SITE.stats.countriesServed}+ countries.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/products" className="bg-accent text-accent-foreground px-8 py-4 text-sm tracking-wide hover:brightness-95">Shop Products</Link>
              <Link to="/bulk-orders" className="border border-primary-foreground/40 px-8 py-4 text-sm tracking-wide hover:border-accent hover:text-accent">Request Bulk Order</Link>
            </div>
          </motion.div>
          <div className="hidden md:block text-right space-y-6">
            <div className="text-xs uppercase tracking-[0.3em] text-primary-foreground/60">Est. 1990 · Global exports</div>
            <div className="font-serif text-2xl leading-tight">
              "In an industry ruled by disposable design,<br />we still make shoes that last decades."
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-border">
        <div className="container-lux grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {stats.map((s) => (
            <div key={s.v} className="py-10 px-4 text-center">
              <div className="font-serif text-4xl md:text-5xl">{s.k}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-lux py-24">
        <SectionHeader eyebrow="Collections" title="Shop by category" cta={{ to: "/products", label: "View all" }} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {categories.slice(0, 8).map((c) => (
            <Link key={c.id} to="/category/$slug" params={{ slug: c.slug }} className="relative aspect-[4/5] overflow-hidden group bg-muted">
              {c.image_url && (
                <img src={c.image_url} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="font-serif text-2xl text-primary-foreground">{c.name}</div>
                <div className="flex items-center gap-1 text-primary-foreground/80 text-xs mt-1 uppercase tracking-widest">
                  Explore <ArrowRight className="size-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-lux pb-24">
        <SectionHeader eyebrow="Selected for you" title="Featured products" cta={{ to: "/products", label: "Shop all" }} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-10">
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* NEW ARRIVALS + BEST SELLERS + LIMITED */}
      <section className="bg-muted/50 py-24">
        <div className="container-lux space-y-20">
          <ProductRow title="Newest arrivals" items={latest} />
          <ProductRow title="Best sellers" items={best} />
          <ProductRow title="Limited offers" items={limited} />
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="container-lux py-24">
        <SectionHeader eyebrow="The Lee Standard" title="Why choose Lee Shoe Factory" />
        <div className="grid md:grid-cols-3 gap-px mt-14 bg-border">
          {whyChoose.map((w) => (
            <div key={w.title} className="bg-background p-8">
              <w.icon className="size-8 text-accent" />
              <h3 className="font-serif text-2xl mt-6">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MANUFACTURING PROCESS */}
      <section className="bg-primary text-primary-foreground py-24">
        <div className="container-lux">
          <SectionHeader eyebrow="Behind every pair" title="Our manufacturing process" invert />
          <div className="grid md:grid-cols-3 gap-10 mt-14">
            {process.map((p) => (
              <div key={p.n} className="border-t border-primary-foreground/20 pt-6">
                <div className="text-accent text-sm">{p.n}</div>
                <h3 className="font-serif text-2xl mt-2">{p.t}</h3>
                <p className="mt-3 text-sm text-primary-foreground/70 leading-relaxed">{p.b}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 flex gap-4">
            <Link to="/manufacturing" className="border border-primary-foreground/40 hover:border-accent hover:text-accent px-6 py-3 text-sm tracking-wide">Learn about our process</Link>
            <Link to="/factory-tour" className="text-primary-foreground/80 hover:text-accent px-6 py-3 text-sm">Request a factory tour →</Link>
          </div>
        </div>
      </section>

      {/* OEM / PRIVATE LABEL */}
      <section className="container-lux py-24 grid md:grid-cols-2 gap-16 items-center">
        <div className="aspect-[4/5] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=1200" alt="OEM sample development at the Lee factory" className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-accent">Build your brand</p>
          <h2 className="font-serif text-4xl md:text-5xl mt-4">OEM &amp; Private Label</h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            From concept sketches to boxed pairs, our OEM and private-label programs let you launch a footwear brand backed by decades of factory-floor expertise.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li className="flex gap-2"><span className="text-accent">›</span> Custom lasts, tooling and materials development</li>
            <li className="flex gap-2"><span className="text-accent">›</span> Fully-branded packaging and box art</li>
            <li className="flex gap-2"><span className="text-accent">›</span> MOQs from 300 pairs per SKU</li>
            <li className="flex gap-2"><span className="text-accent">›</span> Global DDP shipping and warehousing</li>
          </ul>
          <div className="mt-8 flex gap-3">
            <Link to="/oem" className="bg-primary text-primary-foreground px-6 py-3 text-sm">Explore OEM</Link>
            <Link to="/private-label" className="border border-primary px-6 py-3 text-sm">Private Label</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-muted/50 py-24">
        <div className="container-lux">
          <SectionHeader eyebrow="Trusted worldwide" title="What our customers say" cta={{ to: "/reviews", label: "Read all reviews" }} />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {reviews.map((r) => (
              <figure key={r.id} className="bg-background p-8 border border-border">
                <Stars value={r.rating} />
                <blockquote className="mt-4 font-serif text-xl leading-snug">"{r.title || r.body.slice(0, 80)}"</blockquote>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{r.body}</p>
                <figcaption className="mt-6 flex items-center gap-3 pt-4 border-t border-border">
                  {r.customer_avatar && <img src={r.customer_avatar} alt="" className="size-10 rounded-full" />}
                  <div>
                    <div className="text-sm font-medium">{r.customer_name}</div>
                    <div className="text-xs text-muted-foreground">{r.customer_country}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL MAP */}
      <section className="container-lux py-24 text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-accent">Delivered to 60+ countries</p>
        <h2 className="font-serif text-4xl md:text-5xl mt-4 max-w-2xl mx-auto">A global footwear supplier, one factory floor.</h2>
        <p className="mt-6 max-w-2xl mx-auto text-muted-foreground">
          From Tokyo to Toronto, boutiques and retailers rely on our worldwide DDP shipping and dedicated wholesale support.
        </p>
        <div className="mt-14 relative">
          <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80" alt="World map with Lee distribution routes" className="w-full h-64 md:h-96 object-cover object-center opacity-90" />
        </div>
      </section>

      {/* INSTAGRAM GALLERY */}
      <section className="container-lux pb-24">
        <SectionHeader eyebrow="Follow @leeshoefactory" title="From our Instagram" cta={{ to: "/gallery", label: "View gallery" }} />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-8">
          {[
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600",
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600",
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600",
            "https://images.unsplash.com/photo-1520256862855-398228c41684?w=600",
          ].map((s, i) => (
            <div key={i} className="aspect-square overflow-hidden bg-muted">
              <img src={s} alt="Instagram post" loading="lazy" className="h-full w-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* FAQ preview */}
      <section className="bg-muted/50 py-24">
        <div className="container-lux grid md:grid-cols-[1fr_1.4fr] gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-accent">Answers</p>
            <h2 className="font-serif text-4xl mt-4">Frequently asked</h2>
            <p className="mt-4 text-muted-foreground">Everything you need to know about ordering, wholesale and OEM.</p>
            <Link to="/faq" className="mt-6 inline-block underline underline-offset-4">See all FAQs →</Link>
          </div>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group bg-background border border-border p-6">
                <summary className="cursor-pointer flex justify-between items-center font-serif text-xl">
                  {f.q}
                  <span className="text-accent transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-lux py-24 text-center">
        <Truck className="size-8 text-accent mx-auto" />
        <h2 className="font-serif text-4xl md:text-6xl mt-6 max-w-3xl mx-auto">Ready to bring Lee to your market?</h2>
        <p className="mt-6 text-muted-foreground max-w-xl mx-auto">Talk to our wholesale team about custom lines, OEM programs and dropshipping partnerships.</p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link to="/bulk-orders" className="bg-primary text-primary-foreground px-8 py-4 text-sm">Request bulk order</Link>
          <Link to="/contact" className="border border-primary px-8 py-4 text-sm">Contact sales</Link>
        </div>
      </section>
    </SiteLayout>
  );
}

function SectionHeader({ eyebrow, title, cta, invert = false }: { eyebrow: string; title: string; cta?: { to: string; label: string }; invert?: boolean }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className={`text-xs uppercase tracking-[0.28em] ${invert ? "text-accent" : "text-accent"}`}>{eyebrow}</p>
        <h2 className="font-serif text-4xl md:text-5xl mt-3">{title}</h2>
      </div>
      {cta && (
        <Link to={cta.to} className={`text-sm underline underline-offset-4 ${invert ? "text-primary-foreground/80 hover:text-accent" : "hover:text-accent"}`}>
          {cta.label} →
        </Link>
      )}
    </div>
  );
}

function ProductRow({ title, items }: { title: string; items: Array<React.ComponentProps<typeof ProductCard>["p"]> }) {
  if (!items.length) return null;
  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <h3 className="font-serif text-3xl">{title}</h3>
        <Link to="/products" className="text-sm underline underline-offset-4">Shop all →</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {items.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}
