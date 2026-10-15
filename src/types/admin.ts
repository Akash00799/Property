export type EnquiryStatus =
  | "New"
  | "Contacted"
  | "Site Visit Scheduled"
  | "Interested"
  | "Converted"
  | "Closed";

export type EnquiryType =
  | "Site Visit"
  | "Brochure Download"
  | "Price Request"
  | "Callback"
  | "General Query";

export interface EnquiryItem {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  projectId?: string;
  projectSlug?: string;
  projectTitle?: string;
  enquiryType: EnquiryType;
  date: string; // ISO date
  preferredContactMethod: "Phone" | "WhatsApp" | "Email";
  status: EnquiryStatus;
  budget?: string;
  plotSizePref?: string;
  visitDate?: string;
  source?: string;
  internalNotes: {
    id: string;
    text: string;
    author: string;
    createdAt: string;
  }[];
}

export type MediaCategory =
  | "blueprint"
  | "banner"
  | "aerial"
  | "gallery"
  | "map"
  | "brand";

export interface MediaAssetItem {
  id: string;
  title: string;
  filename: string;
  url: string;
  category: MediaCategory;
  fileSizeFormatted: string;
  dimensions: string;
  uploadedAt: string;
  associatedProjects: string[];
}

export interface WebsiteSettings {
  companyName: string;
  tagline: string;
  logoUrl: string;
  contactPhone: string;
  whatsappNumber: string;
  salesEmail: string;
  officeAddress: string;
  officeCity: string;
  officePincode: string;
  workingHours: string;
  reraNumber: string;
  jdaNodalUrl: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    youtube: string;
    linkedin: string;
  };
  announcementBarEnabled: boolean;
  announcementBarText: string;
  announcementBarLink: string;
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  defaultMetaKeywords: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Land Portfolio Manager" | "Sales Executive";
  avatarUrl: string;
}
