"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Users,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Clock,
  CheckCircle2,
  Download,
  Trash2,
  ExternalLink,
  Plus,
  X,
  FileSpreadsheet,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import { EnquiryItem, EnquiryStatus, EnquiryType } from "@/types/admin";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import AdminMuiSelect, { AdminMuiSelectOption } from "@/components/admin/mui/AdminMuiSelect";
import AdminMuiTooltip from "@/components/admin/mui/AdminMuiTooltip";
import AdminViewModeToggle from "@/components/admin/mui/AdminViewModeToggle";

export default function AdminEnquiriesPage() {
  const { enquiries, updateEnquiryStatus, addEnquiryNote, deleteEnquiry } = useAdminData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Selected enquiry for detail drawer
  const [activeEnquiry, setActiveEnquiry] = useState<EnquiryItem | null>(null);
  const [newNoteText, setNewNoteText] = useState("");
  const [enquiryToDelete, setEnquiryToDelete] = useState<string | null>(null);

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      const matchSearch =
        e.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.phone.includes(searchQuery) ||
        (e.email && e.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (e.projectTitle && e.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus =
        selectedStatus === "all" || e.status === selectedStatus;

      const matchType =
        selectedType === "all" || e.enquiryType === selectedType;

      return matchSearch && matchStatus && matchType;
    });
  }, [enquiries, searchQuery, selectedStatus, selectedType]);

  const handleStatusChange = useCallback(
    (id: string, status: EnquiryStatus) => {
      updateEnquiryStatus(id, status);
      setActiveEnquiry((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
    },
    [updateEnquiryStatus]
  );

  const handleAddNote = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!newNoteText.trim() || !activeEnquiry) return;
      const noteText = newNoteText.trim();
      addEnquiryNote(activeEnquiry.id, noteText);
      setNewNoteText("");

      setActiveEnquiry((prev) => {
        if (!prev) return null;
        const newNote = {
          id: `note-${Date.now()}`,
          text: noteText,
          author: "Current Admin",
          createdAt: new Date().toISOString(),
        };
        return {
          ...prev,
          internalNotes: [newNote, ...prev.internalNotes],
        };
      });
    },
    [newNoteText, activeEnquiry, addEnquiryNote]
  );

  const handleDeleteConfirm = useCallback(() => {
    if (enquiryToDelete) {
      deleteEnquiry(enquiryToDelete);
      setActiveEnquiry((prev) => (prev?.id === enquiryToDelete ? null : prev));
      setEnquiryToDelete(null);
    }
  }, [enquiryToDelete, deleteEnquiry]);

  const statusOptions = useMemo(
    () => [
      { value: "all", label: `All Lead Statuses (${enquiries.length})` },
      { value: "New", label: "New Leads", sublabel: "Incoming" },
      { value: "Contacted", label: "Contacted", sublabel: "Dialed" },
      { value: "Site Visit Scheduled", label: "Site Visit Scheduled", sublabel: "Tours" },
      { value: "Interested", label: "Interested / Follow-up", sublabel: "Warm" },
      { value: "Converted", label: "Converted Allotment", sublabel: "Won" },
      { value: "Closed", label: "Closed", sublabel: "Archived" },
    ],
    [enquiries.length]
  );

  const typeOptions = useMemo(
    () => [
      { value: "all", label: "All Inquiry Types" },
      { value: "Site Visit", label: "Site Visit Booking" },
      { value: "Brochure Download", label: "Brochure Download" },
      { value: "Price Request", label: "Price Request" },
      { value: "General Query", label: "General Query" },
    ],
    []
  );

  // Export to CSV client-side
  const handleExportCSV = () => {
    const headers = ["ID", "Customer Name", "Phone", "Email", "Project", "Type", "Status", "Date", "Budget", "Plot Size"];
    const rows = filteredEnquiries.map((e) => [
      e.id,
      `"${e.customerName}"`,
      `"${e.phone}"`,
      `"${e.email}"`,
      `"${e.projectTitle || ""}"`,
      `"${e.enquiryType}"`,
      `"${e.status}"`,
      `"${new Date(e.date).toLocaleDateString()}"`,
      `"${e.budget || ""}"`,
      `"${e.plotSizePref || ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `terra-firma-enquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-stone-500 text-xs font-mono uppercase tracking-wider">
            <Users className="w-4 h-4 text-[#8F6F3B]" />
            <span>Buyer Concierge & Leads Pipeline</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#07140F] mt-1">
            Customer Inquiries & Site Visit Requests
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Track high-intent land buyers, private chauffeur inspection bookings, and follow-up consultation notes.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 hover:border-[#C8A870] bg-white text-stone-700 hover:text-[#07140F] text-xs font-semibold transition-all shadow-sm flex-shrink-0 cursor-pointer"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
          <span>Export Leads (CSV)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client, phone, or project..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#C8A870] text-stone-800 placeholder-stone-400 bg-stone-50/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Status Filter */}
          <div className="w-full sm:w-56">
            <AdminMuiSelect
              value={selectedStatus}
              onChange={setSelectedStatus}
              options={statusOptions}
            />
          </div>

          {/* Type Filter */}
          <div className="w-full sm:w-52">
            <AdminMuiSelect
              value={selectedType}
              onChange={setSelectedType}
              options={typeOptions}
            />
          </div>

          {/* View Mode Toggle */}
          <AdminViewModeToggle
            mode={viewMode}
            onChange={(m) => setViewMode(m as "table" | "grid")}
            listValue="table"
            gridTooltip="Lead Dossier Cards Grid"
            listTooltip="Structured Table View"
          />
        </div>
      </div>

      {/* Enquiries Content */}
      {filteredEnquiries.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-3">
          <Users className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-stone-700">No enquiries found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try adjusting your search query or status filter.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID / CARDS VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEnquiries.map((enq) => (
            <div
              key={enq.id}
              onClick={() => setActiveEnquiry(enq)}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:shadow-md hover:border-[#C8A870]/40 transition-all cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                {/* Top: Name & Pipeline Status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#07140F] text-[#DFBE82] font-serif font-bold text-sm flex items-center justify-center flex-shrink-0 shadow">
                      {enq.customerName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-sm text-[#07140F] group-hover:text-[#8F6F3B] transition-colors line-clamp-1">
                        {enq.customerName}
                      </h3>
                      <p className="text-[11px] text-stone-400 font-mono">
                        {new Date(enq.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={enq.status} size="sm" />
                </div>

                {/* Project Interest */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-xs space-y-1">
                  <span className="text-[10px] uppercase font-mono text-stone-400 block">
                    Project / Interest
                  </span>
                  <p className="font-semibold text-stone-900 truncate">
                    {enq.projectTitle || "General Portfolio Inquiry"}
                  </p>
                  {(enq.budget || enq.plotSizePref) && (
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-600 font-mono">
                      {enq.budget && <span>Budget: {enq.budget}</span>}
                      {enq.budget && enq.plotSizePref && <span>•</span>}
                      {enq.plotSizePref && <span>{enq.plotSizePref}</span>}
                    </div>
                  )}
                </div>

                {/* Contact snippet */}
                <div className="space-y-1.5 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#8F6F3B] flex-shrink-0" />
                    <span className="font-mono">{enq.phone}</span>
                  </div>
                  {enq.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                      <span className="truncate text-stone-500">{enq.email}</span>
                    </div>
                  )}
                </div>

                {/* Internal note preview if exists */}
                {enq.internalNotes && enq.internalNotes.length > 0 && (
                  <p className="text-[11px] text-stone-500 line-clamp-2 bg-stone-50/70 p-2.5 rounded-lg border border-stone-100 italic">
                    &ldquo;{enq.internalNotes[enq.internalNotes.length - 1].text}&rdquo;
                  </p>
                )}
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
                  {enq.enquiryType}
                </span>

                <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setActiveEnquiry(enq)}
                    className="px-2.5 py-1 text-xs font-semibold text-[#8F6F3B] hover:text-[#07140F] bg-stone-100 hover:bg-stone-200/70 rounded-lg transition-colors cursor-pointer"
                  >
                    Dossier
                  </button>
                  <AdminMuiTooltip title="Delete Lead">
                    <button
                      onClick={() => setEnquiryToDelete(enq.id)}
                      className="p-1 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </AdminMuiTooltip>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-mono text-[10px] uppercase">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Client Name & Phone</th>
                  <th className="py-3.5 px-4 font-semibold">Project & Preferences</th>
                  <th className="py-3.5 px-4 font-semibold">Type</th>
                  <th className="py-3.5 px-4 font-semibold">Date Received</th>
                  <th className="py-3.5 px-4 font-semibold">Pipeline Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredEnquiries.map((enq) => (
                  <tr
                    key={enq.id}
                    onClick={() => setActiveEnquiry(enq)}
                    className="hover:bg-stone-50/80 transition-colors cursor-pointer"
                  >
                    {/* Name & Contact */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-stone-900 text-sm">{enq.customerName}</p>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500 font-mono mt-0.5">
                        <span>{enq.phone}</span>
                        {enq.email && <span className="text-stone-300">•</span>}
                        <span className="truncate max-w-[140px]">{enq.email}</span>
                      </div>
                    </td>

                    {/* Project & Budget */}
                    <td className="py-3.5 px-4">
                      <p className="font-medium text-stone-800 line-clamp-1">
                        {enq.projectTitle || "General Land Portfolio"}
                      </p>
                      <p className="text-[11px] text-stone-400">
                        {enq.plotSizePref ? `${enq.plotSizePref} • ` : ""}
                        {enq.budget ? `Budget: ${enq.budget}` : ""}
                      </p>
                    </td>

                    {/* Type */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded bg-stone-100 text-stone-700 font-mono text-[10px]">
                        {enq.enquiryType}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 font-mono text-stone-500">
                      {new Date(enq.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <div className="w-40">
                        <AdminMuiSelect
                          value={enq.status}
                          onChange={(val) => handleStatusChange(enq.id, val as EnquiryStatus)}
                          options={[
                            { value: "New", label: "New" },
                            { value: "Contacted", label: "Contacted" },
                            { value: "Site Visit Scheduled", label: "Site Visit Scheduled" },
                            { value: "Interested", label: "Interested" },
                            { value: "Converted", label: "Converted" },
                            { value: "Closed", label: "Closed" },
                          ]}
                        />
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <AdminMuiTooltip title="View full lead dossier and history">
                          <button
                            onClick={() => setActiveEnquiry(enq)}
                            className="px-2.5 py-1 text-xs font-semibold text-[#8F6F3B] hover:text-[#07140F] hover:bg-stone-100 rounded transition-colors"
                          >
                            View Details
                          </button>
                        </AdminMuiTooltip>

                        <AdminMuiTooltip title="Delete this customer enquiry record">
                          <button
                            onClick={() => setEnquiryToDelete(enq.id)}
                            className="p-1 text-stone-400 hover:text-rose-600 rounded transition-colors"
                            aria-label="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </AdminMuiTooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Lead Detail Drawer / Modal */}
      {activeEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-xl h-full shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-l border-stone-200 animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              {/* Drawer Top */}
              <div className="flex items-start justify-between border-b border-stone-200 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#8F6F3B] font-bold">
                    Lead Dossier #{activeEnquiry.id}
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#07140F] mt-0.5">
                    {activeEnquiry.customerName}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveEnquiry(null)}
                  className="p-2 text-stone-400 hover:text-stone-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Selector in Drawer */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-stone-700 whitespace-nowrap">Pipeline Status:</span>
                <div className="w-56">
                  <AdminMuiSelect
                    value={activeEnquiry.status}
                    onChange={(val) => handleStatusChange(activeEnquiry.id, val as EnquiryStatus)}
                    options={[
                      { value: "New", label: "New Lead" },
                      { value: "Contacted", label: "Contacted" },
                      { value: "Site Visit Scheduled", label: "Site Visit Scheduled" },
                      { value: "Interested", label: "Interested" },
                      { value: "Converted", label: "Converted Allotment" },
                      { value: "Closed", label: "Closed" },
                    ]}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="font-serif text-sm font-bold text-[#07140F]">
                  Contact & Communication
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                    <span className="text-[10px] text-stone-400 block uppercase font-mono">Phone Number</span>
                    <a href={`tel:${activeEnquiry.phone}`} className="font-semibold text-stone-900 hover:underline">
                      {activeEnquiry.phone}
                    </a>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                    <span className="text-[10px] text-stone-400 block uppercase font-mono">Email Address</span>
                    <a href={`mailto:${activeEnquiry.email}`} className="font-semibold text-stone-900 hover:underline truncate block">
                      {activeEnquiry.email || "Not Provided"}
                    </a>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <a
                    href={`https://wa.me/${activeEnquiry.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold text-center transition-colors shadow-sm"
                  >
                    Open WhatsApp Chat
                  </a>
                  <a
                    href={`tel:${activeEnquiry.phone}`}
                    className="flex-1 py-2 rounded-xl bg-[#07140F] hover:bg-[#14382C] text-[#DFBE82] text-xs font-semibold text-center transition-colors shadow-sm"
                  >
                    Call Client
                  </a>
                </div>
              </div>

              {/* Inquiry Details */}
              <div className="space-y-3">
                <h3 className="font-serif text-sm font-bold text-[#07140F]">
                  Property Interest
                </h3>
                <div className="p-4 rounded-xl border border-stone-200 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Associated Project:</span>
                    <strong className="text-stone-900">{activeEnquiry.projectTitle || "General Portfolio"}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Inquiry Type:</span>
                    <span className="font-mono">{activeEnquiry.enquiryType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Budget Indication:</span>
                    <span>{activeEnquiry.budget || "Flexible"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Plot Size Preference:</span>
                    <span className="font-mono">{activeEnquiry.plotSizePref || "150–250 Gaj"}</span>
                  </div>
                </div>
              </div>

              {/* Internal Notes Section */}
              <div className="space-y-3">
                <h3 className="font-serif text-sm font-bold text-[#07140F] flex items-center justify-between">
                  <span>Advisory & Follow-up Notes</span>
                  <span className="text-[11px] font-mono text-stone-400">
                    {activeEnquiry.internalNotes.length} notes
                  </span>
                </h3>

                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Add an internal follow-up note..."
                    className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#C8A870]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#07140F] text-[#DFBE82] text-xs font-semibold"
                  >
                    Add
                  </button>
                </form>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {activeEnquiry.internalNotes.length === 0 ? (
                    <p className="text-xs text-stone-400 italic">No internal notes added yet.</p>
                  ) : (
                    activeEnquiry.internalNotes.map((note) => (
                      <div
                        key={note.id}
                        className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1"
                      >
                        <p className="text-stone-800 leading-relaxed">{note.text}</p>
                        <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono pt-1">
                          <span>{note.author}</span>
                          <span>{new Date(note.createdAt).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => setEnquiryToDelete(activeEnquiry.id)}
                className="text-xs text-rose-600 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>
              <button
                onClick={() => setActiveEnquiry(null)}
                className="px-5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={enquiryToDelete !== null}
        title="Delete Customer Lead"
        message="Are you sure you want to delete this customer inquiry record? This action will remove their contact details and conversation notes."
        confirmLabel="Yes, Delete Record"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setEnquiryToDelete(null)}
      />
    </div>
  );
}
