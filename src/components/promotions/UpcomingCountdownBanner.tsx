"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  MapPin,
  CheckCircle2,
  FileText,
  BadgeAlert,
} from "lucide-react";
import { getPromotionsByPlacement, PromotionItem } from "@/data/promotions";
import { useAdminData } from "@/context/AdminDataContext";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const difference = +new Date(targetDate) - +new Date();
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
}

function LiveCountdownGrid({ launchDate }: { launchDate: string }) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft(launchDate));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(launchDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center mb-6">
      <div className="p-3 sm:p-4 rounded-xl bg-[#07140F] border border-stone-800">
        <span className="font-mono text-2xl sm:text-4xl font-bold text-white block">
          {mounted ? String(timeLeft.days).padStart(2, "0") : "28"}
        </span>
        <span className="text-[10px] sm:text-xs text-stone-400 uppercase font-mono mt-1 block">
          Days
        </span>
      </div>
      <div className="p-3 sm:p-4 rounded-xl bg-[#07140F] border border-stone-800">
        <span className="font-mono text-2xl sm:text-4xl font-bold text-white block">
          {mounted ? String(timeLeft.hours).padStart(2, "0") : "14"}
        </span>
        <span className="text-[10px] sm:text-xs text-stone-400 uppercase font-mono mt-1 block">
          Hours
        </span>
      </div>
      <div className="p-3 sm:p-4 rounded-xl bg-[#07140F] border border-stone-800">
        <span className="font-mono text-2xl sm:text-4xl font-bold text-white block">
          {mounted ? String(timeLeft.minutes).padStart(2, "0") : "35"}
        </span>
        <span className="text-[10px] sm:text-xs text-stone-400 uppercase font-mono mt-1 block">
          Mins
        </span>
      </div>
      <div className="p-3 sm:p-4 rounded-xl bg-[#07140F] border border-stone-800">
        <span className="font-mono text-2xl sm:text-4xl font-bold text-[#C8A870] block">
          {mounted ? String(timeLeft.seconds).padStart(2, "0") : "50"}
        </span>
        <span className="text-[10px] sm:text-xs text-stone-400 uppercase font-mono mt-1 block">
          Secs
        </span>
      </div>
    </div>
  );
}

export default function UpcomingCountdownBanner() {
  const { advertisements } = useAdminData();
  const activeCountdownAds = advertisements.filter(
    (a) => a.status === "published" && a.placement === "countdown-banner"
  );
  const promo: PromotionItem | undefined =
    activeCountdownAds[0] || getPromotionsByPlacement("countdown-banner")[0];

  if (!promo || !promo.launchDate) {
    return null;
  }

  return (
    <section className="relative bg-[#07140F] text-[#FAF8F5] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-b border-[#C8A870]/25">
      {/* Background Ambience (Zero-lag GPU radial gradient) */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C8A870_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full glow-gold" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full glow-emerald" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Promotion Narrative & Details */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                {promo.badge.text}
              </span>
              {promo.locationLabel && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-stone-800 text-stone-300 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#C8A870]" />
                  <span>{promo.locationLabel}</span>
                </span>
              )}
            </div>

            {/* Title & Tagline */}
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                {promo.title}
              </h2>
              {promo.tagline && (
                <p className="font-serif text-lg sm:text-xl text-[#C8A870] font-light italic mt-2">
                  &ldquo;{promo.tagline}&rdquo;
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
              {promo.description}
            </p>

            {/* Highlights Checklist */}
            {promo.highlights && promo.highlights.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-left">
                {promo.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-300 bg-[#0E1511] p-2.5 rounded-lg border border-stone-800/80">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A870] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Price & Offer Highlight */}
            {(promo.priceDetails || promo.offerDetails) && (
              <div className="p-4 rounded-xl bg-[#0E1511] border border-[#C8A870]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                {promo.priceDetails && (
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-mono">Indicative Allotment Price</span>
                    <strong className="text-white font-serif text-base text-[#C8A870]">{promo.priceDetails}</strong>
                  </div>
                )}
                {promo.offerDetails && (
                  <div className="sm:text-right">
                    <span className="text-stone-400 block text-[10px] uppercase font-mono">Promotional Privilege</span>
                    <span className="text-emerald-400 font-medium">{promo.offerDetails}</span>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href={promo.ctaLink}
                className="inline-flex items-center gap-2 bg-[#C8A870] hover:bg-[#b8965d] text-[#0A1D16] font-semibold text-xs sm:text-sm py-3.5 px-6 rounded-lg transition-colors shadow-lg"
              >
                <FileText className="w-4 h-4" />
                <span>{promo.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/schedule-visit"
                className="inline-flex items-center gap-2 bg-[#121614] hover:bg-[#1a201d] text-stone-200 border border-stone-700 text-xs sm:text-sm py-3.5 px-6 rounded-lg transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#C8A870]" />
                <span>Book Pre-Launch Site Inspection</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Live Countdown Clock & Visual Graphic */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full bg-[#0E1511] rounded-2xl p-6 sm:p-8 border border-[#C8A870]/30 shadow-2xl relative overflow-hidden">
              <div className="text-center mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8A870] block">
                  Official Launch Countdown
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                  Allotment Window Opens In
                </h3>
              </div>

              {/* Countdown Digits Grid (Isolated Render Loop) */}
              <LiveCountdownGrid launchDate={promo.launchDate} />

              {/* Master Plan Blueprint Preview Inside Card */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-stone-800 mb-4 group">
                <Image
                  src={promo.coverImage}
                  alt={promo.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07140F]/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-stone-300">
                  <span className="font-mono text-[#C8A870]">Sanctioned Scheme Blueprint</span>
                  <span className="text-[10px] text-stone-400">Scale 1:500</span>
                </div>
              </div>

              {/* Security Seal */}
              <div className="flex items-center justify-center gap-2 text-center text-xs text-stone-400 pt-2 border-t border-stone-800/80">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Verified JDA Patta Allocation • Registry Ready</span>
              </div>
            </div>

            {/* Demo Notice */}
            {promo.disclaimer && (
              <span className="text-[10px] text-stone-500 font-mono mt-3 text-center">
                {promo.disclaimer}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
