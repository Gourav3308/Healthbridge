import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Doctor } from '../../../models/doctor.model';
import { AdminService } from '../../../services/admin.service';
import { ImageService } from '../../../services/image.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, HeaderComponent],
  template: `
    <!-- Dynamic 3D Header -->
    <app-header></app-header>

    <div class="doctor-details-container" style="margin-top: 70px; padding: 2rem 0; min-height: calc(100vh - 8rem); background: #f8f9fa;">
      <div class="container">
        <!-- Loading State -->
        <div *ngIf="isLoading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3">Loading doctor details...</p>
        </div>

        <!-- Error State -->
        <div *ngIf="error && !isLoading" class="alert alert-danger" role="alert">
          <i class="fas fa-exclamation-triangle me-2"></i>{{ error }}
          <button class="btn btn-outline-primary ms-3" (click)="goBack()">Go Back</button>
        </div>

        <!-- Doctor Details -->
        <div *ngIf="doctor && !isLoading" class="doctor-details">
          <!-- Header -->
          <div class="page-header d-flex justify-content-between align-items-center mb-4">
            <div class="d-flex align-items-center">
              <button class="btn btn-outline-secondary me-3" (click)="goBack()">
                <i class="fas fa-arrow-left me-2"></i>Back
              </button>
              <div>
                <h1 class="mb-1">Doctor Details</h1>
                <p class="text-muted mb-0">Complete information for Dr. {{ doctor.firstName }} {{ doctor.lastName }}</p>
              </div>
            </div>
            <div class="header-actions">
              <!-- Show approval/rejection buttons for pending doctors -->
              <div *ngIf="!doctor.isApproved" class="approval-actions">
                <button class="btn btn-success me-2" (click)="approveDoctor()">
                  <i class="fas fa-check me-2"></i>Approve Doctor
                </button>
                <button class="btn btn-danger me-2" (click)="rejectDoctor()">
                  <i class="fas fa-times me-2"></i>Reject Doctor
                </button>
              </div>
              
              <!-- Show regular actions for approved doctors -->
              <div *ngIf="doctor.isApproved">
                <button class="btn btn-primary me-2" (click)="editDoctor()">
                  <i class="fas fa-edit me-2"></i>Edit Doctor
                </button>
                <button class="btn" 
                        [class]="doctor.isActive ? 'btn-warning' : 'btn-success'"
                        (click)="toggleStatus()">
                  <i class="fas" [class]="doctor.isActive ? 'fa-pause' : 'fa-play'" class="me-2"></i>
                  {{ doctor.isActive ? 'Suspend' : 'Activate' }}
                </button>
                <button class="btn btn-danger ms-2" (click)="deleteDoctor()">
                  <i class="fas fa-trash me-2"></i>Delete
                </button>
              </div>
            </div>
          </div>

          <div class="row">
            <!-- Profile Card -->
            <div class="col-lg-4 mb-4">
              <div class="profile-card card h-100">
                <div class="card-body text-center">
                  <div class="profile-image-container mb-3">
                    <img [src]="getDoctorImageUrl()" 
                         alt="Dr. {{ doctor.firstName }} {{ doctor.lastName }}" 
                         class="profile-image rounded-circle"
                         style="width: 120px; height: 120px; object-fit: cover; border: 4px solid var(--primary-color);">
                  </div>
                  <h3 class="mb-2">Dr. {{ doctor.firstName }} {{ doctor.lastName }}</h3>
                  <p class="text-muted mb-3">{{ doctor.qualification }}</p>
                  
                  <!-- Status Badges -->
                  <div class="status-badges mb-3">
                    <span class="badge me-2" [class]="doctor.isActive ? 'bg-success' : 'bg-secondary'">
                      {{ doctor.isActive ? 'Active' : 'Inactive' }}
                    </span>
                    <span class="badge" [class]="doctor.isApproved ? 'bg-success' : 'bg-warning'">
                      {{ doctor.isApproved ? 'Approved' : 'Pending' }}
                    </span>
                  </div>

                  <!-- Quick Stats -->
                  <div class="quick-stats">
                    <div class="stat-item mb-2">
                      <i class="fas fa-graduation-cap text-primary me-2"></i>
                      <strong>{{ doctor.experienceYears }}</strong> years experience
                    </div>
                    <div class="stat-item mb-2">
                      <i class="fas fa-rupee-sign text-success me-2"></i>
                      <strong>₹{{ doctor.consultationFee }}</strong> consultation fee
                    </div>
                    <div class="stat-item">
                      <i class="fas fa-stethoscope text-info me-2"></i>
                      <strong>{{ doctor.specialization }}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Details Tabs -->
            <div class="col-lg-8">
              <div class="details-card card">
                <div class="card-header">
                  <ul class="nav nav-tabs card-header-tabs" id="doctorTabs" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button class="nav-link active" id="personal-tab" data-bs-toggle="tab" data-bs-target="#personal" type="button" role="tab">
                        <i class="fas fa-user me-2"></i>Personal Info
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link" id="professional-tab" data-bs-toggle="tab" data-bs-target="#professional" type="button" role="tab">
                        <i class="fas fa-briefcase me-2"></i>Professional
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab">
                        <i class="fas fa-address-book me-2"></i>Contact
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link" id="approval-tab" data-bs-toggle="tab" data-bs-target="#approval" type="button" role="tab">
                        <i class="fas fa-check-circle me-2"></i>Approval
                      </button>
                    </li>
                  </ul>
                </div>
                <div class="card-body">
                  <div class="tab-content" id="doctorTabsContent">
                    <!-- Personal Info Tab -->
                    <div class="tab-pane fade show active" id="personal" role="tabpanel">
                      <div class="row">
                        <div class="col-md-6 mb-3">
                          <label class="form-label fw-semibold">First Name</label>
                          <p class="form-control-plaintext">{{ doctor.firstName }}</p>
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label fw-semibold">Last Name</label>
                          <p class="form-control-plaintext">{{ doctor.lastName }}</p>
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label fw-semibold">Email</label>
                          <p class="form-control-plaintext">
                            <a [href]="'mailto:' + doctor.email">{{ doctor.email }}</a>
                          </p>
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label fw-semibold">Phone</label>
                          <p class="form-control-plaintext">
                            <a [href]="'tel:' + doctor.phone">{{ doctor.phone }}</a>
                          </p>
                        </div>
                        <div class="col-12 mb-3" *ngIf="doctor.about">
                          <label class="form-label fw-semibold">About</label>
                          <p class="form-control-plaintext">{{ doctor.about || 'No information provided' }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Professional Tab -->
                    <div class="tab-pane fade" id="professional" role="tabpanel">
                      <div class="row">
                        <div class="col-md-6 mb-3">
                          <label class="form-label fw-semibold">License Number</label>
                          <p class="form-control-plaintext">{{ doctor.licenseNumber }}</p>
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label fw-semibold">Specialization</label>
                          <p class="form-control-plaintext">
                            <span class="badge bg-primary">{{ doctor.specialization }}</span>
                          </p>
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label fw-semibold">Qualification</label>
                          <p class="form-control-plaintext">{{ doctor.qualification }}</p>
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label fw-semibold">Experience</label>
                          <p class="form-control-plaintext">{{ doctor.experienceYears }} years</p>
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label fw-semibold">Consultation Fee</label>
                          <p class="form-control-plaintext">₹{{ doctor.consultationFee }}</p>
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label fw-semibold">Hospital Affiliation</label>
                          <p class="form-control-plaintext">{{ doctor.hospitalAffiliation || 'Not specified' }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Contact Tab -->
                    <div class="tab-pane fade" id="contact" role="tabpanel">
                      <div class="row">
                        <div class="col-md-6 mb-3">
                          <label class="form-label fw-semibold">Address</label>
                          <p class="form-control-plaintext">{{ doctor.address || 'Not provided' }}</p>
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label fw-semibold">City</label>
                          <p class="form-control-plaintext">{{ doctor.city || 'Not specified' }}</p>
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label fw-semibold">State</label>
                          <p class="form-control-plaintext">{{ doctor.state || 'Not specified' }}</p>
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label fw-semibold">Pincode</label>
                          <p class="form-control-plaintext">{{ doctor.pincode || 'Not provided' }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Approval Tab -->
                    <div class="tab-pane fade" id="approval" role="tabpanel">
                      <div class="row">
                        <div class="col-md-6 mb-3">
                          <label class="form-label fw-semibold">Approval Status</label>
                          <p class="form-control-plaintext">
                            <span class="badge" [class]="doctor.isApproved ? 'bg-success' : 'bg-warning'">
                              {{ doctor.isApproved ? 'Approved' : 'Pending Approval' }}
                            </span>
                          </p>
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label fw-semibold">Account Status</label>
                          <p class="form-control-plaintext">
                            <span class="badge" [class]="doctor.isActive ? 'bg-success' : 'bg-secondary'">
                              {{ doctor.isActive ? 'Active' : 'Inactive' }}
                            </span>
                          </p>
                        </div>
                        <div class="col-md-6 mb-3" *ngIf="doctor.approvalDate">
                          <label class="form-label fw-semibold">Approval Date</label>
                          <p class="form-control-plaintext">{{ formatDate(doctor.approvalDate) }}</p>
                        </div>
                        <div class="col-md-6 mb-3" *ngIf="doctor.approvedBy">
                          <label class="form-label fw-semibold">Approved By</label>
                          <p class="form-control-plaintext">{{ doctor.approvedBy }}</p>
                        </div>
                        <div class="col-12 mb-3" *ngIf="doctor.createdAt">
                          <label class="form-label fw-semibold">Registration Date</label>
                          <p class="form-control-plaintext">{{ formatDate(doctor.createdAt) }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons mt-4 text-center">
            <div class="btn-group" role="group">
              <button class="btn btn-outline-secondary" (click)="goBack()">
                <i class="fas fa-arrow-left me-2"></i>Back to List
              </button>
              <button class="btn btn-primary" (click)="editDoctor()">
                <i class="fas fa-edit me-2"></i>Edit Doctor
              </button>
              <button class="btn" 
                      [class]="doctor.isActive ? 'btn-warning' : 'btn-success'"
                      (click)="toggleStatus()">
                <i class="fas" [class]="doctor.isActive ? 'fa-pause' : 'fa-play'" class="me-2"></i>
                {{ doctor.isActive ? 'Suspend Doctor' : 'Activate Doctor' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .doctor-details-container {
      background: #f8f9fa;
    }
    
    .profile-card {
      border: none;
      box-shadow: var(--shadow-md);
      transition: all 0.3s ease;
    }
    
    .profile-card:hover {
      box-shadow: var(--shadow-lg);
    }
    
    .details-card {
      border: none;
      box-shadow: var(--shadow-md);
    }
    
    .nav-tabs .nav-link {
      border: none;
      color: #6c757d;
      font-weight: 500;
    }
    
    .nav-tabs .nav-link.active {
      background: transparent;
      color: var(--primary-color);
      border-bottom: 2px solid var(--primary-color);
    }
    
    .form-control-plaintext {
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 0.375rem;
      padding: 0.375rem 0.75rem;
      margin-bottom: 0;
    }
    
    .status-badges .badge {
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
    }
    
    .quick-stats .stat-item {
      padding: 0.5rem;
      background: #f8f9fa;
      border-radius: 0.375rem;
      margin-bottom: 0.5rem;
    }
    
    .action-buttons .btn-group {
      box-shadow: var(--shadow-sm);
    }
    
    @media (max-width: 768px) {
      .header-actions {
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;
      }
      
      .header-actions .btn {
        width: 100%;
      }
      
      .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
    }
  `]
})
export class DoctorDetailsComponent implements OnInit {
  doctor: Doctor | null = null;
  isLoading = true;
  error: string | null = null;
  doctorId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.doctorId = +params['id'];
      if (this.doctorId) {
        this.loadDoctorDetails();
      } else {
        this.error = 'Invalid doctor ID';
        this.isLoading = false;
      }
    });
  }

  loadDoctorDetails(): void {
    if (!this.doctorId) return;
    
    this.isLoading = true;
    this.error = null;
    
    this.adminService.getDoctorById(this.doctorId).subscribe({
      next: (doctor) => {
        this.doctor = doctor;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading doctor details:', error);
        this.error = 'Failed to load doctor details. Please try again.';
        this.isLoading = false;
      }
    });
  }

  getDoctorImageUrl(): string {
    return this.imageService.getFullImageUrl(this.doctor?.profileImageUrl);
  }

  formatDate(date: string | Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  editDoctor(): void {
    if (this.doctorId) {
      this.router.navigate(['/admin/edit-doctor', this.doctorId]);
    }
  }

  toggleStatus(): void {
    if (!this.doctor || !this.doctorId) return;

    const action = this.doctor.isActive ? 'suspend' : 'activate';
    const confirmMessage = `Are you sure you want to ${action} Dr. ${this.doctor.firstName} ${this.doctor.lastName}?`;
    
    if (confirm(confirmMessage)) {
      this.adminService.toggleDoctorStatus(this.doctorId).subscribe({
        next: (updatedDoctor) => {
          this.doctor = updatedDoctor;
          alert(`Doctor ${updatedDoctor.isActive ? 'activated' : 'suspended'} successfully!`);
        },
        error: (error) => {
          console.error('Error toggling doctor status:', error);
          alert('Error updating doctor status. Please try again.');
        }
      });
    }
  }

  deleteDoctor(): void {
    if (!this.doctor || !this.doctorId) return;

    const confirmMessage = `Are you sure you want to delete Dr. ${this.doctor.firstName} ${this.doctor.lastName}? This action cannot be undone.`;
    
    if (confirm(confirmMessage)) {
      this.adminService.deleteDoctor(this.doctorId).subscribe({
        next: () => {
          alert('Doctor deleted successfully!');
          this.router.navigate(['/admin/manage-doctors']);
        },
        error: (error) => {
          console.error('Error deleting doctor:', error);
          alert('Error deleting doctor. Please try again.');
        }
      });
    }
  }

  approveDoctor(): void {
    if (!this.doctor || !this.doctorId) return;

    const doctorName = `${this.doctor.firstName} ${this.doctor.lastName}`;
    const confirmMessage = `Are you sure you want to approve Dr. ${doctorName}?`;
    
    if (confirm(confirmMessage)) {
      this.adminService.approveDoctor(this.doctorId).subscribe({
        next: (response) => {
          this.doctor!.isApproved = true;
          alert(`Dr. ${doctorName} has been approved successfully!`);
          // Optionally navigate back to dashboard or refresh
          this.router.navigate(['/admin/dashboard']);
        },
        error: (error) => {
          console.error('Error approving doctor:', error);
          alert('Error approving doctor. Please try again.');
        }
      });
    }
  }

  rejectDoctor(): void {
    if (!this.doctor || !this.doctorId) return;

    const doctorName = `${this.doctor.firstName} ${this.doctor.lastName}`;
    const reason = prompt(`Please provide a reason for rejecting Dr. ${doctorName}:`);
    
    if (reason) {
      this.adminService.rejectDoctor(this.doctorId).subscribe({
        next: (response) => {
          alert(`Dr. ${doctorName}'s application has been rejected.`);
          // Navigate back to dashboard
          this.router.navigate(['/admin/dashboard']);
        },
        error: (error) => {
          console.error('Error rejecting doctor:', error);
          alert('Error rejecting doctor. Please try again.');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/manage-doctors']);
  }
}
