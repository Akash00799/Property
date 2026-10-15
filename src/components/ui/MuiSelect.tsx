"use client";

import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { ChevronDown } from "lucide-react";

export interface MuiSelectOption {
  value: string;
  label: string;
  sublabel?: string;
}

interface MuiSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: MuiSelectOption[];
  placeholder?: string;
  themeMode?: "dark" | "light";
  size?: "small" | "medium";
  className?: string;
  id?: string;
  ariaLabel?: string;
  borderless?: boolean;
}

const SelectIcon = React.memo(
  ({
    className,
    isDark,
    borderless,
  }: {
    className?: string;
    isDark?: boolean;
    borderless?: boolean;
  }) => (
    <ChevronDown
      className={`w-4 h-4 pointer-events-none absolute ${
        borderless ? "right-0" : "right-3"
      } transition-transform duration-200 ${
        className?.includes("MuiSelect-iconOpen")
          ? "rotate-180 text-[#C8A870]"
          : isDark
          ? "text-stone-400 group-hover:text-[#C8A870]"
          : "text-stone-500"
      }`}
    />
  )
);
SelectIcon.displayName = "MuiSelectIcon";

function MuiSelectComponent({
  value,
  onChange,
  options,
  placeholder,
  themeMode = "light",
  size = "small",
  className = "",
  id,
  ariaLabel,
  borderless = false,
}: MuiSelectProps) {
  const isDark = themeMode === "dark";

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl
      fullWidth
      size={size}
      className={className}
      sx={{
        "& .MuiOutlinedInput-root": {
          fontFamily: "var(--font-sans), 'Plus Jakarta Sans', sans-serif",
          fontSize: size === "small" ? "0.8125rem" : "0.875rem",
          fontWeight: borderless ? 600 : 500,
          color: isDark ? "#FAF8F5" : "#121815",
          backgroundColor: borderless
            ? "transparent"
            : isDark
            ? "rgba(7, 20, 15, 0.95)"
            : "#FAF8F5",
          borderRadius: "0.5rem",
          transition: "all 0.2s ease-in-out",
          "& fieldset": {
            border: borderless ? "none" : isDark ? "1px solid rgba(200, 168, 112, 0.25)" : "1px solid rgba(200, 168, 112, 0.3)",
          },
          "&:hover fieldset": {
            border: borderless ? "none" : isDark ? "1px solid rgba(200, 168, 112, 0.7)" : "1px solid #C8A870",
          },
          "&.Mui-focused fieldset": {
            border: borderless ? "none" : "1.5px solid #C8A870",
            boxShadow: borderless
              ? "none"
              : isDark
              ? "0 0 0 3px rgba(200, 168, 112, 0.15)"
              : "0 0 0 3px rgba(200, 168, 112, 0.12)",
          },
        },
        "& .MuiSelect-select": {
          paddingTop: borderless ? "2px" : size === "small" ? "9px" : "11px",
          paddingBottom: borderless ? "2px" : size === "small" ? "9px" : "11px",
          paddingLeft: borderless ? "0px" : "12px",
          paddingRight: borderless ? "24px !important" : "36px !important",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
        },
      }}
    >
      <Select
        id={id}
        value={value}
        onChange={handleChange}
        displayEmpty
        aria-label={ariaLabel}
        IconComponent={(props) => (
          <SelectIcon {...props} isDark={isDark} borderless={borderless} />
        )}
        renderValue={(selected) => {
          if (!selected) {
            return (
              <span
                style={{
                  color: isDark ? "rgba(250, 248, 245, 0.75)" : "rgba(18, 24, 21, 0.55)",
                  fontWeight: borderless ? 500 : 400,
                }}
              >
                {placeholder || "Select option"}
              </span>
            );
          }
          const matched = options.find((o) => o.value === selected);
          return (
            <span style={{ color: isDark ? "#FFFFFF" : "#121815", fontWeight: 600 }}>
              {matched ? matched.label : selected}
            </span>
          );
        }}
        MenuProps={{
          slotProps: {
            paper: {
              sx: {
                mt: 1,
                borderRadius: "0.75rem",
                backgroundColor: isDark ? "#0A1D16" : "#FFFFFF",
                color: isDark ? "#FAF8F5" : "#121815",
                border: isDark ? "1px solid rgba(200, 168, 112, 0.3)" : "1px solid rgba(200, 168, 112, 0.25)",
                boxShadow: isDark
                  ? "0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 2px 1px rgba(200, 168, 112, 0.2)"
                  : "0 20px 40px -10px rgba(10, 29, 22, 0.15), 0 0 2px 1px rgba(200, 168, 112, 0.15)",
                maxHeight: 320,
                "& .MuiList-root": {
                  padding: "6px",
                },
              },
            },
          },
        }}
      >
        {placeholder && (
          <MenuItem
            value=""
            sx={{
              fontFamily: "var(--font-sans), 'Plus Jakarta Sans', sans-serif",
              fontSize: "0.8125rem",
              borderRadius: "0.375rem",
              py: 1,
              px: 1.5,
              color: isDark ? "rgba(250, 248, 245, 0.5)" : "rgba(18, 24, 21, 0.5)",
              "&:hover": {
                backgroundColor: isDark ? "rgba(200, 168, 112, 0.1)" : "rgba(200, 168, 112, 0.08)",
              },
            }}
          >
            {placeholder}
          </MenuItem>
        )}
        {options.map((opt) => (
          <MenuItem
            key={opt.value}
            value={opt.value}
            sx={{
              fontFamily: "var(--font-sans), 'Plus Jakarta Sans', sans-serif",
              fontSize: "0.8125rem",
              fontWeight: 500,
              borderRadius: "0.375rem",
              py: 1,
              px: 1.5,
              my: 0.25,
              color: isDark ? "#FAF8F5" : "#121815",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              "&.Mui-selected": {
                backgroundColor: isDark ? "rgba(200, 168, 112, 0.2)" : "rgba(200, 168, 112, 0.15)",
                color: isDark ? "#DFBE82" : "#8F6F3B",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: isDark ? "rgba(200, 168, 112, 0.28)" : "rgba(200, 168, 112, 0.22)",
                },
              },
              "&:hover": {
                backgroundColor: isDark ? "rgba(200, 168, 112, 0.1)" : "rgba(200, 168, 112, 0.08)",
              },
            }}
          >
            <span>{opt.label}</span>
            {opt.sublabel && (
              <span
                style={{
                  fontSize: "0.6875rem",
                  color: isDark ? "rgba(250, 248, 245, 0.45)" : "rgba(18, 24, 21, 0.45)",
                  marginLeft: "8px",
                }}
              >
                {opt.sublabel}
              </span>
            )}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default React.memo(MuiSelectComponent);
