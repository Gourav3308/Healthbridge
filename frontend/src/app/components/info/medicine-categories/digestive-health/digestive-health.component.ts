import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-digestive-health',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #fffaf0 0%, #ffebcd 50%, #fffaf0 100%);
      min-height: 100vh;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #f39c12, #e67e22, #f39c12);
        color: white; padding: 4rem 0; position: relative; overflow: hidden;
      ">
        <div class="container text-center position-relative" style="z-index: 10;">
          <div class="category-icon" style="
            width: 120px; height: 120px; margin: 0 auto 2rem;
            background: rgba(255, 255, 255, 0.2); border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            backdrop-filter: blur(10px); border: 3px solid rgba(255, 255, 255, 0.3);
          ">
            <i class="fas fa-stomach" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Digestive Health</h1>
          <p style="font-size: 1.3rem; opacity: 0.9; max-width: 600px; margin: 0 auto; line-height: 1.6;">
            Comprehensive stomach and gut care for optimal digestive wellness
          </p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- Info Section -->
        <div class="info-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #fffaf0);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h2 style="color: #f39c12; font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">
              Digestive Health Care
            </h2>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
              Digestive health medications treat conditions affecting the stomach, intestines, and overall gut health. 
              These medicines help with acid reflux, constipation, diarrhea, and other digestive disorders.
            </p>
          </div>
        </div>

        <!-- Common Conditions -->
        <div class="symptoms-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #fffaf0, #ffffff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #f39c12; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Common Digestive Issues
            </h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(243, 156, 18, 0.05); border-radius: 10px;
                  border-left: 4px solid #f39c12;
                ">
                  <i class="fas fa-fire" style="color: #f39c12; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Acid Reflux & Heartburn</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(243, 156, 18, 0.05); border-radius: 10px;
                  border-left: 4px solid #f39c12;
                ">
                  <i class="fas fa-toilet-paper" style="color: #f39c12; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Constipation</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(243, 156, 18, 0.05); border-radius: 10px;
                  border-left: 4px solid #f39c12;
                ">
                  <i class="fas fa-running" style="color: #f39c12; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Diarrhea</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(243, 156, 18, 0.05); border-radius: 10px;
                  border-left: 4px solid #f39c12;
                ">
                  <i class="fas fa-stomach" style="color: #f39c12; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Stomach Ulcers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Best Medicines -->
        <div class="medicines-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; background: linear-gradient(145deg, #ffffff, #fff5f0);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #f39c12; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Digestive Health Medications
            </h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(243, 156, 18, 0.1);
                ">
                  <h5 style="color: #f39c12; font-weight: 700;">Antacids</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Quick relief from heartburn and acid indigestion. Neutralizes stomach acid effectively.
                  </p>
                  <div class="dosage-info" style="background: rgba(243, 156, 18, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Tums, Rolaids<br>
                    <strong>Dosage:</strong> 1-2 tablets as needed
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(243, 156, 18, 0.1);
                ">
                  <h5 style="color: #e67e22; font-weight: 700;">Probiotics</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Beneficial bacteria that support digestive health and boost immunity.
                  </p>
                  <div class="dosage-info" style="background: rgba(230, 126, 34, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Lactobacillus, Bifidobacterium<br>
                    <strong>Dosage:</strong> 1 capsule daily
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(243, 156, 18, 0.1);
                ">
                  <h5 style="color: #d68910; font-weight: 700;">Anti-diarrheal</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Controls diarrhea and restores normal bowel function quickly and safely.
                  </p>
                  <div class="dosage-info" style="background: rgba(214, 137, 16, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Loperamide, Bismuth<br>
                    <strong>Dosage:</strong> As directed by physician
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
      background: rgba(243, 156, 18, 0.1) !important;
    }
  `]
})
export class DigestiveHealthComponent {}
