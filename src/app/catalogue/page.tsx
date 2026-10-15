import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  FileText,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  SlidersHorizontal,
  DownloadCloud,
} from "lucide-react";
import { PROJECTS_CATALOGUE } from "@/data/projectsCatalogue";

export const metadata: Metadata = {
  title: "Projects Architectural Catalogue | TERRA FIRMA Jaipur",
  description:
    "Explore our complete publication collection of JDA approved plotted township catalogues in Jaipur. Browse high-resolution master plans, plot typologies, connectivity, and legal disclosures.",
};

export default function ProjectsCataloguePage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Editorial Header */}
      <section className="relative bg-[#07140F] text-[#FAF8F5] pt-14 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#C8A870]/20">
        {/* Subtle background ornamentation (GPU-accelerated) */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C8A870_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full glow-gold" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C8A870]/15 border border-[#C8A870]/30 text-[#C8A870] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              Official Publications • 2026 Editions
            </div>
            <div className="text-stone-400 text-xs font-mono tracking-wider">
              JAIPUR PLOTTED MONOGRAPHS • 8 ISSUES AVAILABLE
            </div>
          </div>

          <div className="max-w-3xl">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-5">
              Township <span className="text-[#C8A870] italic">Architectural</span> Catalogues
            </h1>
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
              Explore individual, full-screen digital catalogues for our curated residential plotted townships across Jaipur, Rajasthan. 
              Each catalogue presents detailed master plans, sector layouts, connectivity analyses, infrastructure specifications, and statutory clearances.
            </p>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#C8A870]/20 text-xs">
            <div>
              <span className="block text-stone-400 uppercase tracking-wider text-[11px]">Certified Clearances</span>
              <span className="text-base sm:text-lg font-serif font-bold text-white mt-0.5 block">100% JDA Patta</span>
            </div>
            <div>
              <span className="block text-stone-400 uppercase tracking-wider text-[11px]">Primary Units</span>
              <span className="text-base sm:text-lg font-serif font-bold text-white mt-0.5 block">Gaj (Square Yards)</span>
            </div>
            <div>
              <span className="block text-stone-400 uppercase tracking-wider text-[11px]">Corridor Coverage</span>
              <span className="text-base sm:text-lg font-serif font-bold text-white mt-0.5 block">8 Growth Zones</span>
            </div>
            <div>
              <span className="block text-stone-400 uppercase tracking-wider text-[11px]">Browsing Format</span>
              <span className="text-base sm:text-lg font-serif font-bold text-[#C8A870] mt-0.5 block">Distraction-Free Web</span>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8F6F3B]">
              Curated Volumes
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0A1D16] mt-1">
              Select a Township to Open Its Dedicated Catalogue
            </h2>
          </div>
          <p className="text-stone-600 text-sm max-w-md">
            Click any project to enter its full-screen, vertical scrolling brochure experience with no distracting navigation or footers.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_CATALOGUE.map((project, idx) => (
            <article
              key={project.id}
              className="group bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              {/* Catalogue Cover Preview with Book-Like Styling */}
              <Link
                href={`/catalogue/${project.slug}`}
                className="relative block aspect-[4/3] overflow-hidden bg-[#0A1D16]"
              >
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D16] via-[#0A1D16]/30 to-transparent" />

                {/* Top Tags */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="bg-[#0A1D16]/80 backdrop-blur-md text-[#FAF8F5] text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded border border-[#C8A870]/30">
                    {project.volume}
                  </span>
                  <span className="bg-[#C8A870] text-[#0A1D16] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                    {project.status}
                  </span>
                </div>

                {/* Bottom Cover Title Overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] text-[#C8A870] font-mono uppercase tracking-wider block">
                    {project.edition}
                  </span>
                  <p className="font-serif text-lg font-bold text-white line-clamp-1 group-hover:text-[#C8A870] transition-colors">
                    {project.title}
                  </p>
                </div>
              </Link>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Location & Tagline */}
                  <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#C8A870] flex-shrink-0" />
                    <span>{project.location.locality}, {project.location.city}</span>
                    <span className="text-stone-300">•</span>
                    <span className="text-[#8F6F3B] font-medium">{project.location.corridor}</span>
                  </div>

                  <p className="text-stone-700 text-sm line-clamp-2 leading-relaxed mb-4">
                    {project.tagline}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-100 text-[11px] mb-4">
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase">Master Plan</span>
                      <strong className="text-stone-800 font-semibold">{project.masterPlan.totalArea}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase">Plot Sizes</span>
                      <strong className="text-stone-800 font-semibold">100 - 500 Gaj</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase">Clearance</span>
                      <strong className="text-emerald-700 font-semibold">100% JDA</strong>
                    </div>
                  </div>

                  {/* Key Highlights list preview */}
                  <div className="space-y-1.5 mb-5">
                    {project.overview.keyHighlights.slice(0, 2).map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-stone-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A870] flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="pt-2">
                  <Link
                    href={`/catalogue/${project.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#0A1D16] hover:bg-[#133428] text-[#FAF8F5] text-xs font-semibold py-3 px-4 rounded-lg transition-all duration-200 group-hover:border-[#C8A870] border border-transparent shadow-sm"
                  >
                    <FileText className="w-4 h-4 text-[#C8A870]" />
                    <span>Open Fullscreen Catalogue</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C8A870] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Advisory Banner */}
      <section className="bg-stone-100 border-t border-stone-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl p-8 sm:p-10 border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8F6F3B]">
              <ShieldCheck className="w-4 h-4 text-[#C8A870]" />
              Official Documentation & Site Visits
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A1D16]">
              Need Physical Copies or Assisted Site Inspections?
            </h3>
            <p className="text-stone-600 text-sm max-w-xl">
              Our Jaipur plot desk provides embossed printed monographs, JDA layout copies, and complimentary chauffeur site inspections to any township.
            </p>
          </div>
          <Link
            href="/schedule-visit"
            className="inline-flex items-center gap-2 bg-[#C8A870] hover:bg-[#b8965d] text-[#0A1D16] font-semibold text-sm px-6 py-3.5 rounded-lg shadow-sm whitespace-nowrap transition-colors"
          >
            <span>Book Site Inspection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
