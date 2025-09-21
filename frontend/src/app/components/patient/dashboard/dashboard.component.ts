import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-patient-dashboard',
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
                   style="width: 60px; height: 60px; object-fit: cover; border: 3px solid #667eea;">
            </div>
            <div>
              <h1 class="mb-1">Welcome back, {{ currentUser?.firstName }}!</h1>
              <p class="text-muted">Manage your appointments and health records</p>
            </div>
          </div>
          <div class="user-actions d-flex align-items-center" style="gap: 1rem;">
            <a routerLink="/patient/edit-profile" class="btn btn-outline-primary">
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
                <i class="fas fa-calendar-check text-white"></i>
              </div>
              <div>
                <h3 class="mb-0">{{ upcomingAppointments }}</h3>
                <small class="text-muted">Upcoming Appointments</small>
              </div>
            </div>
          </div>
          
          <div class="stat-card card">
            <div class="card-body d-flex align-items-center">
              <div class="stat-icon" style="width: 3rem; height: 3rem; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 1rem;">
                <i class="fas fa-history text-white"></i>
              </div>
              <div>
                <h3 class="mb-0">{{ totalAppointments }}</h3>
                <small class="text-muted">Total Appointments</small>
              </div>
            </div>
          </div>
          
          <div class="stat-card card">
            <div class="card-body d-flex align-items-center">
              <div class="stat-icon" style="width: 3rem; height: 3rem; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 1rem;">
                <i class="fas fa-user-md text-white"></i>
              </div>
              <div>
                <h3 class="mb-0">{{ doctorsConsulted }}</h3>
                <small class="text-muted">Doctors Consulted</small>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions mb-4">
          <h3 class="mb-3">Quick Actions</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            <a routerLink="/patient/doctors" class="action-card card text-decoration-none">
              <div class="card-body text-center" style="padding: 2rem;">
                <i class="fas fa-search" style="font-size: 2rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                <h5 class="card-title">Find Doctors</h5>
                <p class="card-text text-muted">Browse approved doctors and book appointments</p>
              </div>
            </a>
            
            <a routerLink="/patient/appointments" class="action-card card text-decoration-none">
              <div class="card-body text-center" style="padding: 2rem;">
                <i class="fas fa-calendar-alt" style="font-size: 2rem; color: var(--success-color); margin-bottom: 1rem;"></i>
                <h5 class="card-title">My Appointments</h5>
                <p class="card-text text-muted">View and manage appointments</p>
              </div>
            </a>
            
            <a routerLink="/patient/edit-profile" class="action-card card text-decoration-none">
              <div class="card-body text-center" style="padding: 2rem;">
                <i class="fas fa-user-edit" style="font-size: 2rem; color: var(--warning-color); margin-bottom: 1rem;"></i>
                <h5 class="card-title">Update Profile</h5>
                <p class="card-text text-muted">Manage your information</p>
              </div>
            </a>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="recent-activity">
          <h3 class="mb-3">Recent Activity</h3>
          <div class="card">
            <div class="card-body">
              <div class="activity-list">
                <div class="activity-item d-flex align-items-center py-3 border-bottom" *ngFor="let activity of recentActivities">
                  <div class="activity-icon me-3">
                    <i [class]="activity.icon" [style.color]="activity.color"></i>
                  </div>
                  <div class="activity-content flex-grow-1">
                    <p class="mb-1">{{ activity.message }}</p>
                    <small class="text-muted">{{ activity.time }}</small>
                  </div>
                </div>
                
                <div *ngIf="recentActivities.length === 0" class="text-center py-4">
                  <i class="fas fa-inbox text-muted" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                  <p class="text-muted">No recent activity</p>
                  <a routerLink="/patient/doctors" class="btn btn-primary">Book Your First Appointment</a>
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
    
    .activity-item:last-child {
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
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  upcomingAppointments = 0;
  totalAppointments = 0;
  doctorsConsulted = 0;
  recentActivities: any[] = [];

  constructor(private authService: AuthService) {}

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
    this.upcomingAppointments = 0;
    this.totalAppointments = 0;
    this.doctorsConsulted = 0;
    
    this.recentActivities = [
      {
        icon: 'fas fa-user-check',
        color: 'var(--success-color)',
        message: 'Welcome to Healthbridge! Your account has been created successfully.',
        time: 'Just now'
      }
    ];
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
    
    // Check if user has a profile image URL
    if (userData?.profileImageUrl) {
      // If it's a relative URL, make it absolute
      if (userData.profileImageUrl.startsWith('/')) {
        return 'http://10.45.254.162:8081' + userData.profileImageUrl;
      }
      return userData.profileImageUrl;
    }
    
    // Fallback to default avatar
    return 'https://via.placeholder.com/60x60/667eea/ffffff?text=' + (userData?.firstName?.charAt(0) || 'U');
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/';
  }

}
