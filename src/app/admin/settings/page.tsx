"use client";

import React, { useState } from "react";
import {
  Settings,
  Save,
  CheckCircle2,
  Building,
  Phone,
  Mail,
  MapPin,
  Share2,
  Bell,
  Search,
  Sparkles,
  ShieldCheck,
  Info,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import { WebsiteSettings } from "@/types/admin";
import AdminMuiSwitch from "@/components/admin/mui/AdminMuiSwitch";

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useAdminData();

  const [companyName, setCompanyName] = useState(settings.companyName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl);
  const [contactPhone, setContactPhone] = useState(settings.contactPhone);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [salesEmail, setSalesEmail] = useState(settings.salesEmail);
  const [officeAddress, setOfficeAddress] = useState(settings.officeAddress);
  const [officeCity, setOfficeCity] = useState(settings.officeCity);
  const [officePincode, setOfficePincode] = useState(settings.officePincode);
  const [workingHours, setWorkingHours] = useState(settings.workingHours);
  const [reraNumber, setReraNumber] = useState(settings.reraNumber);
  const [jdaNodalUrl, setJdaNodalUrl] = useState(settings.jdaNodalUrl);

  const [instagram, setInstagram] = useState(settings.socialLinks.instagram);
  const [facebook, setFacebook] = useState(settings.socialLinks.facebook);
  const [youtube, setYoutube] = useState(settings.socialLinks.youtube);
  const [linkedin, setLinkedin] = useState(settings.socialLinks.linkedin);

  const [announcementBarEnabled, setAnnouncementBarEnabled] = useState(
    settings.announcementBarEnabled
  );
  const [announcementBarText, setAnnouncementBarText] = useState(
    settings.announcementBarText
  );
  const [announcementBarLink, setAnnouncementBarLink] = useState(
    settings.announcementBarLink
  );

  const [defaultMetaTitle, setDefaultMetaTitle] = useState(
    settings.defaultMetaTitle
  );
  const [defaultMetaDescription, setDefaultMetaDescription] = useState(
    settings.defaultMetaDescription
  );
  const [defaultMetaKeywords, setDefaultMetaKeywords] = useState(
    settings.defaultMetaKeywords
  );

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateSettings({
      companyName,
      tagline,
      logoUrl,
      contactPhone,
      whatsappNumber,
      salesEmail,
      officeAddress,
      officeCity,
      officePincode,
      workingHours,
      reraNumber,
      jdaNodalUrl,
      socialLinks: {
        instagram,
        facebook,
        youtube,
        linkedin,
      },
      announcementBarEnabled,
      announcementBarText,
      announcementBarLink,
      defaultMetaTitle,
      defaultMetaDescription,
      defaultMetaKeywords,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-stone-500 text-xs font-mono uppercase tracking-wider">
            <Settings className="w-4 h-4 text-[#8F6F3B]" />
            <span>Site Configuration Suite</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#07140F] mt-1">
            Global Website Settings
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Control company branding, contact telephone lines, top announcement bulletin, and default search engine SEO.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#07140F] hover:bg-[#14382C] text-[#DFBE82] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex-shrink-0 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save All Settings</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Website settings updated and saved to local state successfully!</span>
        </div>
      )}

      {/* Backend Integration Notice */}
      <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-700 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#8F6F3B] flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-stone-900">
            Phase 1 Prototype Persistence Notice
          </p>
          <p className="text-stone-600 font-light leading-relaxed">
            All configuration updates are stored reactively and saved in your browser session. In Phase 2, these settings will persist to PostgreSQL / MongoDB and be served via Edge Config.
          </p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Company Profile */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-[#07140F] flex items-center gap-2">
              <Building className="w-4 h-4 text-[#8F6F3B]" />
              <span>Company Profile & Sovereign Branding</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-serif font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Brand Tagline
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
                  RERA Registration Number
                </label>
                <input
                  type="text"
                  value={reraNumber}
                  onChange={(e) => setReraNumber(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  JDA Portal Verification URL
                </label>
                <input
                  type="text"
                  value={jdaNodalUrl}
                  onChange={(e) => setJdaNodalUrl(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Contact Numbers & Concierge */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-[#07140F] flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#8F6F3B]" />
              <span>Contact Lines & Sales Desk</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Main Phone Line
                </label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  WhatsApp Concierge Hotline
                </label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Sales Desk Email
                </label>
                <input
                  type="email"
                  value={salesEmail}
                  onChange={(e) => setSalesEmail(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Office Working Hours
                </label>
                <input
                  type="text"
                  value={workingHours}
                  onChange={(e) => setWorkingHours(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Physical Office Address
                </label>
                <input
                  type="text"
                  value={officeAddress}
                  onChange={(e) => setOfficeAddress(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Social Media Links */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-[#07140F] flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#8F6F3B]" />
              <span>Social Media & Public Channels</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Instagram URL</label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Facebook URL</label>
                <input
                  type="text"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">YouTube Channel URL</label>
                <input
                  type="text"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">LinkedIn Corporate URL</label>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Announcement Bar & Default SEO (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Top Announcement Bar */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif text-sm font-bold text-[#07140F] flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-[#8F6F3B]" />
                <span>Top Announcement Bulletin</span>
              </h3>
              <AdminMuiSwitch
                checked={announcementBarEnabled}
                onChange={(checked) => setAnnouncementBarEnabled(checked)}
                size="small"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Announcement Text
              </label>
              <textarea
                rows={3}
                value={announcementBarText}
                onChange={(e) => setAnnouncementBarText(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Link Destination
              </label>
              <input
                type="text"
                value={announcementBarLink}
                onChange={(e) => setAnnouncementBarLink(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 font-mono"
              />
            </div>
          </div>

          {/* Search Engine Metadata */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif text-sm font-bold text-[#07140F] border-b border-stone-100 pb-3 flex items-center gap-1.5">
              <Search className="w-4 h-4 text-[#8F6F3B]" />
              <span>Default Search Engine SEO</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Default Meta Title
              </label>
              <input
                type="text"
                value={defaultMetaTitle}
                onChange={(e) => setDefaultMetaTitle(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Default Meta Description
              </label>
              <textarea
                rows={4}
                value={defaultMetaDescription}
                onChange={(e) => setDefaultMetaDescription(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-stone-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Meta Keywords
              </label>
              <textarea
                rows={2}
                value={defaultMetaKeywords}
                onChange={(e) => setDefaultMetaKeywords(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-stone-200 font-mono text-[11px]"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
