import { motion } from "framer-motion";
import { tickerItems } from "@/data/interiorData";

export function MarqueeTicker() {
  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="overflow-hidden border-y border-border py-4 bg-secondary/30 relative z-20">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span key={i} className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium flex items-center gap-12">
            {item}
            <span className="text-primary text-lg leading-none">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
