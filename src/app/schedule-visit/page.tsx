"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Compass,
  Car,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  User,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { DEMO_PROPERTIES } from "@/data/properties";
import MuiSelect, { MuiSelectOption } from "@/components/ui/MuiSelect";
import { useAdminData } from "@/context/AdminDataContext";

const PLOT_OPTIONS: MuiSelectOption[] = DEMO_PROPERTIES.map((p) => ({
  value: p.id,
  label: `${p.title} (${p.dimensions.plotAreaGaj} Gaj)`,
  sublabel: p.price.formatted,
}));

const GUEST_OPTIONS: MuiSelectOption[] = [
  { value: "1 Guest", label: "1 Guest (Solo Tour)" },
  { value: "2 Guests", label: "2 Guests (Couple / Co-Buyer)" },
  { value: "3-4 Guests (Family)", label: "3–4 Guests (Family Group)" },
  { value: "5+ Guests (Private Bus)", label: "5+ Guests (Private Transit)" },
];

function ScheduleVisitContent() {
  const { addEnquiry, projects } = useAdminData();
  const searchParams = useSearchParams();
  const preSelectedPlotId = searchParams.get("plotId") || "";

  const [selectedPlotId, setSelectedPlotId] = useState(preSelectedPlotId);
  const [preferredDate, setPreferredDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("golden-hour");
  const [transportMode, setTransportMode] = useState<"chauffeur" | "self-drive">("chauffeur");
  const [pickupAddress, setPickupAddress] = useState("");
  const [guestCount, setGuestCount] = useState("2 Guests");

  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const [isBooked, setIsBooked] = useState(false);

  const allPlots = projects.length > 0 ? projects : DEMO_PROPERTIES;
  const selectedPlot = allPlots.find((p) => p.id === selectedPlotId);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone || !preferredDate) return;

    addEnquiry({
      customerName: contactName,
      phone: contactPhone,
      email: contactEmail || undefined,
      projectId: selectedPlotId || undefined,
      projectTitle: selectedPlot ? selectedPlot.title : "Custom Site Inspection",
      plotSizePref: selectedPlot ? `${selectedPlot.dimensions.plotAreaGaj} Gaj` : undefined,
      enquiryType: "Site Visit",
      status: "Site Visit Scheduled",
      preferredContactMethod: "Phone",
      visitDate: preferredDate,
      source: "VIP Schedule Visit Booking Page",
    });

    setIsBooked(true);
  };

  const getSlotLabel = (slot: string) => {
    switch (slot) {
      case "morning":
        return "Morning Inspection (9:30 AM – 11:30 AM)";
      case "afternoon":
        return "Midday Sun Inspection (1:30 PM – 3:30 PM)";
      case "golden-hour":
        return "Golden Hour Sunset Walk (4:30 PM – 6:30 PM) [Recommended]";
      default:
        return "Flexible Schedule";
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      {/* Header */}
      <section className="bg-[#0A1D16] text-[#FAF8F5] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#C8A870]/20">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A870]/15 border border-[#C8A870]/30 text-[#C8A870] text-xs font-semibold uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            Private Land Inspection Protocol
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Schedule a Private Site Inspection
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl font-light">
            Walk the boundaries, verify the orientation, and experience the neighborhood contours in person. Includes private transfer, surveyor accompaniment, and complete documentation packet.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {isBooked ? (
          /* Confirmation Success State */
          <div className="bg-white rounded-2xl border border-[#C8A870]/40 p-8 sm:p-12 shadow-2xl space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#8F6F3B]">
                Site Visit Confirmed [Demo]
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#0A1D16]">
                Inspection Itinerary Reserved
              </h2>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                We have registered your site inspection request. Our Chauffeur & Concierge desk will reconfirm pickup details via phone 24 hours prior.
              </p>
            </div>

            {/* Appointment Summary Card */}
            <div className="bg-[#0A1D16] text-[#FAF8F5] rounded-xl p-6 border border-[#C8A870]/30 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <span className="text-[10px] uppercase font-bold text-[#C8A870] tracking-wider">
                  Appointment Reference: TF-{Math.floor(100000 + Math.random() * 900000)}
                </span>
                <span className="text-xs bg-emerald-900/60 text-emerald-300 px-2.5 py-0.5 rounded border border-emerald-700/50">
                  Confirmed Demo
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Client Name</span>
                  <span className="font-semibold text-white">{contactName}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Contact Phone</span>
                  <span className="font-semibold text-white">{contactPhone}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Selected Parcel</span>
                  <span className="font-semibold text-[#DFBE82]">
                    {selectedPlot ? selectedPlot.title : "General Masterplan Tour"}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Inspection Date</span>
                  <span className="font-semibold text-white">{preferredDate}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Time Slot</span>
                  <span className="font-semibold text-white">{getSlotLabel(timeSlot)}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Transit Mode</span>
                  <span className="font-semibold text-white">
                    {transportMode === "chauffeur"
                      ? `Executive Chauffeur Pickup (${pickupAddress || "City Centre Point"})`
                      : "Self-Drive with Digital Map Coordinates"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/plots"
                className="w-full sm:w-auto px-7 py-3 rounded bg-[#0A1D16] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider hover:bg-[#14382C] text-center"
              >
                Browse More Plots
              </Link>
              <button
                onClick={() => setIsBooked(false)}
                className="w-full sm:w-auto px-6 py-3 rounded bg-stone-100 text-stone-700 hover:bg-stone-200 text-xs font-semibold uppercase tracking-wider text-center"
              >
                Edit / Book Another
              </button>
            </div>
          </div>
        ) : (
          /* Guided Booking Form */
          <form
            onSubmit={handleBooking}
            className="bg-white rounded-2xl border border-[#C8A870]/30 p-8 sm:p-10 shadow-xl space-y-8"
          >
            {/* Step 1: Select Plot */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0A1D16] text-[#C8A870] text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-serif text-lg font-bold text-[#0A1D16]">
                  Select Plotted Development
                </h3>
              </div>

              <MuiSelect
                value={selectedPlotId}
                onChange={setSelectedPlotId}
                options={PLOT_OPTIONS}
                placeholder="General Consultation & Masterplan Walk"
                themeMode="light"
                size="medium"
                ariaLabel="Select Plotted Development"
              />
            </div>

            {/* Step 2: Date & Time Slot */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0A1D16] text-[#C8A870] text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-serif text-lg font-bold text-[#0A1D16]">
                  Select Date & Preferred Lighting Slot
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-stone-600 tracking-wider">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg p-3 text-xs text-stone-800 focus:outline-none focus:border-[#C8A870]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-stone-600 tracking-wider">
                    Guest Party Size
                  </label>
                  <MuiSelect
                    value={guestCount}
                    onChange={setGuestCount}
                    options={GUEST_OPTIONS}
                    themeMode="light"
                    ariaLabel="Guest Party Size"
                  />
                </div>
              </div>

              {/* Time Slots Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  {
                    id: "morning",
                    title: "Morning Fresh",
                    time: "9:30 AM – 11:30 AM",
                    desc: "Optimal for morning sun orientation & coolness",
                  },
                  {
                    id: "afternoon",
                    title: "Midday Bright",
                    time: "1:30 PM – 3:30 PM",
                    desc: "Assess direct sunlight & shade canopies",
                  },
                  {
                    id: "golden-hour",
                    title: "Golden Hour",
                    time: "4:30 PM – 6:30 PM",
                    desc: "Panoramic hill views & sunset contours",
                  },
                ].map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setTimeSlot(slot.id)}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      timeSlot === slot.id
                        ? "bg-[#0A1D16] text-[#FAF8F5] border-[#C8A870] shadow-md"
                        : "bg-[#FAF8F5] border-stone-200 hover:border-stone-300 text-stone-800"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif font-bold text-xs">{slot.title}</span>
                      <Clock className="w-3.5 h-3.5 text-[#C8A870]" />
                    </div>
                    <span className="text-[11px] font-mono text-[#DFBE82] block mb-1">
                      {slot.time}
                    </span>
                    <span className="text-[10px] text-stone-400 block leading-tight">
                      {slot.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Transportation Preference */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0A1D16] text-[#C8A870] text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-serif text-lg font-bold text-[#0A1D16]">
                  Transit & Chauffeur Services
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setTransportMode("chauffeur")}
                  className={`p-4 rounded-xl text-left border transition-all flex items-start gap-3 ${
                    transportMode === "chauffeur"
                      ? "bg-[#0A1D16] text-[#FAF8F5] border-[#C8A870]"
                      : "bg-[#FAF8F5] border-stone-200 text-stone-800"
                  }`}
                >
                  <Car className="w-5 h-5 text-[#C8A870] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-serif font-bold text-xs block">
                      Complimentary Executive Chauffeur
                    </span>
                    <span className="text-[11px] text-stone-400 block mt-0.5">
                      Private door-to-door transfer in executive EV or SUV.
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTransportMode("self-drive")}
                  className={`p-4 rounded-xl text-left border transition-all flex items-start gap-3 ${
                    transportMode === "self-drive"
                      ? "bg-[#0A1D16] text-[#FAF8F5] border-[#C8A870]"
                      : "bg-[#FAF8F5] border-stone-200 text-stone-800"
                  }`}
                >
                  <MapPin className="w-5 h-5 text-[#C8A870] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-serif font-bold text-xs block">
                      Self-Drive
                    </span>
                    <span className="text-[11px] text-stone-400 block mt-0.5">
                      Receive VIP gate pass and GPS satellite pin coordinates.
                    </span>
                  </div>
                </button>
              </div>

              {transportMode === "chauffeur" && (
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-stone-600 tracking-wider">
                    Pickup Address / Locality
                  </label>
                  <input
                    type="text"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="Enter residence address or airport terminal..."
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg p-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#C8A870]"
                  />
                </div>
              )}
            </div>

            {/* Step 4: Contact Particulars */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0A1D16] text-[#C8A870] text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h3 className="font-serif text-lg font-bold text-[#0A1D16]">
                  Contact Particulars
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-stone-600 tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Dr. / Mr. / Ms."
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg p-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#C8A870]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-stone-600 tracking-wider">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+91 98000 00000"
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg p-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#C8A870]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-stone-600 tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg p-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#C8A870]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase font-bold text-stone-600 tracking-wider">
                  Special Notes or Technical Inquiries
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="E.g. Would like to review the 30-year non-encumbrance certificate during the site inspection..."
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg p-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#C8A870] resize-none"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-stone-100">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#DFBE82] via-[#C8A870] to-[#AF8D54] text-[#07140F] text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-xl"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm Inspection Reservation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C8A870]" />
              <span>Complimentary private service. Zero commercial obligations.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ScheduleVisitPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-[#C8A870] border-t-transparent animate-spin" />
        </div>
      }
    >
      <ScheduleVisitContent />
    </Suspense>
  );
}
