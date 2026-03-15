import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const posts = [
  "/images/ig1.jpg",
  "/images/ig2.jpg",
  "/images/ig3.jpg",
  "/images/ig4.jpg",
  "/images/ig5.jpg",
  "/images/ig6.jpg",
];

export default function InstagramSection() {
  return (
    <section className="py-24 md:py-32 bg-muted/10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="text-primary text-sm tracking-[0.25em] uppercase mb-3 font-body">Follow Along</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">
            @<span className="italic font-light">veloire_hair</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
          {posts.map((src, i) => (
            <motion.a key={i} href="https://instagram.com/veloire_hair" target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group relative aspect-square overflow-hidden rounded-xl block bg-card">
              <img src={src} alt={`Véloire post ${i + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram size={28} className="text-white" />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">
          <a href="https://instagram.com/veloire_hair" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-card border border-border text-foreground px-8 py-3 rounded-full text-sm font-medium hover:border-primary/50 hover:text-primary transition-all">
            <Instagram size={16} /> Follow @veloire_hair
          </a>
        </motion.div>
      </div>
    </section>
  );
}
