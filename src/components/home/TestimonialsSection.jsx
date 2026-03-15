import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Amara T.", text: "Absolutely obsessed with my new wig! The install was so natural, nobody believed it wasn't my real hair. Véloire is the only one I trust.", rating: 5 },
  { name: "Destiny O.", text: "Sent in my old wig for a revamp and got it back looking brand new. Better than new honestly. The curls are perfectly defined.", rating: 5 },
  { name: "Priya M.", text: "Got a custom unit made and I cried when I saw it. It was exactly what I pictured. The quality is incredible.", rating: 5 },
  { name: "Sade K.", text: "The attention to detail is unreal. My HD lace install looked completely undetectable. I've had people asking who does my hair ever since.", rating: 5 },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-primary text-sm tracking-[0.25em] uppercase mb-3 font-body">Testimonials</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">
            What Our <span className="italic font-light">Clients Say</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-7">
              <div className="flex gap-1 mb-4">
                {Array(t.rating).fill(0).map((_, j) => <Star key={j} size={14} className="text-primary fill-primary" />)}
              </div>
              <p className="text-foreground/80 leading-relaxed mb-5 font-body">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/40 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{t.name[0]}</span>
                </div>
                <p className="font-semibold text-sm text-foreground">{t.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
