export interface Vehicle {
  id: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  vin: string;
  engineNumber: string;
  color: string;
  registrationNumber?: string;
}

export interface PDIChecklist {
  id: string;
  vehicleId: string;
  date: string;
  inspector: string;
  status: 'pending' | 'in-progress' | 'completed';
  vehicle: Vehicle;
  items: PDIChecklistItem[];
  notes: string;
  images: string[];
}

export interface PDIChecklistItem {
  id: string;
  category: string;
  name: string;
  status: 'pass' | 'fail' | 'na';
  notes?: string;
  images?: string[];
}

export interface VehicleMake {
  id: string;
  name: string;
  logo?: string;
  models: VehicleModel[];
}

export interface VehicleModel {
  id: string;
  makeId: string;
  name: string;
  variants: VehicleVariant[];
}

export interface VehicleVariant {
  id: string;
  modelId: string;
  name: string;
  price: number;
  features: string[];
}

export interface PDICategory {
  id: string;
  name: string;
  description: string;
  items: PDICategoryItem[];
}

export interface PDICategoryItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  isRequired: boolean;
  requiresImage: boolean;
  requiresNotes: boolean;
} 