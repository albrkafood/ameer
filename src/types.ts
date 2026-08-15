export type Language = 'en' | 'ur' | 'ps';

export type ServiceCategory = 'building' | 'road' | 'society' | 'irrigation' | 'machinery';

export interface StaffMember {
  sNo: number;
  name: string;
  position: string;
  department?: string;
}

export interface ExpertiseItem {
  id: number;
  name: string;
  iconName: string;
  description: string;
}

export interface ServicePillar {
  id: string;
  title: string;
  category: string;
  items: string[];
}

export interface Project {
  sNo?: number;
  id: string;
  title: string;
  titleUr?: string;
  titlePs?: string;
  category: ServiceCategory;
  client: string; // e.g. C&W Department, PKHA, Irrigation Dept, TMA, Private
  location: string;
  contractValue: string;
  scopeOfWork: string;
  completionYear?: string;
  status: 'Completed' | 'In Progress' | 'Finishing Work in Progress' | '70% Completed' | '90% Completed';
  description?: string;
  specifications?: {
    label: string;
    value: string;
  }[];
  imageUrl: string;
  highlights?: string[];
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
  serialNo?: string;
  specializationCodes?: string[];
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
