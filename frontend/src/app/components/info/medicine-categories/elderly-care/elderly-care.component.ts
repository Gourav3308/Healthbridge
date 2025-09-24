import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-elderly-care',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 50%, #f5f5f5 100%);
      min-height: 100vh;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #34495e, #2c3e50, #34495e);
        color: white; padding: 4rem 0;
      ">
        <div class="container text-center">
          <div class="category-icon" style="
            width: 120px; height: 120px; margin: 0 auto 2rem;
            background: rgba(255, 255, 255, 0.2); border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
          ">
            <i class="fas fa-user-friends" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Elderly Care</h1>
          <p style="font-size: 1.3rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
            Senior health and geriatric care medications
          </p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- Info Section -->
        <div class="info-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #f5f5f5);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h2 style="color: #34495e; font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">
              Elderly Care & Senior Health
            </h2>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
              Elderly care medications are specifically designed to address the unique health needs of seniors. 
              These medicines help manage age-related conditions, maintain cognitive function, support mobility, 
              and improve quality of life for older adults.
            </p>
          </div>
        </div>

        <!-- Common Conditions -->
        <div class="conditions-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #f5f5f5, #ffffff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #34495e; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Common Senior Health Conditions
            </h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="condition-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(52, 73, 94, 0.05); border-radius: 10px;
                  border-left: 4px solid #34495e;
                ">
                  <i class="fas fa-brain" style="color: #34495e; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Memory & Cognitive Issues</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="condition-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(52, 73, 94, 0.05); border-radius: 10px;
                  border-left: 4px solid #34495e;
                ">
                  <i class="fas fa-heartbeat" style="color: #34495e; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Cardiovascular Health</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="condition-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(52, 73, 94, 0.05); border-radius: 10px;
                  border-left: 4px solid #34495e;
                ">
                  <i class="fas fa-bone" style="color: #34495e; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Bone & Joint Health</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="condition-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(52, 73, 94, 0.05); border-radius: 10px;
                  border-left: 4px solid #34495e;
                ">
                  <i class="fas fa-eye" style="color: #34495e; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Vision & Hearing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Best Medicines -->
        <div class="medicines-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; background: linear-gradient(145deg, #ffffff, #f5f5f5);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #34495e; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Elderly Care Medications
            </h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(52, 73, 94, 0.1);
                ">
                  <h5 style="color: #34495e; font-weight: 700;">Memory Support</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Help maintain cognitive function and memory. Support brain health and may slow cognitive decline.
                  </p>
                  <div class="dosage-info" style="background: rgba(52, 73, 94, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Donepezil, Memantine<br>
                    <strong>Usage:</strong> Daily as prescribed
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(52, 73, 94, 0.1);
                ">
                  <h5 style="color: #2c3e50; font-weight: 700;">Blood Pressure Management</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Control hypertension and support cardiovascular health. Reduce risk of heart disease and stroke.
                  </p>
                  <div class="dosage-info" style="background: rgba(44, 62, 80, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Lisinopril, Amlodipine<br>
                    <strong>Monitoring:</strong> Regular blood pressure checks
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(52, 73, 94, 0.1);
                ">
                  <h5 style="color: #5d6d7e; font-weight: 700;">Multivitamins</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Comprehensive nutritional support for seniors. Fill nutritional gaps and support overall health.
                  </p>
                  <div class="dosage-info" style="background: rgba(93, 109, 126, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Senior Multivitamins<br>
                    <strong>Benefits:</strong> Vitamin D, B12, Calcium
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Important Note -->
        <div class="note-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; background: linear-gradient(135deg, #d5dbdb, #bfc9ca);
          border-left: 6px solid #34495e;
        ">
          <div class="card-body" style="padding: 2rem;">
            <div class="d-flex align-items-start">
              <i class="fas fa-user-friends" style="
                color: #2c3e50;
                font-size: 2rem;
                margin-right: 1rem;
                margin-top: 0.5rem;
              "></i>
              <div>
                <h4 style="color: #2c3e50; font-weight: 700; margin-bottom: 1rem;">Senior Health Considerations</h4>
                <p style="color: #2c3e50; font-size: 1rem; line-height: 1.6; margin-bottom: 0;">
                  Elderly care requires special attention to medication interactions, dosage adjustments, and regular monitoring. 
                  Seniors often take multiple medications, so it's crucial to review all medications regularly with healthcare providers. 
                  Always consider age-related changes in metabolism and organ function when prescribing medications.
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
    .condition-item:hover {
      transform: translateX(5px);
      background: rgba(52, 73, 94, 0.1) !important;
    }
  `]
})
export class ElderlyCareComponent {}
