import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient, PatientUpdateRequest } from '../../../models/patient.model';
import { AuthService } from '../../../services/auth.service';
import { ImageService } from '../../../services/image.service';
import { PatientService } from '../../../services/patient.service';
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
            <p class="text-muted">Update your personal information</p>
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
                <h5 class="mb-0">Personal Information</h5>
              </div>
              <div class="card-body">
                <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
                  <div class="row">
                    <!-- Basic Information -->
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
                        <label class="form-label">Date of Birth</label>
                        <input type="date" class="form-control" formControlName="dateOfBirth">
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group mb-3">
                        <label class="form-label">Gender</label>
                        <select class="form-select" formControlName="gender">
                          <option value="">Select Gender</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group mb-3">
                        <label class="form-label">Blood Group</label>
                        <select class="form-select" formControlName="bloodGroup">
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <!-- Address Information -->
                  <div class="form-group mb-3">
                    <label class="form-label">Address</label>
                    <textarea class="form-control" rows="3" formControlName="address" placeholder="Enter your full address"></textarea>
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
                      <div class="form-group mb-3">
                        <label class="form-label">Pincode</label>
                        <input type="text" class="form-control" formControlName="pincode">
                      </div>
                    </div>
                  </div>

                  <!-- Emergency Contact -->
                  <div class="form-group mb-3">
                    <label class="form-label">Emergency Contact</label>
                    <input type="tel" class="form-control" formControlName="emergencyContact" placeholder="Emergency contact number">
                  </div>

                  <!-- Medical History -->
                  <div class="form-group mb-4">
                    <label class="form-label">Medical History</label>
                    <textarea class="form-control" rows="4" formControlName="medicalHistory" placeholder="Any medical conditions, allergies, or important medical information"></textarea>
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
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
    }
    
    .form-control, .form-select {
      height: 2.5rem;
      border: 1px solid #ddd;
      border-radius: 0.375rem;
    }
    
    .form-control:focus, .form-select:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
    }
    
    .form-select {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 6 7 7 7-7'/%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      background-size: 16px 12px;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
    }
    
    .btn-primary:hover {
      background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
      transform: translateY(-1px);
    }
  `]
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentPatient: Patient | null = null;
  isLoading = false;
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  isUploadingImage = false;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private authService: AuthService,
    private router: Router,
    private imageService: ImageService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      dateOfBirth: [''],
      gender: [''],
      bloodGroup: [''],
      address: [''],
      city: [''],
      state: [''],
      pincode: [''],
      emergencyContact: [''],
      medicalHistory: ['']
    });
  }

  ngOnInit(): void {
    this.loadPatientProfile();
  }

  loadPatientProfile(): void {
    this.isLoading = true;
    
    // Check if user is logged in and is a patient
    const currentUser = this.authService.getCurrentUser();
    console.log('Current user in edit profile:', currentUser);
    console.log('Auth token exists:', !!this.authService.getToken());
    console.log('Is logged in:', this.authService.isLoggedIn());
    
    if (!currentUser) {
      console.error('No user found, redirecting to login');
      alert('Please log in to access this page');
      this.router.navigate(['/auth/login']);
      return;
    }
    
    if (currentUser.role !== 'PATIENT') {
      console.error('User role is not PATIENT:', currentUser.role);
      alert('This page is only accessible to patients');
      this.router.navigate(['/']);
      return;
    }
    
    // Start with current user data immediately to avoid blank form
    console.log('Pre-filling form with current user data');
    this.currentPatient = {
      id: currentUser.id,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      phone: '',
      isActive: true
    } as any;
    
    this.profileForm.patchValue({
      firstName: currentUser.firstName || '',
      lastName: currentUser.lastName || '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      bloodGroup: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      emergencyContact: '',
      medicalHistory: ''
    });
    
    console.log('Loading additional profile data from backend for patient:', currentUser.email);
    
    // Load the actual current patient data from the database using patient endpoint
    console.log('Loading current patient data from database...');
    
    this.patientService.getProfile().subscribe({
      next: (patient) => {
        console.log('Current patient data loaded from database:', patient);
        this.currentPatient = patient;
        
        // Update form with actual current data from database
        this.profileForm.patchValue({
          firstName: patient.firstName,
          lastName: patient.lastName,
          phone: patient.phone,
          dateOfBirth: patient.dateOfBirth ? new Date(patient.dateOfBirth).toISOString().split('T')[0] : '',
          gender: patient.gender,
          bloodGroup: patient.bloodGroup,
          address: patient.address,
          city: patient.city,
          state: patient.state,
          pincode: patient.pincode,
          emergencyContact: patient.emergencyContact,
          medicalHistory: patient.medicalHistory
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading current patient data:', error);
        
        // If we can't load from database, use the basic user data as fallback
        console.log('Using basic user data as fallback');
        this.profileForm.patchValue({
          firstName: currentUser.firstName || '',
          lastName: currentUser.lastName || '',
          phone: '',
          dateOfBirth: '',
          gender: '',
          bloodGroup: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          emergencyContact: '',
          medicalHistory: ''
        });
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;
      const updateData: PatientUpdateRequest = this.profileForm.value;
      
      console.log('Submitting patient profile update:', updateData);
      
      // Use the patient service endpoint
      const currentUser = this.authService.getCurrentUser();
      console.log('Using patient service to update profile...');
      
      this.patientService.updateProfile(updateData).subscribe({
        next: (updatedPatient) => {
          console.log('Patient profile updated successfully:', updatedPatient);
          
          // Update the current user data in AuthService
          if (currentUser) {
            currentUser.firstName = updatedPatient.firstName;
            currentUser.lastName = updatedPatient.lastName;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.authService['currentUserSubject'].next(currentUser);
          }
          
          this.isLoading = false;
          alert('Profile updated successfully!');
          this.router.navigate(['/patient/dashboard']);
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          alert('Failed to update profile. Please try again.');
          this.isLoading = false;
        }
      });
    } else {
      console.log('Form is invalid:', this.profileForm.errors);
      alert('Please fill in all required fields correctly.');
    }
  }

  resetForm(): void {
    if (this.currentPatient) {
      this.profileForm.patchValue({
        firstName: this.currentPatient.firstName,
        lastName: this.currentPatient.lastName,
        phone: this.currentPatient.phone,
        dateOfBirth: this.currentPatient.dateOfBirth ? new Date(this.currentPatient.dateOfBirth).toISOString().split('T')[0] : '',
        gender: this.currentPatient.gender,
        bloodGroup: this.currentPatient.bloodGroup,
        address: this.currentPatient.address,
        city: this.currentPatient.city,
        state: this.currentPatient.state,
        pincode: this.currentPatient.pincode,
        emergencyContact: this.currentPatient.emergencyContact,
        medicalHistory: this.currentPatient.medicalHistory
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/patient/dashboard']);
  }

  getProfileImageUrl(): string {
    return this.imageService.getFullImageUrl(this.currentPatient?.profileImageUrl);
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
    this.patientService.uploadProfileImage(formData).subscribe({
      next: (response) => {
        this.isUploadingImage = false;
        if (response.success) {
          // Update current patient with new image URL
          if (this.currentPatient) {
            this.currentPatient.profileImageUrl = response.imageUrl;
          }
          
          // Update localStorage with new image URL
          const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
          if (currentUser && response.imageUrl) {
            currentUser.profileImageUrl = response.imageUrl;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Update the AuthService currentUser subject to trigger reactive updates
            this.authService.updateCurrentUser(currentUser);
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