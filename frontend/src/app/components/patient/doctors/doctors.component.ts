import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Doctor } from '../../../models/doctor.model';
import { AuthService } from '../../../services/auth.service';
import { DoctorService } from '../../../services/doctor.service';
import { ImageService } from '../../../services/image.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-patient-doctors',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FooterComponent, HeaderComponent],
  template: `
    <!-- Dynamic 3D Header -->
    <app-header></app-header>

    <div class="doctors-container" style="margin-top: 70px;">
      <div class="container">
        <!-- Header -->
        <div class="page-header mb-4">
          <div class="d-flex align-items-center mb-3">
            <button class="btn btn-outline-secondary me-3" (click)="goBack()">
              <i class="fas fa-arrow-left me-2"></i>Back
            </button>
            <div>
              <h1 class="mb-1">Find Doctors</h1>
              <p class="text-muted mb-0">Search and book appointments with verified healthcare professionals</p>
            </div>
          </div>
        </div>

        <!-- Search Filters -->
        <div class="search-section card mb-4">
          <div class="card-body">
            <form [formGroup]="searchForm" (ngSubmit)="searchDoctors()">
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="form-label">Search by Name or Keyword</label>
                    <div class="search-input-container">
                      <div class="input-group">
                        <input type="text" class="form-control" formControlName="keyword" 
                               placeholder="Doctor name, hospital, etc."
                               (input)="onSearchInput($event)"
                               (keydown.enter)="onSearchKeydown($event)"
                               (focus)="showSearchSuggestions = true"
                               (blur)="hideSearchSuggestions()"
                               [disabled]="isLoading">
                        <span class="input-group-text" *ngIf="isLoading">
                          <i class="fas fa-spinner fa-spin"></i>
                        </span>
                      </div>
                      <!-- Search Suggestions Dropdown -->
                      <div class="search-suggestions" *ngIf="showSearchSuggestions && searchSuggestions.length > 0">
                        <div class="suggestion-item" 
                             *ngFor="let suggestion of searchSuggestions" 
                             (click)="selectSuggestion(suggestion)">
                          <i class="fas fa-search me-2"></i>
                          {{ suggestion }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label class="form-label">Specialization</label>
                    <div class="specialization-input-container">
                      <div class="input-group">
                        <input type="text" class="form-control" formControlName="specialization" 
                               placeholder="e.g., Heart, Brain, etc."
                               (input)="onSpecializationInput($event)"
                               (focus)="showSpecializationSuggestions = true"
                               (blur)="hideSpecializationSuggestions()"
                               (keydown.enter)="onSpecializationKeydown($event)"
                               [disabled]="isLoading">
                        <span class="input-group-text" *ngIf="isLoading">
                          <i class="fas fa-spinner fa-spin"></i>
                        </span>
                      </div>
                      <!-- Specialization Suggestions Dropdown -->
                      <div class="specialization-suggestions" *ngIf="showSpecializationSuggestions && specializationSuggestions.length > 0">
                        <div class="suggestion-item" 
                             *ngFor="let suggestion of specializationSuggestions" 
                             (click)="selectSpecializationSuggestion(suggestion)">
                          <i class="fas fa-stethoscope me-2"></i>
                          {{ suggestion }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label class="form-label">City</label>
                    <div class="city-input-container">
                      <div class="input-group">
                        <input type="text" class="form-control" formControlName="city" 
                               placeholder="e.g., Mumbai, Delhi, etc."
                               (input)="onCityInput($event)"
                               (focus)="showCitySuggestions = true"
                               (blur)="hideCitySuggestions()"
                               (keydown.enter)="onCityKeydown($event)"
                               [disabled]="isLoading">
                        <span class="input-group-text" *ngIf="isLoading">
                          <i class="fas fa-spinner fa-spin"></i>
                        </span>
                      </div>
                      <!-- City Suggestions Dropdown -->
                      <div class="city-suggestions" *ngIf="showCitySuggestions && citySuggestions.length > 0">
                        <div class="suggestion-item" 
                             *ngFor="let suggestion of citySuggestions" 
                             (click)="selectCitySuggestion(suggestion)">
                          <i class="fas fa-map-marker-alt me-2"></i>
                          {{ suggestion }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-group">
                    <label class="form-label">&nbsp;</label>
                    <div class="search-actions">
                      <button type="submit" class="btn btn-primary search-btn" [disabled]="isLoading">
                        <i class="fas fa-search me-2" [class.fa-spin]="isLoading"></i>
                        <span *ngIf="!isLoading">Search</span>
                        <span *ngIf="isLoading">Searching...</span>
                      </button>
                      <button type="button" class="btn btn-outline-secondary clear-btn" (click)="clearFilters()" title="Clear All Filters">
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Filter Summary -->
              <div class="filter-summary mt-3" *ngIf="hasActiveFilters()">
                <div class="d-flex align-items-center">
                  <span class="text-muted me-3">Active filters:</span>
                  <div class="filter-tags">
                    <span class="badge bg-primary me-2" *ngIf="searchForm.get('specialization')?.value">
                      <i class="fas fa-stethoscope me-1"></i>{{ searchForm.get('specialization')?.value }}
                      <button type="button" class="btn-close btn-close-white ms-1" (click)="clearSpecialization()"></button>
                    </span>
                    <span class="badge bg-info me-2" *ngIf="searchForm.get('city')?.value">
                      <i class="fas fa-map-marker-alt me-1"></i>{{ searchForm.get('city')?.value }}
                      <button type="button" class="btn-close btn-close-white ms-1" (click)="clearCity()"></button>
                    </span>
                    <span class="badge bg-success me-2" *ngIf="searchForm.get('keyword')?.value">
                      <i class="fas fa-search me-1"></i>{{ searchForm.get('keyword')?.value }}
                      <button type="button" class="btn-close btn-close-white ms-1" (click)="clearKeyword()"></button>
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Results Summary -->
        <div class="results-summary mb-3" *ngIf="doctors.length > 0 || hasActiveFilters()">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h5 class="mb-0">
                <i class="fas fa-user-md me-2 text-primary"></i>
                {{ doctors.length }} Doctor{{ doctors.length !== 1 ? 's' : '' }} Found
              </h5>
              <small class="text-muted" *ngIf="hasActiveFilters()">
                Based on your search criteria
              </small>
            </div>
            <div class="text-end" *ngIf="hasActiveFilters()">
              <button class="btn btn-sm btn-outline-secondary" (click)="clearFilters()">
                <i class="fas fa-times me-1"></i>Clear All Filters
              </button>
            </div>
          </div>
        </div>

        <!-- Doctors List -->
        <div class="doctors-list">
          <div class="row">
            <div class="col-lg-4 col-md-6 mb-4" *ngFor="let doctor of doctors">
              <div class="doctor-card card h-100">
                <div class="card-body">
                  <div class="doctor-header d-flex align-items-center mb-3">
                    <div class="doctor-avatar me-3">
                      <img [src]="getDoctorImageUrl(doctor)" 
                           alt="Dr. {{ doctor.firstName }} {{ doctor.lastName }}" 
                           class="rounded-circle"
                           style="width: 50px; height: 50px; object-fit: cover; border: 2px solid var(--primary-color);">
                    </div>
                    <div>
                      <h5 class="doctor-name mb-1">Dr. {{ doctor.firstName }} {{ doctor.lastName }}</h5>
                      <p class="doctor-specialization text-muted mb-0">{{ doctor.specialization }}</p>
                    </div>
                  </div>
                  
                  <div class="doctor-info">
                    <div class="info-item d-flex align-items-center mb-2">
                      <i class="fas fa-graduation-cap me-2 text-muted"></i>
                      <span class="text-sm">{{ doctor.experienceYears }} years experience</span>
                    </div>
                    <div class="info-item d-flex align-items-center mb-2">
                      <i class="fas fa-hospital me-2 text-muted"></i>
                      <span class="text-sm">{{ doctor.hospitalAffiliation || 'Not specified' }}</span>
                    </div>
                    <div class="info-item d-flex align-items-center mb-2">
                      <i class="fas fa-map-marker-alt me-2 text-muted"></i>
                      <span class="text-sm">{{ doctor.city || 'Not specified' }}</span>
                    </div>
                    <div class="info-item d-flex align-items-center mb-3">
                      <i class="fas fa-rupee-sign me-2 text-muted"></i>
                      <span class="text-sm">₹{{ doctor.consultationFee }} consultation</span>
                    </div>
                  </div>
                  
                  <div class="doctor-rating mb-3">
                    <div class="d-flex align-items-center">
                      <div class="stars me-2">
                        <i class="fas fa-star text-warning" *ngFor="let star of [1,2,3,4,5]; let i = index" 
                           [class.text-muted]="i >= 4"></i>
                      </div>
                      <span class="text-sm text-muted">({{ getReviewCount(doctor) }} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div class="card-footer bg-transparent">
                  <div class="d-grid gap-2">
                    <button class="btn btn-outline-info" (click)="viewDoctorDetails(doctor)">
                      <i class="fas fa-info-circle me-2"></i>View Details
                    </button>
                    <button class="btn btn-primary" (click)="bookAppointment(doctor)">
                      <i class="fas fa-calendar-plus me-2"></i>Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- No Results -->
          <div *ngIf="doctors.length === 0 && !isLoading" class="no-results text-center py-5">
            <i class="fas fa-search text-muted" style="font-size: 4rem; margin-bottom: 1rem;"></i>
            <h4>No doctors found</h4>
            <p class="text-muted">Try adjusting your search criteria</p>
          </div>
          
          <!-- Loading -->
          <div *ngIf="isLoading" class="loading text-center py-5">
            <div class="loading-spinner"></div>
            <p class="text-muted mt-3">Searching for doctors...</p>
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
    
    .doctors-container {
      padding: 2rem 0;
      min-height: calc(100vh - 8rem);
    }
    
    .doctor-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: none;
      box-shadow: var(--shadow-sm);
    }
    
    .doctor-card:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-lg);
    }
    
    .doctor-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .doctor-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .stars i {
      font-size: 0.875rem;
    }
    
    .text-sm {
      font-size: 0.875rem;
    }
    
    .info-item i {
      width: 16px;
    }
    
    /* Search Suggestions Styles */
    .search-input-container {
      position: relative;
    }
    
    .search-input-container .input-group {
      position: relative;
    }
    
    .search-input-container .input-group-text {
      background-color: #f8f9fa;
      border-color: #ced4da;
      color: #6c757d;
    }
    
    /* Specialization and City Input Styles */
    .specialization-input-container,
    .city-input-container {
      position: relative;
    }
    
    .specialization-input-container .input-group,
    .city-input-container .input-group {
      position: relative;
    }
    
    .specialization-input-container .input-group-text,
    .city-input-container .input-group-text {
      background-color: #f8f9fa;
      border-color: #ced4da;
      color: #6c757d;
    }
    
    .specialization-suggestions,
    .city-suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #dee2e6;
      border-top: none;
      border-radius: 0 0 0.375rem 0.375rem;
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
      z-index: 1000;
      max-height: 200px;
      overflow-y: auto;
    }
    
    .specialization-suggestions .suggestion-item,
    .city-suggestions .suggestion-item {
      padding: 0.5rem 0.75rem;
      cursor: pointer;
      border-bottom: 1px solid #f8f9fa;
      transition: background-color 0.15s ease-in-out;
    }
    
    .specialization-suggestions .suggestion-item:hover,
    .city-suggestions .suggestion-item:hover {
      background-color: #f8f9fa;
    }
    
    .specialization-suggestions .suggestion-item:last-child,
    .city-suggestions .suggestion-item:last-child {
      border-bottom: none;
    }
    
    .specialization-suggestions .suggestion-item i,
    .city-suggestions .suggestion-item i {
      color: #6c757d;
      font-size: 0.875rem;
    }
    
    .search-suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #dee2e6;
      border-top: none;
      border-radius: 0 0 0.375rem 0.375rem;
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
      z-index: 1000;
      max-height: 200px;
      overflow-y: auto;
    }
    
    .suggestion-item {
      padding: 0.5rem 0.75rem;
      cursor: pointer;
      border-bottom: 1px solid #f8f9fa;
      transition: background-color 0.15s ease-in-out;
    }
    
    .suggestion-item:hover {
      background-color: #f8f9fa;
    }
    
    .suggestion-item:last-child {
      border-bottom: none;
    }
    
    .suggestion-item i {
      color: #6c757d;
      font-size: 0.875rem;
    }
    
    /* Filter Summary Styles */
    .filter-summary {
      background: #f8f9fa;
      padding: 0.75rem;
      border-radius: 0.375rem;
      border: 1px solid #e9ecef;
    }
    
    .filter-tags .badge {
      font-size: 0.75rem;
      padding: 0.375rem 0.5rem;
      display: inline-flex;
      align-items: center;
    }
    
    .filter-tags .btn-close {
      font-size: 0.5rem;
      margin-left: 0.25rem;
      opacity: 0.8;
    }
    
    .filter-tags .btn-close:hover {
      opacity: 1;
    }
    
    /* Enhanced Search Button Styles */
    .search-actions {
      display: flex;
      gap: 0.5rem;
      height: 38px;
    }
    
    .search-btn {
      flex: 1;
      min-width: 80px;
      font-weight: 600;
      border-radius: 0.375rem;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .search-btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
    }
    
    .search-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    .search-btn .fa-spin {
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .clear-btn {
      width: 38px;
      height: 38px;
      padding: 0;
      border-radius: 0.375rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    
    .clear-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(108, 117, 125, 0.3);
    }
    
    .btn-outline-secondary {
      border-color: #6c757d;
      color: #6c757d;
    }
    
    .btn-outline-secondary:hover {
      background-color: #6c757d;
      border-color: #6c757d;
      color: white;
    }
    
    /* Results Summary Styles */
    .results-summary {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      padding: 1rem;
      border-radius: 0.5rem;
      border: 1px solid #dee2e6;
    }
    
    .results-summary h5 {
      color: #495057;
      font-weight: 600;
    }
    
    .results-summary .text-muted {
      font-size: 0.875rem;
    }
    
    @media (max-width: 768px) {
      .doctors-container {
        padding: 1rem 0;
      }
      
      .search-suggestions {
        font-size: 0.875rem;
      }
      
      .filter-summary {
        padding: 0.5rem;
      }
      
      .filter-tags .badge {
        font-size: 0.7rem;
        padding: 0.25rem 0.375rem;
      }
      
      .results-summary {
        padding: 0.75rem;
      }
      
      .results-summary .d-flex {
        flex-direction: column;
        align-items: flex-start !important;
      }
      
      .results-summary .text-end {
        margin-top: 0.5rem;
        width: 100%;
        text-align: left !important;
      }
      
      .search-actions {
        flex-direction: column;
        gap: 0.5rem;
        height: auto;
      }
      
      .search-btn {
        width: 100%;
        min-width: auto;
      }
      
      .clear-btn {
        width: 100%;
        height: 38px;
      }
      
      .specialization-suggestions,
      .city-suggestions {
        font-size: 0.875rem;
      }
    }
  `]
})
export class DoctorsComponent implements OnInit {
  searchForm: FormGroup;
  doctors: Doctor[] = [];
  specializations: string[] = [];
  cities: string[] = [];
  isLoading = false;
  showSearchSuggestions = false;
  searchSuggestions: string[] = [];
  allDoctors: Doctor[] = []; // Store all doctors for suggestions
  
