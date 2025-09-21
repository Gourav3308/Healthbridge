import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-pain-relief',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #fff0f0 0%, #ffe0e0 50%, #fff0f0 100%);
      min-height: 100vh;
      animation: backgroundPulse 8s ease-in-out infinite;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #e74c3c, #c0392b, #e74c3c);
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
            animation: painPulse 3s ease-in-out infinite;
          ">
            <i class="fas fa-hand-holding-medical" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Pain Relief</h1>
          <p style="font-size: 1.3rem; opacity: 0.9; max-width: 600px; margin: 0 auto; line-height: 1.6;">
            Effective pain management solutions for acute and chronic pain conditions
          </p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- Info Section -->
        <div class="info-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #fff0f0);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h2 style="color: #e74c3c; font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">Pain Management</h2>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
              Pain relief medications help manage discomfort from injuries, surgeries, chronic conditions, and everyday aches. 
              These medicines work by blocking pain signals or reducing inflammation at the source.
            </p>
          </div>
        </div>

        <!-- Types of Pain -->
        <div class="symptoms-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #fff0f0, #ffffff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #e74c3c; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Types of Pain Treated
            </h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(231, 76, 60, 0.05); border-radius: 10px;
                  border-left: 4px solid #e74c3c; transition: all 0.3s ease;
                ">
                  <i class="fas fa-head-side-cough" style="color: #e74c3c; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Headaches & Migraines</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(231, 76, 60, 0.05); border-radius: 10px;
                  border-left: 4px solid #e74c3c; transition: all 0.3s ease;
                ">
                  <i class="fas fa-bone" style="color: #e74c3c; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Joint & Muscle Pain</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(231, 76, 60, 0.05); border-radius: 10px;
                  border-left: 4px solid #e74c3c; transition: all 0.3s ease;
                ">
                  <i class="fas fa-tooth" style="color: #e74c3c; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Dental Pain</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(231, 76, 60, 0.05); border-radius: 10px;
                  border-left: 4px solid #e74c3c; transition: all 0.3s ease;
                ">
                  <i class="fas fa-procedures" style="color: #e74c3c; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Post-Surgery Pain</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Best Medicines Section -->
        <div class="medicines-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          background: linear-gradient(145deg, #ffffff, #fff0f0);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #e74c3c; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Pain Relief Medications
            </h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(231, 76, 60, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px; height: 80px; margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #e74c3c, #c0392b); border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                  ">
                    <i class="fas fa-tablets" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #e74c3c; font-weight: 700; margin-bottom: 1rem;">Ibuprofen</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Non-steroidal anti-inflammatory drug (NSAID) for pain, fever, and inflammation.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(231, 76, 60, 0.1); padding: 0.8rem; border-radius: 8px; margin-top: 1rem;
                  ">
                    <small style="color: #e74c3c; font-weight: 600;">Dosage: 400-600mg every 6-8 hours</small>
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(231, 76, 60, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px; height: 80px; margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #c0392b, #a93226); border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                  ">
                    <i class="fas fa-pills" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #c0392b; font-weight: 700; margin-bottom: 1rem;">Acetaminophen</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Safe pain reliever and fever reducer. Gentle on stomach, suitable for most people.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(192, 57, 43, 0.1); padding: 0.8rem; border-radius: 8px; margin-top: 1rem;
                  ">
                    <small style="color: #c0392b; font-weight: 600;">Dosage: 500-1000mg every 4-6 hours</small>
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(231, 76, 60, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px; height: 80px; margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #a93226, #922b20); border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                  ">
                    <i class="fas fa-prescription-bottle-alt" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #922b20; font-weight: 700; margin-bottom: 1rem;">Aspirin</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Effective for mild to moderate pain, inflammation, and as a blood thinner.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(146, 43, 32, 0.1); padding: 0.8rem; border-radius: 8px; margin-top: 1rem;
                  ">
                    <small style="color: #922b20; font-weight: 600;">Dosage: 325-650mg every 4 hours</small>
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
    
    @keyframes painPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    .symptom-item:hover {
      transform: translateX(5px);
      background: rgba(231, 76, 60, 0.1) !important;
    }
  `]
})
export class PainReliefComponent {}
