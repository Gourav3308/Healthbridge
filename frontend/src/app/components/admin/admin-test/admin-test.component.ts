import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-test',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          <h3>Admin Authentication Test</h3>
        </div>
        <div class="card-body">
          <!-- Current User Info -->
          <div class="mb-4">
            <h5>Current Authentication Status:</h5>
            <div class="alert" [class]="isLoggedIn ? 'alert-success' : 'alert-warning'">
              <strong>Logged In:</strong> {{ isLoggedIn ? 'Yes' : 'No' }}<br>
              <strong>User Role:</strong> {{ currentUser?.role || 'None' }}<br>
              <strong>User Email:</strong> {{ currentUser?.email || 'None' }}<br>
              <strong>Token:</strong> {{ token ? 'Present' : 'Missing' }}
            </div>
          </div>

          <!-- Test Buttons -->
          <div class="mb-4">
            <h5>Test API Endpoints:</h5>
            <button class="btn btn-primary me-2" (click)="testDoctorsAPI()">Test Doctors API</button>
            <button class="btn btn-primary me-2" (click)="testPatientsAPI()">Test Patients API</button>
            <button class="btn btn-warning me-2" (click)="refreshAuth()">Refresh Auth</button>
            <a href="/auth/login" class="btn btn-info">Login Page</a>
          </div>

          <!-- API Test Results -->
          <div class="mb-4" *ngIf="apiResults">
            <h5>API Test Results:</h5>
            <pre class="bg-light p-3 border rounded">{{ apiResults }}</pre>
          </div>

          <!-- Debug Info -->
          <div class="mb-4">
            <h5>Debug Information:</h5>
            <ul class="list-group">
              <li class="list-group-item">
                <strong>LocalStorage Token:</strong> 
                <span class="text-muted">{{ token ? 'Token exists (' + token.substring(0, 20) + '...)' : 'No token found' }}</span>
              </li>
              <li class="list-group-item">
                <strong>Current User Data:</strong> 
                <span class="text-muted">{{ currentUser ? getUserDataString() : 'No user data' }}</span>
              </li>
              <li class="list-group-item">
                <strong>Auth Service Status:</strong> 
                <span class="text-muted">{{ isLoggedIn ? 'Authenticated' : 'Not authenticated' }}</span>
              </li>
            </ul>
          </div>

          <!-- Quick Admin Login -->
          <div class="alert alert-info">
            <h6>Quick Admin Login:</h6>
            <p class="mb-2">Use these credentials to login as admin:</p>
            <ul class="mb-0">
              <li><strong>Email:</strong> adminhealth@gmail.com</li>
              <li><strong>Password:</strong> admin123</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    pre {
      max-height: 300px;
      overflow-y: auto;
    }
  `]
})
export class AdminTestComponent implements OnInit {
  isLoggedIn = false;
  currentUser: any = null;
  token: string | null = null;
  apiResults: string = '';

  constructor(
    private authService: AuthService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.refreshAuth();
  }

  refreshAuth(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUser();
    this.token = this.authService.getToken();
  }

  getUserDataString(): string {
    return JSON.stringify(this.currentUser);
  }

  testDoctorsAPI(): void {
    this.apiResults = 'Testing doctors API...';
    this.adminService.getAllDoctors().subscribe({
      next: (doctors) => {
        this.apiResults = `✅ Success! Found ${doctors.length} doctors:\n` + JSON.stringify(doctors, null, 2);
      },
      error: (error) => {
        this.apiResults = `❌ Error: ${error.status} - ${error.message}\n` + JSON.stringify(error, null, 2);
      }
    });
  }

  testPatientsAPI(): void {
    this.apiResults = 'Testing patients API...';
    this.adminService.getAllPatients().subscribe({
      next: (patients) => {
        this.apiResults = `✅ Success! Found ${patients.length} patients:\n` + JSON.stringify(patients, null, 2);
      },
      error: (error) => {
        this.apiResults = `❌ Error: ${error.status} - ${error.message}\n` + JSON.stringify(error, null, 2);
      }
    });
  }
}
