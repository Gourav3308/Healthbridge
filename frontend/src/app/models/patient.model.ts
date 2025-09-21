export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  emergencyContact?: string;
  bloodGroup?: string;
  medicalHistory?: string;
  profileImageUrl?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PatientUpdateRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  emergencyContact?: string;
  bloodGroup?: string;
  medicalHistory?: string;
  profileImageUrl?: string;
  isActive?: boolean;
}
