"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Layers,
  DollarSign,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
  X,
  ChevronDown,
  CheckCircle2,
  Maximize2,
} from "lucide-react";
import MuiSelect, { MuiSelectOption } from "@/components/ui/MuiSelect";
import { DEMO_PROPERTIES } from "@/data/properties";
import { useAdminData } from "@/context/AdminDataContext";
import SearchModal from "@/components/search/SearchModal";

const LOCALITY_OPTIONS: MuiSelectOption[] = [
  { value: "Jagatpura", label: "Jagatpura / Mahal Road", sublabel: "Airport Axis" },
  { value: "Ajmer Road", label: "Ajmer Road / Mahindra SEZ", sublabel: "IT Belt" },
  { value: "Ring Road", label: "Jaipur Ring Road Axis", sublabel: "Expressway" },
  { value: "Tonk Road", label: "Tonk Road / Chokhi Dhani", sublabel: "Bilwa Node" },
  { value: "Sirsi Road", label: "Sirsi Road / Vaishali Ext.", sublabel: "Affluent West" },
  { value: "Kalwar Road", label: "Kalwar Road / Jhotwara", sublabel: "Value Growth" },
  { value: "Delhi Road", label: "Delhi Road / Kukas Aravalli", sublabel: "Resort Ridge" },
];

const CATEGORY_OPTIONS: MuiSelectOption[] = [
  { value: "JDA Approved Township", label: "JDA Approved Township", sublabel: "Direct Patta" },
  { value: "Gated Society Plots", label: "Gated Society Plots", sublabel: "Gated Gentry" },
  { value: "Ring Road Growth Corridor", label: "Ring Road Expressway Plots", sublabel: "High CAGR" },
  { value: "Aravalli Hillview Parcels", label: "Aravalli Hillview Parcels", sublabel: "Scenic" },
  { value: "Luxury Farmhouse Land", label: "Farmhouse Land (1 Bigha+)", sublabel: "Sweet Water" },
];

const BUDGET_OPTIONS: MuiSelectOption[] = [
  { value: "under-50lakh", label: "Under ₹50 Lakh", sublabel: "Starter Plot" },
  { value: "50lakh-1cr", label: "₹50 Lakh – ₹1.00 Cr", sublabel: "Mid-Segment" },
  { value: "1cr-2cr", label: "₹1.00 Cr – ₹2.00 Cr", sublabel: "Prime Parcel" },
  { value: "above-2cr", label: "Above ₹2.00 Cr", sublabel: "Acreage & Farms" },
];

const SIZE_OPTIONS: MuiSelectOption[] = [
  { value: "100", label: "100 – 150 Gaj", sublabel: "~900–1350 Sq.Ft" },
  { value: "200", label: "166 – 250 Gaj", sublabel: "~1500–2250 Sq.Ft" },
  { value: "300", label: "300 – 500 Gaj", sublabel: "~2700–4500 Sq.Ft" },
  { value: "bigha", label: "1 Bigha+ Farm Land", sublabel: "2000+ Gaj" },
];

const POPULAR_CORRIDORS = [
  { label: "Jagatpura", value: "Jagatpura" },
  { label: "Ajmer Road SEZ", value: "Ajmer Road" },
  { label: "Ring Road Expressway", value: "Ring Road" },
  { label: "Tonk Road", value: "Tonk Road" },
  { label: "Sirsi Road", value: "Sirsi Road" },
];

