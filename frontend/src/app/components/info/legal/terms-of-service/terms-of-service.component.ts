import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="legal-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 50%, #f0f8ff 100%);
      min-height: 100vh;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #1e90ff, #4169e1, #1e90ff);
        color: white; padding: 4rem 0;
      ">
        <div class="container text-center">
          <div class="legal-icon" style="
            width: 120px; height: 120px; margin: 0 auto 2rem;
            background: rgba(255, 255, 255, 0.2); border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
          ">
            <i class="fas fa-file-contract" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Terms of Service</h1>
          <p style="font-size: 1.3rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
            Your agreement for using Healthbridge platform and services
          </p>
          <p style="font-size: 1rem; opacity: 0.8; margin-top: 1rem;">
            Last updated: September 21, 2025
          </p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- Introduction -->
        <div class="terms-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #f0f8ff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h2 style="color: #1e90ff; font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">
              Agreement to Terms
            </h2>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
              By accessing and using Healthbridge, you agree to be bound by these Terms of Service. 
              These terms govern your use of our healthcare platform, including appointment booking, 
              consultations, and all related services.
            </p>
          </div>
        </div>

        <!-- User Responsibilities -->
        <div class="terms-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #f0f8ff, #ffffff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #1e90ff; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem;">
              User Responsibilities
            </h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="responsibility-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(30, 144, 255, 0.05); border-radius: 10px;
                  border-left: 4px solid #1e90ff;
                ">
                  <i class="fas fa-check-circle" style="color: #1e90ff; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Provide Accurate Information</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="responsibility-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(30, 144, 255, 0.05); border-radius: 10px;
                  border-left: 4px solid #1e90ff;
                ">
                  <i class="fas fa-user-lock" style="color: #1e90ff; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Maintain Account Security</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="responsibility-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(30, 144, 255, 0.05); border-radius: 10px;
                  border-left: 4px solid #1e90ff;
                ">
                  <i class="fas fa-handshake" style="color: #1e90ff; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Respectful Communication</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="responsibility-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(30, 144, 255, 0.05); border-radius: 10px;
                  border-left: 4px solid #1e90ff;
                ">
                  <i class="fas fa-calendar-check" style="color: #1e90ff; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Honor Appointments</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Platform Rules -->
        <div class="terms-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #f0f8ff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #1e90ff; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem;">
              Platform Usage Rules
            </h3>
            <div class="rules-list">
              <div class="rule-item" style="
                padding: 1.5rem; margin-bottom: 1rem;
                background: rgba(30, 144, 255, 0.05); border-radius: 15px;
                border-left: 4px solid #1e90ff;
              ">
                <h5 style="color: #1e90ff; font-weight: 700; margin-bottom: 0.5rem;">
                  Medical Emergency Disclaimer
                </h5>
                <p style="color: #666; line-height: 1.6;">
                  Healthbridge is not for medical emergencies. In case of emergency, call 911 or visit the nearest emergency room immediately.
                </p>
              </div>
              <div class="rule-item" style="
                padding: 1.5rem; margin-bottom: 1rem;
                background: rgba(30, 144, 255, 0.05); border-radius: 15px;
                border-left: 4px solid #1e90ff;
              ">
                <h5 style="color: #1e90ff; font-weight: 700; margin-bottom: 0.5rem;">
                  Professional Medical Advice
                </h5>
                <p style="color: #666; line-height: 1.6;">
                  All medical advice provided through our platform comes from licensed healthcare professionals. 
                  However, this does not replace in-person medical care when necessary.
                </p>
              </div>
              <div class="rule-item" style="
                padding: 1.5rem; margin-bottom: 1rem;
                background: rgba(30, 144, 255, 0.05); border-radius: 15px;
                border-left: 4px solid #1e90ff;
              ">
                <h5 style="color: #1e90ff; font-weight: 700; margin-bottom: 0.5rem;">
                  Account Usage
                </h5>
                <p style="color: #666; line-height: 1.6;">
                  Your account is for personal use only. Sharing account credentials or using the platform 
                  for commercial purposes without authorization is prohibited.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .responsibility-item:hover, .rights-item:hover {
      transform: translateX(5px);
      background: rgba(30, 144, 255, 0.1) !important;
    }
    
    /* Mobile Responsive Styles */
    @media (max-width: 575.98px) {
      .hero-section {
        padding: 2rem 0 !important;
      }
      
      .legal-icon {
        width: 80px !important;
        height: 80px !important;
        margin-bottom: 1rem !important;
      }
      
      .legal-icon i {
        font-size: 2rem !important;
      }
      
      .hero-section h1 {
        font-size: 2rem !important;
      }
      
      .hero-section p {
        font-size: 1rem !important;
      }
      
      .container {
        padding: 2rem 0 !important;
      }
      
      .terms-section .card-body {
        padding: 1.5rem !important;
      }
      
      .terms-section h2 {
        font-size: 1.75rem !important;
      }
      
      .terms-section h3 {
        font-size: 1.5rem !important;
      }
      
      .responsibility-item {
        padding: 1rem !important;
        margin-bottom: 0.75rem !important;
      }
      
      .rule-item {
        padding: 1rem !important;
        margin-bottom: 0.75rem !important;
      }
      
      .rule-item h5 {
        font-size: 1rem !important;
      }
      
      .rule-item p {
        font-size: 0.9rem !important;
      }
      
      .responsibility-item:hover {
        transform: none !important;
      }
    }
    
    @media (min-width: 576px) and (max-width: 767.98px) {
      .hero-section {
        padding: 3rem 0 !important;
      }
      
      .legal-icon {
        width: 100px !important;
        height: 100px !important;
      }
      
      .legal-icon i {
        font-size: 2.5rem !important;
      }
      
      .hero-section h1 {
        font-size: 2.5rem !important;
      }
      
      .terms-section h2 {
        font-size: 2rem !important;
      }
    }
    
    /* Touch Device Optimizations */
    @media (hover: none) and (pointer: coarse) {
      .responsibility-item:hover {
        transform: none !important;
        background: initial !important;
      }
      
      .responsibility-item:active {
        background: rgba(30, 144, 255, 0.1) !important;
        transform: scale(0.98) !important;
      }
    }
  `]
})
export class TermsOfServiceComponent {}
