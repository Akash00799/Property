"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  Calculator,
  Compass,
  CheckCircle2,
  DollarSign,
  Calendar,
  Sparkles,
  BarChart3,
  Layers,
  Building,
} from "lucide-react";
import { DEMO_PROPERTIES } from "@/data/properties";
import PropertyCard from "@/components/property/PropertyCard";

export default function InvestmentPage() {
  // Interactive Calculator State
  const [initialInvestment, setInitialInvestment] = useState(15000000); // 1.5 Cr
  const [years, setYears] = useState(5);
  const [cagrRate, setCagrRate] = useState(14); // 14% demo CAGR

  // Calculate projected value
  const projectedValue = Math.round(
    initialInvestment * Math.pow(1 + cagrRate / 100, years)
  );
  const capitalGain = projectedValue - initialInvestment;

  const investmentPlots = DEMO_PROPERTIES.filter(
    (p) => p.investmentTier === "High Growth Corridor" || p.investmentTier === "Generational Wealth"
  );

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      {/* Editorial Header */}
      <section className="bg-[#0A1D16] text-[#FAF8F5] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#C8A870]/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A870]/15 border border-[#C8A870]/30 text-[#C8A870] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Land Economics & Capital Preservation
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-[1.15]">
            Sovereign Soil: The High-Conviction Asset Class.
          </h1>

          <p className="text-stone-300 text-sm sm:text-lg max-w-2xl font-light leading-relaxed">
            While vertical structures depreciate with aging materials, freehold residential land in planned corridors captures the exponential dividend of expanding civil infrastructure, expressways, and economic centers.
          </p>

          <div className="pt-2 inline-flex items-center gap-2 text-[11px] text-amber-200/90 bg-amber-950/40 border border-amber-800/40 px-3.5 py-1.5 rounded-lg">
            <ShieldAlert className="w-4 h-4 text-[#C8A870] flex-shrink-0" />
            <span>
              Disclaimer: Historical appreciation metrics and calculator projections are demo illustrative calculations. No guaranteed capital appreciation is stated.
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Interactive ROI & Appreciation Simulator */}
        <section className="bg-white rounded-2xl border border-[#C8A870]/30 p-6 sm:p-10 shadow-xl">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8F6F3B] uppercase tracking-wider mb-2">
              <Calculator className="w-4 h-4" />
              <span>Capital Planning Tool</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1D16]">
              Interactive Land Compounding Calculator
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Simulate potential compounding returns based on your capital deployment horizon and corridor appreciation assumptions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Sliders (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 bg-[#FAF8F5] p-6 rounded-xl border border-stone-200">
              {/* Initial Investment */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-stone-700">Initial Land Allocation</span>
                  <span className="font-mono font-bold text-[#0A1D16]">
                    ₹{(initialInvestment / 10000000).toFixed(2)} Cr (~${Math.round(initialInvestment / 83).toLocaleString()})
                  </span>
                </div>
                <input
                  type="range"
                  min={5000000}
                  max={50000000}
                  step={1000000}
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  className="w-full accent-[#C8A870] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                  <span>₹50 Lakhs</span>
                  <span>₹2.5 Cr</span>
                  <span>₹5.0 Cr</span>
                </div>
              </div>

              {/* Holding Period */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-stone-700">Holding Horizon</span>
                  <span className="font-mono font-bold text-[#0A1D16]">{years} Years</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={15}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-[#C8A870] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                  <span>3 Years</span>
                  <span>7 Years</span>
                  <span>15 Years</span>
                </div>
              </div>

              {/* CAGR Assumption */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-stone-700">Assumed Annual Growth Rate (CAGR)</span>
                  <span className="font-mono font-bold text-[#8F6F3B]">{cagrRate}% / Year</span>
                </div>
                <input
                  type="range"
                  min={6}
                  max={22}
                  step={1}
                  value={cagrRate}
                  onChange={(e) => setCagrRate(Number(e.target.value))}
                  className="w-full accent-[#C8A870] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                  <span>6% (Conservative)</span>
                  <span>14% (Corridor Avg)</span>
                  <span>22% (Infrastructure Catalyst)</span>
                </div>
              </div>
            </div>

            {/* Results Card (5 Cols) */}
            <div className="lg:col-span-5 bg-[#0A1D16] text-[#FAF8F5] p-6 sm:p-8 rounded-xl border border-[#C8A870]/40 space-y-6 shadow-xl">
              <span className="text-[10px] uppercase tracking-wider text-[#C8A870] font-bold block">
                Projected Portfolio Outcome
              </span>

              <div>
                <span className="text-xs text-stone-400 block">Estimated Valuation at Year {years}</span>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  ₹{(projectedValue / 10000000).toFixed(2)} Cr
                </span>
                <span className="text-xs text-[#DFBE82] block mt-1">
                  ~${Math.round(projectedValue / 83).toLocaleString()} USD [Demo]
                </span>
              </div>

              <div className="pt-4 border-t border-stone-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-400">Total Capital Deployed:</span>
                  <span className="font-mono font-semibold text-stone-200">
                    ₹{(initialInvestment / 10000000).toFixed(2)} Cr
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Projected Capital Appreciation:</span>
                  <span className="font-mono font-semibold text-emerald-400">
                    +₹{(capitalGain / 10000000).toFixed(2)} Cr
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Multiple on Invested Capital:</span>
                  <span className="font-mono font-bold text-[#C8A870]">
                    {(projectedValue / initialInvestment).toFixed(2)}x MOIC
                  </span>
                </div>
              </div>

              <Link
                href="/schedule-visit"
                className="w-full py-3 rounded bg-gradient-to-r from-[#DFBE82] to-[#B08E55] text-[#07140F] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <span>Consult with Land Strategist</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Featured High-Growth Opportunities */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#8F6F3B] font-semibold block mb-1">
                Curated High-Growth Parcels
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#0A1D16]">
                Prime Land Opportunities for Capital Growth
              </h2>
            </div>
            <Link
              href="/plots"
              className="text-xs font-bold uppercase tracking-wider text-[#0A1D16] hover:text-[#8F6F3B] flex items-center gap-1"
            >
              <span>Explore All Listings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {investmentPlots.slice(0, 3).map((plot) => (
              <PropertyCard key={plot.id} plot={plot} viewMode="grid" />
            ))}
          </div>
        </section>

        {/* Three Core Investment Corridors Analysis */}
        <section className="bg-white rounded-2xl border border-[#C8A870]/25 p-8 sm:p-10 shadow-sm space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#8F6F3B] font-semibold block mb-1">
              Infrastructure Catalysts
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0A1D16]">
              Strategic Corridors Driving Outsized Returns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8F6F3B] bg-[#C8A870]/15 px-2.5 py-1 rounded">
                Ajmer Road & SEZ Corridor
              </span>
              <h3 className="font-serif text-lg font-bold text-[#0A1D16]">
                Mahindra World City & DMIC Hub
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Driven by 3,000+ acre Mahindra World City SEZ, multi-lane Delhi-Mumbai industrial freight corridors, and premium private education institutions.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#14382C]">
                Key Projects: Aashiyana Greens SEZ, Ashapurna Empire
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8F6F3B] bg-[#C8A870]/15 px-2.5 py-1 rounded">
                Jaipur Ring Road Axis
              </span>
              <h3 className="font-serif text-lg font-bold text-[#0A1D16]">
                360-Ft Expressway Logistic & Housing Arc
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Connecting Ajmer Road, Tonk Road, and Agra Road seamlessly. Government-sanctioned transport corridor experiencing highest land value appreciation in Rajasthan.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#14382C]">
                Key Projects: The Grand Ring Expressway, Bilwa Heritage Enclave
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8F6F3B] bg-[#C8A870]/15 px-2.5 py-1 rounded">
                Jagatpura & Mahal Road
              </span>
              <h3 className="font-serif text-lg font-bold text-[#0A1D16]">
                Airport Proximity & Institutional Node
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Located within 12 minutes of Jaipur International Airport, Bombay Hospital, and premier engineering universities with high residential end-user demand.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#14382C]">
                Key Projects: Royal Palm Enclave, Sirsi Greens
              </div>
            </div>
          </div>
        </section>

        {/* Private Syndication / Group Investment CTA */}
        <section className="bg-[#0A1D16] text-[#FAF8F5] p-8 sm:p-12 rounded-2xl border border-[#C8A870]/40 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-[#C8A870] font-bold">
              Institutional & Family Office Desk
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Seeking Large Acreage Parcels (5 to 50 Acres)?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300">
              Our acquisitions desk manages off-market private land transactions with completed encumbrance clearances for family trusts and institutions.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-8 py-3.5 rounded bg-gradient-to-r from-[#DFBE82] to-[#B08E55] text-[#07140F] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all whitespace-nowrap shadow-lg flex items-center gap-2"
          >
            <span>Contact Private Advisory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
