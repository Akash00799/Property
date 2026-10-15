"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  ShieldCheck,
  Trees,
  HardHat,
  Ruler,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
} from "lucide-react";

const VALUES = [
  {
    title: "100% JDA Patta & 90A Revenue Integrity",
    desc: "We perform exhaustive forensic reviews of JDA Patta, 90A non-agricultural conversion, and RERA Rajasthan sanctions before offering any plot parcel in Jaipur.",
    icon: ShieldCheck,
  },
  {
    title: "Infrastructure Pre-Installed",
    desc: "We believe land without infrastructure is merely raw dirt. Every community features wide paved avenues, subterranean electrical conduits, piped water, and security.",
    icon: HardHat,
  },
  {
    title: "Respect for Natural Ecology",
    desc: "We design with the land contours rather than leveling them. Preserving mature tree lines, natural aquifers, and rainwater drainage buffers is central to our masterplans.",
    icon: Trees,
  },
  {
    title: "Sovereign Architectural Freedom",
    desc: "We champion individual creative autonomy. Every plot owner has total freedom to collaborate with their chosen architects, contractors, and interior visionaries.",
    icon: Ruler,
  },
];

const LEADERSHIP = [
  {
    name: "Vikramaditya Vardhan",
    role: "Founder & Managing Director",
    bio: "Over 22 years pioneering master-planned communities and large-scale land acquisitions across premier urban growth corridors.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Elena Rostova",
    role: "Chief Landscape Architect & Master Planner",
    bio: "Former partner at leading global urban design studios; specializes in biophilic contour preservation and low-density residential master layouts.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Arjun Somasekharan",
    role: "Head of Legal Due Diligence",
    bio: "Advocate with over two decades of high-court real estate conveyance, land title verification, and statutory zoning experience.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      {/* Hero Header */}
      <section className="bg-[#0A1D16] text-[#FAF8F5] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#C8A870]/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A870]/15 border border-[#C8A870]/30 text-[#C8A870] text-xs font-semibold uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            Our Architectural Manifesto
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-[1.15]">
            Grounded in Integrity. <br />
            <span className="italic text-[#DFBE82]">Dedicated to the Soil.</span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-lg max-w-2xl font-light leading-relaxed">
            Terra Firma was founded on a simple conviction: land is the purest, most permanent foundation of wealth and family legacy. Our mission is to restore uncompromising transparency and world-class infrastructure to residential plotted developments.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        {/* Visual Storytelling Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#8F6F3B] font-bold block">
              The Genesis
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1D16] leading-tight">
              Why We Focus Exclusively on Plotted Land
            </h2>
            <p className="text-stone-700 text-sm leading-relaxed">
              In a marketplace inundated with generic high-rise apartments—where buyers own fractional vertical cubes and face escalating monthly maintenance dues—we chose the enduring permanence of the earth.
            </p>
            <p className="text-stone-700 text-sm leading-relaxed">
              When you buy a residential plot at Terra Firma, you own 100% of the soil beneath your feet, all the way to the sky above. You control the timeline of construction, the materials of your home, and the legacy you pass to future generations.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-[#C8A870]/30 shadow-sm">
                <span className="font-serif text-3xl font-bold text-[#0A1D16]">450+</span>
                <span className="text-xs text-stone-500 block mt-1">Bighas Planned in Jaipur [Demo]</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#C8A870]/30 shadow-sm">
                <span className="font-serif text-3xl font-bold text-[#0A1D16]">100%</span>
                <span className="text-xs text-stone-500 block mt-1">JDA Patta & Clear Registry</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[#C8A870]/30">
            <Image
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop"
              alt="Terra Firma Plotted Landscape"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Core Pillars */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#8F6F3B] font-bold block mb-2">
              Our North Star
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1D16]">
              Core Principles of Stewardship
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="p-6 rounded-xl bg-white border border-[#C8A870]/25 shadow-sm hover:shadow-lg transition-all space-y-4"
                >
                  <span className="w-12 h-12 rounded-lg bg-[#0A1D16] text-[#C8A870] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#0A1D16]">
                    {val.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Advisory & Leadership Team */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#8F6F3B] font-bold block mb-2">
              Stewards & Advisors
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1D16]">
              Guided by Decades of Land Mastery
            </h2>
            <p className="text-xs text-stone-500 mt-2">
              [Fictional leadership representation for frontend design and demonstration]
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LEADERSHIP.map((lead) => (
              <div
                key={lead.name}
                className="group bg-white rounded-2xl overflow-hidden border border-[#C8A870]/25 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative aspect-square w-full bg-stone-100 overflow-hidden">
                  <Image
                    src={lead.image}
                    alt={lead.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-serif text-xl font-bold text-[#0A1D16]">
                    {lead.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#8F6F3B] block">
                    {lead.role}
                  </span>
                  <p className="text-xs text-stone-600 leading-relaxed pt-2">
                    {lead.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA Strip */}
        <section className="bg-[#0A1D16] text-[#FAF8F5] p-8 sm:p-12 rounded-2xl border border-[#C8A870]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-2xl font-bold text-white">
              Experience Our Approach in Person
            </h3>
            <p className="text-xs text-stone-400">
              Schedule a visit to our Experience Pavilion or arrange a private chauffeur inspection.
            </p>
          </div>
          <Link
            href="/schedule-visit"
            className="px-7 py-3.5 rounded bg-gradient-to-r from-[#DFBE82] to-[#B08E55] text-[#07140F] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2 shadow"
          >
            <span>Book Site Visit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
