import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Appointment } from '../../../models/appointment.model';
import { AppointmentService } from '../../../services/appointment.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-cancellation-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, HeaderComponent],
  template: `
    <app-header></app-header>
    
    <div class="cancellation-details-container" style="margin-top: 70px; padding: 2rem 0; min-height: calc(100vh - 8rem);">
      <div class="container">
        <!-- Header -->
        <div class="page-header mb-4">
          <div class="d-flex align-items-center mb-3">
            <button class="btn btn-outline-secondary me-3" (click)="goBack()">
              <i class="fas fa-arrow-left me-2"></i>Back to Appointments
            </button>
            <div>
              <h1 class="mb-1">Cancellation Details</h1>
              <p class="text-muted mb-0">Detailed information about your cancelled appointment</p>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div *ngIf="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3">Loading cancellation details...</p>
        </div>

        <!-- Error State -->
        <div *ngIf="error" class="alert alert-danger">
          <i class="fas fa-exclamation-triangle me-2"></i>
          {{ error }}
        </div>

        <!-- Appointment Details -->
        <div *ngIf="appointment && !loading" class="row">
          <!-- Appointment Information -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-header bg-gradient" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <h5 class="mb-0 text-white">
                  <i class="fas fa-calendar-alt me-2"></i>Appointment Information
                </h5>
              </div>
              <div class="card-body">
                <div class="appointment-info">
                  <div class="info-item mb-3">
                    <i class="fas fa-calendar text-primary me-2"></i>
                    <strong>Date:</strong> {{ formatDate(appointment.appointmentDate) }}
                  </div>
                  <div class="info-item mb-3">
                    <i class="fas fa-clock text-primary me-2"></i>
                    <strong>Time:</strong> {{ formatTime(appointment.appointmentTime) }}
                  </div>
                  <div class="info-item mb-3">
                    <i class="fas fa-user-md text-primary me-2"></i>
                    <strong>Doctor:</strong> Dr. {{ getDoctorName(appointment) }}
                  </div>
                  <div class="info-item mb-3">
                    <i class="fas fa-stethoscope text-primary me-2"></i>
                    <strong>Specialization:</strong> {{ getDoctorSpecialization(appointment) }}
                  </div>
                  <div class="info-item mb-3">
                    <i class="fas fa-hospital text-primary me-2"></i>
                    <strong>Hospital:</strong> {{ getDoctorHospital(appointment) }}
                  </div>
                  <div class="info-item mb-3">
                    <i class="fas fa-notes-medical text-primary me-2"></i>
                    <strong>Reason for Visit:</strong> {{ appointment.reasonForVisit }}
                  </div>
                  <div class="info-item">
                    <i class="fas fa-rupee-sign text-primary me-2"></i>
                    <strong>Consultation Fee:</strong> ₹{{ appointment.consultationFee }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cancellation Information -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-header bg-gradient" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                <h5 class="mb-0 text-white">
                  <i class="fas fa-ban me-2"></i>Cancellation Information
                </h5>
              </div>
              <div class="card-body">
                <div class="cancellation-info">
                  <div class="info-item mb-3">
                    <i class="fas fa-exclamation-triangle text-warning me-2"></i>
                    <strong>Status:</strong> 
                    <span class="badge bg-danger ms-2">Cancelled</span>
                  </div>
                  
                  <div class="info-item mb-3">
                    <i class="fas fa-user-md text-info me-2" *ngIf="isCancelledByDoctor()"></i>
                    <i class="fas fa-user text-info me-2" *ngIf="!isCancelledByDoctor()"></i>
                    <strong>Cancelled By:</strong> 
                    <span class="ms-2">{{ isCancelledByDoctor() ? 'Doctor' : 'You (Patient)' }}</span>
                  </div>

                  <div class="info-item mb-3" *ngIf="appointment.cancelledAt">
                    <i class="fas fa-calendar-times text-info me-2"></i>
                    <strong>Cancelled On:</strong> 
                    <span class="ms-2">{{ formatDateTime(appointment.cancelledAt) }}</span>
                  </div>

                  <div class="info-item mb-3" *ngIf="appointment.cancellationReason">
                    <i class="fas fa-comment text-info me-2"></i>
                    <strong>Cancellation Reason:</strong>
                    <div class="reason-box mt-2 p-3 bg-light rounded">
                      <i class="fas fa-quote-left text-muted me-2"></i>
                      {{ appointment.cancellationReason }}
                      <i class="fas fa-quote-right text-muted ms-2"></i>
                    </div>
                  </div>

                  <div class="info-item mb-3">
                    <i class="fas fa-money-bill-wave text-success me-2"></i>
                    <strong>Refund Status:</strong> 
                    <span class="badge bg-success ms-2">Refunded</span>
                  </div>

                  <div class="info-item">
                    <i class="fas fa-info-circle text-info me-2"></i>
                    <strong>Note:</strong> 
                    <span class="ms-2">Your payment has been refunded and will reflect in your account within 3-5 business days.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div *ngIf="appointment && !loading" class="row mt-4">
          <div class="col-12 text-center">
            <button class="btn btn-primary me-3" (click)="bookNewAppointment()">
              <i class="fas fa-plus me-2"></i>Book New Appointment
            </button>
            <button class="btn btn-outline-secondary" (click)="goBack()">
              <i class="fas fa-arrow-left me-2"></i>Back to Appointments
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <app-footer></app-footer>
  `,
  styles: [`
    .cancellation-details-container {
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
    
    .reason-box {
      border-left: 4px solid #667eea;
      background: #f8f9fa !important;
      font-style: italic;
    }
    
    .badge {
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
    }
    
    @media (max-width: 768px) {
      .cancellation-details-container .row {
        flex-direction: column;
      }
      
      .cancellation-details-container .col-md-6 {
        margin-bottom: 1rem;
      }
    }
  `]
})
export class CancellationDetailsComponent implements OnInit {
  appointment: Appointment | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const appointmentId = params['id'];
      if (appointmentId) {
        this.loadAppointmentDetails(appointmentId);
      }
    });
  }

  loadAppointmentDetails(appointmentId: string): void {
    this.loading = true;
    this.error = null;

    // For now, we'll get the appointment from the patient's appointments
    // In a real app, you might have a specific endpoint for getting appointment details
    this.appointmentService.getPatientAppointments().subscribe({
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

  isCancelledByDoctor(): boolean {
    if (!this.appointment) return false;
    return this.appointment.cancelledBy === 'DOCTOR';
  }

  getDoctorName(appointment: Appointment): string {
    if (appointment.doctor) {
      return (appointment.doctor.firstName || '') + ' ' + (appointment.doctor.lastName || '');
    }
    return appointment.doctorName || 'Unknown Doctor';
  }

  getDoctorSpecialization(appointment: Appointment): string {
    if (appointment.doctor) {
      return appointment.doctor.specialization || 'General Practice';
    }
    return appointment.specialization || 'General Practice';
  }

  getDoctorHospital(appointment: Appointment): string {
    if (appointment.doctor) {
      return appointment.doctor.hospitalAffiliation || 'Not specified';
    }
    return appointment.hospital || 'Not specified';
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
    return timeString;
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
    this.router.navigate(['/patient/appointments']);
  }

  bookNewAppointment(): void {
    this.router.navigate(['/patient/doctors']);
  }
}
