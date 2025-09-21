import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';
import { Doctor, DoctorUpdateRequest, Specialization } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://10.45.254.162:8081/api';

  constructor(private http: HttpClient) {}

  getApprovedDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/doctors/approved`);
  }

  searchDoctors(filters?: {
    keyword?: string;
    specialization?: string;
    city?: string;
    minFee?: number;
    maxFee?: number;
    minExperience?: number;
  }): Observable<Doctor[]> {
    let params = new URLSearchParams();
    
    if (filters) {
      if (filters.keyword) params.append('keyword', filters.keyword);
      if (filters.specialization) params.append('specialization', filters.specialization);
      if (filters.city) params.append('city', filters.city);
      if (filters.minFee) params.append('minFee', filters.minFee.toString());
      if (filters.maxFee) params.append('maxFee', filters.maxFee.toString());
      if (filters.minExperience) params.append('minExperience', filters.minExperience.toString());
    }

    const url = params.toString() ? `${this.apiUrl}/doctors/search?${params.toString()}` : `${this.apiUrl}/doctors/search`;
    return this.http.get<Doctor[]>(url);
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/doctors/${id}/public`);
  }

  getSpecializations(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/doctors/specializations`);
  }

  getCities(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/doctors/cities`);
  }

  getDoctorsBySpecialization(specialization: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/doctors/by-specialization/${specialization}`);
  }

  getAllSpecializationsList(): Observable<Specialization[]> {
    return this.http.get<Specialization[]>(`${this.apiUrl}/specializations`);
  }

  getProfile(): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/doctors/profile`);
  }

  updateProfile(updateData: DoctorUpdateRequest): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/doctors/profile`, updateData);
  }

  uploadProfileImage(formData: FormData): Observable<{success: boolean, imageUrl?: string}> {
    return this.http.post<{success: boolean, imageUrl?: string}>(`${this.apiUrl}/doctors/profile/upload-image`, formData);
  }

  // Appointment management methods
  getPendingAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/doctors/pending-appointments`);
  }

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/doctors/appointments`);
  }

  getAppointmentById(appointmentId: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/doctors/appointments/${appointmentId}`);
  }

  approveAppointment(appointmentId: number): Observable<string> {
    return this.http.post(`${this.apiUrl}/doctors/appointments/${appointmentId}/approve`, {}, { responseType: 'text' });
  }

  rejectAppointment(appointmentId: number): Observable<string> {
    return this.http.post(`${this.apiUrl}/doctors/appointments/${appointmentId}/reject`, {}, { responseType: 'text' });
  }
}
