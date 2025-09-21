import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Appointment } from '../../../models/appointment.model';
import { AppointmentService } from '../../../services/appointment.service';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-doctor-appointments',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
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
                    <div class="patient-info">
                      <h5 class="patient-name mb-1">{{ getPatientName(appointment) }}</h5>
                      <p class="contact text-muted mb-1">
                        <i class="fas fa-phone me-2"></i>{{ getPatientPhone(appointment) }}
                      </p>
                      <p class="reason text-sm mb-0" *ngIf="appointment.reasonForVisit">
                        <i class="fas fa-notes-medical me-2"></i>{{ appointment.reasonForVisit }}
                      </p>
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
                    <div class="patient-info">
                      <h5 class="patient-name mb-1">{{ getPatientName(appointment) }}</h5>
                      <p class="contact text-muted mb-1">
                        <i class="fas fa-phone me-2"></i>{{ getPatientPhone(appointment) }}
                      </p>
                      <p class="reason text-sm mb-0" *ngIf="appointment.reasonForVisit">
                        <i class="fas fa-notes-medical me-2"></i>{{ appointment.reasonForVisit }}
                      </p>
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
                    <div class="patient-info">
                      <h5 class="patient-name mb-1">{{ getPatientName(appointment) }}</h5>
                      <p class="contact text-muted mb-1">
                        <i class="fas fa-phone me-2"></i>{{ getPatientPhone(appointment) }}
                      </p>
                      <p class="prescription text-sm mb-0" *ngIf="appointment.prescription">
                        <i class="fas fa-prescription me-2"></i>{{ appointment.prescription }}
                      </p>
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
  allAppointments: Appointment[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private router: Router
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
  }

  loadMockData(): void {
    // No mock data - only real appointments
    this.pendingAppointments = [];
    this.confirmedAppointments = [];
    this.completedAppointments = [];
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
    if (confirm(`Are you sure you want to reject this appointment with ${this.getPatientName(appointment)}?`)) {
      this.appointmentService.updateAppointmentStatus(appointment.id, 'CANCELLED').subscribe({
        next: (updatedAppointment) => {
          // Remove from pending
          this.pendingAppointments = this.pendingAppointments.filter(a => a.id !== appointment.id);
          alert(`Appointment with ${this.getPatientName(appointment)} has been rejected.`);
        },
        error: (error) => {
          console.error('Error rejecting appointment:', error);
          alert('Failed to reject appointment. Please try again.');
        }
      });
    }
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
    const patientName = this.getPatientName(appointment);
    const details = `Appointment Details:\n\nPatient: ${patientName}\nDate: ${this.formatDate(appointment.appointmentDate)}\nTime: ${this.formatTime(appointment.appointmentTime)}\nReason: ${appointment.reasonForVisit}\nStatus: ${appointment.status}`;
    alert(details);
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