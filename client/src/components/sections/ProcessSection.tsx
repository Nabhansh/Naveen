import { motion, Variants } from "framer-motion";
import { processSteps } from "@/data/interiorData";
import { CheckCircle2 } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

export function ProcessSection() {
  return (
    <section id="process" className="py-24 md:py-32 bg-foreground text-background relative border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.p variants={fadeUp} className="text-primary uppercase tracking-widest text-xs mb-3 font-mono">
            Structured Turnkey Workflow
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif text-background">
            Simple Process. <em className="text-primary/80">No Surprises.</em>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-background/70 text-sm md:text-base mt-4 font-light">
            From initial site measurement to final keys handover, every stage is executed with transparent updates and quality checkpoints.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {processSteps.map((step) => (
            <motion.div
              key={step.title}
              variants={fadeUp}
              className="bg-white/5 border border-white/10 p-6 relative flex flex-col justify-between group hover:border-primary/50 transition-colors"
              whileHover={{ y: -6 }}
            >
              <div>
                <div className="mb-6">
                  <span className="text-4xl font-serif font-bold text-primary font-mono">{step.n}</span>
                </div>

                <h3 className="text-xl font-serif text-background mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-background/70 text-xs font-light leading-relaxed mb-6">
                  {step.body}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-[10px] uppercase tracking-widest text-primary font-mono mb-2">Deliverables:</p>
                <div className="space-y-1.5">
                  {step.deliverables.map((del, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-background/80 font-mono">
                      <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
