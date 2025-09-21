export interface Review {
  id: number;
  doctorId: number;
  doctorName: string;
  patientId: number;
  patientName: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  canEdit?: boolean;
}

export interface ReviewRequest {
  doctorId: number;
  rating: number;
  comment: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
}

export interface ReviewFormData {
  rating: number;
  comment: string;
}
