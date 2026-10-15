"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save,
  ArrowLeft,
  Megaphone,
  Sparkles,
  Eye,
  CheckCircle2,
  Calendar,
  Layers,
  Link as LinkIcon,
} from "lucide-react";
import { PromotionItem, AdCategory, AdPlacement } from "@/data/promotions";
import { useAdminData } from "@/context/AdminDataContext";
import ImageUploadSimulator from "@/components/admin/ImageUploadSimulator";
import AdvertisementLivePreview from "@/components/admin/AdvertisementLivePreview";
import AdminMuiSelect from "@/components/admin/mui/AdminMuiSelect";

interface AdvertisementFormProps {
  initialData?: PromotionItem;
  onSubmit: (data: PromotionItem) => void;
  isEditing?: boolean;
}

export default function AdvertisementForm({
  initialData,
  onSubmit,
  isEditing = false,
}: AdvertisementFormProps) {
  const router = useRouter();
  const { projects } = useAdminData();

  const [title, setTitle] = useState(initialData?.title || "");
  const [tagline, setTagline] = useState(initialData?.tagline || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [badgeText, setBadgeText] = useState(initialData?.badge.text || "Special Offer");
  const [badgeVariant, setBadgeVariant] = useState<PromotionItem["badge"]["variant"]>(
    initialData?.badge.variant || "gold"
  );
  const [category, setCategory] = useState<AdCategory>(
    initialData?.category || "special-offer"
  );
  const [placement, setPlacement] = useState<AdPlacement>(
    initialData?.placement || "promotional-carousel"
  );
  const [coverImage, setCoverImage] = useState(
    initialData?.coverImage || "/images/catalogue/entrance-archway.jpg"
  );
  const [associatedProjectSlug, setAssociatedProjectSlug] = useState(
    initialData?.associatedProjectSlug || ""
  );
  const [ctaText, setCtaText] = useState(initialData?.ctaText || "Explore Details");
  const [ctaLink, setCtaLink] = useState(initialData?.ctaLink || "/plots");
  const [priceDetails, setPriceDetails] = useState(initialData?.priceDetails || "₹36,000 / Gaj");
  const [offerDetails, setOfferDetails] = useState(initialData?.offerDetails || "Pre-Launch Allotment Booking");
  const [locationLabel, setLocationLabel] = useState(initialData?.locationLabel || "Jaipur Corridor");
  const [launchDate, setLaunchDate] = useState(initialData?.launchDate || "2026-11-15T10:00:00Z");
  const [startDate, setStartDate] = useState(initialData?.startDate || "2026-10-01");
  const [endDate, setEndDate] = useState(initialData?.endDate || "2026-12-31");
  const [status, setStatus] = useState<PromotionItem["status"]>(
    initialData?.status || "published"
  );
  const [priority, setPriority] = useState(initialData?.priority || 1);
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured ?? true);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAd: PromotionItem = {
      id: initialData?.id || `promo-${Date.now()}`,
      title,
      tagline,
      description,
      badge: {
        text: badgeText,
        variant: badgeVariant,
      },
      category,
      placement,
      coverImage,
      associatedProjectSlug: associatedProjectSlug || undefined,
      ctaText,
      ctaLink,
      priceDetails,
      offerDetails,
      locationLabel,
      launchDate: placement === "countdown-banner" ? launchDate : undefined,
      startDate,
      endDate,
      status,
      priority: Number(priority),
      isFeatured,
      highlights: [
        "100% Verified JDA Patta Allocation",
        "Direct Arterial Road Frontage",
        "Registry Ready Cadastral Plot",
      ],
      disclaimer: "[Demo Promotional Showcase for Jaipur Land Investors]",
    };

    onSubmit(newAd);
    setSavedSuccess(true);
    setTimeout(() => {
      router.push("/admin/advertisements");
    }, 1000);
  };

  // Preview object for live mirror
  const previewData: Partial<PromotionItem> = {
    title,
    tagline,
    description,
    badge: { text: badgeText, variant: badgeVariant },
    category,
    placement,
    coverImage,
    ctaText,
    priceDetails,
    locationLabel,
    status,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/advertisements"
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#07140F]">
              {isEditing ? `Edit Ad: ${initialData?.title}` : "Create Homepage Advertisement"}
            </h1>
            <p className="text-xs text-stone-500">
              Target specific sections of the public homepage with verified land opportunities.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Preview / Form switch */}
          <div className="flex lg:hidden items-center p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("form")}
              className={`px-3 py-1.5 rounded-lg ${activeTab === "form" ? "bg-white shadow font-semibold" : "text-stone-500"}`}
            >
              Form
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1.5 rounded-lg ${activeTab === "preview" ? "bg-white shadow font-semibold" : "text-stone-500"}`}
            >
              Live Preview
            </button>
          </div>

          <Link
            href="/admin/advertisements"
            className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#07140F] hover:bg-[#14382C] text-[#DFBE82] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? "Save Campaign" : "Publish Ad"}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Advertisement campaign saved! Redirecting to list...</span>
        </div>
      )}

      {/* Main Grid: Form Left, Live Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Controls Column (7 Cols on desktop) */}
        <div className={`space-y-6 ${activeTab === "preview" ? "hidden lg:block lg:col-span-7" : "lg:col-span-7"}`}>
          {/* Section 1: Placement & Category */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-[#07140F] flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-[#8F6F3B]" />
              <span>Placement & Promotional Category</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Homepage Placement *
                </label>
                <AdminMuiSelect
                  value={placement}
                  onChange={(val) => setPlacement(val as AdPlacement)}
                  options={[
                    { value: "promotional-carousel", label: "Promotional Carousel (Middle Section)" },
                    { value: "countdown-banner", label: "Upcoming Launch Countdown Banner" },
                    { value: "cinematic-banner", label: "Cinematic Full-Width Promo Banner" },
                    { value: "image-spotlight", label: "Architectural Image Spotlight" },
                    { value: "announcement-ticker", label: "Announcement Top Bulletin" },
                  ]}
                />
                <p className="text-[11px] text-stone-400 mt-1">
                  Controls which visual template renders this campaign.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Category *
                </label>
                <AdminMuiSelect
                  value={category}
                  onChange={(val) => setCategory(val as AdCategory)}
                  options={[
                    { value: "special-offer", label: "Special Offer" },
                    { value: "new-launch", label: "New Project Launch" },
                    { value: "upcoming", label: "Upcoming Phase" },
                    { value: "available-plots", label: "Plots for Sale" },
                    { value: "featured", label: "Featured Project" },
                    { value: "investment", label: "Investment Opportunity" },
                    { value: "sold-out", label: "Recently Sold Out / Archive" },
                    { value: "announcement", label: "Custom Announcement" },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Copy & Headline */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-[#07140F]">
              Promotional Headline & Copywriting
            </h2>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Campaign Headline *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Phase III Master Launch — The Royal Enclave"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#C8A870] font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Tagline / Subheading
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. 120 Demarcated JDA Patta Plots along 60-Ft Mahal Road Arterial"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Supporting Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#C8A870]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Badge Label
                </label>
                <input
                  type="text"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  placeholder="e.g. Special Corner Allotment"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Badge Color
                </label>
                <AdminMuiSelect
                  value={badgeVariant}
                  onChange={(val) => setBadgeVariant(val as PromotionItem["badge"]["variant"])}
                  options={[
                    { value: "gold", label: "Gold (Luxury)" },
                    { value: "emerald", label: "Emerald (Verified / Special)" },
                    { value: "amber", label: "Amber (Urgent / Upcoming)" },
                    { value: "rose", label: "Rose (Sold Out / Limited)" },
                    { value: "blue", label: "Blue (Corporate)" },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Commercial & Call to Action */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-[#07140F]">
              Call to Action & Project Linkage
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  placeholder="e.g. View Corner Plots Catalogue"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  CTA Destination URL
                </label>
                <input
                  type="text"
                  value={ctaLink}
                  onChange={(e) => setCtaLink(e.target.value)}
                  placeholder="e.g. /catalogue/aravalli-greens-ajmer-road or /plots"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Price Highlight (Optional)
                </label>
                <input
                  type="text"
                  value={priceDetails}
                  onChange={(e) => setPriceDetails(e.target.value)}
                  placeholder="e.g. ₹38,000 / Gaj"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-mono font-bold text-[#8F6F3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Location Corridor Label
                </label>
                <input
                  type="text"
                  value={locationLabel}
                  onChange={(e) => setLocationLabel(e.target.value)}
                  placeholder="e.g. Ajmer Road Expressway, Jaipur"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Link with Existing Project (Optional)
                </label>
                <AdminMuiSelect
                  value={associatedProjectSlug}
                  onChange={(val) => setAssociatedProjectSlug(val)}
                  options={[
                    { value: "", label: "-- No project associated (standalone link) --" },
                    ...projects.map((p) => ({
                      value: p.slug,
                      label: `${p.title} (${p.location.locality})`,
                    })),
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Imagery & Schedule */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-[#07140F]">
              Banner Imagery & Timing
            </h2>

            <ImageUploadSimulator
              label="Promotional Banner Cover Image"
              value={coverImage}
              onChange={setCoverImage}
              helperText="High-resolution landscape image displayed in the chosen placement."
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Schedule Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Schedule Expiry Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Campaign Priority Order
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={priority}
                  onChange={(e) => setPriority(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 bg-white font-mono"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-stone-800 block">Publication Status</span>
                <span className="text-[11px] text-stone-500">Only published ads appear on the public homepage</span>
              </div>
              <div className="min-w-[170px]">
                <AdminMuiSelect
                  value={status}
                  onChange={(val) => setStatus(val as PromotionItem["status"])}
                  options={[
                    { value: "published", label: "Published (Active)" },
                    { value: "draft", label: "Draft (Hidden)" },
                  ]}
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Column (5 Cols on desktop - Sticky) */}
        <div className={`space-y-4 lg:col-span-5 sticky top-24 ${activeTab === "form" ? "hidden lg:block" : "block"}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#8F6F3B]" />
              <span>Real-Time Public Mirror</span>
            </span>
            <span className="text-[11px] text-stone-400 font-mono">
              Auto-updating as you type
            </span>
          </div>

          <AdvertisementLivePreview ad={previewData} />

          <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-600 space-y-1">
            <p className="font-semibold text-stone-800">Placement Rule:</p>
            <p className="text-[11px] text-stone-500 leading-relaxed font-light">
              Selecting <strong className="text-stone-700">{placement}</strong> places this advertisement directly into the corresponding section of the homepage.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
