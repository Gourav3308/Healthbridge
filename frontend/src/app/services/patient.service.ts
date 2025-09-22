import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient, PatientUpdateRequest } from '../models/patient.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = environment.apiUrl;

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
