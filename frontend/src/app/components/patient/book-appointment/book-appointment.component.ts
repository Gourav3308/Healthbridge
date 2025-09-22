import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppointmentBookingRequest, AppointmentSlot, PaymentOrderResponse, PaymentVerificationRequest } from '../../../models/appointment.model';
import { Doctor } from '../../../models/doctor.model';
import { AppointmentService } from '../../../services/appointment.service';
import { AuthService } from '../../../services/auth.service';
import { DoctorService } from '../../../services/doctor.service';
import { ImageService } from '../../../services/image.service';
import { NotificationService } from '../../../services/notification.service';
import { environment } from '../../../../environments/environment';
import { ScheduleService } from '../../../services/schedule.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

declare var Razorpay: any;

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, FooterComponent, HeaderComponent],
  template: `
    <app-header></app-header>
    
    <div class="booking-container" style="margin-top: 70px;">
      <div class="container">
        <!-- Header -->
        <div class="page-header mb-4">
          <div class="d-flex align-items-center mb-3">
            <button class="btn btn-outline-secondary me-3" (click)="goBack()">
              <i class="fas fa-arrow-left me-2"></i>Back to Doctors
            </button>
            <div>
              <h1 class="mb-1">Book Appointment</h1>
              <p class="text-muted mb-0">Schedule your consultation with the doctor</p>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="loading-container text-center py-5">
          <div class="loading-spinner"></div>
          <p class="text-muted mt-3">Loading doctor information...</p>
        </div>

        <!-- Error State -->
        <div *ngIf="error" class="error-container text-center py-5">
          <i class="fas fa-exclamation-triangle text-warning" style="font-size: 3rem; margin-bottom: 1rem;"></i>
          <h4>Error Loading Doctor</h4>
          <p class="text-muted">{{ error }}</p>
          <button class="btn btn-primary" (click)="goBack()">Back to Doctors</button>
        </div>

        <!-- Booking Form -->
        <div *ngIf="selectedDoctor && !isLoading" class="booking-form">
          <div class="row">
            <!-- Left Column - Doctor Info & Schedule -->
            <div class="col-lg-4">
              <!-- Doctor Information Card -->
              <div class="doctor-card card mb-4">
                <div class="card-body">
                  <div class="doctor-header text-center mb-3">
                    <div class="doctor-avatar mx-auto mb-3">
                      <img [src]="getDoctorImageUrl(selectedDoctor)" 
                           alt="Dr. {{ selectedDoctor.firstName }} {{ selectedDoctor.lastName }}" 
                           class="rounded-circle"
                           style="width: 80px; height: 80px; object-fit: cover; border: 3px solid var(--primary-color);">
                    </div>
                    <h4 class="doctor-name mb-1">Dr. {{ selectedDoctor.firstName }} {{ selectedDoctor.lastName }}</h4>
                    <p class="specialization text-primary mb-2">{{ selectedDoctor.specialization }}</p>
                    <div class="rating mb-3">
                      <i class="fas fa-star text-warning" *ngFor="let star of [1,2,3,4,5]; let i = index"
                         [class.text-muted]="i >= 4"></i>
                      <span class="text-sm text-muted ms-2">(4.0 rating)</span>
                    </div>
                  </div>
                  
                  <div class="doctor-details">
                    <div class="detail-item mb-2">
                      <i class="fas fa-graduation-cap me-2 text-muted"></i>
                      <span>{{ selectedDoctor.experienceYears }} years experience</span>
                    </div>
                    <div class="detail-item mb-2">
                      <i class="fas fa-hospital me-2 text-muted"></i>
                      <span>{{ selectedDoctor.hospitalAffiliation || 'Healthbridge Medical Center' }}</span>
                    </div>
                    <div class="detail-item mb-2">
                      <i class="fas fa-map-marker-alt me-2 text-muted"></i>
                      <span>{{ selectedDoctor.city || 'Healthcare Facility' }}</span>
                    </div>
                    <div class="detail-item mb-3">
                      <i class="fas fa-rupee-sign me-2 text-muted"></i>
                      <span class="fw-bold text-primary">₹{{ selectedDoctor.consultationFee }} consultation</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Selected Appointment Summary -->
              <div class="appointment-summary card" *ngIf="selectedDate && selectedSlot">
                <div class="card-header bg-success text-white">
                  <h6 class="mb-0"><i class="fas fa-calendar-check me-2"></i>Appointment Summary</h6>
                </div>
                <div class="card-body">
                  <div class="summary-item mb-2">
                    <strong>Date:</strong>
                    <span class="ms-2">{{ scheduleService.formatDate(selectedDate) }}</span>
                  </div>
                  <div class="summary-item mb-2">
                    <strong>Time:</strong>
                    <span class="ms-2">{{ scheduleService.formatTimeSlot(selectedSlot.slotTime, selectedSlot.endTime) }}</span>
                  </div>
                  <div class="summary-item mb-2">
                    <strong>Fee:</strong>
                    <span class="ms-2 text-primary fw-bold">₹{{ selectedDoctor.consultationFee }}</span>
                  </div>
                  <div class="summary-item">
                    <strong>Type:</strong>
                    <span class="ms-2">{{ appointmentForm.get('appointmentType')?.value || 'Consultation' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column - Booking Form -->
            <div class="col-lg-8">
              <!-- Step 1: Select Date -->
              <div class="step-card card mb-4">
                <div class="card-header">
                  <h5 class="mb-0">
                    <span class="step-number">1</span>
                    <i class="fas fa-calendar me-2"></i>Select Appointment Date
                  </h5>
                </div>
                <div class="card-body">
                  <div *ngIf="loadingDates" class="text-center py-3">
                    <div class="loading-spinner-sm"></div>
                    <span class="ms-2">Loading available dates...</span>
                  </div>
                  
                  <div *ngIf="!loadingDates && availableDates.length > 0" class="date-selection">
                    <div class="row">
                      <div class="col-md-3 col-sm-4 col-6 mb-3" *ngFor="let date of availableDates">
                        <div class="date-card" 
                             [class.selected]="selectedDate === date"
                             (click)="selectDate(date)">
                          <div class="date-info">
                            <div class="day-name">{{ scheduleService.getRelativeDate(date) }}</div>
                            <div class="date-number">{{ getDateNumber(date) }}</div>
                            <div class="month-name">{{ getMonthName(date) }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div *ngIf="!loadingDates && availableDates.length === 0" class="text-center py-4">
                    <i class="fas fa-calendar-times text-muted" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p class="text-muted">No available dates found for this doctor.</p>
                  </div>
                </div>
              </div>

              <!-- Step 2: Select Time Slot -->
              <div class="step-card card mb-4" *ngIf="selectedDate">
                <div class="card-header">
                  <h5 class="mb-0">
                    <span class="step-number">2</span>
                    <i class="fas fa-clock me-2"></i>Select Time Slot
                  </h5>
                </div>
                <div class="card-body">
                  <div *ngIf="loadingSlots" class="text-center py-3">
                    <div class="loading-spinner-sm"></div>
                    <span class="ms-2">Loading available time slots...</span>
                  </div>
                  
                  <div *ngIf="!loadingSlots && availableSlots.length > 0" class="time-slots">
                    <div class="row">
                      <div class="col-lg-3 col-md-4 col-sm-6 mb-3" *ngFor="let slot of availableSlots">
                        <div class="time-slot" 
                             [class.selected]="selectedSlot?.id === slot.id"
                             (click)="selectSlot(slot)">
                          <div class="time-info">
                            <div class="time-display">{{ scheduleService.formatTime(slot.slotTime) }}</div>
                            <div class="duration-info">30 min</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div *ngIf="!loadingSlots && availableSlots.length === 0 && selectedDate" class="text-center py-4">
                    <i class="fas fa-clock text-muted" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p class="text-muted">No available time slots for the selected date.</p>
                  </div>
                </div>
              </div>

              <!-- Step 3: Patient Information -->
              <div class="step-card card mb-4" *ngIf="selectedDate && selectedSlot">
                <div class="card-header">
                  <h5 class="mb-0">
                    <span class="step-number">3</span>
                    <i class="fas fa-user me-2"></i>Patient Information
                  </h5>
                </div>
                <div class="card-body">
                  <form [formGroup]="appointmentForm">
                    <div class="row">
                      <!-- Patient Name (Read-only) -->
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Patient Name</label>
                        <input type="text" class="form-control" [value]="getPatientDisplayName()" readonly>
                      </div>
                      
                      <!-- Contact Number -->
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Contact Number <span class="text-danger">*</span></label>
                        <input type="tel" class="form-control" formControlName="patientPhone"
                               [class.is-invalid]="isFieldInvalid('patientPhone')"
                               placeholder="Your contact number">
                        <div class="invalid-feedback" *ngIf="isFieldInvalid('patientPhone')">
                          Please enter a valid 10-digit phone number starting with 6-9
                        </div>
                      </div>

                      <!-- Email Address -->
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Email Address <span class="text-danger">*</span></label>
                        <input type="email" class="form-control" formControlName="patientEmail"
                               [class.is-invalid]="isFieldInvalid('patientEmail')"
                               placeholder="Your email address">
                        <div class="invalid-feedback" *ngIf="isFieldInvalid('patientEmail')">
                          Please enter a valid email address
                        </div>
                      </div>

                      <!-- Emergency Contact -->
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Emergency Contact</label>
                        <input type="tel" class="form-control" formControlName="emergencyContact"
                               [class.is-invalid]="appointmentForm.get('emergencyContact')?.invalid && appointmentForm.get('emergencyContact')?.touched"
                               placeholder="Emergency contact number (optional)">
                        <div class="invalid-feedback">
                          <span *ngIf="appointmentForm.get('emergencyContact')?.errors?.['invalidPhone']">
                            Please enter a valid 10-digit phone number starting with 6-9
                          </span>
                        </div>
                      </div>

                      <!-- Appointment Type -->
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Appointment Type <span class="text-danger">*</span></label>
                        <select class="form-control" formControlName="appointmentType">
                          <option value="CONSULTATION">General Consultation</option>
                          <option value="FOLLOW_UP">Follow-up Visit</option>
                          <option value="CHECKUP">Health Checkup</option>
                          <option value="EMERGENCY">Emergency Consultation</option>
                        </select>
                      </div>

                      <!-- First Visit -->
                      <div class="col-12 mb-3">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" formControlName="isFirstVisit" id="firstVisit">
                          <label class="form-check-label" for="firstVisit">
                            This is my first visit to this doctor
                          </label>
                        </div>
                      </div>

                      <!-- Reason for Visit -->
                      <div class="col-12 mb-3">
                        <label class="form-label">Reason for Visit <span class="text-danger">*</span></label>
                        <textarea class="form-control" formControlName="reasonForVisit" rows="3"
                                  [class.is-invalid]="appointmentForm.get('reasonForVisit')?.invalid && appointmentForm.get('reasonForVisit')?.touched"
                                  placeholder="Please describe your symptoms or reason for consultation in detail (minimum 10 characters, at least 2 words)"
                                  maxlength="500"></textarea>
                        <div class="invalid-feedback">
                          <span *ngIf="appointmentForm.get('reasonForVisit')?.errors?.['required']">
                            Please provide a reason for your visit
                          </span>
                          <span *ngIf="appointmentForm.get('reasonForVisit')?.errors?.['tooShort'] || appointmentForm.get('reasonForVisit')?.errors?.['minlength']">
                            Please provide at least 10 characters describing your reason for visit
                          </span>
                          <span *ngIf="appointmentForm.get('reasonForVisit')?.errors?.['insufficientWords']">
                            Please provide at least 2 words describing your medical concern
                          </span>
                          <span *ngIf="appointmentForm.get('reasonForVisit')?.errors?.['repeatedChars']">
                            Please avoid repeated characters and provide a meaningful description
                          </span>
                          <span *ngIf="appointmentForm.get('reasonForVisit')?.errors?.['gibberish']">
                            Please provide a clear, meaningful description of your medical concern (avoid random text)
                          </span>
                          <span *ngIf="appointmentForm.get('reasonForVisit')?.errors?.['noMeaningfulWords']">
                            Please use proper words to describe your medical concern
                          </span>
                          <span *ngIf="appointmentForm.get('reasonForVisit')?.errors?.['vagueReason']">
                            Please provide a specific medical reason (e.g., "chest pain", "fever", "headache") rather than vague statements
                          </span>
                        </div>
                        <small class="form-text text-muted">
                          {{ appointmentForm.get('reasonForVisit')?.value?.length || 0 }}/500 characters
                        </small>
                      </div>

                      <!-- Symptoms (Optional) -->
                      <div class="col-12 mb-3">
                        <label class="form-label">Current Symptoms (Optional)</label>
                        <textarea class="form-control" formControlName="symptoms" rows="3"
                                  [class.is-invalid]="appointmentForm.get('symptoms')?.invalid && appointmentForm.get('symptoms')?.touched"
                                  placeholder="Describe any current symptoms you're experiencing"
                                  maxlength="1000"></textarea>
                        <div class="invalid-feedback">
                          <span *ngIf="appointmentForm.get('symptoms')?.errors?.['repeatedChars']">
                            Please avoid repeated characters and provide a meaningful description
                          </span>
                          <span *ngIf="appointmentForm.get('symptoms')?.errors?.['gibberish']">
                            Please provide a clear, meaningful description of your symptoms
                          </span>
                        </div>
                        <small class="form-text text-muted">
                          {{ appointmentForm.get('symptoms')?.value?.length || 0 }}/1000 characters
                        </small>
                      </div>

                      <!-- Medical History (Optional) -->
                      <div class="col-12 mb-3">
                        <label class="form-label">Relevant Medical History (Optional)</label>
                        <textarea class="form-control" formControlName="medicalHistory" rows="3"
                                  [class.is-invalid]="appointmentForm.get('medicalHistory')?.invalid && appointmentForm.get('medicalHistory')?.touched"
                                  placeholder="Any relevant medical history, allergies, current medications, etc."
                                  maxlength="1000"></textarea>
                        <div class="invalid-feedback">
                          <span *ngIf="appointmentForm.get('medicalHistory')?.errors?.['repeatedChars']">
                            Please avoid repeated characters and provide a meaningful description
                          </span>
                          <span *ngIf="appointmentForm.get('medicalHistory')?.errors?.['gibberish']">
                            Please provide a clear, meaningful description of your medical history
                          </span>
                        </div>
                        <small class="form-text text-muted">
                          {{ appointmentForm.get('medicalHistory')?.value?.length || 0 }}/1000 characters
                        </small>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <!-- Step 4: Payment & Confirmation -->
              <div class="step-card card mb-4" *ngIf="selectedDate && selectedSlot">
                <div class="card-header">
                  <h5 class="mb-0">
                    <span class="step-number">4</span>
                    <i class="fas fa-credit-card me-2"></i>Payment & Confirmation
                  </h5>
                </div>
                <div class="card-body">
                  <!-- Payment Summary -->
                  <div class="payment-summary mb-4">
                    <h6 class="mb-3">Payment Summary</h6>
                    <div class="row">
                      <div class="col-8">
                        <div class="fee-item d-flex justify-content-between mb-2">
                          <span>Consultation Fee:</span>
                          <span>₹{{ selectedDoctor.consultationFee }}</span>
                        </div>
                        <div class="fee-item d-flex justify-content-between mb-2">
                          <span>Platform Fee:</span>
                          <span>₹0</span>
                        </div>
                        <div class="fee-item d-flex justify-content-between mb-2">
                          <span>Taxes:</span>
                          <span>₹0</span>
                        </div>
                        <hr>
                        <div class="fee-total d-flex justify-content-between">
                          <strong>Total Amount:</strong>
                          <strong class="text-primary">₹{{ selectedDoctor.consultationFee }}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Terms & Conditions -->
                  <div class="terms-section mb-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" [(ngModel)]="termsAccepted" id="terms">
                      <label class="form-check-label" for="terms">
                        I agree to the <a href="#" class="text-primary">Terms & Conditions</a> and <a href="#" class="text-primary">Privacy Policy</a>
                      </label>
                    </div>
                  </div>

                  <!-- Form Validation Messages -->
                  <div class="validation-messages mb-3" *ngIf="showValidationErrors">
                    <div class="alert alert-warning">
                      <h6><i class="fas fa-exclamation-triangle me-2"></i>Please complete the following:</h6>
                      <ul class="mb-0">
                        <li *ngIf="isFieldInvalid('patientPhone')">Valid contact number (10 digits starting with 6-9)</li>
                        <li *ngIf="isFieldInvalid('patientEmail')">Valid email address</li>
                        <li *ngIf="appointmentForm.get('emergencyContact')?.errors?.['invalidPhone']">Valid emergency contact number (10 digits starting with 6-9)</li>
                        <li *ngIf="appointmentForm.get('reasonForVisit')?.invalid">Meaningful reason for visit (at least 10 characters, 2 words)</li>
                        <li *ngIf="appointmentForm.get('symptoms')?.invalid">Clear description of symptoms (avoid gibberish)</li>
                        <li *ngIf="appointmentForm.get('medicalHistory')?.invalid">Clear description of medical history (avoid gibberish)</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Book Appointment Button -->
                  <div class="booking-actions">
                    <button class="btn btn-primary btn-lg w-100" 
                            [disabled]="!termsAccepted || isBooking || appointmentForm.invalid"
                            (click)="proceedToPayment()">
                      <span *ngIf="isBooking" class="spinner-border spinner-border-sm me-2"></span>
                      <i *ngIf="!isBooking" class="fas fa-credit-card me-2"></i>
                      {{ isBooking ? 'Processing...' : 'Proceed to Payment' }}
                    </button>
                    
                    <!-- Validation Message -->
                    <div class="mt-2" *ngIf="!termsAccepted || (appointmentForm.invalid && (appointmentForm.get('patientPhone')?.touched || appointmentForm.get('reasonForVisit')?.touched))">
                      <small class="text-muted">
                        <i class="fas fa-info-circle me-1"></i>
                        {{ !termsAccepted ? 'Please accept terms & conditions' : 'Please fill all required fields correctly' }}
                      </small>
                    </div>
                    
                    <p class="text-center mt-2 mb-0">
                      <small class="text-muted">
                        <i class="fas fa-shield-alt me-1"></i>
                        Secure payment powered by Razorpay
                      </small>
                    </p>
                  </div>
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
    .booking-container {
      padding: 2rem 0;
      min-height: calc(100vh - 8rem);
    }

    .doctor-card {
      border: none;
      box-shadow: var(--shadow-lg);
      position: sticky;
      top: 2rem;
    }

    .doctor-avatar {
      width: 80px;
      height: 80px;
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

    .step-card {
      border: none;
      box-shadow: var(--shadow-md);
      margin-bottom: 1.5rem;
    }

    .step-card .card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-bottom: none;
    }

    .step-number {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      margin-right: 0.5rem;
      font-weight: bold;
      font-size: 0.875rem;
    }

    .date-selection {
      max-height: 300px;
      overflow-y: auto;
    }

    .date-card {
      border: 2px solid #e9ecef;
      border-radius: 12px;
      padding: 1rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      background: white;
    }

    .date-card:hover {
      border-color: #667eea;
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .date-card.selected {
      border-color: #667eea;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .date-info .day-name {
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      opacity: 0.8;
    }

    .date-info .date-number {
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0.25rem 0;
    }

    .date-info .month-name {
      font-size: 0.75rem;
      opacity: 0.8;
    }

    .time-slots {
      max-height: 300px;
      overflow-y: auto;
    }

    .time-slot {
      border: 2px solid #e9ecef;
      border-radius: 8px;
      padding: 0.75rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      background: white;
    }

    .time-slot:hover {
      border-color: #667eea;
      transform: translateY(-1px);
      box-shadow: var(--shadow-sm);
    }

    .time-slot.selected {
      border-color: #667eea;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .time-info .time-display {
      font-weight: bold;
      font-size: 1rem;
    }

    .time-info .duration-info {
      font-size: 0.75rem;
      opacity: 0.8;
      margin-top: 0.25rem;
    }

    .appointment-summary {
      position: sticky;
      top: 20rem;
    }

    .summary-item {
      padding: 0.5rem 0;
    }

    .payment-summary {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
    }

    .fee-item {
      padding: 0.5rem 0;
    }

    .fee-total {
      font-size: 1.1rem;
      padding: 0.75rem 0;
    }

    .terms-section {
      background: #fff3cd;
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid #ffeaa7;
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

    .loading-spinner-sm {
      width: 1.5rem;
      height: 1.5rem;
      border: 0.2rem solid rgba(var(--primary-color-rgb), 0.3);
      border-top: 0.2rem solid var(--primary-color);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      display: inline-block;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .detail-item {
      font-size: 0.9rem;
    }

    .validation-messages .alert {
      border-radius: 8px;
      border: 1px solid #ffeaa7;
    }

    .validation-messages ul {
      margin-bottom: 0;
      padding-left: 1.5rem;
    }

    .validation-messages li {
      margin-bottom: 0.25rem;
    }

    .booking-actions button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .booking-container {
        padding: 1rem 0;
      }

      .doctor-card,
      .appointment-summary {
        position: static;
        margin-bottom: 1rem;
      }

      .date-card,
      .time-slot {
        margin-bottom: 0.5rem;
      }
    }
  `]
})
export class BookAppointmentComponent implements OnInit {
  selectedDoctor: Doctor | null = null;
  currentUser: any;
  appointmentForm: FormGroup;
  
