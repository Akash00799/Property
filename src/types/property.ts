export interface PlotDimensions {
  plotAreaSqFt: number;
  plotAreaSqYards: number;
  plotAreaGaj: number;
  frontageFt: number;
  depthFt: number;
  facing: 'North' | 'East' | 'North-East' | 'South-East' | 'West';
  boundaryDemarcated: boolean;
  roadWidthFt?: number;
}

export interface PlotPrice {
  total: number; // in base currency (e.g. INR / USD)
  formatted: string;
  pricePerSqFt: number;
  bookingAmountFormatted: string;
}

export interface PlotLocation {
  locality: string;
  city: string;
  state: string;
  landmark: string;
  corridor: string;
}

export interface PlotLegalInfo {
  titleStatus: string;
  approvalStatus: string;
  zoningType: string;
  possessionTime: string;
  disclaimer: string;
}

export interface PlotAmenity {
  name: string;
  description: string;
  iconName: string;
}

export interface PlotConnectivity {
  destination: string;
  distance: string;
  driveTime: string;
}

export interface PropertyPlot {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'JDA Approved Township' | 'Gated Society Plots' | 'Ring Road Growth Corridor' | 'Aravalli Hillview Parcels' | 'Luxury Farmhouse Land';
  status: 'Available' | 'Phase 1 Fast Filling' | 'Pre-Launch Preview' | 'Reserved' | 'Limited Availability';
  location: PlotLocation;
  price: PlotPrice;
  dimensions: PlotDimensions;
  heroImage: string;
  galleryImages: string[];
  overview: string;
  story: string;
  highlights: string[];
  amenities: PlotAmenity[];
  infrastructure: string[];
  connectivity: PlotConnectivity[];
  legal: PlotLegalInfo;
  investmentTier: 'Prime Core' | 'High Growth Corridor' | 'Generational Wealth';
  projectMasterplanImage: string;
  isFeatured?: boolean;
}

export interface PropertyFilterState {
  searchQuery: string;
  city: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  facing: string;
  sortBy: 'price-asc' | 'price-desc' | 'area-asc' | 'area-desc' | 'featured';
}
