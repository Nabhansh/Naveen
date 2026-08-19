import { motion, Variants } from "framer-motion";
import { MapPin, Instagram, ExternalLink, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "@/data/interiorData";

interface VisitMapSectionProps {
  onOpenContact: () => void;
}

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

export function VisitMapSection({ onOpenContact }: VisitMapSectionProps) {
  return (
    <section id="visit-us" className="py-24 md:py-32 px-6 md:px-12 bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-1 flex flex-col justify-center"
          >
            <motion.p variants={fadeUp} className="text-primary uppercase tracking-widest text-xs mb-3 font-mono">
              Visit SANWARIYA INTERIORS AND WALLPAPERS
            </motion.p>
            <motion.h2 variants={slideLeft} className="text-4xl md:text-5xl font-serif mb-6 text-foreground">
              Come see the <em>studio.</em>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground font-light leading-relaxed mb-8 text-sm md:text-base">
              Walk in, look around, feel the material samples in person. Our designers are usually on-site and happy to talk through your project with no obligation.
            </motion.p>

            <motion.div variants={staggerContainer} className="space-y-6">
              <motion.div variants={fadeUp} className="flex items-start gap-4">
                <motion.span whileHover={{ scale: 1.2, rotate: -10 }} transition={{ type: "spring", stiffness: 400 }}>
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                </motion.span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-1">Studio Address</p>
                  <a
                    href="https://www.google.com/maps?q=28.6024439,75.694192&z=17&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-light text-foreground hover:text-primary transition-colors block"
                  >
                    SANWARIYA INTERIORS AND WALLPAPERS Studio<br />SURAJGARH BYPASS, CHIDAWA, RAJASTHAN
                  </a>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-start gap-4">
                <Instagram className="w-5 h-5 text-pink-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-1">Instagram Contact</p>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-light text-foreground hover:text-primary transition-colors flex items-center gap-1 font-mono text-xs"
                  >
                    {INSTAGRAM_HANDLE} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>

              <motion.button
                variants={fadeUp}
                data-testid="button-contact-phone"
                onClick={onOpenContact}
                className="flex items-start gap-4 group text-left w-full"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-1">Phone / WhatsApp</p>
                  <p className="text-sm font-light text-foreground group-hover:text-primary transition-colors font-mono">{PHONE_DISPLAY}</p>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="lg:col-span-2 h-[320px] sm:h-[420px] md:h-[520px] relative border border-border shadow-2xl"
          >
            <iframe
              src="https://maps.google.com/maps?q=28.6024439,75.694192&t=&z=17&ie=UTF8&iwloc=&hl=en&output=embed"
              className="w-full h-full border-0 shadow-lg grayscale-[15%]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SANWARIYA INTERIORS AND WALLPAPERS Designs location map"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
