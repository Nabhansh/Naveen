/* Desert Modernism: analytics stays invisible and restrained, capturing only consented interaction signals without interrupting the tactile site experience. */

export type AnalyticsEventName =
  | "mobile_cta_click"
  | "whatsapp_click"
  | "gallery_project_open"
  | "gallery_filter_change"
  | "nav_link_click"
  | "mobile_menu_toggle"
  | "contact_form_submit";

export type AnalyticsPayload = {
  id: string;
  event: AnalyticsEventName;
  path: string;
  referrer: string;
  timestamp: string;
  detail?: string;
};

export type AnalyticsConsent = "accepted" | "declined";

const CONSENT_KEY = "sanwariya.analytics.consent";
const EVENTS_KEY = "sanwariya.analytics.events";
const ANALYTICS_ENDPOINT = (((import.meta as ImportMeta & { env?: { VITE_ANALYTICS_ENDPOINT?: string } }).env?.VITE_ANALYTICS_ENDPOINT) ?? "").trim();

export function getAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === "accepted" || value === "declined" ? value : null;
}

export function setAnalyticsConsent(consent: AnalyticsConsent): void {
  window.localStorage.setItem(CONSENT_KEY, consent);
  window.dispatchEvent(new CustomEvent("sanwariya:consent", { detail: consent }));
}

export function getStoredAnalyticsEvents(): AnalyticsPayload[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(EVENTS_KEY) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function storeEvent(payload: AnalyticsPayload): void {
  const events = [...getStoredAnalyticsEvents(), payload].slice(-500);
  window.localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}

export function clearStoredAnalyticsEvents(): void {
  window.localStorage.removeItem(EVENTS_KEY);
  window.dispatchEvent(new CustomEvent("sanwariya:analytics-cleared"));
}

export function trackEvent(event: AnalyticsEventName, detail?: string): void {
  if (getAnalyticsConsent() !== "accepted") return;

  const payload: AnalyticsPayload = {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    event,
    path: window.location.pathname,
    referrer: document.referrer,
    timestamp: new Date().toISOString(),
    ...(detail ? { detail } : {}),
  };

  storeEvent(payload);
  window.dispatchEvent(new CustomEvent("sanwariya:analytics", { detail: payload }));

  if (!ANALYTICS_ENDPOINT) return;

  const body = JSON.stringify(payload);
  try {
    if (typeof navigator.sendBeacon === "function") {
      const queued = navigator.sendBeacon(ANALYTICS_ENDPOINT, new Blob([body], { type: "application/json" }));
      if (queued) return;
    }

    void fetch(ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    // Analytics must never prevent navigation or interaction.
  }
}
