import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_HREF, PHONE_DISPLAY } from "@/data/interiorData";
import { trackEvent } from "@/lib/analytics";

export function WhatsAppFloatingButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip on hover */}
      <div className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap bg-neutral-900 text-white text-xs px-3 py-1.5 rounded shadow-lg border border-white/10 font-sans tracking-wide">
        Chat with SANWARIYA INTERIORS AND WALLPAPERS ({PHONE_DISPLAY})
      </div>
      
      {/* WhatsApp Button */}
      <a
        href={`${WHATSAPP_HREF}?text=Hello%20SANWARIYA%20Interiors,%20I%20would%20like%20to%20discuss%20an%20interior%20design%20project.`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_click")}
        aria-label="Chat on WhatsApp"
        title="Chat with SANWARIYA INTERIORS AND WALLPAPERS on WhatsApp"
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-white/20 animate-bounce hover:animate-none"
      >
        <FaWhatsapp className="w-8 h-8" />
      </a>
    </div>
  );
}
