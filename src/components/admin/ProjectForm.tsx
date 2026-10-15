"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  Layers,
  MapPin,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { PropertyPlot } from "@/types/property";
import ImageUploadSimulator from "@/components/admin/ImageUploadSimulator";
import AdminMuiSelect from "@/components/admin/mui/AdminMuiSelect";
import AdminMuiSwitch from "@/components/admin/mui/AdminMuiSwitch";

interface ProjectFormProps {
  initialData?: PropertyPlot;
  onSubmit: (data: PropertyPlot) => void;
  isEditing?: boolean;
}

export default function ProjectForm({
  initialData,
  onSubmit,
  isEditing = false,
}: ProjectFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [tagline, setTagline] = useState(initialData?.tagline || "");
  const [category, setCategory] = useState<PropertyPlot["category"]>(
    initialData?.category || "JDA Approved Township"
  );
  const [status, setStatus] = useState<PropertyPlot["status"]>(
    initialData?.status || "Available"
  );
  const [investmentTier, setInvestmentTier] = useState<PropertyPlot["investmentTier"]>(
    initialData?.investmentTier || "Prime Core"
  );
  const [isFeatured, setIsFeatured] = useState<boolean>(
    initialData?.isFeatured ?? false
  );

  // Location
  const [locality, setLocality] = useState(initialData?.location.locality || "Jagatpura");
  const [city, setCity] = useState(initialData?.location.city || "Jaipur");
  const [state, setState] = useState(initialData?.location.state || "Rajasthan");
  const [landmark, setLandmark] = useState(initialData?.location.landmark || "Near Bombay Hospital");
  const [corridor, setCorridor] = useState(initialData?.location.corridor || "Mahal Road Arterial");

  // Dimensions
  const [plotAreaGaj, setPlotAreaGaj] = useState(initialData?.dimensions.plotAreaGaj || 200);
  const [plotAreaSqFt, setPlotAreaSqFt] = useState(initialData?.dimensions.plotAreaSqFt || 1800);
  const [frontageFt, setFrontageFt] = useState(initialData?.dimensions.frontageFt || 30);
  const [depthFt, setDepthFt] = useState(initialData?.dimensions.depthFt || 60);
  const [facing, setFacing] = useState<PropertyPlot["dimensions"]["facing"]>(
    initialData?.dimensions.facing || "East"
  );

  // Price
  const [priceFormatted, setPriceFormatted] = useState(
    initialData?.price.formatted || "₹68.00 Lakh"
  );
  const [priceTotal, setPriceTotal] = useState(initialData?.price.total || 6800000);
  const [pricePerSqFt, setPricePerSqFt] = useState(initialData?.price.pricePerSqFt || 3777);
  const [bookingAmountFormatted, setBookingAmountFormatted] = useState(
    initialData?.price.bookingAmountFormatted || "₹1,00,000"
  );

  // Images
  const [heroImage, setHeroImage] = useState(
    initialData?.heroImage || "/images/catalogue/demarcated-plots.jpg"
  );
  const [masterplanImage, setMasterplanImage] = useState(
    initialData?.projectMasterplanImage || "/images/catalogue/master-plan-blueprint.jpg"
  );
  const [galleryImages, setGalleryImages] = useState<string[]>(
    initialData?.galleryImages || [
      "/images/catalogue/entrance-archway.jpg",
      "/images/catalogue/jaipur-location-map.jpg",
    ]
  );
  const [newGalleryUrl, setNewGalleryUrl] = useState("");

  // Descriptions & Story
  const [overview, setOverview] = useState(
    initialData?.overview ||
      "Demarcated residential plot in a prime gated enclave with direct 60-ft wide road access."
  );
  const [story, setStory] = useState(
    initialData?.story ||
      "Situated along Jaipur's premier growth artery, this parcel combines statutory JDA sanction with masterplanned internal infrastructure for seamless residential villa construction."
  );

  // Highlights
  const [highlights, setHighlights] = useState<string[]>(
    initialData?.highlights || [
      "100% Freehold JDA Patta Allocation",
      "60-Ft Wide Bitumen Approach Road",
      "Immediate Registry Suitability",
      "Underground Utility Duct Network",
    ]
  );
  const [newHighlight, setNewHighlight] = useState("");

  // Legal
  const [approvalStatus, setApprovalStatus] = useState(
    initialData?.legal.approvalStatus || "100% JDA Approved & RERA Sanctioned"
  );
  const [titleStatus, setTitleStatus] = useState(
    initialData?.legal.titleStatus || "Freehold Clear Title"
  );

  // SEO
  const [seoTitle, setSeoTitle] = useState(
    initialData ? `${initialData.title} | Residential Plots Jaipur` : ""
  );
  const [seoDescription, setSeoDescription] = useState(
    initialData?.overview || ""
  );

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Gallery image reordering
  const moveGalleryImage = (index: number, direction: "up" | "down") => {
    const updated = [...galleryImages];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= updated.length) return;
    const temp = updated[index];
    updated[index] = updated[target];
    updated[target] = temp;
    setGalleryImages(updated);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  const addGalleryImage = () => {
    if (!newGalleryUrl.trim()) return;
    setGalleryImages([...galleryImages, newGalleryUrl.trim()]);
    setNewGalleryUrl("");
  };

  const addHighlightItem = () => {
    if (!newHighlight.trim()) return;
    setHighlights([...highlights, newHighlight.trim()]);
    setNewHighlight("");
  };

  const removeHighlightItem = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalSlug =
      slug.trim() ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const newProject: PropertyPlot = {
      id: initialData?.id || `plot-${Date.now()}`,
      slug: finalSlug,
      title,
      tagline,
      category,
      status,
      investmentTier,
      isFeatured,
      location: {
        locality,
        city,
        state,
        landmark,
        corridor,
      },
      dimensions: {
        plotAreaGaj: Number(plotAreaGaj),
        plotAreaSqFt: Number(plotAreaSqFt),
        plotAreaSqYards: Number(plotAreaGaj),
        frontageFt: Number(frontageFt),
        depthFt: Number(depthFt),
        facing,
        boundaryDemarcated: true,
      },
      price: {
        total: Number(priceTotal),
        formatted: priceFormatted,
        pricePerSqFt: Number(pricePerSqFt),
        bookingAmountFormatted,
      },
      heroImage,
      galleryImages,
      projectMasterplanImage: masterplanImage,
      overview,
      story,
      highlights,
      amenities: initialData?.amenities || [
        { name: "Sector Park", description: "Landscaped green area", iconName: "Trees" },
        { name: "24/7 Security", description: "Gated entry checkpoint", iconName: "Shield" },
        { name: "Underground Power", description: "Cabled electrification", iconName: "Zap" },
      ],
      infrastructure: [
        "40-Ft and 60-Ft Wide Internal Roads",
        "Dual Splay Corner Design",
        "Rainwater Recharge Wells",
      ],
      connectivity: initialData?.connectivity || [
        { destination: "Jaipur Ring Road", distance: "2.5 km", driveTime: "4 mins" },
        { destination: "Jaipur Int'l Airport", distance: "12 km", driveTime: "18 mins" },
      ],
      legal: {
        titleStatus,
        approvalStatus,
        zoningType: "Residential Township Allotment",
        possessionTime: "Immediate Demarcation Handover",
        disclaimer: "All dimensions and patta verifications subject to sub-registrar review.",
      },
    };

    onSubmit(newProject);
    setSavedSuccess(true);
    setTimeout(() => {
      router.push("/admin/projects");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#07140F]">
              {isEditing ? `Edit: ${initialData?.title}` : "Create New Land Project"}
            </h1>
            <p className="text-xs text-stone-500">
              Configure public listing, cadastral plot specifications, pricing, and media gallery.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#07140F] hover:bg-[#14382C] text-[#DFBE82] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? "Save Changes" : "Publish Project"}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Project saved successfully! Redirecting to projects list...</span>
        </div>
      )}

      {/* Grid of Form Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Core Data & Specifications (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Basic Information */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-[#07140F] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#8F6F3B]" />
              <span>Project Identity & Classification</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Royal Palm Enclave — Phase 2"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#C8A870] text-stone-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="auto-generated-if-empty"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 font-mono text-stone-700 focus:outline-none focus:border-[#C8A870]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Marketing Tagline
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Exclusive East-Facing Corner Plots"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#C8A870] text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Typology Category *
                </label>
                <AdminMuiSelect
                  value={category}
                  onChange={(val) => setCategory(val as PropertyPlot["category"])}
                  options={[
                    { value: "JDA Approved Township", label: "JDA Approved Township" },
                    { value: "Gated Society Plots", label: "Gated Society Plots" },
                    { value: "Ring Road Growth Corridor", label: "Ring Road Growth Corridor" },
                    { value: "Aravalli Hillview Parcels", label: "Aravalli Hillview Parcels" },
                    { value: "Luxury Farmhouse Land", label: "Luxury Farmhouse Land" },
                  ]}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Investment Tier
                </label>
                <AdminMuiSelect
                  value={investmentTier}
                  onChange={(val) => setInvestmentTier(val as PropertyPlot["investmentTier"])}
                  options={[
                    { value: "Prime Core", label: "Prime Core (Established Sector)" },
                    { value: "High Growth Corridor", label: "High Growth Corridor (Expressway)" },
                    { value: "Generational Wealth", label: "Generational Wealth (Estate Parcels)" },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Location & Corridor */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-[#07140F] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#8F6F3B]" />
              <span>Location Demarcation & Infrastructure Axis</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Locality</label>
                <input
                  type="text"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="e.g. Jagatpura / Sirsi Road"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#C8A870]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#C8A870]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#C8A870]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-800 mb-1">Prominent Landmark</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. 500m from Bombay Hospital & Akshaya Patra"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#C8A870]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Corridor Axis</label>
                <input
                  type="text"
                  value={corridor}
                  onChange={(e) => setCorridor(e.target.value)}
                  placeholder="e.g. South-East Growth Corridor"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#C8A870]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Plot Dimensions & Pricing */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-[#07140F] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#8F6F3B]" />
              <span>Plot Dimensions & Commercial Terms</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Area (in Gaj) *</label>
                <input
                  type="number"
                  value={plotAreaGaj}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setPlotAreaGaj(val);
                    setPlotAreaSqFt(val * 9);
                  }}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Area (Sq. Ft)</label>
                <input
                  type="number"
                  value={plotAreaSqFt}
                  onChange={(e) => setPlotAreaSqFt(Number(e.target.value))}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Frontage (Ft)</label>
                <input
                  type="number"
                  value={frontageFt}
                  onChange={(e) => setFrontageFt(Number(e.target.value))}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Depth (Ft)</label>
                <input
                  type="number"
                  value={depthFt}
                  onChange={(e) => setDepthFt(Number(e.target.value))}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Facing Orientation</label>
                <AdminMuiSelect
                  value={facing}
                  onChange={(val) => setFacing(val as PropertyPlot["dimensions"]["facing"])}
                  options={[
                    { value: "East", label: "East (Vaastu Auspicious)" },
                    { value: "North", label: "North" },
                    { value: "North-East", label: "North-East (Ishan Corner)" },
                    { value: "South-East", label: "South-East" },
                    { value: "West", label: "West" },
                  ]}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Formatted Price</label>
                <input
                  type="text"
                  value={priceFormatted}
                  onChange={(e) => setPriceFormatted(e.target.value)}
                  placeholder="e.g. ₹68.00 Lakh"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-serif font-bold text-[#8F6F3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Rate / Sq.Ft</label>
                <input
                  type="number"
                  value={pricePerSqFt}
                  onChange={(e) => setPricePerSqFt(Number(e.target.value))}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Booking Deposit</label>
                <input
                  type="text"
                  value={bookingAmountFormatted}
                  onChange={(e) => setBookingAmountFormatted(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Narrative & Editorial Descriptions */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-[#07140F]">
              Editorial Narrative & Narrative Copy
            </h2>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Short Overview Summary
              </label>
              <textarea
                rows={2}
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#C8A870]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Comprehensive Land Narrative & Soil Sovereignty Thesis
              </label>
              <textarea
                rows={4}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#C8A870]"
              />
            </div>

            {/* Highlights List */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-2">
                Key Parcel Highlights & Clearances
              </label>
              <div className="space-y-2 mb-3">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-xs">
                    <span className="flex-1 text-stone-800 font-medium">{h}</span>
                    <button
                      type="button"
                      onClick={() => removeHighlightItem(i)}
                      className="text-stone-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newHighlight}
                  onChange={(e) => setNewHighlight(e.target.value)}
                  placeholder="Add another highlight point..."
                  className="flex-1 text-xs px-3.5 py-2 rounded-xl border border-stone-200 bg-white"
                />
                <button
                  type="button"
                  onClick={addHighlightItem}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Section 5: Gallery Images & Image Reordering */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-base font-bold text-[#07140F]">
                  Project Gallery & Image Reordering
                </h2>
                <p className="text-xs text-stone-500">
                  Visitors browse these images in the interactive carousel. Reorder using up/down arrows.
                </p>
              </div>
              <span className="text-xs font-mono text-stone-400">
                {galleryImages.length} images
              </span>
            </div>

            <div className="space-y-2.5">
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl border border-stone-200 bg-stone-50 gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-stone-400 w-5">
                      #{idx + 1}
                    </span>
                    <div className="relative w-14 h-10 rounded-lg overflow-hidden border border-stone-200 flex-shrink-0">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-stone-700 font-mono truncate max-w-xs">
                      {img}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveGalleryImage(idx, "up")}
                      className="p-1.5 rounded bg-white hover:bg-stone-100 border border-stone-200 disabled:opacity-30"
                      title="Move up"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === galleryImages.length - 1}
                      onClick={() => moveGalleryImage(idx, "down")}
                      className="p-1.5 rounded bg-white hover:bg-stone-100 border border-stone-200 disabled:opacity-30"
                      title="Move down"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(idx)}
                      className="p-1.5 rounded bg-white hover:bg-rose-50 border border-stone-200 text-stone-400 hover:text-rose-600"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add new image to gallery */}
            <div className="pt-2 flex gap-2">
              <input
                type="text"
                value={newGalleryUrl}
                onChange={(e) => setNewGalleryUrl(e.target.value)}
                placeholder="Paste new image URL to append..."
                className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-mono"
              />
              <button
                type="button"
                onClick={addGalleryImage}
                className="px-4 py-2.5 rounded-xl bg-[#07140F] text-[#DFBE82] text-xs font-semibold"
              >
                Add Image
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Status, Media Hero & SEO (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publishing & Visibility Settings */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif text-sm font-bold text-[#07140F] border-b border-stone-100 pb-3">
              Publishing Status
            </h3>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Inventory Status
              </label>
              <AdminMuiSelect
                value={status}
                onChange={(val) => setStatus(val as PropertyPlot["status"])}
                options={[
                  { value: "Available", label: "Available (Active Public Sale)" },
                  { value: "Phase 1 Fast Filling", label: "Phase 1 Fast Filling" },
                  { value: "Pre-Launch Preview", label: "Pre-Launch Preview" },
                  { value: "Reserved", label: "Reserved" },
                  { value: "Limited Availability", label: "Limited Availability" },
                ]}
              />
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-stone-800 block">Featured Listing</span>
                <span className="text-[11px] text-stone-500">Highlight on homepage</span>
              </div>
              <AdminMuiSwitch
                checked={isFeatured}
                onChange={(checked) => setIsFeatured(checked)}
                size="small"
              />
            </div>
          </div>

          {/* Primary Cover Image */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif text-sm font-bold text-[#07140F] border-b border-stone-100 pb-3">
              Project Cover Asset
            </h3>
            <ImageUploadSimulator
              label="Hero Cover Image"
              value={heroImage}
              onChange={setHeroImage}
              helperText="Main photo shown on cards, hero banners, and catalogue cover."
            />
          </div>

          {/* Master Plan CAD Blueprint */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif text-sm font-bold text-[#07140F] border-b border-stone-100 pb-3">
              Master Plan Blueprint
            </h3>
            <ImageUploadSimulator
              label="Sanctioned CAD Plan"
              value={masterplanImage}
              onChange={setMasterplanImage}
              helperText="Demarcated survey layout and road scheme diagram."
            />
          </div>

          {/* Legal Clearances */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif text-sm font-bold text-[#07140F] border-b border-stone-100 pb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Statutory Compliance</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Approval Certificate
              </label>
              <input
                type="text"
                value={approvalStatus}
                onChange={(e) => setApprovalStatus(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Title Status
              </label>
              <input
                type="text"
                value={titleStatus}
                onChange={(e) => setTitleStatus(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white"
              />
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif text-sm font-bold text-[#07140F] border-b border-stone-100 pb-3">
              Search Engine SEO
            </h3>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Project Name | TERRA FIRMA"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
