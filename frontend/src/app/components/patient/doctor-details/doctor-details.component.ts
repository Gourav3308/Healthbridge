import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Doctor } from '../../../models/doctor.model';
import { Review, ReviewRequest, ReviewStats } from '../../../models/review.model';
import { AuthService } from '../../../services/auth.service';
import { DoctorService } from '../../../services/doctor.service';
import { NotificationService } from '../../../services/notification.service';
import { ReviewService } from '../../../services/review.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-patient-doctor-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FooterComponent, HeaderComponent],
  template: `
    <!-- Header -->
    <app-header></app-header>

    <div class="doctor-details-container" style="margin-top: 70px;">
      <div class="container">
        <!-- Back Button -->
        <div class="mb-4">
          <button class="btn btn-outline-secondary" (click)="goBack()">
            <i class="fas fa-arrow-left me-2"></i>Back to Doctors
          </button>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="loading-container text-center py-5">
          <div class="loading-spinner"></div>
          <p class="text-muted mt-3">Loading doctor details...</p>
        </div>

        <!-- Error State -->
        <div *ngIf="error" class="error-container text-center py-5">
          <i class="fas fa-exclamation-triangle text-warning" style="font-size: 3rem; margin-bottom: 1rem;"></i>
          <h4>Doctor Not Found</h4>
          <p class="text-muted">{{ error }}</p>
          <button class="btn btn-primary" (click)="goBack()">Back to Doctors</button>
        </div>

        <!-- Doctor Details -->
        <div *ngIf="doctor && !isLoading" class="doctor-profile">
          <!-- Doctor Header Card -->
          <div class="doctor-header-card card mb-4">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-auto">
                  <div class="doctor-avatar">
                    <img [src]="getDoctorImageUrl(doctor)" 
                         alt="Dr. {{ doctor.firstName }} {{ doctor.lastName }}" 
                         class="rounded-circle"
                         style="width: 100px; height: 100px; object-fit: cover; border: 4px solid var(--primary-color);">
                  </div>
                </div>
                <div class="col">
                  <h1 class="doctor-name mb-2">Dr. {{ doctor.firstName }} {{ doctor.lastName }}</h1>
                  <p class="specialization text-primary mb-2" style="font-size: 1.1rem; font-weight: 500;">
                    <i class="fas fa-stethoscope me-2"></i>{{ doctor.specialization }}
                  </p>
                  <div class="rating-section mb-3">
                    <div class="d-flex align-items-center">
                      <div class="stars me-2">
                        <i class="fas fa-star text-warning" *ngFor="let star of [1,2,3,4,5]; let i = index" 
                           [class.text-muted]="i >= 4"></i>
                      </div>
                      <span class="rating-text">4.0 ({{ getReviewCount(doctor) }} reviews)</span>
                    </div>
                  </div>
                  <div class="quick-info d-flex flex-wrap gap-3">
                    <span class="badge bg-light text-dark">
                      <i class="fas fa-graduation-cap me-1"></i>{{ doctor.experienceYears }} years experience
                    </span>
                    <span class="badge bg-light text-dark">
                      <i class="fas fa-rupee-sign me-1"></i>₹{{ doctor.consultationFee }} consultation
                    </span>
                    <span class="badge bg-success" *ngIf="doctor.isApproved">
                      <i class="fas fa-check-circle me-1"></i>Verified
                    </span>
                  </div>
                </div>
                <div class="col-auto">
                  <button class="btn btn-primary btn-lg" (click)="bookAppointment()">
                    <i class="fas fa-calendar-plus me-2"></i>Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Content -->
          <div class="row">
            <!-- Left Column - Details -->
            <div class="col-lg-8">
              <!-- About Section -->
              <div class="card mb-4" *ngIf="doctor.about">
                <div class="card-header">
                  <h5 class="mb-0"><i class="fas fa-info-circle me-2"></i>About Dr. {{ doctor.firstName }}</h5>
                </div>
                <div class="card-body">
                  <p class="mb-0">{{ doctor.about }}</p>
                </div>
              </div>

              <!-- Qualifications & Experience -->
              <div class="card mb-4">
                <div class="card-header">
                  <h5 class="mb-0"><i class="fas fa-graduation-cap me-2"></i>Qualifications & Experience</h5>
                </div>
                <div class="card-body">
                  <div class="qualification-item mb-3">
                    <h6 class="text-primary mb-2">Education</h6>
                    <p class="mb-0">{{ doctor.qualification }}</p>
                  </div>
                  <div class="experience-item mb-3">
                    <h6 class="text-primary mb-2">Experience</h6>
                    <p class="mb-0">{{ doctor.experienceYears }} years of professional medical practice</p>
                  </div>
                  <div class="license-item" *ngIf="doctor.licenseNumber">
                    <h6 class="text-primary mb-2">Medical License</h6>
                    <p class="mb-0">License No: {{ doctor.licenseNumber }}</p>
                  </div>
                </div>
              </div>

              <!-- Hospital Affiliation -->
              <div class="card mb-4" *ngIf="doctor.hospitalAffiliation">
                <div class="card-header">
                  <h5 class="mb-0"><i class="fas fa-hospital me-2"></i>Hospital Affiliation</h5>
                </div>
                <div class="card-body">
                  <p class="mb-0">{{ doctor.hospitalAffiliation }}</p>
                </div>
              </div>

              <!-- Reviews Section -->
              <div class="card mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h5 class="mb-0"><i class="fas fa-star me-2"></i>Patient Reviews ({{ reviewStats.totalReviews }})</h5>
                  <div class="rating-summary" *ngIf="reviewStats.totalReviews > 0">
                    <div class="d-flex align-items-center">
                      <div class="stars me-2">
                        <i class="fas fa-star text-warning" *ngFor="let star of getStarsArray(reviewStats.averageRating)"></i>
                        <i class="far fa-star text-muted" *ngFor="let star of getEmptyStarsArray(reviewStats.averageRating)"></i>
                      </div>
                      <span class="rating-text">{{ reviewStats.averageRating.toFixed(1) }}</span>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <!-- Write Review Form (for logged-in patients) -->
                  <div *ngIf="isLoggedInPatient && !myReview && !showReviewForm" class="write-review-prompt mb-4">
                    <div class="text-center py-3">
                      <button class="btn btn-outline-primary" (click)="showReviewForm = true">
                        <i class="fas fa-plus me-2"></i>Write a Review
                      </button>
                    </div>
                  </div>

                  <!-- Review Form -->
                  <div *ngIf="showReviewForm || editingReview" class="review-form mb-4">
                    <div class="card border-primary">
                      <div class="card-header bg-primary text-white">
                        <h6 class="mb-0">
                          <i class="fas fa-edit me-2"></i>
                          {{ editingReview ? 'Edit Your Review' : 'Write a Review' }}
                        </h6>
                      </div>
                      <div class="card-body">
                        <form [formGroup]="reviewForm" (ngSubmit)="submitReview()">
                          <!-- Star Rating -->
                          <div class="form-group mb-3">
                            <label class="form-label">Rating <span class="text-danger">*</span></label>
                            <div class="star-rating d-flex align-items-center gap-1">
                              <span *ngFor="let star of [1,2,3,4,5]; let i = index"
                                    class="star-wrapper"
                                    (click)="setRating(i + 1)"
                                    (mouseover)="hoverRating = i + 1"
                                    (mouseleave)="hoverRating = 0">
                                <i class="fas fa-star star-icon"
                                   [class.selected]="i < selectedRating"
                                   [class.hovered]="hoverRating > 0 && i < hoverRating && i >= selectedRating"></i>
                              </span>
                            </div>
                            <div class="rating-feedback mt-2">
                              <span *ngIf="selectedRating > 0" class="badge bg-primary">
                                {{ selectedRating }} star{{ selectedRating > 1 ? 's' : '' }} selected
                              </span>
                              <span *ngIf="selectedRating === 0" class="text-muted">
                                Please select a rating
                              </span>
                            </div>
                            <small class="form-text text-muted">Click on stars to rate ({{ selectedRating || 0 }}/5)</small>
                          </div>

                          <!-- Comment -->
                          <div class="form-group mb-3">
                            <label class="form-label">Comment</label>
                            <textarea class="form-control" 
                                      formControlName="comment" 
                                      rows="4" 
                                      placeholder="Share your experience with Dr. {{ doctor.firstName }} {{ doctor.lastName }}..."
                                      maxlength="1000"></textarea>
                            <small class="form-text text-muted">
                              {{ reviewForm.get('comment')?.value?.length || 0 }}/1000 characters
                            </small>
                          </div>

                          <!-- Form Actions -->
                          <div class="form-actions d-flex gap-2">
                            <button type="submit" 
                                    class="btn btn-primary" 
                                    [disabled]="reviewForm.invalid || selectedRating === 0 || isSubmitting">
                              <span *ngIf="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                              <i *ngIf="!isSubmitting" class="fas fa-save me-2"></i>
                              {{ editingReview ? 'Update Review' : 'Submit Review' }}
                            </button>
                            <button type="button" 
                                    class="btn btn-outline-secondary" 
                                    (click)="cancelReviewForm()"
                                    [disabled]="isSubmitting">
                              Cancel
                            </button>
                            <button type="button" 
                                    *ngIf="editingReview" 
                                    class="btn btn-outline-danger ms-auto" 
                                    (click)="deleteReview()"
                                    [disabled]="isSubmitting">
                              <i class="fas fa-trash me-2"></i>Delete Review
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <!-- My Review (if exists) -->
                  <div *ngIf="myReview && !editingReview" class="my-review mb-4">
                    <div class="card border-success">
                      <div class="card-header bg-success text-white d-flex justify-content-between align-items-center">
                        <h6 class="mb-0"><i class="fas fa-user me-2"></i>Your Review</h6>
                        <button class="btn btn-outline-light btn-sm" (click)="editReview()">
                          <i class="fas fa-edit me-1"></i>Edit
                        </button>
                      </div>
                      <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                          <div class="stars">
                            <i class="fas fa-star text-warning" *ngFor="let star of getStarsArray(myReview.rating)"></i>
                            <i class="far fa-star text-muted" *ngFor="let star of getEmptyStarsArray(myReview.rating)"></i>
                          </div>
                          <small class="text-muted">{{ reviewService.getRelativeTime(myReview.updatedAt) }}</small>
                        </div>
                        <p class="mb-0" *ngIf="myReview.comment">{{ myReview.comment }}</p>
                        <p class="mb-0 text-muted fst-italic" *ngIf="!myReview.comment">No comment provided</p>
                      </div>
                    </div>
                  </div>

                  <!-- Other Reviews -->
                  <div class="reviews-list">
                    <div *ngIf="otherReviews.length > 0">
                      <h6 class="mb-3">Other Patient Reviews</h6>
                      <div class="review-item mb-3 pb-3 border-bottom" 
                           *ngFor="let review of otherReviews; let last = last" 
                           [class.border-bottom]="!last">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <div class="stars mb-1">
                              <i class="fas fa-star text-warning" *ngFor="let star of getStarsArray(review.rating)"></i>
                              <i class="far fa-star text-muted" *ngFor="let star of getEmptyStarsArray(review.rating)"></i>
                            </div>
                            <h6 class="mb-1">{{ review.patientName }}</h6>
                          </div>
                          <small class="text-muted">{{ reviewService.getRelativeTime(review.createdAt) }}</small>
                        </div>
                        <p class="mb-0" *ngIf="review.comment">{{ review.comment }}</p>
                        <p class="mb-0 text-muted fst-italic" *ngIf="!review.comment">No comment provided</p>
                      </div>
                    </div>
                    
                    <!-- No Other Reviews -->
                    <div *ngIf="otherReviews.length === 0 && !myReview" class="text-center py-4">
                      <i class="fas fa-comments text-muted" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                      <p class="text-muted mb-0">No reviews yet. Be the first to share your experience!</p>
                    </div>
                    
                    <div *ngIf="otherReviews.length === 0 && myReview" class="text-center py-3">
                      <p class="text-muted mb-0">No other reviews yet.</p>
                    </div>
                  </div>

                  <!-- Login Prompt for Non-Patients -->
                  <div *ngIf="!isLoggedInPatient" class="login-prompt text-center py-4">
                    <i class="fas fa-sign-in-alt text-muted" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p class="text-muted mb-3">Login as a patient to write reviews</p>
                    <button class="btn btn-outline-primary" (click)="goToLogin()">
                      <i class="fas fa-sign-in-alt me-2"></i>Login
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column - Contact & Location -->
            <div class="col-lg-4">
              <!-- Contact Information -->
              <div class="card mb-4">
                <div class="card-header">
                  <h5 class="mb-0"><i class="fas fa-address-card me-2"></i>Contact Information</h5>
                </div>
                <div class="card-body">
                  <div class="contact-item mb-3" *ngIf="doctor.phone">
                    <div class="d-flex align-items-center">
                      <i class="fas fa-phone text-primary me-3" style="width: 20px;"></i>
                      <div>
                        <small class="text-muted d-block">Phone</small>
                        <span>{{ doctor.phone }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="contact-item mb-3" *ngIf="doctor.email">
                    <div class="d-flex align-items-center">
                      <i class="fas fa-envelope text-primary me-3" style="width: 20px;"></i>
                      <div>
                        <small class="text-muted d-block">Email</small>
                        <span>{{ doctor.email }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Location Information -->
              <div class="card mb-4">
                <div class="card-header">
                  <h5 class="mb-0"><i class="fas fa-map-marker-alt me-2"></i>Location</h5>
                </div>
                <div class="card-body">
                  <div class="location-item mb-3" *ngIf="doctor.address">
                    <div class="d-flex align-items-start">
                      <i class="fas fa-home text-primary me-3 mt-1" style="width: 20px;"></i>
                      <div>
                        <small class="text-muted d-block">Address</small>
                        <span>{{ doctor.address }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="location-item mb-3" *ngIf="doctor.city">
                    <div class="d-flex align-items-center">
                      <i class="fas fa-city text-primary me-3" style="width: 20px;"></i>
                      <div>
                        <small class="text-muted d-block">City</small>
                        <span>{{ doctor.city }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="location-item mb-3" *ngIf="doctor.state">
                    <div class="d-flex align-items-center">
                      <i class="fas fa-map text-primary me-3" style="width: 20px;"></i>
                      <div>
                        <small class="text-muted d-block">State</small>
                        <span>{{ doctor.state }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="location-item" *ngIf="doctor.pincode">
                    <div class="d-flex align-items-center">
                      <i class="fas fa-map-pin text-primary me-3" style="width: 20px;"></i>
                      <div>
                        <small class="text-muted d-block">Pincode</small>
                        <span>{{ doctor.pincode }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Consultation Fee -->
              <div class="card mb-4">
                <div class="card-header">
                  <h5 class="mb-0"><i class="fas fa-rupee-sign me-2"></i>Consultation Fee</h5>
                </div>
                <div class="card-body text-center">
                  <h3 class="text-primary mb-2">₹{{ doctor.consultationFee }}</h3>
                  <p class="text-muted mb-0">Per consultation</p>
                </div>
              </div>

              <!-- Book Appointment Button (Sticky) -->
              <div class="sticky-book-btn">
                <button class="btn btn-primary w-100 btn-lg" (click)="bookAppointment()">
                  <i class="fas fa-calendar-plus me-2"></i>Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .doctor-details-container {
      padding: 2rem 0;
      min-height: calc(100vh - 8rem);
    }

    .doctor-header-card {
      border: none;
      box-shadow: var(--shadow-lg);
      background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
    }

    .doctor-avatar {
      position: relative;
    }

    .doctor-name {
      color: var(--primary-color);
      font-weight: 600;
    }

    .specialization {
      font-size: 1.1rem;
      font-weight: 500;
    }

    .stars i {
      font-size: 1rem;
    }

    .rating-text {
      font-weight: 500;
      color: var(--text-color);
    }

    .card {
      border: none;
      box-shadow: var(--shadow-sm);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-bottom: none;
    }

    .card-header h5 {
      margin-bottom: 0;
    }

    .contact-item, .location-item {
      padding: 0.5rem 0;
    }

    .review-item:last-child {
      border-bottom: none !important;
      margin-bottom: 0 !important;
      padding-bottom: 0 !important;
    }

    .sticky-book-btn {
      position: sticky;
      top: 90px;
      z-index: 10;
    }

    .loading-spinner {
      width: 3rem;
      height: 3rem;
      border: 0.3rem solid rgba(var(--primary-color-rgb), 0.3);
      border-top: 0.3rem solid var(--primary-color);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .badge {
      font-size: 0.85rem;
      padding: 0.5rem 0.75rem;
    }

    /* Review System Styles */
    .star-rating {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .star-wrapper {
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 50%;
      transition: all 0.2s ease;
    }

    .star-wrapper:hover {
      background-color: rgba(255, 193, 7, 0.1);
      transform: scale(1.1);
    }

    .star-icon {
      color: #dee2e6;
      transition: all 0.2s ease;
      pointer-events: none;
    }

    .star-icon.selected {
      color: #ffc107;
    }

    .star-icon.hovered {
      color: #ffc107;
      opacity: 0.7;
    }

    .rating-feedback .badge {
      font-size: 0.875rem;
    }

    .review-form .card {
      box-shadow: var(--shadow-lg);
    }

    .my-review .card {
      box-shadow: var(--shadow-md);
    }

    .review-item {
      transition: background-color 0.3s ease;
      padding: 1rem;
      border-radius: 0.5rem;
    }

    .review-item:hover {
      background-color: #f8f9fa;
    }

    .write-review-prompt {
      background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
      border-radius: 0.5rem;
      border: 1px dashed #667eea;
    }

    .login-prompt {
      background: linear-gradient(135deg, #f1f3f4 0%, #ffffff 100%);
      border-radius: 0.5rem;
    }

    .form-actions {
      padding-top: 1rem;
      border-top: 1px solid #e9ecef;
    }

    .spinner-border-sm {
      width: 1rem;
      height: 1rem;
    }

    .rating-summary .rating-text {
      font-weight: 600;
      font-size: 1.1rem;
    }

    @media (max-width: 768px) {
      .doctor-details-container {
        padding: 1rem 0;
      }

      .doctor-header-card .row {
        text-align: center;
      }

      .doctor-header-card .col-auto,
      .doctor-header-card .col {
        margin-bottom: 1rem;
      }

      .sticky-book-btn {
        position: fixed;
        bottom: 1rem;
        left: 1rem;
        right: 1rem;
        z-index: 1050;
      }

      .star-rating {
        font-size: 1.25rem;
      }

      .form-actions {
        flex-direction: column;
        gap: 0.5rem !important;
      }

      .form-actions .ms-auto {
        margin-left: 0 !important;
      }
    }
  `]
})
export class DoctorDetailsComponent implements OnInit {
  doctor: Doctor | null = null;
  isLoading = true;
  error: string | null = null;

