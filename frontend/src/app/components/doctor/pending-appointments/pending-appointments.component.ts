import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Appointment } from '../../../models/appointment.model';
import { AuthService } from '../../../services/auth.service';
import { DoctorService } from '../../../services/doctor.service';
import { NotificationService } from '../../../services/notification.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-pending-appointments',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, HeaderComponent],
  template: `
    <app-header></app-header>
    
    <div class="pending-appointments-container" style="margin-top: 70px; padding: 2rem 0; min-height: calc(100vh - 8rem);">
      <div class="container">
        <!-- Page Header -->
        <div class="page-header d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 class="mb-1">Pending Appointments</h1>
            <p class="text-muted">Review and approve patient appointment requests</p>
          </div>
          <div class="header-actions">
            <a routerLink="/doctor/dashboard" class="btn btn-outline-secondary me-2">
              <i class="fas fa-home me-2"></i>Dashboard
            </a>
            <button class="btn btn-success" (click)="refreshAppointments()">
              <i class="fas fa-sync-alt me-2"></i>Refresh
            </button>
          </div>
        </div>

        <!-- Stats Card -->
        <div class="stats-card card mb-4">
          <div class="card-body">
            <div class="row text-center">
              <div class="col-md-4">
                <i class="fas fa-clock text-warning" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                <h4 class="mb-1">{{ pendingAppointments.length }}</h4>
                <small class="text-muted">Pending Approval</small>
              </div>
              <div class="col-md-4">
                <i class="fas fa-check-circle text-success" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                <h4 class="mb-1">{{ approvedToday }}</h4>
                <small class="text-muted">Approved Today</small>
              </div>
              <div class="col-md-4">
                <i class="fas fa-calendar-day text-info" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                <h4 class="mb-1">{{ todayAppointments }}</h4>
                <small class="text-muted">Today's Appointments</small>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3">Loading pending appointments...</p>
        </div>

        <!-- No Pending Appointments -->
        <div *ngIf="!isLoading && pendingAppointments.length === 0" class="no-appointments text-center py-5">
          <i class="fas fa-calendar-check text-muted" style="font-size: 4rem; margin-bottom: 1rem;"></i>
          <h4>No Pending Appointments</h4>
          <p class="text-muted">All appointment requests have been reviewed.</p>
          <a routerLink="/doctor/dashboard" class="btn btn-primary">
            <i class="fas fa-arrow-left me-2"></i>Back to Dashboard
          </a>
        </div>

        <!-- Appointments List -->
        <div *ngIf="!isLoading && pendingAppointments.length > 0" class="appointments-grid">
          <div class="appointment-card card mb-4" *ngFor="let appointment of pendingAppointments">
            <div class="card-header d-flex justify-content-between align-items-center">
              <div class="appointment-date">
                <i class="fas fa-calendar me-2 text-primary"></i>
                <strong>{{ formatDate(appointment.appointmentDate) }}</strong>
                <span class="ms-2 text-muted">at {{ formatTime(appointment.appointmentTime) }}</span>
              </div>
              <span class="badge bg-warning">Pending Approval</span>
            </div>
            
            <div class="card-body">
              <div class="row">
                <!-- Patient Information -->
                <div class="col-md-8">
                  <div class="patient-info">
                    <div class="d-flex align-items-center mb-3">
                      <div class="patient-avatar me-3">
                        <img [src]="getPatientImageUrl(appointment.patient)" 
                             alt="Patient" 
                             class="rounded-circle"
                             style="width: 60px; height: 60px; object-fit: cover;">
                      </div>
                      <div>
                        <h5 class="mb-1">{{ appointment.patient.firstName }} {{ appointment.patient.lastName }}</h5>
                        <p class="text-muted mb-1">
                          <i class="fas fa-envelope me-1"></i>{{ appointment.patientEmail }}
                        </p>
                        <p class="text-muted mb-0">
                          <i class="fas fa-phone me-1"></i>{{ appointment.patientPhone }}
                        </p>
                      </div>
                    </div>

                    <div class="patient-details">
                      <div class="row mb-2">
                        <div class="col-sm-6">
                          <small class="text-muted">Age:</small>
                          <div>{{ calculateAge(appointment.patient.dateOfBirth) }}{{ calculateAge(appointment.patient.dateOfBirth) !== 'N/A' ? ' years' : '' }}</div>
                        </div>
                        <div class="col-sm-6">
                          <small class="text-muted">Gender:</small>
                          <div>{{ appointment.patient.gender || 'Not specified' }}</div>
                        </div>
                      </div>
                      <div class="row mb-2">
                        <div class="col-sm-6">
                          <small class="text-muted">Blood Group:</small>
                          <div>{{ appointment.patient.bloodGroup || 'Not specified' }}</div>
                        </div>
                        <div class="col-sm-6">
                          <small class="text-muted">Emergency Contact:</small>
                          <div>{{ appointment.emergencyContact || 'Not provided' }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Appointment Details -->
                <div class="col-md-4">
                  <div class="appointment-details">
                    <div class="detail-item mb-2">
                      <small class="text-muted">Appointment Type:</small>
                      <div class="fw-semibold">{{ appointment.appointmentType }}</div>
                    </div>
                    <div class="detail-item mb-2">
                      <small class="text-muted">First Visit:</small>
                      <div>{{ appointment.isFirstVisit ? 'Yes' : 'No' }}</div>
                    </div>
                    <div class="detail-item mb-2">
                      <small class="text-muted">Consultation Fee:</small>
                      <div class="text-success fw-bold">₹{{ appointment.consultationFee }}</div>
                    </div>
                    <div class="detail-item">
                      <small class="text-muted">Payment Status:</small>
                      <span class="badge bg-success">{{ appointment.paymentStatus }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Reason for Visit -->
              <div class="reason-section mt-3">
                <small class="text-muted">Reason for Visit:</small>
                <div class="reason-text p-2 bg-light rounded">
                  {{ appointment.reasonForVisit }}
                </div>
              </div>

              <!-- Symptoms (if provided) -->
              <div class="symptoms-section mt-2" *ngIf="appointment.symptoms">
                <small class="text-muted">Current Symptoms:</small>
                <div class="symptoms-text p-2 bg-light rounded">
                  {{ appointment.symptoms }}
                </div>
              </div>

              <!-- Medical History (if provided) -->
              <div class="medical-history-section mt-2" *ngIf="appointment.medicalHistory">
                <small class="text-muted">Medical History:</small>
                <div class="medical-history-text p-2 bg-light rounded">
                  {{ appointment.medicalHistory }}
                </div>
              </div>
            </div>

            <div class="card-footer">
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">
                  <i class="fas fa-clock me-1"></i>
                  Requested {{ getTimeAgo(appointment.createdAt) }}
                </small>
                <div class="action-buttons">
                  <button class="btn btn-info me-2" 
                          (click)="viewPatientDetails(appointment)">
                    <i class="fas fa-eye me-2"></i>
                    View Details
                  </button>
                  <button class="btn btn-success me-2" 
                          (click)="approveAppointment(appointment)"
                          [disabled]="processingAppointmentId === appointment.id">
                    <span *ngIf="processingAppointmentId === appointment.id" class="spinner-border spinner-border-sm me-2"></span>
                    <i *ngIf="processingAppointmentId !== appointment.id" class="fas fa-check me-2"></i>
                    Approve
                  </button>
                  <button class="btn btn-outline-danger" 
                          (click)="rejectAppointment(appointment)"
                          [disabled]="processingAppointmentId === appointment.id">
                    <i class="fas fa-times me-2"></i>
                    Reject
                  </button>
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
    .pending-appointments-container {
      background: #f8f9fa;
    }
    
    .stats-card {
      border: none;
      box-shadow: var(--shadow-sm);
    }
    
    .appointment-card {
      border: none;
      box-shadow: var(--shadow-sm);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .appointment-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    .patient-avatar img {
      border: 2px solid var(--primary-color);
    }
    
    .reason-text, .symptoms-text, .medical-history-text {
      font-size: 0.9rem;
      line-height: 1.4;
      max-height: 100px;
      overflow-y: auto;
    }
    
    .detail-item {
      border-left: 3px solid var(--primary-color);
      padding-left: 0.75rem;
    }
    
    .action-buttons .btn {
      min-width: 100px;
    }
    
    @media (max-width: 768px) {
      .appointment-card .row {
        flex-direction: column;
      }
      
      .action-buttons {
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .action-buttons .btn {
        width: 100%;
      }
    }
  `]
})
export class PendingAppointmentsComponent implements OnInit {
  pendingAppointments: Appointment[] = [];
  isLoading = false;
  processingAppointmentId: number | null = null;
  
