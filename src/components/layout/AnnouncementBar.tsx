"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, X, PhoneCall, ShieldCheck } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";

export default function AnnouncementBar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const { settings } = useAdminData();

  if (!isVisible) return null;
  if (!settings.announcementBarEnabled) return null;
  if (pathname?.startsWith("/admin") || (pathname?.startsWith("/catalogue/") && pathname !== "/catalogue")) return null;

  return (
    <aside aria-label="Announcement" className="relative z-30 bg-[#07140F] text-[#FAF8F5] border-b border-[#C8A870]/20 text-xs py-2 px-4 -mb-[1px]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="inline-flex items-center gap-1 bg-[#C8A870]/15 text-[#C8A870] font-semibold text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border border-[#C8A870]/30">
            <Sparkles className="w-3 h-3" />
            JDA Approved
          </span>
          <p className="text-stone-300 text-xs truncate">
            {settings.announcementBarText || "New Phase at Royal Palm Enclave (Jagatpura, Jaipur) — 100 to 250 Gaj JDA Patta plots now open."}
          </p>
          {settings.announcementBarLink && (
            <Link
              href={settings.announcementBarLink}
              className="text-[#C8A870] hover:underline font-semibold text-xs whitespace-nowrap ml-1"
            >
              Explore &rarr;
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4 text-[11px] text-stone-400">
          <span className="hidden md:inline-flex items-center gap-1.5 text-stone-300">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C8A870]" />
            100% Verified Titles & Approvals [Demo]
          </span>
          <span className="hidden sm:inline-block w-px h-3 bg-stone-700" />
          <a
            href={`tel:${(settings.contactPhone || "+918001234567").replace(/[^0-9+]/g, "")}`}
            className="inline-flex items-center gap-1 hover:text-[#C8A870] transition-colors"
          >
            <PhoneCall className="w-3 h-3 text-[#C8A870]" />
            <span>{settings.contactPhone || "+91 (800) 123-4567"}</span>
          </a>
          <button
            onClick={() => setIsVisible(false)}
            className="text-stone-500 hover:text-stone-300 p-0.5"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
