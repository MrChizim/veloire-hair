import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      {/* Background — use the wavy frontal (well-lit, subject-forward) */}
      <div className="absolute inset-0">
        <img
          src="/images/portfolio11.jpg"
          alt="Véloire Hair — book now"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
      >
        <p className="text-primary text-sm tracking-[0.25em] uppercase mb-5 font-body">Ready to Glow?</p>
        <h2 className="font-heading text-4xl md:text-6xl font-semibold text-white mb-6 leading-tight">
          Your Next Look{" "}
          <span className="italic font-light text-primary">Awaits</span>
        </h2>
        <p className="text-white/55 mb-10 leading-relaxed max-w-lg mx-auto">
          Book your appointment today or reach out on WhatsApp — and let us create something beautiful, just for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            to={createPageUrl("BookAppointment")}
            className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-10 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-primary/90 transition-all duration-300 group shadow-xl shadow-primary/25"
          >
            Book Now
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="https://wa.me/447404335619"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 border border-white/25 text-white px-10 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-white/8 hover:border-white/40 transition-all duration-300"
          >
            <MessageCircle size={15} /> WhatsApp Us
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-white/40 text-xs">
          <span className="flex items-center gap-1.5">
            <Phone size={11} />
            <a href="tel:+447404335619" className="hover:text-white/70 transition-colors">+44 7404 335619</a>
          </span>
          <span className="hidden sm:block w-px h-3 bg-white/20" />
          <a href="mailto:veloire.info@gmail.com" className="hover:text-white/70 transition-colors">veloire.info@gmail.com</a>
          <span className="hidden sm:block w-px h-3 bg-white/20" />
          <a href="https://instagram.com/veloire_hair" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">@veloire_hair</a>
        </div>
      </motion.div>
    </section>
  );
}
