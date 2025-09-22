import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Patient } from '../../../models/patient.model';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { ImageService } from '../../../services/image.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-manage-patients',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, FooterComponent, HeaderComponent],
  template: `
    <!-- Dynamic 3D Header -->
    <app-header></app-header>

    <div class="admin-container" style="margin-top: 70px; padding: 2rem 0; min-height: calc(100vh - 8rem);">
      <div class="container">
        <!-- Page Header -->
        <div class="page-header d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 class="mb-1">Manage Patients</h1>
            <p class="text-muted">View, edit, delete, and manage patient accounts</p>
          </div>
          <div class="header-actions">
            <a routerLink="/admin/dashboard" class="btn btn-outline-secondary me-2">
              <i class="fas fa-home me-2"></i>Dashboard
            </a>
            <button class="btn btn-success" (click)="refreshPatients()">
              <i class="fas fa-sync-alt me-2"></i>Refresh
            </button>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
          <div class="stat-card card">
            <div class="card-body text-center">
              <i class="fas fa-users" style="font-size: 2rem; color: var(--primary-color); margin-bottom: 0.5rem;"></i>
              <h4 class="mb-1">{{ totalPatients }}</h4>
              <small class="text-muted">Total Patients</small>
            </div>
          </div>
          <div class="stat-card card">
            <div class="card-body text-center">
              <i class="fas fa-toggle-on" style="font-size: 2rem; color: var(--success-color); margin-bottom: 0.5rem;"></i>
              <h4 class="mb-1">{{ activePatients }}</h4>
              <small class="text-muted">Active</small>
            </div>
          </div>
          <div class="stat-card card">
            <div class="card-body text-center">
              <i class="fas fa-toggle-off" style="font-size: 2rem; color: var(--secondary-color); margin-bottom: 0.5rem;"></i>
              <h4 class="mb-1">{{ inactivePatients }}</h4>
              <small class="text-muted">Inactive</small>
            </div>
          </div>
          <div class="stat-card card">
            <div class="card-body text-center">
              <i class="fas fa-calendar-check" style="font-size: 2rem; color: var(--info-color); margin-bottom: 0.5rem;"></i>
              <h4 class="mb-1">{{ recentRegistrations }}</h4>
              <small class="text-muted">This Month</small>
            </div>
          </div>
        </div>

        <!-- Search and Filter -->
        <div class="search-section card mb-4">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">Search Patients</label>
                  <input type="text" class="form-control" [(ngModel)]="searchTerm" 
                         (input)="filterPatients()" placeholder="Search by name, email, phone...">
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label class="form-label">Filter by Status</label>
                  <select class="form-control" [(ngModel)]="statusFilter" (change)="filterPatients()">
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label class="form-label">Filter by Blood Group</label>
                  <select class="form-control" [(ngModel)]="bloodGroupFilter" (change)="filterPatients()">
                    <option value="">All Blood Groups</option>
                    <option *ngFor="let bg of bloodGroups" [value]="bg">{{ bg }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Patients Table -->
        <div class="patients-table card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Patients List ({{ filteredPatients.length }})</h5>
            <div class="table-actions">
              <button class="btn btn-sm btn-outline-primary me-2" (click)="exportPatients()">
                <i class="fas fa-download me-1"></i>Export
              </button>
            </div>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead class="table-light">
                  <tr>
                    <th>Patient</th>
                    <th>Contact</th>
                    <th>Age/Gender</th>
                    <th>Blood Group</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Registered</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let patient of paginatedPatients">
                    <td>
                      <div class="d-flex align-items-center">
                        <img [src]="getPatientImageUrl(patient)" alt="Patient" 
                             class="rounded-circle me-3" style="width: 40px; height: 40px; object-fit: cover;">
                        <div>
                          <div class="fw-semibold">{{ patient.firstName }} {{ patient.lastName }}</div>
                          <small class="text-muted">ID: {{ patient.id }}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>{{ patient.email }}</div>
                      <small class="text-muted">{{ patient.phone }}</small>
                    </td>
                    <td>
                      <div>{{ calculateAge(patient.dateOfBirth) }} years</div>
                      <small class="text-muted">{{ patient.gender }}</small>
                    </td>
                    <td>
                      <span class="badge bg-danger">{{ patient.bloodGroup || 'N/A' }}</span>
                    </td>
                    <td>
                      <div>{{ patient.city || 'N/A' }}</div>
                      <small class="text-muted">{{ patient.state || 'N/A' }}</small>
                    </td>
                    <td>
                      <span class="badge" [class]="patient.isActive ? 'bg-success' : 'bg-secondary'">
                        {{ patient.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                    <td>
                      <small class="text-muted">{{ formatDate(patient.createdAt) }}</small>
                    </td>
                    <td>
                      <div class="btn-group btn-group-sm" role="group">
                        <button class="btn btn-outline-info" (click)="viewPatient(patient)" title="View Details">
                          <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-outline-primary" (click)="editPatient(patient)" title="Edit">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn" 
                                [class]="patient.isActive ? 'btn-outline-warning' : 'btn-outline-success'"
                                (click)="togglePatientStatus(patient)" 
                                [title]="patient.isActive ? 'Deactivate' : 'Activate'">
                          <i class="fas" [class]="patient.isActive ? 'fa-pause' : 'fa-play'"></i>
                        </button>
                        <button class="btn btn-outline-danger" (click)="deletePatient(patient)" title="Delete">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- No Results -->
            <div *ngIf="filteredPatients.length === 0 && !isLoading" class="text-center py-5">
              <i class="fas fa-search text-muted" style="font-size: 3rem; margin-bottom: 1rem;"></i>
              <h5>No patients found</h5>
              <p class="text-muted">Try adjusting your search criteria or make sure you're logged in as an admin</p>
              <div class="mt-3">
                <button class="btn btn-primary me-2" (click)="refreshPatients()">
                  <i class="fas fa-sync-alt me-2"></i>Refresh Data
                </button>
                <a href="/auth/login" class="btn btn-outline-secondary">
                  <i class="fas fa-sign-in-alt me-2"></i>Login as Admin
                </a>
              </div>
            </div>
            
            <!-- Loading State -->
            <div *ngIf="isLoading" class="text-center py-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-3">Loading patients...</p>
            </div>
          </div>
          
          <!-- Pagination -->
          <div class="card-footer" *ngIf="filteredPatients.length > pageSize">
            <nav>
              <ul class="pagination justify-content-center mb-0">
                <li class="page-item" [class.disabled]="currentPage === 1">
                  <a class="page-link" (click)="changePage(currentPage - 1)">Previous</a>
                </li>
                <li class="page-item" *ngFor="let page of getPageNumbers()" [class.active]="page === currentPage">
                  <a class="page-link" (click)="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" [class.disabled]="currentPage === totalPages">
                  <a class="page-link" (click)="changePage(currentPage + 1)">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Patient Modal -->
    <div class="modal fade" id="editPatientModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Patient</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form [formGroup]="editForm" (ngSubmit)="updatePatient()">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group mb-3">
                    <label class="form-label">First Name</label>
                    <input type="text" class="form-control" formControlName="firstName">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group mb-3">
                    <label class="form-label">Last Name</label>
                    <input type="text" class="form-control" formControlName="lastName">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" formControlName="email">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group mb-3">
                    <label class="form-label">Phone</label>
                    <input type="text" class="form-control" formControlName="phone">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group mb-3">
                    <label class="form-label">Date of Birth</label>
                    <input type="date" class="form-control" formControlName="dateOfBirth">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group mb-3">
                    <label class="form-label">Gender</label>
                    <select class="form-control" formControlName="gender">
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group mb-3">
                    <label class="form-label">Blood Group</label>
                    <select class="form-control" formControlName="bloodGroup">
                      <option value="">Select Blood Group</option>
                      <option *ngFor="let bg of bloodGroups" [value]="bg">{{ bg }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group mb-3">
                    <label class="form-label">Emergency Contact</label>
                    <input type="text" class="form-control" formControlName="emergencyContact">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group mb-3">
                    <label class="form-label">City</label>
                    <input type="text" class="form-control" formControlName="city">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group mb-3">
                    <label class="form-label">State</label>
                    <input type="text" class="form-control" formControlName="state">
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group mb-3">
                    <label class="form-label">Address</label>
                    <textarea class="form-control" formControlName="address" rows="2"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary" [disabled]="!editForm.valid || isLoading">
                <i class="fas fa-save me-2"></i>Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .admin-container {
      background: #f8f9fa;
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
    
    .patients-table .table th {
      border-top: none;
      font-weight: 600;
      color: #495057;
    }
    
    .patients-table .table td {
      vertical-align: middle;
    }
    
    .btn-group-sm .btn {
      padding: 0.25rem 0.5rem;
    }
    
    .search-section {
      border: none;
      box-shadow: var(--shadow-sm);
    }
    
    .page-link {
      cursor: pointer;
    }
    
    @media (max-width: 768px) {
      .header-actions {
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .table-responsive {
        font-size: 0.875rem;
      }
    }
  `]
})
export class ManagePatientsComponent implements OnInit {
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  paginatedPatients: Patient[] = [];
  
