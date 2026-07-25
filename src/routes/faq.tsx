import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StaticPage } from "@/components/site/StaticPage";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ · Lee Shoe Factory" },
      { name: "description", content: "Frequently asked questions about Lee shoes, sizing, orders, shipping, returns, and customer support." },
      { property: "og:title", content: "FAQ · Lee Shoe Factory" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: () => (
    <StaticPage
      title="FAQ"
      tagline="Frequently asked"
      cover="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-accent font-serif italic mb-8">
          Got questions? We've gathered the most common ones here. If you can't find what you're looking for, reach out to our support team anytime.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-8"
      >
        {[
          {
            category: "Product & Manufacturing",
            questions: [
              {
                q: "Where are your shoes made?",
                a: "At our own facilities in Seoul, South Korea. We've owned our factory since 1990. Zero outsourcing, zero subcontractors. This means we control every step of quality and have complete visibility into our supply chain."
              },
              {
                q: "What's the difference between your shoe types?",
                a: "We produce Goodyear-welt (premium hand-stitched, resoleable), cemented (flexible, lightweight), and vulcanized (durable, athletic) constructions. Each has specific performance characteristics. Check individual product pages for details on each style."
              },
              {
                q: "Can you do custom orders?",
                a: "Yes. We offer private label, OEM, and fully custom orders. Minimum order quantity is 300 pairs per style. Production lead time is 45–90 days depending on complexity. See our Manufacturing page or email wholesale@leeshoefactory.com for details."
              },
              {
                q: "Are your shoes vegan/cruelty-free?",
                a: "We offer vegan alternatives made from recycled polymers for customers who prefer them. However, our core offering is premium leather, which we source from LWG-certified tanneries using vegetable-tanning methods."
              }
            ]
          },
          {
            category: "Ordering & Shipping",
            questions: [
              {
                q: "How do I place an order?",
                a: "Browse our catalog, select your size, and proceed to checkout. We accept major credit cards, PayPal, and wire transfer. For wholesale orders, contact wholesale@leeshoefactory.com."
              },
              {
                q: "What are your shipping options?",
                a: "We offer standard DDP (Delivered Duty Paid) shipping to most countries. Typical delivery is 5–10 business days to North America and Europe, 7–14 days to Asia-Pacific. Tracking is included."
              },
              {
                q: "Do you ship internationally?",
                a: "Yes, to 60+ countries. DDP shipping means no surprise customs charges—price includes all duties and taxes. For countries with restricted imports, contact support@leeshoefactory.com."
              },
              {
                q: "Can I upgrade shipping?",
                a: "Standard shipping is our only option. However, for urgent requests, email us at support@leeshoefactory.com and we'll explore expedited options on a case-by-case basis."
              }
            ]
          },
          {
            category: "Returns & Sizing",
            questions: [
              {
                q: "How true to size are your shoes?",
                a: "Most Lee shoes run true to size. However, sizing can vary by style and last. We strongly recommend measuring your foot using our Size Guide before ordering. If between sizes, we recommend sizing up."
              },
              {
                q: "What's your return policy?",
                a: "30-day returns for any reason. If the fit isn't right, we'll ship a replacement size free. If you want to return instead of exchange, we offer store credit (full price) or refund (minus 5% return shipping fee). Original packaging is preferred."
              },
              {
                q: "Do you offer free exchanges?",
                a: "Yes. If the size doesn't fit, we'll ship a replacement size free of charge within 30 days of delivery. No questions asked."
              },
              {
                q: "Can I try multiple sizes?",
                a: "We recommend measuring your foot carefully using our Size Guide first. If you're still uncertain, order in your best guess. We'll exchange free if it's not right."
              }
            ]
          },
          {
            category: "Care & Durability",
            questions: [
              {
                q: "How should I care for my Lee shoes?",
                a: "Check our comprehensive Care Guide. Basics: wipe with a dry cloth after each wear, condition leather monthly, rotate pairs (leather needs 24 hours to recover), and use cedar shoe trees for storage."
              },
              {
                q: "How long will my Lee shoes last?",
                a: "With proper care, 10–20 years or more. We've heard from customers wearing Lee shoes for 30+ years. Durability depends on wear frequency, climate, and care quality. Our Goodyear-welt shoes can be re-soled indefinitely."
              },
              {
                q: "Can I re-sole my shoes?",
                a: "Yes. Goodyear-welt shoes are designed to be re-soled. We recommend a quality cobbler in your area. Re-soling typically costs $80–150 USD depending on location and materials."
              },
              {
                q: "Do you offer a warranty?",
                a: "12-month tread warranty. If the outsole wears through within 12 months under normal conditions, we'll replace it free. Manufacturing defects are covered indefinitely."
              }
            ]
          },
          {
            category: "Wholesale & Business",
            questions: [
              {
                q: "Do you offer wholesale?",
                a: "Yes. We partner with 480+ retailers across 60 countries. Wholesale pricing ranges from 45–65% off retail depending on volume. Minimum order is 300 pairs per style. Apply on our Wholesale page."
              },
              {
                q: "What wholesale pricing do you offer?",
                a: "45% off retail for orders of 300–500 pairs. 55% off for 500–2,000 pairs. 65% off for 2,000+ pairs. Volume discounts are cumulative with seasonal allocation. Payment terms from Net 30 to Net 60 depending on order size."
              },
              {
                q: "Do you drop-ship?",
                a: "Yes, for qualifying e-commerce partners. Drop-shipping allows you to list Lee shoes and order on-demand with production lead times of 45–90 days. Contact wholesale@leeshoefactory.com to discuss."
              },
              {
                q: "Are you looking to hire?",
                a: "Yes. We regularly hire pattern engineers, quality controllers, sales managers, and sourcing specialists. Check our Careers page for current openings or email careers@leeshoefactory.com with your CV."
              }
            ]
          },
          {
            category: "Payment & Accounts",
            questions: [
              {
                q: "What payment methods do you accept?",
                a: "Major credit cards (Visa, Mastercard, Amex), PayPal, and wire transfer. For wholesale orders, we also accept net terms. After checkout, our sales team will follow up with additional payment options if needed."
              },
              {
                q: "Is my payment information secure?",
                a: "Yes. We use industry-standard SSL encryption and PCI compliance. Your card details are never stored on our servers—they're processed by secure payment gateways."
              },
              {
                q: "Can I create an account?",
                a: "Yes. Creating an account lets you track orders, save your shipping address, and view order history. It also speeds up checkout for future purchases."
              },
              {
                q: "Do you offer gift cards?",
                a: "Yes. Digital and physical gift cards are available in custom amounts. Perfect for the shoe enthusiast in your life. See our Gift Cards page."
              }
            ]
          }
        ].map((section, sectionIdx) => (
          <div key={sectionIdx}>
            <h2 className="font-serif text-2xl md:text-3xl mb-6">{section.category}</h2>
            <div className="space-y-4">
              {section.questions.map((faq, qIdx) => (
                <FAQItem key={qIdx} question={faq.q} answer={faq.a} delay={qIdx * 0.05} />
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mt-16 bg-accent/5 border border-accent/10 p-8 md:p-12 rounded-lg text-center"
      >
        <h3 className="font-serif text-2xl mb-4">Didn't find your answer?</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Our support team is here to help. Reach out anytime and we'll respond within 24 hours.
        </p>
        <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors rounded">
          Contact us
        </a>
      </motion.div>
    </StaticPage>
  ),
});

function FAQItem({ question, answer, delay }: { question: string; answer: string; delay: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="border border-border rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors group"
      >
        <span className="font-serif text-lg group-hover:text-accent transition-colors">{question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="size-5 text-muted-foreground group-hover:text-accent transition-colors" />
        </motion.div>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden border-t border-border"
      >
        <p className="px-6 py-4 text-muted-foreground leading-relaxed">{answer}</p>
      </motion.div>
    </motion.div>
  );
}
