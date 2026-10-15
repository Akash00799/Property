import React from "react";
import Link from "next/link";
import { ShieldCheck, Compass, ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      <section className="bg-[#0A1D16] text-[#FAF8F5] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#C8A870]/20">
        <div className="max-w-4xl mx-auto space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#C8A870] hover:underline uppercase tracking-wider mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Return to Homepage
          </Link>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Privacy Policy & Data Stewardship
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm font-light">
            Last Updated: January 2026 • Effective for all client communications & inquiry portals.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-white rounded-2xl border border-[#C8A870]/25 p-8 sm:p-12 shadow-sm space-y-8 text-stone-700 text-xs sm:text-sm leading-relaxed">
          <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-xl text-amber-900 text-xs flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Notice:</strong> This website represents a frontend design demonstration for the Terra Firma brand. Any contact information, emails, or phone numbers entered into forms are processed locally within state memory and are not stored in any external database during Phase 1.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#0A1D16]">
              1. Information We Collect
            </h2>
            <p>
              When you interact with our website to schedule a site inspection, inquire about a plot parcel, or request legal title packets, we may collect the following details:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-stone-600">
              <li>Full name, salutation, and company affiliation</li>
              <li>Phone number and WhatsApp communication preferences</li>
              <li>Email address for title documentation delivery</li>
              <li>Preferred investment horizon, budget bracket, and geographical corridors</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#0A1D16]">
              2. Purpose of Processing
            </h2>
            <p>
              Client information is processed solely for the purposes of coordinating private chauffeur transfers, scheduling surveyor accompaniment, transmitting survey numbers and encumbrance certificates, and sending pre-launch allotment invitations.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#0A1D16]">
              3. Absolute Non-Disclosure Policy
            </h2>
            <p>
              We maintain a strict non-disclosure protocol. We do not sell, rent, lease, or monetize client data with external marketers, broker pools, or lending aggregators. All inquiries remain confidential between you and the designated land acquisition director.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#0A1D16]">
              4. Cookies and Analytical Tracking
            </h2>
            <p>
              We use minimal cookies strictly necessary for interface state, wishlist persistence (stored in your browser&apos;s localStorage), and responsive device rendering.
            </p>
          </div>

          <div className="pt-6 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <span>TERRA FIRMA Legal & Privacy Desk</span>
            <Link href="/contact" className="text-[#8F6F3B] hover:underline font-semibold">
              Inquire via Privacy Office &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
