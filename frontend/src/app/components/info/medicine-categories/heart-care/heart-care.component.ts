import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-heart-care',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #fff5f5 0%, #ffe6e6 50%, #fff5f5 100%);
      min-height: 100vh;
      animation: backgroundPulse 8s ease-in-out infinite;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #dc3545, #e74c3c, #dc3545);
        background-size: 200% 200%;
        animation: gradientShift 6s ease-in-out infinite;
        color: white;
        padding: 4rem 0;
        position: relative;
        overflow: hidden;
      ">
        <div class="floating-hearts" style="position: absolute; width: 100%; height: 100%;">
          <div class="heart-icon" style="
            position: absolute;
            top: 20%;
            left: 10%;
            font-size: 2rem;
            color: rgba(255, 255, 255, 0.2);
            animation: heartbeat 2s ease-in-out infinite;
          ">
            <i class="fas fa-heartbeat"></i>
          </div>
          <div class="heart-icon" style="
            position: absolute;
            top: 60%;
            right: 15%;
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.3);
            animation: heartbeat 1.5s ease-in-out infinite 0.5s;
          ">
            <i class="fas fa-heart"></i>
          </div>
          <div class="heart-icon" style="
            position: absolute;
            bottom: 30%;
            left: 20%;
            font-size: 2.5rem;
            color: rgba(255, 255, 255, 0.15);
            animation: heartbeat 2.5s ease-in-out infinite 1s;
          ">
            <i class="fas fa-stethoscope"></i>
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
            animation: heartPulse 2s ease-in-out infinite;
          ">
            <i class="fas fa-heartbeat" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1rem;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            animation: titleGlow 4s ease-in-out infinite;
          ">Heart Care</h1>
          <p style="
            font-size: 1.3rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          ">Specialized medications for cardiovascular health and heart wellness</p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- What is Heart Care Section -->
        <div class="info-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          overflow: hidden;
          background: linear-gradient(145deg, #ffffff, #fff5f5);
          animation: cardFloat 6s ease-in-out infinite;
        ">
          <div class="card-body" style="padding: 3rem;">
            <div class="row align-items-center">
              <div class="col-lg-8">
                <h2 style="
                  color: #dc3545;
                  font-size: 2.5rem;
                  font-weight: 700;
                  margin-bottom: 2rem;
                  background: linear-gradient(135deg, #dc3545, #e74c3c);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                ">What is Heart Care?</h2>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #555; margin-bottom: 1.5rem;">
                  Heart care medications are specialized drugs designed to treat and prevent cardiovascular diseases, 
                  manage heart conditions, and maintain optimal heart health. These medicines help regulate blood pressure, 
                  control cholesterol levels, and improve overall cardiac function.
                </p>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
                  From blood thinners and ACE inhibitors to statins and beta-blockers, heart care medicines play a 
                  crucial role in preventing heart attacks, strokes, and other cardiovascular complications.
                </p>
              </div>
              <div class="col-lg-4 text-center">
                <div class="heart-illustration" style="
                  font-size: 8rem;
                  color: rgba(220, 53, 69, 0.1);
                  animation: heartbeatLarge 2s ease-in-out infinite;
                ">
                  <i class="fas fa-heartbeat"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Common Symptoms Section -->
        <div class="symptoms-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #fff5f5, #ffffff);
          animation: cardFloat 8s ease-in-out infinite 2s;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="
              color: #dc3545;
              font-size: 2.2rem;
              font-weight: 700;
              margin-bottom: 2rem;
              text-align: center;
            ">Heart-Related Symptoms</h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(220, 53, 69, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #dc3545;
                ">
                  <i class="fas fa-heartbeat" style="color: #dc3545; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">High Blood Pressure</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(220, 53, 69, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #dc3545;
                ">
                  <i class="fas fa-tachometer-alt" style="color: #dc3545; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">High Cholesterol</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(220, 53, 69, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #dc3545;
                ">
                  <i class="fas fa-lungs" style="color: #dc3545; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Chest Pain & Angina</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(220, 53, 69, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #dc3545;
                ">
                  <i class="fas fa-running" style="color: #dc3545; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Irregular Heartbeat</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(220, 53, 69, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #dc3545;
                ">
                  <i class="fas fa-tired" style="color: #dc3545; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Shortness of Breath</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(220, 53, 69, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #dc3545;
                ">
                  <i class="fas fa-hand-paper" style="color: #dc3545; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Swelling in Legs/Feet</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Best Medicines Section -->
        <div class="medicines-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #fff0f0);
          animation: cardFloat 10s ease-in-out infinite 4s;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="
              color: #dc3545;
              font-size: 2.2rem;
              font-weight: 700;
              margin-bottom: 2rem;
              text-align: center;
            ">Heart Care Medications</h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(220, 53, 69, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #dc3545, #c82333);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 6s linear infinite;
                  ">
                    <i class="fas fa-tablets" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #dc3545; font-weight: 700; margin-bottom: 1rem;">ACE Inhibitors</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Helps lower blood pressure and reduce strain on the heart. Commonly used for hypertension and heart failure.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(220, 53, 69, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #dc3545; font-weight: 600;">Example: Lisinopril, Enalapril</small>
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
                  border: 2px solid rgba(220, 53, 69, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #e74c3c, #c0392b);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 8s linear infinite;
                  ">
                    <i class="fas fa-pills" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #e74c3c; font-weight: 700; margin-bottom: 1rem;">Beta Blockers</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Reduces heart rate and blood pressure. Effective for treating irregular heartbeats and chest pain.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(231, 76, 60, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #e74c3c; font-weight: 600;">Example: Metoprolol, Atenolol</small>
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
                  border: 2px solid rgba(220, 53, 69, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #f39c12, #e67e22);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 10s linear infinite;
                  ">
                    <i class="fas fa-prescription-bottle-alt" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #f39c12; font-weight: 700; margin-bottom: 1rem;">Statins</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Lowers cholesterol levels and reduces risk of heart disease. Prevents buildup of plaque in arteries.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(243, 156, 18, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #f39c12; font-weight: 600;">Example: Atorvastatin, Simvastatin</small>
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
                  border: 2px solid rgba(220, 53, 69, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #3498db, #2980b9);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 7s linear infinite;
                  ">
                    <i class="fas fa-capsules" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #3498db; font-weight: 700; margin-bottom: 1rem;">Blood Thinners</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Prevents blood clots and reduces risk of stroke and heart attack. Essential for many heart conditions.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(52, 152, 219, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #3498db; font-weight: 600;">Example: Warfarin, Aspirin</small>
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
                  border: 2px solid rgba(220, 53, 69, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #9b59b6, #8e44ad);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 9s linear infinite;
                  ">
                    <i class="fas fa-pills" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #9b59b6; font-weight: 700; margin-bottom: 1rem;">Diuretics</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Helps remove excess fluid from the body, reducing blood pressure and easing workload on the heart.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(155, 89, 182, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #9b59b6; font-weight: 600;">Example: Furosemide, Hydrochlorothiazide</small>
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
                  border: 2px solid rgba(220, 53, 69, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #1abc9c, #16a085);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 11s linear infinite;
                  ">
                    <i class="fas fa-tablets" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #1abc9c; font-weight: 700; margin-bottom: 1rem;">Nitrates</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Relieves chest pain by improving blood flow to the heart. Used for angina and heart failure.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(26, 188, 156, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #1abc9c; font-weight: 600;">Example: Nitroglycerin, Isosorbide</small>
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
          background: linear-gradient(135deg, #f8d7da, #f5c6cb);
          border-left: 6px solid #dc3545;
          animation: noteGlow 4s ease-in-out infinite;
        ">
          <div class="card-body" style="padding: 2rem;">
            <div class="d-flex align-items-start">
              <i class="fas fa-exclamation-triangle" style="
                color: #721c24;
                font-size: 2rem;
                margin-right: 1rem;
                margin-top: 0.5rem;
              "></i>
              <div>
                <h4 style="color: #721c24; font-weight: 700; margin-bottom: 1rem;">Critical Warning</h4>
                <p style="color: #721c24; font-size: 1rem; line-height: 1.6; margin-bottom: 0;">
                  Heart medications require strict medical supervision. Never start, stop, or change dosages without 
                  consulting a cardiologist. Regular monitoring of blood pressure, heart rate, and blood tests are essential. 
                  This information is for educational purposes only and should not replace professional cardiac care.
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
    
    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.3); }
    }
    
    @keyframes heartPulse {
      0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
      50% { transform: scale(1.1); box-shadow: 0 0 30px rgba(255, 255, 255, 0.5); }
    }
    
    @keyframes heartbeatLarge {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.2); }
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
      50% { box-shadow: 0 25px 70px rgba(220, 53, 69, 0.2), 0 20px 60px rgba(0, 0, 0, 0.1); }
    }
    
    .medicine-card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    }
    
    .symptom-item:hover {
      transform: translateX(5px);
      background: rgba(220, 53, 69, 0.1) !important;
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
export class HeartCareComponent {}
