import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FooterComponent, HeaderComponent],
  template: `
    <!-- Dynamic 3D Header -->
    <app-header></app-header>

    <div class="auth-container" style="min-height: calc(100vh - 8rem); display: flex; align-items: center; justify-content: center; padding: 6rem 0 2rem 0; margin-top: 70px;">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6">
            <div class="auth-card card" style="box-shadow: var(--shadow-xl); border: none;">
              <div class="card-body" style="padding: 3rem;">
                <div class="text-center mb-4">
                  <h2 class="auth-title" style="color: var(--text-primary); margin-bottom: 0.5rem;">Create Account</h2>
                  <p class="text-muted">Join Healthbridge today</p>
                </div>

                <!-- Role Selection -->
                <div class="role-selection mb-4">
                  <label class="form-label">I want to register as:</label>
                  <div class="d-flex gap-3">
                    <div class="role-option" 
                         [class.active]="selectedRole === 'PATIENT'"
                         (click)="selectRole('PATIENT')"
                         style="flex: 1; padding: 1rem; border: 2px solid var(--border-color); border-radius: var(--radius-md); cursor: pointer; text-align: center; transition: all 0.3s ease;">
                      <i class="fas fa-user" style="font-size: 1.5rem; color: var(--primary-color); margin-bottom: 0.5rem;"></i>
                      <div style="font-weight: 500;">Patient</div>
                      <small class="text-muted">Book appointments</small>
                    </div>
                    <div class="role-option" 
                         [class.active]="selectedRole === 'DOCTOR'"
                         (click)="selectRole('DOCTOR')"
                         style="flex: 1; padding: 1rem; border: 2px solid var(--border-color); border-radius: var(--radius-md); cursor: pointer; text-align: center; transition: all 0.3s ease;">
                      <i class="fas fa-stethoscope" style="font-size: 1.5rem; color: var(--success-color); margin-bottom: 0.5rem;"></i>
                      <div style="font-weight: 500;">Doctor</div>
                      <small class="text-muted">Provide healthcare</small>
                    </div>
                  </div>
                </div>

                <div *ngIf="errorMessage" class="alert alert-danger">
                  {{ errorMessage }}
                </div>

                <div *ngIf="successMessage" class="alert alert-success">
                  {{ successMessage }}
                </div>


                <!-- Patient Registration Form -->
                <form *ngIf="selectedRole === 'PATIENT'" [formGroup]="patientForm" (ngSubmit)="onSubmitPatient()">
                  <!-- Basic Information -->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">First Name *</label>
                        <input type="text" class="form-control" formControlName="firstName"
                               [class.is-invalid]="patientForm.get('firstName')?.invalid && patientForm.get('firstName')?.touched">
                        <div class="invalid-feedback" *ngIf="patientForm.get('firstName')?.invalid && patientForm.get('firstName')?.touched">
                          First name is required
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Last Name *</label>
                        <input type="text" class="form-control" formControlName="lastName"
                               [class.is-invalid]="patientForm.get('lastName')?.invalid && patientForm.get('lastName')?.touched">
                        <div class="invalid-feedback" *ngIf="patientForm.get('lastName')?.invalid && patientForm.get('lastName')?.touched">
                          Last name is required
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Email Address *</label>
                    <input type="email" class="form-control" formControlName="email"
                           [class.is-invalid]="patientForm.get('email')?.invalid && patientForm.get('email')?.touched">
                    <div class="invalid-feedback" *ngIf="patientForm.get('email')?.invalid && patientForm.get('email')?.touched">
                      <div *ngIf="patientForm.get('email')?.errors?.['required']">Email is required</div>
                      <div *ngIf="patientForm.get('email')?.errors?.['email']">Please enter a valid email</div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Password *</label>
                        <input type="password" class="form-control" formControlName="password"
                               [class.is-invalid]="patientForm.get('password')?.invalid && patientForm.get('password')?.touched">
                        <div class="invalid-feedback" *ngIf="patientForm.get('password')?.invalid && patientForm.get('password')?.touched">
                          Password must be at least 6 characters
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Phone Number *</label>
                        <input type="tel" class="form-control" formControlName="phone"
                               [class.is-invalid]="patientForm.get('phone')?.invalid && patientForm.get('phone')?.touched">
                        <div class="invalid-feedback" *ngIf="patientForm.get('phone')?.invalid && patientForm.get('phone')?.touched">
                          Valid phone number is required (10 digits)
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Personal Information -->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Date of Birth *</label>
                        <input type="date" class="form-control" formControlName="dateOfBirth"
                               [class.is-invalid]="patientForm.get('dateOfBirth')?.invalid && patientForm.get('dateOfBirth')?.touched">
                        <div class="invalid-feedback" *ngIf="patientForm.get('dateOfBirth')?.invalid && patientForm.get('dateOfBirth')?.touched">
                          Date of birth is required
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Gender *</label>
                        <select class="form-select" formControlName="gender"
                                [class.is-invalid]="patientForm.get('gender')?.invalid && patientForm.get('gender')?.touched"
                                style="padding: 0.75rem; border: 1px solid #ced4da; border-radius: 0.375rem; background-color: #fff;">
                          <option value="" disabled>Select Gender</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                        <div class="invalid-feedback" *ngIf="patientForm.get('gender')?.invalid && patientForm.get('gender')?.touched">
                          Gender is required
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Address Information -->
                  <div class="form-group">
                    <label class="form-label">Address *</label>
                    <textarea class="form-control" formControlName="address" rows="2"
                              [class.is-invalid]="patientForm.get('address')?.invalid && patientForm.get('address')?.touched"
                              placeholder="Enter your full address"></textarea>
                    <div class="invalid-feedback" *ngIf="patientForm.get('address')?.invalid && patientForm.get('address')?.touched">
                      Address is required
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">City *</label>
                        <input type="text" class="form-control" formControlName="city"
                               [class.is-invalid]="patientForm.get('city')?.invalid && patientForm.get('city')?.touched">
                        <div class="invalid-feedback" *ngIf="patientForm.get('city')?.invalid && patientForm.get('city')?.touched">
                          City is required
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">State *</label>
                        <input type="text" class="form-control" formControlName="state"
                               [class.is-invalid]="patientForm.get('state')?.invalid && patientForm.get('state')?.touched">
                        <div class="invalid-feedback" *ngIf="patientForm.get('state')?.invalid && patientForm.get('state')?.touched">
                          State is required
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Pin Code *</label>
                        <input type="text" class="form-control" formControlName="pincode"
                               [class.is-invalid]="patientForm.get('pincode')?.invalid && patientForm.get('pincode')?.touched"
                               placeholder="6 digits">
                        <div class="invalid-feedback" *ngIf="patientForm.get('pincode')?.invalid && patientForm.get('pincode')?.touched">
                          Valid 6-digit pin code is required
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Emergency & Medical Information -->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Emergency Contact *</label>
                        <input type="tel" class="form-control" formControlName="emergencyContact"
                               [class.is-invalid]="patientForm.get('emergencyContact')?.invalid && patientForm.get('emergencyContact')?.touched"
                               placeholder="10 digits">
                        <div class="invalid-feedback" *ngIf="patientForm.get('emergencyContact')?.invalid && patientForm.get('emergencyContact')?.touched">
                          Valid emergency contact is required (10 digits)
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Blood Group *</label>
                        <select class="form-select" formControlName="bloodGroup"
                                [class.is-invalid]="patientForm.get('bloodGroup')?.invalid && patientForm.get('bloodGroup')?.touched"
                                style="padding: 0.75rem; border: 1px solid #ced4da; border-radius: 0.375rem; background-color: #fff;">
                          <option value="" disabled>Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                        <div class="invalid-feedback" *ngIf="patientForm.get('bloodGroup')?.invalid && patientForm.get('bloodGroup')?.touched">
                          Blood group is required
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Medical History</label>
                    <textarea class="form-control" formControlName="medicalHistory" rows="3"
                              placeholder="Enter any relevant medical history, allergies, chronic conditions, etc. (Optional)"></textarea>
                  </div>

                  <!-- Profile Image Upload -->
                  <div class="form-group" *ngIf="enableProfileImages">
                    <label class="form-label">Profile Image (Optional)</label>
                    <input type="file" class="form-control" accept="image/*" (change)="onImageSelect($event, 'patient')"
                           [class.is-invalid]="patientForm.get('profileImage')?.invalid && patientForm.get('profileImage')?.touched">
                    <small class="form-text text-muted">Upload a profile picture (any size - will be automatically compressed to 32x32px for database efficiency)</small>
                    
                    <!-- Image Preview -->
                    <div *ngIf="patientImagePreview" class="mt-2">
                      <img [src]="patientImagePreview" alt="Profile Preview" class="img-thumbnail" 
                           style="max-width: 150px; max-height: 150px;">
                      <button type="button" class="btn btn-sm btn-outline-danger ms-2" (click)="removeImage('patient')">
                        <i class="fas fa-times"></i> Remove
                      </button>
                    </div>
                  </div>

                  <button type="submit" class="btn btn-primary w-100 btn-lg" [disabled]="patientForm.invalid || isLoading">
                    <span *ngIf="isLoading" class="loading-spinner me-2"></span>
                    {{ isLoading ? 'Creating Account...' : 'Create Patient Account' }}
                  </button>
                </form>

                <!-- Doctor Registration Form -->
                <form *ngIf="selectedRole === 'DOCTOR'" [formGroup]="doctorForm" (ngSubmit)="onSubmitDoctor()">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">First Name *</label>
                        <input type="text" class="form-control" formControlName="firstName"
                               [class.is-invalid]="doctorForm.get('firstName')?.invalid && doctorForm.get('firstName')?.touched">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Last Name *</label>
                        <input type="text" class="form-control" formControlName="lastName"
                               [class.is-invalid]="doctorForm.get('lastName')?.invalid && doctorForm.get('lastName')?.touched">
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Email Address *</label>
                    <input type="email" class="form-control" formControlName="email"
                           [class.is-invalid]="doctorForm.get('email')?.invalid && doctorForm.get('email')?.touched">
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Password *</label>
                        <input type="password" class="form-control" formControlName="password"
                               [class.is-invalid]="doctorForm.get('password')?.invalid && doctorForm.get('password')?.touched">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Phone Number *</label>
                        <input type="tel" class="form-control" formControlName="phone"
                               [class.is-invalid]="doctorForm.get('phone')?.invalid && doctorForm.get('phone')?.touched">
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">License Number *</label>
                        <input type="text" class="form-control" formControlName="licenseNumber"
                               [class.is-invalid]="doctorForm.get('licenseNumber')?.invalid && doctorForm.get('licenseNumber')?.touched">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Specialization *</label>
                        <input type="text" class="form-control" formControlName="specialization"
                               [class.is-invalid]="doctorForm.get('specialization')?.invalid && doctorForm.get('specialization')?.touched">
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Qualification *</label>
                    <textarea class="form-control" formControlName="qualification" rows="2"
                              [class.is-invalid]="doctorForm.get('qualification')?.invalid && doctorForm.get('qualification')?.touched"></textarea>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Experience (Years) *</label>
                        <input type="number" class="form-control" formControlName="experienceYears"
                               [class.is-invalid]="doctorForm.get('experienceYears')?.invalid && doctorForm.get('experienceYears')?.touched">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Consultation Fee (₹) *</label>
                        <input type="number" class="form-control" formControlName="consultationFee"
                               [class.is-invalid]="doctorForm.get('consultationFee')?.invalid && doctorForm.get('consultationFee')?.touched">
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Hospital Affiliation</label>
                        <input type="text" class="form-control" formControlName="hospitalAffiliation"
                               placeholder="Hospital name">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">City *</label>
                        <input type="text" class="form-control" formControlName="city"
                               [class.is-invalid]="doctorForm.get('city')?.invalid && doctorForm.get('city')?.touched">
                      </div>
                    </div>
                  </div>

                  <!-- Address Field -->
                  <div class="form-group">
                    <label class="form-label">Clinic/Hospital Address</label>
                    <textarea class="form-control" rows="3" formControlName="address" 
                              placeholder="Enter complete clinic or hospital address"></textarea>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">State *</label>
                        <input type="text" class="form-control" formControlName="state"
                               [class.is-invalid]="doctorForm.get('state')?.invalid && doctorForm.get('state')?.touched">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Pincode</label>
                        <input type="text" class="form-control" formControlName="pincode"
                               placeholder="6-digit pincode">
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">About</label>
                    <textarea class="form-control" formControlName="about" rows="3"
                              placeholder="Brief description about yourself and your practice"></textarea>
                  </div>

                  <!-- Profile Image Upload -->
                  <div class="form-group" *ngIf="enableProfileImages">
                    <label class="form-label">Profile Image (Optional)</label>
                    <input type="file" class="form-control" accept="image/*" (change)="onImageSelect($event, 'doctor')"
                           [class.is-invalid]="doctorForm.get('profileImage')?.invalid && doctorForm.get('profileImage')?.touched">
                    <small class="form-text text-muted">Upload a profile picture (any size - will be automatically compressed to 32x32px for database efficiency)</small>
                    
                    <!-- Image Preview -->
                    <div *ngIf="doctorImagePreview" class="mt-2">
                      <img [src]="doctorImagePreview" alt="Profile Preview" class="img-thumbnail" 
                           style="max-width: 150px; max-height: 150px;">
                      <button type="button" class="btn btn-sm btn-outline-danger ms-2" (click)="removeImage('doctor')">
                        <i class="fas fa-times"></i> Remove
                      </button>
                    </div>
                  </div>

                  <button type="submit" class="btn btn-success w-100 btn-lg" [disabled]="doctorForm.invalid || isLoading">
                    <span *ngIf="isLoading" class="loading-spinner me-2"></span>
                    {{ isLoading ? 'Submitting Application...' : 'Submit Doctor Application' }}
                  </button>
                </form>

                <div class="auth-footer text-center mt-4">
                  <p class="text-muted">
                    Already have an account? 
                    <a routerLink="/auth/login" class="text-primary">Sign in here</a>
                  </p>
                </div>
              </div>
            </div>
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

    /* Select element styling */
    .form-select {
      display: block;
      width: 100%;
      padding: 0.75rem;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #212529;
      background-color: #fff;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      background-size: 16px 12px;
      border: 1px solid #ced4da;
      border-radius: 0.375rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      appearance: none;
    }

    .form-select:focus {
      border-color: #86b7fe;
      outline: 0;
      box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }

    .form-select option {
      padding: 0.5rem;
      color: #212529;
      background-color: #fff;
    }
    
    .active-page {
      background: rgba(255, 255, 255, 0.15) !important;
      transform: scale(1.05);
    }
    
    .navbar-toggler:focus {
      box-shadow: none;
    }
    
    .auth-container {
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    
    .auth-card {
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.95);
    }
    
    .role-option.active {
      border-color: var(--primary-color) !important;
      background-color: rgba(37, 99, 235, 0.05);
    }
    
    .role-option:hover {
      border-color: var(--primary-color);
      background-color: rgba(37, 99, 235, 0.02);
    }
    
    .form-control {
      height: 2.75rem;
    }
    
    .btn-lg {
      height: 3rem;
      font-weight: 600;
    }
  `]
})
export class RegisterComponent {
  selectedRole: 'PATIENT' | 'DOCTOR' = 'PATIENT';
  patientForm: FormGroup;
  doctorForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  patientImagePreview: string | null = null;
  doctorImagePreview: string | null = null;
  enableProfileImages = false; // Temporarily disabled to prevent database issues

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      emergencyContact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      bloodGroup: ['', Validators.required],
      medicalHistory: [''],
      profileImage: ['']
    });

    // Debug: Log form value changes
    this.patientForm.valueChanges.subscribe(values => {
      console.log('Patient form values:', values);
    });

    this.doctorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      licenseNumber: ['', Validators.required],
      specialization: ['', Validators.required],
      qualification: ['', Validators.required],
      experienceYears: ['', [Validators.required, Validators.min(0)]],
      consultationFee: ['', [Validators.required, Validators.min(1)]],
      hospitalAffiliation: [''],
      address: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: [''],
      about: [''],
      profileImage: ['']
    });
  }

  selectRole(role: 'PATIENT' | 'DOCTOR'): void {
    this.selectedRole = role;
    this.errorMessage = '';
    this.successMessage = '';
  }

  // Debug method to check form values
  getFormDebugInfo(): string {
    if (this.selectedRole === 'PATIENT') {
      return `Gender: "${this.patientForm.get('gender')?.value}", Blood Group: "${this.patientForm.get('bloodGroup')?.value}"`;
    }
    return 'No form selected';
  }

  onImageSelect(event: any, formType: 'patient' | 'doctor'): void {
    if (!this.enableProfileImages) {
      console.log('Profile images are disabled');
      return;
    }
    
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Please select a valid image file';
        return;
      }

      // Compress and convert to base64 (no size limit - we compress automatically)
      this.compressAndConvertImage(file, formType);
    }
  }

  compressAndConvertImage(file: File, formType: 'patient' | 'doctor'): void {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Set canvas size (ultra small for database efficiency)
      const maxSize = 32; // 32x32 pixels max
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      
      // Convert to base64 with ultra high compression for tiny size
      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.05); // 5% quality for ultra small size
      
      // Check if compressed image is still too large - if so, skip image upload
      if (compressedBase64.length > 1500) { // 1.5KB limit
        console.warn('Image too large even after compression, skipping image upload');
        // Don't set error message, just skip the image
        if (formType === 'patient') {
          this.patientImagePreview = null;
          this.patientForm.patchValue({ profileImage: '' });
        } else {
          this.doctorImagePreview = null;
          this.doctorForm.patchValue({ profileImage: '' });
        }
        return;
      }
      
      if (formType === 'patient') {
        this.patientImagePreview = compressedBase64;
        this.patientForm.patchValue({ profileImage: compressedBase64 });
      } else {
        this.doctorImagePreview = compressedBase64;
        this.doctorForm.patchValue({ profileImage: compressedBase64 });
      }
      
      this.errorMessage = '';
      console.log(`Compressed image size: ${compressedBase64.length} characters (${Math.round(compressedBase64.length/1000)}KB)`);
    };
    
    img.src = URL.createObjectURL(file);
  }

  removeImage(formType: 'patient' | 'doctor'): void {
    if (formType === 'patient') {
      this.patientImagePreview = null;
      this.patientForm.patchValue({ profileImage: '' });
    } else {
      this.doctorImagePreview = null;
      this.doctorForm.patchValue({ profileImage: '' });
    }
  }

  onSubmitPatient(): void {
    if (this.patientForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.registerPatient(this.patientForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.token) {
            this.router.navigate(['/patient/dashboard']);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        }
      });
    }
  }

  onSubmitDoctor(): void {
    if (this.doctorForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.registerDoctor(this.doctorForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = response.message || '🎉 Registration submitted successfully! Your application is under review. You will be notified via your registered email once approved. Thank you for joining HealthBridge!';
          this.doctorForm.reset();
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        }
      });
    }
  }
}
