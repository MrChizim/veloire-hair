import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, Sparkles } from "lucide-react";

const transformations = [
  {
    image: "/images/revamp2.jpg",
    title: "Curly Revamp",
    services: ["Deep Wash", "Styling", "Plucking"],
  },
  {
    image: "/images/revamp3.jpg",
    title: "Straight Revamp",
    services: ["Shampooing", "Deep Conditioning", "Styling"],
  },
  {
    image: "/images/revamp4.jpg",
    title: "Blonde Bob Trim",
    services: ["Trimming", "Styling"],
  },
  {
    image: "/images/revamp5.jpg",
    title: "Highlight Styling",
    services: ["Styling", "Trimming"],
  },
];

export default function BeforeAfterSection() {
  return (
    <section className="py-24 md:py-32 overflow-hidden relative bg-background">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {transformations.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-card border border-border hover:border-primary/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20"
            >
              {/* The collage image is already before (top) / after (bottom) in one shot */}
              <div className="relative overflow-hidden aspect-[4/5]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Before label top-left, After label bottom-left */}
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white/80 text-[10px] font-medium px-2.5 py-1 rounded-full border border-white/15 pointer-events-none">Before</span>
                <span className="absolute bottom-3 left-3 bg-primary/85 backdrop-blur-sm text-primary-foreground text-[10px] font-medium px-2.5 py-1 rounded-full pointer-events-none">After</span>
              </div>

              {/* Card footer */}
              <div className="p-4">
                <h3 className="font-heading text-base font-semibold text-foreground mb-2">{item.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {item.services.map((s) => (
                    <span key={s} className="text-[11px] bg-card border border-border text-muted-foreground px-2 py-0.5 rounded-full">
                      {s}
                    </span>
                  ))}
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
          className="text-center mt-12"
        >
          <Link
            to={`${createPageUrl("BookAppointment")}?service=r1`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-all group"
          >
            Book a Revamp <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
