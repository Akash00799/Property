import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
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
            Terms & Conditions of Service
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm font-light">
            Review the terms governing the use of the Terra Firma land information portal and site inspection bookings.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-white rounded-2xl border border-[#C8A870]/25 p-8 sm:p-12 shadow-sm space-y-8 text-stone-700 text-xs sm:text-sm leading-relaxed">
          <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-xl text-amber-900 text-xs flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Demonstration Disclaimer:</strong> This portal is a frontend demonstration build created for UI/UX review. Property details, pricing, dimensions, RERA numbers, testimonials, and approvals shown are sample representations. No real estate transaction is executed online.
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#0A1D16]">
              1. Platform Usage & Scope
            </h2>
            <p>
              The content presented on this website is for informational and educational discovery regarding plotted land developments and real estate opportunities. All representations, layout plans, 3D topographical visualizations, and aerial images are artistic and conceptual illustrations.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#0A1D16]">
              2. Legal Verification & Independent Counsel
            </h2>
            <p>
              Prospective purchasers are advised to conduct independent legal verification of title documents, revenue extracts, and survey sketches prior to entering into any formal Agreement to Sell or paying any registration consideration.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#0A1D16]">
              3. Site Visit Code of Conduct
            </h2>
            <p>
              Private chauffeur inspections and surveyor accompaniment are provided as a complimentary service to qualified prospective land buyers. Appointments are subject to prior confirmation and vehicle availability.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#0A1D16]">
              4. Intellectual Property
            </h2>
            <p>
              All branding, typography, custom layouts, logos, and architectural narratives are the exclusive intellectual property of Terra Firma Estates and may not be reproduced without written authorization.
            </p>
          </div>

          <div className="pt-6 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <span>© 2026 TERRA FIRMA Estates</span>
            <Link href="/plots" className="text-[#8F6F3B] hover:underline font-semibold">
              Browse Available Plots &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
