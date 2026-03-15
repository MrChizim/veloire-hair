import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Instagram } from "lucide-react";

const GALLERY_ITEMS = [
  { id: 1,  src: "/images/portfolio12.jpg", alt: "Straight black wig" },
  { id: 2,  src: "/images/portfolio11.jpg", alt: "Sleek straight wig" },
  { id: 3,  src: "/images/portfolio13.jpg", alt: "Curly wig on stand" },
  { id: 4,  src: "/images/portfolio2.jpg",  alt: "Curly wig under neon sign" },
  { id: 5,  src: "/images/portfolio3.jpg",  alt: "Wavy frontal wig" },
  { id: 6,  src: "/images/portfolio4.jpg",  alt: "Blonde short wavy wig" },
  { id: 7,  src: "/images/portfolio5.jpg",  alt: "Auburn straight bob" },
  { id: 8,  src: "/images/portfolio6.jpg",  alt: "Natural curls wig" },
  { id: 9,  src: "/images/portfolio7.jpg",  alt: "Body wave wig" },
  { id: 10, src: "/images/portfolio8.jpg",  alt: "Kinky curly wig" },
  { id: 11, src: "/images/portfolio9.jpg",  alt: "Loose wavy wig" },
  { id: 12, src: "/images/portfolio10.jpg", alt: "Styled wig close-up" },
  { id: 13, src: "/images/portfolio1.jpg",  alt: "Deep wave wig" },
  { id: 14, src: "/images/revamp2.jpg",     alt: "Curly revamp before & after" },
  { id: 15, src: "/images/revamp3.jpg",     alt: "Straight revamp before & after" },
  { id: 16, src: "/images/revamp4.jpg",     alt: "Blonde bob trim before & after" },
  { id: 17, src: "/images/revamp5.jpg",     alt: "Highlight styling before & after" },
  { id: 18, src: "/images/revamp1.jpg",     alt: "Curly wig on white head" },
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = useCallback((idx) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() => setLightboxIndex((i) => (i === 0 ? GALLERY_ITEMS.length - 1 : i - 1)), []);
  const goNext = useCallback(() => setLightboxIndex((i) => (i === GALLERY_ITEMS.length - 1 ? 0 : i + 1)), []);

  const handleKeyDown = useCallback((e) => {
    if (lightboxIndex === null) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  return (
    <div className="pt-28 pb-24 min-h-screen" onKeyDown={handleKeyDown} tabIndex={-1}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-primary text-sm tracking-[0.25em] uppercase mb-3 font-body">Portfolio</p>
          <h1 className="font-heading text-4xl md:text-6xl font-semibold text-foreground mb-4">
            Our <span className="italic font-light">Work</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            Every wig tells a story. Browse our portfolio of custom builds, revamps and styled units.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: idx * 0.03 }}
              className="group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid mb-3 bg-card"
              onClick={() => openLightbox(idx)}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn size={26} className="text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-muted-foreground text-sm mb-4">See more on Instagram</p>
          <a
            href="https://instagram.com/veloire_hair"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-card border border-border text-foreground px-8 py-3 rounded-full text-sm font-medium hover:border-primary/50 hover:text-primary transition-all"
          >
            <Instagram size={15} /> @veloire_hair
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-5 right-5 text-white/70 hover:text-white z-10 bg-white/10 rounded-full p-2 transition-colors"
              onClick={closeLightbox}
            >
              <X size={20} />
            </button>

            <button
              className="absolute left-3 md:left-6 text-white/70 hover:text-white z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >
              <ChevronLeft size={22} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.2 }}
              className="max-w-3xl max-h-[88vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY_ITEMS[lightboxIndex]?.src}
                alt={GALLERY_ITEMS[lightboxIndex]?.alt}
                className="max-w-full max-h-[88vh] object-contain rounded-xl shadow-2xl"
              />
            </motion.div>

            <button
              className="absolute right-3 md:right-6 text-white/70 hover:text-white z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
            >
              <ChevronRight size={22} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs">
              {lightboxIndex + 1} / {GALLERY_ITEMS.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
