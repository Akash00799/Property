"use client";

import React from "react";
import Link from "next/link";
import { Search, Compass, FileCheck, KeyRound, ArrowRight } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Curated Discovery",
    desc: "Filter through verified plots matching your size, orientation, and capital allocation criteria.",
    icon: Search,
  },
  {
    num: "02",
    title: "Chauffeur Site Walk",
    desc: "Experience complimentary private transfer and walk the demarcated boundaries with our land survey specialist.",
    icon: Compass,
  },
  {
    num: "03",
    title: "30-Year Title Review",
    desc: "Review certified revenue documents, non-encumbrance records, and zoning sanctions with your legal counsel.",
    icon: FileCheck,
  },
  {
    num: "04",
    title: "Deed Registry & Keys",
    desc: "Complete registration at the sub-registrar office with immediate physical peg demarcation and possession certificate.",
    icon: KeyRound,
  },
];

export default function ProcessSteps() {
  return (
    <section className="py-20 bg-[#0E1E18] text-[#FAF8F5] border-y border-[#C8A870]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C8A870] block mb-2">
            The Ownership Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Four Steps to Sovereign Soil
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-2">
            We eliminate friction, guesswork, and paperwork bottlenecks with our streamlined land procurement protocol.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative p-6 rounded-xl bg-[#07140F]/80 border border-[#C8A870]/20 hover:border-[#C8A870] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-bold text-[#C8A870]">
                      {step.num}
                    </span>
                    <span className="w-10 h-10 rounded-full bg-[#0A1D16] border border-[#C8A870]/30 flex items-center justify-center text-[#DFBE82]">
                      <Icon className="w-4 h-4" />
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-stone-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-800 text-[10px] uppercase tracking-wider text-stone-500 font-medium">
                  {idx === 0 && "Step 1 of 4"}
                  {idx === 1 && "Step 2 of 4"}
                  {idx === 2 && "Step 3 of 4"}
                  {idx === 3 && "Possession Guaranteed"}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/schedule-visit"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded bg-gradient-to-r from-[#DFBE82] to-[#B08E55] text-[#07140F] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
          >
            <span>Begin Your Inspection with Step 02</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
