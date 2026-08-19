/* Desert Modernism: warm material photography, asymmetric editorial type, and crisp architectural framing. */
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Instagram, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY, WHATSAPP_HREF, STUDIO_ADDRESS } from "@/data/interiorData";

interface HeroProps {
  onOpenContact: () => void;
}

export function Hero({ onOpenContact }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={heroRef} className="relative min-h-[92svh] overflow-hidden bg-[#2a211c] text-[#f7f0e6]">
      <motion.div style={{ y: heroY }} className="absolute inset-0">
        <img
          src="/images/sanwariya-hero.jpg"
          alt="Warm contemporary living room with textured wall paneling"
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <video
          poster="/images/sanwariya-hero.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Sanwariya Interiors and Wallpapers interior design showcase"
          className="absolute inset-0 h-full w-full object-cover object-center"
          onCanPlay={(event) => {
            const video = event.currentTarget;
            video.muted = true;
            setVideoReady(true);
            void video.play().catch(() => undefined);
          }}
          onError={() => {
            setVideoFailed(true);
            setVideoReady(true);
          }}
          style={{ opacity: videoReady || videoFailed ? 1 : 0 }}
          aria-hidden={videoFailed}
        >
          <source src="/videos/hero-sanwariya.mp4" type="video/mp4" />
        </video>
        {!videoReady && !videoFailed && (
          <div className="absolute inset-0 z-[1] flex items-center justify-center bg-[#2a211c]/55" role="status" aria-live="polite">
            <div className="flex items-center gap-3 border border-[#f0b08f]/35 bg-[#2a211c]/55 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-[#f7f0e6]/75 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#f0b08f]" />
              Preparing the studio
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(32,23,18,.84)_0%,rgba(32,23,18,.54)_43%,rgba(32,23,18,.18)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a211c]/70 via-transparent to-[#2a211c]/15" />
      </motion.div>

      <div className="absolute right-5 top-24 z-20 hidden items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-[#f7f0e6]/70 md:flex">
        <span className="h-px w-10 bg-[#f7f0e6]/50" />
        <span>{STUDIO_ADDRESS}</span>
      </div>

      <motion.div style={{ opacity: heroOpacity }} className="relative z-10 mx-auto flex min-h-[92svh] max-w-[1280px] items-end px-6 pb-16 pt-32 sm:px-10 lg:px-16 lg:pb-24">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-7 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[#f0b08f]">
            <span className="h-px w-12 bg-[#f0b08f]" />
            <span>Interior design · wall treatments</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="font-serif text-5xl leading-[0.94] tracking-[-0.045em] sm:text-7xl lg:text-[7.7rem]">
            Give your walls
            <em className="block text-[#f0b08f]">a point of view.</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="mt-7 max-w-xl text-sm leading-7 text-[#f7f0e6]/80 sm:text-base">
            <strong className="font-semibold text-[#fffaf2]">GIVE YOUR WALLS AND ROOMS A BETTER DESIGN AND LIFE WITH INTERIOR DESIGNING AND PANNELING....... Upgrade your house style with sanwariya seth interior and wallpapers</strong>
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button onClick={() => { trackEvent("mobile_cta_click"); onOpenContact(); }} className="h-12 rounded-none bg-[#c85a32] px-6 text-[11px] uppercase tracking-[0.2em] text-white transition-transform hover:-translate-y-0.5 hover:bg-[#d56c43] active:scale-[.98]">
              Bring your room to life <ArrowRight className="ml-3 h-4 w-4" />
            </Button>
            <a href={WHATSAPP_HREF} target="_blank" rel="noreferrer" onClick={() => trackEvent("whatsapp_click")} className="inline-flex h-12 items-center gap-3 border border-[#f7f0e6]/35 px-5 text-[11px] uppercase tracking-[0.18em] text-[#f7f0e6] transition-colors hover:border-[#f0b08f] hover:text-[#f0b08f]">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
          </motion.div>
          <div className="mt-10 flex items-center gap-5 text-[10px] uppercase tracking-[0.18em] text-[#f7f0e6]/55">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-[#f0b08f]"><Instagram className="h-3.5 w-3.5" /> {INSTAGRAM_HANDLE}</a>
            <span className="h-1 w-1 rounded-full bg-[#f0b08f]" />
            <span>Chidawa · Rajasthan</span>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#f7f0e6]/60 sm:right-10 lg:right-16">
        <ArrowDown className="h-4 w-4" /> Explore the studio
      </div>
    </section>
  );
}
