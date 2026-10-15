"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { PropertyPlot } from "@/types/property";
import { DEMO_PROPERTIES } from "@/data/properties";
import { PromotionItem, PROMOTIONS_DATA } from "@/data/promotions";
import { ProjectCatalogueItem, PROJECTS_CATALOGUE } from "@/data/projectsCatalogue";
import { EnquiryItem, MediaAssetItem, WebsiteSettings } from "@/types/admin";

interface AdminDataContextType {
  // Projects (Public listings & plots)
  projects: PropertyPlot[];
  addProject: (project: PropertyPlot) => void;
  updateProject: (id: string, updated: Partial<PropertyPlot>) => void;
  deleteProject: (id: string) => void;

  // Advertisements & Promotions
  advertisements: PromotionItem[];
  addAdvertisement: (ad: PromotionItem) => void;
  updateAdvertisement: (id: string, updated: Partial<PromotionItem>) => void;
  deleteAdvertisement: (id: string) => void;

  // Full-Screen Architectural Catalogues
  catalogues: ProjectCatalogueItem[];
  updateCatalogue: (id: string, updated: Partial<ProjectCatalogueItem>) => void;

  // Customer Enquiries / Leads CRM
  enquiries: EnquiryItem[];
  updateEnquiryStatus: (id: string, status: EnquiryItem["status"]) => void;
  addEnquiryNote: (id: string, text: string) => void;
  deleteEnquiry: (id: string) => void;
  addEnquiry: (enquiry: Omit<EnquiryItem, "id" | "date" | "internalNotes">) => void;

  // Media Library
  mediaAssets: MediaAssetItem[];
  addMediaAsset: (asset: MediaAssetItem) => void;
  deleteMediaAsset: (id: string) => void;

  // Website Global Settings
  settings: WebsiteSettings;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;

  // Reset to original demo data
  resetToDefaults: () => void;
}

const DEFAULT_SETTINGS: WebsiteSettings = {
  companyName: "TERRA FIRMA",
  tagline: "Residential Plot Estates & Sovereign Land Advisory",
  logoUrl: "/images/logo.png",
  contactPhone: "+91 (800) 123-4567",
  whatsappNumber: "+91 98290 12345",
  salesEmail: "concierge@terrafirma.in",
  officeAddress: "Plot 14, Royal Palm Boulevard, Tonk Road",
  officeCity: "Jaipur, Rajasthan",
  officePincode: "302015",
  workingHours: "Monday – Sunday: 9:00 AM – 7:30 PM",
  reraNumber: "RAJ/RERA/P/2026/9821",
  jdaNodalUrl: "https://jda.rajasthan.gov.in",
  socialLinks: {
    instagram: "https://instagram.com/terrafirma_jaipur",
    facebook: "https://facebook.com/terrafirma.jaipur",
    youtube: "https://youtube.com/@terrafirma_land",
    linkedin: "https://linkedin.com/company/terrafirma-estates",
  },
  announcementBarEnabled: true,
  announcementBarText:
    "New Phase at Royal Palm Enclave (Jagatpura, Jaipur) — 100 to 250 Gaj JDA Patta plots now open.",
  announcementBarLink: "/plots/plot-01",
  defaultMetaTitle:
    "TERRA FIRMA | JDA Approved Residential Plots in Jaipur, Rajasthan",
  defaultMetaDescription:
    "Exclusive collection of 100% JDA approved residential plots, society patta properties, and investment land across prime growth corridors in Jaipur, Rajasthan.",
  defaultMetaKeywords:
    "JDA approved plots, Jaipur residential plots, society patta plots Jaipur, Jagatpura plots, Ajmer road plots",
};

