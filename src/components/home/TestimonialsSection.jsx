import { motion } from "framer-motion";
import { Star, MessageCircle } from "lucide-react";

// Real customer messages extracted from the screenshot images
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

        {/* Scrollable row of screenshot cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group bg-card border border-border hover:border-primary/25 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/10"
            >
              {/* Screenshot */}
              <div className="relative overflow-hidden aspect-[3/2]">
                <img
                  src={t.image}
                  alt="Customer review screenshot"
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Quote pulled out below */}
              <div className="p-4">
                <div className="flex gap-1 mb-2">
                  {Array(5).fill(0).map((_, j) => (
                    <Star key={j} size={11} className="text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-foreground/75 text-sm leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-1.5 mt-3">
                  <MessageCircle size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Verified customer message</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
