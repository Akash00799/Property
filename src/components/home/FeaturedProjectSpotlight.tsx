"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, MapPin, Maximize2, ShieldCheck, ArrowRight, Calendar, Sparkles } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";

export default function FeaturedProjectSpotlight() {
  const { projects } = useAdminData();
  const spotlight = projects.find((p) => p.isFeatured) || projects[0];
  const [activeTab, setActiveTab] = useState<"aerial" | "masterplan">("aerial");

  return (
    <section className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A1D16] text-[#FAF8F5] rounded-3xl overflow-hidden border border-[#C8A870]/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Media Showcase */}
            <div className="lg:col-span-7 relative min-h-[400px] lg:min-h-[580px] bg-stone-900 overflow-hidden">
              <Image
                src={
                  activeTab === "aerial"
                    ? spotlight?.heroImage || "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop"
                    : spotlight?.galleryImages?.[1] || "https://images.unsplash.com/photo-1524813686514-a57563d77d61?q=80&w=1600&auto=format&fit=crop"
                }
                alt={spotlight?.title || "Whispering Pines Golf Enclave"}
                fill
                className="object-cover transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D16] via-transparent to-transparent lg:hidden" />

              {/* View Switcher Overlay */}
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <button
                  onClick={() => setActiveTab("aerial")}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md transition-all ${
                    activeTab === "aerial"
                      ? "bg-[#C8A870] text-[#0A1D16] shadow"
                      : "bg-[#0A1D16]/80 text-stone-300 hover:text-white"
                  }`}
                >
                  Aerial Drone View
                </button>
                <button
                  onClick={() => setActiveTab("masterplan")}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md transition-all ${
                    activeTab === "masterplan"
                      ? "bg-[#C8A870] text-[#0A1D16] shadow"
                      : "bg-[#0A1D16]/80 text-stone-300 hover:text-white"
                  }`}
                >
                  Master Layout Plan
                </button>
              </div>

              {/* Status Tag */}
              <div className="absolute bottom-4 left-4 z-10 bg-[#0A1D16]/90 border border-[#C8A870]/30 px-3 py-1 rounded backdrop-blur-md text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-[#C8A870]">Phase 1: 82% Reserved [Demo]</span>
              </div>
            </div>

            {/* Project Details & Story */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#DFBE82]">
                  <Sparkles className="w-3.5 h-3.5" />
                  Flagship Development Spotlight
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                  {spotlight?.title || "The Royal Enclave — Jagatpura"}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-stone-300">
                  <MapPin className="w-3.5 h-3.5 text-[#C8A870]" />
                  <span>
                    {spotlight
                      ? `${spotlight.location.locality}, ${spotlight.location.city} (${spotlight.location.state})`
                      : "Mahal Road, Jagatpura Extension, Jaipur (Rajasthan)"}
                  </span>
                </div>

                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-normal">
                  {spotlight?.story ||
                    "A grand 85-Bigha JDA-approved gated township featuring 200 Gaj and 250 Gaj demarcated residential plots. Directly connected to 60-foot sector road with underground cabling, sweet potable water lines, and temple green parks."}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-[#C8A870] block">Township Footprint</span>
                    <span className="text-xl font-bold text-white">85 Bighas</span>
                    <span className="text-[10px] text-stone-400 block">{spotlight?.legal.approvalStatus || "JDA Sanctioned Layout Map"}</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-[#C8A870] block">Plot Dimensions (Gaj)</span>
                    <span className="text-xl font-bold text-white">{spotlight?.dimensions.plotAreaGaj ? `${spotlight.dimensions.plotAreaGaj} Gaj` : "111 – 300 Gaj"}</span>
                    <span className="text-[10px] text-stone-400 block">{spotlight?.dimensions.facing ? `${spotlight.dimensions.facing} Facing` : "Square Yards (वर्ग गज)"}</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-[#C8A870] block">Sector Road Width</span>
                    <span className="text-xl font-bold text-white">{spotlight?.dimensions.roadWidthFt ? `${spotlight.dimensions.roadWidthFt} Feet` : "40 & 60 Feet"}</span>
                    <span className="text-[10px] text-stone-400 block">Asphalt Paved with Streetlights</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-[#C8A870] block">Starting Valuation</span>
                    <span className="text-xl font-bold text-[#DFBE82]">{spotlight?.price.formatted || "₹35.52 Lakh"}</span>
                    <span className="text-[10px] text-stone-400 block">₹{spotlight?.price.pricePerSqFt ? `${spotlight.price.pricePerSqFt.toLocaleString()}/sq.ft` : "From ₹32,000/Gaj"}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href={spotlight ? `/plots/${spotlight.id}` : "/plots/plot-01"}
                  className="w-full sm:w-auto px-6 py-3 rounded bg-gradient-to-r from-[#DFBE82] to-[#B08E55] text-[#07140F] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Explore JDA Masterplan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={spotlight ? `/schedule-visit?plotId=${spotlight.id}` : "/schedule-visit?plotId=plot-02"}
                  className="w-full sm:w-auto px-5 py-3 rounded bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white/10"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C8A870]" />
                  <span>Book VIP Visit</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
