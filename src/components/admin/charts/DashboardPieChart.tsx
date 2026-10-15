"use client";

import React, { useState, useMemo } from "react";
import { PieChart as PieIcon, Layers, Filter } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";

interface Slice {
  id: string;
  label: string;
  value: number;
  color: string;
  subtext?: string;
}

export default function DashboardPieChart() {
  const { enquiries, projects } = useAdminData();
  const [activeTab, setActiveTab] = useState<"enquiries" | "inventory">("enquiries");
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  // 1. Pipeline Status Breakdown from real state (memoized)
  const enquirySlices: Slice[] = useMemo(() => {
    const statusCounts: Record<string, number> = {};
    enquiries.forEach((e) => {
      statusCounts[e.status] = (statusCounts[e.status] || 0) + 1;
    });

    return [
      {
        id: "New",
        label: "New Leads",
        value: statusCounts["New"] || 0,
        color: "#059669", // emerald-600
        subtext: "Fresh incoming enquiries",
      },
      {
        id: "Site Visit Scheduled",
        label: "Site Visits",
        value: statusCounts["Site Visit Scheduled"] || 0,
        color: "#C8A870", // gold
        subtext: "Confirmed on-ground tours",
      },
      {
        id: "Contacted",
        label: "In Discussion",
        value: statusCounts["Contacted"] || 0,
        color: "#2563EB", // blue-600
        subtext: "Counseling & layout shared",
      },
      {
        id: "Interested",
        label: "Shortlisted",
        value: statusCounts["Interested"] || 0,
        color: "#7C3AED", // violet-600
        subtext: "Token payment pending",
      },
      {
        id: "Converted",
        label: "Allotted",
        value: statusCounts["Converted"] || 0,
        color: "#07140F", // deep forest
        subtext: "Registry in progress",
      },
      {
        id: "Closed",
        label: "Archived",
        value: statusCounts["Closed"] || 0,
        color: "#A8A29E", // stone-400
        subtext: "Dropped or inactive",
      },
    ].filter((s) => s.value > 0);
  }, [enquiries]);

  // 2. Project Inventory Breakdown (memoized)
  const inventorySlices: Slice[] = useMemo(() => {
    const projectStatusCounts: Record<string, number> = {};
    projects.forEach((p) => {
      projectStatusCounts[p.status] = (projectStatusCounts[p.status] || 0) + 1;
    });

    return [
      {
        id: "Available",
        label: "Available",
        value: projectStatusCounts["Available"] || 0,
        color: "#059669",
        subtext: "Ready for allotment",
      },
      {
        id: "Phase 1 Fast Filling",
        label: "Fast Filling",
        value: projectStatusCounts["Phase 1 Fast Filling"] || 0,
        color: "#D97706",
        subtext: ">70% inventory sold",
      },
      {
        id: "Pre-Launch Preview",
        label: "Pre-Launch",
        value: projectStatusCounts["Pre-Launch Preview"] || 0,
        color: "#C8A870",
        subtext: "Exclusive early bookings",
      },
      {
        id: "Sold Out",
        label: "Sold Out",
        value: projectStatusCounts["Sold Out"] || 0,
        color: "#57534E",
        subtext: "Secondary resale only",
      },
    ].filter((s) => s.value > 0);
  }, [projects]);

  const activeSlices = activeTab === "enquiries" ? enquirySlices : inventorySlices;
  const totalValue = useMemo(
    () => activeSlices.reduce((sum, s) => sum + s.value, 0) || 1,
    [activeSlices]
  );

  // Compute SVG Donut geometry
  const radius = 80;
  const strokeWidth = 22;
  const circumference = 2 * Math.PI * radius;

  const currentHovered = activeSlices.find((s) => s.id === hoveredSlice) || null;

  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-5 flex flex-col justify-between">
      {/* Header with Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-100">
              <PieIcon className="w-4 h-4" />
            </span>
            <h2 className="font-serif text-lg font-bold text-[#07140F]">
              Portfolio & Pipeline Distribution
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Real-time percentage breakdown across active database records.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="inline-flex p-1 bg-stone-100 rounded-xl text-xs font-medium text-stone-600">
          <button
            onClick={() => {
              setActiveTab("enquiries");
              setHoveredSlice(null);
            }}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === "enquiries"
                ? "bg-white text-[#07140F] font-semibold shadow-xs"
                : "hover:text-stone-900"
            }`}
          >
            Leads Pipeline
          </button>
          <button
            onClick={() => {
              setActiveTab("inventory");
              setHoveredSlice(null);
            }}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === "inventory"
                ? "bg-white text-[#07140F] font-semibold shadow-xs"
                : "hover:text-stone-900"
            }`}
          >
            Plot Status
          </button>
        </div>
      </div>

      {/* Main Interactive Donut & Legend Container */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* SVG Donut Chart */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center relative py-1">
          <div className="relative w-40 h-40 sm:w-44 sm:h-44">
            <svg
              viewBox="0 0 220 220"
              className="w-full h-full -rotate-90 transform select-none"
            >
              {/* Background ring */}
              <circle
                cx="110"
                cy="110"
                r={radius}
                fill="none"
                stroke="#F5F5F4"
                strokeWidth={strokeWidth}
              />

              {/* Slices */}
              {(() => {
                let acc = 0;
                return activeSlices.map((slice) => {
                  const fraction = slice.value / totalValue;
                  const strokeDasharray = `${fraction * circumference} ${circumference}`;
                  const strokeDashoffset = -acc * circumference;
                  acc += fraction;

                  const isHovered = hoveredSlice === slice.id;

                  return (
                    <circle
                      key={slice.id}
                      cx="110"
                      cy="110"
                      r={radius}
                      fill="none"
                      stroke={slice.color}
                      strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-300 cursor-pointer"
                      onMouseEnter={() => setHoveredSlice(slice.id)}
                      onMouseLeave={() => setHoveredSlice(null)}
                    />
                  );
                });
              })()}
            </svg>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-2">
              {currentHovered ? (
                <>
                  <span className="text-[10px] font-mono text-stone-400 uppercase font-bold tracking-wider max-w-[95px] truncate">
                    {currentHovered.label}
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold font-serif text-[#07140F] my-0.5 leading-none">
                    {currentHovered.value}
                  </span>
                  <span className="text-[11px] font-semibold text-[#8F6F3B]">
                    {((currentHovered.value / totalValue) * 100).toFixed(0)}% of Total
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[10px] font-mono text-stone-400 uppercase font-semibold">
                    {activeTab === "enquiries" ? "Total Leads" : "Total Plots"}
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold font-serif text-[#07140F] my-0.5 leading-none">
                    {totalValue}
                  </span>
                  <span className="text-[10px] text-stone-400 font-medium">
                    Live Total
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Legend & Breakdown List */}
        <div className="flex-1 min-w-0 space-y-1.5 w-full">
          {activeSlices.map((slice) => {
            const percentage = ((slice.value / totalValue) * 100).toFixed(1);
            const isHovered = hoveredSlice === slice.id;

            return (
              <div
                key={slice.id}
                onMouseEnter={() => setHoveredSlice(slice.id)}
                onMouseLeave={() => setHoveredSlice(null)}
                title={slice.subtext ? `${slice.label} (${slice.subtext})` : slice.label}
                className={`px-3 py-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isHovered
                    ? "bg-stone-50 border-[#C8A870]/60 shadow-xs ring-1 ring-[#C8A870]/20"
                    : "bg-white border-stone-100 hover:border-stone-200"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform duration-200"
                    style={{
                      backgroundColor: slice.color,
                      transform: isHovered ? "scale(1.25)" : "scale(1)",
                    }}
                  />
                  <span className="text-xs font-semibold text-stone-900 truncate">
                    {slice.label}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="w-8 sm:w-10 bg-stone-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: slice.color,
                      }}
                    />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold font-serif text-stone-900">
                      {slice.value}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono ml-1">
                      ({percentage}%)
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
