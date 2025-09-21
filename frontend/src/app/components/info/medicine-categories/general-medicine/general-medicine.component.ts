import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-general-medicine',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e8f5e8 50%, #f8f9fa 100%);
      min-height: 100vh;
      animation: backgroundPulse 8s ease-in-out infinite;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #28a745, #20c997, #28a745);
        background-size: 200% 200%;
        animation: gradientShift 6s ease-in-out infinite;
        color: white;
        padding: 4rem 0;
        position: relative;
        overflow: hidden;
      ">
        <div class="floating-pills" style="position: absolute; width: 100%; height: 100%;">
          <div class="pill-icon" style="
            position: absolute;
            top: 20%;
            left: 10%;
            font-size: 2rem;
            color: rgba(255, 255, 255, 0.2);
            animation: pillFloat 8s ease-in-out infinite;
          ">
            <i class="fas fa-pills"></i>
          </div>
          <div class="pill-icon" style="
            position: absolute;
            top: 60%;
            right: 15%;
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.3);
            animation: pillFloat 10s ease-in-out infinite 2s;
          ">
            <i class="fas fa-tablets"></i>
          </div>
          <div class="pill-icon" style="
            position: absolute;
            bottom: 30%;
            left: 20%;
            font-size: 2.5rem;
            color: rgba(255, 255, 255, 0.15);
            animation: pillFloat 12s ease-in-out infinite 4s;
          ">
            <i class="fas fa-prescription-bottle-alt"></i>
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
            animation: iconPulse 3s ease-in-out infinite;
          ">
            <i class="fas fa-pills" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1rem;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            animation: titleGlow 4s ease-in-out infinite;
          ">General Medicine</h1>
          <p style="
            font-size: 1.3rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          ">Essential medications for common health conditions and everyday wellness</p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- What is General Medicine Section -->
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
                  color: #28a745;
                  font-size: 2.5rem;
                  font-weight: 700;
                  margin-bottom: 2rem;
                  background: linear-gradient(135deg, #28a745, #20c997);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                ">What is General Medicine?</h2>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #555; margin-bottom: 1.5rem;">
                  General Medicine encompasses a broad range of medications used to treat common health conditions, 
                  prevent diseases, and maintain overall wellness. These medicines are typically available over-the-counter 
                  or by prescription for everyday health needs.
                </p>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
                  From pain relievers and fever reducers to vitamins and supplements, general medicines form the 
                  foundation of healthcare treatment for millions of people worldwide.
                </p>
              </div>
              <div class="col-lg-4 text-center">
                <div class="medicine-illustration" style="
                  font-size: 8rem;
                  color: rgba(40, 167, 69, 0.1);
                  animation: medicineRotate 10s linear infinite;
                ">
                  <i class="fas fa-pills"></i>
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
          background: linear-gradient(145deg, #f8f9fa, #ffffff);
          animation: cardFloat 8s ease-in-out infinite 2s;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="
              color: #dc3545;
              font-size: 2.2rem;
              font-weight: 700;
              margin-bottom: 2rem;
              text-align: center;
            ">Common Symptoms Treated</h3>
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
                  <i class="fas fa-thermometer-half" style="color: #dc3545; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Fever and Body Aches</span>
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
                  <i class="fas fa-head-side-cough" style="color: #dc3545; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Headaches and Migraines</span>
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
                  <span style="font-weight: 600;">Cough and Cold</span>
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
                  <i class="fas fa-stomach" style="color: #dc3545; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Digestive Issues</span>
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
                  <i class="fas fa-allergies" style="color: #dc3545; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Allergies and Skin Issues</span>
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
                  <i class="fas fa-bed" style="color: #dc3545; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Sleep Disorders</span>
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
          background: linear-gradient(145deg, #ffffff, #f0f8f0);
          animation: cardFloat 10s ease-in-out infinite 4s;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="
              color: #28a745;
              font-size: 2.2rem;
              font-weight: 700;
              margin-bottom: 2rem;
              text-align: center;
            ">Best General Medicines</h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(40, 167, 69, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #28a745, #20c997);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 6s linear infinite;
                  ">
                    <i class="fas fa-tablets" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #28a745; font-weight: 700; margin-bottom: 1rem;">Paracetamol</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Effective for fever, headaches, and mild to moderate pain relief. Safe for most age groups.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(40, 167, 69, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #28a745; font-weight: 600;">Dosage: 500mg-1000mg every 4-6 hours</small>
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
                  border: 2px solid rgba(40, 167, 69, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #17a2b8, #138496);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 8s linear infinite;
                  ">
                    <i class="fas fa-pills" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #17a2b8; font-weight: 700; margin-bottom: 1rem;">Ibuprofen</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Anti-inflammatory medicine for pain, fever, and swelling. Good for muscle aches and joint pain.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(23, 162, 184, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #17a2b8; font-weight: 600;">Dosage: 400mg-600mg every 6-8 hours</small>
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
                  border: 2px solid rgba(40, 167, 69, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #ffc107, #e0a800);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 10s linear infinite;
                  ">
                    <i class="fas fa-prescription-bottle-alt" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #ffc107; font-weight: 700; margin-bottom: 1rem;">Multivitamins</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Essential vitamins and minerals for daily health maintenance and immune system support.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(255, 193, 7, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #ffc107; font-weight: 600;">Dosage: 1 tablet daily with food</small>
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
                  border: 2px solid rgba(40, 167, 69, 0.1);
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
                    animation: medicineIconSpin 7s linear infinite;
                  ">
                    <i class="fas fa-capsules" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #dc3545; font-weight: 700; margin-bottom: 1rem;">Antacids</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Quick relief from heartburn, acid indigestion, and stomach upset. Fast-acting formula.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(220, 53, 69, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #dc3545; font-weight: 600;">Dosage: 1-2 tablets as needed</small>
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
                  border: 2px solid rgba(40, 167, 69, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #6f42c1, #563d7c);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 9s linear infinite;
                  ">
                    <i class="fas fa-pills" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #6f42c1; font-weight: 700; margin-bottom: 1rem;">Antihistamines</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Effective for allergies, hay fever, and allergic reactions. Reduces sneezing and itching.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(111, 66, 193, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #6f42c1; font-weight: 600;">Dosage: 10mg once daily</small>
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
                  border: 2px solid rgba(40, 167, 69, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #fd7e14, #e55a00);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 11s linear infinite;
                  ">
                    <i class="fas fa-tablets" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #fd7e14; font-weight: 700; margin-bottom: 1rem;">Probiotics</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Supports digestive health and immune system. Contains beneficial bacteria for gut health.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(253, 126, 20, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #fd7e14; font-weight: 600;">Dosage: 1 capsule daily</small>
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
          background: linear-gradient(135deg, #fff3cd, #ffeaa7);
          border-left: 6px solid #ffc107;
          animation: noteGlow 4s ease-in-out infinite;
        ">
          <div class="card-body" style="padding: 2rem;">
            <div class="d-flex align-items-start">
              <i class="fas fa-exclamation-triangle" style="
                color: #856404;
                font-size: 2rem;
                margin-right: 1rem;
                margin-top: 0.5rem;
              "></i>
              <div>
                <h4 style="color: #856404; font-weight: 700; margin-bottom: 1rem;">Important Note</h4>
                <p style="color: #856404; font-size: 1rem; line-height: 1.6; margin-bottom: 0;">
                  Always consult with a healthcare professional before starting any new medication. 
                  This information is for educational purposes only and should not replace professional medical advice. 
                  Read medicine labels carefully and follow dosage instructions.
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
    
    @keyframes pillFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    @keyframes iconPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    @keyframes titleGlow {
      0%, 100% { text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); }
      50% { text-shadow: 0 4px 30px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 255, 255, 0.3); }
    }
    
    @keyframes cardFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
    }
    
    @keyframes medicineRotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes medicineIconSpin {
      0% { transform: rotateY(0deg); }
      100% { transform: rotateY(360deg); }
    }
    
    @keyframes noteGlow {
      0%, 100% { box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1); }
      50% { box-shadow: 0 25px 70px rgba(255, 193, 7, 0.2), 0 20px 60px rgba(0, 0, 0, 0.1); }
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
export class GeneralMedicineComponent {}
