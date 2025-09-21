import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-fever-care',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #fff8f5 0%, #ffe6e0 50%, #fff8f5 100%);
      min-height: 100vh;
      animation: backgroundPulse 8s ease-in-out infinite;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #ff6b35, #f7931e, #ff6b35);
        background-size: 200% 200%;
        animation: gradientShift 6s ease-in-out infinite;
        color: white;
        padding: 4rem 0;
        position: relative;
        overflow: hidden;
      ">
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
            animation: feverPulse 2s ease-in-out infinite;
          ">
            <i class="fas fa-thermometer-half" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1rem;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          ">Fever Care</h1>
          <p style="
            font-size: 1.3rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          ">Effective fever management and temperature control medications</p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- Info Section -->
        <div class="info-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #fff8f5);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h2 style="color: #ff6b35; font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">Fever Management</h2>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
              Fever is the body's natural response to infection. Proper fever management involves using appropriate 
              medications to reduce discomfort while allowing the immune system to function effectively.
            </p>
          </div>
        </div>

        <!-- Medicines Section -->
        <div class="medicines-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          background: linear-gradient(145deg, #ffffff, #fff0f0);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #ff6b35; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Best Fever Medications
            </h3>
            <div class="row">
              <div class="col-lg-6 mb-4">
                <div class="medicine-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  border: 2px solid rgba(255, 107, 53, 0.1);
                ">
                  <h5 style="color: #ff6b35; font-weight: 700;">Paracetamol (Acetaminophen)</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Safe and effective fever reducer. Works by blocking pain signals and reducing fever in the brain.
                  </p>
                  <div class="dosage-info" style="background: rgba(255, 107, 53, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Dosage:</strong> Adults: 500-1000mg every 4-6 hours<br>
                    <strong>Children:</strong> 10-15mg/kg every 4-6 hours
                  </div>
                </div>
              </div>
              <div class="col-lg-6 mb-4">
                <div class="medicine-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  border: 2px solid rgba(255, 107, 53, 0.1);
                ">
                  <h5 style="color: #f7931e; font-weight: 700;">Ibuprofen</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Anti-inflammatory fever reducer. Also helps with body aches and reduces inflammation.
                  </p>
                  <div class="dosage-info" style="background: rgba(247, 147, 30, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Dosage:</strong> Adults: 400-600mg every 6-8 hours<br>
                    <strong>Children:</strong> 5-10mg/kg every 6-8 hours
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
    @keyframes backgroundPulse {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    
    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    
    @keyframes feverPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
  `]
})
export class FeverCareComponent {}
