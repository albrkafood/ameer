export type Language = 'en' | 'ur' | 'ps';

export type ServiceCategory = 'building' | 'road' | 'society' | 'machinery';

export interface Project {
  id: string;
  title: string;
  titleUr?: string;
  titlePs?: string;
  category: ServiceCategory;
  client: string; // e.g. C&W Department, Capital Development Authority, NHA, Private Housing Society
  location: string;
  contractValue: string;
  completionYear: string;
  status: 'Completed' | 'Ongoing' | 'Under Bidding';
  description: string;
  specifications: {
    label: string;
    value: string;
  }[];
  imageUrl: string;
  highlights: string[];
}

export interface Equipment {
  id: string;
  name: string;
  category: 'Excavators & Earthmovers' | 'Asphalt & Paving' | 'Compaction & Rollers' | 'Concrete & Batching' | 'Transport & Logistics';
  model: string;
  units: number;
  capacity: string;
  status: 'Operational / On Site' | 'Available for Rent' | 'Under Maintenance';
  iconName: string;
}

export interface Certification {
  id: string;
  title: string;
  authority: string;
  licenseNo: string;
  validity: string;
  category: string;
  description: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface CostEstimateInput {
  projectType: 'road' | 'building' | 'society';
  scale: number; // Km for roads, SqFt for buildings, Acres for society
  qualityGrade: 'standard' | 'premium' | 'government_spec';
  includeEarthwork: boolean;
  includeUtilities: boolean;
  includeLandscaping: boolean;
}

export interface CostEstimateResult {
  estimatedTotalMin: number;
  estimatedTotalMax: number;
  currency: string;
  breakdown: {
    item: string;
    costMin: number;
    costMax: number;
  }[];
  timelineMonths: number;
}
