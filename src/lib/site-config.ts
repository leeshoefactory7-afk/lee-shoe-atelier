export const SITE = {
  name: "Lee Shoe Factory",
  tagline: "Premium Footwear, Crafted for the World",
  domain: "leeshoefactory.com",
  email: "info@leeshoefactory.com",
  whatsapp: "+1 (912) 831-9041",
  whatsappDigits: "19128319041",
  address: "Industrial Zone, Manufacturing District",
  hours: "Mon–Sat · 9:00 – 18:00 (GMT+0)",
  formsubmitUrl: "https://formsubmit.co/ajax/info@leeshoefactory.com",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  stats: {
    yearsExperience: 35,
    productsManufactured: "12M+",
    countriesServed: 60,
    wholesalePartners: 480,
    satisfiedClients: "150k+",
  },
};

export function formatPrice(n: number | string | null | undefined) {
  const v = Number(n ?? 0);
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);
}

export function generateOrderNumber() {
  const d = new Date();
  const yyyymmdd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `LSF-${yyyymmdd}-${rand}`;
}
