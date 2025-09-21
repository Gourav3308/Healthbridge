import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-respiratory-care',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #f0f8ff 0%, #e0f0ff 50%, #f0f8ff 100%);
      min-height: 100vh;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #3498db, #2980b9, #3498db);
        color: white; padding: 4rem 0;
      ">
        <div class="container text-center">
          <div class="category-icon" style="
            width: 120px; height: 120px; margin: 0 auto 2rem;
            background: rgba(255, 255, 255, 0.2); border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
          ">
            <i class="fas fa-lungs" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Respiratory Care</h1>
          <p style="font-size: 1.3rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
            Lung and breathing health medications for respiratory wellness
          </p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- Info Section -->
        <div class="info-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #f0f8ff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h2 style="color: #3498db; font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">
              Respiratory Health
            </h2>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
              Respiratory care medications treat conditions affecting the lungs, airways, and breathing. 
              These medicines help manage asthma, COPD, bronchitis, and other respiratory disorders.
            </p>
          </div>
        </div>

        <!-- Common Conditions -->
        <div class="symptoms-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #f0f8ff, #ffffff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #3498db; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Respiratory Conditions
            </h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(52, 152, 219, 0.05); border-radius: 10px;
                  border-left: 4px solid #3498db;
                ">
                  <i class="fas fa-wind" style="color: #3498db; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Asthma & Wheezing</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(52, 152, 219, 0.05); border-radius: 10px;
                  border-left: 4px solid #3498db;
                ">
                  <i class="fas fa-lungs-virus" style="color: #3498db; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Bronchitis & COPD</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(52, 152, 219, 0.05); border-radius: 10px;
                  border-left: 4px solid #3498db;
                ">
                  <i class="fas fa-head-side-cough" style="color: #3498db; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Persistent Cough</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(52, 152, 219, 0.05); border-radius: 10px;
                  border-left: 4px solid #3498db;
                ">
                  <i class="fas fa-allergies" style="color: #3498db; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Allergic Rhinitis</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Best Medicines -->
        <div class="medicines-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; background: linear-gradient(145deg, #ffffff, #f0f8ff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #3498db; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Respiratory Medications
            </h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(52, 152, 219, 0.1);
                ">
                  <h5 style="color: #3498db; font-weight: 700;">Bronchodilators</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Opens airways and makes breathing easier. Essential for asthma and COPD management.
                  </p>
                  <div class="dosage-info" style="background: rgba(52, 152, 219, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Salbutamol, Albuterol<br>
                    <strong>Form:</strong> Inhaler, 2 puffs as needed
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(52, 152, 219, 0.1);
                ">
                  <h5 style="color: #2980b9; font-weight: 700;">Cough Suppressants</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Reduces coughing and provides relief from persistent, dry coughs.
                  </p>
                  <div class="dosage-info" style="background: rgba(41, 128, 185, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Dextromethorphan<br>
                    <strong>Dosage:</strong> 15mg every 4 hours
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(52, 152, 219, 0.1);
                ">
                  <h5 style="color: #1f618d; font-weight: 700;">Expectorants</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Helps loosen and clear mucus from airways, making coughs more productive.
                  </p>
                  <div class="dosage-info" style="background: rgba(31, 97, 141, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Guaifenesin<br>
                    <strong>Dosage:</strong> 200-400mg every 4 hours
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .symptom-item:hover {
      transform: translateX(5px);
      background: rgba(52, 152, 219, 0.1) !important;
    }
  `]
})
export class RespiratoryCareComponent {}
