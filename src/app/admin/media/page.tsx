"use client";

import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Search,
  Upload,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Grid3X3,
  List,
  Filter,
  Layers,
  Sparkles,
  Info,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import { MediaAssetItem, MediaCategory } from "@/types/admin";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import AdminMuiSelect from "@/components/admin/mui/AdminMuiSelect";
import AdminMuiTooltip from "@/components/admin/mui/AdminMuiTooltip";
import AdminViewModeToggle from "@/components/admin/mui/AdminViewModeToggle";

export default function AdminMediaPage() {
  const { mediaAssets, addMediaAsset, deleteMediaAsset } = useAdminData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Upload modal state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<MediaCategory>("gallery");
  const [newUrl, setNewUrl] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Selected asset detail modal
  const [detailAsset, setDetailAsset] = useState<MediaAssetItem | null>(null);
  const [assetToDelete, setAssetToDelete] = useState<string | null>(null);

  const filteredAssets = useMemo(() => {
    return mediaAssets.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.filename.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCat =
        selectedCategory === "all" || item.category === selectedCategory;

      return matchSearch && matchCat;
    });
  }, [mediaAssets, searchQuery, selectedCategory]);

  const handleCopyUrl = useCallback((url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  }, []);

  const handleSimulatedUpload = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!newUrl.trim() || !newTitle.trim()) return;

      const newAsset: MediaAssetItem = {
        id: `med-${Date.now()}`,
        title: newTitle.trim(),
        filename: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".jpg",
        url: newUrl.trim(),
        category: newCategory,
        fileSizeFormatted: "850 KB",
        dimensions: "1920 × 1080 px",
        uploadedAt: new Date().toISOString().slice(0, 10),
        associatedProjects: ["Newly Added"],
      };

      addMediaAsset(newAsset);
      setUploadModalOpen(false);
      setNewTitle("");
      setNewUrl("");
    },
    [newUrl, newTitle, newCategory, addMediaAsset]
  );

  const handleDeleteConfirm = useCallback(() => {
    if (assetToDelete) {
      deleteMediaAsset(assetToDelete);
      if (detailAsset?.id === assetToDelete) setDetailAsset(null);
      setAssetToDelete(null);
    }
  }, [assetToDelete, detailAsset, deleteMediaAsset]);

  const categoryOptions = useMemo(
    () => [
      { value: "all", label: `All Asset Categories (${mediaAssets.length})` },
      { value: "blueprint", label: "CAD Blueprints & Masterplans" },
      { value: "aerial", label: "Drone & Aerial Photography" },
      { value: "banner", label: "Cinematic Banners" },
      { value: "gallery", label: "On-Site Gallery" },
      { value: "map", label: "Transit & Location Maps" },
    ],
    [mediaAssets.length]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-stone-500 text-xs font-mono uppercase tracking-wider">
            <ImageIcon className="w-4 h-4 text-[#8F6F3B]" />
            <span>Digital Asset Management</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#07140F] mt-1">
            Media Library & CAD Blueprints
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Central repository of cadastral maps, CAD master drawings, drone photography, and banner assets.
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#07140F] text-[#DFBE82] hover:bg-[#14382C] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex-shrink-0 cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Asset</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or filename..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#C8A870] text-stone-800 placeholder-stone-400 bg-stone-50/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Category Filter */}
          <div className="min-w-[230px]">
            <AdminMuiSelect
              value={selectedCategory}
              onChange={(val) => setSelectedCategory(val)}
              options={categoryOptions}
              size="small"
            />
          </div>

          {/* View Mode Toggle */}
          <AdminViewModeToggle
            mode={viewMode}
            onChange={(m) => setViewMode(m as "grid" | "list")}
            gridTooltip="Visual Grid Gallery"
            listTooltip="Compact Table Directory"
          />
        </div>
      </div>

      {/* Grid or List of Media Assets */}
      {filteredAssets.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-3">
          <ImageIcon className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-stone-700">No media assets found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try adjusting your search criteria or add new media items.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div
                onClick={() => setDetailAsset(asset)}
                className="relative aspect-[16/10] bg-stone-100 cursor-pointer overflow-hidden"
              >
                <Image
                  src={asset.url}
                  alt={asset.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  unoptimized
                />
                <span className="absolute top-2 left-2 text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-black/70 text-white backdrop-blur-sm">
                  {asset.category}
                </span>
              </div>

              <div className="p-3.5 space-y-2">
                <h4
                  onClick={() => setDetailAsset(asset)}
                  className="font-semibold text-xs text-stone-900 truncate hover:text-[#8F6F3B] cursor-pointer"
                  title={asset.title}
                >
                  {asset.title}
                </h4>
                <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono">
                  <span>{asset.dimensions}</span>
                  <span>{asset.fileSizeFormatted}</span>
                </div>
              </div>

              <div className="p-2.5 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
                <AdminMuiTooltip title="Copy direct image URL to clipboard">
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(asset.url, asset.id)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-700 hover:text-[#07140F] transition-colors"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-500" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </AdminMuiTooltip>

                <AdminMuiTooltip title="Delete asset from library">
                  <button
                    type="button"
                    onClick={() => setAssetToDelete(asset.id)}
                    className="p-1 text-stone-400 hover:text-rose-600 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </AdminMuiTooltip>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-mono text-[10px] uppercase">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Thumbnail & Title</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Dimensions</th>
                <th className="py-3.5 px-4 font-semibold">File Size</th>
                <th className="py-3.5 px-4 font-semibold">Associated Projects</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                        <Image
                          src={asset.url}
                          alt={asset.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900">{asset.title}</p>
                        <p className="text-[11px] text-stone-400 font-mono">{asset.filename}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                      {asset.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-stone-500">{asset.dimensions}</td>
                  <td className="py-3 px-4 font-mono text-stone-500">{asset.fileSizeFormatted}</td>
                  <td className="py-3 px-4 text-stone-600">{asset.associatedProjects.join(", ")}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <AdminMuiTooltip title="Copy image link">
                        <button
                          onClick={() => handleCopyUrl(asset.url, asset.id)}
                          className="px-2.5 py-1 text-xs font-semibold text-stone-700 hover:text-[#07140F] bg-stone-100 hover:bg-stone-200 rounded flex items-center gap-1 transition-colors"
                        >
                          {copiedId === asset.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === asset.id ? "Copied" : "Copy URL"}</span>
                        </button>
                      </AdminMuiTooltip>

                      <AdminMuiTooltip title="Delete asset">
                        <button
                          onClick={() => setAssetToDelete(asset.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </AdminMuiTooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Upload Asset Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <form
            onSubmit={handleSimulatedUpload}
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#8F6F3B]" />
                <h3 className="font-serif text-lg font-bold text-[#07140F]">
                  Add Media Asset to Library
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setUploadModalOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[11px]">
                <Info className="w-3.5 h-3.5" />
                <span>Prototype Storage Simulation</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed font-light">
                In Phase 1, you can register any image URL or local asset. Secure S3/Cloudinary object storage bucket pipelines connect in Phase 2.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Asset Title *
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Master Layout Scheme Sector 4"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Asset Category
              </label>
              <AdminMuiSelect
                value={newCategory}
                onChange={(val) => setNewCategory(val as MediaCategory)}
                options={[
                  { value: "blueprint", label: "CAD Blueprint / Masterplan" },
                  { value: "aerial", label: "Drone Aerial Photography" },
                  { value: "banner", label: "Promotional Banner Asset" },
                  { value: "gallery", label: "On-Site Project Gallery" },
                  { value: "map", label: "Transit / Location Map" },
                ]}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Image Source URL *
              </label>
              <input
                type="text"
                required
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://images.unsplash.com/... or /images/..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 font-mono"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setUploadModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-[#07140F] hover:bg-[#14382C] rounded-lg shadow-sm"
              >
                Register Asset
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Asset Detail Drawer */}
      {detailAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#07140F]">
                Asset Metadata: {detailAsset.title}
              </h3>
              <button
                onClick={() => setDetailAsset(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-[16/10] bg-stone-900 rounded-xl overflow-hidden border border-stone-200">
              <Image
                src={detailAsset.url}
                alt={detailAsset.title}
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-400 uppercase font-mono block">Category</span>
                <strong className="capitalize">{detailAsset.category}</strong>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-400 uppercase font-mono block">Resolution</span>
                <strong className="font-mono">{detailAsset.dimensions}</strong>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-400 uppercase font-mono block">File Size</span>
                <strong className="font-mono">{detailAsset.fileSizeFormatted}</strong>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-400 uppercase font-mono block">Uploaded Date</span>
                <strong className="font-mono">{detailAsset.uploadedAt}</strong>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-mono block">Direct Image URL</span>
              <p className="font-mono text-stone-700 break-all text-[11px] select-all bg-white p-2 rounded border border-stone-200">
                {detailAsset.url}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => handleCopyUrl(detailAsset.url, detailAsset.id)}
                className="px-4 py-2 rounded-xl bg-[#07140F] text-[#DFBE82] text-xs font-semibold flex items-center gap-1.5"
              >
                {copiedId === detailAsset.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === detailAsset.id ? "URL Copied to Clipboard" : "Copy Asset URL"}</span>
              </button>

              <button
                type="button"
                onClick={() => setDetailAsset(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={assetToDelete !== null}
        title="Delete Media Asset"
        message="Are you sure you want to delete this media asset? Projects or advertisements referencing this URL may display broken image links."
        confirmLabel="Yes, Delete Asset"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setAssetToDelete(null)}
      />
    </div>
  );
}
