import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-diabetes-care',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #f5f0ff 0%, #ede0ff 50%, #f5f0ff 100%);
      min-height: 100vh;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #9b59b6, #8e44ad, #9b59b6);
        color: white; padding: 4rem 0;
      ">
        <div class="container text-center">
          <div class="category-icon" style="
            width: 120px; height: 120px; margin: 0 auto 2rem;
            background: rgba(255, 255, 255, 0.2); border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
          ">
            <i class="fas fa-tint" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Diabetes Care</h1>
          <p style="font-size: 1.3rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
            Blood sugar control and diabetes management medications
          </p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- Info Section -->
        <div class="info-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #f5f0ff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h2 style="color: #9b59b6; font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">
              Diabetes Management
            </h2>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
              Diabetes medications help control blood sugar levels, prevent complications, and maintain healthy glucose metabolism. 
              These medicines are essential for both Type 1 and Type 2 diabetes management.
            </p>
          </div>
        </div>

        <!-- Best Medicines -->
        <div class="medicines-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; background: linear-gradient(145deg, #ffffff, #f0f0ff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #9b59b6; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Diabetes Medications
            </h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(155, 89, 182, 0.1);
                ">
                  <h5 style="color: #9b59b6; font-weight: 700;">Insulin</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Essential hormone replacement for Type 1 diabetes and advanced Type 2 diabetes.
                  </p>
                  <div class="dosage-info" style="background: rgba(155, 89, 182, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Types:</strong> Rapid, Short, Long-acting<br>
                    <strong>Form:</strong> Injection/Pen
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(155, 89, 182, 0.1);
                ">
                  <h5 style="color: #8e44ad; font-weight: 700;">Metformin</h5>
                  <p style="color: #666; line-height: 1.6;">
                    First-line treatment for Type 2 diabetes. Reduces glucose production by the liver.
                  </p>
                  <div class="dosage-info" style="background: rgba(142, 68, 173, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Dosage:</strong> 500-1000mg twice daily<br>
                    <strong>With:</strong> Meals to reduce side effects
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(155, 89, 182, 0.1);
                ">
                  <h5 style="color: #7d3c98; font-weight: 700;">Sulfonylureas</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Stimulates pancreas to produce more insulin. Effective for Type 2 diabetes.
                  </p>
                  <div class="dosage-info" style="background: rgba(125, 60, 152, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Glipizide, Glyburide<br>
                    <strong>Timing:</strong> Before meals
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
      background: rgba(52, 152, 219, 0.1) !important;
    }
  `]
})
export class DiabetesCareComponent {}
