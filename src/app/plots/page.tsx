"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  RotateCcw,
  Compass,
  MapPin,
  ChevronDown,
  Layers,
  ArrowRight,
} from "lucide-react";
import { DEMO_PROPERTIES, CATEGORIES } from "@/data/properties";
import PropertyCard from "@/components/property/PropertyCard";
import MuiSelect, { MuiSelectOption } from "@/components/ui/MuiSelect";
import { useAdminData } from "@/context/AdminDataContext";
import AdminViewModeToggle from "@/components/admin/mui/AdminViewModeToggle";

const CATEGORY_OPTIONS: MuiSelectOption[] = [
  { value: "all", label: "All Plot Typologies" },
  ...CATEGORIES.filter((c) => c.id !== "all").map((cat) => ({
    value: cat.label,
    label: cat.label,
  })),
];

const SIZE_OPTIONS: MuiSelectOption[] = [
  { value: "100", label: "100 – 150 Gaj", sublabel: "~900–1350 Sq.Ft" },
  { value: "200", label: "166 – 250 Gaj", sublabel: "~1500–2250 Sq.Ft" },
  { value: "300", label: "300 – 500 Gaj", sublabel: "~2700–4500 Sq.Ft" },
  { value: "bigha", label: "1 Bigha+ Farm", sublabel: "2000+ Gaj" },
];

const BUDGET_OPTIONS: MuiSelectOption[] = [
  { value: "under-50lakh", label: "Under ₹50 Lakh" },
  { value: "50lakh-1cr", label: "₹50L – ₹1.00 Cr" },
  { value: "1cr-2cr", label: "₹1.00 – ₹2.00 Cr" },
  { value: "above-2cr", label: "Above ₹2.00 Cr" },
];

const FACING_OPTIONS: MuiSelectOption[] = [
  { value: "East", label: "East (Vaastu)" },
  { value: "North", label: "North Facing" },
  { value: "North-East", label: "North-East" },
  { value: "West", label: "West Facing" },
];

