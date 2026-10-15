"use client";

import React from "react";
import Image from "next/image";
import { Quote, Sparkles, ShieldAlert, Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/properties";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#FAF8F5] border-t border-[#C8A870]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C8A870]/15 text-[#8F6F3B] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Client Perspectives
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1D16] tracking-tight">
            Trusted by Land Owners & Architects
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Read perspectives from investors and families who established their generational footprint with us.
          </p>

          <div className="mt-3 inline-flex items-center gap-2 text-[11px] text-amber-800 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <span>Fictional sample testimonials for frontend review & layout demonstration</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="group p-8 rounded-2xl bg-white border border-[#C8A870]/25 hover:border-[#C8A870] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-[#C8A870]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#C8A870]/20" />
                </div>

                <p className="text-stone-700 text-sm leading-relaxed italic">
                  &ldquo;{test.content}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-stone-200 flex-shrink-0">
                  <Image
                    src={test.avatar}
                    alt={test.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#0A1D16]">
                    {test.name}
                  </h4>
                  <p className="text-xs text-stone-500">{test.role}</p>
                  <p className="text-[10px] text-[#8F6F3B] font-medium mt-0.5">{test.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
