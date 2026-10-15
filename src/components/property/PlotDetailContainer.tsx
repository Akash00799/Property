"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Home, Building2, Compass, RefreshCw } from "lucide-react";
import { PropertyPlot } from "@/types/property";
import { DEMO_PROPERTIES } from "@/data/properties";
import { useAdminData } from "@/context/AdminDataContext";
import PlotDetailView from "@/components/property/PlotDetailView";

interface PlotDetailContainerProps {
  id: string;
  initialPlot?: PropertyPlot | null;
}

export default function PlotDetailContainer({
  id,
  initialPlot,
}: PlotDetailContainerProps) {
  const { projects } = useAdminData();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check admin projects (supports new projects from admin and edited values)
  const livePlot =
    projects.find((p) => p.id === id || p.slug === id) ||
    initialPlot ||
    DEMO_PROPERTIES.find((p) => p.id === id || p.slug === id);

  if (!livePlot) {
    // If not mounted yet, render placeholder loader briefly
    if (!mounted) {
      return (
        <div className="min-h-[70vh] bg-[#FAF8F5] flex items-center justify-center p-6">
          <div className="flex items-center gap-2 text-stone-500 font-mono text-xs">
            <RefreshCw className="w-4 h-4 animate-spin text-[#8F6F3B]" />
            <span>Loading plot details...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-[70vh] bg-[#FAF8F5] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#07140F]">
            Plot Listing Not Found
          </h2>
          <p className="text-xs text-stone-500 leading-relaxed">
            The requested plot listing (<span className="font-mono font-bold text-stone-700">{id}</span>) could not be located in the current inventory. It may have been archived or removed.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/plots"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#07140F] text-[#DFBE82] text-xs font-semibold hover:bg-[#14382C] transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Explore All Plots</span>
            </Link>
            <Link
              href="/admin/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors"
            >
              <span>Admin Projects</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <PlotDetailView plot={livePlot} />;
}
