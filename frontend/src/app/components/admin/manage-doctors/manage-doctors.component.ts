import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Doctor } from '../../../models/doctor.model';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { ImageService } from '../../../services/image.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-manage-doctors',
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
            <h1 class="mb-1">Manage Doctors</h1>
            <p class="text-muted">Add, edit, delete, and manage doctor accounts</p>
          </div>
          <div class="header-actions">
            <a routerLink="/admin/dashboard" class="btn btn-outline-secondary me-2">
              <i class="fas fa-home me-2"></i>Dashboard
            </a>
            <button class="btn btn-success" (click)="refreshDoctors()">
              <i class="fas fa-sync-alt me-2"></i>Refresh
            </button>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
          <div class="stat-card card">
            <div class="card-body text-center">
              <i class="fas fa-user-md" style="font-size: 2rem; color: var(--primary-color); margin-bottom: 0.5rem;"></i>
              <h4 class="mb-1">{{ totalDoctors }}</h4>
              <small class="text-muted">Total Doctors</small>
            </div>
          </div>
          <div class="stat-card card">
            <div class="card-body text-center">
              <i class="fas fa-check-circle" style="font-size: 2rem; color: var(--success-color); margin-bottom: 0.5rem;"></i>
              <h4 class="mb-1">{{ approvedDoctors }}</h4>
              <small class="text-muted">Approved</small>
            </div>
          </div>
          <div class="stat-card card">
            <div class="card-body text-center">
              <i class="fas fa-clock" style="font-size: 2rem; color: var(--warning-color); margin-bottom: 0.5rem;"></i>
              <h4 class="mb-1">{{ pendingDoctors }}</h4>
              <small class="text-muted">Pending</small>
            </div>
          </div>
          <div class="stat-card card">
            <div class="card-body text-center">
              <i class="fas fa-toggle-on" style="font-size: 2rem; color: var(--info-color); margin-bottom: 0.5rem;"></i>
              <h4 class="mb-1">{{ activeDoctors }}</h4>
              <small class="text-muted">Active</small>
            </div>
          </div>
        </div>

        <!-- Search and Filter -->
        <div class="search-section card mb-4">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">Search Doctors</label>
                  <input type="text" class="form-control" [(ngModel)]="searchTerm" 
                         (input)="filterDoctors()" placeholder="Search by name, email, specialization...">
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label class="form-label">Filter by Status</label>
                  <select class="form-control" [(ngModel)]="statusFilter" (change)="filterDoctors()">
                    <option value="">All Statuses</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label class="form-label">Filter by Specialization</label>
                  <select class="form-control" [(ngModel)]="specializationFilter" (change)="filterDoctors()">
                    <option value="">All Specializations</option>
                    <option *ngFor="let spec of specializations" [value]="spec">{{ spec }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Doctors Table -->
        <div class="doctors-table card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Doctors List ({{ filteredDoctors.length }})</h5>
            <div class="table-actions">
              <button class="btn btn-sm btn-outline-primary me-2" (click)="exportDoctors()">
                <i class="fas fa-download me-1"></i>Export
              </button>
            </div>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead class="table-light">
                  <tr>
                    <th>Doctor</th>
                    <th>Contact</th>
                    <th>Specialization</th>
                    <th>Experience</th>
                    <th>Fee</th>
                    <th>Status</th>
                    <th>Approval</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let doctor of paginatedDoctors">
                    <td>
                      <div class="d-flex align-items-center">
                        <img [src]="getDoctorImageUrl(doctor)" alt="Doctor" 
                             class="rounded-circle me-3" style="width: 40px; height: 40px; object-fit: cover;">
                        <div>
                          <div class="fw-semibold">Dr. {{ doctor.firstName }} {{ doctor.lastName }}</div>
                          <small class="text-muted">{{ doctor.qualification }}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>{{ doctor.email }}</div>
                      <small class="text-muted">{{ doctor.phone }}</small>
                    </td>
                    <td>
                      <span class="badge bg-primary">{{ doctor.specialization }}</span>
                    </td>
                    <td>{{ doctor.experienceYears }} years</td>
                    <td>₹{{ doctor.consultationFee }}</td>
                    <td>
                      <span class="badge" [class]="doctor.isActive ? 'bg-success' : 'bg-secondary'">
                        {{ doctor.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                    <td>
                      <span class="badge" [class]="doctor.isApproved ? 'bg-success' : 'bg-warning'">
                        {{ doctor.isApproved ? 'Approved' : 'Pending' }}
                      </span>
                    </td>
                    <td>
                      <div class="btn-group btn-group-sm" role="group">
                        <button class="btn btn-outline-info" (click)="viewDoctor(doctor)" title="View Details">
                          <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-outline-primary" (click)="editDoctor(doctor)" title="Edit">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn" 
                                [class]="doctor.isActive ? 'btn-outline-warning' : 'btn-outline-success'"
                                (click)="toggleDoctorStatus(doctor)" 
                                [title]="doctor.isActive ? 'Deactivate' : 'Activate'">
                          <i class="fas" [class]="doctor.isActive ? 'fa-pause' : 'fa-play'"></i>
                        </button>
                        <button class="btn btn-outline-danger" (click)="deleteDoctor(doctor)" title="Delete">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- No Results -->
            <div *ngIf="filteredDoctors.length === 0 && !isLoading" class="text-center py-5">
              <i class="fas fa-search text-muted" style="font-size: 3rem; margin-bottom: 1rem;"></i>
              <h5>No doctors found</h5>
              <p class="text-muted">Try adjusting your search criteria or make sure you're logged in as an admin</p>
              <div class="mt-3">
                <button class="btn btn-primary me-2" (click)="refreshDoctors()">
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
              <p class="mt-3">Loading doctors...</p>
            </div>
          </div>
          
          <!-- Pagination -->
          <div class="card-footer" *ngIf="filteredDoctors.length > pageSize">
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
    
    .doctors-table .table th {
      border-top: none;
      font-weight: 600;
      color: #495057;
    }
    
    .doctors-table .table td {
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
export class ManageDoctorsComponent implements OnInit {
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  paginatedDoctors: Doctor[] = [];
  
  // Statistics
  totalDoctors = 0;
  approvedDoctors = 0;
  pendingDoctors = 0;
  activeDoctors = 0;
  
  // Filters
  searchTerm = '';
  statusFilter = '';
  specializationFilter = '';
  specializations: string[] = [];
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  
  // Form
  editForm: FormGroup;
  selectedDoctor: Doctor | null = null;
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
      licenseNumber: ['', Validators.required],
      specialization: ['', Validators.required],
      qualification: ['', Validators.required],
      experienceYears: ['', [Validators.required, Validators.min(0)]],
      consultationFee: ['', [Validators.required, Validators.min(0)]],
      hospitalAffiliation: [''],
      city: ['']
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

    this.loadDoctors();
  }

  loadDoctors(): void {
    this.isLoading = true;
    this.adminService.getAllDoctors().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
        this.updateStatistics();
        this.extractSpecializations();
        this.filterDoctors();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading doctors:', error);
        this.isLoading = false;
        
        // Handle authentication errors
        if (error.status === 401 || error.status === 403) {
          console.error('Authentication error:', error);
          alert('Authentication failed. Please check your admin credentials and try again.');
          // Don't automatically redirect - let user decide
        } else {
          alert('Error loading doctors. Please try again later.');
        }
      }
    });
  }

  updateStatistics(): void {
    this.totalDoctors = this.doctors.length;
    this.approvedDoctors = this.doctors.filter(d => d.isApproved).length;
    this.pendingDoctors = this.doctors.filter(d => !d.isApproved).length;
    this.activeDoctors = this.doctors.filter(d => d.isActive).length;
  }

  extractSpecializations(): void {
    const specs = [...new Set(this.doctors.map(d => d.specialization).filter(s => s))];
    this.specializations = specs.sort();
  }

  filterDoctors(): void {
    let filtered = [...this.doctors];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(doctor =>
        doctor.firstName?.toLowerCase().includes(term) ||
        doctor.lastName?.toLowerCase().includes(term) ||
        doctor.email?.toLowerCase().includes(term) ||
        doctor.specialization?.toLowerCase().includes(term) ||
        doctor.qualification?.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (this.statusFilter) {
      switch (this.statusFilter) {
        case 'approved':
          filtered = filtered.filter(d => d.isApproved);
          break;
        case 'pending':
          filtered = filtered.filter(d => !d.isApproved);
          break;
        case 'active':
          filtered = filtered.filter(d => d.isActive);
          break;
        case 'inactive':
          filtered = filtered.filter(d => !d.isActive);
          break;
      }
    }

    // Specialization filter
    if (this.specializationFilter) {
      filtered = filtered.filter(d => d.specialization === this.specializationFilter);
    }

    this.filteredDoctors = filtered;
    this.totalPages = Math.ceil(this.filteredDoctors.length / this.pageSize);
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedDoctors = this.filteredDoctors.slice(startIndex, endIndex);
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

  getDoctorImageUrl(doctor: Doctor): string {
    return this.imageService.getFullImageUrl(doctor?.profileImageUrl);
  }

  viewDoctor(doctor: Doctor): void {
    this.router.navigate(['/admin/doctor-details', doctor.id]);
  }

  editDoctor(doctor: Doctor): void {
    this.router.navigate(['/admin/edit-doctor', doctor.id]);
  }


  toggleDoctorStatus(doctor: Doctor): void {
    if (confirm(`Are you sure you want to ${doctor.isActive ? 'deactivate' : 'activate'} Dr. ${doctor.firstName} ${doctor.lastName}?`)) {
      this.adminService.toggleDoctorStatus(doctor.id).subscribe({
        next: (updatedDoctor) => {
          const index = this.doctors.findIndex(d => d.id === updatedDoctor.id);
          if (index !== -1) {
            this.doctors[index] = updatedDoctor;
          }
          this.updateStatistics();
          this.filterDoctors();
          alert(`Doctor ${updatedDoctor.isActive ? 'activated' : 'deactivated'} successfully!`);
        },
        error: (error) => {
          console.error('Error toggling doctor status:', error);
          alert('Error updating doctor status. Please try again.');
        }
      });
    }
  }

  deleteDoctor(doctor: Doctor): void {
    if (confirm(`Are you sure you want to delete Dr. ${doctor.firstName} ${doctor.lastName}? This action cannot be undone.`)) {
      this.adminService.deleteDoctor(doctor.id).subscribe({
        next: (response) => {
          this.doctors = this.doctors.filter(d => d.id !== doctor.id);
          this.updateStatistics();
          this.filterDoctors();
          alert(response || 'Doctor deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting doctor:', error);
          alert('Error deleting doctor. Please try again.');
        }
      });
    }
  }

  refreshDoctors(): void {
    this.loadDoctors();
  }

  exportDoctors(): void {
    // Implementation for exporting doctors data
    alert('Export functionality will be implemented');
  }

}
