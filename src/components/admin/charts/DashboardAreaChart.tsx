"use client";

import React, { useState, useMemo } from "react";
import { TrendingUp, Calendar, Users, Eye } from "lucide-react";

interface DataPoint {
  label: string;
  enquiries: number;
  siteVisits: number;
}

const MONTHLY_DATA: DataPoint[] = [
  { label: "May", enquiries: 28, siteVisits: 12 },
  { label: "Jun", enquiries: 42, siteVisits: 18 },
  { label: "Jul", enquiries: 36, siteVisits: 15 },
  { label: "Aug", enquiries: 54, siteVisits: 24 },
  { label: "Sep", enquiries: 68, siteVisits: 31 },
  { label: "Oct", enquiries: 85, siteVisits: 44 },
];

const EXTENDED_DATA: DataPoint[] = [
  { label: "Nov", enquiries: 22, siteVisits: 9 },
  { label: "Dec", enquiries: 31, siteVisits: 14 },
  { label: "Jan", enquiries: 38, siteVisits: 16 },
  { label: "Feb", enquiries: 45, siteVisits: 20 },
  { label: "Mar", enquiries: 50, siteVisits: 22 },
  { label: "Apr", enquiries: 62, siteVisits: 27 },
  ...MONTHLY_DATA,
];

// SVG dimensions
const WIDTH = 640;
const HEIGHT = 220;
const PADDING_X = 40;
const PADDING_BOTTOM = 35;
const PADDING_TOP = 20;
const CHART_WIDTH = WIDTH - PADDING_X * 2;
const CHART_HEIGHT = HEIGHT - PADDING_TOP - PADDING_BOTTOM;

