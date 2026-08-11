import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site-config";

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${SITE.whatsappDigits}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
    >
      <MessageCircle className="size-6 fill-current" />
      <span className="hidden sm:inline text-sm font-medium">WhatsApp us</span>
    </a>
  );
}
