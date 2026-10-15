"use client";

import React from "react";
import { ShieldCheck, Ruler, Compass, HardHat, Sparkles } from "lucide-react";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "100% JDA Patta & 90A Sanctions",
    description:
      "Every plot undergoes thorough legal title verification. We certify JDA Patta issuance, 90A revenue conversion, RERA Rajasthan registration, and unencumbered ownership before listing.",
    badge: "JDA Approved",
  },
  {
    icon: HardHat,
    title: "Infrastructure-First Engineering",
    description:
      "All plotted communities feature wide 40–60ft paved roads, underground electrical conduits, Bisalpur sweet water supply connections, and demarcated boundary pegs.",
    badge: "Ready-to-Construct",
  },
  {
    icon: Compass,
    title: "Jaipur Arterial Growth Corridors",
    description:
      "Strategically selected nodes along the 360-ft Jaipur Ring Road, Ajmer Road SEZ, Jagatpura, and Tonk Road engineered for high compound capital appreciation.",
    badge: "Jaipur Corridors",
  },
  {
    icon: Ruler,
    title: "Unrestricted Architectural Autonomy",
    description:
      "Build your private sanctuary on your schedule. Design custom biophilic courtyards, basements, and infinity pools with your architect of choice.",
    badge: "Bespoke Freedom",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#8F6F3B] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            The Terra Firma Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1D16] tracking-tight">
            Setting the Benchmark in Plotted Real Estate
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3">
            In an opaque land market, we deliver institutional-grade transparency, physical infrastructure, and lasting peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group p-7 rounded-xl bg-white border border-[#C8A870]/20 hover:border-[#C8A870] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="w-12 h-12 rounded-lg bg-[#0A1D16] text-[#C8A870] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F6F3B] bg-[#C8A870]/10 px-2 py-0.5 rounded">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#0A1D16] group-hover:text-[#14382C] transition-colors leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                  <span>STANDARD #0{idx + 1}</span>
                  <span className="text-[#C8A870] font-semibold">VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
