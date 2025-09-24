import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-bone-joint-care',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #f8f0ff 0%, #e8d5ff 50%, #f8f0ff 100%);
      min-height: 100vh;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #8e44ad, #9b59b6, #8e44ad);
        color: white; padding: 4rem 0;
      ">
        <div class="container text-center">
          <div class="category-icon" style="
            width: 120px; height: 120px; margin: 0 auto 2rem;
            background: rgba(255, 255, 255, 0.2); border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
          ">
            <i class="fas fa-bone" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Bone & Joint Care</h1>
          <p style="font-size: 1.3rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
            Orthopedic health and musculoskeletal care medications
          </p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- Info Section -->
        <div class="info-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #f8f0ff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h2 style="color: #8e44ad; font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">
              Bone & Joint Care
            </h2>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
              Bone and joint care medications help maintain musculoskeletal health, treat arthritis, osteoporosis, 
              and other conditions affecting bones, joints, and connective tissues. These medicines support 
              bone density, reduce inflammation, and improve joint mobility.
            </p>
          </div>
        </div>

        <!-- Common Conditions -->
        <div class="conditions-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #f8f0ff, #ffffff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #8e44ad; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Common Bone & Joint Conditions
            </h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="condition-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(142, 68, 173, 0.05); border-radius: 10px;
                  border-left: 4px solid #8e44ad;
                ">
                  <i class="fas fa-bone" style="color: #8e44ad; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Osteoporosis</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="condition-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(142, 68, 173, 0.05); border-radius: 10px;
                  border-left: 4px solid #8e44ad;
                ">
                  <i class="fas fa-hand-holding-medical" style="color: #8e44ad; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Arthritis</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="condition-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(142, 68, 173, 0.05); border-radius: 10px;
                  border-left: 4px solid #8e44ad;
                ">
                  <i class="fas fa-running" style="color: #8e44ad; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Joint Pain</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="condition-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(142, 68, 173, 0.05); border-radius: 10px;
                  border-left: 4px solid #8e44ad;
                ">
                  <i class="fas fa-user-injured" style="color: #8e44ad; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Fractures</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Best Medicines -->
        <div class="medicines-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; background: linear-gradient(145deg, #ffffff, #f8f0ff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #8e44ad; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Bone & Joint Care Medications
            </h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(142, 68, 173, 0.1);
                ">
                  <h5 style="color: #8e44ad; font-weight: 700;">Calcium Supplements</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Essential for bone health and density. Helps prevent osteoporosis and supports bone strength.
                  </p>
                  <div class="dosage-info" style="background: rgba(142, 68, 173, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Calcium Carbonate, Calcium Citrate<br>
                    <strong>Dosage:</strong> 1000-1200mg daily with Vitamin D
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(142, 68, 173, 0.1);
                ">
                  <h5 style="color: #9b59b6; font-weight: 700;">Anti-inflammatory Drugs</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Reduce joint inflammation and pain. Help manage arthritis and joint conditions effectively.
                  </p>
                  <div class="dosage-info" style="background: rgba(155, 89, 182, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Ibuprofen, Naproxen<br>
                    <strong>Usage:</strong> As needed for pain relief
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(142, 68, 173, 0.1);
                ">
                  <h5 style="color: #a569bd; font-weight: 700;">Vitamin D</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Essential for calcium absorption and bone health. Supports immune function and muscle strength.
                  </p>
                  <div class="dosage-info" style="background: rgba(165, 105, 189, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Vitamin D3, Cholecalciferol<br>
                    <strong>Dosage:</strong> 1000-2000 IU daily
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
    .condition-item:hover {
      transform: translateX(5px);
      background: rgba(142, 68, 173, 0.1) !important;
    }
  `]
})
export class BoneJointCareComponent {}
