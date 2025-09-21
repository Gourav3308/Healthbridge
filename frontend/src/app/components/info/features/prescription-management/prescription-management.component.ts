import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-prescription-management',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="feature-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #fff5f0 0%, #ffe6f0 50%, #fff5f0 100%);
      min-height: 100vh;
      animation: backgroundPulse 8s ease-in-out infinite;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #e91e63, #ff6b9d, #e91e63);
        background-size: 200% 200%;
        animation: gradientShift 6s ease-in-out infinite;
        color: white;
        padding: 4rem 0;
        position: relative;
        overflow: hidden;
      ">
        <div class="floating-prescriptions" style="position: absolute; width: 100%; height: 100%;">
          <div class="prescription-icon" style="
            position: absolute;
            top: 20%;
            left: 10%;
            font-size: 2rem;
            color: rgba(255, 255, 255, 0.2);
            animation: prescriptionFloat 4s ease-in-out infinite;
          ">
            <i class="fas fa-prescription-bottle-alt"></i>
          </div>
          <div class="prescription-icon" style="
            position: absolute;
            top: 60%;
            right: 15%;
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.3);
            animation: prescriptionFloat 3s ease-in-out infinite 0.5s;
          ">
            <i class="fas fa-file-prescription"></i>
          </div>
          <div class="prescription-icon" style="
            position: absolute;
            bottom: 30%;
            left: 20%;
            font-size: 2.5rem;
            color: rgba(255, 255, 255, 0.15);
            animation: prescriptionFloat 5s ease-in-out infinite 1s;
          ">
            <i class="fas fa-pills"></i>
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
            animation: featurePulse 3s ease-in-out infinite;
          ">
            <i class="fas fa-prescription-bottle-alt" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1rem;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            animation: titleGlow 4s ease-in-out infinite;
          ">Prescription Management</h1>
          <p style="
            font-size: 1.3rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          ">Digital prescription management and medicine ordering made simple</p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- What is Prescription Management Section -->
        <div class="info-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          overflow: hidden;
          background: linear-gradient(145deg, #ffffff, #fff5f0);
          animation: cardFloat 6s ease-in-out infinite;
        ">
          <div class="card-body" style="padding: 3rem;">
            <div class="row align-items-center">
              <div class="col-lg-8">
                <h2 style="
                  color: #e91e63;
                  font-size: 2.5rem;
                  font-weight: 700;
                  margin-bottom: 2rem;
                  background: linear-gradient(135deg, #e91e63, #ff6b9d);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                ">What is Prescription Management?</h2>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #555; margin-bottom: 1.5rem;">
                  Prescription Management is a comprehensive digital system that allows patients to store, organize, 
                  and manage their medical prescriptions electronically. It eliminates the hassle of paper prescriptions 
                  and provides a centralized platform for all your medication needs.
                </p>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
                  From storing digital prescriptions to setting medication reminders and ordering medicines online, 
                  our system ensures you never miss a dose and always have your medications when you need them.
                </p>
              </div>
              <div class="col-lg-4 text-center">
                <div class="prescription-illustration" style="
                  font-size: 8rem;
                  color: rgba(233, 30, 99, 0.1);
                  animation: prescriptionSpin 15s linear infinite;
                ">
                  <i class="fas fa-prescription-bottle-alt"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Key Features Section -->
        <div class="features-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #fff5f0, #ffffff);
          animation: cardFloat 8s ease-in-out infinite 2s;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="
              color: #e91e63;
              font-size: 2.2rem;
              font-weight: 700;
              margin-bottom: 3rem;
              text-align: center;
            ">Key Features</h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(233, 30, 99, 0.1);
                ">
                  <div class="feature-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #e91e63, #ff6b9d);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: featureIconPulse 3s ease-in-out infinite;
                  ">
                    <i class="fas fa-cloud-upload-alt" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #e91e63; font-weight: 700; margin-bottom: 1rem;">Digital Storage</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Store all your prescriptions digitally in one secure place. No more lost paper prescriptions.
                  </p>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(233, 30, 99, 0.1);
                ">
                  <div class="feature-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #ff6b9d, #ff8a9b);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: featureIconPulse 3s ease-in-out infinite 0.5s;
                  ">
                    <i class="fas fa-bell" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #ff6b9d; font-weight: 700; margin-bottom: 1rem;">Smart Reminders</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Get timely reminders for medication doses, refills, and prescription renewals.
                  </p>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(233, 30, 99, 0.1);
                ">
                  <div class="feature-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #ff8a9b, #ffa8a8);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: featureIconPulse 3s ease-in-out infinite 1s;
                  ">
                    <i class="fas fa-shopping-cart" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #ff8a9b; font-weight: 700; margin-bottom: 1rem;">Online Ordering</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Order medicines directly from your prescriptions and get them delivered to your doorstep.
                  </p>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(233, 30, 99, 0.1);
                ">
                  <div class="feature-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #ffa8a8, #ffb3ba);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: featureIconPulse 3s ease-in-out infinite 1.5s;
                  ">
                    <i class="fas fa-history" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #ffb3ba; font-weight: 700; margin-bottom: 1rem;">Medication History</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Track your complete medication history and share it easily with healthcare providers.
                  </p>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(233, 30, 99, 0.1);
                ">
                  <div class="feature-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #ffb3ba, #ffcccb);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: featureIconPulse 3s ease-in-out infinite 2s;
                  ">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #ffcccb; font-weight: 700; margin-bottom: 1rem;">Drug Interactions</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Get alerts about potential drug interactions and contraindications for safer medication use.
                  </p>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(233, 30, 99, 0.1);
                ">
                  <div class="feature-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #ffcccb, #ffe0e0);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: featureIconPulse 3s ease-in-out infinite 2.5s;
                  ">
                    <i class="fas fa-share-alt" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #ffe0e0; font-weight: 700; margin-bottom: 1rem;">Easy Sharing</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Share prescriptions with family members, caregivers, or other healthcare providers securely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- How It Works Section -->
        <div class="how-it-works-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #fff5f0);
          animation: cardFloat 10s ease-in-out infinite 4s;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="
              color: #e91e63;
              font-size: 2.2rem;
              font-weight: 700;
              margin-bottom: 3rem;
              text-align: center;
            ">How Prescription Management Works</h3>
            <div class="row">
              <div class="col-lg-3 col-md-6 mb-4">
                <div class="step-card text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(233, 30, 99, 0.1);
                  position: relative;
                ">
                  <div class="step-number" style="
                    position: absolute;
                    top: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #e91e63, #ff6b9d);
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
                    background: linear-gradient(135deg, #e91e63, #ff6b9d);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: stepIconPulse 3s ease-in-out infinite;
                  ">
                    <i class="fas fa-file-upload" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #e91e63; font-weight: 700; margin-bottom: 1rem;">Upload Prescription</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Upload or receive digital prescriptions directly from your doctor after consultation.
                  </p>
                </div>
              </div>
              
              <div class="col-lg-3 col-md-6 mb-4">
                <div class="step-card text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(233, 30, 99, 0.1);
                  position: relative;
                ">
                  <div class="step-number" style="
                    position: absolute;
                    top: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #ff6b9d, #ff8a9b);
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
                    background: linear-gradient(135deg, #ff6b9d, #ff8a9b);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: stepIconPulse 3s ease-in-out infinite 0.5s;
                  ">
                    <i class="fas fa-cogs" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #ff6b9d; font-weight: 700; margin-bottom: 1rem;">Smart Processing</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Our system automatically processes and organizes your prescription information.
                  </p>
                </div>
              </div>
              
              <div class="col-lg-3 col-md-6 mb-4">
                <div class="step-card text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(233, 30, 99, 0.1);
                  position: relative;
                ">
                  <div class="step-number" style="
                    position: absolute;
                    top: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #ff8a9b, #ffa8a8);
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
                    background: linear-gradient(135deg, #ff8a9b, #ffa8a8);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: stepIconPulse 3s ease-in-out infinite 1s;
                  ">
                    <i class="fas fa-bell" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #ff8a9b; font-weight: 700; margin-bottom: 1rem;">Set Reminders</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Configure medication reminders and alerts for optimal treatment adherence.
                  </p>
                </div>
              </div>
              
              <div class="col-lg-3 col-md-6 mb-4">
                <div class="step-card text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(233, 30, 99, 0.1);
                  position: relative;
                ">
                  <div class="step-number" style="
                    position: absolute;
                    top: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #ffa8a8, #ffb3ba);
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
                    background: linear-gradient(135deg, #ffa8a8, #ffb3ba);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: stepIconPulse 3s ease-in-out infinite 1.5s;
                  ">
                    <i class="fas fa-truck" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #ffa8a8; font-weight: 700; margin-bottom: 1rem;">Order & Deliver</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Order medicines with one click and get them delivered to your doorstep.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Benefits Section -->
        <div class="benefits-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #fff5f0, #ffffff);
          animation: cardFloat 12s ease-in-out infinite 6s;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="
              color: #e91e63;
              font-size: 2.2rem;
              font-weight: 700;
              margin-bottom: 3rem;
              text-align: center;
            ">Benefits for Patients</h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="benefit-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1.5rem;
                  background: rgba(233, 30, 99, 0.05);
                  border-radius: 15px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #e91e63;
                ">
                  <i class="fas fa-check-circle" style="color: #e91e63; margin-right: 1rem; font-size: 1.5rem;"></i>
                  <div>
                    <h6 style="font-weight: 700; margin-bottom: 0.5rem; color: #333;">Never Lose Prescriptions</h6>
                    <small style="color: #666;">All prescriptions stored securely in the cloud</small>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="benefit-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1.5rem;
                  background: rgba(233, 30, 99, 0.05);
                  border-radius: 15px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #e91e63;
                ">
                  <i class="fas fa-clock" style="color: #e91e63; margin-right: 1rem; font-size: 1.5rem;"></i>
                  <div>
                    <h6 style="font-weight: 700; margin-bottom: 0.5rem; color: #333;">Timely Medication</h6>
                    <small style="color: #666;">Smart reminders ensure you never miss a dose</small>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="benefit-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1.5rem;
                  background: rgba(233, 30, 99, 0.05);
                  border-radius: 15px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #e91e63;
                ">
                  <i class="fas fa-shopping-cart" style="color: #e91e63; margin-right: 1rem; font-size: 1.5rem;"></i>
                  <div>
                    <h6 style="font-weight: 700; margin-bottom: 0.5rem; color: #333;">Easy Medicine Ordering</h6>
                    <small style="color: #666;">Order medicines directly from prescriptions</small>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="benefit-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1.5rem;
                  background: rgba(233, 30, 99, 0.05);
                  border-radius: 15px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #e91e63;
                ">
                  <i class="fas fa-shield-alt" style="color: #e91e63; margin-right: 1rem; font-size: 1.5rem;"></i>
                  <div>
                    <h6 style="font-weight: 700; margin-bottom: 0.5rem; color: #333;">Safety Alerts</h6>
                    <small style="color: #666;">Get warnings about drug interactions and allergies</small>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="benefit-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1.5rem;
                  background: rgba(233, 30, 99, 0.05);
                  border-radius: 15px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #e91e63;
                ">
                  <i class="fas fa-history" style="color: #e91e63; margin-right: 1rem; font-size: 1.5rem;"></i>
                  <div>
                    <h6 style="font-weight: 700; margin-bottom: 0.5rem; color: #333;">Complete History</h6>
                    <small style="color: #666;">Track all medications and treatments over time</small>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="benefit-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1.5rem;
                  background: rgba(233, 30, 99, 0.05);
                  border-radius: 15px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #e91e63;
                ">
                  <i class="fas fa-mobile-alt" style="color: #e91e63; margin-right: 1rem; font-size: 1.5rem;"></i>
                  <div>
                    <h6 style="font-weight: 700; margin-bottom: 0.5rem; color: #333;">Access Anywhere</h6>
                    <small style="color: #666;">View prescriptions on any device, anytime</small>
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
          background: linear-gradient(135deg, #e91e63, #ff6b9d);
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
            ">Ready to Manage Your Prescriptions?</h3>
            <p style="
              font-size: 1.2rem;
              margin-bottom: 2.5rem;
              opacity: 0.9;
              max-width: 600px;
              margin-left: auto;
              margin-right: auto;
            ">Experience the convenience of digital prescription management with Healthbridge</p>
            <div class="cta-buttons" style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
              <a routerLink="/auth/register" class="btn btn-light btn-lg" style="
                padding: 1rem 2.5rem;
                border-radius: 50px;
                font-weight: 700;
                font-size: 1.1rem;
                border: none;
                transition: all 0.3s ease;
                animation: ctaButtonPulse 4s ease-in-out infinite;
              ">
                <i class="fas fa-user-plus me-2"></i>
                Get Started Now
              </a>
              <a routerLink="/patient/dashboard" class="btn btn-outline-light btn-lg" style="
                padding: 1rem 2.5rem;
                border-radius: 50px;
                font-weight: 700;
                font-size: 1.1rem;
                border: 2px solid white;
                transition: all 0.3s ease;
              ">
                <i class="fas fa-tachometer-alt me-2"></i>
                View Dashboard
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
    
    @keyframes prescriptionFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(10deg); }
    }
    
    @keyframes featurePulse {
      0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
      50% { transform: scale(1.1); box-shadow: 0 0 30px rgba(255, 255, 255, 0.5); }
    }
    
    @keyframes prescriptionSpin {
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
    
    @keyframes featureIconPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    @keyframes stepIconPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    @keyframes ctaGlow {
      0%, 100% { box-shadow: 0 20px 60px rgba(233, 30, 99, 0.3); }
      50% { box-shadow: 0 25px 70px rgba(233, 30, 99, 0.5), 0 0 50px rgba(233, 30, 99, 0.3); }
    }
    
    @keyframes ctaButtonPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    .feature-card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    }
    
    .step-card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    }
    
    .benefit-item:hover {
      transform: translateX(5px);
      background: rgba(233, 30, 99, 0.1) !important;
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
export class PrescriptionManagementComponent {}
