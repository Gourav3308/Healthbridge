import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Doctor } from '../../../models/doctor.model';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, HeaderComponent],
  template: `
    <app-header></app-header>
    
    <div class="dashboard-container" style="margin-top: 70px;">
      <div class="container">
        <!-- Header -->
        <div class="dashboard-header d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 class="mb-1">Admin Dashboard</h1>
            <p class="text-muted">Manage the Healthbridge platform</p>
          </div>
          <div class="user-actions d-flex align-items-center" style="gap: 1rem;">
            <button class="btn btn-outline-secondary" (click)="logout()">
              <i class="fas fa-sign-out-alt me-2"></i>Logout
            </button>
          </div>
        </div>

        <!-- Enhanced Professional Stats with 3D Effects -->
        <div class="stats-grid animate-slide-left" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
          <div class="stat-card dashboard-card animate-float" style="
            background: linear-gradient(145deg, #ffffff, #f8fafc);
            border: 2px solid rgba(255, 20, 147, 0.1);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          ">
            <div class="card-body d-flex align-items-center" style="padding: 2rem;">
              <div class="stat-icon animate-pulse-glow" style="
                width: 4rem; 
                height: 4rem; 
                background: linear-gradient(135deg, #ff1493, #ff69b4);
                border-radius: 50%; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                margin-right: 1.5rem;
                box-shadow: 0 15px 35px rgba(255, 20, 147, 0.4);
                transform: translateZ(10px);
              ">
                <i class="fas fa-user-md text-white" style="font-size: 1.5rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));"></i>
              </div>
              <div>
                <h2 class="mb-1" style="
                  font-size: 2.5rem; 
                  font-weight: 800; 
                  background: linear-gradient(135deg, #ff1493, #ff69b4);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                ">{{ pendingDoctors }}</h2>
                <p class="text-muted mb-0" style="font-weight: 600; font-size: 0.95rem;">Pending Approvals</p>
              </div>
            </div>
          </div>
          
          <div class="stat-card dashboard-card animate-float" style="
            background: linear-gradient(145deg, #ffffff, #f8fafc);
            border: 2px solid rgba(0, 255, 127, 0.1);
            animation-delay: 0.2s;
          ">
            <div class="card-body d-flex align-items-center" style="padding: 2rem;">
              <div class="stat-icon animate-pulse-glow" style="
                width: 4rem; 
                height: 4rem; 
                background: linear-gradient(135deg, #00ff7f, #32cd32);
                border-radius: 50%; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                margin-right: 1.5rem;
                box-shadow: 0 15px 35px rgba(0, 255, 127, 0.4);
                transform: translateZ(10px);
              ">
                <i class="fas fa-check-circle text-white" style="font-size: 1.5rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));"></i>
              </div>
              <div>
                <h2 class="mb-1" style="
                  font-size: 2.5rem; 
                  font-weight: 800; 
                  background: linear-gradient(135deg, #00ff7f, #32cd32);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                ">{{ approvedDoctors }}</h2>
                <p class="text-muted mb-0" style="font-weight: 600; font-size: 0.95rem;">Approved Doctors</p>
              </div>
            </div>
          </div>
          
          <div class="stat-card dashboard-card animate-float" style="
            background: linear-gradient(145deg, #ffffff, #f8fafc);
            border: 2px solid rgba(30, 144, 255, 0.1);
            animation-delay: 0.4s;
          ">
            <div class="card-body d-flex align-items-center" style="padding: 2rem;">
              <div class="stat-icon animate-pulse-glow" style="
                width: 4rem; 
                height: 4rem; 
                background: linear-gradient(135deg, #1e90ff, #4169e1);
                border-radius: 50%; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                margin-right: 1.5rem;
                box-shadow: 0 15px 35px rgba(30, 144, 255, 0.4);
                transform: translateZ(10px);
              ">
                <i class="fas fa-users text-white" style="font-size: 1.5rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));"></i>
              </div>
              <div>
                <h2 class="mb-1" style="
                  font-size: 2.5rem; 
                  font-weight: 800; 
                  background: linear-gradient(135deg, #1e90ff, #4169e1);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                ">{{ totalPatients }}</h2>
                <p class="text-muted mb-0" style="font-weight: 600; font-size: 0.95rem;">Registered Patients</p>
              </div>
            </div>
          </div>
          
          <div class="stat-card dashboard-card animate-float" style="
            background: linear-gradient(145deg, #ffffff, #f8fafc);
            border: 2px solid rgba(255, 215, 0, 0.1);
            animation-delay: 0.6s;
          ">
            <div class="card-body d-flex align-items-center" style="padding: 2rem;">
              <div class="stat-icon animate-pulse-glow" style="
                width: 4rem; 
                height: 4rem; 
                background: linear-gradient(135deg, #ffd700, #ffb300);
                border-radius: 50%; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                margin-right: 1.5rem;
                box-shadow: 0 15px 35px rgba(255, 215, 0, 0.4);
                transform: translateZ(10px);
              ">
                <i class="fas fa-calendar-check text-white" style="font-size: 1.5rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));"></i>
              </div>
              <div>
                <h2 class="mb-1" style="
                  font-size: 2.5rem; 
                  font-weight: 800; 
                  background: linear-gradient(135deg, #ffd700, #ffb300);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                ">{{ totalAppointments }}</h2>
                <p class="text-muted mb-0" style="font-weight: 600; font-size: 0.95rem;">Total Appointments</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Pending Doctor Approvals -->
        <div class="pending-approvals mb-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="mb-0">Pending Doctor Approvals</h3>
            <a routerLink="/admin/doctors" class="btn btn-outline-primary btn-sm">
              View All
            </a>
          </div>
          <div class="card">
            <div class="card-body">
              <div class="approval-item d-flex align-items-center justify-content-between py-3 border-bottom" 
                   *ngFor="let doctor of pendingDoctorsList; let last = last"
                   [class.border-0]="last">
                <div class="doctor-info d-flex align-items-center">
                  <div class="doctor-avatar me-3">
                    <i class="fas fa-user-md" style="font-size: 2rem; color: var(--primary-color);"></i>
                  </div>
                  <div>
                    <h6 class="mb-1">Dr. {{ doctor.firstName }} {{ doctor.lastName }}</h6>
                    <p class="text-muted mb-1">{{ doctor.specialization }}</p>
                    <small class="text-sm">
                      <i class="fas fa-graduation-cap me-1"></i>{{ doctor.experienceYears }} years experience
                    </small>
                  </div>
                </div>
                <div class="doctor-details">
                  <p class="text-sm mb-1">
                    <i class="fas fa-id-card me-2"></i>{{ doctor.licenseNumber }}
                  </p>
                  <p class="text-sm mb-1">
                    <i class="fas fa-hospital me-2"></i>{{ doctor.hospitalAffiliation || 'Not specified' }}
                  </p>
                  <p class="text-sm mb-0">
                    <i class="fas fa-map-marker-alt me-2"></i>{{ doctor.city || 'Not specified' }}
                  </p>
                </div>
                <div class="approval-actions d-flex gap-2">
                  <button class="btn btn-sm btn-success" (click)="approveDoctor(doctor)">
                    <i class="fas fa-check me-1"></i>Approve
                  </button>
                  <button class="btn btn-sm btn-danger" (click)="rejectDoctor(doctor)">
                    <i class="fas fa-times me-1"></i>Reject
                  </button>
                </div>
              </div>
              
              <div *ngIf="pendingDoctorsList.length === 0" class="text-center py-4">
                <i class="fas fa-check-circle text-success" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p class="text-muted">No pending approvals</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions mb-4">
          <h3 class="mb-3">Quick Actions</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            <div class="action-card card" style="cursor: pointer;" (click)="manageDoctors()">
              <div class="card-body text-center" style="padding: 2rem;">
                <i class="fas fa-user-md" style="font-size: 2rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                <h5 class="card-title">Manage Doctors</h5>
                <p class="card-text text-muted">Approve/reject doctors</p>
              </div>
            </div>
            
            <div class="action-card card" style="cursor: pointer;" (click)="managePatients()">
              <div class="card-body text-center" style="padding: 2rem;">
                <i class="fas fa-users" style="font-size: 2rem; color: var(--success-color); margin-bottom: 1rem;"></i>
                <h5 class="card-title">Manage Patients</h5>
                <p class="card-text text-muted">View patient accounts</p>
              </div>
            </div>
            
            <div class="action-card card" style="cursor: pointer;" (click)="viewAnalytics()">
              <div class="card-body text-center" style="padding: 2rem;">
                <i class="fas fa-chart-bar" style="font-size: 2rem; color: var(--warning-color); margin-bottom: 1rem;"></i>
                <h5 class="card-title">Analytics</h5>
                <p class="card-text text-muted">Platform statistics</p>
              </div>
            </div>
            
            <div class="action-card card" style="cursor: pointer;" (click)="platformSettings()">
              <div class="card-body text-center" style="padding: 2rem;">
                <i class="fas fa-cog" style="font-size: 2rem; color: var(--info-color); margin-bottom: 1rem;"></i>
                <h5 class="card-title">Settings</h5>
                <p class="card-text text-muted">Platform configuration</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="recent-activity">
          <h3 class="mb-3">Recent Activity</h3>
          <div class="card">
            <div class="card-body">
              <div class="activity-item d-flex align-items-center py-3 border-bottom" 
                   *ngFor="let activity of recentActivities; let last = last"
                   [class.border-0]="last">
                <div class="activity-icon me-3">
                  <i [class]="activity.icon" [style.color]="activity.color"></i>
                </div>
                <div class="activity-content flex-grow-1">
                  <p class="mb-1">{{ activity.message }}</p>
                  <small class="text-muted">{{ activity.time }}</small>
                </div>
                <div class="activity-status">
                  <span class="badge" [class]="activity.statusClass">{{ activity.status }}</span>
                </div>
              </div>
              
              <div *ngIf="recentActivities.length === 0" class="text-center py-4">
                <i class="fas fa-history text-muted" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p class="text-muted">No recent activity</p>
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
    
    .doctor-avatar {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
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
    
    .approval-item:last-child {
      border-bottom: none !important;
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
      
      .approval-item {
        flex-direction: column;
        align-items: flex-start !important;
        gap: 1rem;
      }
      
      .approval-actions {
        width: 100%;
        justify-content: flex-end;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  pendingDoctors = 0;
  approvedDoctors = 0;
  totalPatients = 0;
  totalAppointments = 0;
  activePatients = 0;
  totalDoctors = 0;
  pendingDoctorsList: Doctor[] = [];
  recentActivities: any[] = [];

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Load pending doctors from API
    this.adminService.getPendingDoctors().subscribe({
      next: (doctors) => {
        this.pendingDoctorsList = doctors;
        this.pendingDoctors = doctors.length;
      },
      error: (error) => {
        console.error('Error loading pending doctors:', error);
        this.pendingDoctorsList = [];
        this.pendingDoctors = 0;
      }
    });

    // Load approved doctors count
    this.adminService.getApprovedDoctorsCount().subscribe({
      next: (count) => {
        this.approvedDoctors = count;
      },
      error: (error) => {
        console.error('Error loading approved doctors count:', error);
        this.approvedDoctors = 0;
      }
    });

    // Real data only - no mock data
    this.totalPatients = 0; // Will be loaded from API when available
    this.totalAppointments = 0; // Will be loaded from API when available
    
    this.recentActivities = [];
  }

  approveDoctor(doctor: Doctor): void {
    const doctorName = doctor.firstName + ' ' + doctor.lastName;
    if (confirm(`Are you sure you want to approve Dr. ${doctorName}?`)) {
      this.adminService.approveDoctor(doctor.id).subscribe({
        next: (response) => {
          // Remove from pending list
          this.pendingDoctorsList = this.pendingDoctorsList.filter(d => d.id !== doctor.id);
          this.pendingDoctors--;
          this.approvedDoctors++;
          
          // Add to recent activities
          this.recentActivities.unshift({
            icon: 'fas fa-user-check',
            color: 'var(--success-color)',
            message: `Dr. ${doctorName} approved and activated`,
            time: 'Just now',
            status: 'Approved',
            statusClass: 'badge-success'
          });
          
          alert(`Dr. ${doctorName} has been approved successfully.`);
        },
        error: (error) => {
          console.error('Error approving doctor:', error);
          alert('Failed to approve doctor. Please try again.');
        }
      });
    }
  }

  rejectDoctor(doctor: Doctor): void {
    const doctorName = doctor.firstName + ' ' + doctor.lastName;
    const reason = prompt(`Please provide a reason for rejecting Dr. ${doctorName}:`);
    if (reason) {
      this.adminService.rejectDoctor(doctor.id).subscribe({
        next: (response) => {
          // Remove from pending list
          this.pendingDoctorsList = this.pendingDoctorsList.filter(d => d.id !== doctor.id);
          this.pendingDoctors--;
          
          // Add to recent activities
          this.recentActivities.unshift({
            icon: 'fas fa-user-times',
            color: 'var(--danger-color)',
            message: `Dr. ${doctorName} application rejected`,
            time: 'Just now',
            status: 'Rejected',
            statusClass: 'badge-danger'
          });
          
          alert(`Dr. ${doctorName}'s application has been rejected.`);
        },
        error: (error) => {
          console.error('Error rejecting doctor:', error);
          alert('Failed to reject doctor. Please try again.');
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/';
  }

  managePatients(): void {
    // Navigate to patient management page
    this.router.navigate(['/admin/patients']);
  }

  manageDoctors(): void {
    // Navigate to doctor management page
    this.router.navigate(['/admin/doctors']);
  }

  viewAnalytics(): void {
    alert('Analytics Dashboard:\n\n1. Appointment statistics\n2. Doctor performance metrics\n3. Patient satisfaction scores\n4. Revenue reports\n\nThis feature will be implemented in the next update.');
  }

  platformSettings(): void {
    alert('Platform Settings:\n\n1. System configuration\n2. Email templates\n3. Notification settings\n4. Security policies\n\nThis feature will be implemented in the next update.');
  }
}