  // Specialization suggestions
  showSpecializationSuggestions = false;
  specializationSuggestions: string[] = [];
  
  // City suggestions
  showCitySuggestions = false;
  citySuggestions: string[] = [];

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private authService: AuthService,
    private router: Router,
    private imageService: ImageService
  ) {
    this.searchForm = this.fb.group({
      keyword: [''],
      specialization: [''],
      city: ['']
    });
  }

  ngOnInit(): void {
    this.loadDoctors();
    this.loadFilters();
  }

  loadDoctors(): void {
    this.isLoading = true;
    this.doctorService.getApprovedDoctors().subscribe({
      next: (doctors) => {
        this.allDoctors = doctors; // Store all doctors for suggestions
        this.doctors = doctors;
        this.isLoading = false;
        console.log('Loaded approved doctors:', doctors);
      },
      error: (error) => {
        console.error('Error loading approved doctors:', error);
        this.doctors = [];
        this.allDoctors = [];
        this.isLoading = false;
      }
    });
  }

  loadFilters(): void {
    // Load specializations for filter dropdown
    this.doctorService.getSpecializations().subscribe({
      next: (specializations) => {
        this.specializations = specializations;
      },
      error: (error) => {
        console.error('Error loading specializations:', error);
      }
    });

    // Load cities for filter dropdown
    this.doctorService.getCities().subscribe({
      next: (cities) => {
        this.cities = cities;
      },
      error: (error) => {
        console.error('Error loading cities:', error);
      }
    });
  }

  searchDoctors(): void {
    this.isLoading = true;
    const formValue = this.searchForm.value;
    
    // Prepare search parameters
    const searchParams: any = {};
    
    // Add keyword if provided and not empty
    if (formValue.keyword && formValue.keyword.trim()) {
      searchParams.keyword = formValue.keyword.trim();
    }
    
    // Add specialization if provided and not empty
    if (formValue.specialization && formValue.specialization.trim()) {
      searchParams.specialization = formValue.specialization.trim();
    }
    
    // Add city if provided and not empty
    if (formValue.city && formValue.city.trim()) {
      searchParams.city = formValue.city.trim();
    }
    
    console.log('Searching with parameters:', searchParams);
    
    this.doctorService.searchDoctors(searchParams).subscribe({
      next: (doctors) => {
        this.doctors = doctors || [];
        this.isLoading = false;
        console.log('Search results:', this.doctors.length, 'doctors found');
        
        // Hide search suggestions after search
        this.showSearchSuggestions = false;
        this.searchSuggestions = [];
      },
      error: (error) => {
        console.error('Error searching doctors:', error);
        this.doctors = [];
        this.isLoading = false;
        this.showSearchSuggestions = false;
        this.searchSuggestions = [];
        
        // Show user-friendly error message
        alert('Sorry, there was an error searching for doctors. Please try again.');
      }
    });
  }

  // New methods for enhanced filtering
  onSearchInput(event: any): void {
    const value = event.target.value.trim();
    if (value.length > 1) { // Only show suggestions for 2+ characters
      this.generateSearchSuggestions(value.toLowerCase());
    } else {
      this.searchSuggestions = [];
      this.showSearchSuggestions = false;
    }
  }

  generateSearchSuggestions(value: string): void {
    const suggestions = new Set<string>();
    
    if (!this.allDoctors || this.allDoctors.length === 0) {
      this.searchSuggestions = [];
      return;
    }
    
    this.allDoctors.forEach(doctor => {
      // Add doctor names
      if (doctor.firstName && doctor.lastName) {
        const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
        if (fullName.includes(value)) {
          suggestions.add(`Dr. ${doctor.firstName} ${doctor.lastName}`);
        }
      }
      
      // Add specialization
      if (doctor.specialization && doctor.specialization.toLowerCase().includes(value)) {
        suggestions.add(doctor.specialization);
      }
      
      // Add hospital affiliation
      if (doctor.hospitalAffiliation && doctor.hospitalAffiliation.toLowerCase().includes(value)) {
        suggestions.add(doctor.hospitalAffiliation);
      }
      
      // Add city
      if (doctor.city && doctor.city.toLowerCase().includes(value)) {
        suggestions.add(doctor.city);
      }
    });
    
    this.searchSuggestions = Array.from(suggestions).slice(0, 5); // Limit to 5 suggestions
    this.showSearchSuggestions = this.searchSuggestions.length > 0;
  }

  selectSuggestion(suggestion: string): void {
    this.searchForm.patchValue({ keyword: suggestion });
    this.showSearchSuggestions = false;
    this.searchDoctors();
  }

  hideSearchSuggestions(): void {
    // Delay hiding to allow clicking on suggestions
    setTimeout(() => {
      this.showSearchSuggestions = false;
    }, 200);
  }

  onSearchKeydown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter') {
      keyboardEvent.preventDefault();
      this.showSearchSuggestions = false;
      this.searchDoctors();
    }
  }

  onFilterChange(): void {
    // Auto-search when filters change
    this.searchDoctors();
  }

  // Specialization input methods
  onSpecializationInput(event: any): void {
    const value = event.target.value.trim();
    if (value.length > 1) {
      this.generateSpecializationSuggestions(value.toLowerCase());
    } else {
      this.specializationSuggestions = [];
      this.showSpecializationSuggestions = false;
    }
  }

  generateSpecializationSuggestions(value: string): void {
    const suggestions = this.specializations.filter(spec => 
      spec.toLowerCase().includes(value)
    );
    this.specializationSuggestions = suggestions.slice(0, 5);
    this.showSpecializationSuggestions = this.specializationSuggestions.length > 0;
  }

  selectSpecializationSuggestion(suggestion: string): void {
    this.searchForm.patchValue({ specialization: suggestion });
    this.showSpecializationSuggestions = false;
    this.searchDoctors();
  }

  hideSpecializationSuggestions(): void {
    setTimeout(() => {
      this.showSpecializationSuggestions = false;
    }, 200);
  }

  onSpecializationKeydown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter') {
      keyboardEvent.preventDefault();
      this.showSpecializationSuggestions = false;
      this.searchDoctors();
    }
  }

  // City input methods
  onCityInput(event: any): void {
    const value = event.target.value.trim();
    if (value.length > 1) {
      this.generateCitySuggestions(value.toLowerCase());
    } else {
      this.citySuggestions = [];
      this.showCitySuggestions = false;
    }
  }

  generateCitySuggestions(value: string): void {
    const suggestions = this.cities.filter(city => 
      city.toLowerCase().includes(value)
    );
    this.citySuggestions = suggestions.slice(0, 5);
    this.showCitySuggestions = this.citySuggestions.length > 0;
  }

  selectCitySuggestion(suggestion: string): void {
    this.searchForm.patchValue({ city: suggestion });
    this.showCitySuggestions = false;
    this.searchDoctors();
  }

  hideCitySuggestions(): void {
    setTimeout(() => {
      this.showCitySuggestions = false;
    }, 200);
  }

  onCityKeydown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter') {
      keyboardEvent.preventDefault();
      this.showCitySuggestions = false;
      this.searchDoctors();
    }
  }

  hasActiveFilters(): boolean {
    const formValue = this.searchForm.value;
    return !!(formValue.keyword || formValue.specialization || formValue.city);
  }

  clearFilters(): void {
    this.searchForm.reset();
    this.searchSuggestions = [];
    this.showSearchSuggestions = false;
    this.specializationSuggestions = [];
    this.showSpecializationSuggestions = false;
    this.citySuggestions = [];
    this.showCitySuggestions = false;
    this.loadDoctors(); // Load all doctors when filters are cleared
  }

  clearSpecialization(): void {
    this.searchForm.patchValue({ specialization: '' });
    this.specializationSuggestions = [];
    this.showSpecializationSuggestions = false;
    this.searchDoctors();
  }

  clearCity(): void {
    this.searchForm.patchValue({ city: '' });
    this.citySuggestions = [];
    this.showCitySuggestions = false;
    this.searchDoctors();
  }

  clearKeyword(): void {
    this.searchForm.patchValue({ keyword: '' });
    this.searchSuggestions = [];
    this.showSearchSuggestions = false;
    this.searchDoctors();
  }

  bookAppointment(doctor: Doctor): void {
    // Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      // Store doctor info for after login
      localStorage.setItem('selectedDoctor', JSON.stringify(doctor));
      // Redirect to login with return URL
      this.router.navigate(['/auth/login'], { 
        queryParams: { returnUrl: '/patient/doctors', action: 'book', doctorId: doctor.id }
      });
      return;
    }

    // Check if user is a patient
    if (!this.authService.hasRole('PATIENT')) {
      alert('Only patients can book appointments. Please register as a patient.');
      this.router.navigate(['/auth/register']);
      return;
    }

    // Navigate to appointment booking
    this.router.navigate(['/patient/book-appointment'], { 
      queryParams: { doctorId: doctor.id }
    });
  }

  viewDoctorDetails(doctor: Doctor): void {
    // Navigate to doctor details page
    this.router.navigate(['/patient/doctor-details', doctor.id]);
  }

  getReviewCount(doctor: Doctor): number {
    return doctor.reviews ? doctor.reviews.length : 0;
  }

  getDoctorImageUrl(doctor: any): string {
    return this.imageService.getFullImageUrl(doctor?.profileImageUrl);
  }

  goBack(): void {
    // Check if user is logged in to determine where to go back
    if (this.authService.isLoggedIn()) {
      const user = this.authService.getCurrentUser();
      if (user.role === 'PATIENT') {
        this.router.navigate(['/patient/dashboard']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }
}
