"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  CheckCircle2,
  Layers,
  BookOpen,
} from "lucide-react";
import { PROJECTS_CATALOGUE } from "@/data/projectsCatalogue";
import { useAdminData } from "@/context/AdminDataContext";

export default function ProjectsCatalogueSection() {
  const { catalogues } = useAdminData();
  const allCatalogues = catalogues.length > 0 ? catalogues : PROJECTS_CATALOGUE;
  // Showcase top 3 flagship project catalogues on the homepage
  const featuredCatalogues = allCatalogues.slice(0, 3);

  return (
    <section className="bg-[#07140F] text-[#FAF8F5] py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-b border-[#C8A870]/20">
      {/* Background Ambience (Zero-lag GPU radial gradient) */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C8A870_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full glow-gold -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A870]/15 border border-[#C8A870]/30 text-[#C8A870] text-xs font-semibold uppercase tracking-widest mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              Editorial Monographs & Publications
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Projects <span className="text-[#C8A870] italic">Catalogue</span> Library
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-xl font-light">
              Experience our plotted townships through dedicated, distraction-free architectural catalogues featuring high-resolution master plans, connectivity charts, and statutory JDA disclosures.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#C8A870] hover:text-white uppercase font-mono transition-colors border-b border-[#C8A870]/40 pb-1"
            >
              <span>Explore All 8 Township Catalogues</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Featured Catalogue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCatalogues.map((project) => (
            <article
              key={project.id}
              className="group bg-[#0E1511] rounded-xl overflow-hidden border border-[#C8A870]/25 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-1 hover:border-[#C8A870]/50"
            >
              {/* Cover Preview Image */}
              <Link
                href={`/catalogue/${project.slug}`}
                className="relative block aspect-[16/10] overflow-hidden bg-[#07140F]"
              >
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1511] via-[#0E1511]/30 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="bg-[#07140F]/85 backdrop-blur-md text-[#FAF8F5] text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded border border-[#C8A870]/30">
                    {project.volume}
                  </span>
                  <span className="bg-[#C8A870] text-[#0A1D16] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    {project.status}
                  </span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono text-[#C8A870] uppercase tracking-wider block">
                    {project.edition}
                  </span>
                  <p className="font-serif text-lg font-bold text-white line-clamp-1 group-hover:text-[#C8A870] transition-colors">
                    {project.title}
                  </p>
                </div>
              </Link>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#C8A870] flex-shrink-0" />
                    <span>{project.location.locality}, {project.location.city}</span>
                    <span className="text-stone-600">•</span>
                    <span className="text-[#C8A870] font-medium">{project.location.corridor}</span>
                  </div>

                  <p className="text-stone-300 text-xs line-clamp-2 leading-relaxed mb-4 font-light">
                    {project.tagline}
                  </p>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-800 text-[11px] mb-4">
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-mono">Township</span>
                      <strong className="text-stone-200 font-medium">{project.masterPlan.totalArea}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-mono">Plot Range</span>
                      <strong className="text-stone-200 font-medium">100-500 Gaj</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-mono">Title Status</span>
                      <strong className="text-emerald-400 font-medium">100% JDA</strong>
                    </div>
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2">
                  <Link
                    href={`/catalogue/${project.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#16221B] hover:bg-[#C8A870] text-[#FAF8F5] hover:text-[#0A1D16] text-xs font-semibold py-3 px-4 rounded-lg transition-all duration-200 border border-[#C8A870]/30 hover:border-[#C8A870] shadow-sm"
                  >
                    <FileText className="w-4 h-4 text-[#C8A870] group-hover:text-[#0A1D16]" />
                    <span>Open Fullscreen Catalogue</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C8A870] group-hover:text-[#0A1D16]" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 pt-8 border-t border-[#C8A870]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C8A870]" />
            <span>All catalogues open in a distraction-free, vertical scrolling full-page publication experience.</span>
          </div>
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-1.5 text-white hover:text-[#C8A870] font-medium transition-colors"
          >
            <span>View All Catalogues</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
