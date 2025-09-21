import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-eye-care',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #f0ffff 0%, #e0f8ff 50%, #f0ffff 100%);
      min-height: 100vh;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #16a085, #138d75, #16a085);
        color: white; padding: 4rem 0;
      ">
        <div class="container text-center">
          <div class="category-icon" style="
            width: 120px; height: 120px; margin: 0 auto 2rem;
            background: rgba(255, 255, 255, 0.2); border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
          ">
            <i class="fas fa-eye" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Eye Care</h1>
          <p style="font-size: 1.3rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
            Vision health and eye care medications for optimal sight
          </p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- Info Section -->
        <div class="info-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #f0ffff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h2 style="color: #16a085; font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">
              Vision Health Care
            </h2>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
              Eye care medications treat various vision problems including dry eyes, infections, 
              glaucoma, and age-related eye conditions. These treatments help maintain healthy vision.
            </p>
          </div>
        </div>

        <!-- Common Conditions -->
        <div class="symptoms-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #f0ffff, #ffffff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #16a085; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Eye Conditions
            </h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(22, 160, 133, 0.05); border-radius: 10px;
                  border-left: 4px solid #16a085;
                ">
                  <i class="fas fa-eye-dropper" style="color: #16a085; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Dry Eyes</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(22, 160, 133, 0.05); border-radius: 10px;
                  border-left: 4px solid #16a085;
                ">
                  <i class="fas fa-eye" style="color: #16a085; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Eye Infections</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(22, 160, 133, 0.05); border-radius: 10px;
                  border-left: 4px solid #16a085;
                ">
                  <i class="fas fa-low-vision" style="color: #16a085; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Glaucoma</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(22, 160, 133, 0.05); border-radius: 10px;
                  border-left: 4px solid #16a085;
                ">
                  <i class="fas fa-allergies" style="color: #16a085; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Allergic Conjunctivitis</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Best Medicines -->
        <div class="medicines-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; background: linear-gradient(145deg, #ffffff, #f0ffff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #16a085; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Eye Care Medications
            </h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(22, 160, 133, 0.1);
                ">
                  <h5 style="color: #16a085; font-weight: 700;">Artificial Tears</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Lubricating eye drops for dry eyes and computer eye strain relief.
                  </p>
                  <div class="dosage-info" style="background: rgba(22, 160, 133, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Usage:</strong> 1-2 drops as needed<br>
                    <strong>Frequency:</strong> Up to 6 times daily
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(22, 160, 133, 0.1);
                ">
                  <h5 style="color: #138d75; font-weight: 700;">Antibiotic Eye Drops</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Treats bacterial eye infections, conjunctivitis, and prevents post-surgery infections.
                  </p>
                  <div class="dosage-info" style="background: rgba(19, 141, 117, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Tobramycin, Ciprofloxacin<br>
                    <strong>Usage:</strong> 1 drop every 2-4 hours
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(22, 160, 133, 0.1);
                ">
                  <h5 style="color: #117864; font-weight: 700;">Glaucoma Drops</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Reduces eye pressure to prevent vision loss from glaucoma. Daily use required.
                  </p>
                  <div class="dosage-info" style="background: rgba(17, 120, 100, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Timolol, Latanoprost<br>
                    <strong>Usage:</strong> 1 drop once or twice daily
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
      background: rgba(22, 160, 133, 0.1) !important;
    }
  `]
})
export class EyeCareComponent {}
