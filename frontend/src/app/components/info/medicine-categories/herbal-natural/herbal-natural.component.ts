import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-herbal-natural',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #f0fff0 0%, #e8f5e8 50%, #f0fff0 100%);
      min-height: 100vh;
      animation: backgroundPulse 8s ease-in-out infinite;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #27ae60, #2ecc71, #27ae60);
        background-size: 200% 200%;
        animation: gradientShift 6s ease-in-out infinite;
        color: white;
        padding: 4rem 0;
        position: relative;
        overflow: hidden;
      ">
        <div class="floating-herbs" style="position: absolute; width: 100%; height: 100%;">
          <div class="herb-icon" style="
            position: absolute;
            top: 20%;
            left: 10%;
            font-size: 2rem;
            color: rgba(255, 255, 255, 0.2);
            animation: herbFloat 4s ease-in-out infinite;
          ">
            <i class="fas fa-seedling"></i>
          </div>
          <div class="herb-icon" style="
            position: absolute;
            top: 60%;
            right: 15%;
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.3);
            animation: herbFloat 3s ease-in-out infinite 0.5s;
          ">
            <i class="fas fa-leaf"></i>
          </div>
          <div class="herb-icon" style="
            position: absolute;
            bottom: 30%;
            left: 20%;
            font-size: 2.5rem;
            color: rgba(255, 255, 255, 0.15);
            animation: herbFloat 5s ease-in-out infinite 1s;
          ">
            <i class="fas fa-spa"></i>
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
            animation: herbPulse 3s ease-in-out infinite;
          ">
            <i class="fas fa-seedling" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1rem;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            animation: titleGlow 4s ease-in-out infinite;
          ">Herbal & Natural</h1>
          <p style="
            font-size: 1.3rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          ">Natural remedies and herbal supplements for holistic wellness</p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- What are Herbal & Natural Remedies Section -->
        <div class="info-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          overflow: hidden;
          background: linear-gradient(145deg, #ffffff, #f0fff0);
          animation: cardFloat 6s ease-in-out infinite;
        ">
          <div class="card-body" style="padding: 3rem;">
            <div class="row align-items-center">
              <div class="col-lg-8">
                <h2 style="
                  color: #27ae60;
                  font-size: 2.5rem;
                  font-weight: 700;
                  margin-bottom: 2rem;
                  background: linear-gradient(135deg, #27ae60, #2ecc71);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                ">What are Herbal & Natural Remedies?</h2>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #555; margin-bottom: 1.5rem;">
                  Herbal and natural remedies are plant-based medicines and supplements derived from herbs, roots, 
                  flowers, and other natural sources. These traditional remedies have been used for centuries to 
                  promote health and treat various conditions naturally.
                </p>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
                  From adaptogenic herbs and immune-boosting plants to digestive aids and stress-relief botanicals, 
                  natural remedies offer gentle, holistic approaches to wellness and health maintenance.
                </p>
              </div>
              <div class="col-lg-4 text-center">
                <div class="herb-illustration" style="
                  font-size: 8rem;
                  color: rgba(39, 174, 96, 0.1);
                  animation: herbRotate 20s linear infinite;
                ">
                  <i class="fas fa-seedling"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Popular Natural Remedies Section -->
        <div class="medicines-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #f8fff8);
          animation: cardFloat 10s ease-in-out infinite 4s;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="
              color: #27ae60;
              font-size: 2.2rem;
              font-weight: 700;
              margin-bottom: 2rem;
              text-align: center;
            ">Popular Natural Remedies</h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(39, 174, 96, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #27ae60, #2ecc71);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 6s linear infinite;
                  ">
                    <i class="fas fa-leaf" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #27ae60; font-weight: 700; margin-bottom: 1rem;">Turmeric (Curcumin)</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Powerful anti-inflammatory and antioxidant herb. Helps with joint pain and inflammation.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(39, 174, 96, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #27ae60; font-weight: 600;">Dosage: 500-1000mg daily with black pepper</small>
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
                  border: 2px solid rgba(39, 174, 96, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #2ecc71, #58d68d);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 8s linear infinite;
                  ">
                    <i class="fas fa-spa" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #2ecc71; font-weight: 700; margin-bottom: 1rem;">Ginger</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Natural remedy for nausea, motion sickness, and digestive issues. Anti-inflammatory properties.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(46, 204, 113, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #2ecc71; font-weight: 600;">Dosage: 250-1000mg daily or as tea</small>
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
                  border: 2px solid rgba(39, 174, 96, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #58d68d, #82e0aa);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 10s linear infinite;
                  ">
                    <i class="fas fa-seedling" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #58d68d; font-weight: 700; margin-bottom: 1rem;">Echinacea</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Immune system booster that helps prevent and reduce duration of cold and flu symptoms.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(88, 214, 141, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #58d68d; font-weight: 600;">Dosage: 300-500mg 3 times daily</small>
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
          background: linear-gradient(135deg, #d5f4e6, #c3e9d0);
          border-left: 6px solid #27ae60;
          animation: noteGlow 4s ease-in-out infinite;
        ">
          <div class="card-body" style="padding: 2rem;">
            <div class="d-flex align-items-start">
              <i class="fas fa-leaf" style="
                color: #1e7e34;
                font-size: 2rem;
                margin-right: 1rem;
                margin-top: 0.5rem;
              "></i>
              <div>
                <h4 style="color: #1e7e34; font-weight: 700; margin-bottom: 1rem;">Natural Safety Note</h4>
                <p style="color: #1e7e34; font-size: 1rem; line-height: 1.6; margin-bottom: 0;">
                  "Natural" doesn't always mean "safe." Herbal remedies can interact with prescription medications 
                  and may have side effects. Always consult with a healthcare provider before starting any herbal 
                  supplements, especially if you're taking other medications or have existing health conditions. 
                  Quality and potency can vary significantly between brands.
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
    
    @keyframes herbFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(10deg); }
    }
    
    @keyframes herbPulse {
      0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
      50% { transform: scale(1.1); box-shadow: 0 0 30px rgba(255, 255, 255, 0.5); }
    }
    
    @keyframes herbRotate {
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
      50% { box-shadow: 0 25px 70px rgba(39, 174, 96, 0.2), 0 20px 60px rgba(0, 0, 0, 0.1); }
    }
    
    .medicine-card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    }
    
    .symptom-item:hover {
      transform: translateX(5px);
      background: rgba(39, 174, 96, 0.1) !important;
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
export class HerbalNaturalComponent {}