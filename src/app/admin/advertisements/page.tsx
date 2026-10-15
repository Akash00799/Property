"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Megaphone,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  ExternalLink,
  Eye,
  Clock,
  Sparkles,
  Calendar,
  Layers,
  ArrowRight,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import { PromotionItem, AdPlacement, AdCategory } from "@/data/promotions";
import AdminMuiSelect from "@/components/admin/mui/AdminMuiSelect";
import AdminMuiSwitch from "@/components/admin/mui/AdminMuiSwitch";
import AdminMuiTooltip from "@/components/admin/mui/AdminMuiTooltip";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import AdvertisementLivePreview from "@/components/admin/AdvertisementLivePreview";
import AdminViewModeToggle from "@/components/admin/mui/AdminViewModeToggle";

export default function AdminAdvertisementsPage() {
  const { advertisements, deleteAdvertisement, updateAdvertisement } = useAdminData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlacement, setSelectedPlacement] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [previewAd, setPreviewAd] = useState<PromotionItem | null>(null);
  const [adToDelete, setAdToDelete] = useState<string | null>(null);

  const filteredAds = useMemo(() => {
    return advertisements.filter((ad) => {
      const matchSearch =
        ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ad.locationLabel && ad.locationLabel.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchPlacement =
        selectedPlacement === "all" || ad.placement === selectedPlacement;

      const matchStatus =
        selectedStatus === "all" || ad.status === selectedStatus;

      return matchSearch && matchPlacement && matchStatus;
    });
  }, [advertisements, searchQuery, selectedPlacement, selectedStatus]);

  const handleDeleteConfirm = useCallback(() => {
    if (adToDelete) {
      deleteAdvertisement(adToDelete);
      setAdToDelete(null);
    }
  }, [adToDelete, deleteAdvertisement]);

  const handleToggleStatus = useCallback(
    (id: string, currentStatus: "draft" | "published") => {
      updateAdvertisement(id, {
        status: currentStatus === "published" ? "draft" : "published",
      });
    },
    [updateAdvertisement]
  );

  const placementOptions = useMemo(
    () => [
      { value: "all", label: "All Homepage Placements" },
      { value: "promotional-carousel", label: "Promotional Carousel" },
      { value: "countdown-banner", label: "Countdown Phase Banner" },
      { value: "cinematic-banner", label: "Cinematic Full Banner" },
      { value: "image-spotlight", label: "Image Spotlight" },
      { value: "announcement-ticker", label: "Announcement Bulletin" },
    ],
    []
  );

  const statusOptions = useMemo(
    () => [
      { value: "all", label: `All Statuses (${advertisements.length})` },
      { value: "published", label: "Published (Active)" },
      { value: "draft", label: "Draft (Hidden)" },
    ],
    [advertisements.length]
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-stone-500 text-xs font-mono uppercase tracking-wider">
            <Megaphone className="w-4 h-4 text-[#8F6F3B]" />
            <span>Homepage Campaign Controller</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#07140F] mt-1">
            Featured Advertisements & Placements
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Control all banners, countdown launches, and promotional carousels shown on the public landing page.
          </p>
        </div>

        <Link
          href="/admin/advertisements/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#07140F] text-[#DFBE82] hover:bg-[#14382C] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Ad</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campaign headlines or locations..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#C8A870] text-stone-800 placeholder-stone-400 bg-stone-50/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Placement Filter */}
          <div className="min-w-[210px]">
            <AdminMuiSelect
              value={selectedPlacement}
              onChange={(val) => setSelectedPlacement(val)}
              options={placementOptions}
              size="small"
            />
          </div>

          {/* Status Filter */}
          <div className="min-w-[170px]">
            <AdminMuiSelect
              value={selectedStatus}
              onChange={(val) => setSelectedStatus(val)}
              options={statusOptions}
              size="small"
            />
          </div>

          {/* View Mode Toggle */}
          <AdminViewModeToggle
            mode={viewMode}
            onChange={(m) => setViewMode(m as "grid" | "table")}
            listValue="table"
            gridTooltip="Campaign Cards Grid"
            listTooltip="Structured Table View"
          />
        </div>
      </div>

      {filteredAds.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-3">
          <Megaphone className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-stone-700">No campaigns found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try adjusting your search criteria or create a new promotional banner.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAds.map((ad) => (
            <div
              key={ad.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden">
                  <Image
                    src={ad.coverImage}
                    alt={ad.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-black/60 text-[#DFBE82] backdrop-blur border border-[#C8A870]/30 shadow">
                      #{ad.priority}
                    </span>
                    <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur px-2 py-1 rounded-xl border border-white/10">
                      <AdminMuiSwitch
                        checked={ad.status === "published"}
                        onChange={() => handleToggleStatus(ad.id, ad.status)}
                        size="small"
                      />
                      <StatusBadge status={ad.status} size="sm" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#DFBE82] block mb-1">
                      {ad.placement}
                    </span>
                    <h3 className="font-serif font-bold text-sm text-white line-clamp-1">
                      {ad.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 space-y-2.5">
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {ad.tagline || ad.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                    <span className="text-stone-700 font-medium capitalize bg-stone-100 px-2.5 py-1 rounded border border-stone-200/60">
                      {ad.category.replace(/-/g, " ")}
                    </span>
                    {ad.locationLabel && (
                      <span className="text-stone-400 font-mono text-[11px]">
                        {ad.locationLabel}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => setPreviewAd(ad)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8F6F3B] hover:text-[#07140F] transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Mirror</span>
                </button>

                <div className="flex items-center gap-1">
                  <AdminMuiTooltip title="Edit Campaign">
                    <Link
                      href={`/admin/advertisements/${ad.id}/edit`}
                      className="p-1.5 text-stone-600 hover:text-[#07140F] hover:bg-stone-200/60 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                  </AdminMuiTooltip>
                  <AdminMuiTooltip title="Delete Campaign">
                    <button
                      onClick={() => setAdToDelete(ad.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </AdminMuiTooltip>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-mono text-[10px] uppercase">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Campaign Headline & Cover</th>
                  <th className="py-3.5 px-4 font-semibold">Placement</th>
                  <th className="py-3.5 px-4 font-semibold">Category</th>
                  <th className="py-3.5 px-4 font-semibold">Priority</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredAds.map((ad) => (
                  <tr key={ad.id} className="hover:bg-stone-50/70 transition-colors">
                    {/* Title & Thumbnail */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                          <Image
                            src={ad.coverImage}
                            alt={ad.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="font-serif font-bold text-stone-900 text-sm line-clamp-1">
                            {ad.title}
                          </p>
                          <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                            {ad.tagline || ad.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Placement */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-xs px-2.5 py-1 rounded bg-stone-100 text-stone-700 border border-stone-200">
                        {ad.placement}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="text-stone-700 font-medium capitalize">
                        {ad.category.replace(/-/g, " ")}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="py-3.5 px-4 font-mono">
                      <span className="text-stone-800 font-bold">#{ad.priority}</span>
                    </td>

                    {/* Status with Toggle */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <AdminMuiTooltip title={ad.status === "published" ? "Live on website (click to unpublish)" : "Draft hidden (click to publish)"}>
                          <span>
                            <AdminMuiSwitch
                              checked={ad.status === "published"}
                              onChange={() => handleToggleStatus(ad.id, ad.status)}
                              size="small"
                            />
                          </span>
                        </AdminMuiTooltip>
                        <StatusBadge status={ad.status} size="sm" />
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <AdminMuiTooltip title="Open Live Placement Preview">
                          <button
                            onClick={() => setPreviewAd(ad)}
                            className="p-1.5 text-stone-600 hover:text-[#07140F] hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4 text-[#8F6F3B]" />
                          </button>
                        </AdminMuiTooltip>

                        <AdminMuiTooltip title="Edit Campaign">
                          <Link
                            href={`/admin/advertisements/${ad.id}/edit`}
                            className="p-1.5 text-stone-600 hover:text-[#07140F] hover:bg-stone-100 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                        </AdminMuiTooltip>

                        <AdminMuiTooltip title="Delete Campaign">
                          <button
                            onClick={() => setAdToDelete(ad.id)}
                            className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </AdminMuiTooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Live Preview Modal */}
      {previewAd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#07140F] rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-[#C8A870]/40 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="w-4 h-4 text-[#C8A870]" />
                <h3 className="font-serif text-lg font-bold">
                  Public Homepage Placement Mirror
                </h3>
              </div>
              <button
                onClick={() => setPreviewAd(null)}
                className="text-stone-400 hover:text-white px-3 py-1 rounded-lg bg-white/10 text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>

            <AdvertisementLivePreview ad={previewAd} />

            <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-stone-800">
              <span>Placement: <strong className="text-white font-mono">{previewAd.placement}</strong></span>
              <Link
                href={`/admin/advertisements/${previewAd.id}/edit`}
                className="text-[#C8A870] hover:underline font-semibold"
              >
                Edit this campaign &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={adToDelete !== null}
        title="Delete Advertisement Campaign"
        message="Are you sure you want to remove this promotional campaign? It will be removed from the public homepage placement immediately."
        confirmLabel="Yes, Delete Campaign"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setAdToDelete(null)}
      />
    </div>
  );
}
