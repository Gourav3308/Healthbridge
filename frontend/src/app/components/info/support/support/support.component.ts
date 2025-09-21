import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="support-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #f0fff0 0%, #e8f8e8 50%, #f0fff0 100%);
      min-height: 100vh;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #28a745, #20c997, #28a745);
        color: white; padding: 4rem 0;
      ">
        <div class="container text-center">
          <div class="support-icon" style="
            width: 120px; height: 120px; margin: 0 auto 2rem;
            background: rgba(255, 255, 255, 0.2); border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
          ">
            <i class="fas fa-headset" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Support Center</h1>
          <p style="font-size: 1.3rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
            Get help when you need it - our support team is here for you 24/7
          </p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- Support Options -->
        <div class="support-options" style="margin-bottom: 4rem;">
          <h2 style="color: #28a745; font-size: 2.5rem; font-weight: 700; margin-bottom: 3rem; text-align: center;">
            How Can We Help You?
          </h2>
          <div class="row">
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="support-card card text-center" style="
                border: none; box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
                border-radius: 20px; background: white; transition: all 0.3s ease;
                border: 2px solid rgba(40, 167, 69, 0.1);
              ">
                <div class="card-body" style="padding: 2.5rem;">
                  <div class="support-icon-container" style="
                    width: 80px; height: 80px; margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #28a745, #20c997);
                    border-radius: 50%; display: flex; align-items: center; justify-content: center;
                  ">
                    <i class="fas fa-phone" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #28a745; font-weight: 700; margin-bottom: 1rem;">Phone Support</h5>
                  <p style="color: #666; line-height: 1.6; margin-bottom: 1.5rem;">
                    Speak directly with our support team for immediate assistance.
                  </p>
                  <div class="contact-info" style="background: rgba(40, 167, 69, 0.1); padding: 1rem; border-radius: 10px;">
                    <strong style="color: #28a745;">+91 7903840357</strong><br>
                    <small style="color: #666;">Available 24/7</small>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="support-card card text-center" style="
                border: none; box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
                border-radius: 20px; background: white; transition: all 0.3s ease;
                border: 2px solid rgba(40, 167, 69, 0.1);
              ">
                <div class="card-body" style="padding: 2.5rem;">
                  <div class="support-icon-container" style="
                    width: 80px; height: 80px; margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #17a2b8, #138496);
                    border-radius: 50%; display: flex; align-items: center; justify-content: center;
                  ">
                    <i class="fas fa-envelope" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #17a2b8; font-weight: 700; margin-bottom: 1rem;">Email Support</h5>
                  <p style="color: #666; line-height: 1.6; margin-bottom: 1.5rem;">
                    Send us detailed questions and we'll respond within 24 hours.
                  </p>
                  <div class="contact-info" style="background: rgba(23, 162, 184, 0.1); padding: 1rem; border-radius: 10px;">
                    <strong style="color: #17a2b8;">healthbridge13012002@gmail.com</strong><br>
                    <small style="color: #666;">Response within 24 hours</small>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="support-card card text-center" style="
                border: none; box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
                border-radius: 20px; background: white; transition: all 0.3s ease;
                border: 2px solid rgba(40, 167, 69, 0.1);
              ">
                <div class="card-body" style="padding: 2.5rem;">
                  <div class="support-icon-container" style="
                    width: 80px; height: 80px; margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #6f42c1, #563d7c);
                    border-radius: 50%; display: flex; align-items: center; justify-content: center;
                  ">
                    <i class="fas fa-comments" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #6f42c1; font-weight: 700; margin-bottom: 1rem;">Live Chat</h5>
                  <p style="color: #666; line-height: 1.6; margin-bottom: 1.5rem;">
                    Get instant help through our live chat feature on the website.
                  </p>
                  <div class="contact-info" style="background: rgba(111, 66, 193, 0.1); padding: 1rem; border-radius: 10px;">
                    <strong style="color: #6f42c1;">Available 9 AM - 9 PM</strong><br>
                    <small style="color: #666;">Instant responses</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Common Issues -->
        <div class="issues-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #f0fff0);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #28a745; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Common Support Issues
            </h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="issue-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(40, 167, 69, 0.05); border-radius: 10px;
                  border-left: 4px solid #28a745;
                ">
                  <i class="fas fa-key" style="color: #28a745; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Password Reset Issues</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="issue-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(40, 167, 69, 0.05); border-radius: 10px;
                  border-left: 4px solid #28a745;
                ">
                  <i class="fas fa-calendar-times" style="color: #28a745; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Appointment Booking Problems</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="issue-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(40, 167, 69, 0.05); border-radius: 10px;
                  border-left: 4px solid #28a745;
                ">
                  <i class="fas fa-credit-card" style="color: #28a745; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Payment & Billing Issues</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="issue-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(40, 167, 69, 0.05); border-radius: 10px;
                  border-left: 4px solid #28a745;
                ">
                  <i class="fas fa-user-cog" style="color: #28a745; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Profile & Account Management</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Emergency Notice -->
        <div class="emergency-notice card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; background: linear-gradient(135deg, #f8d7da, #f5c6cb);
          border-left: 6px solid #dc3545;
        ">
          <div class="card-body" style="padding: 2rem;">
            <div class="d-flex align-items-start">
              <i class="fas fa-exclamation-triangle" style="
                color: #721c24; font-size: 2rem; margin-right: 1rem; margin-top: 0.5rem;
              "></i>
              <div>
                <h4 style="color: #721c24; font-weight: 700; margin-bottom: 1rem;">Medical Emergency</h4>
                <p style="color: #721c24; font-size: 1rem; line-height: 1.6; margin-bottom: 0;">
                  For medical emergencies, do not use this support system. Call 911 immediately or visit your nearest emergency room. 
                  Our support is for platform-related questions only, not medical emergencies.
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
    .support-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    }
    
    .issue-item:hover {
      transform: translateX(5px);
      background: rgba(40, 167, 69, 0.1) !important;
    }
    
    /* Mobile Responsive Styles */
    @media (max-width: 575.98px) {
      .hero-section {
        padding: 2rem 0 !important;
      }
      
      .support-icon {
        width: 80px !important;
        height: 80px !important;
        margin-bottom: 1rem !important;
      }
      
      .support-icon i {
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
      
      .support-options {
        margin-bottom: 2rem !important;
      }
      
      .support-options h2 {
        font-size: 1.75rem !important;
        margin-bottom: 2rem !important;
      }
      
      .support-card {
        margin-bottom: 1rem !important;
      }
      
      .support-card .card-body {
        padding: 1.5rem !important;
      }
      
      .support-icon-container {
        width: 60px !important;
        height: 60px !important;
        margin-bottom: 1rem !important;
      }
      
      .support-icon-container i {
        font-size: 1.5rem !important;
      }
      
      .support-card h5 {
        font-size: 1rem !important;
      }
      
      .support-card p {
        font-size: 0.9rem !important;
      }
      
      .contact-info {
        padding: 0.75rem !important;
      }
      
      .contact-info strong {
        font-size: 0.9rem !important;
      }
      
      .issues-section .card-body {
        padding: 1.5rem !important;
      }
      
      .issues-section h3 {
        font-size: 1.5rem !important;
      }
      
      .issue-item {
        padding: 1rem !important;
        margin-bottom: 0.75rem !important;
      }
      
      .issue-item span {
        font-size: 0.9rem !important;
      }
      
      .emergency-notice .card-body {
        padding: 1.5rem !important;
      }
      
      .emergency-notice h4 {
        font-size: 1.25rem !important;
      }
      
      .emergency-notice p {
        font-size: 0.9rem !important;
      }
      
      .emergency-notice i {
        font-size: 1.5rem !important;
      }
      
      .support-card:hover {
        transform: none !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
      }
      
      .issue-item:hover {
        transform: none !important;
      }
    }
    
    @media (min-width: 576px) and (max-width: 767.98px) {
      .hero-section {
        padding: 3rem 0 !important;
      }
      
      .support-icon {
        width: 100px !important;
        height: 100px !important;
      }
      
      .support-icon i {
        font-size: 2.5rem !important;
      }
      
      .hero-section h1 {
        font-size: 2.5rem !important;
      }
      
      .support-options h2 {
        font-size: 2rem !important;
      }
    }
    
    /* Touch Device Optimizations */
    @media (hover: none) and (pointer: coarse) {
      .support-card:hover {
        transform: none !important;
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1) !important;
      }
      
      .support-card:active {
        transform: scale(0.98) !important;
      }
      
      .issue-item:hover {
        transform: none !important;
        background: initial !important;
      }
      
      .issue-item:active {
        background: rgba(40, 167, 69, 0.1) !important;
        transform: scale(0.98) !important;
      }
    }
  `]
})
export class SupportComponent {}
