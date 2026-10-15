"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, Compass, ArrowRight, ShieldCheck, PhoneCall } from "lucide-react";
import { FAQS } from "@/data/properties";

const CATEGORIES = ["All", "Legal & Titles", "Infrastructure", "Construction", "Site Visits", "Booking & Payment", "Investment"];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs =
    activeCategory === "All"
      ? FAQS
      : FAQS.filter((f) => f.category === activeCategory);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      {/* Header */}
      <section className="bg-[#0A1D16] text-[#FAF8F5] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#C8A870]/20">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A870]/15 border border-[#C8A870]/30 text-[#C8A870] text-xs font-semibold uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            Knowledge & Due Diligence
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl font-light">
            Clear, transparent answers regarding JDA Patta issuance, 90A revenue conversion, registry procedures, plot measurement in Gaj (वर्ग गज), and site visits across Jaipur, Rajasthan.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-[#0A1D16] text-[#FAF8F5] shadow"
                  : "bg-white text-stone-600 hover:bg-stone-100 border border-[#C8A870]/25"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="bg-white rounded-xl border border-[#C8A870]/25 overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#8F6F3B] tracking-wider block">
                      {faq.category}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#0A1D16]">
                      {faq.question}
                    </h3>
                  </div>

                  <span
                    className={`w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#0A1D16] text-[#C8A870]" : "text-stone-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-stone-700 text-xs sm:text-sm leading-relaxed border-t border-stone-100 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="p-8 rounded-2xl bg-[#0A1D16] text-[#FAF8F5] border border-[#C8A870]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-xl font-bold text-white">
              Have specific legal or title queries?
            </h4>
            <p className="text-xs text-stone-400">
              Speak directly with our conveyance advocate and land survey specialist.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded bg-[#C8A870] hover:bg-[#DFBE82] text-[#07140F] text-xs font-bold uppercase tracking-wider transition-all"
            >
              Contact Legal Desk
            </Link>
            <a
              href="tel:+918001234567"
              className="p-2.5 rounded bg-white/10 text-white hover:text-[#C8A870] transition-colors"
              title="Call hotline"
            >
              <PhoneCall className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
