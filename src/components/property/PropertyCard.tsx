"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, Compass, MapPin, Maximize2, ShieldCheck, ArrowRight, Calendar } from "lucide-react";
import { PropertyPlot } from "@/types/property";
import { useWishlist } from "@/context/WishlistContext";

interface PropertyCardProps {
  plot: PropertyPlot;
  viewMode?: "grid" | "list";
}

export default function PropertyCard({ plot, viewMode = "grid" }: PropertyCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const saved = isInWishlist(plot.id);

  if (viewMode === "list") {
    return (
      <div className="group bg-white rounded-xl border border-[#C8A870]/25 overflow-hidden hover:border-[#C8A870] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col md:flex-row">
        {/* Image Container */}
        <div className="relative w-full md:w-80 h-64 md:h-auto flex-shrink-0 bg-stone-100 overflow-hidden">
          <Image
            src={plot.heroImage}
            alt={plot.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 320px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
          
          {/* Category & Status */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span className="px-2.5 py-1 rounded bg-[#0A1D16]/90 text-[#C8A870] text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border border-[#C8A870]/30">
              {plot.category}
            </span>
            <span className="px-2.5 py-1 rounded bg-white/90 text-[#07140F] text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
              {plot.status}
            </span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(plot.id)}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all z-10 ${
              saved
                ? "bg-[#C8A870] text-[#07140F] shadow-lg"
                : "bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm"
            }`}
            title={saved ? "Remove from saved" : "Save plot"}
            aria-label="Toggle wishlist"
          >
            <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Info Container */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#C8A870] flex-shrink-0" />
              <span>{plot.location.locality}, {plot.location.city}</span>
              <span className="text-stone-300">•</span>
              <span className="text-[#14382C] font-medium">{plot.location.corridor}</span>
            </div>

            <Link href={`/plots/${plot.id}`} className="group-hover:text-[#14382C]">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A1D16] transition-colors">
                {plot.title}
              </h3>
            </Link>

            <p className="text-stone-600 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
              {plot.overview}
            </p>

            {/* Plot Dimensions Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 py-3 border-y border-stone-100 text-xs">
              <div>
                <span className="text-[10px] uppercase text-stone-400 font-semibold block">Plot Area</span>
                <span className="font-semibold text-stone-900">
                  {plot.dimensions.plotAreaGaj} Gaj (वर्ग गज)
                </span>
                <span className="text-[10px] text-stone-500 block">({plot.dimensions.plotAreaSqFt.toLocaleString()} Sq.Ft)</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-stone-400 font-semibold block">Dimensions</span>
                <span className="font-semibold text-stone-900">
                  {plot.dimensions.frontageFt} x {plot.dimensions.depthFt} Ft
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-stone-400 font-semibold block">Facing</span>
                <span className="font-semibold text-stone-900 flex items-center gap-1">
                  <Compass className="w-3 h-3 text-[#C8A870]" />
                  {plot.dimensions.facing}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-stone-400 font-semibold block">Approval</span>
                <span className="font-semibold text-[#14382C] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#C8A870]" />
                  {plot.legal.approvalStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing & CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">
                Total Plot Consideration
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-bold text-[#0A1D16]">
                  {plot.price.formatted}
                </span>
                <span className="text-xs text-stone-500">
                  (~₹{plot.price.pricePerSqFt}/sq.ft)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link
                href={`/schedule-visit?plotId=${plot.id}`}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded bg-stone-100 hover:bg-[#0A1D16] hover:text-[#FAF8F5] text-stone-800 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Site Visit</span>
              </Link>
              <Link
                href={`/plots/${plot.id}`}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded bg-[#0A1D16] hover:bg-[#14382C] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow"
              >
                <span>View Parcel</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C8A870]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid View
  return (
    <div className="group bg-white rounded-xl border border-[#C8A870]/25 overflow-hidden hover:border-[#C8A870] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full bg-stone-100 overflow-hidden">
        <Image
          src={plot.heroImage}
          alt={plot.title}
          fill
          className="object-cover group-hover:scale-104 transition-transform duration-500 will-change-transform"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded bg-[#0A1D16]/90 text-[#C8A870] text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border border-[#C8A870]/30">
            {plot.category}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(plot.id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all z-10 ${
            saved
              ? "bg-[#C8A870] text-[#07140F] shadow-lg"
              : "bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm"
          }`}
          title={saved ? "Remove from saved" : "Save plot"}
          aria-label="Toggle wishlist"
        >
          <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
        </button>

        {/* Bottom image overlay: Status & Area */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
          <span className="inline-flex items-center gap-1 font-semibold text-[11px] bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
            <Maximize2 className="w-3 h-3 text-[#C8A870]" />
            {plot.dimensions.plotAreaGaj} Gaj ({plot.dimensions.plotAreaSqFt.toLocaleString()} Sq.Ft)
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#C8A870] text-[#07140F] px-2 py-0.5 rounded">
            {plot.dimensions.facing} Facing
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C8A870] flex-shrink-0" />
            <span className="truncate">{plot.location.locality}, {plot.location.city}</span>
          </div>

          <Link href={`/plots/${plot.id}`}>
            <h3 className="font-serif text-lg font-bold text-[#0A1D16] group-hover:text-[#14382C] transition-colors line-clamp-1">
              {plot.title}
            </h3>
          </Link>

          <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
            {plot.tagline}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-stone-100 text-xs">
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Frontage</span>
              <span className="font-medium text-stone-800">{plot.dimensions.frontageFt} Ft Road</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Approval</span>
              <span className="font-medium text-[#14382C] flex items-center gap-1 truncate">
                <ShieldCheck className="w-3 h-3 text-[#C8A870] flex-shrink-0" />
                <span className="truncate">{plot.legal.approvalStatus}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Footer: Price & CTA */}
        <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">
              Starting From
            </span>
            <span className="font-serif text-lg font-bold text-[#0A1D16]">
              {plot.price.formatted}
            </span>
          </div>

          <Link
            href={`/plots/${plot.id}`}
            className="p-2.5 rounded bg-[#0A1D16] group-hover:bg-[#14382C] text-[#FAF8F5] transition-all flex items-center gap-1 text-xs font-semibold"
            aria-label={`View details for ${plot.title}`}
          >
            <span className="text-[11px] uppercase tracking-wider">Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C8A870]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
