"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  ExternalLink,
  Shield,
  Layers,
  FileText,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";

export default function Footer() {
  const pathname = usePathname();
  const { settings, addEnquiry } = useAdminData();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Hide footer on admin panel or dedicated full-screen catalogue pages
  if (pathname?.startsWith("/admin") || (pathname?.startsWith("/catalogue/") && pathname !== "/catalogue")) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    addEnquiry({
      customerName: "Newsletter Subscriber",
      phone: "N/A",
      email,
      projectTitle: "Market Insights Digest",
      enquiryType: "General Query",
      status: "New",
      preferredContactMethod: "Email",
      source: "Website Footer Newsletter",
    });

    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#07140F] text-stone-300 border-t border-[#C8A870]/20 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-stone-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center space-x-3">
              <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#DFBE82] to-[#8F6F3B] p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-[#0A1D16] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-[#C8A870]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-wider text-[#FAF8F5]">
                  TERRA<span className="text-[#C8A870] font-light">FIRMA</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.22em] text-stone-400 font-medium">
                  Residential Plot Estates
                </span>
              </div>
            </Link>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Curating 100% JDA approved residential plots, gated society townships, and high-growth land investment corridors across Jaipur, Rajasthan. Verified Patta documentation and seamless registry assistance.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8A870] flex-shrink-0" />
                <span>{settings.officeAddress || "Plot No. 42, JLN Marg, Near World Trade Park, Malviya Nagar, Jaipur, Rajasthan 302017"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C8A870] flex-shrink-0" />
                <a href={`tel:${(settings.contactPhone || "+911412789000").replace(/[^0-9+]/g, "")}`} className="hover:text-[#C8A870] transition-colors">
                  {settings.contactPhone || "+91 141 278-9000"}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C8A870] flex-shrink-0" />
                <a href={`mailto:${settings.salesEmail || "advisory@terrafirma-estates.demo"}`} className="hover:text-[#C8A870] transition-colors">
                  {settings.salesEmail || "advisory@terrafirma-estates.demo"}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links 1: Residential Plots */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[#FAF8F5] uppercase border-l-2 border-[#C8A870] pl-2.5">
              Jaipur Plot Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/plots?category=JDA+Approved+Township" className="hover:text-[#C8A870] transition-colors">
                  JDA Approved Townships
                </Link>
              </li>
              <li>
                <Link href="/plots?category=Gated+Society+Plots" className="hover:text-[#C8A870] transition-colors">
                  Gated Society Patta Plots
                </Link>
              </li>
              <li>
                <Link href="/plots?category=Ring+Road+Growth+Corridor" className="hover:text-[#C8A870] transition-colors">
                  Ring Road Expressway Parcels
                </Link>
              </li>
              <li>
                <Link href="/plots?category=Aravalli+Hillview+Parcels" className="hover:text-[#C8A870] transition-colors">
                  Aravalli Hillview Parcels
                </Link>
              </li>
              <li>
                <Link href="/plots?category=Luxury+Farmhouse+Land" className="hover:text-[#C8A870] transition-colors">
                  Farmhouse Land (1 Bigha+)
                </Link>
              </li>
              <li>
                <Link href="/plots" className="text-[#C8A870] font-medium hover:underline inline-flex items-center gap-1 pt-1">
                  View All Available &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links 2: Advisory & Company */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[#FAF8F5] uppercase border-l-2 border-[#C8A870] pl-2.5">
              Advisory & Brand
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/catalogue" className="text-[#C8A870] font-medium hover:underline inline-flex items-center gap-1">
                  Projects Catalogue (Brochures) &rarr;
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C8A870] transition-colors">
                  Our Architectural Philosophy
                </Link>
              </li>
              <li>
                <Link href="/investment" className="hover:text-[#C8A870] transition-colors">
                  Land Investment Intelligence
                </Link>
              </li>
              <li>
                <Link href="/schedule-visit" className="hover:text-[#C8A870] transition-colors">
                  Book Chauffeur Site Inspection
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#C8A870] transition-colors">
                  Legal & Title Verification FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C8A870] transition-colors">
                  Experience Centre & Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Land Gazette */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[#FAF8F5] uppercase border-l-2 border-[#C8A870] pl-2.5">
              Private Land Gazette
            </h4>
            <p className="text-xs text-stone-400">
              Receive confidential pre-launch notifications 48 hours prior to public market listings.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter executive email..."
                  required
                  className="w-full bg-[#0F2920] border border-[#C8A870]/30 rounded text-xs px-3.5 py-2.5 text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#C8A870]"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#C8A870] text-[#0A1D16] rounded hover:bg-[#DFBE82] transition-colors flex items-center justify-center"
                  aria-label="Subscribe to Private Land Gazette"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="p-2 bg-[#0F2920] border border-[#C8A870]/50 rounded text-[11px] text-[#C8A870] flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Thank you. You have been added to our private preview list.</span>
                </div>
              )}
              <span className="block text-[10px] text-stone-500">
                Zero spam. Instant unsubscribe at any time.
              </span>
            </form>
          </div>
        </div>

        {/* Demo Disclaimer Banner */}
        <div className="py-6 border-b border-stone-800 text-[11px] text-stone-500 leading-relaxed flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#C8A870] flex-shrink-0" />
            <p>
              <strong className="text-stone-400">DEMO PLATFORM NOTICE:</strong> This website represents a frontend UI/UX architecture for client review. All plot listings, dimensions, approvals, pricing, and testimonials are realistic fictional placeholders for demonstration only.
            </p>
          </div>
          <div className="flex items-center space-x-4 flex-shrink-0">
            <Link href="/terms" className="hover:text-stone-400 underline">Terms</Link>
            <Link href="/privacy-policy" className="hover:text-stone-400 underline">Privacy</Link>
            <Link href="/faq" className="hover:text-stone-400 underline">FAQ</Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 TERRA FIRMA Residential Plots & Estates. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span>Crafted with Precision for Sovereign Living</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A870]" />
            <span>Next.js • GSAP • Three.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
