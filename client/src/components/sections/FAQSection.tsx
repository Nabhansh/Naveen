import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { faqs } from "@/data/interiorData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export function FAQSection() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const categories = ["All", "Process", "Pricing", "Materials", "Warranty"];

  const filteredFaqs = faqs.filter((f) => activeTab === "All" || f.category === activeTab);

  return (
    <section className="py-24 md:py-32 bg-background border-b border-border">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-foreground text-xs font-mono mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-primary" />
            <span>Got Questions?</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif text-foreground">
            Frequently Asked <em>Questions</em>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground text-sm font-light mt-3">
            Everything you need to know about our design consultation, material warranties, and project execution.
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 uppercase tracking-wider transition-all border ${
                activeTab === cat
                  ? "bg-primary text-primary-foreground font-semibold border-primary shadow-md"
                  : "bg-secondary/40 text-muted-foreground hover:bg-secondary border-border/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-secondary/20 border border-border p-6 md:p-8"
        >
          <Accordion type="single" collapsible defaultValue="faq1" className="w-full space-y-4">
            {filteredFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border border-border/80 bg-background px-5 py-1">
                <AccordionTrigger className="text-base font-serif font-medium text-foreground hover:text-primary transition-colors py-4">
                  <div className="text-left flex items-center gap-3">
                    <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 shrink-0">
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm font-light text-muted-foreground leading-relaxed pt-1 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
