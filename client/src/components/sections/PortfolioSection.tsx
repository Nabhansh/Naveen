import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { portfolioProjects } from "@/data/interiorData";
import { trackEvent } from "@/lib/analytics";
import { PortfolioProject } from "@/types";
import { ChevronRight, Search, MapPin, Calendar, Maximize2, Layers, Tag, X, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [showBefore, setShowBefore] = useState<boolean>(false);
  const [imageStates, setImageStates] = useState<Record<string, "loading" | "ready" | "error">>({});

  const categories = ["All", "Living Room", "Bedroom", "Ceiling", "Commercial"];
  const localFallbackByCategory: Record<string, string> = {
    "Living Room": "/images/portfolio/p2-after.jpg",
    Bedroom: "/images/portfolio/p1-after.jpg",
    Ceiling: "/images/portfolio/p5-after.jpg",
    Commercial: "/images/portfolio/p3-after.jpg",
  };

  const filteredProjects = portfolioProjects.filter((project) => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
        >
          <div>
            <motion.p variants={fadeUp} className="text-primary uppercase tracking-widest text-xs mb-3 font-mono">
              Recent Interior Installations
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif text-foreground">
              Selected <em>Projects</em>
            </motion.h2>
          </div>

          {/* Search Filter Bar */}
          <motion.div variants={fadeUp} className="w-full md:w-auto flex items-center gap-2 bg-background border border-border px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by location, material..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none w-full md:w-48 font-mono"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="min-h-11 min-w-11 text-muted-foreground hover:text-foreground">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </motion.div>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 pb-2 border-b border-border/60">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); trackEvent("gallery_filter_change", cat); }}
              className={`min-h-11 px-4 py-2 text-xs uppercase tracking-wider transition-all font-mono rounded-none ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground font-semibold shadow-md"
                  : "bg-background/80 text-muted-foreground hover:bg-background hover:text-foreground border border-border/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Project Gallery */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          key={activeCategory}
          className="columns-1 gap-8 md:columns-2 md:gap-10 lg:columns-3"
        >
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              className="group mb-8 break-inside-avoid cursor-pointer bg-background border border-border/60 p-4 shadow-sm hover:shadow-2xl transition-all duration-300"
              data-testid={`card-portfolio-${i}`}
              onClick={() => {
                setSelectedProject(project);
                trackEvent("gallery_project_open", project.title);
                setShowBefore(false);
              }}
              whileHover={{ y: -6 }}
            >
              <div className={`relative overflow-hidden ${i % 3 === 1 ? "aspect-[4/5]" : i % 3 === 2 ? "aspect-[5/6]" : "aspect-[4/3]"} mb-5 bg-neutral-900`}>
                {imageStates[project.id] !== "ready" && (
                  <div className="absolute inset-0 z-[1] flex items-center justify-center bg-[#2a211c]" role="status" aria-label={`Loading ${project.title}`}>
                    {imageStates[project.id] === "error" ? (
                      <span className="px-4 text-center text-[10px] uppercase tracking-[0.16em] text-[#f0b08f]/80">Image unavailable</span>
                    ) : (
                      <div className="w-2/3 space-y-3" aria-hidden="true">
                        <div className="h-2 w-1/3 animate-pulse bg-[#f0b08f]/35" />
                        <div className="h-2 w-full animate-pulse bg-[#f7f0e6]/15" />
                        <div className="h-2 w-4/5 animate-pulse bg-[#f7f0e6]/10" />
                      </div>
                    )}
                  </div>
                )}
                <img
                  src={project.src}
                  alt={project.title}
                  loading="eager"
                  decoding="async"
                  onLoad={() => setImageStates((current) => ({ ...current, [project.id]: "ready" }))}
                  onError={(e) => {
                    const fallback = localFallbackByCategory[project.category] || "/images/portfolio/p2-after.jpg";
                    if (e.currentTarget.src !== `${window.location.origin}${fallback}`) {
                      setImageStates((current) => ({ ...current, [project.id]: "loading" }));
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = fallback;
                    } else {
                      setImageStates((current) => ({ ...current, [project.id]: "error" }));
                    }
                  }}
                  className={`w-full h-full object-cover transition-[transform,opacity] duration-700 ${imageStates[project.id] === "ready" ? "opacity-100 group-hover:scale-105" : "opacity-0"}`}
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-black/75 text-white font-mono text-[10px] uppercase tracking-wider backdrop-blur-md">
                  {project.tag}
                </div>
                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/80 text-white text-xs font-mono flex items-center gap-1.5 backdrop-blur-md">
                  <Maximize2 className="w-3 h-3 text-primary" />
                  <span>Inspect Details</span>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-serif text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-primary" />
                      {project.location}
                    </span>
                    <span>•</span>
                    <span>{project.areaSqFt} sq.ft</span>
                  </div>
                </div>

                <div className="w-9 h-9 border border-border flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-300">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-background border border-dashed border-border p-8">
            <p className="text-muted-foreground font-serif text-lg">No interior projects found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 text-xs font-mono text-primary underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Project Inspection Lightbox Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent className="sm:max-w-2xl bg-background border-border p-0 overflow-hidden rounded-none shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 bg-foreground text-background flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-mono text-primary">
                  {selectedProject.tag} • {selectedProject.location}
                </span>
                <DialogTitle className="text-2xl font-serif text-background mt-1">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Detailed inspection for {selectedProject.title} project
                </DialogDescription>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="min-h-11 min-w-11 p-2 text-background/60 hover:text-background transition-colors"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Image Toggle / Before-After Preview */}
              <div className="relative aspect-video overflow-hidden border border-border bg-neutral-900">
                <img
                  src={showBefore && selectedProject.beforeSrc ? selectedProject.beforeSrc : selectedProject.src}
                  alt={selectedProject.title}
                  onError={(e) => {
                    const fallback = localFallbackByCategory[selectedProject.category] || "/images/portfolio/p2-after.jpg";
                    if (e.currentTarget.src !== `${window.location.origin}${fallback}`) {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = fallback;
                    }
                  }}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                
                {selectedProject.beforeSrc && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/80 p-1 border border-white/20 rounded text-white text-[11px] font-mono">
                    <button
                      onClick={() => setShowBefore(false)}
                      className={`min-h-10 px-2 py-0.5 transition-colors ${!showBefore ? "bg-primary text-black font-bold" : "hover:text-primary"}`}
                    >
                      After (Finished)
                    </button>
                    <button
                      onClick={() => setShowBefore(true)}
                      className={`min-h-10 px-2 py-0.5 transition-colors ${showBefore ? "bg-amber-500 text-black font-bold" : "hover:text-amber-400"}`}
                    >
                      Before Site
                    </button>
                  </div>
                )}
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-secondary/40 border border-border/60 text-xs font-mono">
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase">Location</span>
                  <span className="text-foreground font-semibold">{selectedProject.location}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase">Carpet Area</span>
                  <span className="text-foreground font-semibold">{selectedProject.areaSqFt} sq.ft</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase">Year Completed</span>
                  <span className="text-foreground font-semibold">{selectedProject.completionYear}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase">Est. Investment</span>
                  <span className="text-foreground font-semibold text-primary">{selectedProject.budgetRange}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-primary font-mono mb-2">Project Brief</h4>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Materials Used */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-primary font-mono mb-2">Materials & Finishes Specification</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.materials.map((mat) => (
                    <span key={mat} className="px-2.5 py-1 bg-secondary text-foreground text-xs font-mono border border-border/60 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Client Feedback */}
              {selectedProject.clientReview && (
                <div className="p-4 bg-primary/10 border-l-2 border-primary text-xs font-serif italic text-foreground leading-relaxed">
                  "{selectedProject.clientReview}"
                  <span className="block not-italic font-mono text-[10px] text-muted-foreground mt-1">— Homeowner Verification</span>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
