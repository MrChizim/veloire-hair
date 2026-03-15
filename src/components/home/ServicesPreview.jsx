import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Scissors, RotateCcw, Sparkles, ArrowRight } from "lucide-react";

const highlights = [
  { icon: Sparkles, title: "Wig Installs", description: "Glueless, lace front, HD lace and full lace installs — done to perfection for a natural, undetectable look.", image: "/images/service1.jpg" },
  { icon: RotateCcw, title: "Wig Revamps", description: "Breathe new life into old wigs. Deep conditioning, restyling, bleaching knots, re-plucking and more.", image: "/images/service2.jpg" },
  { icon: Scissors, title: "Custom Wigs", description: "Hand-crafted to your exact measurements, density, texture and style. Truly one of a kind.", image: "/images/service3.jpg" },
];

export default function ServicesPreview() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-primary text-sm tracking-[0.25em] uppercase mb-3 font-body">What We Do</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">
            Our <span className="italic font-light">Specialities</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.15 }} className="group">
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/5]">
                <img src={item.image} alt={item.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm p-3 rounded-xl border border-primary/20">
                  <item.icon size={20} className="text-primary" />
                </div>
              </div>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-14">
          <Link to={createPageUrl("Services")} className="inline-flex items-center gap-2 text-primary text-sm font-medium tracking-wide hover:gap-3 transition-all duration-300">
            View All Services <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
