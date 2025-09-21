export interface Appointment {
  id: number;
  patient: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth?: string;
    gender?: string;
    bloodGroup?: string;
    profileImage?: string;
    fullName?: string;
    user?: {
      firstName: string;
      lastName: string;
      phone: string;
    };
  };
  doctor: {
    id: number;
    firstName: string;
    lastName: string;
    specialization: string;
    hospitalAffiliation: string;
    consultationFee: number;
  };
  appointmentDate: string;
  appointmentTime: string;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  reasonForVisit: string;
  symptoms?: string;
  appointmentType: string;
  consultationFee: number;
  paymentId?: string;
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  patientPhone: string;
  patientEmail: string;
  emergencyContact?: string;
  medicalHistory?: string;
  isFirstVisit: boolean;
  emailSent: boolean;
  createdAt: string;
  updatedAt: string;
  
  // Legacy properties for backward compatibility
  doctorName?: string;
  patientName?: string;
  specialization?: string;
  hospital?: string;
  phone?: string;
  notes?: string;
  prescription?: string;
}

export interface AppointmentSlot {
  id: number;
  slotTime: string;
  endTime: string;
  status: SlotStatus;
  bookedCount: number;
  maxCapacity: number;
  isAvailable: boolean;
}

export interface DoctorSchedule {
  id: number;
  doctorId: number;
  scheduleDate: string;
  startTime: string;
  endTime: string;
  slotDurationMinutes: number;
  maxPatientsPerSlot: number;
  status: ScheduleStatus;
  breakStartTime?: string;
  breakEndTime?: string;
  notes?: string;
}

export interface AppointmentRequest {
  doctorId: number;
  appointmentDate: string;
  appointmentTime: string;
  reasonForVisit: string;
  contactNumber?: string;
}

export interface AppointmentBookingRequest {
  doctorId: number;
  slotId: number;
  reasonForVisit: string;
  symptoms?: string;
  appointmentType: string;
  isFirstVisit: boolean;
  patientPhone: string;
  patientEmail: string;
  emergencyContact?: string;
  medicalHistory?: string;
}

export interface PaymentOrderResponse {
  appointmentId: number;
  paymentOrder: {
    orderId: string;
    amount: number;
    currency: string;
    keyId: string;
  };
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  consultationFee: number;
}

export interface PaymentVerificationRequest {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export type AppointmentStatus = 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export type SlotStatus = 'AVAILABLE' | 'BOOKED' | 'BLOCKED' | 'CANCELLED';

export type ScheduleStatus = 'AVAILABLE' | 'UNAVAILABLE' | 'BLOCKED' | 'HOLIDAY';

export interface AppointmentFormData {
  selectedDate: string;
  selectedSlot: AppointmentSlot | null;
  reasonForVisit: string;
  symptoms: string;
  appointmentType: string;
  isFirstVisit: boolean;
  patientPhone: string;
  emergencyContact: string;
  medicalHistory: string;
}