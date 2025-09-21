import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="legal-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%);
      min-height: 100vh;
      animation: backgroundPulse 8s ease-in-out infinite;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #667eea, #764ba2, #667eea);
        background-size: 200% 200%;
        animation: gradientShift 6s ease-in-out infinite;
        color: white;
        padding: 4rem 0;
        position: relative;
        overflow: hidden;
      ">
        <div class="container text-center position-relative" style="z-index: 10;">
          <div class="legal-icon" style="
            width: 120px;
            height: 120px;
            margin: 0 auto 2rem;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            border: 3px solid rgba(255, 255, 255, 0.3);
            animation: legalPulse 3s ease-in-out infinite;
          ">
            <i class="fas fa-shield-alt" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1rem;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          ">Privacy Policy</h1>
          <p style="
            font-size: 1.3rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          ">Your privacy and data security are our top priorities</p>
          <p style="
            font-size: 1rem;
            opacity: 0.8;
            margin-top: 1rem;
          ">Last updated: September 21, 2025</p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- Introduction -->
        <div class="policy-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #f8f9fa);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h2 style="color: #667eea; font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">
              Our Commitment to Your Privacy
            </h2>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #555; margin-bottom: 1.5rem;">
              At Healthbridge, we understand that your health information is deeply personal and sensitive. 
              This Privacy Policy explains how we collect, use, protect, and share your personal and health information 
              when you use our healthcare platform.
            </p>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
              We are committed to maintaining the highest standards of privacy and security, 
              complying with all applicable healthcare privacy laws and regulations.
            </p>
          </div>
        </div>

        <!-- Information We Collect -->
        <div class="policy-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #f8f9fa, #ffffff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #667eea; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem;">
              Information We Collect
            </h3>
            <div class="row">
              <div class="col-lg-6 mb-4">
                <div class="info-item" style="
                  padding: 1.5rem;
                  background: rgba(102, 126, 234, 0.05);
                  border-radius: 15px;
                  border-left: 4px solid #667eea;
                ">
                  <h5 style="color: #667eea; font-weight: 700; margin-bottom: 1rem;">
                    <i class="fas fa-user me-2"></i>Personal Information
                  </h5>
                  <ul style="color: #666; line-height: 1.6;">
                    <li>Name, email address, phone number</li>
                    <li>Date of birth, gender, address</li>
                    <li>Emergency contact information</li>
                    <li>Profile pictures and preferences</li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-6 mb-4">
                <div class="info-item" style="
                  padding: 1.5rem;
                  background: rgba(102, 126, 234, 0.05);
                  border-radius: 15px;
                  border-left: 4px solid #667eea;
                ">
                  <h5 style="color: #667eea; font-weight: 700; margin-bottom: 1rem;">
                    <i class="fas fa-heartbeat me-2"></i>Health Information
                  </h5>
                  <ul style="color: #666; line-height: 1.6;">
                    <li>Medical history and conditions</li>
                    <li>Prescription and medication data</li>
                    <li>Appointment records and notes</li>
                    <li>Test results and reports</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- How We Use Information -->
        <div class="policy-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #f8f9fa);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #667eea; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem;">
              How We Use Your Information
            </h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="usage-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(102, 126, 234, 0.05); border-radius: 10px;
                  border-left: 4px solid #667eea;
                ">
                  <i class="fas fa-calendar-check" style="color: #667eea; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Appointment Scheduling</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="usage-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(102, 126, 234, 0.05); border-radius: 10px;
                  border-left: 4px solid #667eea;
                ">
                  <i class="fas fa-user-md" style="color: #667eea; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Medical Consultations</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="usage-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(102, 126, 234, 0.05); border-radius: 10px;
                  border-left: 4px solid #667eea;
                ">
                  <i class="fas fa-prescription-bottle-alt" style="color: #667eea; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Prescription Management</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="usage-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(102, 126, 234, 0.05); border-radius: 10px;
                  border-left: 4px solid #667eea;
                ">
                  <i class="fas fa-chart-line" style="color: #667eea; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Service Improvement</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Security -->
        <div class="policy-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #f8f9fa, #ffffff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #667eea; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem;">
              Data Security Measures
            </h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="security-card text-center" style="
                  background: white; border-radius: 15px; padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  border: 2px solid rgba(102, 126, 234, 0.1);
                ">
                  <div class="security-icon" style="
                    width: 80px; height: 80px; margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    border-radius: 50%; display: flex; align-items: center; justify-content: center;
                  ">
                    <i class="fas fa-lock" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #667eea; font-weight: 700;">256-bit Encryption</h5>
                  <p style="color: #666; font-size: 0.9rem;">
                    All data is encrypted using industry-standard AES-256 encryption.
                  </p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="security-card text-center" style="
                  background: white; border-radius: 15px; padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  border: 2px solid rgba(102, 126, 234, 0.1);
                ">
                  <div class="security-icon" style="
                    width: 80px; height: 80px; margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #764ba2, #667eea);
                    border-radius: 50%; display: flex; align-items: center; justify-content: center;
                  ">
                    <i class="fas fa-server" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #764ba2; font-weight: 700;">Secure Servers</h5>
                  <p style="color: #666; font-size: 0.9rem;">
                    Data stored on HIPAA-compliant secure servers with 24/7 monitoring.
                  </p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="security-card text-center" style="
                  background: white; border-radius: 15px; padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  border: 2px solid rgba(102, 126, 234, 0.1);
                ">
                  <div class="security-icon" style="
                    width: 80px; height: 80px; margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    border-radius: 50%; display: flex; align-items: center; justify-content: center;
                  ">
                    <i class="fas fa-user-shield" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #667eea; font-weight: 700;">Access Control</h5>
                  <p style="color: #666; font-size: 0.9rem;">
                    Strict access controls ensure only authorized personnel can access your data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Your Rights -->
        <div class="policy-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          background: linear-gradient(145deg, #ffffff, #f8f9fa);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #667eea; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem;">
              Your Privacy Rights
            </h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="rights-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(102, 126, 234, 0.05); border-radius: 10px;
                  border-left: 4px solid #667eea;
                ">
                  <i class="fas fa-eye" style="color: #667eea; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Right to Access Your Data</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="rights-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(102, 126, 234, 0.05); border-radius: 10px;
                  border-left: 4px solid #667eea;
                ">
                  <i class="fas fa-edit" style="color: #667eea; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Right to Correct Information</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="rights-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(102, 126, 234, 0.05); border-radius: 10px;
                  border-left: 4px solid #667eea;
                ">
                  <i class="fas fa-trash-alt" style="color: #667eea; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Right to Delete Data</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="rights-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(102, 126, 234, 0.05); border-radius: 10px;
                  border-left: 4px solid #667eea;
                ">
                  <i class="fas fa-download" style="color: #667eea; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Right to Data Portability</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact for Privacy -->
        <div class="contact-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          text-align: center;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="font-size: 2rem; font-weight: 700; margin-bottom: 1.5rem;">
              Privacy Questions?
            </h3>
            <p style="font-size: 1.1rem; margin-bottom: 2rem; opacity: 0.9;">
              If you have any questions about this Privacy Policy or your data rights, please contact us.
            </p>
            <a href="mailto:privacy@healthbridge.com" class="btn btn-light btn-lg" style="
              padding: 1rem 2rem; border-radius: 50px; font-weight: 700;
            ">
              <i class="fas fa-envelope me-2"></i>Contact Privacy Team
            </a>
          </div>
        </div>
      </div>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    @keyframes backgroundPulse {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    
    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    
    @keyframes legalPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    .rights-item:hover, .usage-item:hover {
      transform: translateX(5px);
      background: rgba(102, 126, 234, 0.1) !important;
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
      
      .policy-section .card-body {
        padding: 1.5rem !important;
      }
      
      .policy-section h2 {
        font-size: 1.75rem !important;
      }
      
      .policy-section h3 {
        font-size: 1.5rem !important;
      }
      
      .info-item, .usage-item, .rights-item {
        padding: 1rem !important;
        margin-bottom: 0.75rem !important;
      }
      
      .security-card {
        padding: 1.5rem !important;
        margin-bottom: 1rem !important;
      }
      
      .security-icon {
        width: 60px !important;
        height: 60px !important;
        margin-bottom: 1rem !important;
      }
      
      .security-icon i {
        font-size: 1.5rem !important;
      }
      
      .security-card h5 {
        font-size: 1rem !important;
      }
      
      .security-card p {
        font-size: 0.85rem !important;
      }
      
      .contact-section .card-body {
        padding: 2rem 1rem !important;
      }
      
      .contact-section h3 {
        font-size: 1.5rem !important;
      }
      
      .contact-section p {
        font-size: 1rem !important;
      }
      
      .btn-lg {
        padding: 0.75rem 1.5rem !important;
        font-size: 0.9rem !important;
      }
      
      .rights-item:hover, .usage-item:hover {
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
      
      .policy-section h2 {
        font-size: 2rem !important;
      }
    }
    
    /* Touch Device Optimizations */
    @media (hover: none) and (pointer: coarse) {
      .rights-item:hover, .usage-item:hover {
        transform: none !important;
        background: initial !important;
      }
      
      .rights-item:active, .usage-item:active {
        background: rgba(102, 126, 234, 0.1) !important;
        transform: scale(0.98) !important;
      }
    }
  `]
})
export class PrivacyPolicyComponent {}
