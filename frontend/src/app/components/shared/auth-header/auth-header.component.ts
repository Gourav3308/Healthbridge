import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-auth-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
      <div class="container">
        <!-- Brand -->
        <a class="navbar-brand d-flex align-items-center" [routerLink]="getHomeRoute()">
          <i class="fas fa-heartbeat me-2" style="font-size: 1.5rem;"></i>
          <span style="font-weight: 700; font-size: 1.25rem;">Healthbridge</span>
        </a>

        <!-- Mobile Toggle -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navigation Links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <!-- Patient Navigation -->
            <ng-container *ngIf="currentUser?.role === 'PATIENT'">
              <li class="nav-item">
                <a class="nav-link" routerLink="/patient/dashboard" routerLinkActive="active">
                  <i class="fas fa-tachometer-alt me-1"></i>Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/patient/doctors" routerLinkActive="active">
                  <i class="fas fa-user-md me-1"></i>Find Doctors
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/patient/appointments" routerLinkActive="active">
                  <i class="fas fa-calendar-alt me-1"></i>My Appointments
                </a>
              </li>
            </ng-container>

            <!-- Doctor Navigation -->
            <ng-container *ngIf="currentUser?.role === 'DOCTOR'">
              <li class="nav-item">
                <a class="nav-link" routerLink="/doctor/dashboard" routerLinkActive="active">
                  <i class="fas fa-tachometer-alt me-1"></i>Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/doctor/appointments" routerLinkActive="active">
                  <i class="fas fa-calendar-check me-1"></i>Appointments
                </a>
              </li>
            </ng-container>

            <!-- Admin Navigation -->
            <ng-container *ngIf="currentUser?.role === 'ADMIN'">
              <li class="nav-item">
                <a class="nav-link" routerLink="/admin/dashboard" routerLinkActive="active">
                  <i class="fas fa-tachometer-alt me-1"></i>Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/admin/manage-doctors" routerLinkActive="active">
                  <i class="fas fa-user-md me-1"></i>Manage Doctors
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/admin/manage-patients" routerLinkActive="active">
                  <i class="fas fa-users me-1"></i>Manage Patients
                </a>
              </li>
            </ng-container>
          </ul>

          <!-- User Actions -->
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown">
                <img [src]="getProfileImageUrl()" alt="Profile" 
                     class="rounded-circle me-2" style="width: 32px; height: 32px; object-fit: cover;">
                <span>{{ currentUser?.firstName }} {{ currentUser?.lastName }}</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a class="dropdown-item" [routerLink]="getEditProfileRoute()">
                    <i class="fas fa-user-edit me-2"></i>Edit Profile
                  </a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item" href="#" (click)="logout($event)">
                    <i class="fas fa-sign-out-alt me-2"></i>Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      z-index: 1030;
    }
    
    .nav-link {
      transition: all 0.3s ease;
      border-radius: 0.375rem;
      margin: 0 0.25rem;
    }
    
    .nav-link:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }
    
    .nav-link.active {
      background: rgba(255, 255, 255, 0.2);
      font-weight: 600;
    }
    
    .navbar-brand:hover {
      transform: scale(1.05);
      transition: transform 0.3s ease;
    }
    
    .dropdown-menu {
      border: none;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    
    .dropdown-item:hover {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
  `]
})
export class AuthHeaderComponent implements OnInit {
  currentUser: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user || this.authService.getCurrentUser();
    });
  }

  getHomeRoute(): string {
    if (!this.currentUser) return '/';
    
    switch (this.currentUser.role) {
      case 'ADMIN': return '/admin/dashboard';
      case 'DOCTOR': return '/doctor/dashboard';
      case 'PATIENT': return '/patient/dashboard';
      default: return '/';
    }
  }

  getEditProfileRoute(): string {
    if (!this.currentUser) return '/';
    
    switch (this.currentUser.role) {
      case 'DOCTOR': return '/doctor/edit-profile';
      case 'PATIENT': return '/patient/edit-profile';
      default: return '/';
    }
  }

  getProfileImageUrl(): string {
    const role = this.currentUser?.role || '';
    const firstName = this.currentUser?.firstName || '';
    const initial = firstName.charAt(0) || 'U';
    
    switch (role) {
      case 'DOCTOR':
        return `https://via.placeholder.com/32x32/28a745/ffffff?text=Dr.${initial}`;
      case 'ADMIN':
        return `https://via.placeholder.com/32x32/dc3545/ffffff?text=${initial}`;
      case 'PATIENT':
        return `https://via.placeholder.com/32x32/007bff/ffffff?text=${initial}`;
      default:
        return `https://via.placeholder.com/32x32/6c757d/ffffff?text=${initial}`;
    }
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
