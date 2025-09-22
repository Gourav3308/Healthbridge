import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FooterComponent, HeaderComponent],
  template: `
    <!-- Dynamic 3D Header -->
    <app-header></app-header>

    <!-- Professional 3D Login Container -->
    <div class="auth-container" style="
      min-height: calc(100vh - 8rem); 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      padding: 6rem 0 2rem 0; 
      margin-top: 70px;
      background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 50%, #f7fafc 100%);
      position: relative;
      overflow: hidden;
    ">
      <!-- Animated Background Elements -->
      <div class="auth-bg-animation" style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
          radial-gradient(circle at 20% 30%, rgba(0, 255, 127, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(30, 144, 255, 0.08) 0%, transparent 50%);
        animation: authBackgroundPulse 8s ease-in-out infinite;
      "></div>
      
      <div class="container position-relative" style="z-index: 10;">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            <div class="auth-card dashboard-card animate-scale-in" style="
              background: linear-gradient(145deg, #ffffff, #f8fafc);
              box-shadow: 
                0 25px 50px rgba(0, 0, 0, 0.15),
                0 15px 35px rgba(30, 60, 114, 0.1);
              border: 2px solid rgba(0, 255, 127, 0.1);
              border-radius: 2rem;
              overflow: hidden;
              transform: translateZ(0);
              position: relative;
            ">
              <!-- Card Top Gradient -->
              <div style="
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 6px;
                background: linear-gradient(90deg, #00ff7f, #1e90ff, #8a2be2, #00ff7f);
                background-size: 200% 100%;
                animation: cardTopGradient 4s ease-in-out infinite;
              "></div>
              
              <div class="card-body" style="padding: 3.5rem;">
                <div class="text-center mb-5">
                  <!-- Professional Logo/Icon -->
                  <div class="auth-logo animate-pulse-glow" style="
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, #1e3c72, #2a5298);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                    box-shadow: 0 15px 35px rgba(30, 60, 114, 0.3);
                    transform: translateZ(10px);
                  ">
                    <i class="fas fa-heartbeat" style="
                      font-size: 2rem; 
                      color: #00ff7f;
                      filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));
                      animation: heartbeatPulse 2s ease-in-out infinite;
                    "></i>
                  </div>
                  
                  <h2 class="auth-title" style="
                    background: linear-gradient(135deg, #1e3c72, #00ff7f, #1e90ff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    font-size: 2.2rem;
                    font-weight: 800;
                    margin-bottom: 0.5rem;
                    letter-spacing: 1px;
                  ">Welcome Back</h2>
                  <p class="text-muted" style="font-size: 1.1rem; font-weight: 500;">Sign in to your HealthBridge account</p>
                </div>

                <div *ngIf="errorMessage" class="alert alert-danger">
                  {{ errorMessage }}
                </div>

                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                  <div class="form-group">
                    <label class="form-label">Email Address</label>
                    <input 
                      type="email" 
                      class="form-control"
                      [class.is-invalid]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
                      formControlName="email"
                      placeholder="Enter your email">
                    <div class="invalid-feedback" *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
                      <div *ngIf="loginForm.get('email')?.errors?.['required']">Email is required</div>
                      <div *ngIf="loginForm.get('email')?.errors?.['email']">Please enter a valid email</div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Password</label>
                    <input 
                      type="password" 
                      class="form-control"
                      [class.is-invalid]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
                      formControlName="password"
                      placeholder="Enter your password">
                    <div class="invalid-feedback" *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
                      <div *ngIf="loginForm.get('password')?.errors?.['required']">Password is required</div>
                      <div *ngIf="loginForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    class="btn btn-primary w-100 btn-lg"
                    [disabled]="loginForm.invalid || isLoading">
                    <span *ngIf="isLoading" class="loading-spinner me-2"></span>
                    {{ isLoading ? 'Signing in...' : 'Sign In' }}
                  </button>

                  <!-- OAuth2 Divider -->
                  <div class="oauth-divider my-4">
                    <div class="divider-line"></div>
                    <span class="divider-text">or</span>
                    <div class="divider-line"></div>
                  </div>

                  <!-- Google OAuth2 Button -->
                  <button 
                    type="button" 
                    class="btn btn-google w-100 btn-lg"
                    (click)="loginWithGoogle()"
                    [disabled]="isLoading">
                    <i class="fab fa-google me-2"></i>
                    Continue with Google
                  </button>
                </form>

                <div class="auth-footer text-center mt-4">
                  <p class="text-muted mb-2">
                    <a routerLink="/auth/forgot-password" class="text-primary text-decoration-none">
                      <i class="fas fa-key me-1"></i>Forgot Password?
                    </a>
                  </p>
                  <p class="text-muted">
                    Don't have an account? 
                    <a routerLink="/auth/register" class="text-primary">Register here</a>
                  </p>
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
    .nav-hover {
      transition: all 0.3s ease;
    }
    
    .nav-hover:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }
    
    .active-page {
      background: rgba(255, 255, 255, 0.15) !important;
    }
    
    .navbar-toggler:focus {
      box-shadow: none;
    }
    
    /* Professional 3D Login Animations */
    @keyframes authBackgroundPulse {
      0%, 100% { 
        opacity: 0.8; 
        transform: scale(1) rotate(0deg);
      }
      50% { 
        opacity: 1; 
        transform: scale(1.02) rotate(1deg);
      }
    }
    
    @keyframes heartbeatPulse {
      0%, 100% { 
        transform: scale(1); 
        filter: brightness(1);
      }
      50% { 
        transform: scale(1.1); 
        filter: brightness(1.2);
      }
    }
    
    .auth-card:hover {
      transform: translateY(-5px) scale(1.01);
      box-shadow: 
        0 35px 70px rgba(0, 0, 0, 0.2),
        0 20px 40px rgba(30, 60, 114, 0.15) !important;
    }
    
    .form-control {
      height: 3.5rem;
      font-size: 1rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .form-control:focus {
      transform: translateY(-2px) !important;
      box-shadow: 
        0 0 0 4px rgba(30, 144, 255, 0.1),
        0 8px 25px rgba(30, 144, 255, 0.15),
        inset 0 2px 4px rgba(0, 0, 0, 0.06) !important;
    }
    
    .btn-lg {
      height: 3.5rem;
      font-weight: 700;
      font-size: 1.1rem;
      letter-spacing: 0.5px;
    }
    
    .btn-primary:hover {
      transform: translateY(-3px) scale(1.02) !important;
      box-shadow: 
        0 15px 35px rgba(30, 60, 114, 0.4),
        0 8px 20px rgba(0, 255, 127, 0.3) !important;
    }
    
    .auth-logo:hover {
      transform: translateZ(15px) rotateY(10deg) scale(1.1);
      animation-duration: 1s;
    }
    
    .demo-credentials {
      border-left: 4px solid var(--medical-green);
      background: linear-gradient(145deg, rgba(0, 255, 127, 0.05), rgba(30, 144, 255, 0.03));
    }
    
    /* OAuth2 Styles */
    .oauth-divider {
      display: flex;
      align-items: center;
      text-align: center;
    }
    
    .divider-line {
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, transparent, #ddd, transparent);
    }
    
    .divider-text {
      padding: 0 1rem;
      color: #666;
      font-weight: 500;
      font-size: 0.9rem;
    }
    
    .btn-google {
      background: #fff;
      border: 2px solid #ddd;
      color: #333;
      font-weight: 600;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .btn-google:hover {
      background: #f8f9fa;
      border-color: #4285f4;
      color: #4285f4;
      transform: translateY(-2px) scale(1.02);
      box-shadow: 
        0 8px 25px rgba(66, 133, 244, 0.15),
        0 4px 15px rgba(0, 0, 0, 0.1);
    }
    
    .btn-google:active {
      transform: translateY(0) scale(0.98);
    }
    
    .btn-google i {
      color: #4285f4;
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  returnUrl = '';
  bookingAction = false;
  doctorId = 0;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Get query parameters for redirect after login
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '';
      this.bookingAction = params['action'] === 'book';
      this.doctorId = +params['doctorId'] || 0;
      
      // Handle OAuth error parameters
      if (params['error'] === 'oauth_failed') {
        this.errorMessage = 'Google login failed. Please try again or use email/password login.';
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          const user = this.authService.getCurrentUser();
          
          // Handle redirect after login
          if (this.bookingAction && this.doctorId && user.role === 'PATIENT') {
            // Redirect to appointment booking
            this.router.navigate(['/patient/book-appointment'], { 
              queryParams: { doctorId: this.doctorId }
            });
          } else if (this.returnUrl) {
            // Redirect to the original URL
            this.router.navigateByUrl(this.returnUrl);
          } else {
            // Default redirect based on role
            switch (user.role) {
              case 'ADMIN':
                this.router.navigate(['/admin/dashboard']);
                break;
              case 'DOCTOR':
                this.router.navigate(['/doctor/dashboard']);
                break;
              case 'PATIENT':
                this.router.navigate(['/patient/dashboard']);
                break;
              default:
                this.router.navigate(['/']);
            }
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
        }
      });
    }
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }
}
