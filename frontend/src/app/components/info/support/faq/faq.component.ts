import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="faq-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #fff8f0 0%, #ffeedd 50%, #fff8f0 100%);
      min-height: 100vh;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #f39c12, #e67e22, #f39c12);
        color: white; padding: 4rem 0;
      ">
        <div class="container text-center">
          <div class="faq-icon" style="
            width: 120px; height: 120px; margin: 0 auto 2rem;
            background: rgba(255, 255, 255, 0.2); border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
          ">
            <i class="fas fa-question-circle" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Frequently Asked Questions</h1>
          <p style="font-size: 1.3rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
            Find answers to common questions about Healthbridge services
          </p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- General Questions -->
        <div class="faq-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #fff8f0);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #f39c12; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              General Questions
            </h3>
            <div class="faq-item" style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(243, 156, 18, 0.05); border-radius: 15px;">
              <h5 style="color: #f39c12; font-weight: 700; margin-bottom: 1rem;">
                <i class="fas fa-question me-2"></i>What is Healthbridge?
              </h5>
              <p style="color: #666; line-height: 1.6;">
                Healthbridge is India's leading digital healthcare platform that connects patients with verified doctors. 
                We offer online appointment booking, digital consultations, prescription management, and comprehensive healthcare services.
              </p>
            </div>
            <div class="faq-item" style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(243, 156, 18, 0.05); border-radius: 15px;">
              <h5 style="color: #f39c12; font-weight: 700; margin-bottom: 1rem;">
                <i class="fas fa-question me-2"></i>How do I create an account?
              </h5>
              <p style="color: #666; line-height: 1.6;">
                Click "Register" in the top navigation, choose your role (Patient or Doctor), fill in your details, 
                and verify your email address. For doctors, additional verification is required before approval.
              </p>
            </div>
            <div class="faq-item" style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(243, 156, 18, 0.05); border-radius: 15px;">
              <h5 style="color: #f39c12; font-weight: 700; margin-bottom: 1rem;">
                <i class="fas fa-question me-2"></i>Is my health data secure?
              </h5>
              <p style="color: #666; line-height: 1.6;">
                Yes, we use 256-bit encryption, HIPAA-compliant servers, and strict access controls to protect your health data. 
                Your privacy and security are our top priorities.
              </p>
            </div>
          </div>
        </div>

        <!-- Appointment Questions -->
        <div class="faq-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #fff8f0, #ffffff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #f39c12; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Appointment Questions
            </h3>
            <div class="faq-item" style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(243, 156, 18, 0.05); border-radius: 15px;">
              <h5 style="color: #f39c12; font-weight: 700; margin-bottom: 1rem;">
                <i class="fas fa-calendar me-2"></i>How do I book an appointment?
              </h5>
              <p style="color: #666; line-height: 1.6;">
                Search for doctors by specialization, select your preferred doctor, choose an available time slot, 
                and confirm your booking. You'll receive instant confirmation via email and SMS.
              </p>
            </div>
            <div class="faq-item" style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(243, 156, 18, 0.05); border-radius: 15px;">
              <h5 style="color: #f39c12; font-weight: 700; margin-bottom: 1rem;">
                <i class="fas fa-clock me-2"></i>Can I reschedule or cancel appointments?
              </h5>
              <p style="color: #666; line-height: 1.6;">
                Yes, you can reschedule or cancel appointments up to 2 hours before the scheduled time. 
                Go to "My Appointments" in your dashboard to make changes.
              </p>
            </div>
            <div class="faq-item" style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(243, 156, 18, 0.05); border-radius: 15px;">
              <h5 style="color: #f39c12; font-weight: 700; margin-bottom: 1rem;">
                <i class="fas fa-money-bill me-2"></i>What are the consultation fees?
              </h5>
              <p style="color: #666; line-height: 1.6;">
                Consultation fees vary by doctor and specialization. Fees are clearly displayed before booking. 
                We accept all major payment methods including credit cards, debit cards, and digital wallets.
              </p>
            </div>
          </div>
        </div>

        <!-- Technical Questions -->
        <div class="faq-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #fff8f0);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #f39c12; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Technical Support
            </h3>
            <div class="faq-item" style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(243, 156, 18, 0.05); border-radius: 15px;">
              <h5 style="color: #f39c12; font-weight: 700; margin-bottom: 1rem;">
                <i class="fas fa-mobile-alt me-2"></i>Is Healthbridge available on mobile?
              </h5>
              <p style="color: #666; line-height: 1.6;">
                Yes, Healthbridge is fully responsive and works perfectly on all devices including smartphones, 
                tablets, and computers. No app download required - access through any web browser.
              </p>
            </div>
            <div class="faq-item" style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(243, 156, 18, 0.05); border-radius: 15px;">
              <h5 style="color: #f39c12; font-weight: 700; margin-bottom: 1rem;">
                <i class="fas fa-wifi me-2"></i>What if I have internet connection issues?
              </h5>
              <p style="color: #666; line-height: 1.6;">
                For the best experience, ensure stable internet connection. If you experience issues during consultation, 
                contact our support team immediately for assistance and rescheduling if needed.
              </p>
            </div>
          </div>
        </div>

        <!-- Contact Support -->
        <div class="contact-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; background: linear-gradient(135deg, #f39c12, #e67e22);
          color: white; text-align: center;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="font-size: 2rem; font-weight: 700; margin-bottom: 1.5rem;">
              Still Have Questions?
            </h3>
            <p style="font-size: 1.1rem; margin-bottom: 2rem; opacity: 0.9;">
              Our support team is here to help you 24/7
            </p>
            <a routerLink="/info/support/contact" class="btn btn-light btn-lg" style="
              padding: 1rem 2rem; border-radius: 50px; font-weight: 700;
            ">
              <i class="fas fa-headset me-2"></i>Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .responsibility-item:hover {
      transform: translateX(5px);
      background: rgba(30, 144, 255, 0.1) !important;
    }
    
    .faq-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    /* Mobile Responsive Styles */
    @media (max-width: 575.98px) {
      .hero-section {
        padding: 2rem 0 !important;
      }
      
      .faq-icon {
        width: 80px !important;
        height: 80px !important;
        margin-bottom: 1rem !important;
      }
      
      .faq-icon i {
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
      
      .faq-section .card-body {
        padding: 1.5rem !important;
      }
      
      .faq-section h3 {
        font-size: 1.5rem !important;
      }
      
      .faq-item {
        padding: 1rem !important;
        margin-bottom: 1rem !important;
      }
      
      .faq-item h5 {
        font-size: 1rem !important;
      }
      
      .faq-item p {
        font-size: 0.9rem !important;
      }
      
      .contact-section .card-body {
        padding: 2rem 1rem !important;
      }
      
      .contact-section h3 {
        font-size: 1.5rem !important;
      }
      
      .btn-lg {
        padding: 0.75rem 1.5rem !important;
        font-size: 0.9rem !important;
      }
      
      .faq-item:hover {
        transform: none !important;
        box-shadow: initial !important;
      }
    }
    
    @media (min-width: 576px) and (max-width: 767.98px) {
      .hero-section {
        padding: 3rem 0 !important;
      }
      
      .faq-icon {
        width: 100px !important;
        height: 100px !important;
      }
      
      .faq-icon i {
        font-size: 2.5rem !important;
      }
      
      .hero-section h1 {
        font-size: 2.5rem !important;
      }
      
      .faq-section h3 {
        font-size: 1.75rem !important;
      }
    }
    
    /* Touch Device Optimizations */
    @media (hover: none) and (pointer: coarse) {
      .faq-item:hover {
        transform: none !important;
        box-shadow: initial !important;
      }
      
      .faq-item:active {
        transform: scale(0.98) !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
      }
    }
  `]
})
export class FaqComponent {}
