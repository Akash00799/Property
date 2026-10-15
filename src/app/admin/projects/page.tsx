"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  Edit3,
  Trash2,
  ExternalLink,
  MapPin,
  Sparkles,
  CheckCircle2,
  XCircle,
  Archive,
  MoreVertical,
  Layers,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import AdminMuiSelect from "@/components/admin/mui/AdminMuiSelect";
import AdminMuiSwitch from "@/components/admin/mui/AdminMuiSwitch";
import AdminMuiTooltip from "@/components/admin/mui/AdminMuiTooltip";
import AdminViewModeToggle from "@/components/admin/mui/AdminViewModeToggle";

export default function AdminProjectsPage() {
  const { projects, deleteProject, updateProject } = useAdminData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Delete modal state
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        selectedStatus === "all" || p.status.toLowerCase() === selectedStatus.toLowerCase();

      const matchCategory =
        selectedCategory === "all" || p.category === selectedCategory;

      return matchSearch && matchStatus && matchCategory;
    });
  }, [projects, searchQuery, selectedStatus, selectedCategory]);

  const handleDeleteConfirm = useCallback(() => {
    if (projectToDelete) {
      deleteProject(projectToDelete);
      setProjectToDelete(null);
    }
  }, [projectToDelete, deleteProject]);

  const handleToggleFeatured = useCallback(
    (id: string, current: boolean | undefined) => {
      updateProject(id, { isFeatured: !current });
    },
    [updateProject]
  );

  const statusOptions = useMemo(
    () => [
      { value: "all", label: `All Statuses (${projects.length})` },
      { value: "Available", label: "Available" },
      { value: "Phase 1 Fast Filling", label: "Phase 1 Fast Filling" },
      { value: "Pre-Launch Preview", label: "Pre-Launch Preview" },
      { value: "Reserved", label: "Reserved" },
      { value: "Sold Out", label: "Sold Out" },
    ],
    [projects.length]
  );

  const categoryOptions = useMemo(
    () => [
      { value: "all", label: "All Typologies" },
      { value: "JDA Approved Township", label: "JDA Approved Township" },
      { value: "Gated Society Plots", label: "Gated Society Plots" },
      { value: "Ring Road Growth Corridor", label: "Ring Road Corridor" },
      { value: "Aravalli Hillview Parcels", label: "Aravalli Hillview" },
      { value: "Luxury Farmhouse Land", label: "Luxury Farmhouse" },
    ],
    []
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-stone-500 text-xs font-mono uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-[#8F6F3B]" />
            <span>Land Asset Management</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#07140F] mt-1">
            Residential Plots & Townships
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Manage title records, plot dimensions, cadastral layouts, pricing, and live public website inventory.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#07140F] text-[#DFBE82] hover:bg-[#14382C] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by project name or locality..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#C8A870] text-stone-800 placeholder-stone-400 bg-stone-50/50"
          />
        </div>

        {/* Filters and View Switcher */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Status Filter */}
          <div className="w-full sm:w-52">
            <AdminMuiSelect
              value={selectedStatus}
              onChange={setSelectedStatus}
              options={statusOptions}
            />
          </div>

          {/* Category Filter */}
          <div className="w-full sm:w-56">
            <AdminMuiSelect
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categoryOptions}
            />
          </div>

          {/* View Mode Toggle */}
          <AdminViewModeToggle
            mode={viewMode}
            onChange={(m) => setViewMode(m as "table" | "grid")}
            listValue="table"
            gridTooltip="Grid / Card Showcase"
            listTooltip="Structured Table View"
          />
        </div>
      </div>

      {/* Main Content Area */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-3">
          <Building2 className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-stone-700">No projects found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try adjusting your search query or filter selections, or create a new project listing.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedStatus("all");
              setSelectedCategory("all");
            }}
            className="px-4 py-2 text-xs font-semibold text-[#8F6F3B] hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] bg-stone-100">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <StatusBadge status={project.status} size="sm" />
                    {project.isFeatured && (
                      <span className="bg-[#C8A870] text-[#07140F] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#8F6F3B] block">
                      {project.category}
                    </span>
                    <h3 className="font-serif font-bold text-base text-[#07140F] line-clamp-1 mt-0.5">
                      {project.title}
                    </h3>
                    <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C8A870]" />
                      <span>{project.location.locality}, {project.location.city}</span>
                    </p>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-stone-400 block uppercase">Area</span>
                      <strong className="text-stone-900">{project.dimensions.plotAreaGaj} Gaj</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 block uppercase">Pricing</span>
                      <strong className="text-[#8F6F3B] font-serif text-sm">{project.price.formatted}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
                <Link
                  href={`/plots/${project.id}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8F6F3B] hover:text-[#07140F] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#C8A870]" />
                  <span>Public View</span>
                </Link>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:text-[#07140F] hover:border-stone-400 font-semibold"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setProjectToDelete(project.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-mono text-[10px] uppercase">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Project & Location</th>
                  <th className="py-3.5 px-4 font-semibold">Typology</th>
                  <th className="py-3.5 px-4 font-semibold">Plot Size & Facing</th>
                  <th className="py-3.5 px-4 font-semibold">Price / Gaj</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold">Featured</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-stone-50/70 transition-colors">
                    {/* Project & Cover */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                          <Image
                            src={project.heroImage}
                            alt={project.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="font-serif font-bold text-stone-900 text-sm line-clamp-1">
                            {project.title}
                          </p>
                          <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-[#C8A870]" />
                            <span>{project.location.locality}, {project.location.city}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Typology */}
                    <td className="py-3.5 px-4">
                      <span className="text-stone-700 font-medium">
                        {project.category}
                      </span>
                    </td>

                    {/* Dimensions */}
                    <td className="py-3.5 px-4 font-mono">
                      <span className="font-bold text-stone-900">
                        {project.dimensions.plotAreaGaj} Gaj
                      </span>
                      <span className="text-stone-400 block text-[10px]">
                        {project.dimensions.facing} Facing • {project.dimensions.frontageFt}×{project.dimensions.depthFt} Ft
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4">
                      <span className="font-serif font-bold text-stone-900">
                        {project.price.formatted}
                      </span>
                      <span className="text-[10px] text-stone-400 block font-mono">
                        ₹{project.price.pricePerSqFt} / sq.ft
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <StatusBadge status={project.status} size="sm" />
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-3.5 px-4">
                      <AdminMuiTooltip title={project.isFeatured ? "Featured on public homepage" : "Standard inventory"}>
                        <div>
                          <AdminMuiSwitch
                            checked={!!project.isFeatured}
                            onChange={() => handleToggleFeatured(project.id, project.isFeatured)}
                          />
                        </div>
                      </AdminMuiTooltip>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <AdminMuiTooltip title="Preview public plot page">
                          <Link
                            href={`/plots/${project.id}`}
                            target="_blank"
                            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </AdminMuiTooltip>

                        <AdminMuiTooltip title="Edit project specifications">
                          <Link
                            href={`/admin/projects/${project.id}/edit`}
                            className="p-1.5 text-stone-600 hover:text-[#07140F] hover:bg-stone-100 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                        </AdminMuiTooltip>

                        <AdminMuiTooltip title="Delete project record">
                          <button
                            onClick={() => setProjectToDelete(project.id)}
                            className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
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

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={projectToDelete !== null}
        title="Delete Land Project Listing"
        message="Are you sure you want to remove this project? This will remove the plot from public search, category listings, and interactive enquiry links. (In this prototype, you can always reset demo state from the top navigation)."
        confirmLabel="Yes, Delete Listing"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setProjectToDelete(null)}
      />
    </div>
  );
}
