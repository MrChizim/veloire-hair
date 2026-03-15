import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const features = [
  "100% Human Hair & Hair Blends",
  "Closures, Frontals & Full Wigs",
  "Full Revamps with Steam Treatment",
  "Lace & Frontal Replacement",
  "Custom Colour & Styling",
  "Express 48–72hr Turnaround",
];

export default function AboutSection() {
  return (
    <section className="py-24 md:py-32 overflow-hidden relative" style={{background: 'linear-gradient(135deg, hsl(270 25% 7%) 0%, hsl(270 18% 5%) 100%)'}}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <img
                src="/images/portfolio11.jpg"
                alt="Véloire Hair wig"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            </div>

            {/* Floating second image — hidden on mobile to prevent overlap */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="hidden md:block absolute -bottom-6 -right-10 w-52 aspect-square rounded-2xl overflow-hidden border-4 border-background shadow-2xl"
            >
              <img
                src="/images/portfolio8.jpg"
                alt="Véloire Hair — curly detail"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Stats badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute top-5 -left-3 md:-left-8 bg-background/90 backdrop-blur-md border border-border rounded-2xl px-4 py-3 shadow-xl"
            >
              <p className="font-heading text-2xl md:text-3xl font-semibold text-primary leading-none">100+</p>
              <p className="text-xs text-muted-foreground mt-1">Happy Clients</p>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-body">About Véloire</p>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
              Luxury Wigs,{" "}
              <span className="italic font-light">Tailored<br className="hidden md:block" /> For You</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                At Véloire Hair, we believe every woman deserves to feel effortlessly beautiful. Whether you're after a stunning custom build, a full revamp or a lace fix — we've got you.
              </p>
              <p>
                Every wig is handled with precision and care. We use only the best quality hair and products, so you leave (or receive your parcel) feeling like royalty.
              </p>
            </div>

            <ul className="grid grid-cols-1 gap-2.5 mb-10">
              {features.map((feat) => (
                <li key={feat} className="flex items-center gap-3 text-sm text-foreground/80">
                  <CheckCircle2 size={15} className="text-primary flex-shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={createPageUrl("BookAppointment")}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-all group"
              >
                Book a Session <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to={createPageUrl("Gallery")}
                className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-7 py-3 rounded-full text-sm font-medium hover:border-primary/40 hover:text-primary transition-all"
              >
                View Gallery
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
