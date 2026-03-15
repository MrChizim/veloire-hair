import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Instagram, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GOLD_FILTER = "brightness(0) saturate(100%) invert(68%) sepia(56%) saturate(500%) hue-rotate(5deg) brightness(95%)";

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
    { name: "Book Now", page: "BookAppointment" },
  ];

  return (
    <div className="min-h-screen font-body">
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 pointer-events-none">
        <div className={`max-w-6xl mx-auto flex items-center justify-between backdrop-blur-md border rounded-full px-4 py-2.5 shadow-lg pointer-events-auto transition-all duration-300 ${
          scrolled ? "bg-background/90 border-border/60" : "bg-background/70 border-border/30"
        }`}>
          <Link to={createPageUrl("Home")} className="group">
            <img src="/images/logo.png" alt="Véloire Hair" className="h-12 w-auto" style={{ filter: GOLD_FILTER }} />
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

      <footer className="bg-[#0a090d] text-white py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <img src="/images/logo.png" alt="Véloire Hair" className="h-14 w-auto mb-4" style={{ filter: GOLD_FILTER }} />
              <p className="text-white/50 text-sm leading-relaxed">
                Premium wig specialist serving clients across the UK. Custom wigs, installs, revamps & more.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <a href="https://instagram.com/veloire_hair" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary text-sm hover:text-primary/80 transition-colors">
                  <Instagram size={16} /> @veloire_hair
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4 text-white">Services</h4>
              <div className="space-y-2 text-sm text-white/50">
                <p>Wig Installs</p>
                <p>Custom Wig Making</p>
                <p>Wig Revamps & Restoration</p>
                <p>Wig Styling & Colouring</p>
                <p>Consultations</p>
              </div>
            </div>
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4 text-white">Get In Touch</h4>
              <div className="space-y-2 text-sm text-white/50">
                <p>Instagram: <a href="https://instagram.com/veloire_hair" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@veloire_hair</a></p>
                <p>TikTok: <a href="https://tiktok.com/@veloire_hair" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@veloire_hair</a></p>
                <p>Facebook: <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Véloire Hair</a></p>
                <p className="pt-1">📞 <a href="tel:+447404335619" className="hover:text-white transition-colors">+44 7404 335619</a></p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
            <span>© 2026 Véloire Hair. All rights reserved.</span>
            <Link to="/AdminDashboard" className="hover:text-white/50 transition-colors">Admin</Link>
          </div>
        </div>
      </footer>

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
