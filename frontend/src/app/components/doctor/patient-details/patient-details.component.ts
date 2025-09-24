import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Appointment } from '../../../models/appointment.model';
import { AppointmentService } from '../../../services/appointment.service';
import { ImageService } from '../../../services/image.service';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  template: `
    <div class="patient-details-container">
      <div class="container">
        <!-- Header -->
        <div class="page-header mb-4">
          <div class="d-flex align-items-center mb-3">
            <button class="btn btn-outline-secondary me-3" (click)="goBack()">
              <i class="fas fa-arrow-left me-2"></i>Back to Appointments
            </button>
            <div>
              <h1 class="mb-1">Patient Details</h1>
              <p class="text-muted mb-0">Complete patient information and appointment history</p>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div *ngIf="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 text-muted">Loading patient details...</p>
        </div>

        <!-- Error State -->
        <div *ngIf="error" class="alert alert-danger" role="alert">
          <i class="fas fa-exclamation-triangle me-2"></i>
          {{ error }}
        </div>

        <!-- Patient Details -->
        <div *ngIf="appointment && !loading && !error" class="row">
          <!-- Patient Information Card -->
          <div class="col-lg-4 mb-4">
            <div class="card h-100">
              <div class="card-header bg-primary text-white">
                <h5 class="mb-0">
                  <i class="fas fa-user me-2"></i>Patient Information
                </h5>
              </div>
              <div class="card-body">
                <div class="patient-avatar text-center mb-3">
                  <img [src]="getPatientImageUrl(appointment)" 
                       alt="Patient Profile Picture" 
                       class="patient-profile-image rounded-circle"
                       style="width: 80px; height: 80px; object-fit: cover; border: 3px solid #667eea;">
                </div>
                
                <div class="patient-info">
                  <h4 class="patient-name mb-2">{{ getPatientName(appointment) }}</h4>
                  <div class="info-item mb-2">
                    <i class="fas fa-id-card me-2 text-muted"></i>
                    <strong>Patient ID:</strong> {{ appointment.patient.id }}
                  </div>
                  <div class="info-item mb-2">
                    <i class="fas fa-phone me-2 text-muted"></i>
                    <strong>Phone:</strong> {{ getPatientPhone(appointment) }}
                  </div>
                  <div class="info-item mb-2">
                    <i class="fas fa-envelope me-2 text-muted"></i>
                    <strong>Email:</strong> {{ appointment.patient.email }}
                  </div>
                  <div class="info-item mb-2" *ngIf="appointment.patient.dateOfBirth">
                    <i class="fas fa-birthday-cake me-2 text-muted"></i>
                    <strong>Date of Birth:</strong> {{ formatDate(appointment.patient.dateOfBirth) }}
                  </div>
                  <div class="info-item mb-2" *ngIf="appointment.patient.gender">
                    <i class="fas fa-venus-mars me-2 text-muted"></i>
                    <strong>Gender:</strong> {{ appointment.patient.gender }}
                  </div>
                  <div class="info-item mb-2" *ngIf="appointment.patient.bloodGroup">
                    <i class="fas fa-tint me-2 text-muted"></i>
                    <strong>Blood Group:</strong> {{ appointment.patient.bloodGroup }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Appointment Details Card -->
          <div class="col-lg-8 mb-4">
            <div class="card h-100">
              <div class="card-header" [class]="getStatusHeaderClass(appointment.status)">
                <h5 class="mb-0">
                  <i class="fas fa-calendar-alt me-2"></i>Appointment Details
                </h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <div class="appointment-info mb-3">
                      <h6 class="text-muted mb-2">Appointment Information</h6>
                      <div class="info-item mb-2">
                        <i class="fas fa-calendar me-2 text-primary"></i>
                        <strong>Date:</strong> {{ formatDate(appointment.appointmentDate) }}
                      </div>
                      <div class="info-item mb-2">
                        <i class="fas fa-clock me-2 text-primary"></i>
                        <strong>Time:</strong> {{ formatTime(appointment.appointmentTime) }}
                      </div>
                      <div class="info-item mb-2">
                        <i class="fas fa-stethoscope me-2 text-primary"></i>
                        <strong>Reason:</strong> {{ appointment.reasonForVisit }}
                      </div>
                      <div class="info-item mb-2">
                        <i class="fas fa-tag me-2 text-primary"></i>
                        <strong>Status:</strong> 
                        <span class="badge" [class]="getStatusClass(appointment.status)">
                          {{ appointment.status }}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="col-md-6">
                    <div class="appointment-info mb-3">
                      <h6 class="text-muted mb-2">Additional Information</h6>
                      <div class="info-item mb-2" *ngIf="appointment.symptoms">
                        <i class="fas fa-exclamation-circle me-2 text-warning"></i>
                        <strong>Symptoms:</strong> {{ appointment.symptoms }}
                      </div>
                      <div class="info-item mb-2" *ngIf="appointment.medicalHistory">
                        <i class="fas fa-history me-2 text-info"></i>
                        <strong>Medical History:</strong> {{ appointment.medicalHistory }}
                      </div>
                      <div class="info-item mb-2" *ngIf="appointment.emergencyContact">
                        <i class="fas fa-phone-alt me-2 text-danger"></i>
                        <strong>Emergency Contact:</strong> {{ appointment.emergencyContact }}
                      </div>
                      <div class="info-item mb-2">
                        <i class="fas fa-user-check me-2 text-success"></i>
                        <strong>First Visit:</strong> {{ appointment.isFirstVisit ? 'Yes' : 'No' }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Cancellation Details (if cancelled) -->
                <div *ngIf="appointment.status === 'CANCELLED'" class="cancellation-details mt-4">
                  <div class="alert alert-warning" role="alert">
                    <h6 class="alert-heading">
                      <i class="fas fa-exclamation-triangle me-2"></i>Appointment Cancelled
                    </h6>
                    <div class="cancellation-info">
                      <div class="info-item mb-2" *ngIf="appointment.cancellationReason">
                        <i class="fas fa-comment me-2"></i>
                        <strong>Cancellation Reason:</strong> {{ appointment.cancellationReason }}
                      </div>
                      <div class="info-item mb-2" *ngIf="appointment.cancelledAt">
                        <i class="fas fa-calendar-times me-2"></i>
                        <strong>Cancelled On:</strong> {{ formatDateTime(appointment.cancelledAt) }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Prescription Details (if completed) -->
                <div *ngIf="appointment.status === 'COMPLETED' && appointment.prescription" class="prescription-details mt-4">
                  <div class="alert alert-success" role="alert">
                    <h6 class="alert-heading">
                      <i class="fas fa-prescription me-2"></i>Prescription Details
                    </h6>
                    <div class="prescription-info">
                      <div class="info-item mb-2">
                        <i class="fas fa-file-medical me-2"></i>
                        <strong>Prescription:</strong> {{ appointment.prescription }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Notes -->
                <div *ngIf="appointment.notes" class="notes-details mt-4">
                  <div class="alert alert-info" role="alert">
                    <h6 class="alert-heading">
                      <i class="fas fa-sticky-note me-2"></i>Doctor Notes
                    </h6>
                    <div class="notes-info">
                      <div class="info-item mb-2">
                        <i class="fas fa-comment-dots me-2"></i>
                        <strong>Notes:</strong> {{ appointment.notes }}
                      </div>
                    </div>
                  </div>
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
      padding: 2rem 0;
      min-height: calc(100vh - 8rem);
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    }
    
    .card {
      border: none;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 12px;
    }
    
    .card-header {
      border-radius: 12px 12px 0 0 !important;
      border: none;
    }
    
    .patient-avatar {
      margin-bottom: 1rem;
    }
    
    .avatar-circle {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      color: white;
    }
    
    .patient-name {
      color: var(--text-primary);
      font-weight: 600;
    }
    
    .info-item {
      display: flex;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid #f8f9fa;
    }
    
    .info-item:last-child {
      border-bottom: none;
    }
    
    .info-item i {
      width: 20px;
      text-align: center;
    }
    
    .badge {
      padding: 0.5rem 1rem;
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .badge-success {
      background-color: var(--success-color);
      color: white;
    }
    
    .badge-warning {
      background-color: var(--warning-color);
      color: white;
    }
    
    .badge-danger {
      background-color: var(--danger-color);
      color: white;
    }
    
    .badge-primary {
      background-color: var(--primary-color);
      color: white;
    }
    
    .cancellation-details .alert {
      border-left: 4px solid #ffc107;
    }
    
    .prescription-details .alert {
      border-left: 4px solid #28a745;
    }
    
    .notes-details .alert {
      border-left: 4px solid #17a2b8;
    }
    
    .bg-primary {
      background: linear-gradient(135deg, #667eea, #764ba2) !important;
    }
    
    .bg-success {
      background: linear-gradient(135deg, #28a745, #20c997) !important;
    }
    
    .bg-warning {
      background: linear-gradient(135deg, #ffc107, #fd7e14) !important;
    }
    
    .bg-danger {
      background: linear-gradient(135deg, #dc3545, #e83e8c) !important;
    }
    
    @media (max-width: 768px) {
      .patient-details-container {
        padding: 1rem 0;
      }
      
      .card-body {
        padding: 1rem;
      }
      
      .info-item {
        flex-direction: column;
        align-items: flex-start;
        padding: 0.75rem 0;
      }
      
      .info-item i {
        margin-bottom: 0.25rem;
      }
    }
  `]
})
export class PatientDetailsComponent implements OnInit {
  appointment: Appointment | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const appointmentId = params['id'];
      if (appointmentId) {
        this.loadAppointmentDetails(appointmentId);
      } else {
        this.error = 'Appointment ID not provided';
        this.loading = false;
      }
    });
  }

  loadAppointmentDetails(appointmentId: string): void {
    this.loading = true;
    this.error = null;
    
    // For now, we'll get the appointment from the list
    // In a real app, you'd have a specific endpoint to get appointment by ID
    this.appointmentService.getDoctorAppointments().subscribe({
      next: (appointments) => {
        this.appointment = appointments.find(apt => apt.id.toString() === appointmentId) || null;
        if (!this.appointment) {
          this.error = 'Appointment not found';
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading appointment details:', error);
        this.error = 'Failed to load appointment details';
        this.loading = false;
      }
    });
  }

  getPatientName(appointment: Appointment): string {
    if (appointment.patient) {
      return (appointment.patient.firstName || '') + ' ' + (appointment.patient.lastName || '');
    }
    return appointment.patientName || 'Unknown Patient';
  }

  getPatientPhone(appointment: Appointment): string {
    return appointment.patientPhone || appointment.patient?.phone || 'Not provided';
  }

  getPatientImageUrl(appointment: Appointment): string {
    if (appointment.patient?.profileImageUrl) {
      return this.imageService.getFullImageUrl(appointment.patient.profileImageUrl);
    }
    return this.imageService.getDefaultAvatar();
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'badge-success';
      case 'scheduled':
        return 'badge-primary';
      case 'pending':
        return 'badge-warning';
      case 'cancelled':
        return 'badge-danger';
      case 'completed':
        return 'badge-success';
      default:
        return 'badge-secondary';
    }
  }

  getStatusHeaderClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-success text-white';
      case 'scheduled':
        return 'bg-primary text-white';
      case 'pending':
        return 'bg-warning text-white';
      case 'cancelled':
        return 'bg-danger text-white';
      case 'completed':
        return 'bg-success text-white';
      default:
        return 'bg-secondary text-white';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatTime(timeString: string): string {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }

  formatDateTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  goBack(): void {
    this.router.navigate(['/doctor/appointments']);
  }
}