/* Desert Modernism: a quiet, bottom-anchored consent panel that explains measurement without interrupting the visual story. */
import { useEffect, useState } from "react";
import { BarChart3, X } from "lucide-react";
import { Link } from "wouter";
import { getAnalyticsConsent, setAnalyticsConsent, type AnalyticsConsent } from "@/lib/analytics";

export function AnalyticsConsentBanner() {
  const [consent, setConsent] = useState<AnalyticsConsent | null>(() => getAnalyticsConsent());

  useEffect(() => {
    const handleConsent = (event: Event) => setConsent((event as CustomEvent<AnalyticsConsent>).detail);
    window.addEventListener("sanwariya:consent", handleConsent);
    return () => window.removeEventListener("sanwariya:consent", handleConsent);
  }, []);

  if (consent) return null;

  const choose = (value: AnalyticsConsent) => {
    setAnalyticsConsent(value);
    setConsent(value);
  };

  return (
    <aside className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-3xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur-xl sm:inset-x-5 sm:flex sm:items-center sm:gap-5 sm:p-5" role="dialog" aria-label="Analytics consent">
      <div className="flex min-w-0 flex-1 gap-3">
        <BarChart3 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">A small note about analytics</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">We use anonymous click data to improve the mobile CTA, WhatsApp contact, navigation, and project gallery experience. You can accept or decline measurement.</p><Link href="/privacy-policy" className="mt-2 inline-flex text-xs text-primary underline underline-offset-4 hover:text-foreground">Read our Privacy Policy</Link>
        </div>
      </div>
      <div className="mt-4 flex shrink-0 gap-2 sm:mt-0">
        <button type="button" onClick={() => choose("declined")} className="min-h-11 border border-border px-4 text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-primary hover:text-foreground">Decline</button>
        <button type="button" onClick={() => choose("accepted")} className="min-h-11 bg-primary px-4 text-[10px] uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-foreground hover:text-background">Accept analytics</button>
        <button type="button" onClick={() => choose("declined")} className="min-h-11 min-w-11 border border-border text-muted-foreground hover:text-foreground" aria-label="Close analytics notice"><X className="mx-auto h-4 w-4" /></button>
      </div>
    </aside>
  );
}
