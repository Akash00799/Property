"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Compass, ShieldCheck, Sparkles, Layers, Eye, PhoneCall } from "lucide-react";
import gsap from "gsap";
import HeroSearch from "@/components/home/HeroSearch";

// Dynamically import 3D canvas with SSR disabled for optimal hydration and bundle performance
const TerrainCanvas = dynamic(() => import("@/components/3d/TerrainCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#0A1D16] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#C8A870] border-t-transparent animate-spin" />
    </div>
  ),
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  const [visualMode, setVisualMode] = useState<"3D" | "Photo">("Photo");

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Badge reveal
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.2
        );
      }

      // Headline line-by-line staggered reveal
      if (headlineLine1Ref.current && headlineLine2Ref.current) {
        tl.fromTo(
          [headlineLine1Ref.current, headlineLine2Ref.current],
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, stagger: 0.22 },
          0.3
        );
      }

      // Subtitle fade and slide
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          0.7
        );
      }

      // CTA Buttons reveal
      if (ctaGroupRef.current) {
        tl.fromTo(
          ctaGroupRef.current.children,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
          0.9
        );
      }

      // Search bar slide up
      if (searchWrapRef.current) {
        tl.fromTo(
          searchWrapRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          1.1
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-between bg-[#07140F] text-[#FAF8F5] overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#C8A870]/20 -mt-[1px]"
    >
      {/* Visual Background: 3D Topographic Mesh or Cinematic Aerial Photo */}
      <div ref={bgImageRef} className="absolute inset-0 z-0">
        {visualMode === "3D" ? (
          <TerrainCanvas />
        ) : (
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop"
            alt="Cinematic Residential Plot Aerial View"
            fill
            priority
            className="object-cover opacity-45 mix-blend-luminosity scale-100"
          />
        )}

        {/* Ambient Dark Emerald Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07140F] via-[#07140F]/65 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07140F]/90 via-[#07140F]/40 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full glow-gold" />
      </div>

      {/* Visual Mode Switcher (Allows user to toggle between 3D Topography and Cinematic Land Drone View) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex justify-end">
        <div className="inline-flex items-center gap-1 bg-[#0A1D16]/90 p-1 rounded-full border border-[#C8A870]/30 backdrop-blur-md text-xs shadow-lg">
          <button
            onClick={() => setVisualMode("3D")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all text-[11px] font-medium ${
              visualMode === "3D"
                ? "bg-[#C8A870] text-[#07140F] font-bold shadow"
                : "text-stone-400 hover:text-white"
            }`}
          >
            <Layers className="w-3 h-3" />
            3D Topographic Mesh
          </button>
          <button
            onClick={() => setVisualMode("Photo")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all text-[11px] font-medium ${
              visualMode === "Photo"
                ? "bg-[#C8A870] text-[#07140F] font-bold shadow"
                : "text-stone-400 hover:text-white"
            }`}
          >
            <Eye className="w-3 h-3" />
            Aerial Photography
          </button>
        </div>
      </div>

      {/* Main Hero Content Block */}
      <div className="relative z-10 max-w-7xl mx-auto w-full py-8 sm:py-12 my-auto">
        <div className="max-w-3xl space-y-6">
          {/* Tagline Badge */}
          <div ref={badgeRef} className="inline-flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C8A870]/20 border border-[#C8A870]/50 text-[#DFBE82] text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              JDA Approved Residential Plots in Jaipur
            </span>
            <span className="text-stone-300 text-xs font-medium hidden sm:inline-block">
              • 100% JDA Patta & 90A Approved [Demo]
            </span>
          </div>

          {/* Majestic Modern Display Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.06]">
            <span ref={headlineLine1Ref} className="block">
              Find Your Ground.
            </span>
            <span
              ref={headlineLine2Ref}
              className="block bg-gradient-to-r from-[#FAF8F5] via-[#DFBE82] to-[#C8A870] bg-clip-text text-transparent font-extrabold"
            >
              Build Your Future.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p
            ref={subtitleRef}
            className="text-stone-200 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl"
          >
            Discover verified JDA-approved residential plots and investment land parcels across Jaipur&apos;s prime growth corridors—Jagatpura, Ajmer Road, Ring Road, Tonk Road, and Sirsi Road. Complete with 40–60ft wide roads, sweet water lines, and direct registry.
          </p>

          {/* Interactive CTAs */}
          <div
            ref={ctaGroupRef}
            className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider"
          >
            <Link
              href="/plots"
              className="px-7 py-4 rounded bg-gradient-to-r from-[#DFBE82] via-[#C8A870] to-[#AF8D54] text-[#07140F] hover:brightness-110 active:scale-95 transition-all shadow-xl flex items-center gap-2.5 font-bold"
            >
              <span>Explore Available Plots</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/schedule-visit"
              className="px-7 py-4 rounded bg-[#0A1D16]/80 hover:bg-[#14382C] border border-[#C8A870]/40 text-stone-200 hover:text-white transition-all backdrop-blur-md flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#C8A870]" />
              <span>Schedule Private Site Inspection</span>
            </Link>

            <a
              href="tel:+918001234567"
              className="px-4 py-4 text-stone-300 hover:text-[#C8A870] transition-colors flex items-center gap-2 lowercase tracking-normal text-sm font-normal"
            >
              <PhoneCall className="w-4 h-4 text-[#C8A870]" />
              <span>Talk to Land Specialist</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Property Search Widget */}
      <div ref={searchWrapRef} className="relative z-20 max-w-7xl mx-auto w-full pt-4">
        <HeroSearch />
      </div>
    </section>
  );
}
