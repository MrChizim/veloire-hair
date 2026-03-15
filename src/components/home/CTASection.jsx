import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/cta.jpg" alt="Véloire Hair — book now" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/50 via-transparent to-transparent" />
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-body">Ready?</p>
        <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-6">
          Your Next Look{" "}<span className="italic font-light text-primary">Awaits</span>
        </h2>
        <p className="text-white/60 mb-10 leading-relaxed">
          Book your appointment today and let us create something beautiful, just for you.
        </p>
        <Link to={createPageUrl("BookAppointment")}
          className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-primary/90 transition-all duration-300 group shadow-xl shadow-primary/20">
          Book Now
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </section>
  );
}
