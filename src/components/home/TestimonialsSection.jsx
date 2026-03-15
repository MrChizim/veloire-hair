import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageCircle, X, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "Hey hun just received the wig 😩 it's sooo cute also the goodies!!!  Thank u love !!!",
    image: "/images/review1.jpg",
  },
  {
    text: "Thank you very much for the wig and recommendation. My gf loves it",
    image: "/images/review2.jpg",
  },
  {
    text: "Heyy, yes it has been delivered. I absolutely love the wig. Thank you 🥰💜",
    image: "/images/review3.jpg",
  },
  {
    text: "I received the hair x. Thank you very much",
    image: "/images/review4.jpg",
  },
  {
    text: "I check the hair omg really nice thanks a lot, can't wait to wear it",
    image: "/images/review5.jpg",
  },
];

export default function TestimonialsSection() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setLightboxIndex((i) => (i + 1) % testimonials.length);

  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary text-sm tracking-[0.25em] uppercase mb-3 font-body">Reviews</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">
            Happy <span className="italic font-light">Clients</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-sm mx-auto">Real messages from real customers. No edits, no filters.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group bg-card border border-border hover:border-primary/25 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
              onClick={() => openLightbox(i)}
            >
              {/* Screenshot */}
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={t.image}
                  alt="Customer review screenshot"
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full border border-white/20">Tap to read</span>
                </div>
              </div>

              <div className="p-2.5">
                <div className="flex gap-0.5 mb-1.5">
                  {Array(5).fill(0).map((_, j) => (
                    <Star key={j} size={9} className="text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-foreground/70 text-[10px] leading-relaxed italic line-clamp-2">"{t.text}"</p>
              </div>
            </motion.div>
          ))}
        </div>
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
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            >
              <X size={18} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronLeft size={20} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[85vh] max-w-xs w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={testimonials[lightboxIndex].image}
                alt="Customer review"
                className="w-full h-full object-contain rounded-xl"
              />
              <div className="mt-3 text-center px-2">
                <div className="flex gap-1 justify-center mb-1.5">
                  {Array(5).fill(0).map((_, j) => (
                    <Star key={j} size={12} className="text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-white/70 text-sm italic">"{testimonials[lightboxIndex].text}"</p>
                <div className="flex items-center gap-1.5 justify-center mt-2">
                  <MessageCircle size={11} className="text-white/40" />
                  <span className="text-xs text-white/40">Verified customer message</span>
                </div>
              </div>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronRight size={20} />
            </button>

            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs">
              {lightboxIndex + 1} / {testimonials.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
