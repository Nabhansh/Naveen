import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "@/data/interiorData";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactDialog({ open, onOpenChange }: ContactDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm bg-background border-border p-0 overflow-hidden rounded-none shadow-2xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-foreground px-8 py-7"
        >
          <DialogTitle className="text-2xl font-serif text-background">Get in Touch</DialogTitle>
          <DialogDescription className="text-background/60 font-light text-sm mt-1">
            SANWARIYA INTERIORS AND WALLPAPERS Studio
          </DialogDescription>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="p-6 space-y-3"
        >
          <a href={PHONE_HREF} className="block" data-testid="link-call-now">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="w-full py-7 text-base font-serif rounded-none bg-background border border-border text-foreground hover:bg-secondary group flex items-center justify-center gap-3 transition-colors">
                <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                Call {PHONE_DISPLAY}
              </Button>
            </motion.div>
          </a>
          <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="block" data-testid="link-whatsapp">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="w-full py-7 text-base font-serif rounded-none bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-white group flex items-center justify-center gap-3 transition-colors">
                <SiWhatsapp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                WhatsApp Us
              </Button>
            </motion.div>
          </a>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
