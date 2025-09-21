import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-oauth2-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="callback-container" style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 50%, #f7fafc 100%);
    ">
      <div class="text-center">
        <div class="spinner-border text-primary mb-3" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <h4 class="text-muted">Processing your login...</h4>
        <p class="text-muted">Please wait while we complete your authentication.</p>
        
        <div *ngIf="errorMessage" class="alert alert-danger mt-3">
          {{ errorMessage }}
          <div class="mt-2">
            <button class="btn btn-primary" (click)="redirectToLogin()">
              Return to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .spinner-border {
      width: 3rem;
      height: 3rem;
    }
    
    .callback-container {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
  `]
})
export class OAuth2CallbackComponent implements OnInit {
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const userId = params['userId'];
      const email = params['email'];
      const firstName = params['firstName'];
      const lastName = params['lastName'];
      const role = params['role'];
      const profileImage = params['profileImage'];

      if (token && userId && email && firstName && lastName && role) {
        const userData = {
          id: userId,
          email: email,
          firstName: firstName,
          lastName: lastName,
          role: role,
          profileImage: profileImage,
          profileImageUrl: profileImage // Add compatibility field for dashboard
        };

        // Handle the OAuth2 callback
        this.authService.handleOAuth2Callback(token, userData);

        // Redirect based on role
        setTimeout(() => {
          switch (role) {
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
        }, 1000);
      } else {
        this.errorMessage = 'Authentication failed. Missing required parameters.';
        setTimeout(() => {
          this.redirectToLogin();
        }, 3000);
      }
    });
  }

  redirectToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
