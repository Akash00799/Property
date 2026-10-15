"use client";

import React from "react";

interface StatusBadgeProps {
  status: string;
  size?: "sm" | "md";
}

export default function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const norm = status.toLowerCase();

  let styles = "bg-stone-100 text-stone-700 border-stone-200";

  // Project statuses
  if (norm.includes("available") || norm === "published") {
    styles = "bg-emerald-50 text-emerald-800 border-emerald-200/80";
  } else if (norm.includes("fast filling") || norm.includes("scheduled") || norm.includes("contacted")) {
    styles = "bg-amber-50 text-amber-800 border-amber-200/80";
  } else if (norm.includes("sold out") || norm.includes("closed") || norm.includes("expired")) {
    styles = "bg-rose-50 text-rose-800 border-rose-200/80";
  } else if (norm.includes("pre-launch") || norm.includes("draft") || norm.includes("new")) {
    styles = "bg-blue-50 text-blue-800 border-blue-200/80";
  } else if (norm.includes("reserved") || norm.includes("interested")) {
    styles = "bg-purple-50 text-purple-800 border-purple-200/80";
  } else if (norm.includes("converted") || norm.includes("featured")) {
    styles = "bg-[#C8A870]/15 text-[#8F6F3B] border-[#C8A870]/30 font-semibold";
  }

  const sizeClasses =
    size === "sm"
      ? "text-[10px] px-2 py-0.5"
      : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-mono uppercase tracking-wider border font-medium whitespace-nowrap ${sizeClasses} ${styles}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      <span>{status}</span>
    </span>
  );
}