const INITIAL_ENQUIRIES: EnquiryItem[] = [
  {
    id: "enq-101",
    customerName: "Rameshwar Agarwal",
    phone: "+91 98290 44521",
    email: "rameshwar.agarwal@gmail.com",
    projectSlug: "the-royal-enclave-jagatpura",
    projectTitle: "The Royal Enclave — Jagatpura",
    enquiryType: "Site Visit",
    date: "2026-10-12T10:30:00Z",
    preferredContactMethod: "Phone",
    status: "Site Visit Scheduled",
    budget: "₹80 Lakh – ₹1.2 Cr",
    plotSizePref: "200 Gaj",
    internalNotes: [
      {
        id: "note-1",
        text: "Requested private chauffeur pickup from Malviya Nagar on Saturday 11 AM.",
        author: "Pooja Sharma (Sales)",
        createdAt: "2026-10-12T11:00:00Z",
      },
    ],
  },
  {
    id: "enq-102",
    customerName: "Col. Vikramaditya Rathore",
    phone: "+91 94140 18832",
    email: "vikram.rathore@outlook.com",
    projectSlug: "aravalli-ridge-kukas-delhi-road",
    projectTitle: "Aravalli Ridge Low-Density Estate",
    enquiryType: "Brochure Download",
    date: "2026-10-12T08:15:00Z",
    preferredContactMethod: "WhatsApp",
    status: "New",
    budget: "₹1.5 Cr – ₹2.5 Cr",
    plotSizePref: "500 Gaj",
    internalNotes: [],
  },
  {
    id: "enq-103",
    customerName: "Dr. Ananya Mathur",
    phone: "+91 98281 77390",
    email: "dr.ananya@fortishealthcare.com",
    projectSlug: "sunrise-city-sirsi-road",
    projectTitle: "Sunrise City Gated Scheme",
    enquiryType: "Price Request",
    date: "2026-10-11T16:45:00Z",
    preferredContactMethod: "Phone",
    status: "Contacted",
    budget: "₹50 Lakh – ₹75 Lakh",
    plotSizePref: "150 Gaj",
    internalNotes: [
      {
        id: "note-2",
        text: "Sent JDA master layout and bank loan eligibility chart via WhatsApp.",
        author: "Nitin Joshi (Advisory)",
        createdAt: "2026-10-11T17:15:00Z",
      },
    ],
  },
  {
    id: "enq-104",
    customerName: "Sunil K. Singhania",
    phone: "+91 97840 92011",
    email: "sunil.singhania@apexfin.com",
    projectSlug: "heritage-palms-tonk-road",
    projectTitle: "Heritage Palms Township",
    enquiryType: "General Query",
    date: "2026-10-10T14:20:00Z",
    preferredContactMethod: "Email",
    status: "Interested",
    budget: "Above ₹2.0 Cr",
    plotSizePref: "1 Bigha Farmstead",
    internalNotes: [
      {
        id: "note-3",
        text: "Interested in Phase 3 pre-launch allotment. High net worth client.",
        author: "Devendra Singh (Senior Director)",
        createdAt: "2026-10-10T15:00:00Z",
      },
    ],
  },
  {
    id: "enq-105",
    customerName: "Harish Chandra Verma",
    phone: "+91 99280 33144",
    email: "hcverma.jaipur@yahoo.com",
    projectSlug: "the-royal-enclave-jagatpura",
    projectTitle: "The Royal Enclave — Jagatpura",
    enquiryType: "Site Visit",
    date: "2026-10-09T11:00:00Z",
    preferredContactMethod: "Phone",
    status: "Converted",
    budget: "₹95 Lakh",
    plotSizePref: "180 Gaj",
    internalNotes: [
      {
        id: "note-4",
        text: "Token booking completed for Plot #B-14. Registry scheduled for Oct 22.",
        author: "Pooja Sharma (Sales)",
        createdAt: "2026-10-09T17:30:00Z",
      },
    ],
  },
];

