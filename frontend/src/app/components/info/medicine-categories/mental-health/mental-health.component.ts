import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-mental-health',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 50%, #f0f8ff 100%);
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
            <i class="fas fa-brain" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Mental Health</h1>
          <p style="font-size: 1.3rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
            Psychological wellness and mental health support medications
          </p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- Info Section -->
        <div class="info-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #f0f8ff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h2 style="color: #9b59b6; font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">
              Mental Health Care
            </h2>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
              Mental health medications help manage psychological conditions, mood disorders, anxiety, depression, 
              and other mental health challenges. These medicines work with therapy and lifestyle changes to 
              support overall psychological wellness and quality of life.
            </p>
          </div>
        </div>

        <!-- Common Conditions -->
        <div class="conditions-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #f0f8ff, #ffffff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #9b59b6; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Common Mental Health Conditions
            </h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="condition-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(155, 89, 182, 0.05); border-radius: 10px;
                  border-left: 4px solid #9b59b6;
                ">
                  <i class="fas fa-heart-broken" style="color: #9b59b6; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Depression</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="condition-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(155, 89, 182, 0.05); border-radius: 10px;
                  border-left: 4px solid #9b59b6;
                ">
                  <i class="fas fa-exclamation-triangle" style="color: #9b59b6; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Anxiety Disorders</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="condition-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(155, 89, 182, 0.05); border-radius: 10px;
                  border-left: 4px solid #9b59b6;
                ">
                  <i class="fas fa-moon" style="color: #9b59b6; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Sleep Disorders</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="condition-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(155, 89, 182, 0.05); border-radius: 10px;
                  border-left: 4px solid #9b59b6;
                ">
                  <i class="fas fa-brain" style="color: #9b59b6; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Bipolar Disorder</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Best Medicines -->
        <div class="medicines-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; background: linear-gradient(145deg, #ffffff, #f0f8ff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #9b59b6; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Mental Health Medications
            </h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(155, 89, 182, 0.1);
                ">
                  <h5 style="color: #9b59b6; font-weight: 700;">Antidepressants</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Help manage depression and anxiety. Work by balancing brain chemicals to improve mood and emotional well-being.
                  </p>
                  <div class="dosage-info" style="background: rgba(155, 89, 182, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Sertraline, Fluoxetine<br>
                    <strong>Duration:</strong> 4-6 weeks to see effects
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(155, 89, 182, 0.1);
                ">
                  <h5 style="color: #8e44ad; font-weight: 700;">Anxiolytics</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Reduce anxiety and panic symptoms. Help manage acute anxiety episodes and generalized anxiety disorder.
                  </p>
                  <div class="dosage-info" style="background: rgba(142, 68, 173, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Lorazepam, Alprazolam<br>
                    <strong>Usage:</strong> Short-term use recommended
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(155, 89, 182, 0.1);
                ">
                  <h5 style="color: #a569bd; font-weight: 700;">Mood Stabilizers</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Help manage bipolar disorder and mood swings. Stabilize emotional highs and lows for better daily functioning.
                  </p>
                  <div class="dosage-info" style="background: rgba(165, 105, 189, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Examples:</strong> Lithium, Valproate<br>
                    <strong>Monitoring:</strong> Regular blood tests required
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Important Note -->
        <div class="note-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; background: linear-gradient(135deg, #e8d5ff, #d1b3ff);
          border-left: 6px solid #9b59b6;
        ">
          <div class="card-body" style="padding: 2rem;">
            <div class="d-flex align-items-start">
              <i class="fas fa-heart" style="
                color: #6c3483;
                font-size: 2rem;
                margin-right: 1rem;
                margin-top: 0.5rem;
              "></i>
              <div>
                <h4 style="color: #6c3483; font-weight: 700; margin-bottom: 1rem;">Mental Health Support</h4>
                <p style="color: #6c3483; font-size: 1rem; line-height: 1.6; margin-bottom: 0;">
                  Mental health medications work best when combined with therapy, lifestyle changes, and support systems. 
                  Always consult with a mental health professional before starting or stopping any medication. 
                  If you're experiencing thoughts of self-harm, please contact emergency services immediately.
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
      background: rgba(155, 89, 182, 0.1) !important;
    }
  `]
})
export class MentalHealthComponent {}
