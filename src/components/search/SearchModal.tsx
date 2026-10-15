"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Compass,
  DollarSign,
  SlidersHorizontal,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { DEMO_PROPERTIES } from "@/data/properties";
import { useAdminData } from "@/context/AdminDataContext";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLocality?: string;
  initialCategory?: string;
  initialBudget?: string;
  initialSize?: string;
}

const CORRIDORS = [
  "Jagatpura",
  "Ajmer Road",
  "Ring Road",
  "Tonk Road",
  "Sirsi Road",
  "Kalwar Road",
  "Delhi Road",
];

const CATEGORIES = [
  "JDA Approved Township",
  "Gated Society Plots",
  "Ring Road Growth Corridor",
  "Aravalli Hillview Parcels",
  "Luxury Farmhouse Land",
];

const BUDGETS = [
  { label: "< ₹50 Lakh", value: "under-50lakh" },
  { label: "₹50L – ₹1 Cr", value: "50lakh-1cr" },
  { label: "₹1 Cr – ₹2 Cr", value: "1cr-2cr" },
  { label: "> ₹2 Cr", value: "above-2cr" },
];

const SIZES = [
  { label: "100–150 Gaj", value: "100" },
  { label: "166–250 Gaj", value: "200" },
  { label: "300–500 Gaj", value: "300" },
  { label: "1 Bigha+", value: "bigha" },
];

