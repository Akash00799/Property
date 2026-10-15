"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  Megaphone,
  Users,
  BookOpen,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Calendar,
  Sparkles,
  ExternalLink,
  MapPin,
  Phone,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import StatusBadge from "@/components/admin/StatusBadge";
import DashboardAreaChart from "@/components/admin/charts/DashboardAreaChart";
import DashboardPieChart from "@/components/admin/charts/DashboardPieChart";
import DashboardBarChart from "@/components/admin/charts/DashboardBarChart";

export default function AdminDashboardPage() {
  const { projects, advertisements, enquiries, catalogues } = useAdminData();

  // Metrics computation
  const totalProjects = projects.length;
  const publishedProjects = projects.filter(
    (p) => p.status === "Available" || p.status === "Phase 1 Fast Filling"
  ).length;
  const upcomingProjects = projects.filter(
    (p) => p.status === "Pre-Launch Preview"
  ).length;

  const totalAds = advertisements.length;
  const activeAds = advertisements.filter((a) => a.status === "published").length;
  const draftAds = advertisements.filter((a) => a.status === "draft").length;

  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.status === "New").length;
  const scheduledVisits = enquiries.filter(
    (e) => e.status === "Site Visit Scheduled"
  ).length;

  // Recent enquiries (top 5)
  const recentEnquiries = enquiries.slice(0, 5);

  // Recently updated projects (top 4)
  const recentProjects = projects.slice(0, 4);

  // Upcoming / expiring ads
  const expiringOrUpcomingAds = advertisements.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-[#07140F] rounded-3xl p-6 sm:p-8 text-[#FAF8F5] border border-[#C8A870]/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full glow-gold pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A870]/20 border border-[#C8A870]/40 text-[#DFBE82] text-xs font-semibold uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Jaipur Land Operations • Executive Suite</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Welcome back, Administrator.
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm font-light max-w-2xl leading-relaxed">
              Manage your residential plot portfolio, high-converting homepage promotion placements, architectural monograph catalogues, and VIP site visit requests from a unified control room.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#DFBE82] to-[#B08E55] text-[#07140F] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </Link>
            <Link
              href="/admin/advertisements/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-[#C8A870]/40 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <Megaphone className="w-4 h-4 text-[#DFBE82]" />
              <span>Create Ad</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Stat 1: Projects */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-semibold">
              Plotted Projects
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-serif text-[#07140F]">
              {totalProjects}
            </span>
            <span className="text-xs text-stone-500 font-medium">Total Listings</span>
          </div>
          <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-medium">
              {publishedProjects} Available
            </span>
            <span className="text-amber-700 font-medium">
              {upcomingProjects} Upcoming
            </span>
          </div>
        </div>

        {/* Stat 2: Active Advertisements */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-semibold">
              Homepage Ads
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
              <Megaphone className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-serif text-[#07140F]">
              {activeAds}
            </span>
            <span className="text-xs text-stone-500 font-medium">Active Public Ads</span>
          </div>
          <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-stone-500">
              {totalAds} total campaigns
            </span>
            <span className="text-blue-700 font-medium">
              {draftAds} drafts
            </span>
          </div>
        </div>

        {/* Stat 3: Enquiries & Leads */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-semibold">
              Buyer Enquiries
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-serif text-[#07140F]">
              {totalEnquiries}
            </span>
            <span className="text-xs text-stone-500 font-medium">Total Inquiries</span>
          </div>
          <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-semibold">
              +{newEnquiries} New Leads
            </span>
            <span className="text-purple-700 font-medium">
              {scheduledVisits} Visits Booked
            </span>
          </div>
        </div>

        {/* Stat 4: Catalogues Library */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-semibold">
              Township Monograph
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#C8A870]/20 text-[#8F6F3B] flex items-center justify-center border border-[#C8A870]/30">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-serif text-[#07140F]">
              {catalogues.length}
            </span>
            <span className="text-xs text-stone-500 font-medium">Full Monographs</span>
          </div>
          <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-[#8F6F3B] font-medium">
              CAD Master Plans Active
            </span>
            <Link
              href="/admin/catalogues"
              className="text-[#07140F] hover:underline font-semibold"
            >
              Manage &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Analytics & Performance Charts Suite */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Trend Area & Line Graph (7 cols) */}
          <div className="lg:col-span-7">
            <DashboardAreaChart />
          </div>

          {/* Interactive Pie & Donut Chart (5 cols) */}
          <div className="lg:col-span-5">
            <DashboardPieChart />
          </div>
        </div>

        {/* Micro-market Demand Index Bar Chart */}
        <div>
          <DashboardBarChart />
        </div>
      </div>

      {/* Middle Section: Recent Enquiries & Active Advertisements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Enquiries Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#07140F]">
                Recent Inquiries & Site Visit Bookings
              </h2>
              <p className="text-xs text-stone-500">
                Latest customer leads from public enquiry forms and plot detail pages.
              </p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-semibold text-[#8F6F3B] hover:text-[#07140F] flex items-center gap-1 transition-colors"
            >
              <span>View All Enquiries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 font-mono text-[10px] uppercase">
                  <th className="pb-3 font-semibold">Client Name</th>
                  <th className="pb-3 font-semibold">Project & Interest</th>
                  <th className="pb-3 font-semibold">Type</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 pr-3">
                      <p className="font-semibold text-stone-900">{enq.customerName}</p>
                      <p className="text-[11px] text-stone-500 font-mono">{enq.phone}</p>
                    </td>
                    <td className="py-3.5 pr-3">
                      <p className="text-stone-800 line-clamp-1">{enq.projectTitle || "General Portfolio"}</p>
                      <p className="text-[10px] text-stone-400">{enq.plotSizePref || "Budget: " + (enq.budget || "N/A")}</p>
                    </td>
                    <td className="py-3.5 pr-3">
                      <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-mono text-[10px]">
                        {enq.enquiryType}
                      </span>
                    </td>
                    <td className="py-3.5 pr-3">
                      <StatusBadge status={enq.status} size="sm" />
                    </td>
                    <td className="py-3.5 text-right">
                      <Link
                        href={`/admin/enquiries?id=${enq.id}`}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8F6F3B] hover:text-[#07140F] transition-colors"
                      >
                        <span>Manage</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Active Advertisements Schedule (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#07140F]">
                Active Ads Schedule
              </h2>
              <p className="text-xs text-stone-500">
                Homepage promotional campaigns.
              </p>
            </div>
            <Link
              href="/admin/advertisements"
              className="text-xs font-semibold text-[#8F6F3B] hover:text-[#07140F]"
            >
              All Ads &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {expiringOrUpcomingAds.map((ad) => (
              <div
                key={ad.id}
                className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-stone-50 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-200/70 text-stone-700 uppercase font-semibold">
                    {ad.placement}
                  </span>
                  <StatusBadge status={ad.status} size="sm" />
                </div>
                <h4 className="font-serif font-bold text-xs text-[#07140F] line-clamp-1">
                  {ad.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span className="truncate max-w-[150px]">{ad.locationLabel || "Jaipur Corridor"}</span>
                  <Link
                    href={`/admin/advertisements/${ad.id}/edit`}
                    className="text-[#8F6F3B] hover:underline font-semibold"
                  >
                    Edit Ad
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/admin/advertisements/new"
            className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-stone-200"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Launch New Homepage Ad</span>
          </Link>
        </div>
      </div>

      {/* Bottom Section: Recently Updated Projects Showcase */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#07140F]">
              Recently Updated Land Projects
            </h2>
            <p className="text-xs text-stone-500">
              Directly sync details with public property detail views and catalogue monographs.
            </p>
          </div>
          <Link
            href="/admin/projects"
            className="text-xs font-semibold text-[#8F6F3B] hover:text-[#07140F] flex items-center gap-1 transition-colors"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentProjects.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-stone-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <StatusBadge status={p.status} size="sm" />
                  <span className="text-[10px] font-mono text-stone-400">
                    {p.dimensions.plotAreaGaj} Gaj
                  </span>
                </div>
                <h3 className="font-serif font-bold text-sm text-[#07140F] line-clamp-1 group-hover:text-[#8F6F3B] transition-colors">
                  {p.title}
                </h3>
                <p className="text-[11px] text-stone-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#C8A870]" />
                  <span className="truncate">{p.location.locality}, {p.location.city}</span>
                </p>
                <p className="text-xs font-serif font-bold text-[#8F6F3B]">
                  {p.price.formatted}
                </p>
              </div>

              <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
                <Link
                  href={`/admin/projects/${p.id}/edit`}
                  className="font-semibold text-stone-700 hover:text-[#07140F]"
                >
                  Edit Project
                </Link>
                <Link
                  href={`/plots/${p.id}`}
                  target="_blank"
                  className="text-stone-400 hover:text-[#C8A870] flex items-center gap-1"
                  title="Preview on public site"
                >
                  <span>Preview</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