  // Stats
  approvedToday = 0;
  todayAppointments = 0;

  constructor(
    private doctorService: DoctorService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
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

    this.loadPendingAppointments();
  }

  loadPendingAppointments(): void {
    this.isLoading = true;
    this.doctorService.getPendingAppointments().subscribe({
      next: (appointments) => {
        this.pendingAppointments = appointments;
        this.calculateStats();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading pending appointments:', error);
        this.isLoading = false;
        
        if (error.status === 401 || error.status === 403) {
          this.notificationService.error('Authentication Error', 'Please login as a doctor to access this page.');
          this.router.navigate(['/auth/login']);
        } else {
          this.notificationService.error('Error', 'Failed to load pending appointments. Please try again.');
        }
      }
    });
  }

  calculateStats(): void {
    const today = new Date().toDateString();
    
    // Count today's appointments (all statuses)
    this.todayAppointments = this.pendingAppointments.filter(apt => 
      new Date(apt.appointmentDate).toDateString() === today
    ).length;
    
    // For approved today, we would need to make another API call
    // For now, set to 0 as we only have pending appointments here
    this.approvedToday = 0;
  }

  approveAppointment(appointment: Appointment): void {
    if (confirm(`Are you sure you want to approve the appointment for ${appointment.patient.firstName} ${appointment.patient.lastName}?`)) {
      this.processingAppointmentId = appointment.id;
      
      this.doctorService.approveAppointment(appointment.id).subscribe({
        next: (response) => {
          this.notificationService.success('Success', 'Appointment approved and patient notified!');
          this.pendingAppointments = this.pendingAppointments.filter(apt => apt.id !== appointment.id);
          this.calculateStats();
          this.processingAppointmentId = null;
        },
        error: (error) => {
          console.error('Error approving appointment:', error);
          this.notificationService.error('Error', 'Failed to approve appointment. Please try again.');
          this.processingAppointmentId = null;
        }
      });
    }
  }

