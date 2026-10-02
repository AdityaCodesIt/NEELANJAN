"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

export function Header({ theme = "light" }: { theme?: "light" | "dark" }) {
  const isDark = theme === "dark";
  const { language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dict = {
    en: {
      services: "Services",
      about: "About",
      vichar: "Vichar",
      contact: "Contact",
      book: "Book a reading"
    },
    hi: {
      services: "सेवाएं",
      about: "परिचय",
      vichar: "विचार",
      contact: "संपर्क",
      book: "परामर्श बुक करें"
    }
  };

  const t = dict[language];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-16 py-4 transition-all duration-500 ${
          isScrolled
            ? isDark
              ? "bg-[#14101e]/85 backdrop-blur-md border-b border-cream/10 shadow-lg shadow-black/20 py-3.5"
              : "bg-cream/90 backdrop-blur-md border-b border-divider/80 shadow-sm py-3.5"
            : isDark
              ? "bg-transparent text-cream"
              : "bg-transparent text-ink"
        }`}
      >
        {/* Brand / Logo */}
        <Link href="/" className="group flex items-center gap-3 outline-none">
          <div
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-500 group-hover:border-gold group-hover:shadow-[0_0_12px_rgba(201,154,61,0.3)] ${
              isDark ? "border-cream/40 bg-cream/5" : "border-ink/20 bg-ink/5"
            }`}
          >
            <span className="text-sm text-gold transition-transform duration-700 ease-out group-hover:rotate-180">
              ☸
            </span>
          </div>
          <span className={`font-serif text-xl tracking-wider transition-colors duration-300 ${isDark ? "text-cream group-hover:text-glow" : "text-ink group-hover:text-gold"}`}>
            Neelanjan
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-9 text-sm font-medium tracking-wide">
          <Link
            href="/#services"
            className={`relative py-1 transition-colors duration-300 group ${
              isDark ? "text-cream/90 hover:text-glow" : "text-ink/90 hover:text-gold"
            }`}
          >
            {t.services}
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/#about"
            className={`relative py-1 transition-colors duration-300 group ${
              isDark ? "text-cream/90 hover:text-glow" : "text-ink/90 hover:text-gold"
            }`}
          >
            {t.about}
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/vichar"
            className={`relative py-1 transition-colors duration-300 group ${
              isDark ? "text-cream/90 hover:text-glow" : "text-ink/90 hover:text-gold"
            }`}
          >
            {t.vichar}
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/#contact"
            className={`relative py-1 transition-colors duration-300 group ${
              isDark ? "text-cream/90 hover:text-glow" : "text-ink/90 hover:text-gold"
            }`}
          >
            {t.contact}
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className={`relative overflow-hidden text-xs font-semibold uppercase tracking-wider border rounded-full px-3.5 py-1.5 transition-all duration-300 hover:scale-105 active:scale-95 ${
              isDark
                ? "border-cream/30 text-cream bg-cream/10 hover:bg-cream/20 hover:border-glow"
                : "border-ink/20 text-ink bg-ink/5 hover:bg-ink/10 hover:border-gold"
            }`}
            aria-label="Toggle language"
          >
            <span className="relative z-10 flex items-center gap-1">
              <Sparkles size={12} className="text-gold" />
              {language === "en" ? "हिं" : "EN"}
            </span>
          </button>

          <Link
            href="/appointment"
            className={`hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 transform hover:scale-[1.04] active:scale-95 shadow-md ${
              isDark
                ? "bg-gold text-ink hover:bg-glow hover:shadow-[0_0_20px_rgba(245,226,184,0.3)]"
                : "bg-ink text-cream hover:bg-ink/90 hover:shadow-[0_0_15px_rgba(43,33,24,0.25)]"
            }`}
          >
            {t.book}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full transition-colors ${
              isDark ? "text-cream hover:bg-cream/10" : "text-ink hover:bg-ink/10"
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden animate-fade-in" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="fixed top-20 right-4 left-4 bg-cream border border-divider p-6 rounded-2xl shadow-2xl flex flex-col gap-6 text-center animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-5 text-base font-serif text-ink">
              <Link 
                href="/#services" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold transition-colors py-1 border-b border-divider/50"
              >
                {t.services}
              </Link>
              <Link 
                href="/#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold transition-colors py-1 border-b border-divider/50"
              >
                {t.about}
              </Link>
              <Link 
                href="/vichar" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold transition-colors py-1 border-b border-divider/50"
              >
                {t.vichar}
              </Link>
              <Link 
                href="/#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold transition-colors py-1"
              >
                {t.contact}
              </Link>
            </nav>
            <Link
              href="/appointment"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-ink text-cream py-3 rounded-full text-sm font-medium uppercase tracking-wider shadow-md hover:bg-gold transition-colors"
            >
              {t.book}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
