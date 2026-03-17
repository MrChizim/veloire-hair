import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";

const transformations = [
  { image: "/images/revamp2.jpg" },
  { image: "/images/revamp3.jpg" },
  { image: "/images/revamp4.jpg" },
  { image: "/images/revamp5.jpg" },
];

export default function BeforeAfterSection() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i - 1 + transformations.length) % transformations.length);
  const next = () => setLightboxIndex((i) => (i + 1) % transformations.length);

  return (
    <section className="py-20 md:py-28 overflow-hidden relative bg-background">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-primary text-sm tracking-[0.25em] uppercase mb-3 font-body">Transformations</p>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground leading-tight">
              Before &amp; <span className="italic font-light">After</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
            See what a Véloire revamp can do. Every wig sent back looking — and feeling — brand new.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {transformations.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-card border border-border hover:border-primary/30 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
              onClick={() => openLightbox(i)}
            >
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={item.image}
                  alt={`Transformation ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white/80 text-[9px] font-medium px-2 py-0.5 rounded-full border border-white/15">Before</span>
                <span className="absolute bottom-2 left-2 bg-primary/85 backdrop-blur-sm text-primary-foreground text-[9px] font-medium px-2 py-0.5 rounded-full">After</span>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-white/20">Tap to expand</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to={`${createPageUrl("BookAppointment")}?service=r1`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-all group"
          >
            Book a Revamp <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            >
              <X size={18} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[90vh] max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={transformations[lightboxIndex].image}
                alt={transformations[lightboxIndex].title}
                className="w-full h-full object-contain rounded-xl"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-black/60 backdrop-blur-sm text-white/80 text-xs px-2.5 py-1 rounded-full border border-white/15">Before (top)</span>
                <span className="bg-primary/85 backdrop-blur-sm text-primary-foreground text-xs px-2.5 py-1 rounded-full">After (bottom)</span>
              </div>
              <p className="text-white/50 text-center text-xs mt-3">Top: Before · Bottom: After</p>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronRight size={20} />
            </button>

            {/* Counter */}
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs">
              {lightboxIndex + 1} / {transformations.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
