import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-immune-support',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #f0fff0 0%, #e8ffe8 50%, #f0fff0 100%);
      min-height: 100vh;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #27ae60, #229954, #27ae60);
        color: white; padding: 4rem 0;
      ">
        <div class="container text-center">
          <div class="category-icon" style="
            width: 120px; height: 120px; margin: 0 auto 2rem;
            background: rgba(255, 255, 255, 0.2); border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
          ">
            <i class="fas fa-shield-virus" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Immune Support</h1>
          <p style="font-size: 1.3rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
            Immunity boosters and supplements for stronger defense against illness
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
            <h2 style="color: #27ae60; font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">
              Immune System Support
            </h2>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
              Immune support supplements help strengthen your body's natural defense system against infections, 
              viruses, and diseases. These products boost immunity and help maintain optimal health.
            </p>
          </div>
        </div>

        <!-- Best Supplements -->
        <div class="medicines-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; background: linear-gradient(145deg, #ffffff, #f0fff0);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #27ae60; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Immune Support Supplements
            </h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(39, 174, 96, 0.1);
                ">
                  <h5 style="color: #27ae60; font-weight: 700;">Vitamin C</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Powerful antioxidant that boosts immune function and helps fight infections.
                  </p>
                  <div class="dosage-info" style="background: rgba(39, 174, 96, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Dosage:</strong> 500-1000mg daily<br>
                    <strong>Best with:</strong> Bioflavonoids for absorption
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(39, 174, 96, 0.1);
                ">
                  <h5 style="color: #229954; font-weight: 700;">Zinc</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Essential mineral for immune function, wound healing, and fighting infections.
                  </p>
                  <div class="dosage-info" style="background: rgba(34, 153, 84, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Dosage:</strong> 15-30mg daily<br>
                    <strong>Timing:</strong> On empty stomach or with food
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(39, 174, 96, 0.1);
                ">
                  <h5 style="color: #1e8449; font-weight: 700;">Elderberry</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Natural immune booster with antiviral properties. Reduces cold and flu duration.
                  </p>
                  <div class="dosage-info" style="background: rgba(30, 132, 73, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Form:</strong> Syrup, Gummies, Capsules<br>
                    <strong>Usage:</strong> At first sign of illness
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
      background: rgba(39, 174, 96, 0.1) !important;
    }
  `]
})
export class ImmuneSupportComponent {}
