import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/hero.jpg" alt="Véloire Hair — luxury wigs" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }} className="max-w-xl">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
            <Sparkles size={13} className="text-primary" />
            <span className="text-primary text-xs tracking-[0.2em] uppercase font-medium">Premium Wig Specialist · UK</span>
          </motion.div>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05] mb-6">
            Where Hair Meets{" "}<span className="italic font-light text-primary">Luxury</span>
          </h1>
          <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-md font-body font-light">
            Custom wig making, flawless installs, full revamps & more. Every piece crafted to make you feel like the most beautiful version of yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={createPageUrl("BookAppointment")}
              className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-primary/90 transition-all duration-300 group shadow-lg shadow-primary/20">
              Book Your Appointment
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to={createPageUrl("Services")}
              className="inline-flex items-center justify-center gap-3 border border-white/25 text-white px-8 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-white/5 transition-all duration-300">
              Explore Services
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
