import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient, PatientUpdateRequest } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://10.45.254.162:8081/api';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/patients/profile`);
  }

  updateProfile(updateData: PatientUpdateRequest): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/patients/profile`, updateData);
  }

  uploadProfileImage(formData: FormData): Observable<{success: boolean, imageUrl?: string}> {
    return this.http.post<{success: boolean, imageUrl?: string}>(`${this.apiUrl}/patients/profile/upload-image`, formData);
  }
}
