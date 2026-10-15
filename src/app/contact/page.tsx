"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  Compass,
  Building,
  ShieldCheck,
} from "lucide-react";
import MuiSelect, { MuiSelectOption } from "@/components/ui/MuiSelect";
import { useAdminData } from "@/context/AdminDataContext";

const CORRIDOR_OPTIONS: MuiSelectOption[] = [
  { value: "Jagatpura Axis", label: "Jagatpura & Mahal Road Corridor", sublabel: "Airport Node" },
  { value: "Ajmer Road SEZ", label: "Ajmer Road & Mahindra SEZ Corridor", sublabel: "IT Belt" },
  { value: "Jaipur Ring Road", label: "Jaipur Ring Road Expressway", sublabel: "360-Ft Axis" },
  { value: "Tonk Road", label: "Tonk Road & Bilwa Corridor", sublabel: "Chokhi Dhani" },
  { value: "Sirsi & Kalwar", label: "Sirsi & Kalwar Road Axis", sublabel: "West Sector" },
  { value: "Delhi Highway Kukas", label: "Delhi Highway & Kukas Ridge", sublabel: "Resorts" },
];

const BUDGET_OPTIONS: MuiSelectOption[] = [
  { value: "under-50lakh", label: "Under ₹50 Lakh" },
  { value: "50lakh-1cr", label: "₹50 Lakh – ₹1.00 Cr" },
  { value: "1cr-2cr", label: "₹1.00 Cr – ₹2.00 Cr" },
  { value: "above-2cr", label: "Above ₹2.00 Cr (Farmhouses & Mega Plots)" },
];

export default function ContactPage() {
  const { addEnquiry, settings } = useAdminData();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    preferredCorridor: "",
    budget: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;

    // Dispatches directly to Admin CRM & localStorage
    addEnquiry({
      customerName: formState.name,
      phone: formState.phone,
      email: formState.email || undefined,
      projectTitle: formState.preferredCorridor ? `Corridor: ${formState.preferredCorridor}` : "General Advisory Desk",
      enquiryType: "General Query",
      status: "New",
      preferredContactMethod: "Phone",
      budget: formState.budget || undefined,
      source: "Public Website Contact Form",
    });

    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      {/* Header */}
      <section className="bg-[#0A1D16] text-[#FAF8F5] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#C8A870]/20">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A870]/15 border border-[#C8A870]/30 text-[#C8A870] text-xs font-semibold uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            Advisory Desk & Experience Pavilion
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Connect with Our Land Strategists
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl font-light">
            Whether you are evaluating a specific parcel, require legal documentation review, or desire a private site tour, our senior land desk is at your disposal.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details & Experience Centre (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-2xl border border-[#C8A870]/30 p-8 shadow-sm space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#0A1D16]">
                Experience Pavilion & Headquarters
              </h3>

              <div className="space-y-4 text-xs text-stone-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0A1D16] text-[#C8A870] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold mb-0.5">Jaipur Pavilion Address</strong>
                    <span>Plot No. 42, JLN Marg, Near World Trade Park, Malviya Nagar, Jaipur, Rajasthan 302017</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0A1D16] text-[#C8A870] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold mb-0.5">Direct Helpline</strong>
                    <a href="tel:+911412789000" className="hover:text-[#8F6F3B] underline block">
                      +91 141 278-9000
                    </a>
                    <a href="tel:+919829012345" className="hover:text-[#8F6F3B] underline block">
                      +91 98290 12345
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0A1D16] text-[#C8A870] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold mb-0.5">Confidential Inquiries</strong>
                    <a href="mailto:advisory@terrafirma-estates.demo" className="hover:text-[#8F6F3B] underline">
                      advisory@terrafirma-estates.demo
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0A1D16] text-[#C8A870] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold mb-0.5">Pavilion Hours</strong>
                    <span>Monday – Sunday: 9:00 AM – 7:30 PM (Private visits by appointment)</span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp CTA */}
              <div className="pt-2">
                <a
                  href="https://wa.me/918001234567?text=Hello%20Terra%20Firma,%20I%20would%20like%20to%20connect%20with%20an%20adviser"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start WhatsApp Conversation</span>
                </a>
              </div>
            </div>

            {/* Styled Map Location Placeholder */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900 border border-[#C8A870]/30 shadow-md flex items-center justify-center">
              <Image
                src="https://images.unsplash.com/photo-1524813686514-a57563d77d61?q=80&w=800&auto=format&fit=crop"
                alt="Map Graphic Placeholder"
                fill
                className="object-cover opacity-60"
              />
              <div className="relative z-10 text-center p-6 bg-[#0A1D16]/90 backdrop-blur-md rounded-xl border border-[#C8A870]/30 max-w-xs">
                <MapPin className="w-7 h-7 text-[#C8A870] mx-auto mb-2" />
                <h4 className="font-serif text-sm font-bold text-white">Experience Pavilion Coordinates</h4>
                <p className="text-[11px] text-stone-300 mt-1">
                  Valet parking available upon arrival. Chauffeur pickup available upon request.
                </p>
              </div>
            </div>
          </div>

          {/* Comprehensive Contact Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#C8A870]/30 p-8 sm:p-10 shadow-xl">
            <h3 className="font-serif text-2xl font-bold text-[#0A1D16] mb-2">
              Send Private Inquiry
            </h3>
            <p className="text-xs text-stone-500 mb-8">
              Complete the form below to receive detailed layout brochures, legal packets, and available plot demarcations.
            </p>

            {isSubmitted ? (
              <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-emerald-900">
                  Inquiry Dispatched Successfully
                </h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="font-semibold">{formState.name}</strong>. Your inquiry has been routed to our Senior Land Strategist. You will be contacted via {formState.phone} within 2 business hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded bg-[#0A1D16] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#14382C] transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase font-bold text-stone-600 tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Vikramaditya Singhania"
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg p-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#C8A870]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase font-bold text-stone-600 tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="+91 (980) 000-0000"
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg p-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#C8A870]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase font-bold text-stone-600 tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="name@enterprise.com"
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg p-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#C8A870]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase font-bold text-stone-600 tracking-wider">
                      Preferred Growth Corridor
                    </label>
                    <MuiSelect
                      value={formState.preferredCorridor}
                      onChange={(val) => setFormState({ ...formState, preferredCorridor: val })}
                      options={CORRIDOR_OPTIONS}
                      placeholder="Select Jaipur Corridor"
                      themeMode="light"
                      ariaLabel="Select Jaipur Corridor"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-stone-600 tracking-wider">
                    Investment Budget Brackets
                  </label>
                  <MuiSelect
                    value={formState.budget}
                    onChange={(val) => setFormState({ ...formState, budget: val })}
                    options={BUDGET_OPTIONS}
                    placeholder="Select Anticipated Allocation"
                    themeMode="light"
                    ariaLabel="Select Budget Allocation"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-stone-600 tracking-wider">
                    Specific Requirements or Questions
                  </label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="E.g. Interested in East-facing 200 Gaj JDA approved residential plot, wide 40ft road frontage, immediate registry preferred..."
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg p-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#C8A870] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-lg bg-[#0A1D16] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider hover:bg-[#14382C] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Send className="w-4 h-4 text-[#C8A870]" />
                    <span>Dispatch Confidential Inquiry</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C8A870]" />
                  <span>Strict confidentiality assured. Zero solicitation or spam.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
