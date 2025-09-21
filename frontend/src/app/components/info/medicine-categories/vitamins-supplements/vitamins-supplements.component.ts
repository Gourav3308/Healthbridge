import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-vitamins-supplements',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #f0fff4 0%, #e8f8f0 50%, #f0fff4 100%);
      min-height: 100vh;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #2ecc71, #27ae60, #2ecc71);
        color: white; padding: 4rem 0;
      ">
        <div class="container text-center">
          <div class="category-icon" style="
            width: 120px; height: 120px; margin: 0 auto 2rem;
            background: rgba(255, 255, 255, 0.2); border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
          ">
            <i class="fas fa-leaf" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Vitamins & Supplements</h1>
          <p style="font-size: 1.3rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
            Essential nutrients and supplements for optimal health and wellness
          </p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- Info Section -->
        <div class="info-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #f0fff4);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h2 style="color: #2ecc71; font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">
              Nutritional Support
            </h2>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
              Vitamins and supplements fill nutritional gaps in your diet, support immune function, 
              and promote overall health. These products help maintain optimal nutrient levels for better wellness.
            </p>
          </div>
        </div>

        <!-- Best Supplements -->
        <div class="medicines-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; background: linear-gradient(145deg, #ffffff, #f0fff0);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #2ecc71; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Essential Vitamins & Supplements
            </h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(46, 204, 113, 0.1);
                ">
                  <h5 style="color: #2ecc71; font-weight: 700;">Vitamin D3</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Essential for bone health, immune function, and calcium absorption.
                  </p>
                  <div class="dosage-info" style="background: rgba(46, 204, 113, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Dosage:</strong> 1000-2000 IU daily<br>
                    <strong>Best with:</strong> Fatty meals
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(46, 204, 113, 0.1);
                ">
                  <h5 style="color: #27ae60; font-weight: 700;">Multivitamins</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Complete blend of essential vitamins and minerals for daily health maintenance.
                  </p>
                  <div class="dosage-info" style="background: rgba(39, 174, 96, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Dosage:</strong> 1 tablet daily<br>
                    <strong>Timing:</strong> With breakfast
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(46, 204, 113, 0.1);
                ">
                  <h5 style="color: #229954; font-weight: 700;">Omega-3</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Essential fatty acids for heart health, brain function, and inflammation reduction.
                  </p>
                  <div class="dosage-info" style="background: rgba(34, 153, 84, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Dosage:</strong> 1000mg daily<br>
                    <strong>Source:</strong> Fish oil or algae
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
      background: rgba(46, 204, 113, 0.1) !important;
    }
  `]
})
export class VitaminsSupplementsComponent {}
