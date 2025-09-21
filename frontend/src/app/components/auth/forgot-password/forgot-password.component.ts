import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="forgot-password-container">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            <div class="card shadow-lg border-0">
              <div class="card-body p-5">
                <!-- Header -->
                <div class="text-center mb-4">
                  <div class="mb-3">
                    <i class="fas fa-key text-primary" style="font-size: 3rem;"></i>
                  </div>
                  <h2 class="card-title text-primary mb-2">Forgot Password?</h2>
                  <p class="text-muted">No worries! Enter your email address and we'll send you a reset link.</p>
                </div>

                <!-- Success Message -->
                <div *ngIf="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
                  <i class="fas fa-check-circle me-2"></i>
                  {{ successMessage }}
                  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>

                <!-- Error Message -->
                <div *ngIf="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
                  <i class="fas fa-exclamation-circle me-2"></i>
                  {{ errorMessage }}
                  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>

                <!-- Forgot Password Form -->
                <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()" *ngIf="!successMessage">
                  <div class="mb-4">
                    <label for="email" class="form-label">
                      <i class="fas fa-envelope me-2 text-primary"></i>Email Address
                    </label>
                    <input
                      type="email"
                      class="form-control form-control-lg"
                      id="email"
                      formControlName="email"
                      placeholder="Enter your registered email"
                      [class.is-invalid]="forgotPasswordForm.get('email')?.invalid && forgotPasswordForm.get('email')?.touched"
                    >
                    <div *ngIf="forgotPasswordForm.get('email')?.invalid && forgotPasswordForm.get('email')?.touched" class="invalid-feedback">
                      <span *ngIf="forgotPasswordForm.get('email')?.errors?.['required']">Email is required</span>
                      <span *ngIf="forgotPasswordForm.get('email')?.errors?.['email']">Please enter a valid email address</span>
                    </div>
                  </div>

                  <div class="d-grid mb-4">
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg"
                      [disabled]="forgotPasswordForm.invalid || isLoading"
                    >
                      <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                      <i *ngIf="!isLoading" class="fas fa-paper-plane me-2"></i>
                      {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
                    </button>
                  </div>
                </form>

                <!-- Back to Login -->
                <div class="text-center">
                  <p class="mb-0">
                    Remember your password?
                    <a routerLink="/auth/login" class="text-primary text-decoration-none fw-semibold">
                      <i class="fas fa-arrow-left me-1"></i>Back to Login
                    </a>
                  </p>
                </div>

                <!-- Help Text -->
                <div class="mt-4">
                  <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    <small>
                      <strong>Security Note:</strong> For security reasons, we'll only send a reset link if an account with this email exists.
                      Check your spam folder if you don't receive the email within a few minutes.
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .forgot-password-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      padding: 2rem 0;
    }
    
    .card {
      border-radius: 15px;
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.95);
    }
    
    .form-control {
      border-radius: 10px;
      border: 2px solid #e9ecef;
      transition: all 0.3s ease;
    }
    
    .form-control:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 10px;
      padding: 12px;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }
    
    .btn-primary:disabled {
      opacity: 0.6;
      transform: none;
      box-shadow: none;
    }
    
    .alert {
      border-radius: 10px;
      border: none;
    }
    
    .alert-success {
      background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
      color: #155724;
    }
    
    .alert-danger {
      background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
      color: #721c24;
    }
    
    .alert-info {
      background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);
      color: #0c5460;
    }
    
    .text-primary {
      color: #667eea !important;
    }
    
    .spinner-border-sm {
      width: 1rem;
      height: 1rem;
    }
  `]
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const email = this.forgotPasswordForm.value.email;

      this.authService.forgotPassword(email).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = '🎉 Reset link sent! Check your email for instructions to reset your password. The link will expire in 1 hour for security.';
          this.forgotPasswordForm.reset();
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Failed to send reset link. Please try again.';
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.forgotPasswordForm.controls).forEach(key => {
      const control = this.forgotPasswordForm.get(key);
      control?.markAsTouched();
    });
  }
}
