"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  ArrowRight,
  CheckCircle2,
  FileText,
} from "lucide-react";
import {
  getPromotionsByPlacement,
  PromotionItem,
  AdCategory,
} from "@/data/promotions";
import { useAdminData } from "@/context/AdminDataContext";

const CATEGORY_FILTERS: { label: string; value: AdCategory | "all" }[] = [
  { label: "All Opportunities", value: "all" },
  { label: "Special Offers", value: "special-offer" },
  { label: "New Project Launches", value: "new-launch" },
  { label: "Available Plots", value: "available-plots" },
  { label: "Recently Sold Out", value: "sold-out" },
];

export default function PromotionsCarousel() {
  const { advertisements } = useAdminData();
  const activeCarouselAds = advertisements.filter(
    (a) => a.status === "published" && a.placement === "promotional-carousel"
  );
  const allCarouselPromos =
    activeCarouselAds.length > 0
      ? activeCarouselAds
      : getPromotionsByPlacement("promotional-carousel");
  const [selectedCategory, setSelectedCategory] = useState<AdCategory | "all">("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const trackRef = useRef<HTMLDivElement>(null);

  // Responsive items count per view
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter promotions
  const filteredPromos = allCarouselPromos.filter(
    (p) => selectedCategory === "all" || p.category === selectedCategory
  );

  // Maximum valid starting index
  const maxIndex = Math.max(0, filteredPromos.length - visibleCount);

  // Reset index when filter changes or visibleCount changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory, visibleCount]);

  // Next Slide Action
  const handleNext = useCallback(() => {
    if (filteredPromos.length <= visibleCount) return;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [filteredPromos.length, visibleCount, maxIndex]);

  // Prev Slide Action
  const handlePrev = useCallback(() => {
    if (filteredPromos.length <= visibleCount) return;
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [filteredPromos.length, visibleCount, maxIndex]);

  // Auto-play interval (pauses on hover)
  useEffect(() => {
    if (isPaused || filteredPromos.length <= visibleCount) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused, filteredPromos.length, visibleCount, handleNext]);

  // Touch Swipe Handlers for Mobile & Tablet
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (allCarouselPromos.length === 0) return null;

  // Calculate hardware-accelerated translateX with gap offset
  const shiftPercent = (currentIndex * 100) / visibleCount;
  const shiftPx = (currentIndex * 24) / visibleCount;
  const trackTransform = `translateX(calc(-${shiftPercent}% - ${shiftPx}px))`;

  return (
    <section className="bg-[#FAF8F5] py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A870]/15 border border-[#C8A870]/30 text-[#8F6F3B] text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Land Opportunities & Announcements
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1D16] tracking-tight">
              Featured <span className="text-[#8F6F3B] italic">Promotions</span> & New Listings
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl font-light">
              Explore time-sensitive parcel allotments, corner splay plots, and high-growth land investment corridors across Jaipur, Rajasthan.
            </p>
          </div>

          {/* Carousel Interactive Controls (Working Previous & Next Buttons) */}
          <div className="flex items-center gap-3">
            {/* Slide Index Counter */}
            {filteredPromos.length > visibleCount && (
              <span className="text-xs font-mono text-stone-500 hidden sm:inline-block pr-1 select-none">
                <strong className="text-[#0A1D16] font-bold text-sm">
                  {String(currentIndex + 1).padStart(2, "0")}
                </strong>
                <span className="mx-1 text-stone-400">/</span>
                {String(maxIndex + 1).padStart(2, "0")}
              </span>
            )}

            <button
              onClick={handlePrev}
              disabled={filteredPromos.length <= visibleCount}
              className="w-11 h-11 rounded-full border border-stone-300 hover:border-[#C8A870] bg-white hover:bg-[#0A1D16] text-stone-800 hover:text-white flex items-center justify-center transition-all duration-200 disabled:opacity-35 disabled:cursor-not-allowed shadow-sm active:scale-95 cursor-pointer z-10"
              aria-label="Previous promotion slide"
              title="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={handleNext}
              disabled={filteredPromos.length <= visibleCount}
              className="w-11 h-11 rounded-full border border-stone-300 hover:border-[#C8A870] bg-white hover:bg-[#0A1D16] text-stone-800 hover:text-white flex items-center justify-center transition-all duration-200 disabled:opacity-35 disabled:cursor-not-allowed shadow-sm active:scale-95 cursor-pointer z-10"
              aria-label="Next promotion slide"
              title="Next slide"
            >
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 overflow-x-auto no-scrollbar">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`text-xs px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.value
                  ? "bg-[#0A1D16] text-white shadow-md border border-[#C8A870]"
                  : "bg-white text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Carousel Slider Viewport */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {filteredPromos.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
              <p className="text-stone-500 text-sm">No promotions active in this category at the moment.</p>
            </div>
          ) : (
            <div
              ref={trackRef}
              className="flex gap-6 will-change-transform"
              style={{
                transform: trackTransform,
                transition: "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {filteredPromos.map((promo) => {
                // Determine badge color
                const badgeStyles =
                  promo.badge.variant === "emerald"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : promo.badge.variant === "amber"
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : promo.badge.variant === "rose"
                    ? "bg-rose-50 text-rose-800 border-rose-200"
                    : "bg-[#C8A870]/15 text-[#8F6F3B] border-[#C8A870]/30";

                return (
                  <article
                    key={promo.id}
                    className="min-w-full sm:min-w-[calc(50%-12px)] lg:min-w-[calc(33.3333%-16px)] w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.3333%-16px)] flex-shrink-0 bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1 group"
                  >
                    {/* Card Cover Image */}
                    <Link
                      href={promo.ctaLink}
                      className="relative aspect-[16/10] overflow-hidden bg-[#0A1D16] block"
                    >
                      <Image
                        src={promo.coverImage}
                        alt={promo.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D16] via-transparent to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border backdrop-blur-md ${badgeStyles}`}
                        >
                          {promo.badge.text}
                        </span>
                        {promo.category === "sold-out" ? (
                          <span className="bg-rose-900/80 text-rose-200 text-[10px] font-mono uppercase px-2 py-0.5 rounded">
                            Archive
                          </span>
                        ) : (
                          <span className="bg-[#0A1D16]/80 text-[#FAF8F5] text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-[#C8A870]/30">
                            Verified JDA
                          </span>
                        )}
                      </div>

                      {/* Bottom Image Overlay Tag */}
                      {promo.locationLabel && (
                        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-stone-200 text-xs">
                          <MapPin className="w-3.5 h-3.5 text-[#C8A870] flex-shrink-0" />
                          <span className="truncate">{promo.locationLabel}</span>
                        </div>
                      )}
                    </Link>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title & Tagline */}
                        <h3 className="font-serif text-xl font-bold text-[#0A1D16] group-hover:text-[#8F6F3B] transition-colors line-clamp-1">
                          {promo.title}
                        </h3>
                        {promo.tagline && (
                          <p className="text-xs text-[#8F6F3B] font-medium mt-1 line-clamp-1">
                            {promo.tagline}
                          </p>
                        )}

                        <p className="text-stone-600 text-xs line-clamp-2 leading-relaxed mt-3 font-light">
                          {promo.description}
                        </p>

                        {/* Price & Offer Box */}
                        {(promo.priceDetails || promo.offerDetails) && (
                          <div className="mt-4 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                            {promo.priceDetails && (
                              <div className="flex items-center justify-between">
                                <span className="text-stone-500 text-[11px]">Allotment Rate:</span>
                                <strong className="text-[#0A1D16] font-semibold">{promo.priceDetails}</strong>
                              </div>
                            )}
                            {promo.offerDetails && (
                              <div className="mt-1 pt-1 border-t border-stone-200 text-[11px] text-emerald-700 font-medium line-clamp-1">
                                {promo.offerDetails}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Highlights List */}
                        {promo.highlights && promo.highlights.length > 0 && (
                          <div className="mt-4 space-y-1.5">
                            {promo.highlights.slice(0, 2).map((h, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-stone-600">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A870] flex-shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{h}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Action CTA */}
                      <div className="pt-6">
                        <Link
                          href={promo.ctaLink}
                          className="w-full inline-flex items-center justify-center gap-2 bg-[#0A1D16] hover:bg-[#133428] text-white text-xs font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-sm group-hover:border-[#C8A870] border border-transparent"
                        >
                          <FileText className="w-4 h-4 text-[#C8A870]" />
                          <span>{promo.ctaText}</span>
                          <ArrowRight className="w-4 h-4 text-[#C8A870] group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Dynamic Indicator Dots */}
          {filteredPromos.length > visibleCount && (
            <div className="flex justify-center items-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === i
                      ? "w-8 bg-[#0A1D16]"
                      : "w-2 bg-stone-300 hover:bg-stone-500"
                  }`}
                  aria-label={`Go to carousel slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
