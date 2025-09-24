import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Appointment } from '../../../models/appointment.model';
import { AppointmentService } from '../../../services/appointment.service';
import { DoctorService } from '../../../services/doctor.service';
import { ImageService } from '../../../services/image.service';
import { NotificationService } from '../../../services/notification.service';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-doctor-appointments',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FooterComponent],
  template: `
    <div class="appointments-container">
      <div class="container">
        <!-- Header -->
        <div class="page-header mb-4">
          <div class="d-flex align-items-center mb-3">
            <button class="btn btn-outline-secondary me-3" (click)="goBack()">
              <i class="fas fa-arrow-left me-2"></i>Back to Dashboard
            </button>
            <div>
              <h1 class="mb-1">My Appointments</h1>
              <p class="text-muted mb-0">Manage your patient appointments</p>
            </div>
          </div>
        </div>

        <!-- Filter Tabs -->
        <div class="filter-tabs mb-4">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <button class="nav-link" [class.active]="activeTab === 'pending'" 
                      (click)="setActiveTab('pending')">
                Pending ({{ pendingAppointments.length }})
              </button>
            </li>
            <li class="nav-item">
              <button class="nav-link" [class.active]="activeTab === 'confirmed'" 
                      (click)="setActiveTab('confirmed')">
                Confirmed ({{ confirmedAppointments.length }})
              </button>
            </li>
            <li class="nav-item">
              <button class="nav-link" [class.active]="activeTab === 'completed'" 
                      (click)="setActiveTab('completed')">
                Completed ({{ completedAppointments.length }})
              </button>
            </li>
            <li class="nav-item">
              <button class="nav-link" [class.active]="activeTab === 'cancelled'" 
                      (click)="setActiveTab('cancelled')">
                Cancelled ({{ cancelledAppointments.length }})
              </button>
            </li>
          </ul>
        </div>

        <!-- Appointments List -->
        <div class="appointments-list">
          <!-- Pending Appointments -->
          <div *ngIf="activeTab === 'pending'">
            <div class="appointment-card card mb-3" *ngFor="let appointment of pendingAppointments">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-md-3">
                    <div class="appointment-info">
                      <h6 class="mb-1">{{ formatDate(appointment.appointmentDate) }}</h6>
                      <p class="text-muted mb-0">{{ formatTime(appointment.appointmentTime) }}</p>
                    </div>
                  </div>
                  <div class="col-md-5">
                    <div class="patient-info d-flex align-items-center">
                      <div class="patient-avatar me-3">
                        <img [src]="getPatientImageUrl(appointment)" 
                             alt="Patient Profile" 
                             class="patient-profile-image rounded-circle"
                             style="width: 50px; height: 50px; object-fit: cover; border: 2px solid #667eea;">
                      </div>
                      <div class="patient-details">
                        <h5 class="patient-name mb-1">{{ getPatientName(appointment) }}</h5>
                        <p class="contact text-muted mb-1">
                          <i class="fas fa-phone me-2"></i>{{ getPatientPhone(appointment) }}
                        </p>
                        <p class="reason text-sm mb-0" *ngIf="appointment.reasonForVisit">
                          <i class="fas fa-notes-medical me-2"></i>{{ appointment.reasonForVisit }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="appointment-status">
                      <span class="badge badge-warning">Pending</span>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="appointment-actions d-flex gap-1">
                      <button class="btn btn-sm btn-info" 
                              (click)="viewPatientDetails(appointment)"
                              style="font-size: 0.8rem;">
                        <i class="fas fa-user"></i>
                      </button>
                      <button class="btn btn-sm btn-success" 
                              (click)="confirmAppointment(appointment)">
                        Confirm
                      </button>
                      <button class="btn btn-sm btn-danger" 
                              (click)="rejectAppointment(appointment)">
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Confirmed Appointments -->
          <div *ngIf="activeTab === 'confirmed'">
            <div class="appointment-card card mb-3" *ngFor="let appointment of confirmedAppointments">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-md-3">
                    <div class="appointment-info">
                      <h6 class="mb-1">{{ formatDate(appointment.appointmentDate) }}</h6>
                      <p class="text-muted mb-0">{{ formatTime(appointment.appointmentTime) }}</p>
                    </div>
                  </div>
                  <div class="col-md-5">
                    <div class="patient-info d-flex align-items-center">
                      <div class="patient-avatar me-3">
                        <img [src]="getPatientImageUrl(appointment)" 
                             alt="Patient Profile" 
                             class="patient-profile-image rounded-circle"
                             style="width: 50px; height: 50px; object-fit: cover; border: 2px solid #667eea;">
                      </div>
                      <div class="patient-details">
                        <h5 class="patient-name mb-1">{{ getPatientName(appointment) }}</h5>
                        <p class="contact text-muted mb-1">
                          <i class="fas fa-phone me-2"></i>{{ getPatientPhone(appointment) }}
                        </p>
                        <p class="reason text-sm mb-0" *ngIf="appointment.reasonForVisit">
                          <i class="fas fa-notes-medical me-2"></i>{{ appointment.reasonForVisit }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="appointment-status">
                      <span class="badge badge-success">Confirmed</span>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="appointment-actions d-flex gap-1">
                      <button class="btn btn-sm btn-info" 
                              (click)="viewPatientDetails(appointment)">
                        <i class="fas fa-user me-1"></i>
                        Details
                      </button>
                      <button class="btn btn-sm btn-primary" 
                              (click)="markCompleted(appointment)">
                        Complete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Completed Appointments -->
          <div *ngIf="activeTab === 'completed'">
            <div class="appointment-card card mb-3" *ngFor="let appointment of completedAppointments">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-md-3">
                    <div class="appointment-info">
                      <h6 class="mb-1">{{ formatDate(appointment.appointmentDate) }}</h6>
                      <p class="text-muted mb-0">{{ formatTime(appointment.appointmentTime) }}</p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="patient-info d-flex align-items-center">
                      <div class="patient-avatar me-3">
                        <img [src]="getPatientImageUrl(appointment)" 
                             alt="Patient Profile" 
                             class="patient-profile-image rounded-circle"
                             style="width: 50px; height: 50px; object-fit: cover; border: 2px solid #667eea;">
                      </div>
                      <div class="patient-details">
                        <h5 class="patient-name mb-1">{{ getPatientName(appointment) }}</h5>
                        <p class="contact text-muted mb-1">
                          <i class="fas fa-phone me-2"></i>{{ getPatientPhone(appointment) }}
                        </p>
                        <p class="prescription text-sm mb-0" *ngIf="appointment.prescription">
                          <i class="fas fa-prescription me-2"></i>{{ appointment.prescription }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="appointment-status">
                      <span class="badge badge-success">Completed</span>
                    </div>
                  </div>
                  <div class="col-md-1">
                    <div class="appointment-actions">
                      <button class="btn btn-sm btn-outline-primary" 
                              (click)="viewDetails(appointment)">
                        <i class="fas fa-eye"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cancelled Appointments -->
          <div *ngIf="activeTab === 'cancelled'">
            <div class="appointment-card card mb-3" *ngFor="let appointment of cancelledAppointments">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-md-3">
                    <div class="appointment-info">
                      <h6 class="mb-1">{{ formatDate(appointment.appointmentDate) }}</h6>
                      <p class="text-muted mb-0">{{ formatTime(appointment.appointmentTime) }}</p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="patient-info d-flex align-items-center">
                      <div class="patient-avatar me-3">
                        <img [src]="getPatientImageUrl(appointment)" 
                             alt="Patient Profile" 
                             class="patient-profile-image rounded-circle"
                             style="width: 50px; height: 50px; object-fit: cover; border: 2px solid #667eea;">
                      </div>
                      <div class="patient-details">
                        <h5 class="patient-name mb-1">{{ getPatientName(appointment) }}</h5>
                        <p class="contact text-muted mb-1">
                          <i class="fas fa-phone me-2"></i>{{ getPatientPhone(appointment) }}
                        </p>
                        <p class="reason text-sm mb-1" *ngIf="appointment.reasonForVisit">
                          <i class="fas fa-notes-medical me-2"></i>{{ appointment.reasonForVisit }}
                        </p>
                        <p class="cancellation-reason text-sm mb-0" *ngIf="appointment.cancellationReason">
                          <i class="fas fa-exclamation-triangle me-2 text-warning"></i><strong>Cancellation Reason:</strong> {{ appointment.cancellationReason }}
                        </p>
                        <p class="cancellation-source text-sm mb-0">
                          <i class="fas fa-user-md me-2 text-info" *ngIf="isCancelledByDoctor(appointment)"></i>
                          <i class="fas fa-user me-2 text-info" *ngIf="!isCancelledByDoctor(appointment)"></i>
                          <strong>Cancelled by:</strong> {{ isCancelledByDoctor(appointment) ? 'You (Doctor)' : 'Patient' }}
                          <span class="text-muted ms-2">({{ appointment.cancelledBy || 'Unknown' }})</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="appointment-status">
                      <span class="badge badge-danger">Cancelled</span>
                    </div>
                  </div>
                  <div class="col-md-1">
                    <div class="appointment-actions">
                      <button class="btn btn-sm btn-outline-primary" 
                              (click)="viewDetails(appointment)">
                        <i class="fas fa-eye"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div *ngIf="getCurrentAppointments().length === 0" class="empty-state text-center py-5">
            <i class="fas fa-calendar-times text-muted" style="font-size: 4rem; margin-bottom: 1rem;"></i>
            <h4>No {{ activeTab }} appointments</h4>
            <p class="text-muted mb-4">{{ getEmptyStateMessage() }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <app-footer></app-footer>

    <!-- Cancellation Reason Modal -->
    <div class="modal fade" id="rejectModal" tabindex="-1" aria-labelledby="rejectModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="rejectModalLabel">
              <i class="fas fa-exclamation-triangle text-warning me-2"></i>
              Reject Appointment
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-warning">
              <i class="fas fa-info-circle me-2"></i>
              <strong>Please provide a reason for rejecting this appointment.</strong>
              <br>This information will be shared with the patient.
            </div>
            
            <div class="mb-3">
              <label for="rejectionReason" class="form-label">
                <i class="fas fa-comment me-2"></i>Cancellation Reason
              </label>
              <textarea 
                class="form-control" 
                id="rejectionReason" 
                rows="4" 
                [(ngModel)]="cancellationReason"
                placeholder="Please provide a clear reason for rejecting this appointment..."
                required>
              </textarea>
              <div class="form-text">
                Minimum 10 characters required. This will be sent to the patient.
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              <i class="fas fa-times me-2"></i>Cancel
            </button>
            <button type="button" class="btn btn-danger" (click)="confirmRejection()" [disabled]="!cancellationReason || cancellationReason.length < 10">
              <i class="fas fa-ban me-2"></i>Reject Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .appointments-container {
      padding: 2rem 0;
      min-height: calc(100vh - 8rem);
    }
    
    .nav-pills .nav-link {
      color: var(--text-secondary);
      background: transparent;
      border: 1px solid var(--border-color);
      margin-right: 0.5rem;
    }
    
    .nav-pills .nav-link.active {
      background: var(--primary-color);
      border-color: var(--primary-color);
    }
    
    .appointment-card {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      border: none;
      box-shadow: var(--shadow-sm);
    }
    
    .appointment-card:hover {
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }
    
    .patient-name {
      color: var(--text-primary);
    }
    
    .text-sm {
      font-size: 0.875rem;
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
    
    .badge-primary {
      background-color: var(--primary-color);
      color: white;
    }
    
    @media (max-width: 768px) {
      .appointment-card .row > div {
        margin-bottom: 1rem;
      }
      
      .appointment-actions {
        flex-direction: column;
        gap: 0.25rem !important;
      }
      
      .appointment-actions .btn {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
      }
    }
  `]
})
export class AppointmentsComponent implements OnInit {
  activeTab = 'pending';
  pendingAppointments: Appointment[] = [];
  confirmedAppointments: Appointment[] = [];
  completedAppointments: Appointment[] = [];
  cancelledAppointments: Appointment[] = [];
  allAppointments: Appointment[] = [];
  selectedAppointment: Appointment | null = null;
  cancellationReason = '';

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private router: Router,
    private imageService: ImageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    // Load all doctor appointments from API
    this.appointmentService.getDoctorAppointments().subscribe({
      next: (appointments) => {
        this.allAppointments = appointments;
        this.categorizeAppointments();
        console.log('Loaded doctor appointments:', appointments);
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
        this.loadMockData(); // Fallback to mock data
      }
    });
  }

  categorizeAppointments(): void {
    this.pendingAppointments = this.allAppointments.filter(apt => 
      apt.status === 'SCHEDULED'
    );
    
    this.confirmedAppointments = this.allAppointments.filter(apt => 
      apt.status === 'CONFIRMED'
    );
    
    this.completedAppointments = this.allAppointments.filter(apt => 
      apt.status === 'COMPLETED'
    );
    
    this.cancelledAppointments = this.allAppointments.filter(apt => 
      apt.status === 'CANCELLED' || apt.status === 'NO_SHOW'
    );
    
    // Debug cancelled appointments
    console.log('Cancelled appointments:', this.cancelledAppointments);
    this.cancelledAppointments.forEach(apt => {
      console.log(`Appointment ${apt.id}: cancelledBy = ${apt.cancelledBy}, reason = ${apt.cancellationReason}`);
    });
  }

  loadMockData(): void {
    // No mock data - only real appointments
    this.pendingAppointments = [];
    this.confirmedAppointments = [];
    this.completedAppointments = [];
    this.cancelledAppointments = [];
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getCurrentAppointments(): Appointment[] {
    switch (this.activeTab) {
      case 'pending':
        return this.pendingAppointments;
      case 'confirmed':
        return this.confirmedAppointments;
      case 'completed':
        return this.completedAppointments;
      case 'cancelled':
        return this.cancelledAppointments;
      default:
        return [];
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'CONFIRMED':
        return 'badge-success';
      case 'SCHEDULED':
        return 'badge-warning';
      case 'COMPLETED':
        return 'badge-primary';
      default:
        return 'badge-secondary';
    }
  }

  getEmptyStateMessage(): string {
    switch (this.activeTab) {
      case 'pending':
        return 'No pending appointments.';
      case 'confirmed':
        return 'No confirmed appointments.';
      case 'completed':
        return 'No completed appointments yet.';
      case 'cancelled':
        return 'No cancelled appointments.';
      default:
        return '';
    }
  }

  confirmAppointment(appointment: Appointment): void {
    this.appointmentService.updateAppointmentStatus(appointment.id, 'CONFIRMED').subscribe({
      next: (updatedAppointment) => {
        // Move from pending to confirmed
        this.pendingAppointments = this.pendingAppointments.filter(a => a.id !== appointment.id);
        appointment.status = 'CONFIRMED' as any;
        this.confirmedAppointments.push(appointment);
        const patientName = this.getPatientName(appointment);
        const appointmentDate = this.formatDate(appointment.appointmentDate);
        const appointmentTime = this.formatTime(appointment.appointmentTime);
        
        alert(`✅ Appointment Confirmed!\n\nPatient: ${patientName}\nDate: ${appointmentDate}\nTime: ${appointmentTime}\n\nThe patient will be notified about the confirmation.`);
      },
      error: (error) => {
        console.error('Error confirming appointment:', error);
        alert('Failed to confirm appointment. Please try again.');
      }
    });
  }

  rejectAppointment(appointment: Appointment): void {
    this.selectedAppointment = appointment;
    this.cancellationReason = '';
    
    // Show the modal
    const modal = document.getElementById('rejectModal');
    if (modal) {
      const bootstrap = (window as any).bootstrap;
      if (bootstrap) {
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
      }
    }
  }

  confirmRejection(): void {
    if (!this.selectedAppointment || !this.cancellationReason || this.cancellationReason.length < 10) {
      this.notificationService.error('Validation Error', 'Please provide a valid cancellation reason (minimum 10 characters).');
      return;
    }

    // Call the doctor service with cancellation reason
    this.doctorService.rejectAppointmentWithReason(this.selectedAppointment.id, this.cancellationReason).subscribe({
      next: (response) => {
        this.notificationService.success('Success', `Appointment with ${this.getPatientName(this.selectedAppointment!)} has been rejected successfully! Patient has been notified with the cancellation reason via email.`);
        
        // Reload appointments to get updated data
        this.loadAppointments();
        
        // Hide modal and reset form
        this.hideModal();
        this.resetForm();
      },
      error: (error) => {
        console.error('Error rejecting appointment:', error);
        this.notificationService.error('Error', 'Failed to reject appointment. Please try again.');
      }
    });
  }

  hideModal(): void {
    const modal = document.getElementById('rejectModal');
    if (modal) {
      const bootstrap = (window as any).bootstrap;
      if (bootstrap) {
        const modalInstance = bootstrap.Modal.getInstance(modal);
        if (modalInstance) {
          modalInstance.hide();
        }
      }
    }
  }

  resetForm(): void {
    this.selectedAppointment = null;
    this.cancellationReason = '';
  }

  markCompleted(appointment: Appointment): void {
    this.appointmentService.updateAppointmentStatus(appointment.id, 'COMPLETED').subscribe({
      next: (updatedAppointment) => {
        // Move from confirmed to completed
        this.confirmedAppointments = this.confirmedAppointments.filter(a => a.id !== appointment.id);
        appointment.status = 'COMPLETED' as any;
        this.completedAppointments.push(appointment);
        alert(`Appointment with ${this.getPatientName(appointment)} marked as completed.`);
      },
      error: (error) => {
        console.error('Error completing appointment:', error);
        alert('Failed to mark appointment as completed. Please try again.');
      }
    });
  }

  viewDetails(appointment: Appointment): void {
    // Navigate to patient details page with appointment ID
    this.router.navigate(['/doctor/patient-details', appointment.id]);
  }

  viewPatientDetails(appointment: Appointment): void {
    // Navigate to patient details page with appointment ID
    this.router.navigate(['/doctor/patient-details', appointment.id]);
  }

  getPatientName(appointment: Appointment): string {
    if (appointment.patient) {
      // Try direct properties first (new structure)
      if (appointment.patient.firstName && appointment.patient.lastName) {
        return `${appointment.patient.firstName} ${appointment.patient.lastName}`;
      }
      // Try user object (old structure)
      if (appointment.patient.user) {
        return `${appointment.patient.user.firstName} ${appointment.patient.user.lastName}`;
      }
      // Try fullName property
      if (appointment.patient.fullName) {
        return appointment.patient.fullName;
      }
    }
    return appointment.patientName || 'Unknown Patient';
  }

  getPatientPhone(appointment: Appointment): string {
    if (appointment.patient) {
      // Try direct phone property first (new structure)
      if (appointment.patient.phone) {
        return appointment.patient.phone;
      }
      // Try user object (old structure)
      if (appointment.patient.user && appointment.patient.user.phone) {
        return appointment.patient.user.phone;
      }
    }
    return appointment.phone || 'Not provided';
  }

  getPatientImageUrl(appointment: Appointment): string {
    if (appointment.patient?.profileImageUrl) {
      return this.imageService.getFullImageUrl(appointment.patient.profileImageUrl);
    }
    return this.imageService.getDefaultAvatar();
  }

  isCancelledByDoctor(appointment: Appointment): boolean {
    return appointment.cancelledBy === 'DOCTOR';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
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

  goBack(): void {
    this.router.navigate(['/doctor/dashboard']);
  }
}