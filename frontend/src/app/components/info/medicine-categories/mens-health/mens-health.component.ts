import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-mens-health',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #f0f5ff 0%, #e0ebff 50%, #f0f5ff 100%);
      min-height: 100vh;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #2980b9, #1f618d, #2980b9);
        color: white; padding: 4rem 0;
      ">
        <div class="container text-center">
          <div class="category-icon" style="
            width: 120px; height: 120px; margin: 0 auto 2rem;
            background: rgba(255, 255, 255, 0.2); border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
          ">
            <i class="fas fa-male" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Men's Health</h1>
          <p style="font-size: 1.3rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
            Specialized healthcare solutions for men's wellness and vitality
          </p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- Info Section -->
        <div class="info-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #f0f5ff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h2 style="color: #2980b9; font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">
              Men's Healthcare
            </h2>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
              Men's health medications address specific health concerns including prostate health, 
              testosterone levels, cardiovascular wellness, and male-specific conditions.
            </p>
          </div>
        </div>

        <!-- Common Conditions -->
        <div class="symptoms-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #f0f5ff, #ffffff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #2980b9; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Men's Health Conditions
            </h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(41, 128, 185, 0.05); border-radius: 10px;
                  border-left: 4px solid #2980b9;
                ">
                  <i class="fas fa-heartbeat" style="color: #2980b9; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Prostate Health</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(41, 128, 185, 0.05); border-radius: 10px;
                  border-left: 4px solid #2980b9;
                ">
                  <i class="fas fa-dumbbell" style="color: #2980b9; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Low Testosterone</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(41, 128, 185, 0.05); border-radius: 10px;
                  border-left: 4px solid #2980b9;
                ">
                  <i class="fas fa-heart" style="color: #2980b9; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Cardiovascular Health</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(41, 128, 185, 0.05); border-radius: 10px;
                  border-left: 4px solid #2980b9;
                ">
                  <i class="fas fa-head-side-mask" style="color: #2980b9; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Hair Loss & Baldness</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Best Medicines -->
        <div class="medicines-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; background: linear-gradient(145deg, #ffffff, #f0f5ff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #2980b9; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Men's Health Medications
            </h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(41, 128, 185, 0.1);
                ">
                  <h5 style="color: #2980b9; font-weight: 700;">Multivitamins for Men</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Specialized vitamin blend with higher zinc, magnesium, and B-vitamins for men's energy and health.
                  </p>
                  <div class="dosage-info" style="background: rgba(41, 128, 185, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Key Nutrients:</strong> Zinc, Magnesium, B-complex<br>
                    <strong>Dosage:</strong> 1 tablet daily with breakfast
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(41, 128, 185, 0.1);
                ">
                  <h5 style="color: #1f618d; font-weight: 700;">Saw Palmetto</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Natural supplement for prostate health and urinary function support.
                  </p>
                  <div class="dosage-info" style="background: rgba(31, 97, 141, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Benefits:</strong> Prostate support, urinary flow<br>
                    <strong>Dosage:</strong> 320mg daily
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(41, 128, 185, 0.1);
                ">
                  <h5 style="color: #154360; font-weight: 700;">Omega-3 Fish Oil</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Essential for heart health, brain function, and reducing inflammation in men.
                  </p>
                  <div class="dosage-info" style="background: rgba(21, 67, 96, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Benefits:</strong> Heart health, brain function<br>
                    <strong>Dosage:</strong> 1000-2000mg daily
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
      background: rgba(41, 128, 185, 0.1) !important;
    }
  `]
})
export class MensHealthComponent {}
