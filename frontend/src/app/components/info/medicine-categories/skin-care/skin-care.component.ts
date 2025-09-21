import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-skin-care',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #fff8f0 0%, #ffeedd 50%, #fff8f0 100%);
      min-height: 100vh;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #e67e22, #d35400, #e67e22);
        color: white; padding: 4rem 0;
      ">
        <div class="container text-center">
          <div class="category-icon" style="
            width: 120px; height: 120px; margin: 0 auto 2rem;
            background: rgba(255, 255, 255, 0.2); border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
          ">
            <i class="fas fa-hand-sparkles" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Skin Care</h1>
          <p style="font-size: 1.3rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
            Dermatological treatments for healthy, radiant skin
          </p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- Info Section -->
        <div class="info-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #fff8f0);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h2 style="color: #e67e22; font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">
              Dermatological Care
            </h2>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
              Skin care medications treat various dermatological conditions including acne, eczema, 
              psoriasis, and infections. These treatments help maintain healthy skin and treat skin disorders.
            </p>
          </div>
        </div>

        <!-- Best Medicines -->
        <div class="medicines-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; background: linear-gradient(145deg, #ffffff, #fff5f0);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #e67e22; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Skin Care Medications
            </h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(230, 126, 34, 0.1);
                ">
                  <h5 style="color: #e67e22; font-weight: 700;">Topical Antibiotics</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Treats bacterial skin infections, cuts, and wounds. Prevents infection and promotes healing.
                  </p>
                  <div class="dosage-info" style="background: rgba(230, 126, 34, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Neomycin, Bacitracin<br>
                    <strong>Usage:</strong> Apply 2-3 times daily
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(230, 126, 34, 0.1);
                ">
                  <h5 style="color: #d35400; font-weight: 700;">Antifungal Creams</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Treats fungal skin infections like athlete's foot, ringworm, and yeast infections.
                  </p>
                  <div class="dosage-info" style="background: rgba(211, 84, 0, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Clotrimazole, Terbinafine<br>
                    <strong>Duration:</strong> 2-4 weeks treatment
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(230, 126, 34, 0.1);
                ">
                  <h5 style="color: #ba4a00; font-weight: 700;">Moisturizers</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Hydrates and protects skin barrier. Essential for dry skin and eczema management.
                  </p>
                  <div class="dosage-info" style="background: rgba(186, 74, 0, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Types:</strong> Lotions, Creams, Ointments<br>
                    <strong>Usage:</strong> Apply twice daily
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
      background: rgba(230, 126, 34, 0.1) !important;
    }
  `]
})
export class SkinCareComponent {}
