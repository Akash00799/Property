"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TrendingUp, Check, X, ArrowRight, ShieldAlert, Sparkles, BarChart3 } from "lucide-react";

export default function InvestmentTeaser() {
  const [selectedHoldingPeriod, setSelectedHoldingPeriod] = useState<5 | 10>(5);

  return (
    <section className="py-20 bg-[#0A1D16] text-[#FAF8F5] border-y border-[#C8A870]/20 relative overflow-hidden">
      {/* Background glow (GPU-accelerated) */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full glow-gold" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full glow-emerald" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial & Value Thesis */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C8A870]/15 border border-[#C8A870]/40 text-[#C8A870] text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Strategic Land Advisory
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Why High-Net-Worth Capital Prefers{" "}
              <span className="italic text-[#DFBE82]">Plotted Land.</span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Unlike apartments where concrete depreciates while you share fractional undivided land rights, owning a demarcated freehold residential plot gives you total sovereignty, zero sinking fund levies, and pure compounding land equity.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#C8A870]/20 text-[#C8A870] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Sovereign Soil Ownership</h4>
                  <p className="text-xs text-stone-400">
                    Individual title deeds, distinct survey demarcation, and freehold autonomy.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#C8A870]/20 text-[#C8A870] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Accelerated Infrastructure Compounding</h4>
                  <p className="text-xs text-stone-400">
                    Plotted communities placed near upcoming metro nodes and expressways reflect rapid capital expansion.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#C8A870]/20 text-[#C8A870] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Zero Depreciation Risk</h4>
                  <p className="text-xs text-stone-400">
                    Buildings age and require expensive maintenance over decades; land remains immortal.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/investment"
                className="px-6 py-3.5 rounded bg-gradient-to-r from-[#DFBE82] to-[#B08E55] text-[#07140F] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2"
              >
                <span>Interactive Investment Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Comparative Intelligence Matrix */}
          <div className="lg:col-span-7 bg-[#07140F]/90 border border-[#C8A870]/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-800 gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#C8A870] font-bold block">
                  Asset Class Comparison Matrix
                </span>
                <h3 className="font-serif text-xl font-bold text-white">
                  Plotted Developments vs Conventional Apartments
                </h3>
              </div>

              {/* Toggle Demo Period */}
              <div className="flex items-center gap-1 bg-[#0A1D16] p-1 rounded-lg border border-stone-800 text-xs">
                <button
                  onClick={() => setSelectedHoldingPeriod(5)}
                  className={`px-3 py-1 rounded text-[11px] font-semibold transition-all ${
                    selectedHoldingPeriod === 5
                      ? "bg-[#C8A870] text-[#0A1D16]"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  5-Yr Horizon
                </button>
                <button
                  onClick={() => setSelectedHoldingPeriod(10)}
                  className={`px-3 py-1 rounded text-[11px] font-semibold transition-all ${
                    selectedHoldingPeriod === 10
                      ? "bg-[#C8A870] text-[#0A1D16]"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  10-Yr Horizon
                </button>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-800 text-stone-400 uppercase text-[10px] tracking-wider">
                    <th className="py-3 font-semibold">Evaluation Criteria</th>
                    <th className="py-3 font-semibold text-[#DFBE82]">Gated Plotted Land</th>
                    <th className="py-3 font-semibold text-stone-400">High-Rise Apartment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  <tr>
                    <td className="py-3.5 font-medium text-stone-300">Underlying Asset</td>
                    <td className="py-3.5 font-semibold text-[#C8A870]">100% Sovereign Land Area</td>
                    <td className="py-3.5 text-stone-400">Fractional Undivided Land Share (UDS)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-medium text-stone-300">Physical Depreciation</td>
                    <td className="py-3.5 font-semibold text-emerald-400">Zero (Appreciating Land)</td>
                    <td className="py-3.5 text-stone-400">High (Building ages after 15–20 yrs)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-medium text-stone-300">Monthly Sinking Fund / Maintenance</td>
                    <td className="py-3.5 font-semibold text-emerald-400">Minimal Community Dues</td>
                    <td className="py-3.5 text-stone-400">High Recurring Maintenance Fees</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-medium text-stone-300">Architectural Freedom</td>
                    <td className="py-3.5 font-semibold text-[#C8A870]">100% Custom Construction Freedom</td>
                    <td className="py-3.5 text-stone-400">Rigid Builder Floor Plan</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-medium text-stone-300">Historical Growth Range*</td>
                    <td className="py-3.5 font-bold text-[#DFBE82]">
                      {selectedHoldingPeriod === 5 ? "12% – 16% CAGR*" : "14% – 19% CAGR*"}
                    </td>
                    <td className="py-3.5 text-stone-400">
                      {selectedHoldingPeriod === 5 ? "5% – 8% CAGR*" : "6% – 9% CAGR*"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Disclaimer marker as mandated by prompt Section 2 & 11 */}
            <div className="p-3 bg-[#0A1D16] border border-amber-900/40 rounded-lg flex items-center gap-2.5 text-[11px] text-amber-200/80">
              <ShieldAlert className="w-4 h-4 text-[#C8A870] flex-shrink-0" />
              <span>
                *Demo comparative illustration only. Real estate investments are subject to market conditions. No guaranteed returns are promised or represented.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
