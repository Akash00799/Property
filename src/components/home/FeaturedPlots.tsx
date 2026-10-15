"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DEMO_PROPERTIES } from "@/data/properties";
import { useAdminData } from "@/context/AdminDataContext";
import PropertyCard from "@/components/property/PropertyCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORY_TABS = [
  "All",
  "JDA Approved Township",
  "Gated Society Plots",
  "Ring Road Growth Corridor",
  "Aravalli Hillview Parcels",
  "Luxury Farmhouse Land",
];

export default function FeaturedPlots() {
  const { projects } = useAdminData();
  const [activeTab, setActiveTab] = useState("All");
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const allPlots = projects.length > 0 ? projects : DEMO_PROPERTIES;

  const filteredPlots =
    activeTab === "All"
      ? allPlots.slice(0, 6)
      : allPlots.filter((p) => p.category === activeTab);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.06,
            ease: "power2.out",
          }
        );
      }
    }, gridRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#8F6F3B] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Land Portfolio
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1D16] tracking-tight">
            Featured Residential Plots
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl">
            Independently surveyed and infrastructure-ready parcels selected for exceptional elevation, orientation, and enduring capital value.
          </p>
        </div>

        <Link
          href="/plots"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A1D16] hover:text-[#8F6F3B] transition-colors group"
        >
          <span>View All 8 Curated Plots</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === tab
                ? "bg-[#0A1D16] text-[#FAF8F5] shadow"
                : "bg-white text-stone-600 hover:bg-stone-100 border border-[#C8A870]/20"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Plots Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredPlots.map((plot) => (
          <PropertyCard key={plot.id} plot={plot} viewMode="grid" />
        ))}
      </div>

      {/* Bottom CTA Banner */}
      <div className="mt-14 p-6 sm:p-8 rounded-xl bg-[#0A1D16] border border-[#C8A870]/30 text-[#FAF8F5] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] uppercase tracking-widest text-[#C8A870] font-bold">
            Private Site Inspection
          </span>
          <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
            Need bespoke dimensions or looking for an entire corner block?
          </h4>
          <p className="text-xs text-stone-400">
            Our master plottings accommodate customized parcel combinations upon request.
          </p>
        </div>

        <Link
          href="/schedule-visit"
          className="px-6 py-3 rounded bg-[#C8A870] hover:bg-[#DFBE82] text-[#07140F] text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-md flex items-center gap-2"
        >
          <span>Arrange Site Walk</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
