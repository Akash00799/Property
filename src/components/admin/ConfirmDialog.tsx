"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { AlertTriangle, Trash2, X } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm Delete",
  cancelLabel = "Cancel",
  isDestructive = true,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "1rem",
            padding: "1rem",
            border: "1px solid #E7E5E4",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            backgroundColor: "#FFFFFF",
            fontFamily: "var(--font-sans), 'Plus Jakarta Sans', sans-serif",
          },
        },
        backdrop: {
          sx: {
            backgroundColor: "rgba(7, 20, 15, 0.65)",
            backdropFilter: "blur(4px)",
          },
        },
      }}
    >
      <DialogTitle sx={{ p: 1, pb: 2 }}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                isDestructive
                  ? "bg-rose-50 text-rose-600 border border-rose-200"
                  : "bg-amber-50 text-amber-600 border border-amber-200"
              }`}
            >
              {isDestructive ? (
                <Trash2 className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#07140F]">
                {title}
              </h3>
              <p className="text-[11px] text-stone-500 font-mono">
                Admin Confirmation Action
              </p>
            </div>
          </div>
          <IconButton
            onClick={onCancel}
            size="small"
            sx={{ color: "#A8A29E", "&:hover": { color: "#44403C" } }}
          >
            <X className="w-4 h-4" />
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent sx={{ p: 1, py: 1.5 }}>
        <p className="text-xs text-stone-600 leading-relaxed font-light">
          {message}
        </p>
      </DialogContent>

      <DialogActions sx={{ p: 1, pt: 2, borderTop: "1px solid #F5F5F4" }}>
        <button
          onClick={onCancel}
          className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          className={`px-4 py-2 text-xs font-semibold text-white rounded-lg transition-colors shadow-sm cursor-pointer ${
            isDestructive
              ? "bg-rose-600 hover:bg-rose-700"
              : "bg-[#07140F] hover:bg-[#14382C]"
          }`}
        >
          {confirmLabel}
        </button>
      </DialogActions>
    </Dialog>
  );
}
