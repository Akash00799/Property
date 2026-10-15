"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Megaphone,
  BookOpen,
  Users,
  Image as ImageIcon,
  Settings,
  Compass,
  ExternalLink,
  LogOut,
  ShieldCheck,
  ChevronRight,
  X,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

function AdminSidebarComponent({
  mobileOpen = false,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { enquiries, advertisements, projects } = useAdminData();

  // Memoize counts to avoid re-filtering on unrelated state changes
  const newEnquiriesCount = useMemo(
    () => enquiries.filter((e) => e.status === "New").length,
    [enquiries]
  );
  const publishedAdsCount = useMemo(
    () => advertisements.filter((a) => a.status === "published").length,
    [advertisements]
  );
  const projectsCount = projects.length;

  const navItems = useMemo(
    () => [
      {
        href: "/admin",
        label: "Dashboard",
        icon: LayoutDashboard,
        exact: true,
      },
      {
        href: "/admin/projects",
        label: "Projects & Plots",
        icon: Building2,
        count: projectsCount,
      },
      {
        href: "/admin/advertisements",
        label: "Homepage Ads",
        icon: Megaphone,
        count: publishedAdsCount,
      },
      {
        href: "/admin/catalogues",
        label: "Catalogues Library",
        icon: BookOpen,
      },
      {
        href: "/admin/enquiries",
        label: "Enquiries & Leads",
        icon: Users,
        badge: newEnquiriesCount > 0 ? `${newEnquiriesCount} New` : undefined,
        badgeColor: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
      },
      {
        href: "/admin/media",
        label: "Media Assets",
        icon: ImageIcon,
      },
      {
        href: "/admin/settings",
        label: "Website Settings",
        icon: Settings,
      },
    ],
    [projectsCount, publishedAdsCount, newEnquiriesCount]
  );

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#07140F] text-[#FAF8F5] border-r border-[#C8A870]/20 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#C8A870]/15 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded bg-gradient-to-br from-[#DFBE82] to-[#8F6F3B] p-[1px] flex items-center justify-center shadow-md">
            <div className="w-full h-full bg-[#07140F] flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#C8A870] group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-lg font-bold tracking-wider text-white">
                TERRA<span className="text-[#C8A870] font-light">FIRMA</span>
              </span>
              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#C8A870]/20 text-[#DFBE82] font-mono border border-[#C8A870]/30">
                ADMIN
              </span>
            </div>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">
              Management Portal
            </p>
          </div>
        </Link>

        {/* Mobile Close Button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-[#C8A870]/60">
          Core Management
        </div>

        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? "bg-[#C8A870]/20 text-[#FAF8F5] border border-[#C8A870]/40 font-semibold shadow-sm"
                  : "text-stone-300 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? "text-[#DFBE82]" : "text-stone-400 group-hover:text-[#C8A870]"
                  }`}
                />
                <span>{item.label}</span>
              </div>

              <div className="flex items-center gap-2">
                {item.badge && (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
                {item.count !== undefined && !item.badge && (
                  <span className="text-[10px] font-mono text-stone-400 px-1.5 py-0.5 rounded bg-white/5">
                    {item.count}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#DFBE82]" />}
              </div>
            </Link>
          );
        })}

        <div className="pt-6 px-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-[#C8A870]/60">
          Public Website
        </div>

        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-stone-300 hover:text-white hover:bg-white/5 transition-all group"
        >
          <div className="flex items-center gap-3">
            <Compass className="w-4 h-4 text-stone-400 group-hover:text-[#C8A870]" />
            <span>View Public Website</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-stone-500 group-hover:text-stone-300" />
        </Link>
      </nav>

      {/* Admin User Footer Card */}
      <div className="p-4 border-t border-[#C8A870]/15 bg-[#050E0B]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#DFBE82] to-[#8F6F3B] flex items-center justify-center text-[#07140F] font-bold text-xs shadow">
              AD
            </div>
            <div>
              <p className="text-xs font-semibold text-white truncate max-w-[120px]">
                Administrator
              </p>
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                <ShieldCheck className="w-3 h-3" />
                <span>Super Admin</span>
              </div>
            </div>
          </div>

          <Link
            href="/admin/login"
            className="p-2 text-stone-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 flex-shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(AdminSidebarComponent);
