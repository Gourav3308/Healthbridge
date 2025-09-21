import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Appointment } from '../../../models/appointment.model';
import { AuthService } from '../../../services/auth.service';
import { DoctorService } from '../../../services/doctor.service';
import { NotificationService } from '../../../services/notification.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, HeaderComponent],
  template: `
    <app-header></app-header>
    
    <div class="patient-details-container" style="margin-top: 70px; padding: 2rem 0; min-height: calc(100vh - 8rem);">
      <div class="container">
        <!-- Page Header -->
        <div class="page-header d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 class="mb-1">Patient Details</h1>
            <p class="text-muted">Complete patient information for appointment</p>
          </div>
          <div class="header-actions">
            <a routerLink="/doctor/pending-appointments" class="btn btn-outline-secondary me-2">
              <i class="fas fa-arrow-left me-2"></i>Back to Pending
            </a>
            <a routerLink="/doctor/dashboard" class="btn btn-outline-primary">
              <i class="fas fa-home me-2"></i>Dashboard
            </a>
          </div>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3">Loading patient details...</p>
        </div>

        <!-- Error State -->
        <div *ngIf="error" class="alert alert-danger">
          <i class="fas fa-exclamation-triangle me-2"></i>
          {{ error }}
        </div>

        <!-- Patient Details -->
        <div *ngIf="!isLoading && appointment" class="row">
          <!-- Patient Information Card -->
          <div class="col-lg-8">
            <div class="patient-info-card card mb-4">
              <div class="card-header bg-primary text-white">
                <h5 class="mb-0">
                  <i class="fas fa-user me-2"></i>Patient Information
                </h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <!-- Patient Avatar and Basic Info -->
                  <div class="col-md-4 text-center mb-4">
                    <div class="patient-avatar mb-3">
                      <img [src]="getPatientImageUrl(appointment.patient)" 
                           alt="Patient Photo" 
                           class="rounded-circle"
                           style="width: 120px; height: 120px; object-fit: cover; border: 4px solid var(--primary-color);">
                    </div>
                    <h4 class="mb-1">{{ appointment.patient.firstName }} {{ appointment.patient.lastName }}</h4>
                    <p class="text-muted mb-2">Patient ID: {{ appointment.patient.id }}</p>
                    <span class="badge bg-info">{{ appointment.isFirstVisit ? 'First Visit' : 'Return Visit' }}</span>
                  </div>

                  <!-- Patient Details -->
                  <div class="col-md-8">
                    <div class="patient-details">
                      <div class="row mb-3">
                        <div class="col-sm-6">
                          <div class="detail-item">
                            <i class="fas fa-envelope text-primary me-2"></i>
                            <strong>Email:</strong>
                            <div class="mt-1">{{ appointment.patientEmail }}</div>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="detail-item">
                            <i class="fas fa-phone text-primary me-2"></i>
                            <strong>Phone:</strong>
                            <div class="mt-1">{{ appointment.patientPhone }}</div>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-sm-6">
                          <div class="detail-item">
                            <i class="fas fa-birthday-cake text-primary me-2"></i>
                            <strong>Age:</strong>
                            <div class="mt-1">{{ calculateAge(appointment.patient.dateOfBirth) }}{{ calculateAge(appointment.patient.dateOfBirth) !== 'N/A' ? ' years' : '' }}</div>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="detail-item">
                            <i class="fas fa-venus-mars text-primary me-2"></i>
                            <strong>Gender:</strong>
                            <div class="mt-1">{{ appointment.patient.gender || 'Not specified' }}</div>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-sm-6">
                          <div class="detail-item">
                            <i class="fas fa-tint text-primary me-2"></i>
                            <strong>Blood Group:</strong>
                            <div class="mt-1">
                              <span class="badge bg-danger">{{ appointment.patient.bloodGroup || 'Not specified' }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="detail-item">
                            <i class="fas fa-phone-alt text-primary me-2"></i>
                            <strong>Emergency Contact:</strong>
                            <div class="mt-1">{{ appointment.emergencyContact || 'Not provided' }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Medical Information Card -->
            <div class="medical-info-card card mb-4">
              <div class="card-header bg-success text-white">
                <h5 class="mb-0">
                  <i class="fas fa-notes-medical me-2"></i>Medical Information
                </h5>
              </div>
              <div class="card-body">
                <!-- Reason for Visit -->
                <div class="mb-4">
                  <h6 class="text-primary">
                    <i class="fas fa-stethoscope me-2"></i>Reason for Visit
                  </h6>
                  <div class="reason-content p-3 bg-light rounded">
                    {{ appointment.reasonForVisit }}
                  </div>
                </div>

                <!-- Current Symptoms -->
                <div class="mb-4" *ngIf="appointment.symptoms">
                  <h6 class="text-primary">
                    <i class="fas fa-thermometer-half me-2"></i>Current Symptoms
                  </h6>
                  <div class="symptoms-content p-3 bg-light rounded">
                    {{ appointment.symptoms }}
                  </div>
                </div>

                <!-- Medical History -->
                <div class="mb-3" *ngIf="appointment.medicalHistory">
                  <h6 class="text-primary">
                    <i class="fas fa-history me-2"></i>Medical History
                  </h6>
                  <div class="history-content p-3 bg-light rounded">
                    {{ appointment.medicalHistory }}
                  </div>
                </div>

                <!-- No Additional Info -->
                <div *ngIf="!appointment.symptoms && !appointment.medicalHistory" class="text-center py-3">
                  <i class="fas fa-info-circle text-muted me-2"></i>
                  <span class="text-muted">No additional medical information provided</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Appointment Summary Sidebar -->
          <div class="col-lg-4">
            <div class="appointment-summary-card card mb-4">
              <div class="card-header bg-info text-white">
                <h5 class="mb-0">
                  <i class="fas fa-calendar-check me-2"></i>Appointment Summary
                </h5>
              </div>
              <div class="card-body">
                <div class="appointment-details">
                  <div class="detail-row mb-3">
                    <i class="fas fa-calendar text-info me-2"></i>
                    <strong>Date:</strong>
                    <div class="mt-1">{{ formatDate(appointment.appointmentDate) }}</div>
                  </div>

                  <div class="detail-row mb-3">
                    <i class="fas fa-clock text-info me-2"></i>
                    <strong>Time:</strong>
                    <div class="mt-1">{{ formatTime(appointment.appointmentTime) }}</div>
                  </div>

                  <div class="detail-row mb-3">
                    <i class="fas fa-user-md text-info me-2"></i>
                    <strong>Type:</strong>
                    <div class="mt-1">{{ appointment.appointmentType }}</div>
                  </div>

                  <div class="detail-row mb-3">
                    <i class="fas fa-rupee-sign text-info me-2"></i>
                    <strong>Fee:</strong>
                    <div class="mt-1 text-success fw-bold">₹{{ appointment.consultationFee }}</div>
                  </div>

                  <div class="detail-row mb-3">
                    <i class="fas fa-credit-card text-info me-2"></i>
                    <strong>Payment Status:</strong>
                    <div class="mt-1">
                      <span class="badge bg-success">{{ appointment.paymentStatus }}</span>
                    </div>
                  </div>

                  <div class="detail-row mb-3">
                    <i class="fas fa-info-circle text-info me-2"></i>
                    <strong>Status:</strong>
                    <div class="mt-1">
                      <span class="badge bg-warning">{{ appointment.status }}</span>
                    </div>
                  </div>

                  <div class="detail-row">
                    <i class="fas fa-clock text-info me-2"></i>
                    <strong>Requested:</strong>
                    <div class="mt-1">{{ getTimeAgo(appointment.createdAt) }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="action-buttons-card card">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="fas fa-tasks me-2"></i>Actions
                </h6>
                <div class="d-grid gap-2">
                  <button class="btn btn-success" 
                          (click)="approveAppointment()"
                          [disabled]="isProcessing">
                    <span *ngIf="isProcessing" class="spinner-border spinner-border-sm me-2"></span>
                    <i *ngIf="!isProcessing" class="fas fa-check me-2"></i>
                    Approve Appointment
                  </button>
                  
                  <button class="btn btn-outline-danger" 
                          (click)="rejectAppointment()"
                          [disabled]="isProcessing">
                    <i class="fas fa-times me-2"></i>
                    Reject Appointment
                  </button>
                  
                  <hr>
                  
                  <a routerLink="/doctor/pending-appointments" class="btn btn-outline-secondary">
                    <i class="fas fa-list me-2"></i>
                    Back to All Pending
                  </a>
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
    .patient-details-container {
      background: #f8f9fa;
    }
    
    .patient-info-card, .medical-info-card, .appointment-summary-card, .action-buttons-card {
      border: none;
      box-shadow: var(--shadow-sm);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .patient-info-card:hover, .medical-info-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    .detail-item {
      padding: 0.75rem;
      border-left: 3px solid var(--primary-color);
      background: rgba(var(--primary-rgb), 0.05);
      border-radius: 0 0.375rem 0.375rem 0;
      margin-bottom: 1rem;
    }
    
    .detail-row {
      padding: 0.5rem;
      border-bottom: 1px solid #e9ecef;
    }
    
    .detail-row:last-child {
      border-bottom: none;
    }
    
    .reason-content, .symptoms-content, .history-content {
      line-height: 1.6;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    
    .patient-avatar img {
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    .card-header {
      border-bottom: 2px solid rgba(255,255,255,0.2);
    }
    
    @media (max-width: 768px) {
      .header-actions {
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .action-buttons-card {
        margin-top: 2rem;
      }
    }
  `]
})
export class PatientDetailsComponent implements OnInit {
  appointment: Appointment | null = null;
  isLoading = false;
  isProcessing = false;
  error: string | null = null;
  appointmentId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Check if user is logged in and is a doctor
    if (!this.authService.isLoggedIn()) {
      alert('You need to be logged in to access this page.');
      this.router.navigate(['/auth/login']);
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'DOCTOR') {
      alert('You need to be logged in as a doctor to access this page.');
      this.router.navigate(['/auth/login']);
      return;
    }

