"use client";

import React from "react";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const LuxuryTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#07140F",
    color: "#FAF8F5",
    boxShadow: "0 10px 20px -5px rgba(0,0,0,0.3)",
    fontSize: "0.75rem",
    borderRadius: "0.5rem",
    padding: "0.35rem 0.65rem",
    border: "1px solid rgba(200, 168, 112, 0.3)",
    fontFamily: "var(--font-sans), 'Plus Jakarta Sans', sans-serif",
    fontWeight: 500,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#07140F",
  },
}));

export default function AdminMuiTooltip({
  title,
  children,
  arrow = true,
  placement = "top",
}: {
  title: React.ReactNode;
  children: React.ReactElement;
  arrow?: boolean;
  placement?: TooltipProps["placement"];
}) {
  return (
    <LuxuryTooltip title={title} arrow={arrow} placement={placement}>
      {children}
    </LuxuryTooltip>
  );
}
