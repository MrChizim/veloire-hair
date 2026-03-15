import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Background — clean curly wig on plain wall, no neon sign */}
      <div className="absolute inset-0">
        <img
          src="/images/portfolio12.jpg"
          alt="Véloire Hair — luxury wig"
          className="w-full h-full object-cover object-center"
        />
        {/* Mobile: strong overlay so text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90 md:hidden" />
        {/* Desktop: fade from left */}
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 hidden md:block bg-gradient-to-t from-background/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 w-full">
        <div className="max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-7"
          >
            <Sparkles size={12} className="text-primary" />
            <span className="text-primary text-xs tracking-[0.2em] uppercase font-medium">Premium Wig Specialist · UK</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white leading-[0.97] mb-6 tracking-tight"
          >
            Where<br />
            Hair Meets<br />
            <span className="italic font-light text-primary">Luxury</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white/65 text-base leading-relaxed mb-9 font-body max-w-sm"
          >
            100% human hair wigs — custom built, revamped &amp; styled to perfection. Every piece crafted to make you feel like the most beautiful version of yourself.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              to={createPageUrl("BookAppointment")}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-primary/90 transition-all duration-300 group shadow-lg shadow-primary/25"
            >
              Book Your Appointment
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to={createPageUrl("Services")}
              className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-7 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-white/8 hover:border-white/40 transition-all duration-300"
            >
              View Services
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
