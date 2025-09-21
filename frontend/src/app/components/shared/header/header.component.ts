import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Professional Healthcare Header -->
    <nav class="navbar navbar-expand-lg fixed-top shadow-lg" style="
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(0, 255, 127, 0.3);
      position: relative;
      z-index: 1050;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    ">
      <div class="container">
        <!-- Brand Logo -->
        <a class="navbar-brand text-white fw-bold fs-4" routerLink="/" style="
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        ">
          <i class="fas fa-heartbeat me-2" style="color: #00ff7f; animation: heartbeat 2s ease-in-out infinite;"></i>
          <span>HealthBridge</span>
        </a>
        
        <!-- Mobile Toggle -->
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" style="
          background: rgba(0, 255, 127, 0.1);
          border-radius: 8px;
          padding: 0.5rem;
          border: 1px solid rgba(0, 255, 127, 0.3);
        ">
          <span class="navbar-toggler-icon" style="
            background-image: url('data:image/svg+xml,%3csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 30 30\\'%3e%3cpath stroke=\\'rgba%28255, 255, 255, 1%29\\' stroke-linecap=\\'round\\' stroke-miterlimit=\\'10\\' stroke-width=\\'2\\' d=\\'M4 7h22M4 15h22M4 23h22\\'/%3e%3c/svg%3e');
          "></span>
        </button>
        
        <!-- Navigation Menu -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            
            <!-- PUBLIC NAVIGATION (Not logged in) -->
            <ng-container *ngIf="!isLoggedIn()">
              <li class="nav-item">
                <a class="nav-link text-white fw-semibold px-3 py-2" 
                   routerLink="/" 
                   routerLinkActive="active"
                   [routerLinkActiveOptions]="{exact: true}">
                  <i class="fas fa-home me-1"></i>Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white fw-semibold px-3 py-2" 
                   routerLink="/patient/doctors">
                  <i class="fas fa-user-md me-1"></i>Find Doctors
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white fw-semibold px-3 py-2" href="#medicines">
                  <i class="fas fa-pills me-1"></i>Medicines
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white fw-semibold px-3 py-2" href="#services">
                  <i class="fas fa-stethoscope me-1"></i>Services
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white fw-semibold px-3 py-2" href="#about">
                  <i class="fas fa-info-circle me-1"></i>About
                </a>
              </li>
            </ng-container>

            <!-- PATIENT NAVIGATION -->
            <ng-container *ngIf="isLoggedIn() && getCurrentUser()?.role === 'PATIENT'">
              <li class="nav-item">
                <a class="nav-link text-white fw-semibold px-3 py-2" 
                   routerLink="/patient/dashboard"
                   routerLinkActive="active">
                  <i class="fas fa-tachometer-alt me-1"></i>Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white fw-semibold px-3 py-2" 
                   routerLink="/patient/doctors">
                  <i class="fas fa-user-md me-1"></i>Find Doctors
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white fw-semibold px-3 py-2" 
                   routerLink="/patient/appointments"
                   routerLinkActive="active">
                  <i class="fas fa-calendar-alt me-1"></i>My Appointments
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white fw-semibold px-3 py-2" 
                   routerLink="/patient/edit-profile"
                   routerLinkActive="active">
                  <i class="fas fa-user-edit me-1"></i>Profile
                </a>
              </li>
            </ng-container>

            <!-- DOCTOR NAVIGATION -->
            <ng-container *ngIf="isLoggedIn() && getCurrentUser()?.role === 'DOCTOR'">
              <li class="nav-item">
                <a class="nav-link text-white fw-semibold px-3 py-2" 
                   routerLink="/doctor/dashboard"
                   routerLinkActive="active">
                  <i class="fas fa-tachometer-alt me-1"></i>Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white fw-semibold px-3 py-2" 
                   routerLink="/doctor/appointments"
                   routerLinkActive="active">
                  <i class="fas fa-calendar-check me-1"></i>Appointments
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white fw-semibold px-3 py-2" 
                   routerLink="/doctor/pending-appointments"
                   routerLinkActive="active">
                  <i class="fas fa-clock me-1"></i>Pending
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white fw-semibold px-3 py-2" 
                   routerLink="/doctor/patients"
                   routerLinkActive="active">
                  <i class="fas fa-users me-1"></i>Patients
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white fw-semibold px-3 py-2" 
                   routerLink="/doctor/edit-profile"
                   routerLinkActive="active">
                  <i class="fas fa-user-edit me-1"></i>Profile
                </a>
              </li>
            </ng-container>

            <!-- ADMIN NAVIGATION -->
            <ng-container *ngIf="isLoggedIn() && getCurrentUser()?.role === 'ADMIN'">
              <li class="nav-item">
                <a class="nav-link text-white fw-semibold px-3 py-2" 
                   routerLink="/admin/dashboard"
                   routerLinkActive="active">
                  <i class="fas fa-tachometer-alt me-1"></i>Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white fw-semibold px-3 py-2" 
                   routerLink="/admin/manage-doctors"
                   routerLinkActive="active">
                  <i class="fas fa-user-md me-1"></i>Manage Doctors
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white fw-semibold px-3 py-2" 
                   routerLink="/admin/manage-patients"
                   routerLinkActive="active">
                  <i class="fas fa-users me-1"></i>Manage Patients
                </a>
              </li>
            </ng-container>
          </ul>
          
          <!-- User Actions -->
          <div class="d-flex align-items-center" style="gap: 1rem;">
            
            <!-- LOGGED IN USER ACTIONS -->
            <ng-container *ngIf="isLoggedIn()">
              <!-- User Info -->
              <div class="d-flex align-items-center text-white">
                <i class="fas fa-user-circle me-2" style="font-size: 1.2rem; color: #00ff7f;"></i>
                <span class="fw-semibold">{{ getCurrentUser()?.firstName }} {{ getCurrentUser()?.lastName }}</span>
                <span class="badge bg-success ms-2" style="font-size: 0.7rem;">
                  {{ getCurrentUser()?.role }}
                </span>
              </div>
              
              <!-- Logout Button -->
              <button class="btn btn-outline-light btn-sm" (click)="logout()" style="
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 20px;
                padding: 0.5rem 1rem;
                transition: all 0.3s ease;
              ">
                <i class="fas fa-sign-out-alt me-1"></i>Logout
              </button>
            </ng-container>

            <!-- PUBLIC USER ACTIONS -->
            <ng-container *ngIf="!isLoggedIn()">
              <!-- Login Button -->
              <a class="btn btn-outline-light btn-sm me-2" 
                 routerLink="/auth/login" 
                 style="
                   border: 1px solid rgba(255, 255, 255, 0.3);
                   border-radius: 20px;
                   padding: 0.5rem 1rem;
                   transition: all 0.3s ease;
                 ">
                <i class="fas fa-sign-in-alt me-1"></i>Login
              </a>
              
              <!-- Register Button -->
              <a class="btn btn-success btn-sm" 
                 routerLink="/auth/register"
                 style="
                   background: linear-gradient(45deg, #00ff7f, #32cd32);
                   border: none;
                   border-radius: 20px;
                   padding: 0.5rem 1rem;
                   font-weight: 600;
                   transition: all 0.3s ease;
                 ">
                <i class="fas fa-user-plus me-1"></i>Register
              </a>
            </ng-container>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    .navbar-brand:hover {
      transform: scale(1.05);
      text-shadow: 0 0 10px rgba(0, 255, 127, 0.5);
    }

    .nav-link {
      transition: all 0.3s ease;
      border-radius: 8px;
      margin: 0 0.2rem;
    }

    .nav-link:hover {
      background: rgba(0, 255, 127, 0.1);
      color: #00ff7f !important;
      transform: translateY(-2px);
    }

    .nav-link.active {
      background: rgba(0, 255, 127, 0.2);
      color: #00ff7f !important;
      font-weight: 700;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .btn-outline-light:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5);
    }

    .btn-success:hover {
      background: linear-gradient(45deg, #32cd32, #00ff7f) !important;
      transform: translateY(-2px);
    }

    /* Enhanced Mobile Responsive */
    @media (max-width: 575.98px) {
      .navbar {
        padding: 0.5rem 0 !important;
      }
      
      .container {
        padding: 0 0.75rem !important;
      }
      
      .navbar-brand {
        font-size: 1rem !important;
      }
      
      .navbar-brand span {
        display: none !important;
      }
      
      .navbar-brand i {
        font-size: 1.5rem !important;
      }
      
      .navbar-toggler {
        padding: 0.4rem !important;
        font-size: 0.8rem !important;
      }
      
      .navbar-collapse {
        background: rgba(30, 60, 114, 0.98) !important;
        backdrop-filter: blur(20px) !important;
        border-radius: 15px !important;
        margin-top: 0.75rem !important;
        padding: 1rem !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
        border: 1px solid rgba(0, 255, 127, 0.2) !important;
      }
      
      .navbar-nav {
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
      }
      
      .nav-item {
        margin: 0.25rem 0 !important;
        width: 100% !important;
      }
      
      .nav-link {
        padding: 0.75rem 1rem !important;
        border-radius: 10px !important;
        font-size: 0.9rem !important;
        text-align: center !important;
        background: rgba(255, 255, 255, 0.05) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        margin: 0.25rem 0 !important;
      }
      
      .nav-link:hover {
        background: rgba(0, 255, 127, 0.2) !important;
        transform: none !important;
      }
      
      .nav-link.active {
        background: rgba(0, 255, 127, 0.3) !important;
      }
      
      .d-flex.align-items-center {
        margin-top: 1rem !important;
        padding-top: 1rem !important;
        border-top: 1px solid rgba(255, 255, 255, 0.2) !important;
        flex-direction: column !important;
        gap: 0.5rem !important;
      }
      
      .btn {
        width: 100% !important;
        margin: 0.25rem 0 !important;
        padding: 0.75rem 1rem !important;
        font-size: 0.9rem !important;
        min-height: 44px !important;
      }
      
      .badge {
        font-size: 0.6rem !important;
        padding: 0.25rem 0.4rem !important;
      }
      
      .dropdown-menu {
        background: rgba(30, 60, 114, 0.98) !important;
        backdrop-filter: blur(20px) !important;
        border: 1px solid rgba(0, 255, 127, 0.2) !important;
        border-radius: 10px !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
      }
      
      .dropdown-item {
        color: white !important;
        padding: 0.75rem 1rem !important;
        border-radius: 8px !important;
        margin: 0.25rem !important;
        font-size: 0.9rem !important;
      }
      
      .dropdown-item:hover {
        background: rgba(0, 255, 127, 0.2) !important;
        color: #00ff7f !important;
      }
    }
    
    @media (min-width: 576px) and (max-width: 767.98px) {
      .navbar-brand {
        font-size: 1.2rem !important;
      }
      
      .navbar-collapse {
        background: rgba(30, 60, 114, 0.95) !important;
        backdrop-filter: blur(15px) !important;
        border-radius: 12px !important;
        margin-top: 0.5rem !important;
        padding: 1.25rem !important;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2) !important;
      }
      
      .nav-link {
        padding: 0.75rem 1.25rem !important;
        font-size: 0.95rem !important;
      }
      
      .btn {
        width: 100% !important;
        margin: 0.25rem 0 !important;
      }
    }
    
    @media (min-width: 768px) and (max-width: 991.98px) {
      .navbar-collapse {
        background: rgba(30, 60, 114, 0.9) !important;
        backdrop-filter: blur(10px) !important;
        border-radius: 10px !important;
        margin-top: 0.5rem !important;
        padding: 1rem !important;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) !important;
      }
      
      .d-flex.align-items-center {
        margin-top: 1rem !important;
        padding-top: 1rem !important;
        border-top: 1px solid rgba(255, 255, 255, 0.2) !important;
        flex-direction: row !important;
        flex-wrap: wrap !important;
        justify-content: center !important;
        gap: 0.75rem !important;
      }
      
      .btn {
        flex: 1 1 45% !important;
        max-width: 200px !important;
        margin: 0.25rem !important;
      }
    }
    
    /* Touch Device Optimizations */
    @media (hover: none) and (pointer: coarse) {
      .nav-link:hover {
        transform: none !important;
        background: rgba(0, 255, 127, 0.15) !important;
      }
      
      .nav-link:active {
        transform: scale(0.98) !important;
        background: rgba(0, 255, 127, 0.25) !important;
      }
      
      .btn:hover {
        transform: none !important;
      }
      
      .btn:active {
        transform: scale(0.98) !important;
      }
      
      .navbar-toggler:active {
        transform: scale(0.95) !important;
      }
    }
    
    /* Accessibility Improvements */
    @media (prefers-reduced-motion: reduce) {
      .nav-link,
      .btn,
      .navbar-toggler {
        transition: none !important;
      }
      
      .navbar-brand i {
        animation: none !important;
      }
    }
    
    /* Dark Mode Support */
    @media (prefers-color-scheme: dark) {
      .navbar-collapse {
        background: rgba(10, 20, 40, 0.98) !important;
        border-color: rgba(0, 255, 127, 0.3) !important;
      }
      
      .dropdown-menu {
        background: rgba(10, 20, 40, 0.98) !important;
        border-color: rgba(0, 255, 127, 0.3) !important;
      }
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() showAuthButtons: boolean = true;
  @Input() activeRoute: string = '';
  
  private destroy$ = new Subject<void>();
  isLoggedInFlag = false;
  currentUser: any = null;

  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    // Subscribe to auth state changes
    this.authService.currentUser$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(user => {
      this.currentUser = user;
      this.isLoggedInFlag = this.authService.isLoggedIn();
    });

    // Initial check
    this.isLoggedInFlag = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  isLoggedIn(): boolean {
    return this.isLoggedInFlag;
  }
  
  getCurrentUser(): any {
    return this.currentUser;
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}