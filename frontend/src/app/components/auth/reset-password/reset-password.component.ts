import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="reset-password-container">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            <div class="card shadow-lg border-0">
              <div class="card-body p-5">
                <!-- Header -->
                <div class="text-center mb-4">
                  <div class="mb-3">
                    <i class="fas fa-shield-alt text-primary" style="font-size: 3rem;"></i>
                  </div>
                  <h2 class="card-title text-primary mb-2">Reset Your Password</h2>
                  <p class="text-muted">Enter your new password below to complete the reset process.</p>
                </div>

                <!-- Invalid Token Message -->
                <div *ngIf="invalidToken" class="alert alert-danger">
                  <i class="fas fa-exclamation-triangle me-2"></i>
                  <strong>Invalid or Expired Link</strong><br>
                  This password reset link is invalid or has expired. Please request a new one.
                  <div class="mt-3">
                    <a routerLink="/auth/forgot-password" class="btn btn-outline-danger btn-sm">
                      <i class="fas fa-redo me-1"></i>Request New Reset Link
                    </a>
                  </div>
                </div>

                <!-- Success Message -->
                <div *ngIf="successMessage" class="alert alert-success">
                  <i class="fas fa-check-circle me-2"></i>
                  <strong>Password Reset Successful!</strong><br>
                  {{ successMessage }}
                  <div class="mt-3">
                    <a routerLink="/auth/login" class="btn btn-success btn-sm">
                      <i class="fas fa-sign-in-alt me-1"></i>Go to Login
                    </a>
                  </div>
                </div>

                <!-- Error Message -->
                <div *ngIf="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
                  <i class="fas fa-exclamation-circle me-2"></i>
                  {{ errorMessage }}
                  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>

                <!-- Reset Password Form -->
                <form [formGroup]="resetPasswordForm" (ngSubmit)="onSubmit()" *ngIf="!invalidToken && !successMessage">
                  <div class="mb-4">
                    <label for="newPassword" class="form-label">
                      <i class="fas fa-lock me-2 text-primary"></i>New Password
                    </label>
                    <div class="input-group">
                      <input
                        [type]="showPassword ? 'text' : 'password'"
                        class="form-control form-control-lg"
                        id="newPassword"
                        formControlName="newPassword"
                        placeholder="Enter your new password"
                        [class.is-invalid]="resetPasswordForm.get('newPassword')?.invalid && resetPasswordForm.get('newPassword')?.touched"
                      >
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        (click)="togglePasswordVisibility()"
                      >
                        <i class="fas" [class.fa-eye]="!showPassword" [class.fa-eye-slash]="showPassword"></i>
                      </button>
                    </div>
                    <div *ngIf="resetPasswordForm.get('newPassword')?.invalid && resetPasswordForm.get('newPassword')?.touched" class="invalid-feedback">
                      <span *ngIf="resetPasswordForm.get('newPassword')?.errors?.['required']">Password is required</span>
                      <span *ngIf="resetPasswordForm.get('newPassword')?.errors?.['minlength']">Password must be at least 6 characters long</span>
                    </div>
                  </div>

                  <div class="mb-4">
                    <label for="confirmPassword" class="form-label">
                      <i class="fas fa-lock me-2 text-primary"></i>Confirm New Password
                    </label>
                    <input
                      type="password"
                      class="form-control form-control-lg"
                      id="confirmPassword"
                      formControlName="confirmPassword"
                      placeholder="Confirm your new password"
                      [class.is-invalid]="resetPasswordForm.get('confirmPassword')?.invalid && resetPasswordForm.get('confirmPassword')?.touched"
                    >
                    <div *ngIf="resetPasswordForm.get('confirmPassword')?.invalid && resetPasswordForm.get('confirmPassword')?.touched" class="invalid-feedback">
                      <span *ngIf="resetPasswordForm.get('confirmPassword')?.errors?.['required']">Please confirm your password</span>
                      <span *ngIf="resetPasswordForm.get('confirmPassword')?.errors?.['passwordMismatch']">Passwords do not match</span>
                    </div>
                  </div>

                  <!-- Password Strength Indicator -->
                  <div class="mb-4" *ngIf="resetPasswordForm.get('newPassword')?.value">
                    <small class="text-muted">Password Strength:</small>
                    <div class="progress" style="height: 5px;">
                      <div class="progress-bar" 
                           [class.bg-danger]="getPasswordStrength() < 3"
                           [class.bg-warning]="getPasswordStrength() === 3"
                           [class.bg-success]="getPasswordStrength() > 3"
                           [style.width.%]="getPasswordStrength() * 25">
                      </div>
                    </div>
                    <small class="text-muted">
                      <span [class.text-danger]="getPasswordStrength() < 3"
                            [class.text-warning]="getPasswordStrength() === 3"
                            [class.text-success]="getPasswordStrength() > 3">
                        {{ getPasswordStrengthText() }}
                      </span>
                    </small>
                  </div>

                  <div class="d-grid mb-4">
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg"
                      [disabled]="resetPasswordForm.invalid || isLoading"
                    >
                      <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                      <i *ngIf="!isLoading" class="fas fa-save me-2"></i>
                      {{ isLoading ? 'Updating...' : 'Update Password' }}
                    </button>
                  </div>
                </form>

                <!-- Back to Login -->
                <div class="text-center" *ngIf="!successMessage && !invalidToken">
                  <p class="mb-0">
                    Remember your password?
                    <a routerLink="/auth/login" class="text-primary text-decoration-none fw-semibold">
                      <i class="fas fa-arrow-left me-1"></i>Back to Login
                    </a>
                  </p>
                </div>

                <!-- Security Tips -->
                <div class="mt-4" *ngIf="!successMessage && !invalidToken">
                  <div class="alert alert-info">
                    <i class="fas fa-shield-alt me-2"></i>
                    <small>
                      <strong>Security Tips:</strong>
                      <ul class="mb-0 mt-2">
                        <li>Use a combination of letters, numbers, and symbols</li>
                        <li>Make it at least 8 characters long</li>
                        <li>Avoid using personal information</li>
                      </ul>
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
    .reset-password-container {
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
    
    .progress {
      border-radius: 10px;
    }
    
    .progress-bar {
      border-radius: 10px;
      transition: all 0.3s ease;
    }
  `]
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  invalidToken = false;
  showPassword = false;
  resetToken = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('=== RESET PASSWORD COMPONENT INITIALIZED ===');
    console.log('Current URL:', window.location.href);
    console.log('Current path:', window.location.pathname);
    console.log('Current search:', window.location.search);
    console.log('Full location object:', window.location);
    
    // Get token from URL parameters
    this.route.queryParams.subscribe(params => {
      console.log('Reset password component - Query params:', params);
      this.resetToken = params['token'];
      console.log('Reset password component - Token extracted:', this.resetToken);
      
      if (!this.resetToken) {
        console.log('Reset password component - No token found, marking as invalid');
        this.invalidToken = true;
      } else {
        console.log('Reset password component - Token found, form will be shown');
        console.log('Token length:', this.resetToken.length);
        console.log('Token preview:', this.resetToken.substring(0, 50) + '...');
      }
    });
    
    // Also check if we can access the route data
    this.route.data.subscribe(data => {
      console.log('Reset password component - Route data:', data);
    });
    
    // Check if the component is being loaded at all
    console.log('Reset password component - Component loaded successfully');

    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  getPasswordStrength(): number {
    const password = this.resetPasswordForm.get('newPassword')?.value || '';
    let strength = 0;
    
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    return Math.min(strength, 4);
  }

  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    switch (strength) {
      case 0:
      case 1: return 'Very Weak';
      case 2: return 'Weak';
      case 3: return 'Medium';
      case 4: return 'Strong';
      default: return 'Very Strong';
    }
  }

  onSubmit(): void {
    console.log('Reset password form submitted');
    console.log('Form valid:', this.resetPasswordForm.valid);
    console.log('Reset token:', this.resetToken);
    
    if (this.resetPasswordForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const newPassword = this.resetPasswordForm.value.newPassword;
      console.log('Sending reset password request with token:', this.resetToken);

      this.authService.resetPassword(this.resetToken, newPassword).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = 'Your password has been successfully updated. You can now login with your new password.';
          this.resetPasswordForm.reset();
        },
        error: (error) => {
          this.isLoading = false;
          if (error.error?.error?.includes('Invalid or expired')) {
            this.invalidToken = true;
          } else {
            this.errorMessage = error.error?.error || 'Failed to reset password. Please try again.';
          }
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.resetPasswordForm.controls).forEach(key => {
      const control = this.resetPasswordForm.get(key);
      control?.markAsTouched();
    });
  }
}
