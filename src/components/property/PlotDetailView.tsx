"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  Share2,
  Calendar,
  Compass,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  MessageSquare,
  Trees,
  Droplets,
  Zap,
  Car,
  Wifi,
  Lock,
  ChevronLeft,
  ChevronRight,
  Send,
} from "lucide-react";
import { PropertyPlot } from "@/types/property";
import { DEMO_PROPERTIES } from "@/data/properties";
import { useWishlist } from "@/context/WishlistContext";
import { useAdminData } from "@/context/AdminDataContext";
import PropertyCard from "@/components/property/PropertyCard";

const AMENITY_ICONS: Record<string, any> = {
  Shield: ShieldCheck,
  Trees: Trees,
  Lock: Lock,
  Droplets: Droplets,
  Compass: Compass,
  Car: Car,
  Wifi: Wifi,
  Zap: Zap,
};

export default function PlotDetailView({ plot: initialPlot }: { plot: PropertyPlot }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addEnquiry, projects } = useAdminData();

  // Dynamically resolve plot from live admin state if edited or created
  const plot =
    projects.find((p) => p.id === initialPlot.id || p.slug === initialPlot.id) ||
    initialPlot;

  // Gallery active index state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Enquiry form local state
  const [enquiryName, setEnquiryName] = useState("");
  const [enquiryPhone, setEnquiryPhone] = useState("");
  const [enquiryEmail, setEnquiryEmail] = useState("");
  const [enquiryMessage, setEnquiryMessage] = useState("");
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Copy share link feedback
  const [copiedLink, setCopiedLink] = useState(false);

  const isSaved = isInWishlist(plot.id);
  const allAvailablePlots = projects.length > 0 ? projects : DEMO_PROPERTIES;
  const similarPlots = allAvailablePlots.filter(
    (p) => p.id !== plot.id && p.category === plot.category
  ).slice(0, 3);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryPhone) return;

    addEnquiry({
      customerName: enquiryName,
      phone: enquiryPhone,
      email: enquiryEmail || undefined,
      projectId: plot.id,
      projectTitle: plot.title,
      plotSizePref: `${plot.dimensions.plotAreaGaj} Gaj`,
      enquiryType: "Brochure Download",
      status: "New",
      preferredContactMethod: "Phone",
      budget: plot.price.formatted,
      source: `Plot Detail Page (${plot.title})`,
    });

    setEnquirySubmitted(true);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-[#0A1D16] text-stone-400 text-xs py-3.5 px-4 sm:px-6 lg:px-8 border-b border-[#C8A870]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/plots" className="hover:text-white transition-colors">Plots</Link>
            <span>/</span>
            <span className="text-[#C8A870] font-medium truncate max-w-xs">{plot.title}</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="hover:text-white flex items-center gap-1 transition-colors text-[11px]"
              title="Share link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? "Link Copied!" : "Share"}</span>
            </button>
            <button
              onClick={() => toggleWishlist(plot.id)}
              className={`flex items-center gap-1 transition-colors text-[11px] ${
                isSaved ? "text-[#C8A870]" : "hover:text-white"
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Title & Location Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-6 border-b border-stone-200 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded bg-[#0A1D16] text-[#C8A870] text-[10px] font-bold uppercase tracking-wider">
                {plot.category}
              </span>
              <span className="px-3 py-1 rounded bg-[#C8A870]/20 text-[#14382C] text-[10px] font-bold uppercase tracking-wider">
                {plot.status}
              </span>
              <span className="text-emerald-800 font-semibold text-xs hidden sm:inline">• {plot.legal.approvalStatus}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1D16] tracking-tight">
              {plot.title}
            </h1>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-600">
              <MapPin className="w-4 h-4 text-[#C8A870] flex-shrink-0" />
              <span>{plot.location.locality}, {plot.location.city}, {plot.location.state}</span>
              <span className="text-stone-300">•</span>
              <span className="font-medium text-[#14382C]">{plot.location.landmark}</span>
            </div>
          </div>

          {/* Pricing Header */}
          <div className="bg-white p-5 rounded-xl border border-[#C8A870]/30 shadow-sm flex flex-col items-start lg:items-end">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
              Total Consideration
            </span>
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1D16]">
              {plot.price.formatted}
            </span>
            <span className="text-xs text-stone-500 mt-0.5">
              Approx. ₹{Math.round(plot.price.total / plot.dimensions.plotAreaGaj).toLocaleString()}/Gaj (₹{plot.price.pricePerSqFt.toLocaleString()}/sq.ft)
            </span>
          </div>
        </div>

        {/* Gallery Showcase */}
        <div className="my-8 space-y-3">
          <div className="relative aspect-[21/9] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-stone-900 shadow-xl border border-[#C8A870]/20">
            <Image
              src={plot.galleryImages[activeImageIndex] || plot.heroImage}
              alt={`${plot.title} view ${activeImageIndex + 1}`}
              fill
              priority
              className="object-cover transition-all duration-700"
            />
            
            {/* Gallery Navigation Buttons */}
            <button
              onClick={() =>
                setActiveImageIndex((prev) =>
                  prev === 0 ? plot.galleryImages.length - 1 : prev - 1
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                setActiveImageIndex((prev) =>
                  prev === plot.galleryImages.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-full font-mono">
              {activeImageIndex + 1} / {plot.galleryImages.length} Photographs
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {plot.galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx
                    ? "border-[#C8A870] ring-2 ring-[#C8A870]/40"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
          {/* Main Info Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Key Metrics Strip */}
            <div className="bg-white rounded-xl border border-[#C8A870]/25 p-6 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[#0A1D16] mb-4 pb-2 border-b border-stone-100">
                Key Plot Specifications
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Total Plot Area</span>
                  <span className="font-serif text-xl font-bold text-[#0A1D16]">
                    {plot.dimensions.plotAreaGaj} Gaj (वर्ग गज)
                  </span>
                  <span className="text-[11px] text-stone-500 block">
                    {plot.dimensions.plotAreaSqFt.toLocaleString()} Sq.Ft ({plot.dimensions.plotAreaSqYards} Sq.Yds)
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Road Frontage</span>
                  <span className="font-serif text-xl font-bold text-[#0A1D16]">
                    {plot.dimensions.frontageFt} Feet
                  </span>
                  <span className="text-[11px] text-stone-500 block">
                    Depth: {plot.dimensions.depthFt} Feet
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Orientation</span>
                  <span className="font-serif text-xl font-bold text-[#0A1D16] flex items-center gap-1">
                    <Compass className="w-4 h-4 text-[#C8A870]" />
                    {plot.dimensions.facing}
                  </span>
                  <span className="text-[11px] text-stone-500 block">Vaastu Compliant</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Possession</span>
                  <span className="font-serif text-xl font-bold text-emerald-800">
                    Immediate
                  </span>
                  <span className="text-[11px] text-stone-500 block">Peg Demarcated</span>
                </div>
              </div>
            </div>

            {/* Plot Overview & Narrative */}
            <div className="bg-white rounded-xl border border-[#C8A870]/25 p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#0A1D16]">
                Overview & Land Narrative
              </h3>
              <p className="text-stone-700 text-sm leading-relaxed">
                {plot.overview}
              </p>
              <p className="text-stone-700 text-sm leading-relaxed">
                {plot.story}
              </p>

              {/* Highlights Checklist */}
              <div className="pt-4 border-t border-stone-100">
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#8F6F3B] mb-3">
                  Development Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {plot.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-800">
                      <CheckCircle2 className="w-4 h-4 text-[#C8A870] flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pre-installed Infrastructure */}
            <div className="bg-white rounded-xl border border-[#C8A870]/25 p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#0A1D16]">
                Pre-Installed Infrastructure
              </h3>
              <p className="text-xs text-stone-500">
                All civil and subterranean utilities are executed prior to possession handover.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {plot.infrastructure.map((infra, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-[#FAF8F5] border border-stone-200/80 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#C8A870]" />
                    <span className="text-xs text-stone-800 font-medium">{infra}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Amenities */}
            <div className="bg-white rounded-xl border border-[#C8A870]/25 p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#0A1D16]">
                Community Privileges & Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {plot.amenities.map((amenity, idx) => {
                  const Icon = AMENITY_ICONS[amenity.iconName] || ShieldCheck;
                  return (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-[#FAF8F5] border border-stone-100">
                      <div className="w-10 h-10 rounded bg-[#0A1D16] text-[#C8A870] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-[#0A1D16]">{amenity.name}</h4>
                        <p className="text-xs text-stone-600 mt-1">{amenity.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Location Connectivity */}
            <div className="bg-white rounded-xl border border-[#C8A870]/25 p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#0A1D16]">
                Connectivity & Distances
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {plot.connectivity.map((conn, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-[#FAF8F5] border border-stone-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-stone-900 block">{conn.destination}</span>
                      <span className="text-[11px] text-stone-500">{conn.distance}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#8F6F3B] bg-[#C8A870]/10 px-2.5 py-1 rounded">
                      {conn.driveTime}
                    </span>
                  </div>
                ))}
              </div>

              {/* Interactive Location Map Placeholder */}
              <div className="relative aspect-[16/7] rounded-xl overflow-hidden bg-stone-900 border border-stone-300 mt-4 flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1524813686514-a57563d77d61?q=80&w=1200&auto=format&fit=crop"
                  alt="Location Map Placeholder"
                  fill
                  className="object-cover opacity-50"
                />
                <div className="relative z-10 text-center p-6 bg-[#0A1D16]/90 backdrop-blur-md rounded-xl border border-[#C8A870]/40 max-w-sm">
                  <MapPin className="w-8 h-8 text-[#C8A870] mx-auto mb-2 animate-bounce" />
                  <h4 className="font-serif text-sm font-bold text-white">Geographic Satellite Position</h4>
                  <p className="text-[11px] text-stone-300 mt-1">
                    Latitude & Longitude verified for physical plot coordinates. Available in customer legal pack.
                  </p>
                </div>
              </div>
            </div>

            {/* Legal Due Diligence Notice */}
            <div className="bg-[#0A1D16] text-[#FAF8F5] rounded-xl border border-[#C8A870]/30 p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#C8A870] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Legal & Approval Status</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Title Search</span>
                  <span className="font-semibold text-white">{plot.legal.titleStatus}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Authority Approval</span>
                  <span className="font-semibold text-white">{plot.legal.approvalStatus}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Zoning Classification</span>
                  <span className="font-semibold text-white">{plot.legal.zoningType}</span>
                </div>
              </div>
              <p className="text-[11px] text-stone-400 pt-2 border-t border-stone-800">
                Notice: {plot.legal.disclaimer}
              </p>
            </div>
          </div>

          {/* Sticky Sidebar Enquiry & Actions (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Main Action Card */}
              <div className="bg-white rounded-2xl border border-[#C8A870]/40 p-6 shadow-xl space-y-5">
                <div className="border-b border-stone-100 pb-4">
                  <span className="text-[10px] uppercase tracking-wider text-[#8F6F3B] font-bold block">
                    Immediate Action
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#0A1D16]">
                    Walk This Plot in Person
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Complimentary private chauffeur transfer from your residence.
                  </p>
                </div>

                <Link
                  href={`/schedule-visit?plotId=${plot.id}`}
                  className="w-full py-3.5 rounded bg-gradient-to-r from-[#DFBE82] via-[#C8A870] to-[#AF8D54] text-[#07140F] text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Site Inspection</span>
                </Link>

                {/* Direct Hotline CTAs */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="https://wa.me/918001234567?text=Hello%20Terra%20Firma,%20I%20am%20interested%20in%20inspecting%20Plot%20ID%20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-emerald-200"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href="tel:+918001234567"
                    className="py-2.5 px-3 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-stone-200"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-stone-600" />
                    <span>Call Desk</span>
                  </a>
                </div>

                {/* Fast Enquiry Form */}
                <div className="pt-4 border-t border-stone-100">
                  <h4 className="text-xs uppercase font-bold text-stone-700 tracking-wider mb-3">
                    Request Full Legal Packet
                  </h4>

                  {enquirySubmitted ? (
                    <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Enquiry Received!</span>
                      </div>
                      <p className="text-[11px] text-emerald-700">
                        Our land specialist will transmit the survey report and documentation packet to your email shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleEnquirySubmit} className="space-y-3">
                      <div>
                        <input
                          type="text"
                          required
                          value={enquiryName}
                          onChange={(e) => setEnquiryName(e.target.value)}
                          placeholder="Your Full Name *"
                          className="w-full bg-[#FAF8F5] border border-stone-200 rounded p-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#C8A870]"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          required
                          value={enquiryPhone}
                          onChange={(e) => setEnquiryPhone(e.target.value)}
                          placeholder="Phone Number *"
                          className="w-full bg-[#FAF8F5] border border-stone-200 rounded p-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#C8A870]"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          value={enquiryEmail}
                          onChange={(e) => setEnquiryEmail(e.target.value)}
                          placeholder="Email Address"
                          className="w-full bg-[#FAF8F5] border border-stone-200 rounded p-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#C8A870]"
                        />
                      </div>
                      <div>
                        <textarea
                          rows={2}
                          value={enquiryMessage}
                          onChange={(e) => setEnquiryMessage(e.target.value)}
                          placeholder="Any specific questions regarding setbacks or pricing..."
                          className="w-full bg-[#FAF8F5] border border-stone-200 rounded p-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#C8A870] resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded bg-[#0A1D16] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider hover:bg-[#14382C] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5 text-[#C8A870]" />
                        <span>Submit Private Enquiry</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Confidence Badge */}
              <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs space-y-2">
                <span className="font-semibold text-stone-900 block">The Landcraft Guarantee</span>
                <p className="text-stone-500 text-[11px] leading-relaxed">
                  Every parcel is physically demarcated with boundary pegs. No brokerage commissions or hidden title transfer levies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarPlots.length > 0 && (
          <div className="mt-20 pt-12 border-t border-stone-200 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#8F6F3B] font-semibold block">
                  Alternative Opportunities
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1D16]">
                  Similar Curated Parcels in {plot.category}
                </h3>
              </div>
              <Link
                href="/plots"
                className="text-xs font-bold uppercase tracking-wider text-[#0A1D16] hover:text-[#8F6F3B] flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarPlots.map((simPlot) => (
                <PropertyCard key={simPlot.id} plot={simPlot} viewMode="grid" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
