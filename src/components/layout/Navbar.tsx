"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Bookmark,
  Calendar,
  Menu,
  X,
  Phone,
  ArrowRight,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import WishlistDrawer from "@/components/common/WishlistDrawer";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/plots", label: "Explore Plots" },
  { href: "/catalogue", label: "Catalogues" },
  { href: "/investment", label: "Land Investment" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { count, setIsWishlistOpen } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide Navbar when viewing admin panel or dedicated full-screen project catalogue
  if (pathname?.startsWith("/admin") || (pathname?.startsWith("/catalogue/") && pathname !== "/catalogue")) {
    return null;
  }

  return (
    <>
      <header
        className={`sticky top-0 z-40 py-3.5 transition-[background-color,border-color,box-shadow] duration-200 gpu-accel ${
          isScrolled
            ? "bg-[#0A1D16]/95 backdrop-blur-md shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)] border-b border-[#C8A870]/30"
            : "bg-[#0A1D16] border-b border-[#C8A870]/20 shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="group flex items-center space-x-3">
              <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#DFBE82] to-[#8F6F3B] p-[1px] flex items-center justify-center shadow-md">
                <div className="w-full h-full bg-[#0A1D16] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-[#C8A870] group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#FAF8F5] group-hover:text-[#C8A870] transition-colors">
                  TERRA<span className="text-[#C8A870] font-light">FIRMA</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.22em] text-stone-400 font-medium">
                  Residential Plot Estates
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-xs tracking-widest uppercase font-medium transition-colors py-1 ${
                      isActive
                        ? "text-[#C8A870]"
                        : "text-stone-300 hover:text-[#C8A870]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C8A870] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center space-x-4">
              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors border border-stone-800"
                title="Saved Plots"
                aria-label="View saved plots"
              >
                <Bookmark className="w-4 h-4 text-[#C8A870]" />
                {mounted && count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C8A870] text-[#0A1D16] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow">
                    {count}
                  </span>
                )}
              </button>

              {/* Book Site Visit CTA */}
              <Link
                href="/schedule-visit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-gradient-to-r from-[#DFBE82] via-[#C8A870] to-[#AF8D54] text-[#07140F] text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Site Visit</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 rounded text-stone-300 hover:text-white"
                aria-label="View saved plots"
              >
                <Bookmark className="w-5 h-5 text-[#C8A870]" />
                {mounted && count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C8A870] text-[#0A1D16] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-300 hover:text-white rounded border border-stone-800"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A1D16] border-b border-[#C8A870]/30 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm tracking-wider uppercase font-medium py-2 border-b border-white/5 flex items-center justify-between ${
                      isActive ? "text-[#C8A870] font-semibold" : "text-stone-300 hover:text-[#C8A870]"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 space-y-3">
              <Link
                href="/schedule-visit"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded bg-[#C8A870] text-[#07140F] text-xs font-bold uppercase tracking-wider shadow"
              >
                <Calendar className="w-4 h-4" />
                Book Private Site Visit
              </Link>

              <div className="p-3 rounded bg-white/5 border border-white/10 text-xs text-stone-300 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C8A870]" />
                  Experience Pavilion Open Daily
                </span>
                <span className="text-[#C8A870] font-mono text-[11px]">9 AM – 7 PM</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Slide-out Wishlist Drawer */}
      <WishlistDrawer />
    </>
  );
}
