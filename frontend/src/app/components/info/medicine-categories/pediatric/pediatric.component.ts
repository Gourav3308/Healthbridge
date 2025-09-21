import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-pediatric',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #fff8f0 0%, #ffe8d6 50%, #fff8f0 100%);
      min-height: 100vh;
      animation: backgroundPulse 8s ease-in-out infinite;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #fd7e14, #ff9f43, #fd7e14);
        background-size: 200% 200%;
        animation: gradientShift 6s ease-in-out infinite;
        color: white;
        padding: 4rem 0;
        position: relative;
        overflow: hidden;
      ">
        <div class="floating-children" style="position: absolute; width: 100%; height: 100%;">
          <div class="child-icon" style="
            position: absolute;
            top: 20%;
            left: 10%;
            font-size: 2rem;
            color: rgba(255, 255, 255, 0.2);
            animation: childFloat 4s ease-in-out infinite;
          ">
            <i class="fas fa-child"></i>
          </div>
          <div class="child-icon" style="
            position: absolute;
            top: 60%;
            right: 15%;
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.3);
            animation: childFloat 3s ease-in-out infinite 0.5s;
          ">
            <i class="fas fa-baby"></i>
          </div>
          <div class="child-icon" style="
            position: absolute;
            bottom: 30%;
            left: 20%;
            font-size: 2.5rem;
            color: rgba(255, 255, 255, 0.15);
            animation: childFloat 5s ease-in-out infinite 1s;
          ">
            <i class="fas fa-teddy-bear"></i>
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
            animation: childPulse 3s ease-in-out infinite;
          ">
            <i class="fas fa-child" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1rem;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            animation: titleGlow 4s ease-in-out infinite;
          ">Pediatric Care</h1>
          <p style="
            font-size: 1.3rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          ">Safe and effective medications specially designed for children's health and wellness</p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- What is Pediatric Care Section -->
        <div class="info-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          overflow: hidden;
          background: linear-gradient(145deg, #ffffff, #fff8f0);
          animation: cardFloat 6s ease-in-out infinite;
        ">
          <div class="card-body" style="padding: 3rem;">
            <div class="row align-items-center">
              <div class="col-lg-8">
                <h2 style="
                  color: #fd7e14;
                  font-size: 2.5rem;
                  font-weight: 700;
                  margin-bottom: 2rem;
                  background: linear-gradient(135deg, #fd7e14, #ff9f43);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                ">What is Pediatric Care?</h2>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #555; margin-bottom: 1.5rem;">
                  Pediatric care involves specialized medications and treatments designed specifically for infants, 
                  children, and adolescents. These medicines are formulated with appropriate dosages, flavors, 
                  and safety profiles suitable for young patients.
                </p>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
                  From liquid formulations and chewable tablets to age-appropriate dosing, pediatric medicines 
                  ensure safe and effective treatment for common childhood illnesses and conditions.
                </p>
              </div>
              <div class="col-lg-4 text-center">
                <div class="child-illustration" style="
                  font-size: 8rem;
                  color: rgba(253, 126, 20, 0.1);
                  animation: childSpin 20s linear infinite;
                ">
                  <i class="fas fa-child"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Common Conditions Section -->
        <div class="symptoms-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #fff8f0, #ffffff);
          animation: cardFloat 8s ease-in-out infinite 2s;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="
              color: #fd7e14;
              font-size: 2.2rem;
              font-weight: 700;
              margin-bottom: 2rem;
              text-align: center;
            ">Common Childhood Conditions</h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(253, 126, 20, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #fd7e14;
                ">
                  <i class="fas fa-thermometer-half" style="color: #fd7e14; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Fever & Common Cold</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(253, 126, 20, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #fd7e14;
                ">
                  <i class="fas fa-lungs" style="color: #fd7e14; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Cough & Respiratory Issues</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(253, 126, 20, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #fd7e14;
                ">
                  <i class="fas fa-stomach" style="color: #fd7e14; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Digestive Problems</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(253, 126, 20, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #fd7e14;
                ">
                  <i class="fas fa-allergies" style="color: #fd7e14; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Allergies & Skin Rashes</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(253, 126, 20, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #fd7e14;
                ">
                  <i class="fas fa-ear-deaf" style="color: #fd7e14; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Ear Infections</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(253, 126, 20, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #fd7e14;
                ">
                  <i class="fas fa-syringe" style="color: #fd7e14; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Vaccination Schedule</span>
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
              color: #fd7e14;
              font-size: 2.2rem;
              font-weight: 700;
              margin-bottom: 2rem;
              text-align: center;
            ">Pediatric Medications</h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(253, 126, 20, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #fd7e14, #ff9f43);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 6s linear infinite;
                  ">
                    <i class="fas fa-tint" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #fd7e14; font-weight: 700; margin-bottom: 1rem;">Liquid Paracetamol</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Child-friendly liquid formulation for fever and pain relief. Sweet taste and easy administration.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(253, 126, 20, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #fd7e14; font-weight: 600;">Dosage: Based on weight (10-15mg/kg)</small>
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
                  border: 2px solid rgba(253, 126, 20, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #ff9f43, #ffb366);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 8s linear infinite;
                  ">
                    <i class="fas fa-tablets" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #ff9f43; font-weight: 700; margin-bottom: 1rem;">Chewable Vitamins</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Essential vitamins in fun, chewable forms that children love. Supports healthy growth and development.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(255, 159, 67, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #ff9f43; font-weight: 600;">Dosage: 1 tablet daily with food</small>
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
                  border: 2px solid rgba(253, 126, 20, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #ffb366, #ffc299);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 10s linear infinite;
                  ">
                    <i class="fas fa-prescription-bottle-alt" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #ffb366; font-weight: 700; margin-bottom: 1rem;">Antihistamine Syrup</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Gentle allergy relief for children with seasonal allergies, hay fever, and allergic reactions.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(255, 179, 102, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #ffb366; font-weight: 600;">Dosage: 2.5-5ml twice daily</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Safety Note Section -->
        <div class="note-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          background: linear-gradient(135deg, #fff3cd, #ffeaa7);
          border-left: 6px solid #fd7e14;
          animation: noteGlow 4s ease-in-out infinite;
        ">
          <div class="card-body" style="padding: 2rem;">
            <div class="d-flex align-items-start">
              <i class="fas fa-shield-alt" style="
                color: #856404;
                font-size: 2rem;
                margin-right: 1rem;
                margin-top: 0.5rem;
              "></i>
              <div>
                <h4 style="color: #856404; font-weight: 700; margin-bottom: 1rem;">Pediatric Safety First</h4>
                <p style="color: #856404; font-size: 1rem; line-height: 1.6; margin-bottom: 0;">
                  Children's medications require special care and pediatrician supervision. Always use age-appropriate 
                  formulations, follow weight-based dosing, and keep medicines out of children's reach. 
                  Consult a pediatrician before giving any medication to children under 2 years old.
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
    
    @keyframes childFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(5deg); }
    }
    
    @keyframes childPulse {
      0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
      50% { transform: scale(1.1); box-shadow: 0 0 30px rgba(255, 255, 255, 0.5); }
    }
    
    @keyframes childSpin {
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
      50% { box-shadow: 0 25px 70px rgba(253, 126, 20, 0.2), 0 20px 60px rgba(0, 0, 0, 0.1); }
    }
    
    .medicine-card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    }
    
    .symptom-item:hover {
      transform: translateX(5px);
      background: rgba(253, 126, 20, 0.1) !important;
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
export class PediatricComponent {}
