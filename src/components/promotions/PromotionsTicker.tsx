"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, X, Bell, ShieldCheck } from "lucide-react";
import { getPromotionsByPlacement, PromotionItem } from "@/data/promotions";
import { useAdminData } from "@/context/AdminDataContext";

export default function PromotionsTicker() {
  const { advertisements } = useAdminData();
  const activeAds = advertisements.filter(
    (a) => a.status === "published" && a.placement === "announcement-ticker"
  );
  const promo: PromotionItem | undefined =
    activeAds[0] || getPromotionsByPlacement("announcement-ticker")[0];
  const [isVisible, setIsVisible] = useState(true);

  if (!promo || !isVisible) return null;

  return (
    <aside aria-label="Promotions Bulletin" className="bg-[#0A1D16] text-[#FAF8F5] border-b border-[#C8A870]/25 py-2.5 px-4 sm:px-6 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#C8A870]/20 text-[#C8A870] font-semibold text-[10px] uppercase tracking-wider border border-[#C8A870]/30 flex-shrink-0">
            <Bell className="w-3 h-3 animate-pulse" />
            {promo.badge.text}
          </span>
          <p className="text-stone-300 text-xs truncate max-w-xl">
            <strong className="text-white font-medium mr-1.5">{promo.title}:</strong>
            <span>{promo.description}</span>
          </p>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <Link
            href={promo.ctaLink}
            className="inline-flex items-center gap-1.5 text-[#C8A870] hover:text-white font-semibold text-xs transition-colors hover:underline"
          >
            <span>{promo.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="text-stone-400 hover:text-stone-200 p-0.5 transition-colors"
            aria-label="Dismiss bulletin"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
