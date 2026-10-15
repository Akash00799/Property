"use client";

import React, { useState } from "react";
import { BarChart3, MapPin, Compass } from "lucide-react";

interface CorridorData {
  corridor: string;
  subLocation: string;
  demandScore: number; // 0 - 100
  avgBudget: string;
  activePlots: number;
}

const CORRIDORS: CorridorData[] = [
  {
    corridor: "Ajmer Expressway",
    subLocation: "Thikariya, Ring Road Toll",
    demandScore: 88,
    avgBudget: "₹28,000 / Gaj",
    activePlots: 14,
  },
  {
    corridor: "Tonk Road Corridor",
    subLocation: "Chaksu, Ring Road Junction",
    demandScore: 74,
    avgBudget: "₹24,500 / Gaj",
    activePlots: 9,
  },
  {
    corridor: "Jagatpura Ext. / Mahal Rd",
    subLocation: "CBI Colony, Karolan Ka Barh",
    demandScore: 92,
    avgBudget: "₹38,000 / Gaj",
    activePlots: 11,
  },
  {
    corridor: "Sirsi - Bindayaka Link",
    subLocation: "Sirsi Road, Mundiya Purohitan",
    demandScore: 68,
    avgBudget: "₹26,000 / Gaj",
    activePlots: 6,
  },
  {
    corridor: "Delhi-Jaipur Highway (NH-48)",
    subLocation: "Kukas, Achrol Valley",
    demandScore: 81,
    avgBudget: "₹32,000 / Gaj",
    activePlots: 8,
  },
];

export default function DashboardBarChart() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
              <BarChart3 className="w-4 h-4" />
            </span>
            <h2 className="font-serif text-lg font-bold text-[#07140F]">
              Jaipur Micro-Market Demand Index
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Buyer preference & pricing traction across high-growth arterial corridors.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-stone-500 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
          <Compass className="w-3.5 h-3.5 text-[#C8A870]" />
          <span>Real-time Market Heatmap</span>
        </div>
      </div>

      <div className="space-y-4 pt-1">
        {CORRIDORS.map((item, idx) => {
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={item.corridor}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                isHovered
                  ? "bg-stone-50/90 border-[#C8A870]/60 shadow-xs"
                  : "bg-white border-stone-100 hover:border-stone-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C8A870]" />
                  <span className="font-serif font-bold text-xs text-[#07140F]">
                    {item.corridor}
                  </span>
                  <span className="text-[11px] text-stone-400 hidden md:inline">
                    ({item.subLocation})
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-stone-500 text-[11px]">
                    Avg: <strong className="text-stone-900">{item.avgBudget}</strong>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold text-[10px]">
                    {item.activePlots} Listings
                  </span>
                </div>
              </div>

              {/* Progress Bar with animated gradient */}
              <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden p-0.5 relative">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${item.demandScore}%`,
                    background:
                      isHovered
                        ? "linear-gradient(90deg, #07140F 0%, #C8A870 100%)"
                        : "linear-gradient(90deg, #064E3B 0%, #059669 100%)",
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-stone-400 mt-1 font-mono">
                <span>Demand Index</span>
                <span className="font-semibold text-stone-700">
                  {item.demandScore} / 100 Velocity Score
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
