import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Appointment } from '../../../models/appointment.model';
import { AppointmentService } from '../../../services/appointment.service';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-patient-appointments',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, FormsModule],
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
              <p class="text-muted mb-0">View and manage your appointments</p>
            </div>
          </div>
        </div>

        <!-- Filter Tabs -->
        <div class="filter-tabs mb-4">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <button class="nav-link" [class.active]="activeTab === 'upcoming'" 
                      (click)="setActiveTab('upcoming')">
                Upcoming ({{ upcomingAppointments.length }})
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
          <!-- Upcoming Appointments -->
          <div *ngIf="activeTab === 'upcoming'">
            <div class="appointment-card card mb-3" *ngFor="let appointment of upcomingAppointments">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-md-2">
                    <div class="appointment-date text-center">
                      <div class="date-day">{{ formatDate(appointment.appointmentDate).day }}</div>
                      <div class="date-month">{{ formatDate(appointment.appointmentDate).month }}</div>
                      <div class="date-time">{{ formatTime(appointment.appointmentTime) }}</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="doctor-info">
                      <h5 class="doctor-name mb-1">Dr. {{ getDoctorName(appointment) }}</h5>
                      <p class="specialization text-muted mb-1">{{ getDoctorSpecialization(appointment) }}</p>
                      <p class="hospital text-sm mb-1">
                        <i class="fas fa-hospital me-2"></i>{{ getDoctorHospital(appointment) }}
                      </p>
                      <p class="reason text-sm mb-0" *ngIf="appointment.reasonForVisit">
                        <i class="fas fa-notes-medical me-2"></i>{{ appointment.reasonForVisit }}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="appointment-status">
                      <span class="badge" [class]="getStatusClass(appointment.status)">
                        {{ appointment.status }}
                      </span>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="appointment-actions">
                      <button class="btn btn-sm btn-outline-danger" 
                              (click)="cancelAppointment(appointment)">
                        Cancel
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
                  <div class="col-md-2">
                    <div class="appointment-date text-center">
                      <div class="date-day">{{ formatDate(appointment.appointmentDate).day }}</div>
                      <div class="date-month">{{ formatDate(appointment.appointmentDate).month }}</div>
                      <div class="date-time">{{ formatTime(appointment.appointmentTime) }}</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="doctor-info">
                      <h5 class="doctor-name mb-1">Dr. {{ getDoctorName(appointment) }}</h5>
                      <p class="specialization text-muted mb-1">{{ getDoctorSpecialization(appointment) }}</p>
                      <p class="hospital text-sm mb-1">
                        <i class="fas fa-hospital me-2"></i>{{ getDoctorHospital(appointment) }}
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
                  <div class="col-md-2">
                    <div class="appointment-actions">
                      <button class="btn btn-sm btn-outline-primary" 
                              (click)="downloadPrescription(appointment)">
                        <i class="fas fa-download me-1"></i>Download
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
                  <div class="col-md-2">
                    <div class="appointment-date text-center">
                      <div class="date-day">{{ formatDate(appointment.appointmentDate).day }}</div>
                      <div class="date-month">{{ formatDate(appointment.appointmentDate).month }}</div>
                      <div class="date-time">{{ formatTime(appointment.appointmentTime) }}</div>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="doctor-info">
                      <h5 class="doctor-name mb-1">Dr. {{ getDoctorName(appointment) }}</h5>
                      <p class="specialization text-muted mb-1">{{ getDoctorSpecialization(appointment) }}</p>
                      <p class="hospital text-sm mb-1">
                        <i class="fas fa-hospital me-2"></i>{{ getDoctorHospital(appointment) }}
                      </p>
                      <p class="cancellation-reason text-sm mb-0" *ngIf="appointment.cancellationReason">
                        <i class="fas fa-info-circle me-2"></i><strong>Cancellation Reason:</strong> {{ appointment.cancellationReason }}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="appointment-status text-center">
                      <span class="badge badge-danger mb-2">Cancelled</span>
                      <div class="cancellation-source mb-2" *ngIf="appointment.cancellationReason">
                        <small class="text-muted">
                          <i class="fas fa-user-md me-1" *ngIf="isCancelledByDoctor(appointment)"></i>
                          <i class="fas fa-user me-1" *ngIf="!isCancelledByDoctor(appointment)"></i>
                          {{ isCancelledByDoctor(appointment) ? 'Cancelled by Doctor' : 'Cancelled by You' }}
                        </small>
                      </div>
                      <button class="btn btn-sm btn-outline-primary" (click)="viewCancellationDetails(appointment)">
                        <i class="fas fa-eye me-1"></i>View Details
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
            <a routerLink="/patient/doctors" class="btn btn-primary">
              <i class="fas fa-search me-2"></i>Find Doctors
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Cancellation Reason Modal -->
    <div class="modal fade" id="cancelModal" tabindex="-1" aria-labelledby="cancelModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="cancelModalLabel">
              <i class="fas fa-exclamation-triangle text-warning me-2"></i>Cancel Appointment
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-warning" role="alert">
              <i class="fas fa-info-circle me-2"></i>
              Please provide a reason for cancelling this appointment. This information will be shared with your doctor.
            </div>
            
            <div class="mb-3">
              <label for="cancellationReason" class="form-label">Cancellation Reason *</label>
              <textarea 
                class="form-control" 
                id="cancellationReason" 
                rows="4" 
                [(ngModel)]="cancellationReason"
                placeholder="Please explain why you need to cancel this appointment..."
                required>
              </textarea>
              <div class="form-text">Minimum 10 characters required</div>
            </div>
            
            <div class="appointment-details bg-light p-3 rounded">
              <h6 class="mb-2">Appointment Details:</h6>
              <p class="mb-1"><strong>Doctor:</strong> Dr. {{ selectedAppointment?.doctor?.firstName }} {{ selectedAppointment?.doctor?.lastName }}</p>
              <p class="mb-1"><strong>Date:</strong> {{ selectedAppointment?.appointmentDate | date:'fullDate' }}</p>
              <p class="mb-0"><strong>Time:</strong> {{ formatTime(selectedAppointment?.appointmentTime || '') }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Keep Appointment</button>
            <button type="button" class="btn btn-danger" (click)="confirmCancellation()" [disabled]="!cancellationReason || cancellationReason.trim().length < 10">
              <i class="fas fa-times me-2"></i>Cancel Appointment
            </button>
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
    
    .appointment-date {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem;
      border-radius: var(--radius-md);
      min-width: 120px;
    }
    
    .date-day {
      font-size: 1.5rem;
      font-weight: 600;
    }
    
    .date-month {
      font-size: 0.875rem;
      opacity: 0.9;
    }
    
    .date-time {
      font-size: 0.875rem;
      font-weight: 500;
      margin-top: 0.5rem;
    }
    
    .doctor-name {
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
    
    .badge-danger {
      background-color: var(--danger-color);
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
      
      .appointment-date {
        min-width: 100px;
        padding: 0.75rem;
      }
    }
  `]
})
export class AppointmentsComponent implements OnInit {
  activeTab = 'upcoming';
  upcomingAppointments: Appointment[] = [];
  completedAppointments: Appointment[] = [];
  cancelledAppointments: Appointment[] = [];
  allAppointments: Appointment[] = [];
  selectedAppointment: Appointment | null = null;
  cancellationReason = '';

  constructor(
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    // Load all patient appointments
    this.appointmentService.getPatientAppointments().subscribe({
      next: (appointments) => {
        this.allAppointments = appointments;
        this.categorizeAppointments();
        console.log('Loaded appointments:', appointments);
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
        this.allAppointments = [];
        this.categorizeAppointments();
      }
    });
  }

  categorizeAppointments(): void {
    // Categorize real appointments only
    this.upcomingAppointments = this.allAppointments.filter(apt => 
      apt.status === 'SCHEDULED' || apt.status === 'CONFIRMED'
    );
    
    this.completedAppointments = this.allAppointments.filter(apt => 
      apt.status === 'COMPLETED'
    );
    
    this.cancelledAppointments = this.allAppointments.filter(apt => 
      apt.status === 'CANCELLED' || apt.status === 'NO_SHOW'
    );
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getCurrentAppointments(): any[] {
    switch (this.activeTab) {
      case 'upcoming':
        return this.upcomingAppointments;
      case 'completed':
        return this.completedAppointments;
      case 'cancelled':
        return this.cancelledAppointments;
      default:
        return [];
    }
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'badge-success';
      case 'scheduled':
        return 'badge-primary';
      case 'pending':
        return 'badge-warning';
      default:
        return 'badge-secondary';
    }
  }

  getEmptyStateMessage(): string {
    switch (this.activeTab) {
      case 'upcoming':
        return 'You have no upcoming appointments. Book an appointment with a doctor to get started.';
      case 'completed':
        return 'You have no completed appointments yet.';
      case 'cancelled':
        return 'You have no cancelled appointments.';
      default:
        return '';
    }
  }

  isCancelledByDoctor(appointment: Appointment): boolean {
    return appointment.cancelledBy === 'DOCTOR';
  }

  viewCancellationDetails(appointment: Appointment): void {
    // Navigate to cancellation details page
    this.router.navigate(['/patient/cancellation-details', appointment.id]);
  }

  cancelAppointment(appointment: Appointment): void {
    this.selectedAppointment = appointment;
    this.cancellationReason = '';
    
    // Show the modal
    const modal = document.getElementById('cancelModal');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }

  confirmCancellation(): void {
    if (!this.selectedAppointment || !this.cancellationReason || this.cancellationReason.trim().length < 10) {
      return;
    }

    console.log('=== CANCELLATION DEBUG ===');
    console.log('Appointment ID:', this.selectedAppointment.id);
    console.log('Cancellation Reason:', this.cancellationReason.trim());
    console.log('Appointment Object:', this.selectedAppointment);

    // Call the backend to cancel with reason
    this.appointmentService.cancelAppointmentWithReason(this.selectedAppointment.id!, this.cancellationReason.trim()).subscribe({
      next: (response) => {
        console.log('Appointment cancelled successfully:', response);
        
        // Update local state
        this.upcomingAppointments = this.upcomingAppointments.filter(a => a.id !== this.selectedAppointment!.id);
        this.selectedAppointment!.status = 'CANCELLED' as any;
        this.selectedAppointment!.cancellationReason = this.cancellationReason.trim();
        this.cancelledAppointments.push(this.selectedAppointment!);
        
        // Hide modal
        const modal = document.getElementById('cancelModal');
        if (modal) {
          const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
          bootstrapModal.hide();
        }
        
        // Reset form
        this.selectedAppointment = null;
        this.cancellationReason = '';
        
        // Show success message
        alert('Appointment cancelled successfully. Your doctor has been notified.');
      },
      error: (error) => {
        console.error('Error cancelling appointment:', error);
        console.error('Error details:', error.error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        alert('Failed to cancel appointment. Please try again.');
      }
    });
  }

  downloadPrescription(appointment: any): void {
    alert('Downloading prescription... This feature will be implemented with actual file download.');
  }

  formatDate(dateString: string): { day: string, month: string } {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString(),
      month: date.toLocaleString('default', { month: 'short' })
    };
  }

  formatTime(timeString: string): string {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }

  getDoctorName(appointment: Appointment): string {
    if (appointment.doctor) {
      return (appointment.doctor.firstName || '') + ' ' + (appointment.doctor.lastName || '');
    }
    return appointment.doctorName || 'Unknown Doctor';
  }

  getDoctorSpecialization(appointment: Appointment): string {
    return appointment.doctor?.specialization || appointment.specialization || 'General';
  }

  getDoctorHospital(appointment: Appointment): string {
    return appointment.doctor?.hospitalAffiliation || appointment.hospital || 'Not specified';
  }

  goBack(): void {
    this.router.navigate(['/patient/dashboard']);
  }
}
