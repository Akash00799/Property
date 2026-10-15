"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  BookOpen,
  ExternalLink,
  CheckCircle2,
  Layers,
  MapPin,
  Sparkles,
  FileText,
  AlertCircle,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import ImageUploadSimulator from "@/components/admin/ImageUploadSimulator";

export default function EditCataloguePage() {
  const params = useParams();
  const router = useRouter();
  const { catalogues, updateCatalogue } = useAdminData();

  const catId = params?.id as string;
  const catalogue = catalogues.find((c) => c.id === catId);

  // States
  const [title, setTitle] = useState(catalogue?.title || "");
  const [tagline, setTagline] = useState(catalogue?.tagline || "");
  const [volume, setVolume] = useState(catalogue?.volume || "Volume 01");
  const [edition, setEdition] = useState(catalogue?.edition || "Monograph Edition");
  const [status, setStatus] = useState(catalogue?.status || "Available");
  const [coverImage, setCoverImage] = useState(catalogue?.coverImage || "");
  const [planImage, setPlanImage] = useState(catalogue?.masterPlan.planImage || "");
  const [blueprintTitle, setBlueprintTitle] = useState(catalogue?.masterPlan.blueprintTitle || "");
  const [totalArea, setTotalArea] = useState(catalogue?.masterPlan.totalArea || "45 Bighas");
  const [headline, setHeadline] = useState(catalogue?.overview.headline || "");
  const [story, setStory] = useState(catalogue?.overview.story || "");
  const [developerVision, setDeveloperVision] = useState(catalogue?.overview.developerVision || "");
  const [locality, setLocality] = useState(catalogue?.location.locality || "");
  const [city, setCity] = useState(catalogue?.location.city || "Jaipur");
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!catalogue) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 max-w-lg mx-auto space-y-4 my-8">
        <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
        <h2 className="font-serif text-xl font-bold text-[#07140F]">
          Monograph Catalogue Not Found
        </h2>
        <Link
          href="/admin/catalogues"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#07140F] text-[#DFBE82] text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogues</span>
        </Link>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateCatalogue(catId, {
      title,
      tagline,
      volume,
      edition,
      status,
      coverImage,
      location: {
        ...catalogue.location,
        locality,
        city,
      },
      overview: {
        ...catalogue.overview,
        headline,
        story,
        developerVision,
      },
      masterPlan: {
        ...catalogue.masterPlan,
        planImage,
        blueprintTitle,
        totalArea,
      },
    });

    setSavedSuccess(true);
    setTimeout(() => {
      router.push("/admin/catalogues");
    }, 1000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/catalogues"
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8F6F3B] uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{volume} • {edition}</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#07140F]">
              Edit Monograph: {catalogue.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/catalogue/${catalogue.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 hover:border-[#C8A870] bg-white text-stone-700 hover:text-[#07140F] text-xs font-semibold transition-all shadow-sm"
          >
            <ExternalLink className="w-4 h-4 text-[#C8A870]" />
            <span>Preview Live Monograph</span>
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#07140F] hover:bg-[#14382C] text-[#DFBE82] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Folio Changes</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Catalogue monograph updated successfully!</span>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {/* Folio Metadata */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-[#07140F] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#8F6F3B]" />
              <span>Publication Folio Title & Classification</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Catalogue Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-medium text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Tagline / Architectural Theme
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Status
                </label>
                <input
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Volume Number
                </label>
                <input
                  type="text"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Edition Label
                </label>
                <input
                  type="text"
                  value={edition}
                  onChange={(e) => setEdition(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Folio 01: Overview Narrative & Vision */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-[#07140F]">
              Folio 01: Editorial Overview & Developer Vision
            </h2>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Overview Chapter Headline
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-serif font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Township Context & Story
              </label>
              <textarea
                rows={4}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-white leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Developer Master Vision
              </label>
              <textarea
                rows={3}
                value={developerVision}
                onChange={(e) => setDeveloperVision(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-white leading-relaxed"
              />
            </div>
          </div>

          {/* Folio 02: CAD Blueprint Master Plan */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-[#07140F] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#8F6F3B]" />
              <span>Folio 02: Sanctioned CAD Master Plan Blueprint</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Blueprint Title
                </label>
                <input
                  type="text"
                  value={blueprintTitle}
                  onChange={(e) => setBlueprintTitle(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Total Land Area
                </label>
                <input
                  type="text"
                  value={totalArea}
                  onChange={(e) => setTotalArea(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-mono"
                />
              </div>
            </div>

            <ImageUploadSimulator
              label="CAD Master Plan Scheme Image"
              value={planImage}
              onChange={setPlanImage}
              helperText="High-resolution survey drawing displayed in the fullscreen zoomable CAD viewer."
            />
          </div>
        </div>

        {/* Right Column: Media Cover & Location (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif text-sm font-bold text-[#07140F] border-b border-stone-100 pb-3">
              Catalogue Cover Asset
            </h3>
            <ImageUploadSimulator
              label="Monograph Cover"
              value={coverImage}
              onChange={setCoverImage}
              helperText="Large cover artwork greeting visitors when browsing the catalogue."
            />
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif text-sm font-bold text-[#07140F] border-b border-stone-100 pb-3 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#C8A870]" />
              <span>Location Demarcation</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Locality
              </label>
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                City / Region
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
