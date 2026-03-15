import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, ZoomIn } from "lucide-react";
import { useState } from "react";

const previewImages = [
  { src: "/images/portfolio12.jpg", label: "Straight Unit" },
  { src: "/images/portfolio3.jpg", label: "Wavy Frontal" },
  { src: "/images/portfolio5.jpg", label: "Auburn Bob" },
  { src: "/images/portfolio2.jpg", label: "Curly Unit" },
  { src: "/images/portfolio4.jpg", label: "Blonde Bob" },
  { src: "/images/portfolio8.jpg", label: "Kinky Curls" },
];

export default function InstagramSection() {
  return (
    <section className="py-24 md:py-32 bg-card/20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-primary text-sm tracking-[0.25em] uppercase mb-3 font-body">Portfolio</p>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">
              Our Latest <span className="italic font-light">Work</span>
            </h2>
          </div>
          <Link
            to={createPageUrl("Gallery")}
            className="inline-flex items-center gap-2 text-primary text-sm font-medium tracking-wide hover:gap-3 transition-all duration-300 group self-start md:self-auto"
          >
            View Full Gallery <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {previewImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`group relative overflow-hidden rounded-2xl bg-card cursor-pointer ${
                i === 0 ? "md:col-span-1 md:row-span-2" : ""
              }`}
            >
              <Link to={createPageUrl("Gallery")}>
                <div className={`relative overflow-hidden ${i === 0 ? "aspect-square md:aspect-auto md:h-full" : "aspect-square"}`}
                  style={i === 0 ? { minHeight: "100%" } : {}}>
                  <img
                    src={img.src}
                    alt={img.label}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1.5">
                    <ZoomIn size={22} className="text-white" />
                    <span className="text-white text-xs font-medium">{img.label}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to={createPageUrl("Gallery")}
            className="inline-flex items-center gap-2 bg-card border border-border text-foreground px-8 py-3 rounded-full text-sm font-medium hover:border-primary/50 hover:text-primary transition-all"
          >
            View All Work <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
