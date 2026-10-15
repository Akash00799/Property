"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ArrowRight, Bookmark } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistDrawer() {
  const { isWishlistOpen, setIsWishlistOpen, wishlistPlots, toggleWishlist, clearWishlist } =
    useWishlist();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0A1D16]/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#FAF8F5] border-l border-[#C8A870]/30 shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-[#C8A870]/20 flex items-center justify-between bg-[#0A1D16] text-[#FAF8F5]">
          <div className="flex items-center space-x-3">
            <Bookmark className="w-5 h-5 text-[#C8A870]" />
            <h2 className="font-serif text-xl tracking-wide font-medium text-white">Saved Plots</h2>
            <span className="text-xs bg-[#C8A870]/25 text-[#DFBE82] border border-[#C8A870]/40 px-2.5 py-0.5 rounded-full font-mono font-bold">
              {wishlistPlots.length}
            </span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close saved plots drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistPlots.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#0A1D16]/5 flex items-center justify-center text-stone-400">
                <Bookmark className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg text-[#0A1D16]">No Saved Parcels Yet</h3>
              <p className="text-sm text-stone-600 max-w-xs mx-auto">
                Explore our curated residential plots and click the bookmark icon on any plot to compare and review here.
              </p>
              <Link
                href="/plots"
                onClick={() => setIsWishlistOpen(false)}
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-[#0A1D16] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#14382C] transition-all"
              >
                Browse Available Plots
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            wishlistPlots.map((plot) => (
              <div
                key={plot.id}
                className="group relative bg-white border border-[#C8A870]/20 rounded-lg p-3.5 flex gap-4 hover:border-[#C8A870]/50 transition-all shadow-sm"
              >
                <div className="relative w-24 h-24 rounded overflow-hidden flex-shrink-0 bg-stone-100">
                  <Image
                    src={plot.heroImage}
                    alt={plot.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#C8A870] tracking-wider">
                      {plot.category}
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-[#0A1D16] truncate">
                      {plot.title}
                    </h4>
                    <p className="text-xs text-stone-500 truncate">{plot.location.locality}</p>
                    <p className="text-xs font-semibold text-[#14382C] mt-1">{plot.price.formatted}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                    <Link
                      href={`/plots/${plot.id}`}
                      onClick={() => setIsWishlistOpen(false)}
                      className="text-xs font-medium text-[#C8A870] hover:text-[#0A1D16] flex items-center gap-1 transition-colors"
                    >
                      View Details
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <button
                      onClick={() => toggleWishlist(plot.id)}
                      className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {wishlistPlots.length > 0 && (
          <div className="p-6 border-t border-[#C8A870]/20 bg-white space-y-3">
            <Link
              href="/schedule-visit"
              onClick={() => setIsWishlistOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#0A1D16] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#14382C] transition-all shadow-md"
            >
              Schedule Site Visit For Selected
              <ArrowRight className="w-4 h-4 text-[#C8A870]" />
            </Link>
            <button
              onClick={clearWishlist}
              className="w-full text-center text-xs text-stone-500 hover:text-red-700 py-1 transition-colors"
            >
              Clear All Saved Parcels
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
