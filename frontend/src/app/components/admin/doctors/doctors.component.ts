import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Doctor } from '../../../models/doctor.model';
import { AdminService } from '../../../services/admin.service';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-admin-doctors',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  template: `
    <div class="doctors-container">
      <div class="container">
        <!-- Header -->
        <div class="page-header mb-4">
          <div class="d-flex align-items-center mb-3">
            <button class="btn btn-outline-secondary me-3" (click)="goBack()">
              <i class="fas fa-arrow-left me-2"></i>Back to Dashboard
            </button>
            <div>
              <h1 class="mb-1">Doctor Management</h1>
              <p class="text-muted mb-0">Manage doctor registrations and approvals</p>
            </div>
          </div>
        </div>

        <!-- Filter Tabs -->
        <div class="filter-tabs mb-4">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <button class="nav-link" [class.active]="activeTab === 'pending'" 
                      (click)="setActiveTab('pending')">
                Pending Approval ({{ pendingDoctors.length }})
              </button>
            </li>
            <li class="nav-item">
              <button class="nav-link" [class.active]="activeTab === 'approved'" 
                      (click)="setActiveTab('approved')">
                Approved ({{ approvedDoctors.length }})
              </button>
            </li>
            <li class="nav-item">
              <button class="nav-link" [class.active]="activeTab === 'rejected'" 
                      (click)="setActiveTab('rejected')">
                Rejected ({{ rejectedDoctors.length }})
              </button>
            </li>
          </ul>
        </div>

        <!-- Doctors List -->
        <div class="doctors-list">
          <!-- Pending Doctors -->
          <div *ngIf="activeTab === 'pending'">
            <div class="doctor-card card mb-4" *ngFor="let doctor of pendingDoctors">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-8">
                    <div class="doctor-header d-flex align-items-center mb-3">
                      <div class="doctor-avatar me-3">
                        <i class="fas fa-user-md" style="font-size: 2.5rem; color: var(--primary-color);"></i>
                      </div>
                      <div>
                        <h4 class="doctor-name mb-1">Dr. {{ doctor.firstName }} {{ doctor.lastName }}</h4>
                        <p class="specialization text-muted mb-1">{{ doctor.specialization }}</p>
                        <p class="registration-date text-sm mb-0">
                          <i class="fas fa-calendar me-2"></i>Applied on {{ doctor.createdAt | date:'dd MMM yyyy' }}
                        </p>
                      </div>
                    </div>
                    
                    <div class="doctor-details">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="detail-item mb-2">
                            <strong>License Number:</strong> {{ doctor.licenseNumber }}
                          </div>
                          <div class="detail-item mb-2">
                            <strong>Experience:</strong> {{ doctor.experienceYears }} years
                          </div>
                          <div class="detail-item mb-2">
                            <strong>Consultation Fee:</strong> ₹{{ doctor.consultationFee }}
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="detail-item mb-2">
                            <strong>Hospital:</strong> {{ doctor.hospitalAffiliation || 'Not specified' }}
                          </div>
                          <div class="detail-item mb-2">
                            <strong>Location:</strong> {{ doctor.city || 'Not specified' }}, {{ doctor.state || 'Not specified' }}
                          </div>
                          <div class="detail-item mb-2">
                            <strong>Phone:</strong> {{ doctor.phone }}
                          </div>
                        </div>
                      </div>
                      
                      <div class="qualification-section mt-3">
                        <strong>Qualifications:</strong>
                        <p class="qualification-text">{{ doctor.qualification }}</p>
                      </div>
                      
                      <div class="about-section mt-3" *ngIf="doctor.about">
                        <strong>About:</strong>
                        <p class="about-text">{{ doctor.about }}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="col-md-4">
                    <div class="action-panel">
                      <div class="status-badge mb-3">
                        <span class="badge badge-warning">Pending Approval</span>
                      </div>
                      
                      <div class="action-buttons d-grid gap-2">
                        <button class="btn btn-success" (click)="approveDoctor(doctor)">
                          <i class="fas fa-check me-2"></i>Approve Doctor
                        </button>
                        <button class="btn btn-danger" (click)="rejectDoctor(doctor)">
                          <i class="fas fa-times me-2"></i>Reject Application
                        </button>
                        <button class="btn btn-outline-primary" (click)="viewDetails(doctor)">
                          <i class="fas fa-eye me-2"></i>View Full Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Approved Doctors -->
          <div *ngIf="activeTab === 'approved'">
            <div class="doctor-card card mb-3" *ngFor="let doctor of approvedDoctors">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-md-2">
                    <div class="doctor-avatar text-center">
                      <i class="fas fa-user-md" style="font-size: 2rem; color: var(--success-color);"></i>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="doctor-info">
                      <h5 class="doctor-name mb-1">Dr. {{ doctor.firstName }} {{ doctor.lastName }}</h5>
                      <p class="specialization text-muted mb-1">{{ doctor.specialization }}</p>
                      <p class="hospital text-sm mb-1">
                        <i class="fas fa-hospital me-2"></i>{{ doctor.hospitalAffiliation || 'Not specified' }}
                      </p>
                      <p class="location text-sm mb-0">
                        <i class="fas fa-map-marker-alt me-2"></i>{{ doctor.city || 'Not specified' }}, {{ doctor.state || 'Not specified' }}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="approval-info text-center">
                      <span class="badge badge-success mb-1">Approved</span>
                      <p class="text-sm mb-0">{{ doctor.approvalDate | date:'dd MMM yyyy' }}</p>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="action-buttons d-grid gap-1">
                      <button class="btn btn-sm btn-outline-primary" (click)="viewDetails(doctor)">
                        View Details
                      </button>
                      <button class="btn btn-sm btn-outline-warning" (click)="suspendDoctor(doctor)">
                        Suspend
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Rejected Doctors -->
          <div *ngIf="activeTab === 'rejected'">
            <div class="doctor-card card mb-3" *ngFor="let doctor of rejectedDoctors">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-md-2">
                    <div class="doctor-avatar text-center">
                      <i class="fas fa-user-md" style="font-size: 2rem; color: var(--danger-color);"></i>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="doctor-info">
                      <h5 class="doctor-name mb-1">Dr. {{ doctor.name }}</h5>
                      <p class="specialization text-muted mb-1">{{ doctor.specialization }}</p>
                      <p class="rejection-reason text-sm mb-1">
                        <i class="fas fa-exclamation-circle me-2"></i>{{ doctor.rejectionReason }}
                      </p>
                      <p class="location text-sm mb-0">
                        <i class="fas fa-map-marker-alt me-2"></i>{{ doctor.city }}, {{ doctor.state }}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="rejection-info text-center">
                      <span class="badge badge-danger mb-1">Rejected</span>
                      <p class="text-sm mb-0">{{ doctor.rejectionDate }}</p>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="action-buttons d-grid gap-1">
                      <button class="btn btn-sm btn-outline-primary" (click)="viewDetails(doctor)">
                        View Details
                      </button>
                      <button class="btn btn-sm btn-outline-success" (click)="reconsiderDoctor(doctor)">
                        Reconsider
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div *ngIf="getCurrentDoctors().length === 0" class="empty-state text-center py-5">
            <i class="fas fa-user-md text-muted" style="font-size: 4rem; margin-bottom: 1rem;"></i>
            <h4>No {{ activeTab }} doctors</h4>
            <p class="text-muted">{{ getEmptyStateMessage() }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <app-footer></app-footer>
  `,
  styles: [`
    .doctors-container {
      padding: 2rem 0;
      min-height: calc(100vh - 8rem);
    }
    
    .nav-pills .nav-link {
      color: var(--text-secondary);
      background: transparent;
      border: 1px solid var(--border-color);
      margin-right: 0.5rem;
    }
    
    .nav-pills .nav-link.active {
      background: var(--primary-color);
      border-color: var(--primary-color);
    }
    
    .doctor-card {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      border: none;
      box-shadow: var(--shadow-sm);
    }
    
    .doctor-card:hover {
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }
    
    .doctor-avatar {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    
    .doctor-name {
      color: var(--text-primary);
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
    
    .badge-danger {
      background-color: var(--danger-color);
      color: white;
    }
    
    .action-panel {
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: var(--radius-md);
      height: 100%;
    }
    
    .detail-item {
      font-size: 0.875rem;
    }
    
    .qualification-text, .about-text {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-top: 0.5rem;
    }
    
    @media (max-width: 768px) {
      .doctor-card .row > div {
        margin-bottom: 1rem;
      }
      
      .action-panel {
        margin-top: 1rem;
      }
    }
  `]
})
export class DoctorsComponent implements OnInit {
  activeTab = 'pending';
  pendingDoctors: Doctor[] = [];
  approvedDoctors: Doctor[] = [];
  rejectedDoctors: any[] = [];

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    // Load pending doctors from API
    this.adminService.getPendingDoctors().subscribe({
      next: (doctors) => {
        this.pendingDoctors = doctors;
        console.log('Loaded pending doctors:', doctors);
      },
      error: (error) => {
        console.error('Error loading pending doctors:', error);
        this.pendingDoctors = [];
      }
    });

    // Load approved doctors from API
    this.adminService.getApprovedDoctors().subscribe({
      next: (doctors) => {
        this.approvedDoctors = doctors;
        console.log('Loaded approved doctors:', doctors);
      },
      error: (error) => {
        console.error('Error loading approved doctors:', error);
        this.approvedDoctors = [];
      }
    });

    // Mock rejected doctors (no API endpoint for this yet)
    this.rejectedDoctors = [];
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getCurrentDoctors(): any[] {
    switch (this.activeTab) {
      case 'pending':
        return this.pendingDoctors;
      case 'approved':
        return this.approvedDoctors;
      case 'rejected':
        return this.rejectedDoctors;
      default:
        return [];
    }
  }

  getEmptyStateMessage(): string {
    switch (this.activeTab) {
      case 'pending':
        return 'No doctors pending approval.';
      case 'approved':
        return 'No approved doctors yet.';
      case 'rejected':
        return 'No rejected applications.';
      default:
        return '';
    }
  }

  approveDoctor(doctor: Doctor): void {
    const doctorName = doctor.firstName + ' ' + doctor.lastName;
    if (confirm(`Are you sure you want to approve Dr. ${doctorName}?`)) {
      this.adminService.approveDoctor(doctor.id).subscribe({
        next: (response) => {
          // Remove from pending list
          this.pendingDoctors = this.pendingDoctors.filter(d => d.id !== doctor.id);
          // Add to approved list
          this.approvedDoctors.unshift({
            ...doctor,
            isApproved: true,
            approvalDate: new Date().toISOString()
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
          this.pendingDoctors = this.pendingDoctors.filter(d => d.id !== doctor.id);
          // Add to rejected list
          this.rejectedDoctors.unshift({
            ...doctor,
            rejectionReason: reason,
            rejectionDate: new Date().toLocaleDateString()
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

  suspendDoctor(doctor: any): void {
    const reason = prompt(`Please provide a reason for suspending Dr. ${doctor.name}:`);
    if (reason) {
      alert(`Dr. ${doctor.name} has been suspended. Reason: ${reason}`);
    }
  }

  reconsiderDoctor(doctor: any): void {
    if (confirm(`Are you sure you want to reconsider Dr. ${doctor.name}'s application?`)) {
      // Move from rejected to pending
      this.rejectedDoctors = this.rejectedDoctors.filter(d => d.id !== doctor.id);
      this.pendingDoctors.push({
        ...doctor,
        registrationDate: new Date().toLocaleDateString()
      });
      alert(`Dr. ${doctor.name}'s application has been moved back to pending.`);
    }
  }

  viewDetails(doctor: any): void {
    let details = `Doctor Details:\n\n`;
    details += `Name: Dr. ${doctor.name}\n`;
    details += `Specialization: ${doctor.specialization}\n`;
    if (doctor.licenseNumber) details += `License: ${doctor.licenseNumber}\n`;
    if (doctor.experience) details += `Experience: ${doctor.experience} years\n`;
    if (doctor.hospital) details += `Hospital: ${doctor.hospital}\n`;
    if (doctor.city) details += `Location: ${doctor.city}, ${doctor.state}\n`;
    if (doctor.phone) details += `Phone: ${doctor.phone}\n`;
    if (doctor.qualification) details += `Qualification: ${doctor.qualification}\n`;
    if (doctor.about) details += `About: ${doctor.about}`;
    
    alert(details);
  }

  goBack(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
