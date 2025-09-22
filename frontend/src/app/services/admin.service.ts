import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';
import { Patient, PatientUpdateRequest } from '../models/patient.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPendingDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/admin/doctors/pending`);
  }

  getApprovedDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/admin/doctors/approved`);
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/admin/doctors/${id}`);
  }

  approveDoctor(id: number): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.apiUrl}/admin/doctors/${id}/approve`, {});
  }

  rejectDoctor(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/admin/doctors/${id}/reject`);
  }

  getPendingDoctorsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/admin/stats/doctors/pending`);
  }

  getApprovedDoctorsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/admin/stats/doctors/approved`);
  }

  // Doctor Management CRUD Operations
  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/admin/doctors`);
  }

  updateDoctor(id: number, updateData: any): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/admin/doctors/${id}`, updateData);
  }

  deleteDoctor(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/admin/doctors/${id}`, { responseType: 'text' });
  }

  toggleDoctorStatus(id: number): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.apiUrl}/admin/doctors/${id}/toggle-status`, {});
  }

  // Patient Management CRUD Operations
  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/admin/patients`);
  }

  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/admin/patients/${id}`);
  }

  updatePatient(id: number, updateData: PatientUpdateRequest): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/admin/patients/${id}`, updateData);
  }

  deletePatient(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/admin/patients/${id}`, { responseType: 'text' });
  }

  togglePatientStatus(id: number): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/admin/patients/${id}/toggle-status`, {});
  }

  // Statistics
  getTotalPatientsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/admin/stats/patients/total`);
  }

  getActivePatientsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/admin/stats/patients/active`);
  }

  getTotalDoctorsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/admin/stats/doctors/total`);
  }
}
