"use client";

import React from "react";
import { Grid3X3, List } from "lucide-react";
import AdminMuiTooltip from "./AdminMuiTooltip";

interface AdminViewModeToggleProps<T extends string = "grid" | "list"> {
  mode: T;
  onChange: (newMode: T) => void;
  gridTooltip?: string;
  listTooltip?: string;
  className?: string;
  listValue?: T;
}

export default function AdminViewModeToggle<T extends string = "grid" | "list">({
  mode,
  onChange,
  gridTooltip = "Card Grid View",
  listTooltip = "Compact Table / List View",
  className = "",
  listValue,
}: AdminViewModeToggleProps<T>) {
  const isGrid = mode === "grid";
  const actualListValue = listValue || ("list" as T);

  return (
    <div
      role="group"
      aria-label="View mode toggle"
      className={`inline-flex items-center p-1 bg-stone-100 rounded-2xl border border-stone-200 shadow-inner select-none ${className}`}
    >
      <AdminMuiTooltip title={gridTooltip}>
        <button
          type="button"
          onClick={() => onChange("grid" as T)}
          className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer ${
            isGrid
              ? "bg-white text-[#07140F] shadow-[0_2px_8px_rgba(7,20,15,0.08)]"
              : "text-stone-400 hover:text-stone-700 hover:bg-stone-200/50"
          }`}
          aria-pressed={isGrid}
          aria-label={gridTooltip}
        >
          <Grid3X3 className="w-4 h-4" />
        </button>
      </AdminMuiTooltip>

      <AdminMuiTooltip title={listTooltip}>
        <button
          type="button"
          onClick={() => onChange(actualListValue)}
          className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer ${
            !isGrid
              ? "bg-white text-[#07140F] shadow-[0_2px_8px_rgba(7,20,15,0.08)]"
              : "text-stone-400 hover:text-stone-700 hover:bg-stone-200/50"
          }`}
          aria-pressed={!isGrid}
          aria-label={listTooltip}
        >
          <List className="w-4 h-4" />
        </button>
      </AdminMuiTooltip>
    </div>
  );
}
