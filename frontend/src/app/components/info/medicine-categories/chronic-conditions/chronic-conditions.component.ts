import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-chronic-conditions',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%);
      min-height: 100vh;
      animation: backgroundPulse 8s ease-in-out infinite;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #7f8c8d, #5d6d7e, #7f8c8d);
        background-size: 200% 200%;
        animation: gradientShift 6s ease-in-out infinite;
        color: white;
        padding: 4rem 0;
        position: relative;
        overflow: hidden;
      ">
        <div class="floating-medical" style="position: absolute; width: 100%; height: 100%;">
          <div class="medical-icon" style="
            position: absolute;
            top: 20%;
            left: 10%;
            font-size: 2rem;
            color: rgba(255, 255, 255, 0.2);
            animation: medicalFloat 4s ease-in-out infinite;
          ">
            <i class="fas fa-procedures"></i>
          </div>
          <div class="medical-icon" style="
            position: absolute;
            top: 60%;
            right: 15%;
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.3);
            animation: medicalFloat 3s ease-in-out infinite 0.5s;
          ">
            <i class="fas fa-hospital-user"></i>
          </div>
          <div class="medical-icon" style="
            position: absolute;
            bottom: 30%;
            left: 20%;
            font-size: 2.5rem;
            color: rgba(255, 255, 255, 0.15);
            animation: medicalFloat 5s ease-in-out infinite 1s;
          ">
            <i class="fas fa-user-md"></i>
          </div>
        </div>
        
        <div class="container text-center position-relative" style="z-index: 10;">
          <div class="category-icon" style="
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
            animation: chronicPulse 3s ease-in-out infinite;
          ">
            <i class="fas fa-procedures" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1rem;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            animation: titleGlow 4s ease-in-out infinite;
          ">Chronic Conditions</h1>
          <p style="
            font-size: 1.3rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          ">Long-term care medications for managing chronic health conditions</p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- What are Chronic Conditions Section -->
        <div class="info-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          overflow: hidden;
          background: linear-gradient(145deg, #ffffff, #f8f9fa);
          animation: cardFloat 6s ease-in-out infinite;
        ">
          <div class="card-body" style="padding: 3rem;">
            <div class="row align-items-center">
              <div class="col-lg-8">
                <h2 style="
                  color: #7f8c8d;
                  font-size: 2.5rem;
                  font-weight: 700;
                  margin-bottom: 2rem;
                  background: linear-gradient(135deg, #7f8c8d, #5d6d7e);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                ">What are Chronic Conditions?</h2>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #555; margin-bottom: 1.5rem;">
                  Chronic conditions are long-lasting health problems that require ongoing medical management. 
                  These conditions typically last for months or years and need continuous treatment to control symptoms, 
                  prevent complications, and maintain quality of life.
                </p>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
                  Medications for chronic conditions are designed for long-term use and help patients manage their 
                  symptoms effectively while preventing disease progression and maintaining normal daily activities.
                </p>
              </div>
              <div class="col-lg-4 text-center">
                <div class="chronic-illustration" style="
                  font-size: 8rem;
                  color: rgba(127, 140, 141, 0.1);
                  animation: chronicRotate 15s linear infinite;
                ">
                  <i class="fas fa-procedures"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Common Chronic Conditions Section -->
        <div class="symptoms-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #f8f9fa, #ffffff);
          animation: cardFloat 8s ease-in-out infinite 2s;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="
              color: #7f8c8d;
              font-size: 2.2rem;
              font-weight: 700;
              margin-bottom: 2rem;
              text-align: center;
            ">Common Chronic Conditions</h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(127, 140, 141, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #7f8c8d;
                ">
                  <i class="fas fa-tint" style="color: #7f8c8d; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Diabetes (Type 1 & 2)</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(127, 140, 141, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #7f8c8d;
                ">
                  <i class="fas fa-heartbeat" style="color: #7f8c8d; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Hypertension (High Blood Pressure)</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(127, 140, 141, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #7f8c8d;
                ">
                  <i class="fas fa-lungs" style="color: #7f8c8d; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Asthma & COPD</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(127, 140, 141, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #7f8c8d;
                ">
                  <i class="fas fa-bone" style="color: #7f8c8d; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Arthritis & Joint Pain</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(127, 140, 141, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #7f8c8d;
                ">
                  <i class="fas fa-brain" style="color: #7f8c8d; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Depression & Anxiety</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(127, 140, 141, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #7f8c8d;
                ">
                  <i class="fas fa-kidney" style="color: #7f8c8d; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Kidney Disease</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Management Medications Section -->
        <div class="medicines-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #f5f5f5);
          animation: cardFloat 10s ease-in-out infinite 4s;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="
              color: #7f8c8d;
              font-size: 2.2rem;
              font-weight: 700;
              margin-bottom: 2rem;
              text-align: center;
            ">Chronic Condition Management</h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(127, 140, 141, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #7f8c8d, #5d6d7e);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 6s linear infinite;
                  ">
                    <i class="fas fa-tablets" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #7f8c8d; font-weight: 700; margin-bottom: 1rem;">Long-Acting Medications</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Extended-release formulations that provide consistent medication levels throughout the day.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(127, 140, 141, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #7f8c8d; font-weight: 600;">Examples: Extended-release tablets, patches</small>
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(127, 140, 141, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #5d6d7e, #4a5568);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 8s linear infinite;
                  ">
                    <i class="fas fa-pills" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #5d6d7e; font-weight: 700; margin-bottom: 1rem;">Disease-Modifying Drugs</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Medications that slow disease progression and prevent complications in chronic conditions.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(93, 109, 126, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #5d6d7e; font-weight: 600;">Examples: Biologics, immunosuppressants</small>
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(127, 140, 141, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #4a5568, #2d3748);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 10s linear infinite;
                  ">
                    <i class="fas fa-prescription-bottle-alt" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #4a5568; font-weight: 700; margin-bottom: 1rem;">Combination Therapies</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Multiple medications working together to manage complex chronic conditions effectively.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(74, 85, 104, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #4a5568; font-weight: 600;">Examples: Fixed-dose combinations</small>
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(127, 140, 141, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #6c757d, #495057);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 7s linear infinite;
                  ">
                    <i class="fas fa-capsules" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #6c757d; font-weight: 700; margin-bottom: 1rem;">Pain Management</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Long-term pain relief for chronic pain conditions like arthritis and fibromyalgia.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(108, 117, 125, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #6c757d; font-weight: 600;">Examples: NSAIDs, topical analgesics</small>
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(127, 140, 141, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #495057, #343a40);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 9s linear infinite;
                  ">
                    <i class="fas fa-pills" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #495057; font-weight: 700; margin-bottom: 1rem;">Lifestyle Medications</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Medications that help maintain quality of life and prevent complications in chronic diseases.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(73, 80, 87, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #495057; font-weight: 600;">Examples: Cholesterol meds, blood thinners</small>
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(127, 140, 141, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #343a40, #212529);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 11s linear infinite;
                  ">
                    <i class="fas fa-tablets" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #343a40; font-weight: 700; margin-bottom: 1rem;">Specialty Medications</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    High-cost, specialized drugs for rare chronic conditions requiring expert monitoring.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(52, 58, 64, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #343a40; font-weight: 600;">Examples: Biologics, gene therapies</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Important Note Section -->
        <div class="note-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          background: linear-gradient(135deg, #d1ecf1, #bee5eb);
          border-left: 6px solid #17a2b8;
          animation: noteGlow 4s ease-in-out infinite;
        ">
          <div class="card-body" style="padding: 2rem;">
            <div class="d-flex align-items-start">
              <i class="fas fa-info-circle" style="
                color: #0c5460;
                font-size: 2rem;
                margin-right: 1rem;
                margin-top: 0.5rem;
              "></i>
              <div>
                <h4 style="color: #0c5460; font-weight: 700; margin-bottom: 1rem;">Long-Term Care Notice</h4>
                <p style="color: #0c5460; font-size: 1rem; line-height: 1.6; margin-bottom: 0;">
                  Chronic condition medications require ongoing medical supervision and regular monitoring. 
                  Never stop taking these medications without consulting your healthcare provider. 
                  Regular blood tests, check-ups, and dosage adjustments may be necessary. 
                  Adherence to treatment plans is crucial for managing chronic conditions effectively.
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
    @keyframes backgroundPulse {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    
    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    
    @keyframes medicalFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(10deg); }
    }
    
    @keyframes chronicPulse {
      0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
      50% { transform: scale(1.1); box-shadow: 0 0 30px rgba(255, 255, 255, 0.5); }
    }
    
    @keyframes chronicRotate {
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
    
    @keyframes medicineIconSpin {
      0% { transform: rotateY(0deg); }
      100% { transform: rotateY(360deg); }
    }
    
    @keyframes noteGlow {
      0%, 100% { box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1); }
      50% { box-shadow: 0 25px 70px rgba(23, 162, 184, 0.2), 0 20px 60px rgba(0, 0, 0, 0.1); }
    }
    
    .medicine-card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    }
    
    .symptom-item:hover {
      transform: translateX(5px);
      background: rgba(127, 140, 141, 0.1) !important;
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
    }
  `]
})
export class ChronicConditionsComponent {}