  // Statistics
  totalPatients = 0;
  activePatients = 0;
  inactivePatients = 0;
  recentRegistrations = 0;
  
  // Filters
  searchTerm = '';
  statusFilter = '';
  bloodGroupFilter = '';
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  
  // Form
  editForm: FormGroup;
  selectedPatient: Patient | null = null;
  isLoading = false;

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private imageService: ImageService
  ) {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      bloodGroup: [''],
      emergencyContact: [''],
      address: [''],
      city: [''],
      state: ['']
    });
  }

  ngOnInit(): void {
    // Check if user is logged in and is an admin
    if (!this.authService.isLoggedIn()) {
      alert('You need to be logged in to access this page. Please login first.');
      this.router.navigate(['/auth/login']);
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'ADMIN') {
      alert('You need to be logged in as an admin to access this page. Please login with admin credentials.');
      this.router.navigate(['/auth/login']);
      return;
    }

    this.loadPatients();
  }

  loadPatients(): void {
    this.isLoading = true;
    this.adminService.getAllPatients().subscribe({
      next: (patients) => {
        this.patients = patients;
        this.updateStatistics();
        this.filterPatients();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading patients:', error);
        this.isLoading = false;
        
        // Handle authentication errors
        if (error.status === 401 || error.status === 403) {
          console.error('Authentication error:', error);
          alert('Authentication failed. Please check your admin credentials and try again.');
          // Don't automatically redirect - let user decide
        } else {
          alert('Error loading patients. Please try again later.');
        }
      }
    });
  }

  updateStatistics(): void {
    this.totalPatients = this.patients.length;
    this.activePatients = this.patients.filter(p => p.isActive).length;
    this.inactivePatients = this.patients.filter(p => !p.isActive).length;
    
    // Calculate recent registrations (this month)
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    this.recentRegistrations = this.patients.filter(p => {
      if (p.createdAt) {
        const createdDate = new Date(p.createdAt);
        return createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear;
      }
      return false;
    }).length;
  }

  filterPatients(): void {
    let filtered = [...this.patients];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(patient =>
        patient.firstName?.toLowerCase().includes(term) ||
        patient.lastName?.toLowerCase().includes(term) ||
        patient.email?.toLowerCase().includes(term) ||
        patient.phone?.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (this.statusFilter) {
      switch (this.statusFilter) {
        case 'active':
          filtered = filtered.filter(p => p.isActive);
          break;
        case 'inactive':
          filtered = filtered.filter(p => !p.isActive);
          break;
      }
    }

    // Blood group filter
    if (this.bloodGroupFilter) {
      filtered = filtered.filter(p => p.bloodGroup === this.bloodGroupFilter);
    }

    this.filteredPatients = filtered;
    this.totalPages = Math.ceil(this.filteredPatients.length / this.pageSize);
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPatients = this.filteredPatients.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  getPageNumbers(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  getPatientImageUrl(patient: Patient): string {
    return this.imageService.getFullImageUrl(patient?.profileImageUrl);
  }

  calculateAge(dateOfBirth: string | Date | undefined): number {
    if (!dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  formatDate(date: string | Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  }

  viewPatient(patient: Patient): void {
    this.router.navigate(['/admin/patient-details', patient.id]);
  }

  editPatient(patient: Patient): void {
    this.router.navigate(['/admin/edit-patient', patient.id]);
  }

  updatePatient(): void {
    if (this.editForm.valid && this.selectedPatient) {
      this.isLoading = true;
      const updateData = this.editForm.value;
      
      this.adminService.updatePatient(this.selectedPatient.id, updateData).subscribe({
        next: (updatedPatient) => {
          const index = this.patients.findIndex(p => p.id === updatedPatient.id);
          if (index !== -1) {
            this.patients[index] = updatedPatient;
          }
          this.filterPatients();
          this.isLoading = false;
          // Close modal
          alert('Patient updated successfully!');
        },
        error: (error) => {
          console.error('Error updating patient:', error);
          alert('Error updating patient. Please try again.');
          this.isLoading = false;
        }
      });
    }
  }

  togglePatientStatus(patient: Patient): void {
    if (confirm(`Are you sure you want to ${patient.isActive ? 'deactivate' : 'activate'} ${patient.firstName} ${patient.lastName}?`)) {
      this.adminService.togglePatientStatus(patient.id).subscribe({
        next: (updatedPatient) => {
          const index = this.patients.findIndex(p => p.id === updatedPatient.id);
          if (index !== -1) {
            this.patients[index] = updatedPatient;
          }
          this.updateStatistics();
          this.filterPatients();
          alert(`Patient ${updatedPatient.isActive ? 'activated' : 'deactivated'} successfully!`);
        },
        error: (error) => {
          console.error('Error toggling patient status:', error);
          alert('Error updating patient status. Please try again.');
        }
      });
    }
  }

  deletePatient(patient: Patient): void {
    if (confirm(`Are you sure you want to delete ${patient.firstName} ${patient.lastName}? This action cannot be undone.`)) {
      this.adminService.deletePatient(patient.id).subscribe({
        next: (response) => {
          this.patients = this.patients.filter(p => p.id !== patient.id);
          this.updateStatistics();
          this.filterPatients();
          alert(response || 'Patient deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting patient:', error);
          alert('Error deleting patient. Please try again.');
        }
      });
    }
  }

  refreshPatients(): void {
    this.loadPatients();
  }

  exportPatients(): void {
    // Implementation for exporting patients data
    alert('Export functionality will be implemented');
  }

}