const SORT_OPTIONS: MuiSelectOption[] = [
  { value: "featured", label: "Featured First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "area-asc", label: "Area: Smallest First" },
  { value: "area-desc", label: "Area: Largest First" },
];

function PlotsExploreContent() {
  const { projects } = useAdminData();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Search parameters initial state
  const paramLocality = searchParams.get("locality") || searchParams.get("location") || searchParams.get("q") || "";
  const paramCategory = searchParams.get("category") || "";
  const paramBudget = searchParams.get("budget") || "";
  const paramSize = searchParams.get("size") || "";
  const paramFacing = searchParams.get("facing") || "all";

  // Filter States
  const [searchQuery, setSearchQuery] = useState(paramLocality);
  const [selectedCategory, setSelectedCategory] = useState(paramCategory);
  const [selectedFacing, setSelectedFacing] = useState(paramFacing);
  const [selectedBudget, setSelectedBudget] = useState(paramBudget);
  const [selectedSize, setSelectedSize] = useState(paramSize);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "area-asc" | "area-desc" | "featured">("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(6);

  // Sync state whenever searchParams changes (e.g. from HeroSearch or browser navigation)
  React.useEffect(() => {
    const loc = searchParams.get("locality") || searchParams.get("location") || searchParams.get("q") || "";
    const cat = searchParams.get("category") || "";
    const bud = searchParams.get("budget") || "";
    const sz = searchParams.get("size") || "";
    const fac = searchParams.get("facing") || "all";

    setSearchQuery(loc);
    setSelectedCategory(cat);
    setSelectedBudget(bud);
    setSelectedSize(sz);
    setSelectedFacing(fac);
    setVisibleCount(6);

    // Scroll to results section when navigated with search parameters
    if (loc || cat || bud || sz || fac !== "all") {
      setTimeout(() => {
        const el = document.getElementById("plots-results-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    }
  }, [searchParams]);

  const allPlots = projects.length > 0 ? projects : DEMO_PROPERTIES;

  // Filter Logic
  const filteredPlots = useMemo(() => {
    return allPlots.filter((plot) => {
      // Search query (matches title, locality, corridor, city, landmark, tagline)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
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

      // Category
      if (selectedCategory && selectedCategory !== "all") {
        if (plot.category !== selectedCategory) return false;
      }

      // Facing
      if (selectedFacing !== "all") {
        if (plot.dimensions.facing !== selectedFacing) return false;
      }

      // Budget
      if (selectedBudget) {
        if (selectedBudget === "under-50lakh" && plot.price.total > 5000000) return false;
        if (selectedBudget === "50lakh-1cr" && (plot.price.total < 5000000 || plot.price.total > 10000000)) return false;
        if (selectedBudget === "1cr-2cr" && (plot.price.total < 10000000 || plot.price.total > 20000000)) return false;
        if (selectedBudget === "above-2cr" && plot.price.total < 20000000) return false;
      }

      // Size in Gaj (वर्ग गज)
      if (selectedSize) {
        if (selectedSize === "100" && (plot.dimensions.plotAreaGaj < 90 || plot.dimensions.plotAreaGaj > 160)) return false;
        if (selectedSize === "200" && (plot.dimensions.plotAreaGaj < 160 || plot.dimensions.plotAreaGaj > 280)) return false;
        if (selectedSize === "300" && (plot.dimensions.plotAreaGaj < 280 || plot.dimensions.plotAreaGaj > 800)) return false;
        if (selectedSize === "bigha" && plot.dimensions.plotAreaGaj < 800) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price.total - b.price.total;
      if (sortBy === "price-desc") return b.price.total - a.price.total;
      if (sortBy === "area-asc") return a.dimensions.plotAreaSqFt - b.dimensions.plotAreaSqFt;
      if (sortBy === "area-desc") return b.dimensions.plotAreaSqFt - a.dimensions.plotAreaSqFt;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, selectedFacing, selectedBudget, selectedSize, sortBy]);

  const displayedPlots = filteredPlots.slice(0, visibleCount);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedFacing("all");
    setSelectedBudget("");
    setSelectedSize("");
    setSortBy("featured");
    router.push("/plots");
  };

  const hasActiveFilters = Boolean(
    searchQuery.trim() ||
    (selectedCategory && selectedCategory !== "all") ||
    (selectedFacing && selectedFacing !== "all") ||
    selectedBudget ||
    selectedSize
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Header Banner */}
      <section className="bg-[#0A1D16] text-[#FAF8F5] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#C8A870]/20">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C8A870] font-semibold">
            <Compass className="w-3.5 h-3.5" />
            Jaipur Land Registry
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Explore JDA Approved Plots in Jaipur
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl font-light">
            Filter by Gaj (वर्ग गज), orientation, budget, and growth corridors (Jagatpura, Ajmer Road, Ring Road, Tonk Road). 100% JDA Patta & clear title registry [Demo Platform].
          </p>
        </div>
      </section>

      {/* Main Filter & Listing Container */}
      <div id="plots-results-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Control Bar */}
        <div className="bg-white rounded-xl border border-[#C8A870]/25 p-4 sm:p-5 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-3 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search corridor, colony, landmark..."
                className="w-full bg-[#FAF8F5] border border-[#C8A870]/30 rounded-lg pl-9 pr-8 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#C8A870] h-[38px] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs p-1"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="md:col-span-3">
              <MuiSelect
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={CATEGORY_OPTIONS}
                placeholder="All Plot Typologies"
                themeMode="light"
                ariaLabel="Filter by Category"
              />
            </div>

            {/* Size in Gaj */}
            <div className="md:col-span-2">
              <MuiSelect
                value={selectedSize}
                onChange={setSelectedSize}
                options={SIZE_OPTIONS}
                placeholder="Any Size (Gaj)"
                themeMode="light"
                ariaLabel="Filter by Plot Size"
              />
            </div>

            {/* Budget Filter */}
            <div className="md:col-span-2">
              <MuiSelect
                value={selectedBudget}
                onChange={setSelectedBudget}
                options={BUDGET_OPTIONS}
                placeholder="Any Budget"
                themeMode="light"
                ariaLabel="Filter by Budget"
              />
            </div>

            {/* Facing Filter */}
            <div className="md:col-span-2">
              <MuiSelect
                value={selectedFacing === "all" ? "" : selectedFacing}
                onChange={(val) => setSelectedFacing(val || "all")}
                options={FACING_OPTIONS}
                placeholder="Any Facing"
                themeMode="light"
                ariaLabel="Filter by Facing Orientation"
              />
            </div>
          </div>

          {/* Active Filter Chips Row */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                Active Search Filters:
              </span>

              {searchQuery.trim() && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1D16] text-[#DFBE82] text-xs font-medium border border-[#C8A870]/40 shadow-sm">
                  <MapPin className="w-3 h-3 text-[#DFBE82]" />
                  <span>&ldquo;{searchQuery}&rdquo;</span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:text-white ml-0.5 text-stone-400 hover:text-white"
                    title="Remove keyword filter"
                  >
                    ✕
                  </button>
                </span>
              )}

              {selectedCategory && selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1D16] text-[#DFBE82] text-xs font-medium border border-[#C8A870]/40 shadow-sm">
                  <Layers className="w-3 h-3 text-[#DFBE82]" />
                  <span>{selectedCategory}</span>
                  <button
                    onClick={() => setSelectedCategory("")}
                    className="hover:text-white ml-0.5 text-stone-400 hover:text-white"
                    title="Remove category filter"
                  >
                    ✕
                  </button>
                </span>
              )}

              {selectedBudget && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1D16] text-[#DFBE82] text-xs font-medium border border-[#C8A870]/40 shadow-sm">
                  <span>💰 {BUDGET_OPTIONS.find((b) => b.value === selectedBudget)?.label || selectedBudget}</span>
                  <button
                    onClick={() => setSelectedBudget("")}
                    className="hover:text-white ml-0.5 text-stone-400 hover:text-white"
                    title="Remove budget filter"
                  >
                    ✕
                  </button>
                </span>
              )}

              {selectedSize && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1D16] text-[#DFBE82] text-xs font-medium border border-[#C8A870]/40 shadow-sm">
                  <span>📐 {SIZE_OPTIONS.find((s) => s.value === selectedSize)?.label || selectedSize}</span>
                  <button
                    onClick={() => setSelectedSize("")}
                    className="hover:text-white ml-0.5 text-stone-400 hover:text-white"
                    title="Remove size filter"
                  >
                    ✕
                  </button>
                </span>
              )}

              {selectedFacing !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1D16] text-[#DFBE82] text-xs font-medium border border-[#C8A870]/40 shadow-sm">
                  <span>🧭 {FACING_OPTIONS.find((f) => f.value === selectedFacing)?.label || selectedFacing}</span>
                  <button
                    onClick={() => setSelectedFacing("all")}
                    className="hover:text-white ml-0.5 text-stone-400 hover:text-white"
                    title="Remove facing filter"
                  >
                    ✕
                  </button>
                </span>
              )}

              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-[11px] text-red-600 hover:text-red-700 font-semibold underline underline-offset-2 ml-1"
              >
                <RotateCcw className="w-3 h-3" />
                Clear All
              </button>
            </div>
          )}

          {/* Secondary Filter Row: Found count, Reset, Sort & View Mode */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 border-t border-stone-100 gap-4 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-stone-500 font-medium">
                Found <strong className="text-[#0A1D16]">{filteredPlots.length}</strong> matching parcels
                {searchQuery.trim() && (
                  <span className="text-stone-600 font-normal"> for &ldquo;<span className="text-[#0A1D16] font-semibold">{searchQuery}</span>&rdquo;</span>
                )}
              </span>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-stone-100 text-stone-600 hover:text-red-700 hover:bg-red-50 text-[11px] font-medium transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset Filters
                </button>
              )}
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              {/* Sort Selector */}
              <div className="flex items-center gap-2 min-w-[170px]">
                <span className="text-stone-400 text-xs">Sort:</span>
                <MuiSelect
                  value={sortBy}
                  onChange={(val) => setSortBy(val as any)}
                  options={SORT_OPTIONS}
                  themeMode="light"
                  size="small"
                  ariaLabel="Sort plots"
                />
              </div>

              {/* View Mode Toggle */}
              <AdminViewModeToggle
                mode={viewMode}
                onChange={setViewMode}
                gridTooltip="Card Grid Showcase"
                listTooltip="Detailed List View"
              />
            </div>
          </div>
        </div>

        {/* Listings Result */}
        {filteredPlots.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-[#C8A870]/40 p-16 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#0A1D16]/5 flex items-center justify-center text-stone-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0A1D16]">
              No Matching Plots Found
            </h3>
            <p className="text-sm text-stone-600 max-w-md mx-auto">
              We couldn&apos;t find plots matching your specific filter combination. Try resetting your price or typology criteria, or speak to our land acquisition desk for off-market options.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-6 py-2.5 rounded bg-[#0A1D16] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#14382C] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "flex flex-col space-y-6"
            }
          >
            {displayedPlots.map((plot) => (
              <PropertyCard key={plot.id} plot={plot} viewMode={viewMode} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredPlots.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="px-8 py-3 rounded bg-white border border-[#C8A870] hover:bg-[#0A1D16] hover:text-[#FAF8F5] text-[#0A1D16] text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              Load More Plots ({filteredPlots.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExplorePlotsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-[#C8A870] border-t-transparent animate-spin" />
        </div>
      }
    >
      <PlotsExploreContent />
    </Suspense>
  );
}
