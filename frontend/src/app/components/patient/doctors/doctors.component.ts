import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Doctor } from '../../../models/doctor.model';
import { AuthService } from '../../../services/auth.service';
import { DoctorService } from '../../../services/doctor.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-patient-doctors',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FooterComponent, HeaderComponent],
  template: `
    <!-- Dynamic 3D Header -->
    <app-header></app-header>

    <div class="doctors-container" style="margin-top: 70px;">
      <div class="container">
        <!-- Header -->
        <div class="page-header mb-4">
          <div class="d-flex align-items-center mb-3">
            <button class="btn btn-outline-secondary me-3" (click)="goBack()">
              <i class="fas fa-arrow-left me-2"></i>Back
            </button>
            <div>
              <h1 class="mb-1">Find Doctors</h1>
              <p class="text-muted mb-0">Search and book appointments with verified healthcare professionals</p>
            </div>
          </div>
        </div>

        <!-- Search Filters -->
        <div class="search-section card mb-4">
          <div class="card-body">
            <form [formGroup]="searchForm" (ngSubmit)="searchDoctors()">
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="form-label">Search by Name or Keyword</label>
                    <input type="text" class="form-control" formControlName="keyword" 
                           placeholder="Doctor name, hospital, etc.">
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label class="form-label">Specialization</label>
                    <select class="form-control" formControlName="specialization">
                      <option value="">All Specializations</option>
                      <option *ngFor="let spec of specializations" [value]="spec">{{ spec }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label class="form-label">City</label>
                    <select class="form-control" formControlName="city">
                      <option value="">All Cities</option>
                      <option *ngFor="let city of cities" [value]="city">{{ city }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-group">
                    <label class="form-label">&nbsp;</label>
                    <button type="submit" class="btn btn-primary w-100">
                      <i class="fas fa-search me-2"></i>Search
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Doctors List -->
        <div class="doctors-list">
          <div class="row">
            <div class="col-lg-4 col-md-6 mb-4" *ngFor="let doctor of doctors">
              <div class="doctor-card card h-100">
                <div class="card-body">
                  <div class="doctor-header d-flex align-items-center mb-3">
                    <div class="doctor-avatar me-3">
                      <img [src]="getDoctorImageUrl(doctor)" 
                           alt="Dr. {{ doctor.firstName }} {{ doctor.lastName }}" 
                           class="rounded-circle"
                           style="width: 50px; height: 50px; object-fit: cover; border: 2px solid var(--primary-color);">
                    </div>
                    <div>
                      <h5 class="doctor-name mb-1">Dr. {{ doctor.firstName }} {{ doctor.lastName }}</h5>
                      <p class="doctor-specialization text-muted mb-0">{{ doctor.specialization }}</p>
                    </div>
                  </div>
                  
                  <div class="doctor-info">
                    <div class="info-item d-flex align-items-center mb-2">
                      <i class="fas fa-graduation-cap me-2 text-muted"></i>
                      <span class="text-sm">{{ doctor.experienceYears }} years experience</span>
                    </div>
                    <div class="info-item d-flex align-items-center mb-2">
                      <i class="fas fa-hospital me-2 text-muted"></i>
                      <span class="text-sm">{{ doctor.hospitalAffiliation || 'Not specified' }}</span>
                    </div>
                    <div class="info-item d-flex align-items-center mb-2">
                      <i class="fas fa-map-marker-alt me-2 text-muted"></i>
                      <span class="text-sm">{{ doctor.city || 'Not specified' }}</span>
                    </div>
                    <div class="info-item d-flex align-items-center mb-3">
                      <i class="fas fa-rupee-sign me-2 text-muted"></i>
                      <span class="text-sm">₹{{ doctor.consultationFee }} consultation</span>
                    </div>
                  </div>
                  
                  <div class="doctor-rating mb-3">
                    <div class="d-flex align-items-center">
                      <div class="stars me-2">
                        <i class="fas fa-star text-warning" *ngFor="let star of [1,2,3,4,5]; let i = index" 
                           [class.text-muted]="i >= 4"></i>
                      </div>
                      <span class="text-sm text-muted">({{ getReviewCount(doctor) }} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div class="card-footer bg-transparent">
                  <div class="d-grid gap-2">
                    <button class="btn btn-outline-info" (click)="viewDoctorDetails(doctor)">
                      <i class="fas fa-info-circle me-2"></i>View Details
                    </button>
                    <button class="btn btn-primary" (click)="bookAppointment(doctor)">
                      <i class="fas fa-calendar-plus me-2"></i>Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- No Results -->
          <div *ngIf="doctors.length === 0 && !isLoading" class="no-results text-center py-5">
            <i class="fas fa-search text-muted" style="font-size: 4rem; margin-bottom: 1rem;"></i>
            <h4>No doctors found</h4>
            <p class="text-muted">Try adjusting your search criteria</p>
          </div>
          
          <!-- Loading -->
          <div *ngIf="isLoading" class="loading text-center py-5">
            <div class="loading-spinner"></div>
            <p class="text-muted mt-3">Searching for doctors...</p>
          </div>
        </div>
      </div>
    </div>
    
    <app-footer></app-footer>
  `,
  styles: [`
    .nav-hover {
      transition: all 0.3s ease;
    }
    
    .nav-hover:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }
    
    .active-page {
      background: rgba(255, 255, 255, 0.15) !important;
    }
    
    .navbar-toggler:focus {
      box-shadow: none;
    }
    
    .doctors-container {
      padding: 2rem 0;
      min-height: calc(100vh - 8rem);
    }
    
    .doctor-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: none;
      box-shadow: var(--shadow-sm);
    }
    
    .doctor-card:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-lg);
    }
    
    .doctor-avatar {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    
    .stars i {
      font-size: 0.875rem;
    }
    
    .text-sm {
      font-size: 0.875rem;
    }
    
    .info-item i {
      width: 16px;
    }
    
    @media (max-width: 768px) {
      .doctors-container {
        padding: 1rem 0;
      }
    }
  `]
})
export class DoctorsComponent implements OnInit {
  searchForm: FormGroup;
  doctors: Doctor[] = [];
  specializations: string[] = [];
  cities: string[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private authService: AuthService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      keyword: [''],
      specialization: [''],
      city: ['']
    });
  }

  ngOnInit(): void {
    this.loadDoctors();
    this.loadFilters();
  }

  loadDoctors(): void {
    this.isLoading = true;
    this.doctorService.getApprovedDoctors().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
        this.isLoading = false;
        console.log('Loaded approved doctors:', doctors);
      },
      error: (error) => {
        console.error('Error loading approved doctors:', error);
        this.doctors = [];
        this.isLoading = false;
      }
    });
  }

  loadFilters(): void {
    // Load specializations for filter dropdown
    this.doctorService.getSpecializations().subscribe({
      next: (specializations) => {
        this.specializations = specializations;
      },
      error: (error) => {
        console.error('Error loading specializations:', error);
      }
    });

    // Load cities for filter dropdown
    this.doctorService.getCities().subscribe({
      next: (cities) => {
        this.cities = cities;
      },
      error: (error) => {
        console.error('Error loading cities:', error);
      }
    });
  }

  searchDoctors(): void {
    this.isLoading = true;
    const formValue = this.searchForm.value;
    
    this.doctorService.searchDoctors({
      keyword: formValue.keyword,
      specialization: formValue.specialization,
      city: formValue.city
    }).subscribe({
      next: (doctors) => {
        this.doctors = doctors;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error searching doctors:', error);
        this.doctors = [];
        this.isLoading = false;
      }
    });
  }

  bookAppointment(doctor: Doctor): void {
    // Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      // Store doctor info for after login
      localStorage.setItem('selectedDoctor', JSON.stringify(doctor));
      // Redirect to login with return URL
      this.router.navigate(['/auth/login'], { 
        queryParams: { returnUrl: '/patient/doctors', action: 'book', doctorId: doctor.id }
      });
      return;
    }

    // Check if user is a patient
    if (!this.authService.hasRole('PATIENT')) {
      alert('Only patients can book appointments. Please register as a patient.');
      this.router.navigate(['/auth/register']);
      return;
    }

    // Navigate to appointment booking
    this.router.navigate(['/patient/book-appointment'], { 
      queryParams: { doctorId: doctor.id }
    });
  }

  viewDoctorDetails(doctor: Doctor): void {
    // Navigate to doctor details page
    this.router.navigate(['/patient/doctor-details', doctor.id]);
  }

  getReviewCount(doctor: Doctor): number {
    return doctor.reviews ? doctor.reviews.length : 0;
  }

  getDoctorImageUrl(doctor: any): string {
    // Check if doctor has a profile image URL
    if (doctor?.profileImageUrl) {
      // If it's a relative URL, make it absolute
      if (doctor.profileImageUrl.startsWith('/')) {
        return 'http://10.45.254.162:8081' + doctor.profileImageUrl;
      }
      return doctor.profileImageUrl;
    }
    
    // Fallback to default avatar
    return 'https://via.placeholder.com/50x50/28a745/ffffff?text=Dr.' + (doctor.firstName?.charAt(0) || 'D');
  }

  goBack(): void {
    // Check if user is logged in to determine where to go back
    if (this.authService.isLoggedIn()) {
      const user = this.authService.getCurrentUser();
      if (user.role === 'PATIENT') {
        this.router.navigate(['/patient/dashboard']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }
}
