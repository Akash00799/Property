"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Printer,
  Calendar,
  Share2,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Compass,
  Layers,
  Sparkles,
  Phone,
  FileCheck,
  Building,
  TreePine,
  Car,
  ChevronDown,
  ExternalLink,
  ChevronRight,
  Landmark,
  BadgeCheck,
  Maximize2,
  X,
  Eye,
  ZoomIn,
} from "lucide-react";
import type { ProjectCatalogueItem } from "@/data/projectsCatalogue";
import { useAdminData } from "@/context/AdminDataContext";

interface Props {
  project: ProjectCatalogueItem;
}

const FOLIO_SECTIONS = [
  { id: "folio-cover", label: "01. Cover" },
  { id: "folio-vision", label: "02. Vision & Overview" },
  { id: "folio-plan", label: "03. Master Plan Blueprint" },
  { id: "folio-connectivity", label: "04. Location & Transit" },
  { id: "folio-infrastructure", label: "05. Site Gallery & Civil" },
  { id: "folio-typologies", label: "06. Plot Typologies" },
  { id: "folio-clearances", label: "07. Statutory Clearances" },
  { id: "folio-advisory", label: "08. Site Inspection" },
];

export default function ProjectCatalogueClient({ project: initialProject }: Props) {
  const { catalogues } = useAdminData();
  const project =
    catalogues.find((c) => c.id === initialProject.id || c.slug === initialProject.slug) ||
    initialProject;
  const [activeSection, setActiveSection] = useState("folio-cover");
  const [selectedTypology, setSelectedTypology] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; subtitle: string } | null>(null);

  // Monitor active section during scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sec of FOLIO_SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${project.title} - Architectural Catalogue`,
          text: `Explore the official JDA approved township catalogue for ${project.title} in Jaipur, Rajasthan.`,
          url: window.location.href,
        });
      } catch {
        // Fallback to copy link
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const scrollToFolio = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#121614] text-[#FAF8F5] min-h-screen font-sans selection:bg-[#C8A870] selection:text-[#0A1D16]">
      {/* =========================================================================
          PRINT & PDF STYLES: 100% SCREEN FIDELITY WITH EXACT COLORS & BACKGROUNDS
         ========================================================================= */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0mm !important;
          }

          *,
          *::before,
          *::after {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
            box-sizing: border-box !important;
          }

          html,
          body {
            background-color: #121614 !important;
            color: #FAF8F5 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            -webkit-print-color-adjust: exact !important;
            font-size: 13px !important;
            overflow: visible !important;
          }

          /* Hide web-only UI and buttons */
          .catalogue-control-bar,
          .catalogue-floating-nav,
          .print-hidden {
            display: none !important;
          }

          .catalogue-main-container {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }

          /* Each folio represents a dedicated catalogue page */
          .folio-page {
            page-break-after: always !important;
            break-after: page !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            width: 100% !important;
            max-width: 100% !important;
            min-height: 297mm !important;
            box-sizing: border-box !important;
            margin: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            position: relative !important;
            padding: 22mm 18mm !important;
            background-color: #161B18 !important;
            border-color: #29322c !important;
          }

          /* Folio 01: Cover Page exactly fits A4 without bottom clipping */
          #folio-cover {
            height: 297mm !important;
            max-height: 297mm !important;
            min-height: 297mm !important;
            padding: 20mm 18mm 16mm 18mm !important;
            background-color: #07140F !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
          }

          #folio-cover .cover-mid-section {
            padding-top: 1rem !important;
            padding-bottom: 1rem !important;
            margin-top: auto !important;
            margin-bottom: auto !important;
          }

          #folio-cover .cover-title {
            font-size: 2.65rem !important;
            line-height: 1.12 !important;
            margin-bottom: 0.75rem !important;
            color: #ffffff !important;
          }

          #folio-cover .cover-tagline {
            font-size: 1.15rem !important;
            margin-bottom: 1.25rem !important;
            color: #C8A870 !important;
          }

          #folio-advisory {
            background-color: #07140F !important;
            min-height: 297mm !important;
            padding: 24mm 18mm !important;
          }

          /* Prevent elements from cutting in half across page boundaries */
          table,
          tr,
          .grid,
          .grid > div {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>

      {/* =========================================================================
          SUBTLE DISTRACTION-FREE TOP CONTROL BAR
         ========================================================================= */}
      <header className="catalogue-control-bar fixed top-0 left-0 right-0 z-50 bg-[#07140F]/90 backdrop-blur-md border-b border-[#C8A870]/20 py-2.5 px-4 sm:px-6 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Subtle Return Control */}
          <Link
            href="/catalogue"
            className="group inline-flex items-center gap-2 text-stone-300 hover:text-[#C8A870] text-xs font-medium tracking-wide transition-colors py-1 px-2.5 rounded-md hover:bg-white/5 border border-transparent hover:border-[#C8A870]/20"
            title="Return to Projects Catalogue"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Return to Projects Catalogue</span>
            <span className="sm:hidden">Catalogue</span>
          </Link>

          {/* Issue Stamp & Title in Header */}
          <div className="flex items-center gap-3 text-center">
            <span className="hidden md:inline-block text-[10px] font-mono uppercase tracking-widest text-[#C8A870] bg-[#C8A870]/10 border border-[#C8A870]/30 px-2 py-0.5 rounded">
              {project.volume}
            </span>
            <h1 className="font-serif text-xs sm:text-sm font-semibold text-white tracking-wide truncate max-w-[220px] sm:max-w-xs md:max-w-md">
              {project.title}
            </h1>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Share */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-stone-300 hover:text-white text-xs py-1.5 px-2.5 rounded-md hover:bg-white/10 transition-colors"
              title="Share Catalogue"
            >
              <Share2 className="w-3.5 h-3.5 text-[#C8A870]" />
              <span className="hidden lg:inline">{copiedLink ? "Copied!" : "Share"}</span>
            </button>

            {/* Download / Print PDF */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-[#C8A870]/20 hover:bg-[#C8A870] text-[#C8A870] hover:text-[#0A1D16] border border-[#C8A870]/40 text-xs py-1.5 px-3 rounded-md transition-all font-semibold shadow-sm"
              title="Download or Print PDF with full screen graphics"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            {/* Book Inspection CTA */}
            <Link
              href="/schedule-visit"
              className="inline-flex items-center gap-1.5 bg-[#C8A870] hover:bg-[#b8965d] text-[#0A1D16] text-xs font-semibold py-1.5 px-3 rounded-md transition-colors shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Site Visit</span>
            </Link>
          </div>
        </div>
      </header>

      {/* =========================================================================
          FLOATING FOLIO QUICK JUMP DOCK (DESKTOP / TABLET)
         ========================================================================= */}
      <nav aria-label="Folio Navigation" className="catalogue-floating-nav hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-2 bg-[#0A1D16]/90 backdrop-blur-md p-3 rounded-2xl border border-[#C8A870]/25 shadow-2xl">
        <span className="text-[9px] font-mono uppercase tracking-widest text-stone-400 text-center mb-1 pb-1 border-b border-[#C8A870]/20">
          Folios
        </span>
        {FOLIO_SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToFolio(sec.id)}
              className={`text-left text-xs px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between gap-3 ${
                isActive
                  ? "bg-[#C8A870] text-[#0A1D16] font-semibold shadow-md"
                  : "text-stone-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{sec.label}</span>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#0A1D16]" />}
            </button>
          );
        })}
      </nav>

      {/* Main Container of Vertically Stacked Folio Pages */}
      <div className="catalogue-main-container pt-14 pb-20">
        {/* =======================================================================
            FOLIO 01: FRONT COVER PAGE (MONOGRAPH FORMAT)
           ======================================================================= */}
        <section
          id="folio-cover"
          className="folio-page relative min-h-[calc(100vh-3.5rem)] flex flex-col justify-between p-6 sm:p-12 lg:p-20 overflow-hidden border-b border-[#C8A870]/20 bg-[#07140F]"
        >
          {/* Cover Background Image with Deep Vignette */}
          <div className="absolute inset-0 z-0">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07140F] via-[#07140F]/60 to-[#07140F]/80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#07140F_90%)]" />
          </div>

          {/* Top Folio Header Stamp */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#C8A870]/30 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-[#DFBE82] to-[#8F6F3B] p-[1px]">
                <div className="w-full h-full bg-[#0A1D16] flex items-center justify-center">
                  <Compass className="w-4 h-4 text-[#C8A870]" />
                </div>
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-wider text-white">
                  TERRA<span className="text-[#C8A870] font-light">FIRMA</span>
                </span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-[#C8A870]">
                  Architectural Monographs • Jaipur
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-stone-300">
              <span className="bg-[#C8A870]/15 text-[#C8A870] px-3 py-1 rounded border border-[#C8A870]/30 font-bold uppercase tracking-wider">
                {project.volume}
              </span>
              <span>{project.edition}</span>
            </div>
          </div>

          {/* Central Monograph Title & Identity */}
          <div className="relative z-10 my-auto py-12 max-w-4xl cover-mid-section">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8A870]/20 border border-[#C8A870]/40 text-[#C8A870] text-xs font-semibold uppercase tracking-widest mb-6">
              <BadgeCheck className="w-4 h-4" />
              100% JDA Patta Approved Plotted Township
            </div>

            <h1 className="cover-title font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-6">
              {project.title}
            </h1>

            <p className="cover-tagline font-serif text-xl sm:text-2xl text-[#C8A870] font-light italic mb-8 max-w-3xl">
              &ldquo;{project.tagline}&rdquo;
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-stone-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C8A870]" />
                <span>{project.location.locality}, {project.location.city} ({project.location.corridor})</span>
              </div>
              <div className="text-stone-500">•</div>
              <div className="font-mono text-xs text-stone-400">
                GPS: {project.location.coordinates}
              </div>
            </div>
          </div>

          {/* Bottom Folio Footer Metadata */}
          <div className="relative z-10 border-t border-[#C8A870]/30 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Gross Acreage</span>
                <strong className="text-white font-serif text-base">{project.masterPlan.totalArea}</strong>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Plot Sizes</span>
                <strong className="text-white font-serif text-base">100 - 500 Gaj</strong>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Open Space</span>
                <strong className="text-white font-serif text-base">{project.masterPlan.openGreenRatio}</strong>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Title Security</span>
                <strong className="text-emerald-400 font-serif text-base">JDA Patta Issued</strong>
              </div>
            </div>

            <button
              onClick={() => scrollToFolio("folio-vision")}
              className="print-hidden inline-flex items-center gap-2 text-xs text-[#C8A870] hover:text-white uppercase font-mono tracking-wider transition-colors"
            >
              <span>Scroll to Folio 02: Vision</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </section>

        {/* =======================================================================
            FOLIO 02: EXECUTIVE VISION & PROJECT NARRATIVE
           ======================================================================= */}
        <section
          id="folio-vision"
          className="folio-page max-w-6xl mx-auto my-12 px-6 sm:px-12 py-16 bg-[#161B18] rounded-2xl border border-stone-800 shadow-2xl"
        >
          {/* Folio Page Header */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-10 text-xs font-mono text-stone-400">
            <span className="text-[#C8A870] uppercase font-bold tracking-wider">Folio 02 / 08 • Executive Overview</span>
            <span>{project.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C8A870]">
                Township Narrative & Concept
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-snug">
                {project.overview.headline}
              </h2>
              
              <div className="text-stone-300 text-sm sm:text-base leading-relaxed space-y-4 font-light">
                <p>{project.overview.story}</p>
                <div className="p-5 rounded-xl bg-[#0A1D16] border-l-4 border-[#C8A870] text-stone-300 italic text-sm">
                  &ldquo;{project.overview.developerVision}&rdquo;
                  <span className="block mt-2 text-xs text-[#C8A870] not-italic font-mono uppercase tracking-wider">
                    — Master Planner & Urban Design Director
                  </span>
                </div>
              </div>

              {/* Key Highlights Checklist */}
              <div className="pt-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-4">
                  Township Highlights & Commitments
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.overview.keyHighlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#0E1511] border border-stone-800/80">
                      <CheckCircle2 className="w-4 h-4 text-[#C8A870] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-200 leading-snug">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Metrics Grid */}
            <div className="lg:col-span-5 bg-[#0A1D16] rounded-xl p-6 sm:p-8 border border-[#C8A870]/25 space-y-6">
              <div className="border-b border-[#C8A870]/20 pb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8A870] block">
                  Project Dossier
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-1">
                  Key Statistical Metrics
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {project.overview.stats.map((stat, i) => (
                  <div key={i} className="p-4 rounded-lg bg-[#121614] border border-stone-800">
                    <span className="text-[11px] text-stone-400 block">{stat.label}</span>
                    <strong className="text-xl sm:text-2xl font-serif font-bold text-[#C8A870] block mt-1">
                      {stat.value}
                    </strong>
                    <span className="text-[10px] text-stone-400 block mt-0.5">{stat.sublabel}</span>
                  </div>
                ))}
              </div>

              {/* Landmark Callout */}
              <div className="p-4 rounded-lg bg-[#121614] border border-stone-800 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C8A870] flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-medium">Strategic Landmark Reference</strong>
                  <p className="text-stone-400 mt-0.5">{project.location.landmark}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================================
            FOLIO 03: MASTER PLAN & CAD BLUEPRINT
           ======================================================================= */}
        <section
          id="folio-plan"
          className="folio-page max-w-6xl mx-auto my-12 px-6 sm:px-12 py-16 bg-[#161B18] rounded-2xl border border-stone-800 shadow-2xl"
        >
          {/* Folio Page Header */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-8 text-xs font-mono text-stone-400">
            <span className="text-[#C8A870] uppercase font-bold tracking-wider">Folio 03 / 08 • Architectural Master Plan & CAD Blueprint</span>
            <span>{project.masterPlan.blueprintTitle}</span>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C8A870]">
                Zoning & Sector Engineering
              </span>
              <span className="text-stone-500">•</span>
              <span className="text-xs font-mono text-emerald-400">Sanctioned JDA Drawing</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-1">
              Township Sector Blueprint & Demarcation Master Plan
            </h2>
            <p className="text-stone-300 text-sm mt-2 max-w-3xl font-light">
              Official town planning layout sanctioned by the Jaipur Development Authority (JDA). Features a planned orthogonal road grid, designated sector zoning (A, B & C), central park buffers, and individual plot demarcation pegs.
            </p>
          </div>

          {/* Master Plan High-Res CAD Blueprint Card (Click to Zoom) */}
          <div
            onClick={() =>
              setLightboxImage({
                src: project.masterPlan.planImage || "/images/catalogue/master-plan-blueprint.jpg",
                title: `${project.title} — Official Architectural Master Plan`,
                subtitle: `${project.masterPlan.blueprintTitle} • Scale 1:500 • North Aligned JDA Scheme Drawing`,
              })
            }
            className="group relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-[#C8A870]/40 shadow-2xl bg-[#07140F] mb-6 cursor-zoom-in"
          >
            <Image
              src={project.masterPlan.planImage || "/images/catalogue/master-plan-blueprint.jpg"}
              alt={`${project.title} Master Plan Blueprint`}
              fill
              sizes="(max-width: 1200px) 100vw, 1100px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07140F]/90 via-transparent to-transparent pointer-events-none" />

            {/* Top Blueprint Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3 text-xs pointer-events-none">
              <span className="bg-[#07140F]/90 backdrop-blur-md text-[#C8A870] font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-lg border border-[#C8A870]/40 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                <span>CAD Master Plan • Scale 1:500</span>
              </span>
              <span className="bg-[#0A1D16]/90 backdrop-blur-md text-emerald-400 font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded border border-emerald-500/30">
                100% JDA Approved Scheme
              </span>
            </div>

            {/* Center Hover Action Prompt */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C8A870] text-[#0A1D16] font-semibold text-xs shadow-xl">
                <ZoomIn className="w-4 h-4" />
                <span>Click to Inspect CAD Blueprint in High-Res</span>
              </span>
            </div>

            {/* Overlay Blueprint Footer Tag */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 text-xs bg-[#07140F]/90 backdrop-blur-md p-3.5 rounded-lg border border-[#C8A870]/25">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C8A870]" />
                <span className="text-white font-medium">{project.masterPlan.blueprintTitle}</span>
              </div>
              <div className="flex items-center gap-4 text-stone-300 font-mono text-[11px]">
                <span>Demarcation: {project.masterPlan.demarcationType}</span>
                <span className="hidden sm:inline text-stone-500">•</span>
                <span className="hidden sm:inline text-[#C8A870]">Click image to expand ↗</span>
              </div>
            </div>
          </div>

          {/* Technical Sector Breakdown Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-xs font-mono">
            <div className="p-3.5 rounded-lg bg-[#0E1511] border border-stone-800 flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-[#C8A870]/20 flex items-center justify-center text-[#C8A870] font-bold text-xs">
                A
              </div>
              <div>
                <strong className="text-white block font-sans">Sector A (Villa Plots)</strong>
                <span className="text-stone-400 text-[11px]">100 - 150 Gaj • 40-Ft Frontage</span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0E1511] border border-stone-800 flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-[#C8A870]/20 flex items-center justify-center text-[#C8A870] font-bold text-xs">
                B
              </div>
              <div>
                <strong className="text-white block font-sans">Sector B (Boulevard Plots)</strong>
                <span className="text-stone-400 text-[11px]">200 - 250 Gaj • Park Facing</span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0E1511] border border-stone-800 flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-[#C8A870]/20 flex items-center justify-center text-[#C8A870] font-bold text-xs">
                C
              </div>
              <div>
                <strong className="text-white block font-sans">Sector C & Commercial</strong>
                <span className="text-stone-400 text-[11px]">500 Gaj Farmsteads & Retail</span>
              </div>
            </div>
          </div>

          {/* Road Hierarchy & Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-[#0A1D16] border border-stone-800">
              <span className="text-xs font-mono uppercase text-[#C8A870] block mb-2">Road Hierarchy</span>
              <ul className="space-y-1.5 text-xs text-stone-300">
                {project.masterPlan.roadHierarchy.map((road, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A870]" />
                    <span>{road}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-[#0A1D16] border border-stone-800">
              <span className="text-xs font-mono uppercase text-[#C8A870] block mb-2">Spatial Distribution</span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-stone-300">
                  <span>Gross Township Area:</span>
                  <strong className="text-white">{project.masterPlan.totalArea}</strong>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Open Green Ratio:</span>
                  <strong className="text-emerald-400">{project.masterPlan.openGreenRatio}</strong>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Demarcation Method:</span>
                  <span className="text-stone-300">{project.masterPlan.demarcationType}</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#0A1D16] border border-stone-800">
              <span className="text-xs font-mono uppercase text-[#C8A870] block mb-2">Layout Hallmarks</span>
              <ul className="space-y-1.5 text-xs text-stone-300">
                {project.masterPlan.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A870] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* =======================================================================
            FOLIO 04: CONNECTIVITY & REGIONAL LOCATION MAP
           ======================================================================= */}
        <section
          id="folio-connectivity"
          className="folio-page max-w-6xl mx-auto my-12 px-6 sm:px-12 py-16 bg-[#161B18] rounded-2xl border border-stone-800 shadow-2xl"
        >
          {/* Folio Page Header */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-8 text-xs font-mono text-stone-400">
            <span className="text-[#C8A870] uppercase font-bold tracking-wider">Folio 04 / 08 • Strategic Corridor & Location Map</span>
            <span>Jaipur Regional Transit Grid</span>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C8A870]">
                Strategic Location Intelligence
              </span>
              <span className="text-stone-500">•</span>
              <span className="text-xs font-mono text-[#C8A870]">{project.location.corridor}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-1">
              Connectivity & Regional Infrastructure Blueprint
            </h2>
            <p className="text-stone-300 text-sm mt-2 max-w-3xl font-light">
              {project.connectivity.corridorAnalysis}
            </p>
          </div>

          {/* Regional Location Map Graphic Card (Click to Zoom) */}
          <div
            onClick={() =>
              setLightboxImage({
                src: project.location.mapImage || "/images/catalogue/jaipur-location-map.jpg",
                title: `${project.title} — Regional Location & Connectivity Map`,
                subtitle: `Jaipur Real Estate Growth Corridor • Ring Road Expressway • Transit Distances & Arterial Routes`,
              })
            }
            className="group relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-[#C8A870]/40 shadow-2xl bg-[#07140F] mb-8 cursor-zoom-in"
          >
            <Image
              src={project.location.mapImage || "/images/catalogue/jaipur-location-map.jpg"}
              alt={`${project.title} Location Connectivity Map`}
              fill
              sizes="(max-width: 1200px) 100vw, 1100px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07140F]/90 via-transparent to-transparent pointer-events-none" />

            {/* Top Location Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3 text-xs pointer-events-none">
              <span className="bg-[#07140F]/90 backdrop-blur-md text-[#C8A870] font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-lg border border-[#C8A870]/40 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Jaipur Regional Growth Corridor Map</span>
              </span>
              <span className="bg-[#0A1D16]/90 backdrop-blur-md text-cyan-400 font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded border border-cyan-500/30">
                Ring Road Expressway Axis
              </span>
            </div>

            {/* Center Hover Prompt */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C8A870] text-[#0A1D16] font-semibold text-xs shadow-xl">
                <ZoomIn className="w-4 h-4" />
                <span>Click to Inspect Location Corridor Map</span>
              </span>
            </div>

            {/* Bottom Distance Rings Bar */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 text-xs bg-[#07140F]/90 backdrop-blur-md p-3.5 rounded-lg border border-[#C8A870]/25">
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  5 Mins: SEZ & Healthcare
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  10 Mins: Ring Road & Metro
                </span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  15 Mins: Jaipur Airport
                </span>
              </div>
              <span className="text-[#C8A870] font-mono text-[11px]">Click map to enlarge ↗</span>
            </div>
          </div>

          {/* Drive-time Matrix Table */}
          <div className="overflow-x-auto rounded-xl border border-stone-800 bg-[#0A1D16]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#C8A870]/20 bg-[#07140F] text-stone-400 uppercase font-mono text-[11px]">
                  <th className="py-3.5 px-4 sm:px-6">Destination Landmark</th>
                  <th className="py-3.5 px-4">Distance (KM)</th>
                  <th className="py-3.5 px-4">Est. Drive Time</th>
                  <th className="py-3.5 px-4 sm:px-6">Primary Arterial Route</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800">
                {project.connectivity.highlights.map((point, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-white flex items-center gap-2">
                      <Car className="w-4 h-4 text-[#C8A870] flex-shrink-0" />
                      <span>{point.destination}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-300">{point.distance}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#C8A870]">{point.driveTime}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-stone-400">{point.via}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =======================================================================
            FOLIO 05: INFRASTRUCTURE & ON-SITE DEVELOPMENT GALLERY
           ======================================================================= */}
        <section
          id="folio-infrastructure"
          className="folio-page max-w-6xl mx-auto my-12 px-6 sm:px-12 py-16 bg-[#161B18] rounded-2xl border border-stone-800 shadow-2xl"
        >
          {/* Folio Page Header */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-8 text-xs font-mono text-stone-400">
            <span className="text-[#C8A870] uppercase font-bold tracking-wider">Folio 05 / 08 • Infrastructure & On-Site Gallery</span>
            <span>Civil Development & Physical Execution</span>
          </div>

          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8A870]">
              Civil Works & On-Site Execution
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-1">
              Township Development & Visual Photo Gallery
            </h2>
            <p className="text-stone-300 text-sm mt-2 max-w-3xl font-light">
              High-resolution photographic documentation of the plotted township development: monumental entry gatehouses, paved bitumen roads, boundary corner stones, and underground utility conduits.
            </p>
          </div>

          {/* On-Site Visual Gallery (4 High-Res Cards with Lightbox Trigger) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {/* Gallery Item 1: Entrance Gate */}
            <div
              onClick={() =>
                setLightboxImage({
                  src: "/images/catalogue/entrance-archway.jpg",
                  title: `${project.title} — Grand Entrance Gateway`,
                  subtitle: "Architectural Rajasthani Sandstone Gatehouse with Automated Security Boom Barriers & 24/7 Guard Cabin",
                })
              }
              className="group relative aspect-[16/10] rounded-xl overflow-hidden border border-[#C8A870]/30 bg-[#07140F] shadow-lg cursor-zoom-in"
            >
              <Image
                src="/images/catalogue/entrance-archway.jpg"
                alt="Grand Entrance Gateway"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07140F] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-white block font-medium">Grand Entrance Gatehouse</strong>
                  <span className="text-stone-300 text-[11px]">Sandstone Archway & Boom Barrier</span>
                </div>
                <span className="p-1.5 rounded-full bg-[#C8A870]/20 text-[#C8A870]">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Gallery Item 2: Demarcated Plots */}
            <div
              onClick={() =>
                setLightboxImage({
                  src: "/images/catalogue/demarcated-plots.jpg",
                  title: `${project.title} — Demarcated Plots & Paved Sector Roads`,
                  subtitle: "Ready-for-construction demarcated residential plots with 40-ft bitumen blacktop roads & numbered boundary stones",
                })
              }
              className="group relative aspect-[16/10] rounded-xl overflow-hidden border border-[#C8A870]/30 bg-[#07140F] shadow-lg cursor-zoom-in"
            >
              <Image
                src="/images/catalogue/demarcated-plots.jpg"
                alt="Demarcated Plots and Roads"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07140F] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-white block font-medium">Demarcated Plotted Layout</strong>
                  <span className="text-stone-300 text-[11px]">40-Ft Bitumen Road & Concrete Pegs</span>
                </div>
                <span className="p-1.5 rounded-full bg-[#C8A870]/20 text-[#C8A870]">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Gallery Item 3: Master Plan Drawing */}
            <div
              onClick={() =>
                setLightboxImage({
                  src: "/images/catalogue/master-plan-blueprint.jpg",
                  title: `${project.title} — JDA Layout Sanction Drawing`,
                  subtitle: "Civil Engineering CAD blueprint plan with Sector A, B, C layout and Central Park demarcations",
                })
              }
              className="group relative aspect-[16/10] rounded-xl overflow-hidden border border-[#C8A870]/30 bg-[#07140F] shadow-lg cursor-zoom-in"
            >
              <Image
                src="/images/catalogue/master-plan-blueprint.jpg"
                alt="CAD Master Plan Blueprint"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07140F] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-white block font-medium">Master Plan CAD Blueprint</strong>
                  <span className="text-stone-300 text-[11px]">Official JDA Scheme Sanction Plan</span>
                </div>
                <span className="p-1.5 rounded-full bg-[#C8A870]/20 text-[#C8A870]">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Gallery Item 4: Jaipur Growth Corridor Map */}
            <div
              onClick={() =>
                setLightboxImage({
                  src: "/images/catalogue/jaipur-location-map.jpg",
                  title: `${project.title} — Jaipur Growth Corridor Map`,
                  subtitle: "Regional connectivity diagram showing Ring Road Expressway, Airport, and healthcare corridors",
                })
              }
              className="group relative aspect-[16/10] rounded-xl overflow-hidden border border-[#C8A870]/30 bg-[#07140F] shadow-lg cursor-zoom-in"
            >
              <Image
                src="/images/catalogue/jaipur-location-map.jpg"
                alt="Jaipur Growth Corridor Location Map"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07140F] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-white block font-medium">Location Corridor Map</strong>
                  <span className="text-stone-300 text-[11px]">Ring Road Expressway Connectivity</span>
                </div>
                <span className="p-1.5 rounded-full bg-[#C8A870]/20 text-[#C8A870]">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {project.infrastructure.features.map((feat, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-[#0A1D16] border border-stone-800 hover:border-[#C8A870]/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#C8A870]/15 border border-[#C8A870]/30 flex items-center justify-center text-[#C8A870] mb-3">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base font-bold text-white mb-1.5">{feat.title}</h3>
                <p className="text-stone-400 text-xs leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>

          {/* Technical Engineering Bulletins */}
          <div className="p-6 rounded-xl bg-[#07140F] border border-stone-800">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C8A870] block mb-3">
              Engineering Construction Specifications
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.infrastructure.engineeringSpecs.map((spec, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-stone-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A870] flex-shrink-0 mt-0.5" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =======================================================================
            FOLIO 06: PLOT TYPOLOGIES & PRICING MATRIX
           ======================================================================= */}
        <section
          id="folio-typologies"
          className="folio-page max-w-6xl mx-auto my-12 px-6 sm:px-12 py-16 bg-[#161B18] rounded-2xl border border-stone-800 shadow-2xl"
        >
          {/* Folio Page Header */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-8 text-xs font-mono text-stone-400">
            <span className="text-[#C8A870] uppercase font-bold tracking-wider">Folio 06 / 08 • Plot Typologies & Matrix</span>
            <span>Demarcated Gaj Parcels</span>
          </div>

          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8A870]">
              Available Configurations
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-1">
              Plot Typologies & Indicative Investment Schedule
            </h2>
            <p className="text-stone-300 text-sm mt-2 max-w-3xl font-light">
              All plots are measured in authentic Rajasthan Gaj (Square Yards) with clear title patta documentation and immediate possession suitability.
            </p>
          </div>

          {/* Typology Selector Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.typologies.map((t, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTypology(idx)}
                className={`py-2 px-4 rounded-lg text-xs font-semibold transition-all ${
                  selectedTypology === idx
                    ? "bg-[#C8A870] text-[#0A1D16] shadow-md"
                    : "bg-[#0A1D16] text-stone-300 hover:text-white border border-stone-800 hover:border-[#C8A870]/30"
                }`}
              >
                {t.categoryName} ({t.sizeGaj} Gaj)
              </button>
            ))}
          </div>

          {/* Selected Typology Detail Card */}
          {project.typologies[selectedTypology] && (
            <div className="p-6 sm:p-8 rounded-xl bg-[#0A1D16] border border-[#C8A870]/30 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stone-800 pb-6 mb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#C8A870]">Selected Configuration</span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                    {project.typologies[selectedTypology].categoryName} — {project.typologies[selectedTypology].sizeGaj} Gaj
                  </h3>
                  <p className="text-stone-400 text-xs mt-1">
                    Equivalent to ~{project.typologies[selectedTypology].sizeSqFt.toLocaleString()} Sq.Ft. • Suitability: {project.typologies[selectedTypology].recommendedFor}
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block">
                    Indicative Base Valuation
                  </span>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C8A870]">
                    {project.typologies[selectedTypology].startingPrice}
                  </div>
                  <span className="text-xs text-stone-400 block mt-0.5">
                    @ {project.typologies[selectedTypology].pricePerGaj}
                  </span>
                </div>
              </div>

              {/* Typology Specifications Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-lg bg-[#121614] border border-stone-800">
                  <span className="text-stone-400 text-[11px] block">Frontage Dimensions</span>
                  <strong className="text-white text-sm block mt-1">{project.typologies[selectedTypology].dimensions}</strong>
                </div>
                <div className="p-4 rounded-lg bg-[#121614] border border-stone-800">
                  <span className="text-stone-400 text-[11px] block">Front Road Width</span>
                  <strong className="text-white text-sm block mt-1">{project.typologies[selectedTypology].roadWidth}</strong>
                </div>
                <div className="p-4 rounded-lg bg-[#121614] border border-stone-800">
                  <span className="text-stone-400 text-[11px] block">Orientations</span>
                  <strong className="text-white text-sm block mt-1">{project.typologies[selectedTypology].facingOptions.join(", ")}</strong>
                </div>
                <div className="p-4 rounded-lg bg-[#121614] border border-stone-800">
                  <span className="text-stone-400 text-[11px] block">Possession Status</span>
                  <strong className="text-emerald-400 text-sm block mt-1">{project.legalClearances.possessionTimeline}</strong>
                </div>
              </div>
            </div>
          )}

          {/* Full Typologies Comparison Table */}
          <div className="overflow-x-auto rounded-xl border border-stone-800 bg-[#0A1D16]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#C8A870]/20 bg-[#07140F] text-stone-400 uppercase font-mono text-[11px]">
                  <th className="py-3 px-4">Typology</th>
                  <th className="py-3 px-4">Area (Gaj)</th>
                  <th className="py-3 px-4">Dimensions</th>
                  <th className="py-3 px-4">Road Width</th>
                  <th className="py-3 px-4">Rate / Gaj</th>
                  <th className="py-3 px-4">Indicative Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800">
                {project.typologies.map((t, idx) => (
                  <tr
                    key={idx}
                    onClick={() => setSelectedTypology(idx)}
                    className={`cursor-pointer transition-colors ${
                      selectedTypology === idx ? "bg-[#C8A870]/10" : "hover:bg-white/[0.02]"
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-white">{t.categoryName}</td>
                    <td className="py-3 px-4 font-mono text-stone-300">{t.sizeGaj} Gaj</td>
                    <td className="py-3 px-4 text-stone-400">{t.dimensions}</td>
                    <td className="py-3 px-4 text-stone-400">{t.roadWidth}</td>
                    <td className="py-3 px-4 text-[#C8A870] font-medium">{t.pricePerGaj}</td>
                    <td className="py-3 px-4 font-serif font-bold text-white">{t.startingPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =======================================================================
            FOLIO 07: STATUTORY DISCLOSURES & LEGAL CLEARANCES
           ======================================================================= */}
        <section
          id="folio-clearances"
          className="folio-page max-w-6xl mx-auto my-12 px-6 sm:px-12 py-16 bg-[#161B18] rounded-2xl border border-stone-800 shadow-2xl"
        >
          {/* Folio Page Header */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-8 text-xs font-mono text-stone-400">
            <span className="text-[#C8A870] uppercase font-bold tracking-wider">Folio 07 / 08 • Statutory Compliance</span>
            <span>Legal Due Diligence & Titles</span>
          </div>

          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8A870]">
              Title Due Diligence & Certifications
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-1">
              Government Approvals & Bank Loan Partners
            </h2>
            <p className="text-stone-300 text-sm mt-2 max-w-3xl font-light">
              Full transparency on government sanctions, conversion orders, and institutional approvals. Every document is verified and accessible during your advisory session.
            </p>
          </div>

          {/* Compliance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="p-5 rounded-xl bg-[#0A1D16] border border-[#C8A870]/30">
              <ShieldCheck className="w-6 h-6 text-[#C8A870] mb-2" />
              <span className="text-[10px] font-mono uppercase text-stone-400 block">JDA Clearance</span>
              <strong className="text-white text-sm block mt-1">{project.legalClearances.jdaSanctionNo}</strong>
              <span className="text-[10px] text-emerald-400 mt-1 block">Sanction Order Verified</span>
            </div>

            <div className="p-5 rounded-xl bg-[#0A1D16] border border-[#C8A870]/30">
              <FileCheck className="w-6 h-6 text-[#C8A870] mb-2" />
              <span className="text-[10px] font-mono uppercase text-stone-400 block">Section 90A Order</span>
              <strong className="text-white text-sm block mt-1">{project.legalClearances.order90A}</strong>
              <span className="text-[10px] text-emerald-400 mt-1 block">Converted for Residential</span>
            </div>

            <div className="p-5 rounded-xl bg-[#0A1D16] border border-[#C8A870]/30">
              <Landmark className="w-6 h-6 text-[#C8A870] mb-2" />
              <span className="text-[10px] font-mono uppercase text-stone-400 block">RERA Rajasthan</span>
              <strong className="text-white text-sm block mt-1">{project.legalClearances.reraRegistration}</strong>
              <span className="text-[10px] text-emerald-400 mt-1 block">Regulatory Compliance</span>
            </div>

            <div className="p-5 rounded-xl bg-[#0A1D16] border border-[#C8A870]/30">
              <CheckCircle2 className="w-6 h-6 text-[#C8A870] mb-2" />
              <span className="text-[10px] font-mono uppercase text-stone-400 block">Title Search</span>
              <strong className="text-white text-sm block mt-1">{project.legalClearances.registryReadiness}</strong>
              <span className="text-[10px] text-emerald-400 mt-1 block">Clear Search Certificate</span>
            </div>
          </div>

          {/* Approved Banks */}
          <div className="p-6 rounded-xl bg-[#0A1D16] border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C8A870] block">
                Approved Banking Institutions (Up to 80% Loan)
              </span>
              <p className="text-stone-300 text-xs mt-1">
                Pre-approved residential plot financing available with leading public & private sector banks:
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.legalClearances.approvedBanks.map((bank: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded bg-[#121614] border border-stone-800 text-xs text-white font-medium"
                >
                  {bank}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* =======================================================================
            FOLIO 08: ADVISORY CONCIERGE & BACK COVER
           ======================================================================= */}
        <section
          id="folio-advisory"
          className="folio-page max-w-6xl mx-auto my-12 p-8 sm:p-14 bg-[#07140F] rounded-2xl border border-[#C8A870]/40 shadow-2xl relative overflow-hidden text-center sm:text-left"
        >
          {/* Subtle Background Ornament (GPU-accelerated) */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full glow-gold" />

          {/* Folio Page Header */}
          <div className="flex items-center justify-between border-b border-[#C8A870]/20 pb-4 mb-10 text-xs font-mono text-stone-400">
            <span className="text-[#C8A870] uppercase font-bold tracking-wider">Folio 08 / 08 • Advisory & Site Visit</span>
            <span>Jaipur Plotted Advisory Desk</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C8A870]/20 border border-[#C8A870]/40 text-[#C8A870] text-xs font-semibold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                Chauffeur-Driven Site Inspection
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
                Inspect <span className="text-[#C8A870] italic">{project.title}</span> in Person
              </h2>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
                Experience the township layout, on-site road network, electrification, and surrounding infrastructure firsthand. 
                Our senior plot advisory associates provide private chauffeur pickup across Jaipur, complete layout dossiers, and registry legal verification.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#C8A870]" />
                  <span>Direct Hotline: +91 141 278-9000</span>
                </div>
                <div>•</div>
                <div>Available 7 Days a Week (9:00 AM – 7:00 PM)</div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/schedule-visit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C8A870] hover:bg-[#b8965d] text-[#0A1D16] font-semibold text-sm py-4 px-6 rounded-xl transition-colors shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Site Inspection</span>
              </Link>

              <button
                onClick={handlePrint}
                className="print-hidden w-full inline-flex items-center justify-center gap-2 bg-[#161B18] hover:bg-[#1f2622] text-stone-200 border border-stone-700 text-xs font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                <Printer className="w-4 h-4 text-[#C8A870]" />
                <span>Save Catalogue as PDF</span>
              </button>

              <Link
                href="/catalogue"
                className="print-hidden w-full inline-flex items-center justify-center gap-1.5 text-stone-400 hover:text-[#C8A870] text-xs py-2 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to All Catalogues</span>
              </Link>
            </div>
          </div>

          {/* Editorial Colophon / Back Cover Footer */}
          <div className="mt-14 pt-8 border-t border-[#C8A870]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-mono">
            <div>
              TERRA FIRMA ARCHITECTURAL PUBLICATIONS • {project.volume} ({project.edition})
            </div>
            <div>
              Demarcated Plots Measured in Gaj • 100% JDA Patta Verified
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Fullscreen Asset Inspection Modal */}
      {lightboxImage && (
        <div
          className="print-hidden fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between gap-4 border-b border-stone-800 pb-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-[10px] font-mono text-[#C8A870] uppercase tracking-wider block">
                High-Resolution Asset Inspection
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white truncate max-w-xl">
                {lightboxImage.title}
              </h3>
              <p className="text-xs text-stone-400 truncate max-w-xl">{lightboxImage.subtitle}</p>
            </div>
            <button
              onClick={() => setLightboxImage(null)}
              className="p-2 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors border border-stone-700"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image Container */}
          <div
            className="relative flex-1 my-3 flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-5xl max-h-[78vh]">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className="flex items-center justify-between text-xs text-stone-400 border-t border-stone-800 pt-3"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="hidden sm:inline">Click anywhere outside or press Esc to return</span>
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-emerald-400 font-mono text-[11px]">● 100% Verified Civil Drawing</span>
              <button
                onClick={() => setLightboxImage(null)}
                className="px-4 py-1.5 rounded-md bg-[#C8A870] hover:bg-[#b8965d] text-[#0A1D16] font-semibold text-xs transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
