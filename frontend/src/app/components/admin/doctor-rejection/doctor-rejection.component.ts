import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Doctor } from '../../../models/doctor.model';
import { AdminService } from '../../../services/admin.service';
import { NotificationService } from '../../../services/notification.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-doctor-rejection',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FooterComponent, HeaderComponent],
  template: `
    <app-header></app-header>
    
    <div class="rejection-container" style="margin-top: 70px; padding: 2rem 0; min-height: calc(100vh - 8rem);">
      <div class="container">
        <!-- Header -->
        <div class="page-header mb-4">
          <div class="d-flex align-items-center mb-3">
            <button class="btn btn-outline-secondary me-3" (click)="goBack()">
              <i class="fas fa-arrow-left me-2"></i>Back to Dashboard
            </button>
            <div>
              <h1 class="mb-1">Reject Doctor Registration</h1>
              <p class="text-muted mb-0">Provide a reason for rejecting this doctor's registration</p>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div *ngIf="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3">Loading doctor information...</p>
        </div>

        <!-- Error State -->
        <div *ngIf="error" class="alert alert-danger">
          <i class="fas fa-exclamation-triangle me-2"></i>
          {{ error }}
        </div>

        <!-- Doctor Information and Rejection Form -->
        <div *ngIf="doctor && !loading" class="row">
          <!-- Doctor Information -->
          <div class="col-md-4">
            <div class="card">
              <div class="card-header bg-gradient" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <h5 class="mb-0 text-white">
                  <i class="fas fa-user-md me-2"></i>Doctor Information
                </h5>
              </div>
              <div class="card-body">
                <div class="doctor-info">
                  <div class="text-center mb-3">
                    <div class="doctor-avatar mx-auto mb-3" style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                      <i class="fas fa-user-md"></i>
                    </div>
                    <h4 class="mb-1">Dr. {{ doctor.firstName }} {{ doctor.lastName }}</h4>
                    <p class="text-muted mb-2">{{ doctor.qualification }}</p>
                    <span class="badge bg-warning">Pending Approval</span>
                  </div>
                  
                  <div class="info-item mb-3">
                    <i class="fas fa-stethoscope text-primary me-2"></i>
                    <strong>Specialization:</strong> {{ doctor.specialization }}
                  </div>
                  
                  <div class="info-item mb-3">
                    <i class="fas fa-graduation-cap text-primary me-2"></i>
                    <strong>Experience:</strong> {{ doctor.experienceYears }} years
                  </div>
                  
                  <div class="info-item mb-3">
                    <i class="fas fa-rupee-sign text-primary me-2"></i>
                    <strong>Consultation Fee:</strong> ₹{{ doctor.consultationFee }}
                  </div>
                  
                  <div class="info-item mb-3">
                    <i class="fas fa-id-card text-primary me-2"></i>
                    <strong>License:</strong> {{ doctor.licenseNumber }}
                  </div>
                  
                  <div class="info-item mb-3">
                    <i class="fas fa-hospital text-primary me-2"></i>
                    <strong>Hospital:</strong> {{ doctor.hospitalAffiliation || 'Not specified' }}
                  </div>
                  
                  <div class="info-item mb-3">
                    <i class="fas fa-envelope text-primary me-2"></i>
                    <strong>Email:</strong> {{ doctor.email }}
                  </div>
                  
                  <div class="info-item">
                    <i class="fas fa-phone text-primary me-2"></i>
                    <strong>Phone:</strong> {{ doctor.phone }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Rejection Form -->
          <div class="col-md-8">
            <div class="card">
              <div class="card-header bg-gradient" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                <h5 class="mb-0 text-white">
                  <i class="fas fa-times-circle me-2"></i>Rejection Details
                </h5>
              </div>
              <div class="card-body">
                <form (ngSubmit)="submitRejection()" #rejectionForm="ngForm">
                  <div class="mb-4">
                    <label class="form-label fw-semibold">
                      <i class="fas fa-exclamation-triangle text-warning me-2"></i>
                      Reason for Rejection *
                    </label>
                    <textarea 
                      class="form-control" 
                      [(ngModel)]="rejectionReason" 
                      name="rejectionReason"
                      rows="6" 
                      placeholder="Please provide a detailed reason for rejecting this doctor's registration. This information will be sent to the doctor via email."
                      required
                      minlength="20"
                      maxlength="500"
                      style="resize: vertical;">
                    </textarea>
                    <div class="form-text">
                      <i class="fas fa-info-circle me-1"></i>
                      Minimum 20 characters required. This reason will be sent to the doctor via email.
                    </div>
                    <div class="character-count mt-1">
                      <small class="text-muted">{{ rejectionReason.length }}/500 characters</small>
                    </div>
                  </div>


                  <div class="form-actions d-flex gap-3">
                    <button type="button" class="btn btn-outline-secondary" (click)="goBack()">
                      <i class="fas fa-times me-2"></i>Cancel
                    </button>
                    <button 
                      type="submit" 
                      class="btn btn-danger"
                      [disabled]="!rejectionForm.valid || rejectionReason.length < 20 || isSubmitting">
                      <span *ngIf="!isSubmitting">
                        <i class="fas fa-times-circle me-2"></i>Reject Doctor
                      </span>
                      <span *ngIf="isSubmitting">
                        <i class="fas fa-spinner fa-spin me-2"></i>Rejecting...
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <app-footer></app-footer>
  `,
  styles: [`
    .rejection-container {
      background: #f8f9fa;
    }
    
    .card {
      border: none;
      box-shadow: var(--shadow-sm);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    .info-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 1rem;
    }
    
    
    .character-count {
      text-align: right;
    }
    
    .form-control:focus {
      border-color: #dc3545;
      box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }
    
    .btn-danger:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    @media (max-width: 768px) {
      .rejection-container .row {
        flex-direction: column;
      }
      
      .rejection-container .col-md-4,
      .rejection-container .col-md-8 {
        margin-bottom: 1rem;
      }
    }
  `]
})
export class DoctorRejectionComponent implements OnInit {
  doctor: Doctor | null = null;
  rejectionReason = '';
  loading = true;
  error: string | null = null;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const doctorId = params['id'];
      if (doctorId) {
        this.loadDoctorDetails(doctorId);
      }
    });
  }

  loadDoctorDetails(doctorId: string): void {
    this.loading = true;
    this.error = null;

    this.adminService.getDoctorById(parseInt(doctorId)).subscribe({
      next: (doctor) => {
        this.doctor = doctor;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading doctor details:', error);
        
        // Handle specific error cases
        if (error.status === 404) {
          this.error = 'Doctor not found. The doctor may have already been processed or deleted.';
          // Redirect to dashboard after showing error
          setTimeout(() => {
            this.router.navigate(['/admin/dashboard']);
          }, 3000);
        } else {
          this.error = 'Failed to load doctor information. Please try again.';
        }
        
        this.loading = false;
      }
    });
  }

  submitRejection(): void {
    console.log('=== FRONTEND REJECTION DEBUG ===');
    console.log('Doctor:', this.doctor);
    console.log('Rejection Reason:', this.rejectionReason);
    console.log('Reason Length:', this.rejectionReason.length);
    
    if (!this.doctor || !this.rejectionReason || this.rejectionReason.length < 20) {
      this.notificationService.error('Validation Error', 'Please provide a valid rejection reason (minimum 20 characters).');
      return;
    }

    this.isSubmitting = true;
    console.log('Submitting rejection for doctor ID:', this.doctor.id);

    this.adminService.rejectDoctorWithReason(this.doctor.id, this.rejectionReason).subscribe({
      next: (response) => {
        console.log('✅ Rejection successful:', response);
        
        // Extract success message from response
        let successMessage = 'Doctor registration rejected successfully!';
        if (response && response.message) {
          successMessage = response.message;
        }
        
        // Show success popup
        alert('✅ ' + successMessage + '\n\nThe doctor has been notified via email.');
        
        // Navigate back to dashboard
        this.router.navigate(['/admin/dashboard']);
      },
      error: (error) => {
        console.error('❌ Error rejecting doctor:', error);
        console.error('Error details:', error);
        
        // Extract meaningful error message
        let errorMessage = 'Unknown error occurred';
        
        if (error.error) {
          if (typeof error.error === 'string') {
            errorMessage = error.error;
          } else if (error.error.message) {
            errorMessage = error.error.message;
          } else if (error.error.error) {
            errorMessage = error.error.error;
          }
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        // Handle specific error cases
        if (error.status === 404) {
          errorMessage = 'Doctor not found. The doctor may have already been processed.';
        } else if (error.status === 400) {
          errorMessage = errorMessage || 'Invalid request. Please check your input and try again.';
        } else if (error.status === 500) {
          errorMessage = 'Internal server error. Please try again later.';
        } else if (error.status === 0) {
          errorMessage = 'Network error. Please check your connection and try again.';
        }
        
        // Show error popup
        alert('❌ Failed to reject doctor. Please try again.\n\nError: ' + errorMessage);
        
        this.isSubmitting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
