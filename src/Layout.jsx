import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, ArrowUp, Instagram, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GOLD_FILTER = "brightness(0) saturate(100%) invert(68%) sepia(56%) saturate(500%) hue-rotate(5deg) brightness(95%)";

const footerServices = [
  { label: "100% Human Hair Wigs", page: "Services" },
  { label: "Hair Blends & Closures", page: "Services" },
  { label: "Wig Revamps & Styling", page: "Services" },
  { label: "Lace & Frontal Replacement", page: "Services" },
  { label: "Customisation & Repairs", page: "Services" },
  { label: "Our Policies", page: "Policies" },
];

const socialLinks = [
  { label: "@veloire_hair", href: "https://instagram.com/veloire_hair", icon: "IG" },
  { label: "@veloire_hair", href: "https://tiktok.com/@veloire_hair", icon: "TK" },
];

export default function Layout({ children, currentPageName }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [currentPageName]);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 400);
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Home", page: "Home" },
    { name: "Services", page: "Services" },
    { name: "Gallery", page: "Gallery" },
    { name: "Policies", page: "Policies" },
    { name: "Book Now", page: "BookAppointment" },
  ];

  return (
    <div className="min-h-screen font-body">
      {/* ── NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 pointer-events-none">
        <div className={`max-w-6xl mx-auto flex items-center justify-between backdrop-blur-md border rounded-full px-4 py-2.5 shadow-lg pointer-events-auto transition-all duration-300 ${
          scrolled ? "bg-background/90 border-border/60" : "bg-background/70 border-border/30"
        }`}>
          <Link to={createPageUrl("Home")}>
            <img src="/images/logo.png" alt="Véloire Hair" className="h-16 w-auto" style={{ filter: GOLD_FILTER }} />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.page}
                to={createPageUrl(link.page)}
                className={`text-sm font-medium tracking-wide transition-all duration-300 px-4 py-1.5 rounded-full ${
                  link.page === "BookAppointment"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : currentPageName === link.page
                    ? "bg-accent/40 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden max-w-6xl mx-auto mt-2 pointer-events-auto"
            >
              <nav className="flex flex-col items-center gap-2 py-4 bg-background/95 backdrop-blur-lg border border-border/60 rounded-3xl shadow-xl">
                {navLinks.map((link) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    className={`text-base font-medium tracking-wide transition-colors px-8 py-2 rounded-full ${
                      link.page === "BookAppointment"
                        ? "bg-primary text-primary-foreground"
                        : currentPageName === link.page
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>{children}</main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#080710] text-white">

        {/* Top strip — portfolio strip */}
        <div className="grid grid-cols-4 md:grid-cols-8 h-32 md:h-40 overflow-hidden">
          {[
            "/images/portfolio12.jpg",
            "/images/portfolio5.jpg",
            "/images/portfolio3.jpg",
            "/images/portfolio2.jpg",
            "/images/portfolio11.jpg",
            "/images/portfolio4.jpg",
            "/images/portfolio8.jpg",
            "/images/portfolio6.jpg",
          ].map((src, i) => (
            <div key={i} className="relative overflow-hidden">
              <img src={src} alt="" className="w-full h-full object-cover object-[center_65%]" />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          ))}
        </div>

        {/* Main footer body */}
        <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">

          {/* Large brand name */}
          <div className="mb-12 md:mb-16 flex flex-col items-center md:items-start text-center md:text-left">
            <img
              src="/images/logo.png"
              alt="Véloire Hair"
              className="h-16 md:h-20 w-auto"
              style={{ filter: GOLD_FILTER }}
            />
            <p className="text-white/35 text-xs tracking-[0.3em] uppercase mt-3">
              Premium Wig Specialist · UK
            </p>
          </div>

          {/* 3 columns on md+, stacked + centred on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 pb-12 border-b border-white/8">

            {/* Col 1 — About blurb + socials */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <p className="text-white/45 text-sm leading-relaxed mb-6">
                Based in the UK, Véloire Hair creates bespoke wigs, revamps tired units and delivers luxury hair straight to your door. Quality you can feel, results you can see.
              </p>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <a
                  href="https://instagram.com/veloire_hair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/6 hover:bg-primary/15 border border-white/10 hover:border-primary/30 rounded-full px-4 py-2 text-xs font-medium text-white/60 hover:text-primary transition-all duration-300"
                >
                  <Instagram size={13} /> @veloire_hair
                </a>
                <a
                  href="https://tiktok.com/@veloire_hair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/6 hover:bg-primary/15 border border-white/10 hover:border-primary/30 rounded-full px-4 py-2 text-xs font-medium text-white/60 hover:text-primary transition-all duration-300"
                >
                  TK @veloire_hair
                </a>
              </div>
            </div>

            {/* Col 2 — Quick links */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <p className="text-white/25 text-xs tracking-[0.2em] uppercase mb-5">Services</p>
              <ul className="space-y-3">
                {footerServices.map(({ label, page }) => (
                  <li key={label}>
                    <Link
                      to={createPageUrl(page)}
                      className="text-sm text-white/50 hover:text-primary transition-colors duration-200 flex items-center justify-center md:justify-start gap-2 group"
                    >
                      <span className="hidden md:block w-3 h-px bg-white/20 group-hover:bg-primary group-hover:w-4 transition-all duration-200" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Contact */}
            <div className="flex flex-col items-center md:items-start">
              <p className="text-white/25 text-xs tracking-[0.2em] uppercase mb-5">Get In Touch</p>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+447404335619"
                    className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-full bg-white/6 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-primary/30 transition-colors">
                      <Phone size={13} className="text-white/40 group-hover:text-primary transition-colors" />
                    </span>
                    +44 7404 335619
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:veloire.info@gmail.com"
                    className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-full bg-white/6 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-primary/30 transition-colors">
                      <Mail size={13} className="text-white/40 group-hover:text-primary transition-colors" />
                    </span>
                    veloire.info@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/veloire_hair"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-full bg-white/6 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-primary/30 transition-colors">
                      <Instagram size={13} className="text-white/40 group-hover:text-primary transition-colors" />
                    </span>
                    @veloire_hair
                  </a>
                </li>
              </ul>

              {/* Book CTA */}
              <Link
                to={createPageUrl("BookAppointment")}
                className="mt-7 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-xs font-medium hover:bg-primary/90 transition-colors"
              >
                Book Now →
              </Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 text-xs text-white/20 text-center">
            <span>© 2026 Véloire Hair. All rights reserved.</span>
            <Link to="/AdminDashboard" className="hover:text-white/40 transition-colors">Admin</Link>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