  // Scheduling data
  availableDates: string[] = [];
  availableSlots: AppointmentSlot[] = [];
  selectedDate: string | null = null;
  selectedSlot: AppointmentSlot | null = null;
  
  // UI state
  isLoading = false;
  loadingDates = false;
  loadingSlots = false;
  isBooking = false;
  error: string | null = null;
  termsAccepted = false;
  showValidationErrors = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    public scheduleService: ScheduleService,
    private authService: AuthService,
    private imageService: ImageService,
    private notificationService: NotificationService
  ) {
    this.appointmentForm = this.fb.group({
      patientPhone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      patientEmail: ['', [Validators.required, Validators.email]],
      emergencyContact: ['', [this.optionalPhoneValidator]],
      appointmentType: ['CONSULTATION', Validators.required],
      isFirstVisit: [true],
      reasonForVisit: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500), this.meaningfulTextValidator]],
      symptoms: ['', [Validators.maxLength(1000), this.optionalMeaningfulTextValidator]],
      medicalHistory: ['', [Validators.maxLength(1000), this.optionalMeaningfulTextValidator]]
    });
  }

  // Custom validator for meaningful text (prevents gibberish)
  meaningfulTextValidator = (control: any) => {
    if (!control.value) return null;
    
    const text = control.value.trim();
    if (text.length < 10) return { tooShort: true };
    
    // Check for repeated characters (more than 2 consecutive)
    if (/(.)\1{2,}/.test(text)) {
      return { repeatedChars: true };
    }
    
    // Enhanced gibberish detection patterns - more comprehensive
    const gibberishPatterns = [
      /^[a-z]{1,3}$/i, // Too short single words
      /^[qwertyuiop]+$/i, // Keyboard row patterns
      /^[asdfghjkl]+$/i,
      /^[zxcvbnm]+$/i,
      /^[0-9]+$/, // Only numbers
      /^[!@#$%^&*()]+$/, // Only special characters
      
      // Specific patterns from screenshots - exact matches
      /amhhugfh/i, // Contains "amhhugfh"
      /byvvg/i, // Contains "byvvg"
      /kjfdhksfksdhfkskhfheskhfnfkd/i, // Contains long gibberish
      /nndnkjdkj/i, // Contains "nndnkjdkj"
      
      // More general patterns
      /^[a-z]{2}\s[a-z]{2}$/i, // Two short words pattern like "hi bh"
      /^[bcdfghjklmnpqrstvwxyz]{4,}/i, // 4+ consecutive consonants
      /([a-z])\1{2,}/i, // 3+ repeated characters anywhere
      /^[a-z]{1,4}\s[a-z]{1,4}$/i, // Two very short words
    ];
    
    if (gibberishPatterns.some(pattern => pattern.test(text))) {
      return { gibberish: true };
    }
    
    // Check for minimum meaningful words (must contain common medical terms or be descriptive)
    const words = text.split(/\s+/).filter((word: string) => word.length > 1);
    if (words.length < 2) {
      return { insufficientWords: true };
    }
    
    // Check for non-medical/vague phrases but allow valid medical terms
    const medicalTerms = [
      'fever', 'pain', 'headache', 'cough', 'cold', 'flu', 'nausea', 'vomiting', 'diarrhea',
      'chest', 'stomach', 'back', 'neck', 'joint', 'muscle', 'bone', 'skin', 'rash',
      'breathing', 'shortness', 'difficulty', 'swelling', 'infection', 'allergy',
      'diabetes', 'hypertension', 'blood', 'pressure', 'heart', 'cardiac', 'asthma',
      'migraine', 'injury', 'wound', 'cut', 'burn', 'fracture', 'sprain', 'strain',
      'checkup', 'consultation', 'followup', 'follow-up', 'medication', 'prescription',
      'symptoms', 'treatment', 'diagnosis', 'examination', 'screening', 'test', 'results'
    ];
    
    const hasMedicalTerms = medicalTerms.some(term => 
      new RegExp(`\\b${term}\\b`, 'i').test(text)
    );
    
    // Only check for vague patterns if there are no medical terms
    if (!hasMedicalTerms) {
      const vaguePatterns = [
        /^want\s+to\s+meet$/i,
        /^want\s+to\s+see$/i,
        /^just\s+checking$/i,
        /^general\s+check$/i,
        /^routine\s+visit$/i,
        /^hello\s+doctor$/i,
        /^hi\s+doctor$/i,
        /^need\s+help$/i,
        /^feeling\s+bad$/i,
        /^not\s+well$/i,
        /^want\s+to\s+meet\s+you$/i,
        /^want\s+to\s+see\s+you$/i,
      ];
      
      if (vaguePatterns.some(pattern => pattern.test(text))) {
        return { vagueReason: true };
      }
    }
    
    // Check if all words are too short or gibberish-like
    const meaningfulWords = words.filter((word: string) => {
      // A word is meaningful if it's longer than 3 chars and not pure gibberish
      return word.length > 3 && !/^([a-z])\1+$/i.test(word) && !/^[bcdfghjklmnpqrstvwxyz]+$/i.test(word);
    });
    
    if (meaningfulWords.length === 0) {
      return { noMeaningfulWords: true };
    }
    
    // Check consonant/vowel ratio for each word
    for (const word of words) {
      if (word.length > 4) {
        const consonants = (word.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length;
        const vowels = (word.match(/[aeiou]/gi) || []).length;
        const ratio = consonants / (consonants + vowels || 1);
        
        if (ratio > 0.85 || vowels === 0) { // Too many consonants or no vowels
          return { gibberish: true };
        }
      }
    }
    
    return null;
  }

  // Optional validator for symptoms and medical history
  optionalMeaningfulTextValidator = (control: any) => {
    if (!control.value || control.value.trim().length === 0) {
      return null; // Optional field
    }
    
    const text = control.value.trim();
    if (text.length < 5) return null; // Too short to validate
    
    // Same checks as above but more lenient for optional fields
    if (/(.)\1{3,}/.test(text)) {
      return { repeatedChars: true };
    }
    
    const gibberishPatterns = [
      /^[qwertyuiop]+$/i,
      /^[asdfghjkl]+$/i,
      /^[zxcvbnm]+$/i,
      /^[!@#$%^&*()]+$/,
      /^[fjbdjkbdjkbdjkbfjb]+$/i, // Specific pattern from screenshot
      /^([a-z]{1,2})\1{2,}$/i, // Repeated sequences
    ];
    
    if (gibberishPatterns.some(pattern => pattern.test(text))) {
      return { gibberish: true };
    }
    
    // Check for alternating patterns
    if (/^([a-z])\1*([a-z])\2*\1+\2*$/i.test(text)) {
      return { gibberish: true };
    }
    
    return null;
  }

  // Optional phone validator
  optionalPhoneValidator = (control: any) => {
    if (!control.value || control.value.trim().length === 0) {
      return null; // Optional field
    }
    
    const phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(control.value)) {
      return { invalidPhone: true };
    }
    
    return null;
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    
    // Get doctor ID from query parameters first
    const doctorId = this.route.snapshot.queryParamMap.get('doctorId');
    if (doctorId) {
      this.loadDoctorDetails(Number(doctorId));
    } else {
      this.error = 'Doctor not specified';
    }
    
    // Pre-fill patient phone and email if available - do this after a slight delay
    setTimeout(() => {
      if (this.currentUser?.phone) {
        this.appointmentForm.patchValue({
          patientPhone: this.currentUser.phone
        }, { emitEvent: false });
        // Reset validation state
        this.appointmentForm.get('patientPhone')?.markAsUntouched();
        this.appointmentForm.get('patientPhone')?.markAsPristine();
        this.appointmentForm.get('patientPhone')?.setErrors(null);
      }
      
      if (this.currentUser?.email) {
        this.appointmentForm.patchValue({
          patientEmail: this.currentUser.email
        }, { emitEvent: false });
        // Reset validation state
        this.appointmentForm.get('patientEmail')?.markAsUntouched();
        this.appointmentForm.get('patientEmail')?.markAsPristine();
        this.appointmentForm.get('patientEmail')?.setErrors(null);
      }
    }, 100);
  }

  // Helper method to check if a field should show validation error
  isFieldInvalid(fieldName: string): boolean {
    const field = this.appointmentForm.get(fieldName);
    if (!field) return false;
    
    // Don't show validation errors for pre-filled valid data
    if (!field.dirty && field.value) {
      // Check if the current value is actually valid
      if (fieldName === 'patientPhone') {
        return field.invalid && field.touched && !/^[6-9]\d{9}$/.test(field.value);
      }
      if (fieldName === 'patientEmail') {
        return field.invalid && field.touched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
      }
    }
    
    return field.invalid && field.touched;
  }

  loadDoctorDetails(doctorId: number): void {
    this.isLoading = true;
    this.doctorService.getDoctorById(doctorId).subscribe({
      next: (doctor) => {
        this.selectedDoctor = doctor;
        this.isLoading = false;
        this.loadAvailableDates(doctorId);
      },
      error: (error) => {
        console.error('Error loading doctor details:', error);
        this.error = 'Failed to load doctor details';
        this.isLoading = false;
      }
    });
  }

  loadAvailableDates(doctorId: number): void {
    this.loadingDates = true;
    this.scheduleService.getAvailableDates(doctorId).subscribe({
      next: (response) => {
        this.availableDates = response.availableDates;
        this.loadingDates = false;
        console.log('Available dates loaded:', response);
      },
      error: (error) => {
        console.error('Error loading available dates:', error);
        this.loadingDates = false;
        this.notificationService.error('Error', 'Failed to load available dates');
      }
    });
  }

  selectDate(date: string): void {
    console.log('Date selected:', date);
    this.selectedDate = date;
    this.selectedSlot = null; // Reset slot selection
    this.loadAvailableSlots(this.selectedDoctor!.id, date);
  }

  loadAvailableSlots(doctorId: number, date: string): void {
    this.loadingSlots = true;
    console.log('Loading slots for doctor:', doctorId, 'date:', date);
    
    this.scheduleService.getAvailableSlots(doctorId, date).subscribe({
      next: (response) => {
        console.log('Available slots API response:', response);
        this.availableSlots = response.availableSlots;
        this.loadingSlots = false;
        console.log('Available slots loaded:', this.availableSlots.length, 'slots');
      },
      error: (error) => {
        console.error('Error loading available slots:', error);
        console.error('API URL:', `${environment.apiUrl}/doctor-schedule/doctor/${doctorId}/available-slots?date=${date}`);
        this.loadingSlots = false;
        this.notificationService.error('Error', 'Failed to load available time slots');
      }
    });
  }

  selectSlot(slot: AppointmentSlot): void {
    this.selectedSlot = slot;
  }

  proceedToPayment(): void {
    // Show validation errors only when user tries to proceed
    this.showValidationErrors = true;
    this.appointmentForm.markAllAsTouched();
    
    if (!this.selectedDoctor || !this.selectedSlot || !this.appointmentForm.valid || !this.termsAccepted) {
      return;
    }
    
    // Hide validation errors when form is valid
    this.showValidationErrors = false;

    this.isBooking = true;

    const bookingRequest: AppointmentBookingRequest = {
      doctorId: this.selectedDoctor.id,
      slotId: this.selectedSlot.id,
      reasonForVisit: this.appointmentForm.get('reasonForVisit')?.value,
      symptoms: this.appointmentForm.get('symptoms')?.value,
      appointmentType: this.appointmentForm.get('appointmentType')?.value,
      isFirstVisit: this.appointmentForm.get('isFirstVisit')?.value,
      patientPhone: this.appointmentForm.get('patientPhone')?.value,
      patientEmail: this.appointmentForm.get('patientEmail')?.value,
      emergencyContact: this.appointmentForm.get('emergencyContact')?.value,
      medicalHistory: this.appointmentForm.get('medicalHistory')?.value
    };

    console.log('Creating payment order:', bookingRequest);
    console.log('Selected doctor:', this.selectedDoctor);
    console.log('Selected slot:', this.selectedSlot);
    console.log('Form valid:', this.appointmentForm.valid);
    console.log('Form errors:', this.appointmentForm.errors);

    this.appointmentService.createPaymentOrder(bookingRequest).subscribe({
      next: (response) => {
        console.log('Payment order created:', response);
        this.isBooking = false;
        this.initiateRazorpayPayment(response);
      },
      error: (error) => {
        console.error('Error creating payment order:', error);
        console.error('Error details:', error.error);
        console.error('Error status:', error.status);
        this.isBooking = false;
        
        let errorMessage = 'Failed to create payment order. Please try again.';
        if (error.error && error.error.error) {
          errorMessage = error.error.error;
        }
        
        this.notificationService.error('Error', errorMessage);
      }
    });
  }

  initiateRazorpayPayment(paymentData: PaymentOrderResponse): void {
    const options = {
      key: paymentData.paymentOrder.keyId,
      amount: paymentData.paymentOrder.amount,
      currency: paymentData.paymentOrder.currency,
      order_id: paymentData.paymentOrder.orderId,
      name: 'Healthbridge Medical Center',
      description: `Consultation with ${paymentData.doctorName}`,
      image: '/assets/logo.png',
      prefill: {
        name: this.currentUser.firstName + ' ' + this.currentUser.lastName,
        email: this.currentUser.email,
        contact: this.appointmentForm.get('patientPhone')?.value
      },
      theme: {
        color: '#667eea'
      },
      modal: {
        ondismiss: () => {
          console.log('Payment modal dismissed');
          this.notificationService.error('Payment Cancelled', 'Payment was cancelled. Your appointment slot is still reserved for 10 minutes.');
        }
      },
      handler: (response: any) => {
        console.log('Payment successful:', response);
        this.verifyAndConfirmPayment(response, paymentData);
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  verifyAndConfirmPayment(razorpayResponse: any, paymentData: PaymentOrderResponse): void {
    const verificationRequest: PaymentVerificationRequest = {
      razorpayOrderId: paymentData.paymentOrder.orderId,
      razorpayPaymentId: razorpayResponse.razorpay_payment_id,
      razorpaySignature: razorpayResponse.razorpay_signature,
      slotId: this.selectedSlot?.id,
      doctorId: this.selectedDoctor?.id,
      reasonForVisit: this.appointmentForm.get('reasonForVisit')?.value,
      symptoms: this.appointmentForm.get('symptoms')?.value,
      appointmentType: this.appointmentForm.get('appointmentType')?.value,
      isFirstVisit: this.appointmentForm.get('isFirstVisit')?.value,
      patientPhone: this.appointmentForm.get('patientPhone')?.value,
      patientEmail: this.appointmentForm.get('patientEmail')?.value,
      emergencyContact: this.appointmentForm.get('emergencyContact')?.value,
      medicalHistory: this.appointmentForm.get('medicalHistory')?.value
    };

    console.log('Verifying payment:', verificationRequest);

    this.appointmentService.verifyPayment(verificationRequest).subscribe({
      next: (response) => {
        console.log('Payment verified:', response);
        
        if (response.success) {
          // Show professional success message
          this.notificationService.success(
            '🎉 Payment Successful!', 
            'Your payment has been processed successfully. Please check your registered email for appointment confirmation once the doctor approves your booking. Thank you for choosing HealthBridge!'
          );
          
          // Show additional professional message
          setTimeout(() => {
            this.notificationService.info(
              '📧 Email Notification', 
              'A confirmation email will be sent to your registered email address once the doctor reviews and approves your appointment. Please check your inbox and spam folder.'
            );
          }, 1000);
          
          // Redirect after showing messages
          setTimeout(() => {
            this.router.navigate(['/patient/appointments'], {
              queryParams: { appointmentId: response.appointmentId }
            });
          }, 4000);
        } else {
          this.notificationService.error('Payment Failed', 'Payment verification failed. Please contact support if the amount was deducted.');
        }
      },
      error: (error) => {
        console.error('Error verifying payment:', error);
        this.notificationService.error('Error', 'Payment verification failed. Please contact support.');
      }
    });
  }

  goBack(): void {
    if (this.selectedDoctor) {
      this.router.navigate(['/patient/doctor-details', this.selectedDoctor.id]);
    } else {
      this.router.navigate(['/patient/doctors']);
    }
  }

  getDoctorImageUrl(doctor: Doctor): string {
    return this.imageService.getFullImageUrl(doctor?.profileImageUrl);
  }

  getDateNumber(dateString: string): string {
    const date = new Date(dateString);
    return date.getDate().toString();
  }

  getMonthName(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short' });
  }

  getPatientDisplayName(): string {
    if (this.currentUser?.firstName && this.currentUser?.lastName) {
      return `${this.currentUser.firstName} ${this.currentUser.lastName}`;
    } else if (this.currentUser?.email) {
      // Extract name from email as fallback
      const emailName = this.currentUser.email.split('@')[0];
      return emailName.replace(/[._]/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
    }
    return 'Patient';
  }

}