export default function DashboardAreaChart() {
  const [range, setRange] = useState<"6m" | "12m">("6m");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const data = range === "6m" ? MONTHLY_DATA : EXTENDED_DATA;

  const {
    enquiriesPath,
    siteVisitsPath,
    enquiriesArea,
    siteVisitsArea,
    totalEnquiries,
    totalVisits,
    maxVal,
    pointsMap,
  } = useMemo(() => {
    const max = Math.max(...data.map((d) => Math.max(d.enquiries, d.siteVisits))) * 1.15 || 100;
    const getX = (index: number) => PADDING_X + (index / (data.length - 1)) * CHART_WIDTH;
    const getY = (val: number) => PADDING_TOP + CHART_HEIGHT - (val / max) * CHART_HEIGHT;

    const createPath = (key: "enquiries" | "siteVisits") => {
      if (data.length === 0) return "";
      const pts = data.map((d, i) => ({ x: getX(i), y: getY(d[key]) }));

      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i === 0 ? 0 : i - 1];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2] || p2;

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
      }
      return d;
    };

    const enqPath = createPath("enquiries");
    const svPath = createPath("siteVisits");

    const enqArea = `${enqPath} L ${getX(data.length - 1)} ${PADDING_TOP + CHART_HEIGHT} L ${getX(0)} ${PADDING_TOP + CHART_HEIGHT} Z`;
    const svArea = `${svPath} L ${getX(data.length - 1)} ${PADDING_TOP + CHART_HEIGHT} L ${getX(0)} ${PADDING_TOP + CHART_HEIGHT} Z`;

    const totEnq = data.reduce((acc, curr) => acc + curr.enquiries, 0);
    const totVis = data.reduce((acc, curr) => acc + curr.siteVisits, 0);

    const pts = data.map((d, i) => ({
      x: getX(i),
      yEnq: getY(d.enquiries),
      yVis: getY(d.siteVisits),
    }));

    return {
      enquiriesPath: enqPath,
      siteVisitsPath: svPath,
      enquiriesArea: enqArea,
      siteVisitsArea: svArea,
      totalEnquiries: totEnq,
      totalVisits: totVis,
      maxVal: max,
      pointsMap: pts,
    };
  }, [data]);

  const width = WIDTH;
  const height = HEIGHT;
  const paddingX = PADDING_X;
  const paddingTop = PADDING_TOP;
  const chartHeight = CHART_HEIGHT;

  const activePoint = hoverIndex !== null ? data[hoverIndex] : data[data.length - 1];

  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-5">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h2 className="font-serif text-lg font-bold text-[#07140F]">
              Enquiry Velocity & Site Visit Trajectory
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Track prospective land buyers and on-ground private inspections.
          </p>
        </div>

        {/* Timescale Selector & Pill */}
        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 bg-stone-100 rounded-xl text-xs font-medium text-stone-600">
            <button
              onClick={() => setRange("6m")}
              className={`px-3 py-1 rounded-lg transition-all ${
                range === "6m"
                  ? "bg-white text-[#07140F] font-semibold shadow-xs"
                  : "hover:text-stone-900"
              }`}
            >
              Last 6 Months
            </button>
            <button
              onClick={() => setRange("12m")}
              className={`px-3 py-1 rounded-lg transition-all ${
                range === "12m"
                  ? "bg-white text-[#07140F] font-semibold shadow-xs"
                  : "hover:text-stone-900"
              }`}
            >
              12 Months
            </button>
          </div>
        </div>
      </div>

      {/* KPI Mini Ribbons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
          <span className="text-[10px] font-mono uppercase text-stone-500 font-semibold">Total Inquiries</span>
          <p className="text-xl font-bold font-serif text-[#07140F] mt-0.5">{totalEnquiries}</p>
          <span className="text-[10px] text-emerald-700 font-medium">+24.8% vs prior period</span>
        </div>
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
          <span className="text-[10px] font-mono uppercase text-stone-500 font-semibold">Site Visits</span>
          <p className="text-xl font-bold font-serif text-[#C8A870] mt-0.5">{totalVisits}</p>
          <span className="text-[10px] text-amber-700 font-medium">
            {((totalVisits / totalEnquiries) * 100).toFixed(1)}% Conversion Rate
          </span>
        </div>
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
          <span className="text-[10px] font-mono uppercase text-stone-500 font-semibold">Selected Point ({activePoint.label})</span>
          <p className="text-xl font-bold font-serif text-stone-900 mt-0.5">{activePoint.enquiries} Leads</p>
          <span className="text-[10px] text-stone-500 font-medium">{activePoint.siteVisits} Physical Visits</span>
        </div>
        <div className="p-3 rounded-xl bg-emerald-950 text-[#FAF8F5] border border-emerald-900">
          <span className="text-[10px] font-mono uppercase text-[#DFBE82] font-semibold">Corridor Leader</span>
          <p className="text-sm font-bold font-serif text-white mt-0.5 truncate">Ajmer Expressway</p>
          <span className="text-[10px] text-stone-300 font-light">42% buyer concentration</span>
        </div>
      </div>

      {/* Interactive SVG Chart Container */}
      <div className="relative pt-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-56 sm:h-64 select-none overflow-visible"
        >
          <defs>
            {/* Emerald Gradient */}
            <linearGradient id="enquiriesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#07140F" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#07140F" stopOpacity="0.0" />
            </linearGradient>

            {/* Champagne Gold Gradient */}
            <linearGradient id="visitsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C8A870" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#C8A870" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {[0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = paddingTop + chartHeight * (1 - ratio);
            return (
              <g key={i}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#E7E5E4"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 10}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="9"
                  fontFamily="monospace"
                  fill="#A8A29E"
                >
                  {Math.round(maxVal * ratio)}
                </text>
              </g>
            );
          })}

          {/* Area Fills */}
          <path d={enquiriesArea} fill="url(#enquiriesGrad)" />
          <path d={siteVisitsArea} fill="url(#visitsGrad)" />

          {/* Stroke Curves */}
          <path
            d={enquiriesPath}
            fill="none"
            stroke="#07140F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d={siteVisitsPath}
            fill="none"
            stroke="#C8A870"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Data Points & Vertical hover guideline */}
          {data.map((d, i) => {
            const pt = pointsMap[i];
            const cx = pt?.x ?? 0;
            const cyEnq = pt?.yEnq ?? 0;
            const cyVis = pt?.yVis ?? 0;
            const isHovered = hoverIndex === i;

            return (
              <g
                key={i}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                className="cursor-pointer"
              >
                {/* Invisible hover strike area */}
                <rect
                  x={cx - 20}
                  y={paddingTop}
                  width="40"
                  height={chartHeight}
                  fill="transparent"
                />

                {/* Vertical hover crosshair */}
                {isHovered && (
                  <line
                    x1={cx}
                    y1={paddingTop}
                    x2={cx}
                    y2={paddingTop + chartHeight}
                    stroke="#C8A870"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Point for Enquiries */}
                <circle
                  cx={cx}
                  cy={cyEnq}
                  r={isHovered ? 5.5 : 3.5}
                  fill="#07140F"
                  stroke="#FAF8F5"
                  strokeWidth="2"
                  className="transition-all"
                />

                {/* Point for Site Visits */}
                <circle
                  cx={cx}
                  cy={cyVis}
                  r={isHovered ? 5.5 : 3.5}
                  fill="#C8A870"
                  stroke="#FAF8F5"
                  strokeWidth="2"
                  className="transition-all"
                />

                {/* X Axis Month Label */}
                <text
                  x={cx}
                  y={height - 10}
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="sans-serif"
                  fontWeight={isHovered ? "bold" : "normal"}
                  fill={isHovered ? "#07140F" : "#78716C"}
                >
                  {d.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 pt-2 text-xs text-stone-600 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#07140F]" />
            <span>Buyer Enquiries</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#C8A870]" />
            <span>Confirmed Site Visits</span>
          </div>
        </div>
      </div>
    </div>
  );
}
