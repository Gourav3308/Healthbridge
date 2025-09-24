import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Appointment } from '../../../models/appointment.model';
import { AuthService } from '../../../services/auth.service';
import { DoctorService } from '../../../services/doctor.service';
import { ImageService } from '../../../services/image.service';
import { NotificationService } from '../../../services/notification.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-doctor-patients',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, HeaderComponent],
  template: `
    <app-header></app-header>
    
    <div class="patients-container" style="margin-top: 70px; padding: 2rem 0; min-height: calc(100vh - 8rem);">
      <div class="container">
        <!-- Page Header -->
        <div class="page-header d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 class="mb-1">My Patients</h1>
            <p class="text-muted">View patient details from your appointments</p>
          </div>
          <div class="header-actions">
            <a routerLink="/doctor/dashboard" class="btn btn-outline-secondary me-2">
              <i class="fas fa-home me-2"></i>Dashboard
            </a>
            <button class="btn btn-success" (click)="refreshPatients()">
              <i class="fas fa-sync-alt me-2"></i>Refresh
            </button>
          </div>
        </div>

        <!-- Filter Tabs -->
        <div class="filter-tabs mb-4">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <button class="nav-link" [class.active]="activeTab === 'all'" 
                      (click)="setActiveTab('all')">
                All Patients ({{ allPatients.length }})
              </button>
            </li>
            <li class="nav-item">
              <button class="nav-link" [class.active]="activeTab === 'recent'" 
                      (click)="setActiveTab('recent')">
                Recent ({{ recentPatients.length }})
              </button>
            </li>
            <li class="nav-item">
              <button class="nav-link" [class.active]="activeTab === 'first-time'" 
                      (click)="setActiveTab('first-time')">
                First Time ({{ firstTimePatients.length }})
              </button>
            </li>
          </ul>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3">Loading patient information...</p>
        </div>

        <!-- No Patients -->
        <div *ngIf="!isLoading && getCurrentPatients().length === 0" class="no-patients text-center py-5">
          <i class="fas fa-user-friends text-muted" style="font-size: 4rem; margin-bottom: 1rem;"></i>
          <h4>No {{ activeTab === 'all' ? '' : activeTab }} patients found</h4>
          <p class="text-muted">{{ getEmptyStateMessage() }}</p>
          <a routerLink="/doctor/dashboard" class="btn btn-primary">
            <i class="fas fa-arrow-left me-2"></i>Back to Dashboard
          </a>
        </div>

        <!-- Patients Grid -->
        <div *ngIf="!isLoading && getCurrentPatients().length > 0" class="patients-grid">
          <div class="row">
            <div class="col-lg-6 col-xl-4 mb-4" *ngFor="let patientData of getCurrentPatients()">
              <div class="patient-card card h-100">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <div class="patient-avatar me-3">
                      <img [src]="getPatientImageUrl(patientData.patient)" 
                           alt="Patient" 
                           class="rounded-circle"
                           style="width: 50px; height: 50px; object-fit: cover;">
                    </div>
                    <div>
                      <h6 class="mb-0">{{ patientData.patient.firstName }} {{ patientData.patient.lastName }}</h6>
                      <small class="text-muted">ID: {{ patientData.patient.id }}</small>
                    </div>
                  </div>
                  <div class="patient-badges">
                    <span class="badge bg-info me-1" *ngIf="patientData.isFirstTime">First Visit</span>
                    <span class="badge bg-success" *ngIf="patientData.totalVisits > 1">{{ patientData.totalVisits }} visits</span>
                  </div>
                </div>
                
                <div class="card-body">
                  <!-- Basic Info -->
                  <div class="patient-basic-info mb-3">
                    <div class="row text-sm">
                      <div class="col-6">
                        <i class="fas fa-envelope text-primary me-1"></i>
                        <span class="text-truncate d-inline-block" style="max-width: 120px;" [title]="patientData.latestAppointment.patientEmail">
                          {{ patientData.latestAppointment.patientEmail }}
                        </span>
                      </div>
                      <div class="col-6">
                        <i class="fas fa-phone text-primary me-1"></i>
                        {{ patientData.latestAppointment.patientPhone }}
                      </div>
                    </div>
                    <div class="row text-sm mt-2">
                      <div class="col-6">
                        <i class="fas fa-birthday-cake text-primary me-1"></i>
                        {{ calculateAge(patientData.patient.dateOfBirth) }}{{ calculateAge(patientData.patient.dateOfBirth) !== 'N/A' ? ' years' : '' }}
                      </div>
                      <div class="col-6">
                        <i class="fas fa-venus-mars text-primary me-1"></i>
                        {{ patientData.patient.gender || 'Not specified' }}
                      </div>
                    </div>
                    <div class="row text-sm mt-2" *ngIf="patientData.patient.bloodGroup || patientData.latestAppointment.emergencyContact">
                      <div class="col-6" *ngIf="patientData.patient.bloodGroup">
                        <i class="fas fa-tint text-danger me-1"></i>
                        {{ patientData.patient.bloodGroup }}
                      </div>
                      <div class="col-6" *ngIf="patientData.latestAppointment.emergencyContact">
                        <i class="fas fa-phone-alt text-warning me-1"></i>
                        {{ patientData.latestAppointment.emergencyContact }}
                      </div>
                    </div>
                  </div>

                  <!-- Latest Appointment Info -->
                  <div class="latest-appointment-info">
                    <h6 class="text-primary mb-2">
                      <i class="fas fa-calendar-check me-1"></i>Latest Appointment
                    </h6>
                    <div class="appointment-details bg-light p-2 rounded mb-2">
                      <div class="d-flex justify-content-between align-items-center mb-1">
                        <small class="text-muted">Date & Time:</small>
                        <small class="fw-semibold">{{ formatDate(patientData.latestAppointment.appointmentDate) }} at {{ formatTime(patientData.latestAppointment.appointmentTime) }}</small>
                      </div>
                      <div class="d-flex justify-content-between align-items-center mb-1">
                        <small class="text-muted">Type:</small>
                        <small>{{ patientData.latestAppointment.appointmentType }}</small>
                      </div>
                      <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">Status:</small>
                        <span class="badge" [class]="getStatusClass(patientData.latestAppointment.status)">
                          {{ patientData.latestAppointment.status }}
                        </span>
                      </div>
                    </div>

                    <!-- Reason for Visit -->
                    <div class="reason-section mb-2">
                      <small class="text-muted">Reason for Visit:</small>
                      <div class="reason-text text-sm bg-light p-2 rounded">
                        {{ patientData.latestAppointment.reasonForVisit | slice:0:100 }}{{ patientData.latestAppointment.reasonForVisit.length > 100 ? '...' : '' }}
                      </div>
                    </div>

                    <!-- Symptoms (if provided) -->
                    <div class="symptoms-section mb-2" *ngIf="patientData.latestAppointment.symptoms">
                      <small class="text-muted">Current Symptoms:</small>
                      <div class="symptoms-text text-sm bg-light p-2 rounded">
                        {{ patientData.latestAppointment.symptoms | slice:0:80 }}{{ patientData.latestAppointment.symptoms.length > 80 ? '...' : '' }}
                      </div>
                    </div>

                    <!-- Medical History (if provided) -->
                    <div class="medical-history-section" *ngIf="patientData.latestAppointment.medicalHistory">
                      <small class="text-muted">Medical History:</small>
                      <div class="medical-history-text text-sm bg-light p-2 rounded">
                        {{ patientData.latestAppointment.medicalHistory | slice:0:80 }}{{ patientData.latestAppointment.medicalHistory.length > 80 ? '...' : '' }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card-footer">
                  <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">
                      <i class="fas fa-clock me-1"></i>
                      Last visit {{ getTimeAgo(patientData.latestAppointment.appointmentDate) }}
                    </small>
                    <div class="patient-actions">
                      <button class="btn btn-sm btn-outline-primary" 
                              (click)="viewAllAppointments(patientData.patient.id)">
                        <i class="fas fa-history me-1"></i>
                        View History
                      </button>
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
    .patients-container {
      background: #f8f9fa;
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
    
    .patient-card {
      border: none;
      box-shadow: var(--shadow-sm);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .patient-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    .patient-avatar img {
      border: 2px solid var(--primary-color);
    }
    
    .text-sm {
      font-size: 0.875rem;
    }
    
    .reason-text, .symptoms-text, .medical-history-text {
      font-size: 0.85rem;
      line-height: 1.4;
      max-height: 60px;
      overflow-y: auto;
    }
    
    .appointment-details {
      font-size: 0.85rem;
    }
    
    .badge {
      padding: 0.25rem 0.5rem;
      font-size: 0.7rem;
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
    
    .badge-info {
      background-color: var(--info-color);
      color: white;
    }
    
    @media (max-width: 768px) {
      .patients-grid .col-lg-6 {
        margin-bottom: 1rem;
      }
      
      .patient-actions {
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .patient-actions .btn {
        font-size: 0.8rem;
      }
    }
  `]
})
export class PatientsComponent implements OnInit {
  activeTab = 'all';
  allPatients: any[] = [];
  recentPatients: any[] = [];
  firstTimePatients: any[] = [];
  isLoading = false;

