"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Clock,
  MapPin,
  TrendingUp,
  Bell,
  CheckCircle2,
  Calendar,
  FileText,
} from "lucide-react";
import { PromotionItem, AdPlacement } from "@/data/promotions";

interface AdvertisementLivePreviewProps {
  ad: Partial<PromotionItem>;
}

export default function AdvertisementLivePreview({ ad }: AdvertisementLivePreviewProps) {
  const placement: AdPlacement = ad.placement || "promotional-carousel";

  const title = ad.title || "Headline for Promotional Opportunity";
  const tagline = ad.tagline || "Strategic Investment Corridor • Demarcated Land";
  const description =
    ad.description ||
    "Curated freehold parcel allotment situated directly on major arterial transit axis.";
  const badgeText = ad.badge?.text || "New Opportunity";
  const coverImage =
    ad.coverImage || "/images/catalogue/demarcated-plots.jpg";
  const ctaText = ad.ctaText || "Explore Details";
  const locationLabel = ad.locationLabel || "Jaipur Growth Corridor";
  const priceDetails = ad.priceDetails || "₹34,000 / Gaj";

  return (
    <div className="bg-stone-900 rounded-2xl p-4 sm:p-6 border border-stone-800 text-white space-y-4">
      <div className="flex items-center justify-between border-b border-stone-800 pb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-stone-300 uppercase font-semibold">
            Live Homepage Placement Preview:
          </span>
          <span className="px-2 py-0.5 rounded bg-[#C8A870]/20 text-[#DFBE82] font-mono text-[10px]">
            {placement}
          </span>
        </div>
        <span className="text-stone-500 text-[10px] font-mono hidden sm:inline">
          Exact Public View Render
        </span>
      </div>

      {/* Render according to chosen placement */}
      {placement === "announcement-ticker" && (
        <div className="bg-[#0A1D16] text-[#FAF8F5] border border-[#C8A870]/25 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded bg-[#C8A870]/20 text-[#C8A870] font-semibold text-[10px] uppercase tracking-wider border border-[#C8A870]/30 flex-shrink-0 flex items-center gap-1">
              <Bell className="w-3 h-3" />
              {badgeText}
            </span>
            <p className="text-stone-300 text-xs truncate max-w-md">
              <strong className="text-white font-medium mr-1.5">{title}:</strong>
              <span>{description}</span>
            </p>
          </div>
          <span className="text-[#C8A870] font-semibold text-xs flex items-center gap-1 flex-shrink-0">
            <span>{ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      )}

      {placement === "countdown-banner" && (
        <div className="bg-[#07140F] border border-[#C8A870]/25 rounded-2xl p-6 relative overflow-hidden text-left">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-semibold uppercase">
                <Clock className="w-3 h-3" />
                {badgeText}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                {title}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                {description}
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="px-4 py-2 rounded-lg bg-[#C8A870] text-[#07140F] text-xs font-bold uppercase tracking-wider">
                  {ctaText}
                </span>
                <span className="text-xs text-[#DFBE82] font-serif font-bold">
                  {priceDetails}
                </span>
              </div>
            </div>

            <div className="md:col-span-5 bg-[#0E1511] p-4 rounded-xl border border-stone-800 text-center space-y-3">
              <span className="text-[10px] font-mono uppercase text-[#C8A870]">
                Launch Countdown Mockup
              </span>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-[#07140F] p-2 rounded border border-stone-800">
                  <span className="font-mono text-base font-bold text-white">28</span>
                  <span className="text-[9px] text-stone-400 block font-mono">Days</span>
                </div>
                <div className="bg-[#07140F] p-2 rounded border border-stone-800">
                  <span className="font-mono text-base font-bold text-white">14</span>
                  <span className="text-[9px] text-stone-400 block font-mono">Hrs</span>
                </div>
                <div className="bg-[#07140F] p-2 rounded border border-stone-800">
                  <span className="font-mono text-base font-bold text-white">35</span>
                  <span className="text-[9px] text-stone-400 block font-mono">Mins</span>
                </div>
                <div className="bg-[#07140F] p-2 rounded border border-stone-800">
                  <span className="font-mono text-base font-bold text-[#C8A870]">50</span>
                  <span className="text-[9px] text-stone-400 block font-mono">Secs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {placement === "cinematic-banner" && (
        <div className="bg-[#07140F] border border-[#C8A870]/25 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src={coverImage} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 space-y-3 max-w-xl text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C8A870]/20 border border-[#C8A870]/40 text-[#C8A870] text-xs font-semibold uppercase">
              <TrendingUp className="w-3.5 h-3.5" />
              {badgeText}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              {title}
            </h3>
            <p className="font-serif text-sm text-[#C8A870] italic">
              &ldquo;{tagline}&rdquo;
            </p>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              {description}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="px-5 py-2.5 rounded-xl bg-[#C8A870] text-[#07140F] text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <span>{ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      )}

      {(placement === "promotional-carousel" || placement === "image-spotlight") && (
        <div className="max-w-md mx-auto bg-white rounded-2xl overflow-hidden border border-stone-200 text-stone-900 shadow-lg text-left">
          <div className="relative aspect-[16/10] bg-[#0A1D16]">
            <img src={coverImage} alt="" className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#C8A870] text-[#07140F]">
                {badgeText}
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/60 text-white">
                {locationLabel}
              </span>
            </div>
          </div>

          <div className="p-5 space-y-3">
            <h4 className="font-serif text-lg font-bold text-[#07140F] line-clamp-1">
              {title}
            </h4>
            <p className="text-xs text-[#8F6F3B] font-medium line-clamp-1">
              {tagline}
            </p>
            <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-light">
              {description}
            </p>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
              <span className="text-stone-500 text-[11px]">Allotment Rate:</span>
              <strong className="text-[#07140F] font-semibold">{priceDetails}</strong>
            </div>

            <button
              type="button"
              className="w-full py-2.5 rounded-xl bg-[#07140F] text-white text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C8A870]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
