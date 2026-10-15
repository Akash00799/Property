"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass } from "lucide-react";
import { CATEGORIES } from "@/data/properties";

const CATEGORY_IMAGES: Record<string, string> = {
  "JDA Approved Township": "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
  "Gated Society Plots": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop",
  "Ring Road Growth Corridor": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
  "Aravalli Hillview Parcels": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1000&auto=format&fit=crop",
  "Luxury Farmhouse Land": "https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=1000&auto=format&fit=crop",
};

export default function CategorySection() {
  const categoriesToDisplay = CATEGORIES.filter((c) => c.id !== "all");

  return (
    <section className="py-20 bg-[#FAF8F5] border-t border-[#C8A870]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#8F6F3B] block mb-2">
            Curated Typologies
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1D16] tracking-tight">
            Browse by Land Typology
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Every lifestyle and capital goal requires distinct geography. Discover plot enclaves tailored to your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesToDisplay.map((cat, idx) => {
            const img =
              CATEGORY_IMAGES[cat.label] ||
              "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop";

            return (
              <Link
                key={cat.id}
                href={`/plots?category=${encodeURIComponent(cat.label)}`}
                className={`group relative rounded-xl overflow-hidden min-h-[300px] border border-[#C8A870]/25 shadow-sm hover:shadow-xl hover:border-[#C8A870] transition-all flex flex-col justify-end p-6 ${
                  idx === 0 ? "lg:col-span-2 min-h-[360px]" : ""
                }`}
              >
                {/* Background Image */}
                <Image
                  src={img}
                  alt={cat.label}
                  fill
                  className="object-cover group-hover:scale-106 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07140F] via-[#07140F]/50 to-transparent" />

                {/* Content */}
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#C8A870] bg-[#0A1D16]/80 px-2.5 py-1 rounded backdrop-blur-sm border border-[#C8A870]/30">
                      {cat.count} Available Plots
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:bg-[#C8A870] group-hover:text-[#07140F] transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#DFBE82] transition-colors">
                    {cat.label}
                  </h3>

                  <p className="text-xs text-stone-300 line-clamp-2 max-w-md">
                    {cat.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
