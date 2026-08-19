import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, animate, Variants } from "framer-motion";
import { handleImageError, FALLBACK_IMAGES } from "@/lib/imageUtils";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, { duration: 1.8, ease: "easeOut" });
    const unsub = rounded.on("change", (v) => setDisplay(Math.round(v).toString()));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, count, rounded, target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export function StudioAbout() {
  return (
    <section id="studio" className="py-24 md:py-32 px-6 md:px-12 bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p variants={fadeUp} className="text-primary uppercase tracking-widest text-xs mb-3 font-mono">
              The Craftsmanship Philosophy
            </motion.p>
            <motion.h2 variants={slideLeft} className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight mb-8 text-foreground">
              Good design doesn't shout. It just{" "}
              <em className="text-primary not-italic font-serif">feels right.</em>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-6 font-light text-base md:text-lg">
              SANWARIYA INTERIORS AND WALLPAPERS has been transforming residential and commercial spaces across Rajasthan for over fifteen years. From luxury false ceilings and custom TV units to complete wall paneling and interior fit-outs, our approach centers around durability and refined aesthetic polish.
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed font-light text-base md:text-lg mb-10">
              No standard templates. No compromises on material quality. Just turnkey interior execution tailored to your lifestyle.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-8 pt-6 border-t border-border">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                <p className="text-4xl font-serif font-bold text-foreground">
                  <AnimatedCounter target={15} suffix="+" />
                </p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1 font-mono">Years Experience</p>
              </motion.div>

              <div className="w-px h-12 bg-border hidden sm:block" />

              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                <p className="text-4xl font-serif font-bold text-foreground">
                  <AnimatedCounter target={350} suffix="+" />
                </p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1 font-mono">Projects Completed</p>
              </motion.div>

              <div className="w-px h-12 bg-border hidden sm:block" />

              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                <p className="text-4xl font-serif font-bold text-foreground">
                  <AnimatedCounter target={100} suffix="%" />
                </p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1 font-mono">Turnkey Satisfaction</p>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative aspect-[4/5] w-full"
          >
            <motion.div
              initial={{ x: 0, y: 0 }}
              whileInView={{ x: 16, y: 16 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className="absolute inset-0 bg-primary/20"
            />
            <motion.img
              src="/images/sanwariya-wall-panel.jpg"
              alt="Wall paneling detail by SANWARIYA INTERIORS AND WALLPAPERS"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={(e) => handleImageError(e, FALLBACK_IMAGES.library)}
              className="relative z-10 w-full h-full object-cover shadow-2xl border border-border/50"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