const INITIAL_MEDIA: MediaAssetItem[] = [
  {
    id: "med-01",
    title: "Master Plan Blueprint CAD Layout",
    filename: "master-plan-blueprint.jpg",
    url: "/images/catalogue/master-plan-blueprint.jpg",
    category: "blueprint",
    fileSizeFormatted: "1.02 MB",
    dimensions: "2400 × 1600 px",
    uploadedAt: "2026-10-01",
    associatedProjects: ["The Royal Enclave", "Aravalli Greens"],
  },
  {
    id: "med-02",
    title: "Demarcated Plots On-Site Survey",
    filename: "demarcated-plots.jpg",
    url: "/images/catalogue/demarcated-plots.jpg",
    category: "aerial",
    fileSizeFormatted: "828 KB",
    dimensions: "1920 × 1080 px",
    uploadedAt: "2026-10-02",
    associatedProjects: ["Sunrise City", "Golden Crest"],
  },
  {
    id: "med-03",
    title: "Township Entrance Archway",
    filename: "entrance-archway.jpg",
    url: "/images/catalogue/entrance-archway.jpg",
    category: "banner",
    fileSizeFormatted: "931 KB",
    dimensions: "1920 × 1080 px",
    uploadedAt: "2026-10-02",
    associatedProjects: ["The Royal Enclave", "The Grand Avenues"],
  },
  {
    id: "med-04",
    title: "Regional Jaipur Arterial Transit Map",
    filename: "jaipur-location-map.jpg",
    url: "/images/catalogue/jaipur-location-map.jpg",
    category: "map",
    fileSizeFormatted: "722 KB",
    dimensions: "1800 × 1200 px",
    uploadedAt: "2026-10-03",
    associatedProjects: ["Heritage Palms", "Aravalli Ridge"],
  },
  {
    id: "med-05",
    title: "Aravalli Mountain Ridge Aerial View",
    filename: "aravalli-aerial.jpg",
    url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop",
    category: "aerial",
    fileSizeFormatted: "1.45 MB",
    dimensions: "2560 × 1440 px",
    uploadedAt: "2026-09-28",
    associatedProjects: ["Aravalli Ridge", "Maharaja Farmsteads"],
  },
  {
    id: "med-06",
    title: "Modern Paver Road Infrastructure",
    filename: "infrastructure-paver.jpg",
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
    category: "gallery",
    fileSizeFormatted: "650 KB",
    dimensions: "1600 × 1067 px",
    uploadedAt: "2026-09-25",
    associatedProjects: ["Sunrise City", "The Grand Avenues"],
  },
];

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<PropertyPlot[]>(DEMO_PROPERTIES);
  const [advertisements, setAdvertisements] = useState<PromotionItem[]>(PROMOTIONS_DATA);
  const [catalogues, setCatalogues] = useState<ProjectCatalogueItem[]>(PROJECTS_CATALOGUE);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(INITIAL_ENQUIRIES);
  const [mediaAssets, setMediaAssets] = useState<MediaAssetItem[]>(INITIAL_MEDIA);
  const [settings, setSettings] = useState<WebsiteSettings>(DEFAULT_SETTINGS);

  // Hydrate from localStorage once mounted
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem("tf_admin_projects");
      if (savedProjects) setProjects(JSON.parse(savedProjects));

      const savedAds = localStorage.getItem("tf_admin_ads");
      if (savedAds) setAdvertisements(JSON.parse(savedAds));

      const savedCatalogues = localStorage.getItem("tf_admin_catalogues");
      if (savedCatalogues) setCatalogues(JSON.parse(savedCatalogues));

      const savedEnquiries = localStorage.getItem("tf_admin_enquiries");
      if (savedEnquiries) setEnquiries(JSON.parse(savedEnquiries));

      const savedMedia = localStorage.getItem("tf_admin_media");
      if (savedMedia) setMediaAssets(JSON.parse(savedMedia));

      const savedSettings = localStorage.getItem("tf_admin_settings");
      if (savedSettings) setSettings(JSON.parse(savedSettings));
    } catch {
      // LocalStorage not available or error parsing
    }
  }, []);

  // Helper to persist updates to localStorage non-blockingly
  const saveState = useCallback((key: string, data: unknown) => {
    // Schedule localStorage write asynchronously to prevent UI thread frame drops
    setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch {
        // ignore
      }
    }, 0);
  }, []);

  // Projects CRUD
  const addProject = useCallback((project: PropertyPlot) => {
    setProjects((prev) => {
      const updated = [project, ...prev];
      saveState("tf_admin_projects", updated);
      return updated;
    });
  }, [saveState]);

  const updateProject = useCallback((id: string, updated: Partial<PropertyPlot>) => {
    setProjects((prev) => {
      const updatedList = prev.map((p) => (p.id === id ? { ...p, ...updated } : p));
      saveState("tf_admin_projects", updatedList);
      return updatedList;
    });
  }, [saveState]);

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveState("tf_admin_projects", updated);
      return updated;
    });
  }, [saveState]);

  // Advertisements CRUD
  const addAdvertisement = useCallback((ad: PromotionItem) => {
    setAdvertisements((prev) => {
      const updated = [ad, ...prev];
      saveState("tf_admin_ads", updated);
      return updated;
    });
  }, [saveState]);

  const updateAdvertisement = useCallback((id: string, updated: Partial<PromotionItem>) => {
    setAdvertisements((prev) => {
      const updatedList = prev.map((a) => (a.id === id ? { ...a, ...updated } : a));
      saveState("tf_admin_ads", updatedList);
      return updatedList;
    });
  }, [saveState]);

  const deleteAdvertisement = useCallback((id: string) => {
    setAdvertisements((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      saveState("tf_admin_ads", updated);
      return updated;
    });
  }, [saveState]);

  // Catalogues CRUD
  const updateCatalogue = useCallback((id: string, updated: Partial<ProjectCatalogueItem>) => {
    setCatalogues((prev) => {
      const updatedList = prev.map((c) => (c.id === id ? { ...c, ...updated } : c));
      saveState("tf_admin_catalogues", updatedList);
      return updatedList;
    });
  }, [saveState]);

  // Enquiries CRUD
  const updateEnquiryStatus = useCallback((id: string, status: EnquiryItem["status"]) => {
    setEnquiries((prev) => {
      const updated = prev.map((e) => (e.id === id ? { ...e, status } : e));
      saveState("tf_admin_enquiries", updated);
      return updated;
    });
  }, [saveState]);

  const addEnquiryNote = useCallback((id: string, text: string) => {
    setEnquiries((prev) => {
      const updated = prev.map((e) => {
        if (e.id !== id) return e;
        const newNote = {
          id: `note-${Date.now()}`,
          text,
          author: "Current Admin",
          createdAt: new Date().toISOString(),
        };
        return { ...e, internalNotes: [newNote, ...e.internalNotes] };
      });
      saveState("tf_admin_enquiries", updated);
      return updated;
    });
  }, [saveState]);

  const deleteEnquiry = useCallback((id: string) => {
    setEnquiries((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      saveState("tf_admin_enquiries", updated);
      return updated;
    });
  }, [saveState]);

  const addEnquiry = useCallback((enquiry: Omit<EnquiryItem, "id" | "date" | "internalNotes">) => {
    setEnquiries((prev) => {
      const newEnq: EnquiryItem = {
        ...enquiry,
        id: `enq-${Date.now()}`,
        date: new Date().toISOString(),
        internalNotes: [],
      };
      const updated = [newEnq, ...prev];
      saveState("tf_admin_enquiries", updated);
      return updated;
    });
  }, [saveState]);

  // Media CRUD
  const addMediaAsset = useCallback((asset: MediaAssetItem) => {
    setMediaAssets((prev) => {
      const updated = [asset, ...prev];
      saveState("tf_admin_media", updated);
      return updated;
    });
  }, [saveState]);

  const deleteMediaAsset = useCallback((id: string) => {
    setMediaAssets((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      saveState("tf_admin_media", updated);
      return updated;
    });
  }, [saveState]);

  // Settings
  const updateSettings = useCallback((newSettings: Partial<WebsiteSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      saveState("tf_admin_settings", updated);
      return updated;
    });
  }, [saveState]);

  // Reset demo state
  const resetToDefaults = useCallback(() => {
    setProjects(DEMO_PROPERTIES);
    setAdvertisements(PROMOTIONS_DATA);
    setCatalogues(PROJECTS_CATALOGUE);
    setEnquiries(INITIAL_ENQUIRIES);
    setMediaAssets(INITIAL_MEDIA);
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.removeItem("tf_admin_projects");
      localStorage.removeItem("tf_admin_ads");
      localStorage.removeItem("tf_admin_catalogues");
      localStorage.removeItem("tf_admin_enquiries");
      localStorage.removeItem("tf_admin_media");
      localStorage.removeItem("tf_admin_settings");
    } catch {
      // ignore
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      projects,
      addProject,
      updateProject,
      deleteProject,
      advertisements,
      addAdvertisement,
      updateAdvertisement,
      deleteAdvertisement,
      catalogues,
      updateCatalogue,
      enquiries,
      updateEnquiryStatus,
      addEnquiryNote,
      deleteEnquiry,
      addEnquiry,
      mediaAssets,
      addMediaAsset,
      deleteMediaAsset,
      settings,
      updateSettings,
      resetToDefaults,
    }),
    [
      projects,
      addProject,
      updateProject,
      deleteProject,
      advertisements,
      addAdvertisement,
      updateAdvertisement,
      deleteAdvertisement,
      catalogues,
      updateCatalogue,
      enquiries,
      updateEnquiryStatus,
      addEnquiryNote,
      deleteEnquiry,
      addEnquiry,
      mediaAssets,
      addMediaAsset,
      deleteMediaAsset,
      settings,
      updateSettings,
      resetToDefaults,
    ]
  );

  return (
    <AdminDataContext.Provider value={contextValue}>
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
}