export default function SearchModal({
  isOpen,
  onClose,
  initialLocality = "",
  initialCategory = "",
  initialBudget = "",
  initialSize = "",
}: SearchModalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState(initialLocality);
  const [selectedCorridor, setSelectedCorridor] = useState(initialLocality);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBudget, setSelectedBudget] = useState(initialBudget);
  const [selectedSize, setSelectedSize] = useState(initialSize);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync when initial props change or modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery(initialLocality);
      setSelectedCorridor(initialLocality);
      setSelectedCategory(initialCategory);
      setSelectedBudget(initialBudget);
      setSelectedSize(initialSize);

      // Focus input after modal renders
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      // Lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialLocality, initialCategory, initialBudget, initialSize]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const { projects } = useAdminData();
  const allPlots = projects.length > 0 ? projects : DEMO_PROPERTIES;

  // Real-time matching plots
  const filteredPlots = useMemo(() => {
    return allPlots.filter((plot) => {
      // Free text search (matches title, locality, corridor, city, landmark, tagline)
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const matchesText =
          plot.title.toLowerCase().includes(q) ||
          plot.location.locality.toLowerCase().includes(q) ||
          plot.location.corridor.toLowerCase().includes(q) ||
          plot.location.city.toLowerCase().includes(q) ||
          plot.location.landmark.toLowerCase().includes(q) ||
          plot.tagline.toLowerCase().includes(q) ||
          plot.category.toLowerCase().includes(q);
        if (!matchesText) return false;
      }

      // Corridor chip filter
      if (selectedCorridor) {
        const loc = selectedCorridor.toLowerCase();
        const matchesLoc =
          plot.location.locality.toLowerCase().includes(loc) ||
          plot.location.corridor.toLowerCase().includes(loc) ||
          plot.title.toLowerCase().includes(loc);
        if (!matchesLoc) return false;
      }

      // Category chip filter
      if (selectedCategory) {
        if (plot.category !== selectedCategory) return false;
      }

      // Budget chip filter
      if (selectedBudget) {
        if (selectedBudget === "under-50lakh" && plot.price.total > 5000000) return false;
        if (selectedBudget === "50lakh-1cr" && (plot.price.total < 5000000 || plot.price.total > 10000000)) return false;
        if (selectedBudget === "1cr-2cr" && (plot.price.total < 10000000 || plot.price.total > 20000000)) return false;
        if (selectedBudget === "above-2cr" && plot.price.total < 20000000) return false;
      }

      // Size chip filter
      if (selectedSize) {
        if (selectedSize === "100" && (plot.dimensions.plotAreaGaj < 90 || plot.dimensions.plotAreaGaj > 160)) return false;
        if (selectedSize === "200" && (plot.dimensions.plotAreaGaj < 160 || plot.dimensions.plotAreaGaj > 280)) return false;
        if (selectedSize === "300" && (plot.dimensions.plotAreaGaj < 280 || plot.dimensions.plotAreaGaj > 800)) return false;
        if (selectedSize === "bigha" && plot.dimensions.plotAreaGaj < 800) return false;
      }

      return true;
    });
  }, [query, selectedCorridor, selectedCategory, selectedBudget, selectedSize]);

  const hasActiveFilters = Boolean(
    query.trim() || selectedCorridor || selectedCategory || selectedBudget || selectedSize
  );

  const handleResetFilters = () => {
    setQuery("");
    setSelectedCorridor("");
    setSelectedCategory("");
    setSelectedBudget("");
    setSelectedSize("");
    inputRef.current?.focus();
  };

  const handleNavigateToRegistry = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (selectedCorridor) params.set("locality", selectedCorridor);
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedBudget) params.set("budget", selectedBudget);
    if (selectedSize) params.set("size", selectedSize);

    onClose();
    router.push(`/plots?${params.toString()}`);
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Search Jaipur Plots"
    >
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-[#07140F]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-[#0A1D16] border border-[#C8A870]/40 rounded-2xl sm:rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(200,168,112,0.2)] overflow-hidden my-auto z-10 flex flex-col max-h-[88vh]">
        {/* Top Header / Search Input */}
        <div className="p-4 sm:p-6 border-b border-white/10 bg-[#07140F]/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C8A870]/15 flex items-center justify-center flex-shrink-0 text-[#C8A870]">
              <Search className="w-5 h-5 stroke-[2.5]" />
            </div>

            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by locality, corridor, plot size, or scheme name (e.g. Jagatpura, SEZ, 200 Gaj)..."
                className="w-full bg-transparent text-white placeholder-stone-400 text-sm sm:text-base md:text-lg font-medium focus:outline-none pr-8"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white p-1"
                  title="Clear text"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <kbd className="hidden sm:inline-block px-2 py-1 text-[10px] font-mono font-semibold text-stone-400 bg-white/5 border border-white/10 rounded">
                ESC
              </kbd>
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Filter Pills Row */}
          <div className="mt-4 pt-3 border-t border-white/5 space-y-2.5">
            {/* Corridors */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8A870] flex-shrink-0 mr-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Corridor:
              </span>
              {CORRIDORS.map((corridor) => {
                const isSelected = selectedCorridor === corridor;
                return (
                  <button
                    key={corridor}
                    type="button"
                    onClick={() => setSelectedCorridor(isSelected ? "" : corridor)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                      isSelected
                        ? "bg-[#C8A870] text-[#07140F] border-[#C8A870] font-bold shadow"
                        : "bg-white/[0.04] text-stone-300 border-white/10 hover:border-[#C8A870]/40 hover:text-white"
                    }`}
                  >
                    {corridor}
                  </button>
                );
              })}
            </div>

            {/* Budget & Size Row */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8A870] flex-shrink-0 mr-1 flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                Budget:
              </span>
              {BUDGETS.map((b) => {
                const isSelected = selectedBudget === b.value;
                return (
                  <button
                    key={b.value}
                    type="button"
                    onClick={() => setSelectedBudget(isSelected ? "" : b.value)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                      isSelected
                        ? "bg-[#C8A870] text-[#07140F] border-[#C8A870] font-bold shadow"
                        : "bg-white/[0.04] text-stone-300 border-white/10 hover:border-[#C8A870]/40 hover:text-white"
                    }`}
                  >
                    {b.label}
                  </button>
                );
              })}

              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8A870] flex-shrink-0 ml-2 mr-1 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3" />
                Size:
              </span>
              {SIZES.map((s) => {
                const isSelected = selectedSize === s.value;
                return (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setSelectedSize(isSelected ? "" : s.value)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                      isSelected
                        ? "bg-[#C8A870] text-[#07140F] border-[#C8A870] font-bold shadow"
                        : "bg-white/[0.04] text-stone-300 border-white/10 hover:border-[#C8A870]/40 hover:text-white"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="ml-auto text-[11px] text-red-400 hover:text-red-300 underline whitespace-nowrap flex items-center gap-1 flex-shrink-0"
                >
                  <X className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Count Banner */}
        <div className="px-4 sm:px-6 py-2.5 bg-black/30 border-b border-white/5 flex items-center justify-between text-xs">
          <span className="text-stone-300 flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A870]" />
            Found <strong className="text-[#DFBE82]">{filteredPlots.length}</strong> matching JDA plot{filteredPlots.length === 1 ? "" : "s"} in Jaipur
          </span>
          <span className="text-stone-500 text-[11px]">Click any plot to open details</span>
        </div>

        {/* Results List (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 divide-y divide-white/5">
          {filteredPlots.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-white/5 flex items-center justify-center text-stone-400">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white">No Matching Plots Found</h3>
              <p className="text-stone-400 text-xs sm:text-sm max-w-md mx-auto">
                No plots match &ldquo;{query || selectedCorridor}&rdquo; with your selected filters. Try searching for &ldquo;Jagatpura&rdquo;, &ldquo;Ajmer Road&rdquo;, or &ldquo;Ring Road&rdquo;.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2 rounded-full bg-[#C8A870] text-[#07140F] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all"
              >
                Clear Search & View All
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
              {filteredPlots.map((plot) => (
                <Link
                  key={plot.id}
                  href={`/plots/${plot.slug}`}
                  onClick={onClose}
                  className="group relative flex items-start gap-3.5 p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-[#C8A870]/50 transition-all duration-200"
                >
                  {/* Thumbnail */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-stone-900 border border-white/10">
                    <Image
                      src={plot.heroImage}
                      alt={plot.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="120px"
                    />
                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#0A1D16]/90 backdrop-blur text-[9px] font-bold text-[#DFBE82] border border-[#C8A870]/30">
                      JDA Patta
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] text-stone-400 mb-0.5">
                        <MapPin className="w-3 h-3 text-[#C8A870] flex-shrink-0" />
                        <span className="truncate">{plot.location.locality}</span>
                      </div>
                      <h4 className="text-white text-sm font-semibold truncate group-hover:text-[#DFBE82] transition-colors">
                        {plot.title}
                      </h4>
                      <p className="text-stone-400 text-[11px] line-clamp-1 mt-0.5">
                        {plot.tagline}
                      </p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-[#DFBE82]">
                          {plot.price.formatted.split(" ")[0]}
                        </div>
                        <div className="text-[10px] text-stone-400">
                          {plot.dimensions.plotAreaGaj} Gaj • {plot.dimensions.facing} Facing
                        </div>
                      </div>

                      <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-[#C8A870] text-stone-300 group-hover:text-[#07140F] flex items-center justify-center transition-colors flex-shrink-0">
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#07140F]/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-stone-400 text-[11px] flex items-center gap-2 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-[#C8A870]" />
            <span>100% verified JDA plots with direct registry eligibility</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleNavigateToRegistry}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFBE82] via-[#C8A870] to-[#AF8D54] text-[#07140F] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow cursor-pointer whitespace-nowrap"
            >
              <span>Explore All {filteredPlots.length} Plots in Registry</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
