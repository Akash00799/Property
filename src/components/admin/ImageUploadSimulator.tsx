"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Upload, Image as ImageIcon, Link as LinkIcon, Check, X, Sparkles } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";

interface ImageUploadSimulatorProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
}

export default function ImageUploadSimulator({
  label,
  value,
  onChange,
  helperText,
}: ImageUploadSimulatorProps) {
  const { mediaAssets } = useAdminData();
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [urlInput, setUrlInput] = useState(value);
  const [uploadNotice, setUploadNotice] = useState(false);

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a frontend prototype, use object URL or local fallback and notify clearly
      const objectUrl = URL.createObjectURL(file);
      onChange(objectUrl);
      setUrlInput(objectUrl);
      setUploadNotice(true);
      setTimeout(() => setUploadNotice(false), 4500);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowMediaPicker(!showMediaPicker)}
          className="text-[11px] text-[#8F6F3B] hover:text-[#07140F] font-medium flex items-center gap-1 transition-colors"
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>{showMediaPicker ? "Hide Media Library" : "Choose from Media Library"}</span>
        </button>
      </div>

      {/* Main Preview Box & Input */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Preview Thumbnail */}
        <div className="sm:col-span-4 relative aspect-[16/10] bg-stone-100 rounded-xl overflow-hidden border border-stone-200 flex items-center justify-center group">
          {value ? (
            <>
              <Image
                src={value}
                alt="Image Preview"
                fill
                className="object-cover"
                unoptimized
              />
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setUrlInput("");
                }}
                className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-rose-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="text-center p-3 text-stone-400">
              <ImageIcon className="w-6 h-6 mx-auto mb-1 text-stone-300" />
              <span className="text-[10px] block font-mono">No Image Selected</span>
            </div>
          )}
        </div>

        {/* Input Controls */}
        <div className="sm:col-span-8 space-y-2">
          {/* Direct URL input */}
          <div className="relative">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                onChange(e.target.value);
              }}
              placeholder="Paste image URL (https://... or /images/...)"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#C8A870] text-stone-800 font-mono"
            />
          </div>

          {/* Upload Button Simulator */}
          <div className="flex items-center gap-2">
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition-colors border border-stone-200">
              <Upload className="w-3.5 h-3.5 text-stone-500" />
              <span>Simulate File Upload</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleSimulatedFileUpload}
                className="hidden"
              />
            </label>
            <span className="text-[11px] text-stone-400 font-light">
              JPG, PNG, WebP up to 10MB
            </span>
          </div>

          {uploadNotice && (
            <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
              * Frontend Prototype Note: File loaded via temporary browser blob URL. Persistent uploads will connect to your storage bucket in Phase 2.
            </p>
          )}

          {helperText && (
            <p className="text-[11px] text-stone-500">{helperText}</p>
          )}
        </div>
      </div>

      {/* Media Picker Drawer */}
      {showMediaPicker && (
        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 mt-2 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-stone-700">Select Existing Asset:</span>
            <span className="text-[10px] text-stone-400 font-mono">
              {mediaAssets.length} assets available
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
            {mediaAssets.map((asset) => (
              <button
                type="button"
                key={asset.id}
                onClick={() => {
                  onChange(asset.url);
                  setUrlInput(asset.url);
                  setShowMediaPicker(false);
                }}
                className={`relative aspect-[16/10] rounded-lg overflow-hidden border text-left transition-all group ${
                  value === asset.url
                    ? "ring-2 ring-[#C8A870] border-transparent"
                    : "border-stone-200 hover:border-stone-400"
                }`}
              >
                <Image
                  src={asset.url}
                  alt={asset.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-1 flex items-end">
                  <span className="text-[9px] text-white truncate block">
                    {asset.title}
                  </span>
                </div>
                {value === asset.url && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C8A870] text-[#07140F] flex items-center justify-center">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
