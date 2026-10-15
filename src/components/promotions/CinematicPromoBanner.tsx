"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  FileText,
  Compass,
} from "lucide-react";
import { getPromotionsByPlacement, PromotionItem } from "@/data/promotions";
import { useAdminData } from "@/context/AdminDataContext";

export default function CinematicPromoBanner() {
  const { advertisements } = useAdminData();
  const activeCinematicAds = advertisements.filter(
    (a) => a.status === "published" && a.placement === "cinematic-banner"
  );
  const promo: PromotionItem | undefined =
    activeCinematicAds[0] || getPromotionsByPlacement("cinematic-banner")[0];

  if (!promo) return null;

  return (
    <section className="relative bg-[#07140F] text-[#FAF8F5] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-b border-[#C8A870]/25">
      {/* Background Graphic with Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src={promo.coverImage}
          alt={promo.title}
          fill
          sizes="100vw"
          className="object-cover opacity-20 filter saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07140F] via-[#07140F]/90 to-[#07140F]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,transparent_0%,#07140F_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C8A870]/20 border border-[#C8A870]/40 text-[#C8A870] text-xs font-semibold uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" />
                {promo.badge.text}
              </span>
              {promo.locationLabel && (
                <span className="inline-flex items-center gap-1.5 text-stone-300 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#C8A870]" />
                  <span>{promo.locationLabel}</span>
                </span>
              )}
            </div>

            <div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                {promo.title}
              </h2>
              {promo.tagline && (
                <p className="font-serif text-xl sm:text-2xl text-[#C8A870] font-light italic mt-3">
                  &ldquo;{promo.tagline}&rdquo;
                </p>
              )}
            </div>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
              {promo.description}
            </p>

            {/* Highlights List */}
            {promo.highlights && promo.highlights.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {promo.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-stone-200 bg-[#0E1511] p-3 rounded-lg border border-stone-800">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A870] flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Action CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href={promo.ctaLink}
                className="inline-flex items-center gap-2 bg-[#C8A870] hover:bg-[#b8965d] text-[#0A1D16] font-semibold text-sm py-4 px-7 rounded-xl transition-colors shadow-lg"
              >
                <FileText className="w-4 h-4" />
                <span>{promo.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/schedule-visit"
                className="inline-flex items-center gap-2 bg-[#121614] hover:bg-[#1a201d] text-stone-200 border border-stone-700 text-sm py-4 px-6 rounded-xl transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#C8A870]" />
                <span>Book Site Inspection</span>
              </Link>
            </div>
          </div>

          {/* Right Metrics & Asset Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#0E1511] rounded-2xl p-6 sm:p-8 border border-[#C8A870]/30 shadow-2xl relative">
              <div className="border-b border-stone-800 pb-4 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8A870] block">
                  Corridor Advantage Dossier
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  Key Investment Benchmarks
                </h3>
              </div>

              {/* Stats Grid */}
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-[#07140F] border border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-stone-400 text-xs block">Frontage Arterial Width</span>
                    <strong className="text-white text-base font-serif">200-Ft Sector Road Frontage</strong>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#C8A870]/15 text-[#C8A870] text-xs font-mono font-bold">
                    Direct Access
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#07140F] border border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-stone-400 text-xs block">Indicative Starting Valuation</span>
                    <strong className="text-[#C8A870] text-xl font-serif font-bold">
                      {promo.priceDetails || "₹24,500 / Gaj"}
                    </strong>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-300 text-xs font-mono font-medium">
                    Pre-Cloverleaf
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#07140F] border border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-stone-400 text-xs block">Title & Legal Sanction</span>
                    <strong className="text-white text-base font-serif">100% Freehold Section 90A</strong>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-300 text-xs font-mono font-medium">
                    Registry Ready
                  </span>
                </div>
              </div>

              {/* Sub-Registrar Assurance */}
              <div className="p-4 rounded-xl bg-[#07140F] border border-[#C8A870]/20 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C8A870] flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-medium">Direct Registry Verification</strong>
                  <p className="text-stone-400 mt-0.5">
                    Individual Khasra title deeds verified for immediate execution at the Jaipur Sub-Registrar office.
                  </p>
                </div>
              </div>
            </div>

            {promo.disclaimer && (
              <span className="text-[10px] text-stone-500 font-mono mt-3 block text-center">
                {promo.disclaimer}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
