/* Desert Modernism: a warm, editorial contact room with generous field spacing, direct contact paths, and no unnecessary form chrome. */
import { FormEvent, useState } from "react";
import { ArrowLeft, CheckCircle2, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "wouter";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_HREF, STUDIO_ADDRESS, WHATSAPP_HREF } from "@/data/interiorData";
import { trackEvent } from "@/lib/analytics";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackEvent("contact_form_submit");
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#f4efe8] text-[#241b16]">
      <header className="border-b border-[#241b16]/10 bg-[#f4efe8]/95 px-6 py-5 sm:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div><p className="text-[10px] uppercase tracking-[0.24em] text-[#c85a32]">SANWARIYA INTERIORS AND WALLPAPERS</p><h1 className="mt-1 font-serif text-3xl tracking-tight sm:text-5xl">Contact Us</h1></div>
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 border border-[#241b16]/20 px-4 text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-[#c85a32] hover:text-[#c85a32]"><ArrowLeft className="h-4 w-4" /> Website</Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:px-10 sm:py-16 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <section className="space-y-8">
          <div><p className="text-[10px] uppercase tracking-[0.22em] text-[#c85a32]">Start a conversation</p><h2 className="mt-3 max-w-md font-serif text-5xl leading-[.96] tracking-[-0.04em] sm:text-6xl">Let’s shape a room that feels like you.</h2><p className="mt-6 max-w-md text-sm leading-7 text-[#241b16]/70">Tell us what you are imagining. We will use your note to understand the project before we speak.</p></div>
          <div className="space-y-4 border-t border-[#241b16]/10 pt-6 text-sm"><a href={PHONE_HREF} className="flex min-h-11 items-center gap-3 hover:text-[#c85a32]"><Phone className="h-4 w-4 text-[#c85a32]" /> {PHONE_DISPLAY}</a><a href={`${WHATSAPP_HREF}?text=Hello%20SANWARIYA%20Interiors,%20I%20would%20like%20to%20discuss%20a%20project.`} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3 hover:text-[#c85a32]"><MessageCircle className="h-4 w-4 text-[#c85a32]" /> WhatsApp the studio</a><p className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#c85a32]" /> {STUDIO_ADDRESS}</p><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3 hover:text-[#c85a32]"><Instagram className="h-4 w-4 text-[#c85a32]" /> {INSTAGRAM_HANDLE}</a></div>
        </section>

        <section className="border border-[#241b16]/10 bg-white/65 p-5 shadow-sm sm:p-8"><p className="text-[10px] uppercase tracking-[0.2em] text-[#c85a32]">Project enquiry</p>{submitted ? <div className="flex min-h-[420px] flex-col items-center justify-center text-center"><CheckCircle2 className="h-10 w-10 text-[#c85a32]" /><h2 className="mt-5 font-serif text-3xl">Your note is ready.</h2><p className="mt-3 max-w-sm text-sm leading-6 text-[#241b16]/65">Thank you for sharing the brief. For the fastest response, continue the conversation on WhatsApp or call the studio directly.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><a href={`${WHATSAPP_HREF}?text=Hello%20SANWARIYA%20Interiors,%20I%20have%20a%20project%20enquiry.`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 bg-[#c85a32] px-5 text-[10px] uppercase tracking-[0.16em] text-white">Open WhatsApp</a><button type="button" onClick={() => setSubmitted(false)} className="min-h-11 border border-[#241b16]/20 px-5 text-[10px] uppercase tracking-[0.16em]">Send another</button></div></div> : <form onSubmit={submit} className="mt-7 space-y-5"><div className="grid gap-5 sm:grid-cols-2"><label className="space-y-2 text-xs"><span className="uppercase tracking-[0.14em] text-[#241b16]/65">Name</span><input required name="name" autoComplete="name" className="min-h-12 w-full border border-[#241b16]/15 bg-transparent px-3 outline-none transition-colors focus:border-[#c85a32]" /></label><label className="space-y-2 text-xs"><span className="uppercase tracking-[0.14em] text-[#241b16]/65">Phone</span><input required name="phone" type="tel" autoComplete="tel" className="min-h-12 w-full border border-[#241b16]/15 bg-transparent px-3 outline-none transition-colors focus:border-[#c85a32]" /></label></div><label className="block space-y-2 text-xs"><span className="uppercase tracking-[0.14em] text-[#241b16]/65">Email</span><input required name="email" type="email" autoComplete="email" className="min-h-12 w-full border border-[#241b16]/15 bg-transparent px-3 outline-none transition-colors focus:border-[#c85a32]" /></label><label className="block space-y-2 text-xs"><span className="uppercase tracking-[0.14em] text-[#241b16]/65">Project type</span><select required name="projectType" className="min-h-12 w-full border border-[#241b16]/15 bg-transparent px-3 outline-none transition-colors focus:border-[#c85a32]"><option value="">Choose one</option><option>Residential interior</option><option>Wallpaper and wall panels</option><option>False ceiling</option><option>Commercial space</option></select></label><label className="block space-y-2 text-xs"><span className="uppercase tracking-[0.14em] text-[#241b16]/65">Your brief</span><textarea required name="message" rows={5} className="w-full resize-y border border-[#241b16]/15 bg-transparent px-3 py-3 outline-none transition-colors focus:border-[#c85a32]" placeholder="Tell us about the room, timeline, and style you have in mind." /></label><button type="submit" className="inline-flex min-h-12 w-full items-center justify-center bg-[#c85a32] px-6 text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#241b16]">Send project enquiry</button><p className="text-xs leading-5 text-[#241b16]/50">This form currently shows a confirmation on the device. Connect it to a form endpoint or email service before launch to receive submissions remotely.</p></form>}</section>
      </div>
    </main>
  );
}
