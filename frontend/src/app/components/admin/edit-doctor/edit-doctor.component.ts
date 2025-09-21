import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Doctor } from '../../../models/doctor.model';
import { AdminService } from '../../../services/admin.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-edit-doctor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FooterComponent, HeaderComponent],
  template: `
    <!-- Dynamic 3D Header -->
    <app-header></app-header>

    <div class="edit-doctor-container" style="margin-top: 70px; padding: 2rem 0; min-height: calc(100vh - 8rem); background: #f8f9fa;">
      <div class="container">
        <!-- Loading State -->
        <div *ngIf="isLoading && !doctor" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3">Loading doctor information...</p>
        </div>

        <!-- Error State -->
        <div *ngIf="error && !isLoading" class="alert alert-danger" role="alert">
          <i class="fas fa-exclamation-triangle me-2"></i>{{ error }}
          <button class="btn btn-outline-primary ms-3" (click)="goBack()">Go Back</button>
        </div>

        <!-- Edit Form -->
        <div *ngIf="doctor && editForm" class="edit-doctor-form">
          <!-- Header -->
          <div class="page-header d-flex justify-content-between align-items-center mb-4">
            <div class="d-flex align-items-center">
              <button class="btn btn-outline-secondary me-3" (click)="goBack()">
                <i class="fas fa-arrow-left me-2"></i>Back
              </button>
              <div>
                <h1 class="mb-1">Edit Doctor</h1>
                <p class="text-muted mb-0">Update information for Dr. {{ doctor.firstName }} {{ doctor.lastName }}</p>
              </div>
            </div>
            <div class="header-actions">
              <button class="btn btn-info me-2" (click)="viewDoctor()">
                <i class="fas fa-eye me-2"></i>View Details
              </button>
              <button class="btn btn-success" (click)="saveChanges()" [disabled]="!editForm.valid || isSaving">
                <i class="fas fa-save me-2"></i>
                {{ isSaving ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </div>

          <form [formGroup]="editForm" (ngSubmit)="saveChanges()">
            <div class="row">
              <!-- Profile Section -->
              <div class="col-lg-4 mb-4">
                <div class="profile-section card">
                  <div class="card-header">
                    <h5 class="mb-0">
                      <i class="fas fa-user me-2"></i>Profile Information
                    </h5>
                  </div>
                  <div class="card-body text-center">
                    <div class="profile-image-container mb-3">
                      <img [src]="getDoctorImageUrl()" 
                           alt="Doctor Profile" 
                           class="profile-image rounded-circle"
                           style="width: 100px; height: 100px; object-fit: cover; border: 3px solid var(--primary-color);">
                    </div>
                    <h5>Dr. {{ doctor.firstName }} {{ doctor.lastName }}</h5>
                    <p class="text-muted">{{ doctor.specialization }}</p>
                    
                    <!-- Status Badges -->
                    <div class="status-badges mb-3">
                      <span class="badge me-2" [class]="doctor.isActive ? 'bg-success' : 'bg-secondary'">
                        {{ doctor.isActive ? 'Active' : 'Inactive' }}
                      </span>
                      <span class="badge" [class]="doctor.isApproved ? 'bg-success' : 'bg-warning'">
                        {{ doctor.isApproved ? 'Approved' : 'Pending' }}
                      </span>
                    </div>

                    <!-- Account Actions -->
                    <div class="account-actions">
                      <button type="button" class="btn btn-sm me-2" 
                              [class]="doctor.isActive ? 'btn-warning' : 'btn-success'"
                              (click)="toggleStatus()">
                        <i class="fas" [class]="doctor.isActive ? 'fa-pause' : 'fa-play'"></i>
                        {{ doctor.isActive ? 'Suspend' : 'Activate' }}
                      </button>
                      <button type="button" class="btn btn-sm btn-danger" (click)="deleteDoctor()">
                        <i class="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Form Fields -->
              <div class="col-lg-8">
                <div class="form-sections">
                  <!-- Personal Information -->
                  <div class="form-section card mb-4">
                    <div class="card-header">
                      <h5 class="mb-0">
                        <i class="fas fa-user me-2"></i>Personal Information
                      </h5>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6 mb-3">
                          <label class="form-label">First Name *</label>
                          <input type="text" class="form-control" formControlName="firstName"
                                 [class.is-invalid]="editForm.get('firstName')?.invalid && editForm.get('firstName')?.touched">
                          <div class="invalid-feedback" *ngIf="editForm.get('firstName')?.invalid && editForm.get('firstName')?.touched">
                            First name is required
                          </div>
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label">Last Name *</label>
                          <input type="text" class="form-control" formControlName="lastName"
                                 [class.is-invalid]="editForm.get('lastName')?.invalid && editForm.get('lastName')?.touched">
                          <div class="invalid-feedback" *ngIf="editForm.get('lastName')?.invalid && editForm.get('lastName')?.touched">
                            Last name is required
                          </div>
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label">Email *</label>
                          <input type="email" class="form-control" formControlName="email"
                                 [class.is-invalid]="editForm.get('email')?.invalid && editForm.get('email')?.touched">
                          <div class="invalid-feedback" *ngIf="editForm.get('email')?.invalid && editForm.get('email')?.touched">
                            Please enter a valid email address
                          </div>
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label">Phone *</label>
                          <input type="tel" class="form-control" formControlName="phone"
                                 [class.is-invalid]="editForm.get('phone')?.invalid && editForm.get('phone')?.touched">
                          <div class="invalid-feedback" *ngIf="editForm.get('phone')?.invalid && editForm.get('phone')?.touched">
                            Phone number is required
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Professional Information -->
                  <div class="form-section card mb-4">
                    <div class="card-header">
                      <h5 class="mb-0">
                        <i class="fas fa-briefcase me-2"></i>Professional Information
                      </h5>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6 mb-3">
                          <label class="form-label">License Number *</label>
                          <input type="text" class="form-control" formControlName="licenseNumber"
                                 [class.is-invalid]="editForm.get('licenseNumber')?.invalid && editForm.get('licenseNumber')?.touched">
                          <div class="invalid-feedback" *ngIf="editForm.get('licenseNumber')?.invalid && editForm.get('licenseNumber')?.touched">
                            License number is required
                          </div>
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label">Specialization *</label>
                          <select class="form-control" formControlName="specialization"
                                  [class.is-invalid]="editForm.get('specialization')?.invalid && editForm.get('specialization')?.touched">
                            <option value="">Select Specialization</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Dermatology">Dermatology</option>
                            <option value="Neurology">Neurology</option>
                            <option value="Orthopedics">Orthopedics</option>
                            <option value="Pediatrics">Pediatrics</option>
                            <option value="General Medicine">General Medicine</option>
                            <option value="Gynecology">Gynecology</option>
                            <option value="Psychiatry">Psychiatry</option>
                            <option value="Ophthalmology">Ophthalmology</option>
                            <option value="ENT">ENT</option>
                          </select>
                          <div class="invalid-feedback" *ngIf="editForm.get('specialization')?.invalid && editForm.get('specialization')?.touched">
                            Specialization is required
                          </div>
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label">Qualification *</label>
                          <input type="text" class="form-control" formControlName="qualification"
                                 [class.is-invalid]="editForm.get('qualification')?.invalid && editForm.get('qualification')?.touched">
                          <div class="invalid-feedback" *ngIf="editForm.get('qualification')?.invalid && editForm.get('qualification')?.touched">
                            Qualification is required
                          </div>
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label">Experience (Years) *</label>
                          <input type="number" class="form-control" formControlName="experienceYears" min="0"
                                 [class.is-invalid]="editForm.get('experienceYears')?.invalid && editForm.get('experienceYears')?.touched">
                          <div class="invalid-feedback" *ngIf="editForm.get('experienceYears')?.invalid && editForm.get('experienceYears')?.touched">
                            Experience years is required and must be 0 or greater
                          </div>
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label">Consultation Fee *</label>
                          <input type="number" class="form-control" formControlName="consultationFee" min="0"
                                 [class.is-invalid]="editForm.get('consultationFee')?.invalid && editForm.get('consultationFee')?.touched">
                          <div class="invalid-feedback" *ngIf="editForm.get('consultationFee')?.invalid && editForm.get('consultationFee')?.touched">
                            Consultation fee is required and must be 0 or greater
                          </div>
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label">Hospital Affiliation</label>
                          <input type="text" class="form-control" formControlName="hospitalAffiliation">
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Contact Information -->
                  <div class="form-section card mb-4">
                    <div class="card-header">
                      <h5 class="mb-0">
                        <i class="fas fa-map-marker-alt me-2"></i>Contact Information
                      </h5>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-12 mb-3">
                          <label class="form-label">Address</label>
                          <textarea class="form-control" formControlName="address" rows="2"></textarea>
                        </div>
                        <div class="col-md-4 mb-3">
                          <label class="form-label">City</label>
                          <input type="text" class="form-control" formControlName="city">
                        </div>
                        <div class="col-md-4 mb-3">
                          <label class="form-label">State</label>
                          <input type="text" class="form-control" formControlName="state">
                        </div>
                        <div class="col-md-4 mb-3">
                          <label class="form-label">Pincode</label>
                          <input type="text" class="form-control" formControlName="pincode">
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- About Section -->
                  <div class="form-section card mb-4">
                    <div class="card-header">
                      <h5 class="mb-0">
                        <i class="fas fa-info-circle me-2"></i>Additional Information
                      </h5>
                    </div>
                    <div class="card-body">
                      <div class="mb-3">
                        <label class="form-label">About Doctor</label>
                        <textarea class="form-control" formControlName="about" rows="4" 
                                  placeholder="Brief description about the doctor's expertise, experience, and approach to patient care..."></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="form-actions mt-4 text-center">
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-outline-secondary" (click)="goBack()">
                  <i class="fas fa-times me-2"></i>Cancel
                </button>
                <button type="button" class="btn btn-outline-info" (click)="resetForm()">
                  <i class="fas fa-undo me-2"></i>Reset
                </button>
                <button type="submit" class="btn btn-success" [disabled]="!editForm.valid || isSaving">
                  <i class="fas fa-save me-2"></i>
                  {{ isSaving ? 'Saving Changes...' : 'Save Changes' }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .edit-doctor-container {
      background: #f8f9fa;
    }
    
    .profile-section, .form-section {
      border: none;
      box-shadow: var(--shadow-sm);
      transition: all 0.3s ease;
    }
    
    .profile-section:hover, .form-section:hover {
      box-shadow: var(--shadow-md);
    }
    
    .card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-bottom: none;
    }
    
    .card-header h5 {
      margin-bottom: 0;
      font-weight: 600;
    }
    
    .status-badges .badge {
      font-size: 0.75rem;
      padding: 0.4rem 0.8rem;
    }
    
    .account-actions .btn {
      margin: 0.25rem;
    }
    
    .form-control:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
    }
    
    .is-invalid {
      border-color: #dc3545;
    }
    
    .invalid-feedback {
      display: block;
    }
    
    .form-actions .btn-group {
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
      
      .form-actions .btn-group {
        flex-direction: column;
      }
      
      .form-actions .btn {
        width: 100%;
        margin-bottom: 0.5rem;
      }
    }
  `]
})
export class EditDoctorComponent implements OnInit {
  doctor: Doctor | null = null;
  editForm: FormGroup;
  isLoading = true;
  isSaving = false;
  error: string | null = null;
  doctorId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      licenseNumber: ['', Validators.required],
      specialization: ['', Validators.required],
      qualification: ['', Validators.required],
      experienceYears: ['', [Validators.required, Validators.min(0)]],
      consultationFee: ['', [Validators.required, Validators.min(0)]],
      hospitalAffiliation: [''],
      address: [''],
      city: [''],
      state: [''],
      pincode: [''],
      about: ['']
    });
  }

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
        this.populateForm();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading doctor details:', error);
        this.error = 'Failed to load doctor details. Please try again.';
        this.isLoading = false;
      }
    });
  }

  populateForm(): void {
    if (!this.doctor) return;

    this.editForm.patchValue({
      firstName: this.doctor.firstName,
      lastName: this.doctor.lastName,
      email: this.doctor.email,
      phone: this.doctor.phone,
      licenseNumber: this.doctor.licenseNumber,
      specialization: this.doctor.specialization,
      qualification: this.doctor.qualification,
      experienceYears: this.doctor.experienceYears,
      consultationFee: this.doctor.consultationFee,
      hospitalAffiliation: this.doctor.hospitalAffiliation,
      address: this.doctor.address,
      city: this.doctor.city,
      state: this.doctor.state,
      pincode: this.doctor.pincode,
      about: this.doctor.about
    });
  }

  getDoctorImageUrl(): string {
    // Check if doctor has a profile image URL
    if (this.doctor?.profileImageUrl) {
      // If it's a relative URL, make it absolute
      if (this.doctor.profileImageUrl.startsWith('/')) {
        return 'http://10.45.254.162:8081' + this.doctor.profileImageUrl;
      }
      return this.doctor.profileImageUrl;
    }
    
    // Fallback to default avatar
    return `https://via.placeholder.com/100x100/667eea/ffffff?text=${this.doctor?.firstName?.charAt(0) || 'D'}`;
  }

  saveChanges(): void {
    if (!this.editForm.valid || !this.doctorId || this.isSaving) return;

    this.isSaving = true;
    const updateData = this.editForm.value;

    this.adminService.updateDoctor(this.doctorId, updateData).subscribe({
      next: (updatedDoctor) => {
        this.doctor = updatedDoctor;
        this.isSaving = false;
        alert('Doctor information updated successfully!');
        this.router.navigate(['/admin/doctor-details', this.doctorId]);
      },
      error: (error) => {
        console.error('Error updating doctor:', error);
        alert('Error updating doctor information. Please try again.');
        this.isSaving = false;
      }
    });
  }

  resetForm(): void {
    this.populateForm();
    alert('Form has been reset to original values.');
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

  viewDoctor(): void {
    if (this.doctorId) {
      this.router.navigate(['/admin/doctor-details', this.doctorId]);
    }
  }

  goBack(): void {
    if (this.doctorId) {
      this.router.navigate(['/admin/doctor-details', this.doctorId]);
    } else {
      this.router.navigate(['/admin/manage-doctors']);
    }
  }
}
