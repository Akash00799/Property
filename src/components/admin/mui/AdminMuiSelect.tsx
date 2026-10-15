"use client";

import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";
import { ChevronDown } from "lucide-react";

export interface AdminMuiSelectOption {
  value: string;
  label: string;
  sublabel?: string;
  badge?: string;
}

interface AdminMuiSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: AdminMuiSelectOption[];
  label?: string;
  placeholder?: string;
  size?: "small" | "medium";
  className?: string;
  fullWidth?: boolean;
}

const DropdownIcon = React.memo(() => (
  <ChevronDown className="w-4 h-4 text-stone-400 mr-2.5 pointer-events-none" />
));
DropdownIcon.displayName = "AdminDropdownIcon";

const STATIC_MENU_PROPS = {
  slotProps: {
    paper: {
      sx: {
        mt: 1,
        borderRadius: "0.75rem",
        boxShadow:
          "0 10px 25px -5px rgba(7, 20, 15, 0.12), 0 8px 10px -6px rgba(7, 20, 15, 0.08)",
        border: "1px solid rgba(200, 168, 112, 0.25)",
        backgroundColor: "#FFFFFF",
        "& .MuiMenuItem-root": {
          fontFamily: "var(--font-sans), 'Plus Jakarta Sans', sans-serif",
          fontSize: "0.8125rem",
          padding: "0.55rem 0.85rem",
          borderRadius: "0.5rem",
          margin: "0.15rem 0.35rem",
          transition: "all 0.15s ease",
          "&:hover": {
            backgroundColor: "#FAF8F5",
            color: "#8F6F3B",
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(200, 168, 112, 0.15)",
            color: "#07140F",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "rgba(200, 168, 112, 0.25)",
            },
          },
        },
      },
    },
  },
};

function AdminMuiSelectComponent({
  value,
  onChange,
  options,
  label,
  placeholder,
  size = "small",
  className = "",
  fullWidth = true,
}: AdminMuiSelectProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl
      fullWidth={fullWidth}
      size={size}
      className={className}
      sx={{
        "& .MuiOutlinedInput-root": {
          fontFamily: "var(--font-sans), 'Plus Jakarta Sans', sans-serif",
          fontSize: "0.8125rem",
          fontWeight: 500,
          color: "#07140F",
          backgroundColor: "#FFFFFF",
          borderRadius: "0.75rem",
          transition: "all 0.2s ease",
          "& fieldset": {
            borderColor: "#E7E5E4",
            borderWidth: "1px",
          },
          "&:hover fieldset": {
            borderColor: "#C8A870",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#8F6F3B",
            borderWidth: "1.5px",
          },
        },
        "& .MuiSelect-select": {
          paddingTop: size === "small" ? "0.55rem" : "0.75rem",
          paddingBottom: size === "small" ? "0.55rem" : "0.75rem",
          display: "flex",
          alignItems: "center",
        },
        "& .MuiInputLabel-root": {
          fontFamily: "var(--font-sans), 'Plus Jakarta Sans', sans-serif",
          fontSize: "0.8125rem",
          color: "#78716C",
          "&.Mui-focused": {
            color: "#8F6F3B",
          },
        },
      }}
    >
      {label && <InputLabel id={`admin-select-label-${label}`}>{label}</InputLabel>}
      <Select
        labelId={label ? `admin-select-label-${label}` : undefined}
        value={value}
        label={label}
        onChange={handleChange}
        displayEmpty
        IconComponent={DropdownIcon}
        MenuProps={STATIC_MENU_PROPS}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            <span className="text-stone-400">{placeholder}</span>
          </MenuItem>
        )}
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            <div className="flex items-center justify-between w-full gap-2">
              <span className="truncate">{opt.label}</span>
              {opt.sublabel && (
                <span className="text-[10px] text-stone-400 font-mono ml-auto">
                  {opt.sublabel}
                </span>
              )}
            </div>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default React.memo(AdminMuiSelectComponent);