  // Review system properties
  reviews: Review[] = [];
  myReview: Review | null = null;
  otherReviews: Review[] = [];
  reviewStats: ReviewStats = { averageRating: 0, totalReviews: 0 };
  
  // Form and UI state
  reviewForm: FormGroup;
  showReviewForm = false;
  editingReview = false;
  isSubmitting = false;
  selectedRating = 0;
  hoverRating = 0;

  // User state
  isLoggedInPatient = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private authService: AuthService,
    public reviewService: ReviewService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.reviewForm = this.fb.group({
      comment: ['', [Validators.maxLength(1000)]]
    });
  }

  ngOnInit(): void {
    // Check if user is a logged-in patient
    this.isLoggedInPatient = this.authService.isLoggedIn() && this.authService.hasRole('PATIENT');
    
    const doctorId = this.route.snapshot.paramMap.get('id');
    if (doctorId) {
      this.loadDoctorDetails(Number(doctorId));
    } else {
      this.error = 'Invalid doctor ID';
      this.isLoading = false;
    }
  }

  loadDoctorDetails(doctorId: number): void {
    this.isLoading = true;
    this.doctorService.getDoctorById(doctorId).subscribe({
      next: (doctor) => {
        this.doctor = doctor;
        this.isLoading = false;
        console.log('Loaded doctor details:', doctor);
        
        // Load reviews and stats
        this.loadReviews(doctorId);
        this.loadReviewStats(doctorId);
        
        // Load patient's own review if logged in
        if (this.isLoggedInPatient) {
          this.loadMyReview(doctorId);
        }
      },
      error: (error) => {
        console.error('Error loading doctor details:', error);
        this.error = 'Failed to load doctor details. Please try again.';
        this.isLoading = false;
      }
    });
  }

  bookAppointment(): void {
    if (!this.doctor) return;

    // Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      // Store doctor info for after login
      localStorage.setItem('selectedDoctor', JSON.stringify(this.doctor));
      // Redirect to login with return URL
      this.router.navigate(['/auth/login'], { 
        queryParams: { returnUrl: `/patient/doctor-details/${this.doctor.id}`, action: 'book', doctorId: this.doctor.id }
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
      queryParams: { doctorId: this.doctor.id }
    });
  }

  goBack(): void {
    // Check if user is logged in to determine where to go back
    if (this.authService.isLoggedIn()) {
      const user = this.authService.getCurrentUser();
      if (user.role === 'PATIENT') {
        this.router.navigate(['/patient/doctors']);
      } else {
        this.router.navigate(['/patient/doctors']);
      }
    } else {
      this.router.navigate(['/patient/doctors']);
    }
  }

  // Review Management Methods
  loadReviews(doctorId: number): void {
    this.reviewService.getReviewsByDoctorId(doctorId).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.separateReviews();
        console.log('Loaded reviews:', reviews);
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
        this.reviews = [];
      }
    });
  }

  loadMyReview(doctorId: number): void {
    this.reviewService.getMyReviewForDoctor(doctorId).subscribe({
      next: (review) => {
        this.myReview = review;
        this.separateReviews();
        console.log('Loaded my review:', review);
      },
      error: (error) => {
        // No review found - this is normal
        this.myReview = null;
        console.log('No existing review found for this doctor');
      }
    });
  }

  loadReviewStats(doctorId: number): void {
    this.reviewService.getDoctorReviewStats(doctorId).subscribe({
      next: (stats) => {
        this.reviewStats = stats;
        console.log('Loaded review stats:', stats);
      },
      error: (error) => {
        console.error('Error loading review stats:', error);
        this.reviewStats = { averageRating: 0, totalReviews: 0 };
      }
    });
  }

  separateReviews(): void {
    if (!this.reviews) {
      this.otherReviews = [];
      return;
    }

    // Filter out patient's own review from the main reviews list
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && this.myReview) {
      this.otherReviews = this.reviews.filter(review => review.id !== this.myReview?.id);
    } else {
      this.otherReviews = [...this.reviews];
    }
  }

  // Review Form Methods
  setRating(rating: number): void {
    this.selectedRating = rating;
    this.hoverRating = 0; // Reset hover state
    console.log('Rating set to:', rating);
  }

  submitReview(): void {
    console.log('Submit review called!');
    console.log('Doctor:', this.doctor);
    console.log('Selected Rating:', this.selectedRating);
    console.log('Is Submitting:', this.isSubmitting);
    
    if (!this.doctor) {
      console.log('No doctor found');
      return;
    }
    
    if (this.selectedRating === 0) {
      console.log('No rating selected');
      alert('Please select a rating before submitting your review.');
      return;
    }
    
    if (this.isSubmitting) {
      console.log('Already submitting');
      return;
    }

    this.isSubmitting = true;
    const reviewRequest: ReviewRequest = {
      doctorId: this.doctor.id,
      rating: this.selectedRating,
      comment: this.reviewForm.get('comment')?.value || ''
    };

    console.log('Review Request:', reviewRequest);

    const operation = this.editingReview && this.myReview
      ? this.reviewService.updateReview(this.myReview.id, reviewRequest)
      : this.reviewService.createReview(reviewRequest);

    console.log('Starting review operation...');

    operation.subscribe({
      next: (review) => {
        console.log('Review operation successful:', review);
        this.myReview = review;
        this.isSubmitting = false;
        this.showReviewForm = false;
        this.editingReview = false;
        
        const message = this.editingReview ? 'Review updated successfully!' : 'Review submitted successfully!';
        this.notificationService.success('Success', message);
        alert(message); // Temporary alert for immediate feedback
        
        // Refresh data
        this.loadReviews(this.doctor!.id);
        this.loadReviewStats(this.doctor!.id);
      },
      error: (error) => {
        console.error('Error submitting review:', error);
        this.isSubmitting = false;
        
        let errorMessage = 'Failed to submit review. Please try again.';
        if (error.error && typeof error.error === 'string') {
          try {
            const errorObj = JSON.parse(error.error);
            errorMessage = errorObj.error || errorMessage;
          } catch (e) {
            errorMessage = error.error;
          }
        } else if (error.error && error.error.error) {
          errorMessage = error.error.error;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        this.notificationService.error('Error', errorMessage);
        alert('Error: ' + errorMessage); // Temporary alert for immediate feedback
      }
    });
  }

  editReview(): void {
    if (!this.myReview) return;
    
    this.editingReview = true;
    this.showReviewForm = true;
    this.selectedRating = this.myReview.rating;
    this.reviewForm.patchValue({
      comment: this.myReview.comment || ''
    });
  }

  cancelReviewForm(): void {
    this.showReviewForm = false;
    this.editingReview = false;
    this.selectedRating = 0;
    this.hoverRating = 0;
    this.reviewForm.reset();
  }

  deleteReview(): void {
    if (!this.myReview || this.isSubmitting) return;

    if (!confirm('Are you sure you want to delete your review? This action cannot be undone.')) {
      return;
    }

    this.isSubmitting = true;
    this.reviewService.deleteReview(this.myReview.id).subscribe({
      next: () => {
        this.myReview = null;
        this.isSubmitting = false;
        this.showReviewForm = false;
        this.editingReview = false;
        
        this.notificationService.success('Success', 'Review deleted successfully!');
        
        // Refresh data
        this.loadReviews(this.doctor!.id);
        this.loadReviewStats(this.doctor!.id);
        
        console.log('Review deleted successfully');
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error deleting review:', error);
        this.notificationService.error('Error', 'Failed to delete review. Please try again.');
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login'], { 
      queryParams: { returnUrl: this.router.url }
    });
  }

  // Utility Methods
  getReviewCount(doctor: Doctor): number {
    return this.reviewStats.totalReviews || 0;
  }

  getDoctorImageUrl(doctor: any): string {
    // Check if doctor has a profile image URL
    if (doctor?.profileImageUrl) {
      // If it's a relative URL, make it absolute
      if (doctor.profileImageUrl.startsWith('/')) {
        return 'http://10.45.254.162:8081' + doctor.profileImageUrl;
      }
      return doctor.profileImageUrl;
    }
    
    // Fallback to default avatar
    return 'https://via.placeholder.com/100x100/28a745/ffffff?text=Dr.' + (doctor.firstName?.charAt(0) || 'D');
  }

  getStarsArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStarsArray(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}