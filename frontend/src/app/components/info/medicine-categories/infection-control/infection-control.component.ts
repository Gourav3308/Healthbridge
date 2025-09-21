import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-infection-control',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #fff0f0 0%, #ffe0e0 50%, #fff0f0 100%);
      min-height: 100vh;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #e74c3c, #c0392b, #e74c3c);
        color: white; padding: 4rem 0;
      ">
        <div class="container text-center">
          <div class="category-icon" style="
            width: 120px; height: 120px; margin: 0 auto 2rem;
            background: rgba(255, 255, 255, 0.2); border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
          ">
            <i class="fas fa-virus-slash" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Infection Control</h1>
          <p style="font-size: 1.3rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
            Antibiotics and antivirals for fighting infections and diseases
          </p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- Info Section -->
        <div class="info-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #fff0f0);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h2 style="color: #e74c3c; font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">
              Infection Control
            </h2>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
              Infection control medications fight bacterial, viral, and fungal infections. 
              These medicines help your immune system eliminate harmful pathogens and prevent disease spread.
            </p>
          </div>
        </div>

        <!-- Types of Infections -->
        <div class="symptoms-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #fff0f0, #ffffff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #e74c3c; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Types of Infections
            </h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(231, 76, 60, 0.05); border-radius: 10px;
                  border-left: 4px solid #e74c3c;
                ">
                  <i class="fas fa-bacteria" style="color: #e74c3c; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Bacterial Infections</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(231, 76, 60, 0.05); border-radius: 10px;
                  border-left: 4px solid #e74c3c;
                ">
                  <i class="fas fa-virus" style="color: #e74c3c; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Viral Infections</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(231, 76, 60, 0.05); border-radius: 10px;
                  border-left: 4px solid #e74c3c;
                ">
                  <i class="fas fa-microscope" style="color: #e74c3c; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Fungal Infections</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(231, 76, 60, 0.05); border-radius: 10px;
                  border-left: 4px solid #e74c3c;
                ">
                  <i class="fas fa-bug" style="color: #e74c3c; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Parasitic Infections</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Best Medicines -->
        <div class="medicines-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; background: linear-gradient(145deg, #ffffff, #fff0f0);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #e74c3c; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Infection Control Medications
            </h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(231, 76, 60, 0.1);
                ">
                  <h5 style="color: #e74c3c; font-weight: 700;">Antibiotics</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Fight bacterial infections. Must be taken as prescribed to prevent antibiotic resistance.
                  </p>
                  <div class="dosage-info" style="background: rgba(231, 76, 60, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Amoxicillin, Azithromycin<br>
                    <strong>Duration:</strong> Complete full course
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(231, 76, 60, 0.1);
                ">
                  <h5 style="color: #c0392b; font-weight: 700;">Antivirals</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Treat viral infections like flu, herpes, and COVID-19. Most effective when started early.
                  </p>
                  <div class="dosage-info" style="background: rgba(192, 57, 43, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Oseltamivir, Acyclovir<br>
                    <strong>Timing:</strong> Within 48 hours of symptoms
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(231, 76, 60, 0.1);
                ">
                  <h5 style="color: #a93226; font-weight: 700;">Antifungals</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Treat fungal infections of skin, nails, and internal organs. Available in various forms.
                  </p>
                  <div class="dosage-info" style="background: rgba(169, 50, 38, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Fluconazole, Terbinafine<br>
                    <strong>Forms:</strong> Oral, topical, IV
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
      background: rgba(231, 76, 60, 0.1) !important;
    }
  `]
})
export class InfectionControlComponent {}
