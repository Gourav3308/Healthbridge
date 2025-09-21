import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor, DoctorUpdateRequest } from '../../../models/doctor.model';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { DoctorService } from '../../../services/doctor.service';
import { NotificationService } from '../../../services/notification.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>

    <div class="edit-profile-container" style="margin-top: 70px; padding: 2rem 0; min-height: calc(100vh - 8rem);">
      <div class="container">
        <!-- Page Header -->
        <div class="page-header d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 class="mb-1">Edit Profile</h1>
            <p class="text-muted">Update your professional information</p>
          </div>
          <button class="btn btn-outline-secondary" (click)="goBack()">
            <i class="fas fa-arrow-left me-2"></i>Back to Dashboard
          </button>
        </div>

        <!-- Profile Image Section -->
        <div class="row mb-4">
          <div class="col-lg-8 mx-auto">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">Profile Picture</h5>
              </div>
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-md-4 text-center">
                    <div class="profile-image-container">
                      <img [src]="imagePreview || getProfileImageUrl()" 
                           alt="Profile Picture" 
                           class="profile-image rounded-circle mb-3"
                           style="width: 120px; height: 120px; object-fit: cover; border: 3px solid #dee2e6;">
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="upload-section">
                      <label class="form-label">Upload Profile Picture</label>
                      <input type="file" 
                             class="form-control mb-2" 
                             accept="image/*"
                             (change)="onImageSelect($event)"
                             #fileInput>
                      <small class="text-muted">
                        <i class="fas fa-info-circle me-1"></i>
                        Supported formats: JPG, PNG, GIF. Max size: 2MB
                      </small>
                      <div class="mt-2" *ngIf="selectedImage">
                        <button type="button" class="btn btn-success btn-sm me-2" (click)="uploadImage()" [disabled]="isUploadingImage">
                          <span *ngIf="isUploadingImage" class="spinner-border spinner-border-sm me-1"></span>
                          <i *ngIf="!isUploadingImage" class="fas fa-upload me-1"></i>
                          {{ isUploadingImage ? 'Uploading...' : 'Upload Image' }}
                        </button>
                        <button type="button" class="btn btn-outline-secondary btn-sm" (click)="clearImage()" [disabled]="isUploadingImage">
                          <i class="fas fa-times me-1"></i>Clear
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Form -->
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">Professional Information</h5>
              </div>
              <div class="card-body">
                <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
                  <!-- Basic Information -->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group mb-3">
                        <label class="form-label">First Name *</label>
                        <input type="text" class="form-control" formControlName="firstName"
                               [class.is-invalid]="profileForm.get('firstName')?.invalid && profileForm.get('firstName')?.touched">
                        <div class="invalid-feedback" *ngIf="profileForm.get('firstName')?.invalid && profileForm.get('firstName')?.touched">
                          First name is required
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group mb-3">
                        <label class="form-label">Last Name *</label>
                        <input type="text" class="form-control" formControlName="lastName"
                               [class.is-invalid]="profileForm.get('lastName')?.invalid && profileForm.get('lastName')?.touched">
                        <div class="invalid-feedback" *ngIf="profileForm.get('lastName')?.invalid && profileForm.get('lastName')?.touched">
                          Last name is required
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group mb-3">
                        <label class="form-label">Phone *</label>
                        <input type="tel" class="form-control" formControlName="phone"
                               [class.is-invalid]="profileForm.get('phone')?.invalid && profileForm.get('phone')?.touched">
                        <div class="invalid-feedback" *ngIf="profileForm.get('phone')?.invalid && profileForm.get('phone')?.touched">
                          Valid phone number is required
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group mb-3">
                        <label class="form-label">Qualification *</label>
                        <input type="text" class="form-control" formControlName="qualification"
                               [class.is-invalid]="profileForm.get('qualification')?.invalid && profileForm.get('qualification')?.touched">
                        <div class="invalid-feedback" *ngIf="profileForm.get('qualification')?.invalid && profileForm.get('qualification')?.touched">
                          Qualification is required
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Professional Details -->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group mb-3">
                        <label class="form-label">Experience (Years) *</label>
                        <input type="number" class="form-control" formControlName="experienceYears" min="0"
                               [class.is-invalid]="profileForm.get('experienceYears')?.invalid && profileForm.get('experienceYears')?.touched">
                        <div class="invalid-feedback" *ngIf="profileForm.get('experienceYears')?.invalid && profileForm.get('experienceYears')?.touched">
                          Experience years is required
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group mb-3">
                        <label class="form-label">Consultation Fee (₹) *</label>
                        <input type="number" class="form-control" formControlName="consultationFee" min="0"
                               [class.is-invalid]="profileForm.get('consultationFee')?.invalid && profileForm.get('consultationFee')?.touched">
                        <div class="invalid-feedback" *ngIf="profileForm.get('consultationFee')?.invalid && profileForm.get('consultationFee')?.touched">
                          Consultation fee is required
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Hospital Information -->
                  <div class="form-group mb-3">
                    <label class="form-label">Hospital Affiliation</label>
                    <input type="text" class="form-control" formControlName="hospitalAffiliation" placeholder="Hospital or clinic name">
                  </div>

                  <!-- About -->
                  <div class="form-group mb-3">
                    <label class="form-label">About</label>
                    <textarea class="form-control" rows="4" formControlName="about" placeholder="Brief description about yourself and your practice"></textarea>
                  </div>

                  <!-- Address Information -->
                  <div class="form-group mb-3">
                    <label class="form-label">Address</label>
                    <textarea class="form-control" rows="3" formControlName="address" placeholder="Clinic/Hospital address"></textarea>
                  </div>

                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group mb-3">
                        <label class="form-label">City</label>
                        <input type="text" class="form-control" formControlName="city">
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group mb-3">
                        <label class="form-label">State</label>
                        <input type="text" class="form-control" formControlName="state">
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group mb-4">
                        <label class="form-label">Pincode</label>
                        <input type="text" class="form-control" formControlName="pincode">
                      </div>
                    </div>
                  </div>

                  <!-- Form Actions -->
                  <div class="d-flex justify-content-between">
                    <button type="button" class="btn btn-outline-secondary" (click)="resetForm()">
                      <i class="fas fa-undo me-2"></i>Reset
                    </button>
                    <button type="submit" class="btn btn-primary" [disabled]="profileForm.invalid || isLoading">
                      <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                      <i *ngIf="!isLoading" class="fas fa-save me-2"></i>
                      {{ isLoading ? 'Saving...' : 'Save Changes' }}
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
    .edit-profile-container {
      background: #f8f9fa;
    }
    
    .card {
      border: none;
      box-shadow: var(--shadow-sm);
    }
    
    .card-header {
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      color: white;
      border: none;
    }
    
    .form-control {
      height: 2.5rem;
      border: 1px solid #ddd;
      border-radius: 0.375rem;
    }
    
    .form-control:focus {
      border-color: #28a745;
      box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      border: none;
    }
    
    .btn-primary:hover {
      background: linear-gradient(135deg, #218838 0%, #1ea085 100%);
      transform: translateY(-1px);
    }
  `]
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentDoctor: Doctor | null = null;
  isLoading = false;
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  isUploadingImage = false;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private adminService: AdminService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      qualification: ['', [Validators.required]],
      experienceYears: ['', [Validators.required, Validators.min(0)]],
      consultationFee: ['', [Validators.required, Validators.min(0)]],
      hospitalAffiliation: [''],
      about: [''],
      address: [''],
      city: [''],
      state: [''],
      pincode: ['']
    });
  }

  ngOnInit(): void {
    this.loadDoctorProfile();
  }

  loadDoctorProfile(): void {
    this.isLoading = true;
    
    // Check if user is logged in and is a doctor
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'DOCTOR') {
      console.error('User is not logged in as a doctor');
      this.notificationService.error('Error', 'You must be logged in as a doctor to access this page');
      this.router.navigate(['/auth/login']);
      return;
    }
    
    console.log('Loading profile for doctor:', currentUser.email);
    
    // Start with basic user data immediately
    this.profileForm.patchValue({
      firstName: currentUser.firstName || '',
      lastName: currentUser.lastName || '',
      phone: '',
      qualification: '',
      experienceYears: 0,
      consultationFee: 0,
      hospitalAffiliation: '',
      about: '',
      address: '',
      city: '',
      state: '',
      pincode: ''
    });
    
    // Load the actual current doctor data from the database using admin endpoint
    console.log('Loading current doctor data from database...');
    
    this.adminService.getDoctorById(currentUser.id).subscribe({
      next: (doctor) => {
        console.log('Current doctor data loaded from database:', doctor);
        this.currentDoctor = doctor;
        
        // Update form with actual current data from database
        this.profileForm.patchValue({
          firstName: doctor.firstName,
          lastName: doctor.lastName,
          phone: doctor.phone,
          qualification: doctor.qualification,
          experienceYears: doctor.experienceYears,
          consultationFee: doctor.consultationFee,
          hospitalAffiliation: doctor.hospitalAffiliation,
          about: doctor.about,
          address: doctor.address,
          city: doctor.city,
          state: doctor.state,
          pincode: doctor.pincode
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading current doctor data:', error);
        
        // If we can't load from database, use the basic user data as fallback
        console.log('Using basic user data as fallback');
        this.currentDoctor = {
          id: currentUser.id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
          phone: '',
          qualification: '',
          experienceYears: 0,
          consultationFee: 0,
          isActive: true,
          isApproved: true
        } as any;
        
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;
      const updateData: DoctorUpdateRequest = this.profileForm.value;
      
      console.log('Submitting doctor profile update:', updateData);
      
      // Since we know the doctor ID and admin endpoints work, use admin endpoint for now
      const currentUser = this.authService.getCurrentUser();
      if (this.currentDoctor && this.currentDoctor.id) {
        console.log('Using admin endpoint to update doctor profile...');
        this.adminService.updateDoctor(this.currentDoctor.id, updateData).subscribe({
          next: (updatedDoctor) => {
            console.log('Doctor profile updated successfully:', updatedDoctor);
            
            // Update the current user data in AuthService
            if (currentUser) {
              currentUser.firstName = updatedDoctor.firstName;
              currentUser.lastName = updatedDoctor.lastName;
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
              this.authService['currentUserSubject'].next(currentUser);
            }
            
            this.isLoading = false;
            alert('Profile updated successfully!');
            this.router.navigate(['/doctor/dashboard']);
          },
          error: (error) => {
            console.error('Error updating profile via admin endpoint:', error);
            alert('Failed to update profile. Please try again.');
            this.isLoading = false;
          }
        });
      } else {
        // Fallback to doctor service if no doctor ID available
        console.log('Fallback to doctor service update...');
        this.doctorService.updateProfile(updateData).subscribe({
          next: (updatedDoctor) => {
            // Update the current user data in AuthService
            if (currentUser) {
              currentUser.firstName = updatedDoctor.firstName;
              currentUser.lastName = updatedDoctor.lastName;
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
              this.authService['currentUserSubject'].next(currentUser);
            }
            
            this.isLoading = false;
            alert('Profile updated successfully!');
            this.router.navigate(['/doctor/dashboard']);
          },
          error: (error) => {
            console.error('Error updating profile via doctor service:', error);
            alert('Failed to update profile. Please try again.');
            this.isLoading = false;
          }
        });
      }
    } else {
      console.log('Form is invalid:', this.profileForm.errors);
      alert('Please fill in all required fields correctly.');
    }
  }

  resetForm(): void {
    if (this.currentDoctor) {
      this.profileForm.patchValue({
        firstName: this.currentDoctor.firstName,
        lastName: this.currentDoctor.lastName,
        phone: this.currentDoctor.phone,
        qualification: this.currentDoctor.qualification,
        experienceYears: this.currentDoctor.experienceYears,
        consultationFee: this.currentDoctor.consultationFee,
        hospitalAffiliation: this.currentDoctor.hospitalAffiliation,
        about: this.currentDoctor.about,
        address: this.currentDoctor.address,
        city: this.currentDoctor.city,
        state: this.currentDoctor.state,
        pincode: this.currentDoctor.pincode
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/doctor/dashboard']);
  }

  getProfileImageUrl(): string {
    if (this.currentDoctor?.profileImageUrl) {
      return this.currentDoctor.profileImageUrl;
    }
    
    // Fallback to default avatar
    const firstName = this.currentDoctor?.firstName || 'D';
    return `https://via.placeholder.com/120x120/28a745/ffffff?text=${firstName.charAt(0)}`;
  }

  onImageSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }
      
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB.');
        return;
      }
      
      this.selectedImage = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImage(): void {
    if (!this.selectedImage) {
      alert('Please select an image first.');
      return;
    }
    
    this.isUploadingImage = true;
    
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('image', this.selectedImage);
    
    // Upload image to backend
    this.doctorService.uploadProfileImage(formData).subscribe({
      next: (response) => {
        this.isUploadingImage = false;
        if (response.success) {
          // Update current doctor with new image URL
          if (this.currentDoctor) {
            this.currentDoctor.profileImageUrl = response.imageUrl;
          }
          
          // Update localStorage with new image URL
          const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
          if (currentUser && response.imageUrl) {
            currentUser.profileImageUrl = response.imageUrl;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
          }
          
          // Clear selected image and preview
          this.selectedImage = null;
          this.imagePreview = null;
          
          alert('Profile picture updated successfully!');
        } else {
          alert('Failed to upload image. Please try again.');
        }
      },
      error: (error) => {
        this.isUploadingImage = false;
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
    });
  }

  clearImage(): void {
    this.selectedImage = null;
    this.imagePreview = null;
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