export default function HeroSearch() {
  const router = useRouter();
  const { projects } = useAdminData();
  const [locality, setLocality] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [plotSize, setPlotSize] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allPlots = projects.length > 0 ? projects : DEMO_PROPERTIES;

  // Global keyboard shortcut to open search modal (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Live matching plots calculation from inventory
  const liveMatches = useMemo(() => {
    return allPlots.filter((plot) => {
      if (locality) {
        const loc = locality.toLowerCase();
        const matchesLoc =
          plot.location.locality.toLowerCase().includes(loc) ||
          plot.location.corridor.toLowerCase().includes(loc) ||
          plot.title.toLowerCase().includes(loc);
        if (!matchesLoc) return false;
      }
      if (category) {
        if (plot.category !== category) return false;
      }
      if (budget) {
        if (budget === "under-50lakh" && plot.price.total > 5000000) return false;
        if (budget === "50lakh-1cr" && (plot.price.total < 5000000 || plot.price.total > 10000000)) return false;
        if (budget === "1cr-2cr" && (plot.price.total < 10000000 || plot.price.total > 20000000)) return false;
        if (budget === "above-2cr" && plot.price.total < 20000000) return false;
      }
      if (plotSize) {
        if (plotSize === "100" && (plot.dimensions.plotAreaGaj < 90 || plot.dimensions.plotAreaGaj > 160)) return false;
        if (plotSize === "200" && (plot.dimensions.plotAreaGaj < 160 || plot.dimensions.plotAreaGaj > 280)) return false;
        if (plotSize === "300" && (plot.dimensions.plotAreaGaj < 280 || plot.dimensions.plotAreaGaj > 800)) return false;
        if (plotSize === "bigha" && plot.dimensions.plotAreaGaj < 800) return false;
      }
      return true;
    });
  }, [locality, category, budget, plotSize]);

  const hasActiveFilters = Boolean(locality || category || budget || plotSize);

  // When clicking Search, open the interactive Search Modal
  const handleOpenSearchModal = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleReset = () => {
    setLocality("");
    setCategory("");
    setBudget("");
    setPlotSize("");
    setShowPreview(false);
  };

  const handleSelectCorridor = (val: string) => {
    const nextVal = locality === val ? "" : val;
    setLocality(nextVal);
    setShowPreview(true);
  };

  return (
    <>
      <div className="w-full relative">
        <form
          id="hero-search-form"
          onSubmit={handleOpenSearchModal}
          className="w-full bg-[#0A1D16]/95 backdrop-blur-2xl border border-[#C8A870]/40 rounded-2xl lg:rounded-full p-2.5 lg:p-2 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),0_0_1px_1px_rgba(200,168,112,0.25)] transition-all hover:border-[#C8A870]/60"
        >
          <div className="flex flex-col lg:flex-row lg:items-center w-full gap-2 lg:gap-0">
            {/* Segment 1: Locality */}
            <div className="flex-1 px-4 lg:px-5 py-2 hover:bg-white/[0.04] transition-all rounded-xl lg:rounded-l-full group cursor-pointer flex flex-col justify-center">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#C8A870] flex items-center gap-1.5 mb-0.5 cursor-pointer">
                <MapPin className="w-3.5 h-3.5 text-[#C8A870]" />
                Location Corridor
              </label>
              <MuiSelect
                value={locality}
                onChange={(val) => {
                  setLocality(val);
                  setShowPreview(true);
                }}
                options={LOCALITY_OPTIONS}
                placeholder="All Jaipur Corridors"
                themeMode="dark"
                borderless
                ariaLabel="Select Location Corridor"
              />
            </div>

            {/* Divider 1 */}
            <div className="hidden lg:block w-px h-10 bg-gradient-to-b from-transparent via-[#C8A870]/30 to-transparent flex-shrink-0" />

            {/* Segment 2: Category */}
            <div className="flex-1 px-4 lg:px-5 py-2 hover:bg-white/[0.04] transition-all rounded-xl group cursor-pointer flex flex-col justify-center">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#C8A870] flex items-center gap-1.5 mb-0.5 cursor-pointer">
                <Layers className="w-3.5 h-3.5 text-[#C8A870]" />
                Plot Type / Approval
              </label>
              <MuiSelect
                value={category}
                onChange={(val) => {
                  setCategory(val);
                  setShowPreview(true);
                }}
                options={CATEGORY_OPTIONS}
                placeholder="All Plot Approvals"
                themeMode="dark"
                borderless
                ariaLabel="Select Plot Approval"
              />
            </div>

            {/* Divider 2 */}
            <div className="hidden lg:block w-px h-10 bg-gradient-to-b from-transparent via-[#C8A870]/30 to-transparent flex-shrink-0" />

            {/* Segment 3: Budget */}
            <div className="flex-1 px-4 lg:px-5 py-2 hover:bg-white/[0.04] transition-all rounded-xl group cursor-pointer flex flex-col justify-center">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#C8A870] flex items-center gap-1.5 mb-0.5 cursor-pointer">
                <DollarSign className="w-3.5 h-3.5 text-[#C8A870]" />
                Budget Range
              </label>
              <MuiSelect
                value={budget}
                onChange={(val) => {
                  setBudget(val);
                  setShowPreview(true);
                }}
                options={BUDGET_OPTIONS}
                placeholder="Any Budget"
                themeMode="dark"
                borderless
                ariaLabel="Select Budget Range"
              />
            </div>

            {/* Divider 3 */}
            <div className="hidden lg:block w-px h-10 bg-gradient-to-b from-transparent via-[#C8A870]/30 to-transparent flex-shrink-0" />

            {/* Segment 4: Plot Size */}
            <div className="flex-1 px-4 lg:px-5 py-2 hover:bg-white/[0.04] transition-all rounded-xl group cursor-pointer flex flex-col justify-center">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#C8A870] flex items-center gap-1.5 mb-0.5 cursor-pointer">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#C8A870]" />
                Plot Size (Gaj / गज)
              </label>
              <MuiSelect
                value={plotSize}
                onChange={(val) => {
                  setPlotSize(val);
                  setShowPreview(true);
                }}
                options={SIZE_OPTIONS}
                placeholder="Any Area (Gaj)"
                themeMode="dark"
                borderless
                ariaLabel="Select Plot Size in Gaj"
              />
            </div>

            {/* Search Action Button: Opens Interactive Search Modal */}
            <div className="p-1 lg:pl-2 flex-shrink-0 flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenSearchModal}
                className="w-full lg:w-auto h-12 px-6 rounded-xl lg:rounded-full bg-gradient-to-r from-[#DFBE82] via-[#C8A870] to-[#AF8D54] text-[#07140F] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg hover:shadow-[#C8A870]/25 whitespace-nowrap cursor-pointer group"
                title="Open Search Center (Ctrl+K)"
              >
                <span>
                  {hasActiveFilters
                    ? `SEARCH (${liveMatches.length})`
                    : `SEARCH PLOTS`}
                </span>
                <Search className="w-4 h-4 stroke-[2.5] group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </form>

        {/* Quick Corridor Selection Pills & Modal Trigger Helper */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-stone-400 text-[11px] font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C8A870]" />
              Popular Corridors:
            </span>
            {POPULAR_CORRIDORS.map((corridor) => {
              const isSelected = locality === corridor.value;
              return (
                <button
                  key={corridor.value}
                  type="button"
                  onClick={() => handleSelectCorridor(corridor.value)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all border cursor-pointer ${
                    isSelected
                      ? "bg-[#C8A870] text-[#07140F] border-[#C8A870] font-semibold shadow-sm"
                      : "bg-[#0A1D16]/80 text-stone-300 border-white/10 hover:border-[#C8A870]/40 hover:text-white"
                  }`}
                >
                  {corridor.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleOpenSearchModal}
              className="text-[#DFBE82] hover:text-white text-[11px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Open Search Center</span>
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="text-stone-400 hover:text-red-400 text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Interactive Live Matching Plots Preview Dropdown */}
        {hasActiveFilters && showPreview && (
          <div className="absolute left-0 right-0 top-full mt-3 z-40 bg-[#0A1D16]/98 backdrop-blur-3xl border border-[#C8A870]/50 rounded-2xl p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2 text-stone-200 text-xs">
                <CheckCircle2 className="w-4 h-4 text-[#C8A870]" />
                <span>
                  Found <strong className="text-[#DFBE82] font-bold">{liveMatches.length}</strong> matching JDA plot{liveMatches.length === 1 ? "" : "s"} in Jaipur
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleOpenSearchModal}
                  className="text-[#DFBE82] hover:underline text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Search in Modal</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowPreview(false)}
                  className="text-stone-400 hover:text-white text-xs p-1"
                  title="Close preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {liveMatches.length === 0 ? (
              <div className="py-6 text-center text-stone-400 text-xs space-y-2">
                <p>No plots match this specific combination.</p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[#C8A870] hover:underline font-semibold"
                >
                  Reset filters to view all 8 Jaipur plots
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {liveMatches.slice(0, 3).map((plot) => (
                    <Link
                      key={plot.id}
                      href={`/plots/${plot.slug}`}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-[#C8A870]/40 transition-all group"
                    >
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-stone-800">
                        <Image
                          src={plot.heroImage}
                          alt={plot.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="60px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-xs font-semibold truncate group-hover:text-[#DFBE82] transition-colors">
                          {plot.title}
                        </h4>
                        <p className="text-stone-400 text-[11px] truncate flex items-center gap-1 mt-0.5">
                          <MapPin className="w-2.5 h-2.5 text-[#C8A870]" />
                          {plot.location.locality}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[#DFBE82] text-xs font-bold">
                            {plot.price.formatted.split(" ")[0]}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            • {plot.dimensions.plotAreaGaj} Gaj
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400">
                    Showing top matches. Click to view parcel or open Search Modal.
                  </span>

                  <button
                    type="button"
                    onClick={handleOpenSearchModal}
                    className="px-4 py-2 rounded-lg bg-[#C8A870] hover:bg-[#DFBE82] text-[#07140F] text-xs font-bold flex items-center gap-1.5 transition-all shadow cursor-pointer"
                  >
                    <span>Open Full Search Modal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Luxury Interactive Search Modal */}
      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialLocality={locality}
        initialCategory={category}
        initialBudget={budget}
        initialSize={plotSize}
      />
    </>
  );
}
