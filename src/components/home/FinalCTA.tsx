"use client";

import React from "react";
import Link from "next/link";
import { Compass, Calendar, PhoneCall, MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-24 bg-[#07140F] text-[#FAF8F5] border-t border-[#C8A870]/20 overflow-hidden">
      {/* Ambient background glows (GPU-accelerated) */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full glow-gold" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full glow-emerald" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A870]/15 border border-[#C8A870]/30 text-[#C8A870] text-xs font-semibold uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5" />
          The Ground Beneath Your Legacy
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
          Ready to Walk the Soil of Your Next Chapter?
        </h2>

        <p className="text-stone-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Nothing compares to standing on the physical plot, admiring the horizon line, and feeling the elevation firsthand. Allow us to arrange a private chauffeur inspection at your convenience.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/schedule-visit"
            className="px-8 py-4 rounded bg-gradient-to-r from-[#DFBE82] via-[#C8A870] to-[#AF8D54] text-[#07140F] text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-xl flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Private Site Visit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="https://wa.me/918001234567?text=Hello%20Terra%20Firma,%20I%20would%20like%20to%20inquire%20about%20residential%20plots"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-4 rounded bg-[#0F2920] hover:bg-[#14382C] border border-[#C8A870]/40 text-stone-200 hover:text-white transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp Land Desk</span>
          </a>

          <a
            href="tel:+918001234567"
            className="px-6 py-4 rounded hover:bg-white/5 text-stone-300 hover:text-[#C8A870] transition-colors text-xs uppercase tracking-wider flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-[#C8A870]" />
            <span>+91 (800) 123-4567</span>
          </a>
        </div>

        <div className="pt-8 flex items-center justify-center gap-6 text-xs text-stone-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C8A870]" />
            Complimentary Executive Chauffeur
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-stone-700" />
          <span>Zero Obligation Consultation</span>
          <span className="w-1.5 h-1.5 rounded-full bg-stone-700" />
          <span>Complete Document Packet Provided</span>
        </div>
      </div>
    </section>
  );
}
