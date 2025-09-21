export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  profileImage?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  profileImage?: string;
  message?: string;
}

export interface PatientRegistrationRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  emergencyContact?: string;
  bloodGroup?: string;
  medicalHistory?: string;
  profileImage?: string;
}

export interface DoctorRegistrationRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
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
  profileImage?: string;
}
