"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Search,
  ExternalLink,
  Edit3,
  MapPin,
  Sparkles,
  Layers,
  FileCheck,
  Calendar,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import StatusBadge from "@/components/admin/StatusBadge";

export default function AdminCataloguesPage() {
  const { catalogues } = useAdminData();
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = catalogues.filter((cat) => {
    return (
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.location.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.volume.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-stone-500 text-xs font-mono uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-[#8F6F3B]" />
            <span>Architectural Publications & Monographs</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#07140F] mt-1">
            Township Catalogues Library
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Manage the editorial folio chapters, CAD master plan blueprints, connectivity analyses, and statutory JDA disclosures for full-screen monographs.
          </p>
        </div>

        <Link
          href="/catalogue"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 hover:border-[#C8A870] bg-white text-stone-700 hover:text-[#07140F] text-xs font-semibold transition-all shadow-sm flex-shrink-0"
        >
          <ExternalLink className="w-4 h-4 text-[#C8A870]" />
          <span>View Public Library</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search monographs by title, locality or volume..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#C8A870] text-stone-800 placeholder-stone-400 bg-stone-50/50"
          />
        </div>

        <span className="text-xs font-mono text-stone-400 hidden sm:inline">
          {filtered.length} of {catalogues.length} monographs
        </span>
      </div>

      {/* Catalogues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((cat) => (
          <article
            key={cat.id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Cover Preview Image */}
              <div className="relative aspect-[16/10] bg-[#07140F] overflow-hidden">
                <Image
                  src={cat.coverImage}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-[#07140F]/90 text-[#DFBE82] text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded border border-[#C8A870]/40">
                    {cat.volume}
                  </span>
                  <StatusBadge status={cat.status} size="sm" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono text-[#DFBE82] uppercase tracking-wider block">
                    {cat.edition} • {cat.year}
                  </span>
                  <p className="font-serif text-base font-bold text-white line-clamp-1">
                    {cat.title}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <p className="text-xs text-stone-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C8A870] flex-shrink-0" />
                  <span className="truncate">{cat.location.locality}, {cat.location.city}</span>
                </p>

                <p className="text-xs text-stone-600 line-clamp-2 font-light leading-relaxed">
                  {cat.overview.story}
                </p>

                {/* Specs Pill */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-mono text-stone-600">
                  <div className="bg-stone-50 p-2 rounded-lg border border-stone-100">
                    <span className="text-[10px] text-stone-400 block uppercase">CAD Master Plan</span>
                    <strong className="text-stone-900 truncate block">{cat.masterPlan.totalArea}</strong>
                  </div>
                  <div className="bg-stone-50 p-2 rounded-lg border border-stone-100">
                    <span className="text-[10px] text-stone-400 block uppercase">Roads</span>
                    <strong className="text-stone-900 truncate block">60-Ft / 40-Ft</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
              <Link
                href={`/catalogue/${cat.slug}`}
                target="_blank"
                className="text-stone-500 hover:text-stone-900 flex items-center gap-1 font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#C8A870]" />
                <span>Full Monograph</span>
              </Link>

              <Link
                href={`/admin/catalogues/${cat.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#07140F] hover:bg-[#14382C] text-[#DFBE82] text-xs font-semibold transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Folios</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
