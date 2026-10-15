"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  TreePine,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { getPromotionsByPlacement, PromotionItem } from "@/data/promotions";
import { useAdminData } from "@/context/AdminDataContext";

export default function ImageSpotlightSection() {
  const { advertisements } = useAdminData();
  const activeSpotlightAds = advertisements.filter(
    (a) => a.status === "published" && a.placement === "image-spotlight"
  );
  const promo: PromotionItem | undefined =
    activeSpotlightAds[0] || getPromotionsByPlacement("image-spotlight")[0];

  if (!promo) return null;

  return (
    <section className="bg-[#FAF8F5] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Dual-Image Showcase */}
          <div className="lg:col-span-6 relative">
            {/* Primary Large Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-stone-200 bg-[#0A1D16] group">
              <Image
                src={promo.coverImage}
                alt={promo.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D16]/80 via-transparent to-transparent pointer-events-none" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-[#0A1D16]/90 backdrop-blur-md text-[#C8A870] border border-[#C8A870]/30 text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm">
                  {promo.badge.text}
                </span>
              </div>

              {/* Bottom Label */}
              {promo.locationLabel && (
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-stone-200 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#C8A870] flex-shrink-0" />
                  <span>{promo.locationLabel}</span>
                </div>
              )}
            </div>

            {/* Secondary Overlapping Blueprint Image */}
            {promo.secondaryImage && (
              <div className="hidden sm:block absolute -bottom-10 -right-8 w-60 sm:w-72 aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-[#07140F]">
                <Image
                  src={promo.secondaryImage}
                  alt="CAD Layout Blueprint"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07140F]/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 text-[10px] font-mono text-[#C8A870]">
                  Approved Layout Blueprint
                </div>
              </div>
            )}
          </div>

          {/* Right Editorial Story & Specs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8F6F3B]">
                Curated Parcel Spotlight
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1D16] tracking-tight leading-tight">
                {promo.title}
              </h2>
              {promo.tagline && (
                <p className="font-serif text-lg sm:text-xl text-[#8F6F3B] font-light italic">
                  &ldquo;{promo.tagline}&rdquo;
                </p>
              )}
            </div>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-light">
              {promo.description}
            </p>

            {/* Price & Offer Box */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-mono">Indicative Valuation</span>
                <strong className="text-2xl font-serif font-bold text-[#0A1D16]">
                  {promo.priceDetails || "₹46,000 / Gaj"}
                </strong>
              </div>
              {promo.offerDetails && (
                <div className="sm:text-right">
                  <span className="text-stone-500 block text-[10px] uppercase font-mono">Service Privilege</span>
                  <span className="text-emerald-700 font-semibold">{promo.offerDetails}</span>
                </div>
              )}
            </div>

            {/* Highlights List */}
            {promo.highlights && promo.highlights.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {promo.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A870] flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href={promo.ctaLink}
                className="inline-flex items-center gap-2 bg-[#0A1D16] hover:bg-[#133428] text-white font-semibold text-xs sm:text-sm py-3.5 px-6 rounded-xl transition-colors shadow-md"
              >
                <FileText className="w-4 h-4 text-[#C8A870]" />
                <span>{promo.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-[#C8A870]" />
              </Link>
              <Link
                href="/schedule-visit"
                className="inline-flex items-center gap-2 text-stone-700 hover:text-[#0A1D16] font-semibold text-xs sm:text-sm py-3.5 px-4 transition-colors"
              >
                <span>Book Site Inspection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
