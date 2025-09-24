import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppointmentService } from '../../../services/appointment.service';
import { AuthService } from '../../../services/auth.service';
import { DoctorService } from '../../../services/doctor.service';
import { ImageService } from '../../../services/image.service';
import { ReviewService } from '../../../services/review.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, HeaderComponent],
  template: `
    <app-header></app-header>
    
    <div class="dashboard-container" style="margin-top: 70px;">
      <div class="container">
        <!-- Header -->
        <div class="dashboard-header d-flex justify-content-between align-items-center mb-4">
          <div class="d-flex align-items-center">
            <!-- Profile Image -->
            <div class="profile-image-container me-3">
              <img [src]="getProfileImageUrl()" 
                   alt="Profile Picture" 
                   class="profile-image rounded-circle"
                   style="width: 60px; height: 60px; object-fit: cover; border: 3px solid #28a745;">
            </div>
            <div>
              <h1 class="mb-1">Welcome, Dr. {{ currentUser?.firstName }}!</h1>
              <p class="text-muted">Manage your practice and appointments</p>
              <div class="doctor-id-badge" style="display: inline-block; background: linear-gradient(135deg, #28a745, #20c997); color: white; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.875rem; font-weight: 600; margin-top: 0.5rem;">
                <i class="fas fa-user-md me-1"></i>Doctor ID: {{ currentUser?.id || 'N/A' }}
              </div>
            </div>
          </div>
          <div class="user-actions d-flex align-items-center" style="gap: 1rem;">
            <a routerLink="/doctor/edit-profile" class="btn btn-outline-primary">
              <i class="fas fa-user-edit me-2"></i>Edit Profile
            </a>
            <button class="btn btn-outline-secondary" (click)="logout()">
              <i class="fas fa-sign-out-alt me-2"></i>Logout
            </button>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
          <div class="stat-card card">
            <div class="card-body d-flex align-items-center">
              <div class="stat-icon" style="width: 3rem; height: 3rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 1rem;">
                <i class="fas fa-calendar-day text-white"></i>
              </div>
              <div>
                <h3 class="mb-0">{{ todayAppointments }}</h3>
                <small class="text-muted">Today's Appointments</small>
              </div>
            </div>
          </div>
          
          <div class="stat-card card">
            <div class="card-body d-flex align-items-center">
              <div class="stat-icon" style="width: 3rem; height: 3rem; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 1rem;">
                <i class="fas fa-users text-white"></i>
              </div>
              <div>
                <h3 class="mb-0">{{ totalPatients }}</h3>
                <small class="text-muted">Total Patients</small>
              </div>
            </div>
          </div>
          
          <div class="stat-card card">
            <div class="card-body d-flex align-items-center">
              <div class="stat-icon" style="width: 3rem; height: 3rem; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 1rem;">
                <i class="fas fa-star text-white"></i>
              </div>
              <div>
                <h3 class="mb-0">{{ averageRating }}</h3>
                <small class="text-muted">Average Rating</small>
              </div>
            </div>
          </div>
          
          <div class="stat-card card">
            <div class="card-body d-flex align-items-center">
              <div class="stat-icon" style="width: 3rem; height: 3rem; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 1rem;">
                <i class="fas fa-rupee-sign text-white"></i>
              </div>
              <div>
                <h3 class="mb-0">₹{{ monthlyEarnings | number }}</h3>
                <small class="text-muted">This Month</small>
              </div>
            </div>
          </div>
        </div>

        <!-- Today's Schedule -->
        <div class="today-schedule mb-4">
          <h3 class="mb-3">Today's Schedule</h3>
          <div class="card">
            <div class="card-body">
              <div class="schedule-timeline">
                <div class="timeline-item d-flex align-items-center py-3 border-bottom" 
                     *ngFor="let appointment of todaySchedule; let last = last"
                     [class.border-0]="last">
                  <div class="timeline-time me-4">
                    <div class="time-badge">{{ appointment.time }}</div>
                  </div>
                  <div class="timeline-content flex-grow-1">
                    <h6 class="mb-1">{{ appointment.patientName }}</h6>
                    <p class="text-muted mb-1">{{ appointment.reason }}</p>
                    <small class="text-sm">{{ appointment.type }}</small>
                  </div>
                  <div class="timeline-actions d-flex align-items-center gap-2">
                    <span class="badge" [class]="getStatusClass(appointment.status)">
                      {{ appointment.status }}
                    </span>
                    <div class="action-buttons" *ngIf="appointment.status === 'SCHEDULED'">
                      <button class="btn btn-sm btn-success" 
                              (click)="confirmAppointment(appointment)"
                              title="Confirm Appointment">
                        <i class="fas fa-check"></i>
                      </button>
                      <button class="btn btn-sm btn-danger" 
                              (click)="rejectAppointment(appointment)"
                              title="Reject Appointment">
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div *ngIf="todaySchedule.length === 0" class="text-center py-4">
                  <i class="fas fa-calendar-check text-muted" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                  <p class="text-muted">No appointments scheduled for today</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions mb-4">
          <h3 class="mb-3">Quick Actions</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            <a routerLink="/doctor/appointments" class="action-card card text-decoration-none">
              <div class="card-body text-center" style="padding: 2rem;">
                <i class="fas fa-calendar-alt" style="font-size: 2rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                <h5 class="card-title">View Appointments</h5>
                <p class="card-text text-muted">Manage your appointments</p>
              </div>
            </a>
            
            <a routerLink="/doctor/pending-appointments" class="action-card card text-decoration-none">
              <div class="card-body text-center" style="padding: 2rem;">
                <i class="fas fa-clock" style="font-size: 2rem; color: var(--warning-color); margin-bottom: 1rem;"></i>
                <h5 class="card-title">Pending Approvals</h5>
                <p class="card-text text-muted">Review appointment requests</p>
                <span class="badge bg-warning" *ngIf="pendingCount > 0">{{ pendingCount }}</span>
              </div>
            </a>
            
            <a routerLink="/doctor/patients" class="action-card card text-decoration-none">
              <div class="card-body text-center" style="padding: 2rem;">
                <i class="fas fa-users" style="font-size: 2rem; color: var(--success-color); margin-bottom: 1rem;"></i>
                <h5 class="card-title">View Patients</h5>
                <p class="card-text text-muted">See patient details from bookings</p>
              </div>
            </a>
            
            <a routerLink="/doctor/edit-profile" class="action-card card text-decoration-none">
              <div class="card-body text-center" style="padding: 2rem;">
                <i class="fas fa-user-edit" style="font-size: 2rem; color: var(--info-color); margin-bottom: 1rem;"></i>
                <h5 class="card-title">Update Profile</h5>
                <p class="card-text text-muted">Edit your information</p>
              </div>
            </a>
            
            <div class="action-card card">
              <div class="card-body text-center" style="padding: 2rem;">
                <i class="fas fa-clock" style="font-size: 2rem; color: var(--warning-color); margin-bottom: 1rem;"></i>
                <h5 class="card-title">Set Availability</h5>
                <p class="card-text text-muted">Manage your schedule</p>
              </div>
            </div>
            
            <div class="action-card card">
              <div class="card-body text-center" style="padding: 2rem;">
                <i class="fas fa-chart-line" style="font-size: 2rem; color: var(--info-color); margin-bottom: 1rem;"></i>
                <h5 class="card-title">View Reports</h5>
                <p class="card-text text-muted">Analytics & insights</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Reviews -->
        <div class="recent-reviews">
          <h3 class="mb-3">Recent Patient Reviews</h3>
          <div class="card">
            <div class="card-body">
              <div class="review-item d-flex align-items-start py-3 border-bottom" 
                   *ngFor="let review of recentReviews; let last = last"
                   [class.border-0]="last">
                <div class="review-avatar me-3">
                  <i class="fas fa-user-circle" style="font-size: 2.5rem; color: var(--text-muted);"></i>
                </div>
                <div class="review-content flex-grow-1">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <h6 class="mb-0">{{ review.patientName }}</h6>
                    <div class="review-rating">
                      <i class="fas fa-star text-warning" *ngFor="let star of [1,2,3,4,5]; let i = index"
                         [class.text-muted]="i >= review.rating"></i>
                    </div>
                  </div>
                  <p class="text-muted mb-1">{{ review.comment }}</p>
                  <small class="text-sm">{{ formatDate(review.createdAt) }}</small>
                </div>
              </div>
              
              <div *ngIf="recentReviews.length === 0" class="text-center py-4">
                <i class="fas fa-star text-muted" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p class="text-muted">No reviews yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <app-footer></app-footer>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem 0;
      min-height: calc(100vh - 8rem);
    }
    
    .stat-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: none;
      box-shadow: var(--shadow-sm);
    }
    
    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    .action-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: none;
      box-shadow: var(--shadow-sm);
      cursor: pointer;
    }
    
    .action-card:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-lg);
    }
    
    .time-badge {
      background: var(--primary-color);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: var(--radius-md);
      font-weight: 500;
      font-size: 0.875rem;
      min-width: 80px;
      text-align: center;
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
    
    .action-buttons {
      display: flex;
      gap: 0.25rem;
    }
    
    .action-buttons .btn {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      min-width: 30px;
    }
    
    @media (max-width: 768px) {
      .dashboard-header {
        flex-direction: column;
        align-items: flex-start !important;
        gap: 1rem;
      }
      
      .user-actions {
        width: 100%;
        justify-content: flex-end;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  todayAppointments = 0;
  totalPatients = 0;
  averageRating: string | number = 0;
  monthlyEarnings = 0;
  todaySchedule: any[] = [];
  recentReviews: any[] = [];
  pendingCount = 0;

  constructor(
    private authService: AuthService,
    private doctorService: DoctorService,
    private reviewService: ReviewService,
    private imageService: ImageService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    // Subscribe to currentUser$ to get updates when user data changes
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.loadDashboardData();
      } else {
        // Fallback to getCurrentUser if observable is null
        this.currentUser = this.authService.getCurrentUser();
        if (this.currentUser) {
          this.loadDashboardData();
        }
      }
    });
  }

  loadDashboardData(): void {
    // Load real data - no demo data
    this.todayAppointments = 0;
    this.totalPatients = 0;
    this.averageRating = 0;
    this.monthlyEarnings = 0;
    
    this.todaySchedule = [];
    
    // Load today's appointments
    this.loadTodayAppointments();
    
    // Load reviews and ratings
    this.loadReviews();
    
    // Load pending appointments count
    this.loadPendingCount();
  }

  loadReviews(): void {
    if (this.currentUser && this.currentUser.role === 'DOCTOR') {
      const doctorId = this.currentUser.id;
      
      // Load reviews for this doctor
      this.reviewService.getReviewsByDoctorId(doctorId).subscribe({
        next: (reviews) => {
          this.recentReviews = reviews.slice(0, 5); // Show only recent 5 reviews
          
          // Calculate average rating
          if (reviews.length > 0) {
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            this.averageRating = parseFloat((totalRating / reviews.length).toFixed(1));
          } else {
            this.averageRating = 0.0;
          }
        },
        error: (error) => {
          console.error('Error loading reviews:', error);
          this.recentReviews = [];
          this.averageRating = 0.0;
        }
      });
    }
  }

  loadTodayAppointments(): void {
    if (this.currentUser && this.currentUser.role === 'DOCTOR') {
      this.doctorService.getTodayAppointments().subscribe({
        next: (appointments) => {
          console.log('Today\'s appointments loaded:', appointments);
          this.todayAppointments = appointments.length;
          
          // Transform appointments for display
          this.todaySchedule = appointments.map(appointment => ({
            id: appointment.id,
            time: this.formatTime(appointment.appointmentTime),
            patientName: this.getPatientName(appointment),
            reason: appointment.reasonForVisit,
            type: appointment.appointmentType,
            status: appointment.status,
            originalAppointment: appointment // Keep reference to original appointment
          }));
          
          console.log('Today\'s schedule:', this.todaySchedule);
        },
        error: (error) => {
          console.error('Error loading today\'s appointments:', error);
          this.todayAppointments = 0;
          this.todaySchedule = [];
        }
      });
    }
  }

  loadPendingCount(): void {
    if (this.currentUser && this.currentUser.role === 'DOCTOR') {
      this.doctorService.getPendingAppointments().subscribe({
        next: (appointments) => {
          this.pendingCount = appointments.length;
        },
        error: (error) => {
          console.error('Error loading pending appointments count:', error);
          this.pendingCount = 0;
        }
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'badge-success';
      case 'pending':
        return 'badge-warning';
      case 'completed':
        return 'badge-primary';
      default:
        return 'badge-secondary';
    }
  }

  getProfileImageUrl(): string {
    // Try to get fresh user data from localStorage
    const storedUser = localStorage.getItem('currentUser');
    let userData = this.currentUser;
    
    if (storedUser) {
      try {
        userData = JSON.parse(storedUser);
      } catch (e) {
        userData = this.currentUser;
      }
    }
    
    // Use ImageService to get the full image URL
    return this.imageService.getFullImageUrl(userData?.profileImageUrl);
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  formatTime(timeString: string): string {
    if (!timeString) return '';
    // Assuming timeString is in HH:mm format
    return timeString;
  }

  getPatientName(appointment: any): string {
    if (appointment.patient) {
      return `${appointment.patient.firstName || 'Unknown'} ${appointment.patient.lastName || ''}`.trim();
    }
    return 'Unknown Patient';
  }

  confirmAppointment(appointment: any): void {
    this.appointmentService.updateAppointmentStatus(appointment.id, 'CONFIRMED').subscribe({
      next: (updatedAppointment) => {
        // Update the appointment status in the schedule
        const scheduleItem = this.todaySchedule.find(item => item.id === appointment.id);
        if (scheduleItem) {
          scheduleItem.status = 'CONFIRMED';
        }
        
        const patientName = appointment.patientName;
        const appointmentTime = appointment.time;
        
        alert(`✅ Appointment Confirmed!\n\nPatient: ${patientName}\nTime: ${appointmentTime}\n\nThe patient will be notified about the confirmation.`);
        
        // Reload today's appointments to get updated data
        this.loadTodayAppointments();
      },
      error: (error) => {
        console.error('Error confirming appointment:', error);
        alert('Failed to confirm appointment. Please try again.');
      }
    });
  }

  rejectAppointment(appointment: any): void {
    if (confirm(`Are you sure you want to reject this appointment with ${appointment.patientName}?`)) {
      this.appointmentService.updateAppointmentStatus(appointment.id, 'CANCELLED').subscribe({
        next: (updatedAppointment) => {
          // Remove from today's schedule
          this.todaySchedule = this.todaySchedule.filter(item => item.id !== appointment.id);
          this.todayAppointments = this.todaySchedule.length;
          
          alert(`Appointment with ${appointment.patientName} has been rejected.`);
          
          // Reload today's appointments to get updated data
          this.loadTodayAppointments();
        },
        error: (error) => {
          console.error('Error rejecting appointment:', error);
          alert('Failed to reject appointment. Please try again.');
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/';
  }

}
