"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  RotateCcw,
  Plus,
  ExternalLink,
  ShieldAlert,
  Search,
  Bell,
  CheckCircle2,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";

interface AdminTopNavProps {
  onOpenMobileSidebar: () => void;
}

export default function AdminTopNav({ onOpenMobileSidebar }: AdminTopNavProps) {
  const pathname = usePathname();
  const { resetToDefaults } = useAdminData();
  const [resetSuccess, setResetSuccess] = useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  // Generate breadcrumbs from pathname
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments.map((seg, i) => {
    const url = "/" + segments.slice(0, i + 1).join("/");
    const label =
      seg === "admin"
        ? "Admin"
        : seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " ");
    return { url, label };
  });

  const handleReset = () => {
    resetToDefaults();
    setConfirmResetOpen(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3000);
  };

  return (
    <>
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            {breadcrumbs.map((b, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={b.url}>
                  {idx > 0 && <span className="text-stone-300">/</span>}
                  {isLast ? (
                    <span className="text-[#07140F] font-bold">{b.label}</span>
                  ) : (
                    <Link
                      href={b.url}
                      className="hover:text-[#8F6F3B] transition-colors"
                    >
                      {b.label}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions, Demo Banner & Quick Creation */}
        <div className="flex items-center gap-3">
          {/* Demo Prototype Notice Badge */}
          <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Prototype Mode (Local State)</span>
          </div>

          {/* Reset Demo State Button */}
          <button
            onClick={() => setConfirmResetOpen(true)}
            className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg text-xs transition-colors"
            title="Reset to Original Demo State"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Quick Create Dropdown / Shortcut */}
          <Link
            href="/admin/projects/new"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#07140F] text-[#DFBE82] hover:bg-[#14382C] text-xs font-semibold tracking-wider uppercase transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </Link>

          {/* Public Preview Button */}
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 hover:border-[#C8A870] bg-white text-stone-700 hover:text-[#07140F] text-xs font-medium transition-all shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#C8A870]" />
            <span className="hidden sm:inline">Live Site</span>
          </Link>
        </div>
      </header>

      {/* Reset Confirmation Modal */}
      {confirmResetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center border border-amber-200">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#07140F]">
                Reset Demo Data?
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              This will restore the original demo sample projects, promotions, catalogues, and enquiries. Any test modifications made in your browser session will be reset to default seeds.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmResetOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors shadow-sm"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification on reset */}
      {resetSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#07140F] text-white px-4 py-3 rounded-xl shadow-2xl border border-[#C8A870]/40 flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Demo state successfully restored to initial defaults!</span>
        </div>
      )}
    </>
  );
}
