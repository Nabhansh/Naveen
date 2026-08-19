import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { services } from "@/data/interiorData";
import { Button } from "@/components/ui/button";
import { ChefHat, Tv, Sparkles, Bed, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import { handleImageError, FALLBACK_IMAGES } from "@/lib/imageUtils";

interface ServicesSectionProps {
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

export function ServicesSection({ onOpenContact }: ServicesSectionProps) {
  const [selectedServiceId, setSelectedServiceId] = useState(services[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ChefHat": return <ChefHat className="w-5 h-5" />;
      case "Tv": return <Tv className="w-5 h-5" />;
      case "Sparkles": return <Sparkles className="w-5 h-5" />;
      case "Bed": return <Bed className="w-5 h-5" />;
      case "Building2": return <Building2 className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-secondary/40 border-y border-border/60">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.p variants={fadeUp} className="text-primary uppercase tracking-widest text-xs mb-3 font-mono">
            Bespoke Interior Capabilities
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif text-foreground">
            Mastery in Every <em>Detail</em>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground text-sm md:text-base mt-4 font-light">
            Engineered custom wall paneling, architectural ceiling illumination, and hand-finished woodworking tailored for luxury Rajasthan homes.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Service Selector Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {services.map((service) => {
              const isSelected = selectedServiceId === service.id;
              return (
                <motion.div
                  key={service.id}
                  variants={fadeUp}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`p-5 cursor-pointer border transition-all duration-300 flex items-start gap-4 ${
                    isSelected
                      ? "bg-background border-primary shadow-xl translate-x-2"
                      : "bg-background/60 border-border/60 hover:border-border hover:bg-background/80"
                  }`}
                >
                  <div className={`p-2.5 rounded-none ${isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                    {getIcon(service.iconName)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-serif text-lg ${isSelected ? "text-primary font-semibold" : "text-foreground"}`}>
                        {service.title}
                      </h3>
                      <span className="text-[11px] font-mono text-muted-foreground bg-secondary px-2 py-0.5">
                        {service.startingPrice}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground font-light mt-1 line-clamp-2">
                      {service.shortDesc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Service Active Card Details */}
          <div className="lg:col-span-7">
            {services
              .filter((s) => s.id === selectedServiceId)
              .map((service) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-background border border-border p-6 md:p-8 shadow-2xl space-y-6"
                >
                  <div className="relative aspect-video overflow-hidden border border-border/60">
                    <img
                      src={service.image}
                      alt={service.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => handleImageError(e, FALLBACK_IMAGES.room)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/80 text-white font-mono text-xs backdrop-blur-md">
                      Starting at {service.startingPrice}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-serif text-foreground mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm font-light leading-relaxed">
                      {service.fullDesc}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">
                      Key Specification Highlights:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-foreground font-light">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono">
                        Estimated Rates
                      </p>
                      <p className="text-sm font-serif font-semibold text-foreground">
                        {service.startingPrice} <span className="text-xs font-normal text-muted-foreground">(Incl. Material & Labor)</span>
                      </p>
                    </div>

                    <Button
                      onClick={onOpenContact}
                      className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-foreground rounded-none px-6 py-5 text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                      <span>Inquire About Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
