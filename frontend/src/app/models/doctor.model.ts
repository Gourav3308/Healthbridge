export interface Doctor {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  licenseNumber: string;
  specialization: string;
  qualification: string;
  experienceYears: number;
  consultationFee: number;
  about?: string;
  hospitalAffiliation?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  isApproved: boolean;
  approvalDate?: string;
  approvedBy?: string;
  profileImageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  fullName?: string;
  role?: string;
  reviews?: any[];
  availabilities?: any[];
  appointments?: any[];
}

export interface Specialization {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface DoctorUpdateRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  qualification?: string;
  experienceYears?: number;
  consultationFee?: number;
  about?: string;
  hospitalAffiliation?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  profileImageUrl?: string;
}
