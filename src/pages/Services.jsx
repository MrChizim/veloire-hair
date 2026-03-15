import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { entities } from "@/api/entities";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Clock, ArrowRight, Scissors, Info, Zap, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const FALLBACK_SERVICES = [
  // Wig Revamps
  { id: "r1", name: "Straight Wig Revamp", description: "Shampooing, deep conditioning, steam treatment & styling — for straight wigs", price: 30, duration: 90, category: "revamps" },
  { id: "r2", name: "Curly Wig Revamp", description: "Shampooing, deep conditioning, steam treatment & styling — for curly wigs", price: 35, duration: 90, category: "revamps" },
  { id: "r3", name: "Revamp + Pin Curls", description: "Full revamp service with added pin curl styling finish", price: 40, duration: 120, category: "revamps" },
  // Wig Services (add-ons)
  { id: "s1", name: "Wig Styling", description: "Single styling service — cut, set or finish. Can be added to a revamp.", price: 20, duration: 60, category: "styling" },
  { id: "s2", name: "Closure Replacement", description: "Replace a worn closure with a fresh one for a brand-new look", price: 35, duration: 60, category: "repairs" },
  { id: "s3", name: "Frontal Replacement", description: "Replace your frontal for a seamless, undetectable finish", price: 40, duration: 60, category: "repairs" },
  { id: "s4", name: "Wig Band Replacement", description: "Quick elastic band replacement to restore fit and comfort", price: 5, duration: 30, category: "repairs" },
  // Custom builds
  { id: "c1", name: "100% Human Hair Wig", description: "Bespoke human hair wig built to your exact specs — length, density, texture & style", price: 0, duration: 0, category: "custom" },
  { id: "c2", name: "Hair Blend Wig", description: "Premium blended hair wig for maximum volume and natural movement", price: 0, duration: 0, category: "custom" },
  { id: "c3", name: "Closure Wig", description: "Custom made closure wig with realistic scalp illusion", price: 0, duration: 0, category: "custom" },
  { id: "c4", name: "Frontal Wig", description: "Full frontal wig build — HD or regular lace, customised to you", price: 0, duration: 0, category: "custom" },
  // Other
  { id: "o1", name: "Consultation", description: "Free 1-on-1 consultation to discuss your wig goals and get a quote", price: 0, duration: 30, category: "other" },
];

const CATEGORIES = [
  { key: "all", label: "All Services" },
  { key: "revamps", label: "Revamps" },
  { key: "styling", label: "Styling" },
  { key: "repairs", label: "Repairs" },
  { key: "custom", label: "Custom Builds" },
  { key: "other", label: "Other" },
];

const EXPRESS_SERVICES = [
  { label: "72-hour turnaround", sub: "Working days only", price: 20 },
  { label: "48-hour turnaround", sub: "Including weekends", price: 25 },
];

const NOTES = [
  "It takes 7–14 working days to return your wig (standard)",
  "Time frame starts after payment is confirmed",
  "Full payment required upfront",
  "Book via WhatsApp, Instagram or this website",
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["veloire_services"],
    queryFn: async () => {
      try {
        const data = await entities.Service.list();
        return data.length > 0 ? data : FALLBACK_SERVICES;
      } catch {
        return FALLBACK_SERVICES;
      }
    },
  });

  const filtered = activeCategory === "all"
    ? services
    : services.filter((s) => s.category === activeCategory);

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-[0.25em] uppercase mb-3 font-body">Price List</p>
          <h1 className="font-heading text-4xl md:text-6xl font-semibold text-foreground mb-4">
            Our <span className="italic font-light">Services</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            From bespoke custom builds to full revamps — everything your hair dreams are made of.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services list */}
        {isLoading ? (
          <div className="space-y-3">
            {Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-xl" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl py-20 text-center">
            <Scissors size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No services in this category yet.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {filtered.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-card border border-border hover:border-primary/30 rounded-2xl px-6 py-5 flex items-center justify-between gap-6 transition-all duration-300 hover:shadow-md hover:shadow-primary/5"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-heading text-xl font-semibold text-foreground">{service.name}</h3>
                      {service.category && (
                        <span className="text-xs bg-card border border-border text-muted-foreground px-2.5 py-0.5 rounded-full capitalize">
                          {service.category}
                        </span>
                      )}
                    </div>
                    {service.description && (
                      <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{service.description}</p>
                    )}
                    {service.duration > 0 && (
                      <p className="text-xs text-muted-foreground/70 mt-1.5 flex items-center gap-1">
                        <Clock size={11} /> {service.duration} mins
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right">
                      <p className="font-heading text-2xl font-semibold text-foreground">
                        {service.price === 0 ? (service.category === "other" ? "Free" : "Quote") : `£${service.price}`}
                      </p>
                      {service.price === 0 && service.category !== "other" && (
                        <p className="text-xs text-muted-foreground mt-0.5">Price on request</p>
                      )}
                    </div>
                    <Link
                      to={`${createPageUrl("BookAppointment")}?service=${service.id}`}
                      className="text-xs bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors whitespace-nowrap flex items-center gap-1.5 group"
                    >
                      Book <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Express Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14"
        >
          <div className="bg-card border border-primary/20 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <Zap size={18} className="text-primary" />
              <h3 className="font-heading text-2xl font-semibold">Express Services</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EXPRESS_SERVICES.map((exp) => (
                <div key={exp.label} className="bg-background/50 border border-border rounded-xl p-5 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{exp.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{exp.sub}</p>
                  </div>
                  <p className="font-heading text-2xl font-semibold text-primary">+£{exp.price}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 bg-card border border-border rounded-2xl p-8"
        >
          <div className="flex items-center gap-2 mb-5">
            <Info size={16} className="text-muted-foreground" />
            <h3 className="font-heading text-lg font-semibold text-foreground">Please Note</h3>
          </div>
          <ul className="space-y-2.5">
            {NOTES.map((note) => (
              <li key={note} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="text-primary mt-0.5 flex-shrink-0">–</span>
                {note}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Policy reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6"
        >
          <div className="bg-card border border-border rounded-2xl p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <FileText size={16} className="text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Please read our policies before booking</p>
                <p className="text-xs text-muted-foreground mt-0.5">Turnaround times, payment, returns & more</p>
              </div>
            </div>
            <Link
              to={createPageUrl("Policies")}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-xs font-medium hover:bg-primary/90 transition-colors whitespace-nowrap flex-shrink-0"
            >
              View Policies <ArrowRight size={12} />
            </Link>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14 bg-card border border-border rounded-2xl p-10"
        >
          <h3 className="font-heading text-3xl font-semibold mb-3">Not sure what you need?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Book a free consultation and we'll guide you to the perfect service for your hair goals.
          </p>
          <Link
            to={createPageUrl("BookAppointment")}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-all group"
          >
            Book a Consultation <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