    // Get appointment ID from route
    this.route.params.subscribe(params => {
      this.appointmentId = +params['id'];
      if (this.appointmentId) {
        this.loadAppointmentDetails();
      } else {
        this.error = 'Invalid appointment ID';
      }
    });
  }

  loadAppointmentDetails(): void {
    this.isLoading = true;
    console.log('DEBUG: Loading appointment details for ID:', this.appointmentId);
    
    if (!this.appointmentId) {
      this.error = 'Invalid appointment ID';
      this.isLoading = false;
      return;
    }
    
    this.doctorService.getAppointmentById(this.appointmentId).subscribe({
      next: (appointment) => {
        console.log('DEBUG: Received appointment:', appointment);
        this.appointment = appointment;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading appointment details:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        
        // Try fallback method - get all appointments and find the one
        console.log('DEBUG: Trying fallback method...');
        this.doctorService.getAllAppointments().subscribe({
          next: (appointments) => {
            console.log('DEBUG: Fallback - Received appointments:', appointments);
            this.appointment = appointments.find(apt => apt.id === this.appointmentId!) || null;
            
            if (!this.appointment) {
              this.error = 'Appointment not found';
            }
            this.isLoading = false;
          },
          error: (fallbackError) => {
            console.error('Fallback also failed:', fallbackError);
            this.error = 'Failed to load appointment details: ' + (error.error || error.message);
            this.isLoading = false;
          }
        });
      }
    });
  }

  approveAppointment(): void {
    if (!this.appointment) return;

    if (confirm(`Are you sure you want to approve the appointment for ${this.appointment.patient.firstName} ${this.appointment.patient.lastName}?`)) {
      this.isProcessing = true;
      
      this.doctorService.approveAppointment(this.appointment.id).subscribe({
        next: (response) => {
          this.notificationService.success('Success', 'Appointment approved and patient notified!');
          this.router.navigate(['/doctor/pending-appointments']);
        },
        error: (error) => {
          console.error('Error approving appointment:', error);
          this.notificationService.error('Error', 'Failed to approve appointment. Please try again.');
          this.isProcessing = false;
        }
      });
    }
  }

  rejectAppointment(): void {
    if (!this.appointment) return;

    if (confirm(`Are you sure you want to reject the appointment for ${this.appointment.patient.firstName} ${this.appointment.patient.lastName}? This action cannot be undone.`)) {
      this.isProcessing = true;
      
      this.doctorService.rejectAppointment(this.appointment.id).subscribe({
        next: (response) => {
          this.notificationService.success('Success', 'Appointment rejected and patient notified.');
          this.router.navigate(['/doctor/pending-appointments']);
        },
        error: (error) => {
          console.error('Error rejecting appointment:', error);
          this.notificationService.error('Error', 'Failed to reject appointment. Please try again.');
          this.isProcessing = false;
        }
      });
    }
  }

  getPatientImageUrl(patient: any): string {
    return patient.profileImage || 
           `https://via.placeholder.com/120x120/667eea/ffffff?text=${patient.firstName?.charAt(0) || 'P'}`;
  }

  calculateAge(dateOfBirth: string | Date | undefined): number | string {
    if (!dateOfBirth) return 'N/A';
    try {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      
      if (isNaN(birthDate.getTime())) {
        return 'N/A';
      }
      
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    } catch (error) {
      return 'N/A';
    }
  }

  formatDate(date: string | Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatTime(time: string | undefined): string {
    if (!time) return 'N/A';
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  getTimeAgo(date: string | Date | undefined): string {
    if (!date) return 'Unknown';
    
    const now = new Date();
    const createdDate = new Date(date);
    const diffMs = now.getTime() - createdDate.getTime();
    
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  }
}
