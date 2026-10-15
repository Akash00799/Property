"use client";

import React from "react";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

const StyledSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(() => ({
  width: 44,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#FFFFFF",
      "& + .MuiSwitch-track": {
        backgroundColor: "#07140F",
        opacity: 1,
        border: "1px solid #C8A870",
      },
      "& .MuiSwitch-thumb": {
        backgroundColor: "#DFBE82",
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#07140F",
      border: "6px solid #FFFFFF",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: "#E7E5E4",
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 20,
    height: 20,
    backgroundColor: "#A8A29E",
    boxShadow: "0 2px 4px 0 rgba(0, 35, 11, 0.2)",
    transition: "all 0.2s ease",
  },
  "& .MuiSwitch-track": {
    borderRadius: 24 / 2,
    backgroundColor: "#E7E5E4",
    opacity: 1,
    transition: "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
}));

interface AdminMuiSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  size?: "small" | "medium";
}

export default function AdminMuiSwitch({
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
  size = "medium",
}: AdminMuiSwitchProps) {
  const switchElement = (
    <StyledSwitch
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      disabled={disabled}
    />
  );

  if (!label) return switchElement;

  return (
    <FormControlLabel
      control={switchElement}
      label={
        <span className="text-xs font-medium text-stone-700 ml-1 select-none">
          {label}
        </span>
      }
      className={className}
      sx={{ m: 0 }}
    />
  );
}
