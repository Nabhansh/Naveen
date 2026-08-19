/* Desert Modernism: this 3D showcase uses architectural planes, warm material depth, and quiet motion rather than neon effects. */
import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Layers3, Rotate3D, Check } from "lucide-react";

const materialLayers = [
  {
    label: "Installation / 01",
    name: "Ceiling work in progress",
    image: "/images/sanwariya-ceiling-worker.jpg",
    accent: "#c85a32",
    materialImage: "/images/sanwariya-material-02.jpg",
  },
  {
    label: "Texture / 02",
    name: "Fluted wall panel",
    image: "/images/portfolio/p2-after.jpg",
    accent: "#c85a32",
    materialImage: "/images/portfolio/p5-after.jpg",
  },
  {
    label: "Warmth / 03",
    name: "Bedroom material study",
    image: "/images/portfolio/p1-after.jpg",
    accent: "#d99a76",
    materialImage: "/images/portfolio/p4-after.jpg",
  },
  {
    label: "Light / 04",
    name: "Commercial composition",
    image: "/images/portfolio/p3-after.jpg",
    accent: "#f0c29f",
    materialImage: "/images/portfolio/p6-after.jpg",
  },
];

export function ThreeDShowcase() {
  const [layerIndex, setLayerIndex] = useState(0);
  const [isExploring, setIsExploring] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [-8, 8]), { stiffness: 180, damping: 22 });
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [7, -7]), { stiffness: 180, damping: 22 });
  const activeLayer = materialLayers[layerIndex];

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isExploring) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width * 2 - 1);
    pointerY.set((event.clientY - rect.top) / rect.height * 2 - 1);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const handleLayerClick = () => {
    setLayerIndex((current) => (current + 1) % materialLayers.length);
  };

  const handleExploreClick = () => {
    setIsExploring((current) => {
      if (current) resetPointer();
      return !current;
    });
  };

  return (
    <section id="3d-studio" className="relative overflow-hidden bg-[#201914] px-6 py-24 text-[#f7f0e6] sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-[1280px] items-center gap-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
        <div className="max-w-xl">
          <div className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[#d99a76]"><span className="h-px w-12 bg-[#d99a76]" /><span>Spatial preview · 03D</span></div>
          <h2 className="font-serif text-5xl leading-[.94] tracking-[-.04em] sm:text-6xl lg:text-7xl">See the room<em className="block text-[#d99a76]">from every angle.</em></h2>
          <p className="mt-7 max-w-md text-sm leading-7 text-[#f7f0e6]/68 sm:text-base">A tactile 3D study of texture, depth, and light — the same layers we bring together when shaping a wall, lounge, or bedroom.</p>
          <div className="mt-8 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.18em]">
            <button type="button" onClick={handleLayerClick} className={`inline-flex min-h-11 items-center gap-2 border px-3 py-2 transition-all ${layerIndex > 0 ? "border-[#d99a76] bg-[#d99a76]/15 text-[#f7f0e6]" : "border-[#f7f0e6]/20 text-[#f7f0e6]/60 hover:border-[#d99a76] hover:text-[#f7f0e6]"}`} aria-label={`Switch wall layer. Current layer: ${activeLayer.name}`}>
              {layerIndex > 0 ? <Check className="h-3.5 w-3.5 text-[#d99a76]" /> : <Layers3 className="h-3.5 w-3.5 text-[#d99a76]" />} Wall layers
            </button>
            <button type="button" onClick={handleExploreClick} className={`inline-flex min-h-11 items-center gap-2 border px-3 py-2 transition-all ${isExploring ? "border-[#d99a76] bg-[#c85a32] text-white" : "border-[#f7f0e6]/20 text-[#f7f0e6]/60 hover:border-[#d99a76] hover:text-[#f7f0e6]"}`} aria-pressed={isExploring}>
              <Rotate3D className="h-3.5 w-3.5 text-[#d99a76]" /> {isExploring ? "Exploring" : "Move to explore"}
            </button>
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-[#f7f0e6]/45" aria-live="polite">{activeLayer.label} · {activeLayer.name}{isExploring ? " · pointer mode on" : ""}</p>
        </div>

        <div className={`relative min-h-[410px] [perspective:1200px] sm:min-h-[500px] ${isExploring ? "cursor-crosshair" : "cursor-default"}`} onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
          <motion.div style={{ rotateX: isExploring ? rotateX : 0, rotateY: isExploring ? rotateY : 0 }} className="relative mx-auto h-[330px] w-full max-w-[640px] transform-gpu [transform-style:preserve-3d] sm:h-[410px]">
            <div className="absolute inset-x-8 bottom-0 h-10 bg-[#0f0c0a] shadow-[0_28px_45px_rgba(0,0,0,.45)] [transform:rotateX(72deg)_translateZ(-18px)] sm:inset-x-12" />
            <div className="absolute inset-x-10 top-6 h-[250px] border border-[#d99a76]/40 bg-[#37261d] [transform:translateZ(-50px)] sm:inset-x-16 sm:h-[310px]" />
            <div className="absolute left-0 top-0 h-[250px] w-[72%] overflow-hidden border border-[#f7f0e6]/18 bg-[#5a3829] shadow-2xl [transform:translateZ(30px)] sm:h-[310px]">
              <motion.img key={activeLayer.image} initial={{ opacity: 0.35, scale: 1.04 }} animate={{ opacity: 0.85, scale: 1 }} transition={{ duration: 0.45 }} src={activeLayer.image} alt={`${activeLayer.name} by Sanwariya Interiors`} className="h-full w-full object-cover mix-blend-screen" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2d1b13]/80 via-transparent to-[#f4c2a0]/10" />
              <div className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.22em] text-white/70">{activeLayer.label}</div>
            </div>
            <div className="absolute bottom-5 right-0 h-[180px] w-[44%] overflow-hidden border bg-cover bg-center shadow-2xl [transform:rotateY(-24deg)_translateZ(50px)] sm:h-[235px]" style={{ backgroundColor: activeLayer.accent, borderColor: activeLayer.accent, backgroundImage: activeLayer.materialImage ? `url(${activeLayer.materialImage})` : undefined }}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#24150f]/75 via-transparent to-[#f0b08f]/10" />
              <div className="absolute inset-0 opacity-45" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent 0, transparent 18px, rgba(35,20,14,.28) 19px, transparent 21px)" }} />
              <div className="absolute inset-x-5 bottom-5 border-t border-white/40 pt-3 text-[10px] uppercase tracking-[0.22em] text-white/85">Material / 02</div>
            </div>
            <div className="absolute right-[22%] top-[12%] h-20 w-20 rounded-full bg-[#f3d4b8]/55 blur-2xl [transform:translateZ(65px)]" />
            <div className="absolute left-[12%] bottom-[-30px] flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#f7f0e6]/55 [transform:translateZ(80px)]"><ArrowUpRight className="h-4 w-4 text-[#d99a76]" /> {isExploring ? "Move across the composition" : "Activate Move to explore"}</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
