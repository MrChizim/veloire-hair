import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { entities } from "@/api/entities";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Clock, ArrowRight, Scissors } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const FALLBACK_SERVICES = [
  { id: "f1", name: "Glueless Wig Install", description: "Clean, secure glueless installation — no damage, full comfort", price: 60, duration: 90, category: "installs" },
  { id: "f2", name: "Lace Front Install", description: "Flawless lace front application with melt technique", price: 75, duration: 120, category: "installs" },
  { id: "f3", name: "HD Lace Install", description: "Ultra-thin HD lace for a truly undetectable hairline", price: 90, duration: 120, category: "installs" },
  { id: "f4", name: "Full Lace Install", description: "360° versatility with a full lace unit install", price: 100, duration: 150, category: "installs" },
  { id: "f5", name: "Basic Revamp", description: "Deep clean, condition and restyle your existing wig", price: 50, duration: 90, category: "revamps" },
  { id: "f6", name: "Full Revamp", description: "Complete restoration — bleach knots, re-pluck, cut & style", price: 85, duration: 150, category: "revamps" },
  { id: "f7", name: "Knot Bleaching", description: "Professional knot bleaching for a natural scalp appearance", price: 35, duration: 60, category: "revamps" },
  { id: "f8", name: "Custom Wig (Standard)", description: "Handmade wig to your exact specs — texture, density & length", price: 200, duration: 0, category: "custom" },
  { id: "f9", name: "Custom Wig (Premium)", description: "Premium handmade unit with HD lace and custom colour", price: 300, duration: 0, category: "custom" },
  { id: "f10", name: "Wig Styling", description: "Cut, style and finish your wig to perfection", price: 40, duration: 60, category: "styling" },
  { id: "f11", name: "Wig Colouring", description: "Colour, highlights or ombre applied to your wig", price: 65, duration: 120, category: "styling" },
  { id: "f12", name: "Consultation", description: "1-on-1 consultation to discuss your wig goals and options", price: 0, duration: 30, category: "other" },
];

const CATEGORIES = [
  { key: "all", label: "All Services" },
  { key: "installs", label: "Installs" },
  { key: "revamps", label: "Revamps" },
  { key: "custom", label: "Custom Wigs" },
  { key: "styling", label: "Styling" },
  { key: "other", label: "Other" },
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
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-16">
          <p className="text-primary text-sm tracking-[0.25em] uppercase mb-3 font-body">Menu</p>
          <h1 className="font-heading text-4xl md:text-6xl font-semibold text-foreground mb-4">
            Our <span className="italic font-light">Services</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            From bespoke custom wigs to flawless installs and full revamps — everything your hair dreams are made of.
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

        {/* Services grid */}
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
                        <span className="text-xs bg-accent/30 text-accent-foreground px-2.5 py-0.5 rounded-full capitalize">{service.category}</span>
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
                    <p className="font-heading text-2xl font-semibold text-foreground">
                      {service.price === 0 ? "Free" : `£${service.price}`}
                    </p>
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

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-16 bg-card border border-border rounded-2xl p-10">
          <h3 className="font-heading text-3xl font-semibold mb-3">Not sure what you need?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">Book a free consultation and we'll guide you to the perfect service for your hair goals.</p>
          <Link to={createPageUrl("BookAppointment")}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-all group">
            Book a Consultation <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
