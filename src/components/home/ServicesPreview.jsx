import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { ArrowRight, Scissors, RotateCcw, Sparkles, Palette, Layers, Wand2, Repeat2, Wrench } from "lucide-react";

const services = [
  { icon: Layers,    title: "100% Human Hair",   description: "Premium human hair wigs for a natural, undetectable look.", image: "/images/portfolio12.jpg" },
  { icon: Scissors,  title: "Closures",           description: "Realistic scalp illusion with a flawless parting.",           image: "/images/portfolio3.jpg" },
  { icon: Sparkles,  title: "Frontals",           description: "Full frontal wigs — HD or regular lace, built to order.",     image: "/images/portfolio15.jpg" },
  { icon: RotateCcw, title: "Revamps",            description: "Shampoo, deep condition, steam treatment & restyle.",         image: "/images/portfolio4.jpg" },
  { icon: Palette,   title: "Styling",            description: "Cuts, curls, blowouts — your wig, your way.",                image: "/images/portfolio5.jpg" },
  { icon: Wand2,     title: "Customisation",      description: "Colour, highlights, ombre — totally unique to you.",          image: "/images/portfolio6.jpg" },
  { icon: Repeat2,   title: "Lace Replacement",   description: "Fresh lace to give your favourite wig a new lease of life.",  image: "/images/portfolio9.jpg" },
];

export default function ServicesPreview() {
  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-primary text-sm tracking-[0.25em] uppercase mb-3 font-body">What We Do</p>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">
              Our <span className="italic font-light">Services</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs leading-relaxed text-sm md:text-base">
            From bespoke builds to full restorations — every wig gets the royal treatment.
          </p>
        </motion.div>

        {/* Uniform 2-col mobile / 4-col desktop grid, all square */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group relative overflow-hidden rounded-xl bg-card aspect-square"
            >
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                className="w-full h-full object-cover object-[center_65%] transition-transform duration-700 group-hover:scale-[1.07]"
              />
              {/* Permanent gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-end">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-lg flex items-center justify-center mb-2">
                  <service.icon size={14} className="text-primary" />
                </div>
                <h3 className="font-heading text-sm md:text-base font-semibold text-white leading-tight">
                  {service.title}
                </h3>
                {/* Description — only visible on hover on desktop, always hidden on mobile to keep clean */}
                <p className="hidden md:block text-white/60 text-xs leading-relaxed mt-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to={createPageUrl("Services")}
            className="inline-flex items-center gap-2 text-primary text-sm font-medium tracking-wide hover:gap-3 transition-all duration-300 group"
          >
            View Full Price List <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