  rejectAppointment(appointment: Appointment): void {
    if (confirm(`Are you sure you want to reject the appointment for ${appointment.patient.firstName} ${appointment.patient.lastName}? This action cannot be undone.`)) {
      this.processingAppointmentId = appointment.id;
      
      this.doctorService.rejectAppointment(appointment.id).subscribe({
        next: (response) => {
          this.notificationService.success('Success', 'Appointment rejected and patient notified.');
          this.pendingAppointments = this.pendingAppointments.filter(apt => apt.id !== appointment.id);
          this.calculateStats();
          this.processingAppointmentId = null;
        },
        error: (error) => {
          console.error('Error rejecting appointment:', error);
          this.notificationService.error('Error', 'Failed to reject appointment. Please try again.');
          this.processingAppointmentId = null;
        }
      });
    }
  }

  refreshAppointments(): void {
    this.loadPendingAppointments();
  }

  viewPatientDetails(appointment: Appointment): void {
    this.router.navigate(['/doctor/patient-details', appointment.id]);
  }

  getPatientImageUrl(patient: any): string {
    return patient.profileImage || 
           `https://via.placeholder.com/60x60/667eea/ffffff?text=${patient.firstName?.charAt(0) || 'P'}`;
  }

  calculateAge(dateOfBirth: string | Date | undefined): number | string {
    if (!dateOfBirth) return 'N/A';
    try {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      
      // Check if the date is valid
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
