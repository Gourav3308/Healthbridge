import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Patient, PatientUpdateRequest } from '../../../models/patient.model';
import { AdminService } from '../../../services/admin.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-edit-patient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>

    <div class="edit-patient-container" style="margin-top: 70px; padding: 2rem 0; min-height: calc(100vh - 8rem);">
      <div class="container">
        <!-- Page Header -->
        <div class="page-header d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 class="mb-1">Edit Patient</h1>
            <p class="text-muted">Update patient information</p>
          </div>
          <a routerLink="/admin/manage-patients" class="btn btn-outline-secondary">
            <i class="fas fa-arrow-left me-2"></i>Back to Patients
          </a>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading && !currentPatient" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3">Loading patient information...</p>
        </div>

        <!-- Patient Form -->
        <div class="row" *ngIf="!isLoading || currentPatient">
          <div class="col-lg-8 mx-auto">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">Patient Information</h5>
              </div>
              <div class="card-body">
                <form [formGroup]="patientForm" (ngSubmit)="onSubmit()">
                  <div class="row">
                    <!-- Basic Information -->
                    <div class="col-md-6">
                      <div class="form-group mb-3">
                        <label class="form-label">First Name *</label>
                        <input type="text" class="form-control" formControlName="firstName"
                               [class.is-invalid]="patientForm.get('firstName')?.invalid && patientForm.get('firstName')?.touched">
                        <div class="invalid-feedback" *ngIf="patientForm.get('firstName')?.invalid && patientForm.get('firstName')?.touched">
                          First name is required
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group mb-3">
                        <label class="form-label">Last Name *</label>
                        <input type="text" class="form-control" formControlName="lastName"
                               [class.is-invalid]="patientForm.get('lastName')?.invalid && patientForm.get('lastName')?.touched">
                        <div class="invalid-feedback" *ngIf="patientForm.get('lastName')?.invalid && patientForm.get('lastName')?.touched">
                          Last name is required
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group mb-3">
                        <label class="form-label">Email *</label>
                        <input type="email" class="form-control" formControlName="email"
                               [class.is-invalid]="patientForm.get('email')?.invalid && patientForm.get('email')?.touched">
                        <div class="invalid-feedback" *ngIf="patientForm.get('email')?.invalid && patientForm.get('email')?.touched">
                          Valid email is required
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group mb-3">
                        <label class="form-label">Phone *</label>
                        <input type="tel" class="form-control" formControlName="phone"
                               [class.is-invalid]="patientForm.get('phone')?.invalid && patientForm.get('phone')?.touched">
                        <div class="invalid-feedback" *ngIf="patientForm.get('phone')?.invalid && patientForm.get('phone')?.touched">
                          Valid phone number is required
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group mb-3">
                        <label class="form-label">Date of Birth</label>
                        <input type="date" class="form-control" formControlName="dateOfBirth">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group mb-3">
                        <label class="form-label">Gender</label>
                        <select class="form-control" formControlName="gender">
                          <option value="">Select Gender</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group mb-3">
                        <label class="form-label">Blood Group</label>
                        <select class="form-control" formControlName="bloodGroup">
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
                    <div class="col-md-6">
                      <div class="form-group mb-3">
                        <label class="form-label">Emergency Contact</label>
                        <input type="tel" class="form-control" formControlName="emergencyContact" placeholder="Emergency contact number">
                      </div>
                    </div>
                  </div>

                  <!-- Address Information -->
                  <div class="form-group mb-3">
                    <label class="form-label">Address</label>
                    <textarea class="form-control" rows="3" formControlName="address" placeholder="Enter full address"></textarea>
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

                  <!-- Medical History -->
                  <div class="form-group mb-3">
                    <label class="form-label">Medical History</label>
                    <textarea class="form-control" rows="4" formControlName="medicalHistory" placeholder="Any medical conditions, allergies, or important medical information"></textarea>
                  </div>

                  <!-- Status -->
                  <div class="form-group mb-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" formControlName="isActive" id="isActive">
                      <label class="form-check-label" for="isActive">
                        Active Patient
                      </label>
                    </div>
                  </div>

                  <!-- Form Actions -->
                  <div class="d-flex justify-content-between">
                    <button type="button" class="btn btn-outline-secondary" (click)="resetForm()">
                      <i class="fas fa-undo me-2"></i>Reset
                    </button>
                    <button type="submit" class="btn btn-primary" [disabled]="patientForm.invalid || isLoading">
                      <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                      <i *ngIf="!isLoading" class="fas fa-save me-2"></i>
                      {{ isLoading ? 'Saving...' : 'Update Patient' }}
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
    .edit-patient-container {
      background: #f8f9fa;
    }
    
    .card {
      border: none;
      box-shadow: var(--shadow-sm);
    }
    
    .card-header {
      background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
      color: white;
      border: none;
    }
    
    .form-control {
      height: 2.5rem;
      border: 1px solid #ddd;
      border-radius: 0.375rem;
    }
    
    .form-control:focus {
      border-color: #dc3545;
      box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
      border: none;
    }
    
    .btn-primary:hover {
      background: linear-gradient(135deg, #c82333 0%, #a71e2a 100%);
      transform: translateY(-1px);
    }
  `]
})
export class EditPatientComponent implements OnInit {
  patientForm: FormGroup;
  currentPatient: Patient | null = null;
  patientId: number = 0;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.patientForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      dateOfBirth: [''],
      gender: [''],
      bloodGroup: [''],
      emergencyContact: [''],
      address: [''],
      city: [''],
      state: [''],
      pincode: [''],
      medicalHistory: [''],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.patientId = +params['id'];
      if (this.patientId) {
        this.loadPatient();
      }
    });
  }

  loadPatient(): void {
    this.isLoading = true;
    this.adminService.getPatientById(this.patientId).subscribe({
      next: (patient) => {
        this.currentPatient = patient;
        this.patientForm.patchValue({
          firstName: patient.firstName,
          lastName: patient.lastName,
          email: patient.email,
          phone: patient.phone,
          dateOfBirth: patient.dateOfBirth ? new Date(patient.dateOfBirth).toISOString().split('T')[0] : '',
          gender: patient.gender,
          bloodGroup: patient.bloodGroup,
          emergencyContact: patient.emergencyContact,
          address: patient.address,
          city: patient.city,
          state: patient.state,
          pincode: patient.pincode,
          medicalHistory: patient.medicalHistory,
          isActive: patient.isActive
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading patient:', error);
        alert('Error loading patient information');
        this.router.navigate(['/admin/manage-patients']);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      this.isLoading = true;
      const updateData: PatientUpdateRequest = this.patientForm.value;

      this.adminService.updatePatient(this.patientId, updateData).subscribe({
        next: (updatedPatient) => {
          this.isLoading = false;
          alert('Patient updated successfully!');
          this.router.navigate(['/admin/manage-patients']);
        },
        error: (error) => {
          console.error('Error updating patient:', error);
          alert('Error updating patient. Please try again.');
          this.isLoading = false;
        }
      });
    }
  }

  resetForm(): void {
    if (this.currentPatient) {
      this.patientForm.patchValue({
        firstName: this.currentPatient.firstName,
        lastName: this.currentPatient.lastName,
        email: this.currentPatient.email,
        phone: this.currentPatient.phone,
        dateOfBirth: this.currentPatient.dateOfBirth ? new Date(this.currentPatient.dateOfBirth).toISOString().split('T')[0] : '',
        gender: this.currentPatient.gender,
        bloodGroup: this.currentPatient.bloodGroup,
        emergencyContact: this.currentPatient.emergencyContact,
        address: this.currentPatient.address,
        city: this.currentPatient.city,
        state: this.currentPatient.state,
        pincode: this.currentPatient.pincode,
        medicalHistory: this.currentPatient.medicalHistory,
        isActive: this.currentPatient.isActive
      });
    }
  }

}