  constructor(
    private doctorService: DoctorService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    // Check if user is logged in and is a doctor
    if (!this.authService.isLoggedIn() || this.authService.getCurrentUser()?.role !== 'DOCTOR') {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.loadPatients();
  }

  loadPatients(): void {
    this.isLoading = true;
    
    this.doctorService.getAllAppointments().subscribe({
      next: (appointments) => {
        this.processPatientData(appointments);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading patients:', error);
        this.notificationService.error('Error', 'Failed to load patient data');
        this.isLoading = false;
      }
    });
  }

  processPatientData(appointments: Appointment[]): void {
    // Group appointments by patient
    const patientMap = new Map();
    
    appointments.forEach(appointment => {
      const patientId = appointment.patient.id;
      if (!patientMap.has(patientId)) {
        patientMap.set(patientId, {
          patient: appointment.patient,
          appointments: [],
          latestAppointment: appointment,
          totalVisits: 0,
          isFirstTime: false
        });
      }
      
      const patientData = patientMap.get(patientId);
      patientData.appointments.push(appointment);
      
      // Update latest appointment if this one is more recent
      if (new Date(appointment.appointmentDate) > new Date(patientData.latestAppointment.appointmentDate)) {
        patientData.latestAppointment = appointment;
      }
    });

    // Process each patient's data
    this.allPatients = Array.from(patientMap.values()).map(patientData => {
      patientData.totalVisits = patientData.appointments.length;
      patientData.isFirstTime = patientData.appointments.some((apt: Appointment) => apt.isFirstVisit);
      return patientData;
    });

    // Sort by latest appointment date (most recent first)
    this.allPatients.sort((a, b) => 
      new Date(b.latestAppointment.appointmentDate).getTime() - 
      new Date(a.latestAppointment.appointmentDate).getTime()
    );

    // Filter for recent patients (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    this.recentPatients = this.allPatients.filter(patientData => 
      new Date(patientData.latestAppointment.appointmentDate) >= thirtyDaysAgo
    );

    // Filter for first-time patients
    this.firstTimePatients = this.allPatients.filter(patientData => 
      patientData.isFirstTime
    );
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getCurrentPatients(): any[] {
    switch (this.activeTab) {
      case 'recent':
        return this.recentPatients;
      case 'first-time':
        return this.firstTimePatients;
      default:
        return this.allPatients;
    }
  }

  getEmptyStateMessage(): string {
    switch (this.activeTab) {
      case 'recent':
        return 'No patients have visited in the last 30 days.';
      case 'first-time':
        return 'No first-time patients found.';
      default:
        return 'No patients have booked appointments yet.';
    }
  }

  refreshPatients(): void {
    this.loadPatients();
  }

  viewAllAppointments(patientId: number): void {
    // Navigate to a detailed view of all appointments for this patient
    this.router.navigate(['/doctor/appointments'], { 
      queryParams: { patientId: patientId } 
    });
  }

  getPatientImageUrl(patient: any): string {
    if (patient.profileImageUrl) {
      return this.imageService.getFullImageUrl(patient.profileImageUrl);
    }
    return this.imageService.getDefaultAvatar();
  }

  calculateAge(dateOfBirth: string): string {
    if (!dateOfBirth) return 'N/A';
    
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age.toString();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  formatTime(timeString: string): string {
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  }

  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  }

  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'badge-success';
      case 'scheduled':
        return 'badge-warning';
      case 'completed':
        return 'badge-primary';
      case 'cancelled':
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  }
}
