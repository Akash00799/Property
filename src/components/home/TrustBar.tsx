"use client";

import React from "react";
import { ShieldCheck, Trees, Compass, FileCheck } from "lucide-react";
import { INVESTMENT_METRICS } from "@/data/properties";

const ICONS = [ShieldCheck, Compass, Trees, FileCheck];

export default function TrustBar() {
  return (
    <section className="bg-[#FAF8F5] border-b border-[#C8A870]/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {INVESTMENT_METRICS.map((item, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <div
                key={item.title}
                className="group p-6 rounded-xl bg-white border border-[#C8A870]/30 hover:border-[#C8A870] transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-lg bg-[#0A1D16] text-[#DFBE82] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-[11px] uppercase font-bold text-stone-500 tracking-wider">
                    Pillar 0{idx + 1}
                  </span>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#081611] tracking-tight">
                    {item.metric}
                  </div>
                  <h4 className="text-sm font-bold text-[#081611] mt-1.5 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-normal font-normal">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
