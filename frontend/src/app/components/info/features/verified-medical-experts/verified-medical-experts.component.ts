import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-verified-medical-experts',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="feature-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #f0fff4 0%, #e8f8f0 50%, #f0fff4 100%);
      min-height: 100vh;
      animation: backgroundPulse 8s ease-in-out infinite;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #00ff7f, #32cd32, #00ff7f);
        background-size: 200% 200%;
        animation: gradientShift 6s ease-in-out infinite;
        color: white;
        padding: 4rem 0;
        position: relative;
        overflow: hidden;
      ">
        <div class="floating-doctors" style="position: absolute; width: 100%; height: 100%;">
          <div class="doctor-icon" style="
            position: absolute;
            top: 20%;
            left: 10%;
            font-size: 2rem;
            color: rgba(255, 255, 255, 0.2);
            animation: doctorFloat 4s ease-in-out infinite;
          ">
            <i class="fas fa-user-md"></i>
          </div>
          <div class="doctor-icon" style="
            position: absolute;
            top: 60%;
            right: 15%;
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.3);
            animation: doctorFloat 3s ease-in-out infinite 0.5s;
          ">
            <i class="fas fa-stethoscope"></i>
          </div>
          <div class="doctor-icon" style="
            position: absolute;
            bottom: 30%;
            left: 20%;
            font-size: 2.5rem;
            color: rgba(255, 255, 255, 0.15);
            animation: doctorFloat 5s ease-in-out infinite 1s;
          ">
            <i class="fas fa-user-check"></i>
          </div>
        </div>
        
        <div class="container text-center position-relative" style="z-index: 10;">
          <div class="feature-icon" style="
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
            animation: expertPulse 3s ease-in-out infinite;
          ">
            <i class="fas fa-user-md" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1rem;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            animation: titleGlow 4s ease-in-out infinite;
          ">Verified Medical Experts</h1>
          <p style="
            font-size: 1.3rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          ">Connect with thoroughly verified, licensed healthcare professionals</p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- What are Verified Medical Experts Section -->
        <div class="info-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          overflow: hidden;
          background: linear-gradient(145deg, #ffffff, #f0fff4);
          animation: cardFloat 6s ease-in-out infinite;
        ">
          <div class="card-body" style="padding: 3rem;">
            <div class="row align-items-center">
              <div class="col-lg-8">
                <h2 style="
                  color: #00ff7f;
                  font-size: 2.5rem;
                  font-weight: 700;
                  margin-bottom: 2rem;
                  background: linear-gradient(135deg, #00ff7f, #32cd32);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                ">What are Verified Medical Experts?</h2>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #555; margin-bottom: 1.5rem;">
                  Verified Medical Experts on Healthbridge are thoroughly vetted healthcare professionals who have 
                  passed rigorous verification processes. Every doctor undergoes comprehensive background checks, 
                  license verification, and credential authentication before joining our platform.
                </p>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
                  Our verification system ensures that patients connect only with qualified, licensed professionals 
                  who meet the highest standards of medical practice and ethical conduct.
                </p>
              </div>
              <div class="col-lg-4 text-center">
                <div class="expert-illustration" style="
                  font-size: 8rem;
                  color: rgba(0, 255, 127, 0.1);
                  animation: expertSpin 15s linear infinite;
                ">
                  <i class="fas fa-user-md"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Verification Process Section -->
        <div class="verification-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #f0fff4, #ffffff);
          animation: cardFloat 8s ease-in-out infinite 2s;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="
              color: #00ff7f;
              font-size: 2.2rem;
              font-weight: 700;
              margin-bottom: 3rem;
              text-align: center;
            ">Our Verification Process</h3>
            <div class="row">
              <div class="col-lg-3 col-md-6 mb-4">
                <div class="verification-step text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(0, 255, 127, 0.1);
                  position: relative;
                ">
                  <div class="step-number" style="
                    position: absolute;
                    top: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #00ff7f, #32cd32);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 700;
                    font-size: 1.2rem;
                  ">1</div>
                  <div class="step-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 2rem auto 1.5rem;
                    background: linear-gradient(135deg, #00ff7f, #32cd32);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: stepIconPulse 3s ease-in-out infinite;
                  ">
                    <i class="fas fa-id-card" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #00ff7f; font-weight: 700; margin-bottom: 1rem;">License Verification</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    We verify medical licenses with state medical boards to ensure authenticity and current status.
                  </p>
                </div>
              </div>
              
              <div class="col-lg-3 col-md-6 mb-4">
                <div class="verification-step text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(0, 255, 127, 0.1);
                  position: relative;
                ">
                  <div class="step-number" style="
                    position: absolute;
                    top: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #32cd32, #28a745);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 700;
                    font-size: 1.2rem;
                  ">2</div>
                  <div class="step-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 2rem auto 1.5rem;
                    background: linear-gradient(135deg, #32cd32, #28a745);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: stepIconPulse 3s ease-in-out infinite 0.5s;
                  ">
                    <i class="fas fa-graduation-cap" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #32cd32; font-weight: 700; margin-bottom: 1rem;">Education Check</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    We verify medical degrees, certifications, and specialization training from accredited institutions.
                  </p>
                </div>
              </div>
              
              <div class="col-lg-3 col-md-6 mb-4">
                <div class="verification-step text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(0, 255, 127, 0.1);
                  position: relative;
                ">
                  <div class="step-number" style="
                    position: absolute;
                    top: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #28a745, #20c997);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 700;
                    font-size: 1.2rem;
                  ">3</div>
                  <div class="step-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 2rem auto 1.5rem;
                    background: linear-gradient(135deg, #28a745, #20c997);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: stepIconPulse 3s ease-in-out infinite 1s;
                  ">
                    <i class="fas fa-history" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #28a745; font-weight: 700; margin-bottom: 1rem;">Experience Review</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    We review years of practice, specialization experience, and professional track record.
                  </p>
                </div>
              </div>
              
              <div class="col-lg-3 col-md-6 mb-4">
                <div class="verification-step text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(0, 255, 127, 0.1);
                  position: relative;
                ">
                  <div class="step-number" style="
                    position: absolute;
                    top: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #20c997, #17a2b8);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 700;
                    font-size: 1.2rem;
                  ">4</div>
                  <div class="step-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 2rem auto 1.5rem;
                    background: linear-gradient(135deg, #20c997, #17a2b8);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: stepIconPulse 3s ease-in-out infinite 1.5s;
                  ">
                    <i class="fas fa-shield-check" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #20c997; font-weight: 700; margin-bottom: 1rem;">Final Approval</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Medical review board conducts final assessment before approving doctors to join our platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Specializations Section -->
        <div class="specializations-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #f0fff4);
          animation: cardFloat 10s ease-in-out infinite 4s;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="
              color: #00ff7f;
              font-size: 2.2rem;
              font-weight: 700;
              margin-bottom: 3rem;
              text-align: center;
            ">Our Medical Specializations</h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="specialization-card text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(0, 255, 127, 0.1);
                ">
                  <div class="specialization-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #dc3545, #c82333);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: specializationPulse 3s ease-in-out infinite;
                  ">
                    <i class="fas fa-heartbeat" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #dc3545; font-weight: 700; margin-bottom: 1rem;">Cardiology</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Heart specialists with 10+ years experience in cardiovascular diseases and treatments.
                  </p>
                  <div class="expert-count" style="
                    background: rgba(220, 53, 69, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #dc3545; font-weight: 600;">50+ Verified Cardiologists</small>
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="specialization-card text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(0, 255, 127, 0.1);
                ">
                  <div class="specialization-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #6f42c1, #563d7c);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: specializationPulse 3s ease-in-out infinite 0.5s;
                  ">
                    <i class="fas fa-brain" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #6f42c1; font-weight: 700; margin-bottom: 1rem;">Neurology</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Brain and nervous system experts specializing in neurological disorders and treatments.
                  </p>
                  <div class="expert-count" style="
                    background: rgba(111, 66, 193, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #6f42c1; font-weight: 600;">35+ Verified Neurologists</small>
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="specialization-card text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(0, 255, 127, 0.1);
                ">
                  <div class="specialization-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #fd7e14, #e67e22);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: specializationPulse 3s ease-in-out infinite 1s;
                  ">
                    <i class="fas fa-child" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #fd7e14; font-weight: 700; margin-bottom: 1rem;">Pediatrics</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Child healthcare specialists with expertise in infant, child, and adolescent medicine.
                  </p>
                  <div class="expert-count" style="
                    background: rgba(253, 126, 20, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #fd7e14; font-weight: 600;">40+ Verified Pediatricians</small>
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="specialization-card text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(0, 255, 127, 0.1);
                ">
                  <div class="specialization-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #17a2b8, #138496);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: specializationPulse 3s ease-in-out infinite 1.5s;
                  ">
                    <i class="fas fa-user-friends" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #17a2b8; font-weight: 700; margin-bottom: 1rem;">General Practice</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Family medicine doctors providing comprehensive primary healthcare for all ages.
                  </p>
                  <div class="expert-count" style="
                    background: rgba(23, 162, 184, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #17a2b8; font-weight: 600;">120+ Verified GPs</small>
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="specialization-card text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(0, 255, 127, 0.1);
                ">
                  <div class="specialization-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #e91e63, #ad1457);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: specializationPulse 3s ease-in-out infinite 2s;
                  ">
                    <i class="fas fa-female" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #e91e63; font-weight: 700; margin-bottom: 1rem;">Gynecology</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Women's health specialists focusing on reproductive health and gynecological conditions.
                  </p>
                  <div class="expert-count" style="
                    background: rgba(233, 30, 99, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #e91e63; font-weight: 600;">30+ Verified Gynecologists</small>
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="specialization-card text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(0, 255, 127, 0.1);
                ">
                  <div class="specialization-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #f39c12, #e67e22);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: specializationPulse 3s ease-in-out infinite 2.5s;
                  ">
                    <i class="fas fa-bone" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #f39c12; font-weight: 700; margin-bottom: 1rem;">Orthopedics</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Bone and joint specialists treating fractures, arthritis, and musculoskeletal conditions.
                  </p>
                  <div class="expert-count" style="
                    background: rgba(243, 156, 18, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #f39c12; font-weight: 600;">25+ Verified Orthopedists</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quality Assurance Section -->
        <div class="quality-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #f0fff4, #ffffff);
          animation: cardFloat 12s ease-in-out infinite 6s;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="
              color: #00ff7f;
              font-size: 2.2rem;
              font-weight: 700;
              margin-bottom: 3rem;
              text-align: center;
            ">Quality Assurance</h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="quality-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1.5rem;
                  background: rgba(0, 255, 127, 0.05);
                  border-radius: 15px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #00ff7f;
                ">
                  <i class="fas fa-certificate" style="color: #00ff7f; margin-right: 1rem; font-size: 1.5rem;"></i>
                  <div>
                    <h6 style="font-weight: 700; margin-bottom: 0.5rem; color: #333;">Board Certification</h6>
                    <small style="color: #666;">All doctors are board-certified in their specializations</small>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="quality-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1.5rem;
                  background: rgba(0, 255, 127, 0.05);
                  border-radius: 15px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #00ff7f;
                ">
                  <i class="fas fa-star" style="color: #00ff7f; margin-right: 1rem; font-size: 1.5rem;"></i>
                  <div>
                    <h6 style="font-weight: 700; margin-bottom: 0.5rem; color: #333;">Patient Reviews</h6>
                    <small style="color: #666;">Minimum 4.5-star rating from verified patient feedback</small>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="quality-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1.5rem;
                  background: rgba(0, 255, 127, 0.05);
                  border-radius: 15px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #00ff7f;
                ">
                  <i class="fas fa-clock" style="color: #00ff7f; margin-right: 1rem; font-size: 1.5rem;"></i>
                  <div>
                    <h6 style="font-weight: 700; margin-bottom: 0.5rem; color: #333;">Experience Requirement</h6>
                    <small style="color: #666;">Minimum 5 years of clinical practice experience required</small>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="quality-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1.5rem;
                  background: rgba(0, 255, 127, 0.05);
                  border-radius: 15px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #00ff7f;
                ">
                  <i class="fas fa-shield-alt" style="color: #00ff7f; margin-right: 1rem; font-size: 1.5rem;"></i>
                  <div>
                    <h6 style="font-weight: 700; margin-bottom: 0.5rem; color: #333;">Background Check</h6>
                    <small style="color: #666;">Comprehensive background verification and malpractice history review</small>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="quality-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1.5rem;
                  background: rgba(0, 255, 127, 0.05);
                  border-radius: 15px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #00ff7f;
                ">
                  <i class="fas fa-award" style="color: #00ff7f; margin-right: 1rem; font-size: 1.5rem;"></i>
                  <div>
                    <h6 style="font-weight: 700; margin-bottom: 0.5rem; color: #333;">Continuing Education</h6>
                    <small style="color: #666;">Regular medical education and certification updates required</small>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="quality-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1.5rem;
                  background: rgba(0, 255, 127, 0.05);
                  border-radius: 15px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #00ff7f;
                ">
                  <i class="fas fa-handshake" style="color: #00ff7f; margin-right: 1rem; font-size: 1.5rem;"></i>
                  <div>
                    <h6 style="font-weight: 700; margin-bottom: 0.5rem; color: #333;">Professional Ethics</h6>
                    <small style="color: #666;">Commitment to medical ethics and patient care standards</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="cta-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          background: linear-gradient(135deg, #00ff7f, #32cd32);
          color: white;
          text-align: center;
          animation: ctaGlow 6s ease-in-out infinite;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="
              font-size: 2.5rem;
              font-weight: 800;
              margin-bottom: 1.5rem;
              text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            ">Ready to Consult Our Experts?</h3>
            <p style="
              font-size: 1.2rem;
              margin-bottom: 2.5rem;
              opacity: 0.9;
              max-width: 600px;
              margin-left: auto;
              margin-right: auto;
            ">Connect with verified medical professionals who prioritize your health and well-being</p>
            <div class="cta-buttons" style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
              <a routerLink="/patient/doctors" class="btn btn-light btn-lg" style="
                padding: 1rem 2.5rem;
                border-radius: 50px;
                font-weight: 700;
                font-size: 1.1rem;
                border: none;
                transition: all 0.3s ease;
                animation: ctaButtonPulse 4s ease-in-out infinite;
              ">
                <i class="fas fa-search me-2"></i>
                Find Verified Doctors
              </a>
              <a routerLink="/auth/register" class="btn btn-outline-light btn-lg" style="
                padding: 1rem 2.5rem;
                border-radius: 50px;
                font-weight: 700;
                font-size: 1.1rem;
                border: 2px solid white;
                transition: all 0.3s ease;
              ">
                <i class="fas fa-user-plus me-2"></i>
                Join Healthbridge
              </a>
            </div>
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
    
    @keyframes doctorFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(10deg); }
    }
    
    @keyframes expertPulse {
      0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
      50% { transform: scale(1.1); box-shadow: 0 0 30px rgba(255, 255, 255, 0.5); }
    }
    
    @keyframes expertSpin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes titleGlow {
      0%, 100% { text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); }
      50% { text-shadow: 0 4px 30px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 255, 255, 0.3); }
    }
    
    @keyframes cardFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
    }
    
    @keyframes stepIconPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    @keyframes specializationPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    @keyframes ctaGlow {
      0%, 100% { box-shadow: 0 20px 60px rgba(0, 255, 127, 0.3); }
      50% { box-shadow: 0 25px 70px rgba(0, 255, 127, 0.5), 0 0 50px rgba(0, 255, 127, 0.3); }
    }
    
    @keyframes ctaButtonPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    .verification-step:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    }
    
    .specialization-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
    
    .quality-item:hover {
      transform: translateX(5px);
      background: rgba(0, 255, 127, 0.1) !important;
    }
    
    .cta-buttons .btn:hover {
      transform: translateY(-3px) scale(1.05);
    }
    
    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 2rem !important;
      }
      
      .hero-section p {
        font-size: 1.1rem !important;
      }
      
      .container {
        padding: 2rem 1rem !important;
      }
      
      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .cta-buttons .btn {
        width: 100%;
        max-width: 300px;
      }
    }
  `]
})
export class VerifiedMedicalExpertsComponent {}
