import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-womens-health',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #fff0f5 0%, #ffe0e6 50%, #fff0f5 100%);
      min-height: 100vh;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #e91e63, #ad1457, #e91e63);
        color: white; padding: 4rem 0;
      ">
        <div class="container text-center">
          <div class="category-icon" style="
            width: 120px; height: 120px; margin: 0 auto 2rem;
            background: rgba(255, 255, 255, 0.2); border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
          ">
            <i class="fas fa-female" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Women's Health</h1>
          <p style="font-size: 1.3rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
            Specialized healthcare solutions for women's unique health needs
          </p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- Info Section -->
        <div class="info-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #fff0f5);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h2 style="color: #e91e63; font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">
              Women's Healthcare
            </h2>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
              Women's health medications address unique physiological needs including reproductive health, 
              hormonal balance, pregnancy care, menopause management, and gender-specific health conditions.
            </p>
          </div>
        </div>

        <!-- Common Conditions -->
        <div class="symptoms-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #fff0f5, #ffffff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #e91e63; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Women's Health Conditions
            </h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(233, 30, 99, 0.05); border-radius: 10px;
                  border-left: 4px solid #e91e63;
                ">
                  <i class="fas fa-calendar-alt" style="color: #e91e63; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Menstrual Irregularities</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(233, 30, 99, 0.05); border-radius: 10px;
                  border-left: 4px solid #e91e63;
                ">
                  <i class="fas fa-thermometer-half" style="color: #e91e63; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Menopause Symptoms</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(233, 30, 99, 0.05); border-radius: 10px;
                  border-left: 4px solid #e91e63;
                ">
                  <i class="fas fa-baby" style="color: #e91e63; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Pregnancy & Prenatal Care</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(233, 30, 99, 0.05); border-radius: 10px;
                  border-left: 4px solid #e91e63;
                ">
                  <i class="fas fa-bone" style="color: #e91e63; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Osteoporosis Prevention</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Best Medicines -->
        <div class="medicines-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; background: linear-gradient(145deg, #ffffff, #fff0f5);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #e91e63; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Women's Health Medications
            </h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(233, 30, 99, 0.1);
                ">
                  <h5 style="color: #e91e63; font-weight: 700;">Prenatal Vitamins</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Essential nutrients for pregnancy including folic acid, iron, and DHA for baby's development.
                  </p>
                  <div class="dosage-info" style="background: rgba(233, 30, 99, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Key Nutrients:</strong> Folic Acid, Iron, Calcium<br>
                    <strong>Dosage:</strong> 1 tablet daily with food
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(233, 30, 99, 0.1);
                ">
                  <h5 style="color: #ad1457; font-weight: 700;">Iron Supplements</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Treats iron deficiency anemia, common in women due to menstruation and pregnancy.
                  </p>
                  <div class="dosage-info" style="background: rgba(173, 20, 87, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Dosage:</strong> 65mg elemental iron daily<br>
                    <strong>Best with:</strong> Vitamin C for absorption
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(233, 30, 99, 0.1);
                ">
                  <h5 style="color: #880e4f; font-weight: 700;">Calcium + Vitamin D</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Essential for bone health, especially important for women to prevent osteoporosis.
                  </p>
                  <div class="dosage-info" style="background: rgba(136, 14, 79, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Dosage:</strong> 1200mg Calcium + 800 IU Vitamin D<br>
                    <strong>Timing:</strong> Divided doses with meals
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
      background: rgba(233, 30, 99, 0.1) !important;
    }
  `]
})
export class WomensHealthComponent {}
