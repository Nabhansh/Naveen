/* Desert Modernism: a calm, editorial policy page using warm paper, restrained type, and clear privacy language. */
import { Link } from "wouter";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#f4efe8] text-[#241b16]">
      <header className="border-b border-[#241b16]/10 bg-[#f4efe8]/95 px-6 py-5 sm:px-10">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#c85a32]">SANWARIYA INTERIORS AND WALLPAPERS</p>
            <h1 className="mt-1 font-serif text-3xl tracking-tight sm:text-5xl">Privacy Policy</h1>
          </div>
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 border border-[#241b16]/20 px-4 text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-[#c85a32] hover:text-[#c85a32]"><ArrowLeft className="h-4 w-4" /> Website</Link>
        </div>
      </header>

      <article className="mx-auto max-w-4xl space-y-10 px-6 py-10 sm:px-10 sm:py-16">
        <div className="flex items-start gap-3 border border-[#c85a32]/25 bg-white/55 p-5"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#c85a32]" /><p className="text-sm leading-6 text-[#241b16]/75">This policy explains what information this website collects, why it is collected, and how you can control optional analytics.</p></div>
        <section><p className="text-[10px] uppercase tracking-[0.2em] text-[#c85a32]">Effective date</p><h2 className="mt-2 font-serif text-3xl">19 August 2026</h2><p className="mt-4 text-sm leading-7 text-[#241b16]/70">SANWARIYA INTERIORS AND WALLPAPERS operates this website from Surajgarh Bypass, Chidawa, Rajasthan. This policy applies to information collected through this website and its contact links.</p></section>
        <section><h2 className="font-serif text-3xl">Information we collect</h2><p className="mt-4 text-sm leading-7 text-[#241b16]/70">The website may collect anonymous interaction events when you choose “Accept analytics” in the consent banner. These events can include clicks on the primary CTA, WhatsApp contact button, navigation links, mobile menu, project cards, and gallery filters. Event records include the event name, page path, referring page, timestamp, and an optional non-personal label such as a project title.</p></section>
        <section><h2 className="font-serif text-3xl">Cookies and local storage</h2><p className="mt-4 text-sm leading-7 text-[#241b16]/70">The site stores your analytics preference in your browser’s local storage. If analytics is accepted, recent anonymous events may also be stored locally for the on-site dashboard. If analytics is declined, the tracking function does not store or send those events. You can clear browser storage through your browser settings or use the dashboard’s clear-data control.</p></section>
        <section><h2 className="font-serif text-3xl">How analytics is used</h2><p className="mt-4 text-sm leading-7 text-[#241b16]/70">Analytics is used to understand which contact and portfolio interactions are useful, improve mobile usability, and identify areas of the website that need refinement. The website does not need analytics to provide its core browsing, portfolio, or contact-link functionality.</p></section>
        <section><h2 className="font-serif text-3xl">External services and links</h2><p className="mt-4 text-sm leading-7 text-[#241b16]/70">The website may link to WhatsApp, Instagram, maps, or other external services. Those services operate under their own privacy policies and may collect information independently when you follow a link. The optional analytics endpoint, if configured by the site owner, receives only the consented event payload described above.</p></section>
        <section><h2 className="font-serif text-3xl">Contact</h2><p className="mt-4 text-sm leading-7 text-[#241b16]/70">For questions about this policy or a project inquiry, contact SANWARIYA INTERIORS AND WALLPAPERS through the phone or WhatsApp links on the website, or visit the studio at SURAJGARH BYPASS, CHIDAWA, RAJASTHAN.</p></section>
        <p className="border-t border-[#241b16]/10 pt-6 text-xs leading-6 text-[#241b16]/55">This page is general website information and should be reviewed with a qualified local privacy professional before launch if your business is subject to specific legal requirements.</p>
      </article>
    </main>
  );
}
