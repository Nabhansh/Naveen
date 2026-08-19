import { motion } from "framer-motion";
import { Instagram, ArrowUp } from "lucide-react";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/data/interiorData";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-foreground py-12 border-t border-white/10 text-background"
    >
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div>
          <p className="text-xl font-serif font-bold uppercase tracking-tight text-background">
            SANWARIYA <em className="text-primary not-italic lowercase font-serif">INTERIORS AND WALLPAPERS</em>
          </p>
          <p className="text-xs uppercase tracking-widest text-background/50 mt-1 font-mono">
            SANWARIYA INTERIORS AND WALLPAPERS · SURAJGARH BYPASS, CHIDAWA, RAJASTHAN · {INSTAGRAM_HANDLE}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 text-xs uppercase tracking-widest font-mono text-background/60">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition-colors flex items-center gap-1.5"
          >
            <Instagram className="w-4 h-4 text-pink-500" />
            Instagram
          </a>

          <span className="text-background/20">•</span>

          <span>&copy; {new Date().getFullYear()} SANWARIYA INTERIORS AND WALLPAPERS</span>

          <button
            onClick={scrollToTop}
            className="p-2 border border-white/20 text-background/80 hover:text-primary hover:border-primary transition-colors ml-2"
            title="Back to Top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.footer>
  );
}
