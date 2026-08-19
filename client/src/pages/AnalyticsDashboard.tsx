/* Desert Modernism: an editorial analytics board with warm paper tones, compact metrics, and quiet data hierarchy. */
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, BarChart3, ExternalLink, RefreshCw, ShieldCheck, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { clearStoredAnalyticsEvents, getAnalyticsConsent, getStoredAnalyticsEvents, type AnalyticsPayload } from "@/lib/analytics";

const trackedEvents = ["mobile_cta_click", "whatsapp_click", "gallery_project_open", "gallery_filter_change", "nav_link_click", "mobile_menu_toggle"] as const;

function countEvents(events: AnalyticsPayload[], event: AnalyticsPayload["event"]) {
  return events.filter((entry) => entry.event === event).length;
}

export default function AnalyticsDashboard() {
  const [events, setEvents] = useState<AnalyticsPayload[]>([]);
  const [consent, setConsent] = useState(getAnalyticsConsent());

  const refresh = () => {
    setEvents(getStoredAnalyticsEvents());
    setConsent(getAnalyticsConsent());
  };

  useEffect(() => {
    refresh();
    const handleUpdate = () => refresh();
    window.addEventListener("sanwariya:analytics", handleUpdate);
    window.addEventListener("sanwariya:analytics-cleared", handleUpdate);
    window.addEventListener("sanwariya:consent", handleUpdate);
    return () => {
      window.removeEventListener("sanwariya:analytics", handleUpdate);
      window.removeEventListener("sanwariya:analytics-cleared", handleUpdate);
      window.removeEventListener("sanwariya:consent", handleUpdate);
    };
  }, []);

  const maxCount = Math.max(1, ...trackedEvents.map((event) => countEvents(events, event)));
  const recentEvents = useMemo(() => [...events].reverse().slice(0, 8), [events]);

  const clearData = () => {
    clearStoredAnalyticsEvents();
    refresh();
  };

  return (
    <main className="min-h-screen bg-[#f4efe8] text-[#241b16]">
      <header className="border-b border-[#241b16]/10 bg-[#f4efe8]/95 px-6 py-5 backdrop-blur-md sm:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#c85a32]">Sanwariya Interiors</p>
            <h1 className="mt-1 font-serif text-3xl tracking-tight sm:text-4xl">Interaction dashboard</h1>
          </div>
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 border border-[#241b16]/20 px-4 text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-[#c85a32] hover:text-[#c85a32]"><ArrowLeft className="h-4 w-4" /> Website</Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-8 px-6 py-8 sm:px-10 sm:py-12">
        <section className="flex flex-col justify-between gap-4 border border-[#241b16]/10 bg-white/55 p-5 shadow-sm sm:flex-row sm:items-center">
          <div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 text-[#c85a32]" /><div><p className="text-xs font-semibold uppercase tracking-[0.16em]">Consent status</p><p className="mt-1 text-sm text-[#241b16]/65">{consent === "accepted" ? "Analytics collection is enabled on this browser." : consent === "declined" ? "Analytics collection is declined on this browser." : "No consent preference has been saved yet."}</p></div></div>
          <div className="flex gap-2"><button onClick={refresh} className="inline-flex min-h-11 items-center gap-2 border border-[#241b16]/20 px-4 text-[10px] uppercase tracking-[0.16em] hover:border-[#c85a32]"><RefreshCw className="h-3.5 w-3.5" /> Refresh</button><button onClick={clearData} className="inline-flex min-h-11 items-center gap-2 border border-red-200 px-4 text-[10px] uppercase tracking-[0.16em] text-red-700 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /> Clear local data</button></div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[{ label: "Mobile CTA clicks", event: "mobile_cta_click" as const, accent: "#c85a32" }, { label: "WhatsApp clicks", event: "whatsapp_click" as const, accent: "#168a55" }, { label: "Gallery interactions", event: "gallery_project_open" as const, accent: "#a96d36" }, { label: "Navigation clicks", event: "nav_link_click" as const, accent: "#6b5d8d" }].map((card) => <article key={card.event} className="border border-[#241b16]/10 bg-white/60 p-5"><div className="h-1 w-10" style={{ backgroundColor: card.accent }} /><p className="mt-5 text-[10px] uppercase tracking-[0.16em] text-[#241b16]/55">{card.label}</p><p className="mt-2 font-serif text-4xl">{countEvents(events, card.event)}</p></article>)}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <article className="border border-[#241b16]/10 bg-white/60 p-5 sm:p-7"><div className="flex items-center gap-3"><BarChart3 className="h-5 w-5 text-[#c85a32]" /><h2 className="font-serif text-2xl">Event volume</h2></div><div className="mt-7 space-y-5">{trackedEvents.map((event) => { const count = countEvents(events, event); return <div key={event}><div className="flex justify-between gap-4 text-xs"><span className="font-mono text-[#241b16]/70">{event}</span><strong>{count}</strong></div><div className="mt-2 h-2 bg-[#241b16]/8"><div className="h-full bg-[#c85a32] transition-all" style={{ width: `${(count / maxCount) * 100}%` }} /></div></div>; })}</div></article>
          <article className="border border-[#241b16]/10 bg-white/60 p-5 sm:p-7"><h2 className="font-serif text-2xl">Recent events</h2><div className="mt-5 space-y-3">{recentEvents.length === 0 ? <p className="text-sm text-[#241b16]/60">No consented events recorded on this browser yet.</p> : recentEvents.map((event) => <div key={event.id} className="border-b border-[#241b16]/10 pb-3"><p className="font-mono text-xs text-[#c85a32]">{event.event}</p><p className="mt-1 text-xs text-[#241b16]/60">{new Date(event.timestamp).toLocaleString()} · {event.detail ?? event.path}</p></div>)}</div></article>
        </section>

        <p className="text-xs leading-5 text-[#241b16]/55">This dashboard reads consented events stored locally in the current browser. For multi-user reporting, configure <code className="font-mono">VITE_ANALYTICS_ENDPOINT</code> and connect it to a secure analytics service or backend; this static page does not expose authentication or server-side aggregation.</p>
      </div>
    </main>
  );
}
