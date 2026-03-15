import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, Star } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-24 md:py-32 bg-muted/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img src="/images/about.jpg" alt="Véloire Hair specialist" className="w-full h-full object-cover" />
              </div>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -right-4 md:-right-8 bg-card border border-border rounded-2xl p-5 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/15 rounded-full flex items-center justify-center">
                    <Star size={18} className="text-primary fill-primary" />
                  </div>
                  <div>
                    <p className="font-heading text-2xl font-semibold leading-none">100+</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Happy Clients</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-body">About Véloire</p>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-6">
              Luxury Wigs,{" "}<span className="italic font-light">Tailored For You</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>At Véloire Hair, we believe every woman deserves to feel effortlessly beautiful. Each wig is treated as a work of art — crafted, fitted and styled with precision and love.</p>
              <p>From glueless installs to full custom builds, we offer a complete wig experience that prioritises your comfort, confidence and style.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8 mb-8">
              {[
                { label: "Custom Wigs", desc: "Made to order" },
                { label: "Revamps", desc: "Restore & refresh" },
                { label: "HD Lace", desc: "Undetectable finish" },
                { label: "Styling", desc: "Cuts & colours" },
              ].map(({ label, desc }) => (
                <div key={label} className="bg-card border border-border rounded-xl p-4">
                  <p className="font-semibold text-foreground text-sm">{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
              ))}
            </div>
            <Link to={createPageUrl("BookAppointment")}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-all group">
              Book a Session <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
