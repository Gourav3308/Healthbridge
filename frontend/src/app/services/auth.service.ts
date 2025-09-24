import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthRequest, AuthResponse, DoctorRegistrationRequest, PatientRegistrationRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenValidationCache = new Map<string, boolean>();

  constructor(private http: HttpClient) {
    // Check if user is logged in on service initialization
    const token = this.getToken();
    if (token) {
      // Try to get full user data from localStorage first
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          this.currentUserSubject.next(userData);
        } catch (error) {
          // Fallback to token decode if localStorage fails
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            this.currentUserSubject.next({
              id: payload.userId,
              email: payload.sub,
              role: payload.role
            });
          } catch (tokenError) {
            this.logout();
          }
        }
      } else {
        // No stored user data, decode token
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          this.currentUserSubject.next({
            id: payload.userId,
            email: payload.sub,
            role: payload.role
          });
        } catch (error) {
          this.logout();
        }
      }
    }
  }

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            const userData = {
              id: response.id,
              email: response.email,
              firstName: response.firstName,
              lastName: response.lastName,
              role: response.role,
              profileImage: response.profileImage,
              profileImageUrl: response.profileImage // Add compatibility field
            };
            localStorage.setItem('currentUser', JSON.stringify(userData));
            this.currentUserSubject.next(userData);
          }
        })
      );
  }

  registerPatient(data: PatientRegistrationRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register/patient`, data)
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            const userData = {
              id: response.id,
              email: response.email,
              firstName: response.firstName,
              lastName: response.lastName,
              role: response.role,
              profileImage: response.profileImage,
              profileImageUrl: response.profileImage // Add compatibility field
            };
            localStorage.setItem('currentUser', JSON.stringify(userData));
            this.currentUserSubject.next(userData);
          }
        })
      );
  }

  registerDoctor(data: DoctorRegistrationRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register/doctor`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  getCurrentUser(): any {
    const currentUser = this.currentUserSubject.value;
    console.log('getCurrentUser - from subject:', currentUser);
    
    if (currentUser) {
      return currentUser;
    }
    
    // Try to get from localStorage
    const storedUser = localStorage.getItem('currentUser');
    console.log('getCurrentUser - from localStorage:', storedUser);
    
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        console.log('getCurrentUser - parsed userData:', userData);
        this.currentUserSubject.next(userData);
        return userData;
      } catch (e) {
        console.error('Error parsing stored user data:', e);
      }
    }
    
    console.log('getCurrentUser - returning null');
    return null;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user && user.role === role;
  }

  checkEmailAvailability(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/auth/check-email?email=${email}`);
  }

  checkLicenseAvailability(licenseNumber: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/auth/check-license?licenseNumber=${licenseNumber}`);
  }

  // Google OAuth2 Methods
  loginWithGoogle(): void {
    console.log('Initiating OAuth');
    
    // Redirect to our custom OAuth endpoint
    const backendUrl = environment.apiUrl.replace('/api', '');
    window.location.href = `${backendUrl}/auth/google`;
  }

  handleOAuth2Callback(token: string, userData: any): void {
    if (token) {
      localStorage.setItem('token', token);
      // Ensure profileImageUrl compatibility
      if (userData.profileImage && !userData.profileImageUrl) {
        userData.profileImageUrl = userData.profileImage;
      }
      localStorage.setItem('currentUser', JSON.stringify(userData));
      this.currentUserSubject.next(userData);
    }
  }

  // Forgot Password Methods
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/reset-password`, { 
      token, 
      newPassword 
    });
  }

  // Method to update current user data and trigger reactive updates
  updateCurrentUser(userData: any): void {
    this.currentUserSubject.next(userData);
  }
}
