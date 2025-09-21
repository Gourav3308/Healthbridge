import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Patient } from '../../../models/patient.model';
import { AdminService } from '../../../services/admin.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>

    <div class="patient-details-container" style="margin-top: 70px; padding: 2rem 0; min-height: calc(100vh - 8rem);">
      <div class="container">
        <!-- Page Header -->
        <div class="page-header d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 class="mb-1">Patient Details</h1>
            <p class="text-muted">View complete patient information</p>
          </div>
          <div class="header-actions">
            <a routerLink="/admin/manage-patients" class="btn btn-outline-secondary me-2">
              <i class="fas fa-arrow-left me-2"></i>Back to Patients
            </a>
            <button class="btn btn-primary" (click)="editPatient()" *ngIf="patient">
              <i class="fas fa-edit me-2"></i>Edit Patient
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3">Loading patient information...</p>
        </div>

        <!-- Patient Information -->
        <div *ngIf="patient && !isLoading" class="row">
          <!-- Personal Information Card -->
          <div class="col-lg-6 mb-4">
            <div class="card h-100">
              <div class="card-header">
                <h5 class="mb-0"><i class="fas fa-user me-2"></i>Personal Information</h5>
              </div>
              <div class="card-body">
                <div class="patient-info">
                  <div class="info-item d-flex justify-content-between py-2 border-bottom">
                    <span class="fw-semibold">Full Name:</span>
                    <span>{{ patient.firstName }} {{ patient.lastName }}</span>
                  </div>
                  <div class="info-item d-flex justify-content-between py-2 border-bottom">
                    <span class="fw-semibold">Email:</span>
                    <span>{{ patient.email }}</span>
                  </div>
                  <div class="info-item d-flex justify-content-between py-2 border-bottom">
                    <span class="fw-semibold">Phone:</span>
                    <span>{{ patient.phone || 'Not provided' }}</span>
                  </div>
                  <div class="info-item d-flex justify-content-between py-2 border-bottom">
                    <span class="fw-semibold">Date of Birth:</span>
                    <span>{{ formatDate(patient.dateOfBirth) }}</span>
                  </div>
                  <div class="info-item d-flex justify-content-between py-2 border-bottom">
                    <span class="fw-semibold">Gender:</span>
                    <span>{{ patient.gender || 'Not specified' }}</span>
                  </div>
                  <div class="info-item d-flex justify-content-between py-2 border-bottom">
                    <span class="fw-semibold">Blood Group:</span>
                    <span>
                      <span *ngIf="patient.bloodGroup" class="badge bg-danger">{{ patient.bloodGroup }}</span>
                      <span *ngIf="!patient.bloodGroup" class="text-muted">Not specified</span>
                    </span>
                  </div>
                  <div class="info-item d-flex justify-content-between py-2">
                    <span class="fw-semibold">Status:</span>
                    <span class="badge" [class]="patient.isActive ? 'bg-success' : 'bg-secondary'">
                      {{ patient.isActive ? 'Active' : 'Inactive' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact & Address Information Card -->
          <div class="col-lg-6 mb-4">
            <div class="card h-100">
              <div class="card-header">
                <h5 class="mb-0"><i class="fas fa-map-marker-alt me-2"></i>Contact & Address</h5>
              </div>
              <div class="card-body">
                <div class="patient-info">
                  <div class="info-item d-flex justify-content-between py-2 border-bottom">
                    <span class="fw-semibold">Emergency Contact:</span>
                    <span>{{ patient.emergencyContact || 'Not provided' }}</span>
                  </div>
                  <div class="info-item py-2 border-bottom">
                    <span class="fw-semibold d-block mb-1">Address:</span>
                    <span class="text-muted">{{ patient.address || 'Not provided' }}</span>
                  </div>
                  <div class="info-item d-flex justify-content-between py-2 border-bottom">
                    <span class="fw-semibold">City:</span>
                    <span>{{ patient.city || 'Not provided' }}</span>
                  </div>
                  <div class="info-item d-flex justify-content-between py-2 border-bottom">
                    <span class="fw-semibold">State:</span>
                    <span>{{ patient.state || 'Not provided' }}</span>
                  </div>
                  <div class="info-item d-flex justify-content-between py-2">
                    <span class="fw-semibold">Pincode:</span>
                    <span>{{ patient.pincode || 'Not provided' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Medical Information Card -->
          <div class="col-lg-12 mb-4">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0"><i class="fas fa-notes-medical me-2"></i>Medical Information</h5>
              </div>
              <div class="card-body">
                <div class="info-item">
                  <span class="fw-semibold d-block mb-2">Medical History:</span>
                  <div class="medical-history">
                    <p class="text-muted mb-0">{{ patient.medicalHistory || 'No medical history provided' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Account Information Card -->
          <div class="col-lg-12 mb-4">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0"><i class="fas fa-info-circle me-2"></i>Account Information</h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-4">
                    <div class="info-item text-center">
                      <span class="fw-semibold d-block">Patient ID</span>
                      <span class="text-primary fs-4">#{{ patient.id }}</span>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="info-item text-center">
                      <span class="fw-semibold d-block">Registration Date</span>
                      <span class="text-muted">{{ formatDate(patient.createdAt) }}</span>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="info-item text-center">
                      <span class="fw-semibold d-block">Last Updated</span>
                      <span class="text-muted">{{ formatDate(patient.updatedAt) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div *ngIf="!patient && !isLoading" class="text-center py-5">
          <i class="fas fa-exclamation-triangle text-warning" style="font-size: 3rem; margin-bottom: 1rem;"></i>
          <h5>Patient Not Found</h5>
          <p class="text-muted">The requested patient could not be found.</p>
          <a routerLink="/admin/manage-patients" class="btn btn-primary">
            <i class="fas fa-arrow-left me-2"></i>Back to Patients
          </a>
        </div>
      </div>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .patient-details-container {
      background: #f8f9fa;
    }
    
    .card {
      border: none;
      box-shadow: var(--shadow-sm);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    .card-header {
      background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
      color: white;
      border: none;
    }
    
    .info-item {
      font-size: 0.95rem;
    }
    
    .medical-history {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 0.375rem;
      border-left: 4px solid #007bff;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
      border: none;
    }
    
    .btn-primary:hover {
      background: linear-gradient(135deg, #0056b3 0%, #004085 100%);
      transform: translateY(-1px);
    }
    
    @media (max-width: 768px) {
      .header-actions {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  `]
})
export class PatientDetailsComponent implements OnInit {
  patient: Patient | null = null;
  patientId: number = 0;
  isLoading = false;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
        this.patient = patient;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading patient:', error);
        this.isLoading = false;
      }
    });
  }

  formatDate(date: string | Date | undefined): string {
    if (!date) return 'Not provided';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  editPatient(): void {
    if (this.patient) {
      this.router.navigate(['/admin/edit-patient', this.patient.id]);
    }
  }

}
