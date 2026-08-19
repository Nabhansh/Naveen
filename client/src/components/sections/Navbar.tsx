import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Phone, Instagram, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, PHONE_DISPLAY } from "@/data/interiorData";
import { trackEvent } from "@/lib/analytics";

interface NavbarProps {
  onOpenContact: () => void;
}

export function Navbar({ onOpenContact }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 25 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const navSections = ["studio", "services", "portfolio", "process", "visit-us"];
      for (const sectionId of navSections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Studio", href: "#studio", id: "studio" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Portfolio", href: "#portfolio", id: "portfolio" },
    { label: "Process", href: "#process", id: "process" },
    { label: "Visit Us", href: "#visit-us", id: "visit-us" },
    { label: "Contact Us", href: "/contact", id: "contact" },
  ];

  return (
    <>
      {/* Top Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 flex items-center justify-between px-4 sm:px-6 md:px-12 ${
          scrolled
            ? "py-3 bg-background/90 backdrop-blur-xl border-b border-border/80 shadow-lg"
            : "py-4 bg-background/70 backdrop-blur-md border-b border-border/40"
        }`}
        aria-label="Main Navigation"
      >
        {/* Brand Logo */}
        <a href="#" className="group flex items-center gap-3" aria-label="SANWARIYA INTERIORS AND WALLPAPERS Home">
          <img src="/images/sanwariya-mark.png" alt="" className="h-9 w-9 object-contain" />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-[170px] text-[12px] font-semibold uppercase leading-[1.05] tracking-[0.16em] text-foreground sm:max-w-none sm:text-sm"
          >
            SANWARIYA <span className="text-primary">INTERIORS</span><span className="hidden sm:inline"> AND WALLPAPERS</span>
          </motion.span>
        </a>

        {/* Desktop Navigation Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="hidden lg:flex gap-6 xl:gap-8 text-xs uppercase tracking-widest text-muted-foreground items-center"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => trackEvent("nav_link_click", link.id)}
                className={`relative py-1 transition-colors flex items-center gap-1.5 font-medium ${
                  isActive ? "text-primary font-semibold" : "hover:text-primary"
                }`}
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Right Actions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center gap-2 sm:gap-3"
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs uppercase tracking-wider px-3 py-2 border border-border hover:border-primary hover:text-primary transition-colors bg-secondary/30 rounded-none"
            title="Follow SANWARIYA INTERIORS AND WALLPAPERS on Instagram"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-500" />
            <span className="font-mono text-[11px] hidden xl:inline">{INSTAGRAM_HANDLE}</span>
          </a>

          <Button
            data-testid="button-nav-contact"
            onClick={onOpenContact}
            className="bg-primary text-primary-foreground hover:bg-foreground rounded-none px-3 py-2 sm:px-5 sm:py-5 text-[11px] sm:text-xs uppercase tracking-widest transition-colors flex items-center gap-1.5"
          >
            <span className="hidden sm:inline">Call Us</span>
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => { setMobileMenuOpen(!mobileMenuOpen); trackEvent("mobile_menu_toggle", mobileMenuOpen ? "close" : "open"); }}
            className="lg:hidden p-2 text-foreground border border-border hover:bg-secondary transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>
      </motion.nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-x-0 top-[60px] z-40 bg-background/98 backdrop-blur-2xl border-b border-border shadow-2xl lg:hidden py-6 px-6"
        >
          <div className="flex flex-col gap-3 text-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => { setMobileMenuOpen(false); trackEvent("nav_link_click", link.id); }}
                className="py-2.5 text-sm font-serif uppercase tracking-widest text-foreground hover:text-primary transition-colors border-b border-border/20 flex items-center justify-center gap-2"
              >
                {link.label}
              </a>
            ))}

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              Follow {INSTAGRAM_HANDLE}
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
}
