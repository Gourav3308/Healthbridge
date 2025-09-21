import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-allergy-relief',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #f0fff0 0%, #e0ffe0 50%, #f0fff0 100%);
      min-height: 100vh;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #1abc9c, #16a085, #1abc9c);
        color: white; padding: 4rem 0;
      ">
        <div class="container text-center">
          <div class="category-icon" style="
            width: 120px; height: 120px; margin: 0 auto 2rem;
            background: rgba(255, 255, 255, 0.2); border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
          ">
            <i class="fas fa-allergies" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Allergy Relief</h1>
          <p style="font-size: 1.3rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
            Antihistamines and allergy medications for seasonal and chronic allergies
          </p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- Info Section -->
        <div class="info-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #f0fff0);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h2 style="color: #1abc9c; font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">
              Allergy Management
            </h2>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
              Allergy medications block histamine reactions that cause sneezing, itching, runny nose, and other allergic symptoms. 
              These medicines provide relief from seasonal allergies, food allergies, and environmental triggers.
            </p>
          </div>
        </div>

        <!-- Best Medicines -->
        <div class="medicines-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; background: linear-gradient(145deg, #ffffff, #f0fff0);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #1abc9c; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Allergy Medications
            </h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(26, 188, 156, 0.1);
                ">
                  <h5 style="color: #1abc9c; font-weight: 700;">Cetirizine</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Long-lasting antihistamine for seasonal allergies, hay fever, and hives.
                  </p>
                  <div class="dosage-info" style="background: rgba(26, 188, 156, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Dosage:</strong> 10mg once daily<br>
                    <strong>Duration:</strong> 24-hour relief
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(26, 188, 156, 0.1);
                ">
                  <h5 style="color: #16a085; font-weight: 700;">Loratadine</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Non-drowsy antihistamine for daily allergy relief without sedation.
                  </p>
                  <div class="dosage-info" style="background: rgba(22, 160, 133, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Dosage:</strong> 10mg once daily<br>
                    <strong>Benefit:</strong> Non-drowsy formula
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(26, 188, 156, 0.1);
                ">
                  <h5 style="color: #138d75; font-weight: 700;">Nasal Sprays</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Corticosteroid nasal sprays for severe seasonal allergies and congestion.
                  </p>
                  <div class="dosage-info" style="background: rgba(19, 141, 117, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Fluticasone, Mometasone<br>
                    <strong>Usage:</strong> 1-2 sprays per nostril daily
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
      background: rgba(26, 188, 156, 0.1) !important;
    }
  `]
})
export class AllergyReliefComponent {}
