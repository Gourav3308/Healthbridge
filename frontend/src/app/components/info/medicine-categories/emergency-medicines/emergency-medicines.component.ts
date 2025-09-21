import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-emergency-medicines',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #fff5f5 0%, #ffe0e0 50%, #fff5f5 100%);
      min-height: 100vh;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #c0392b, #a93226, #c0392b);
        color: white; padding: 4rem 0;
      ">
        <div class="container text-center">
          <div class="category-icon" style="
            width: 120px; height: 120px; margin: 0 auto 2rem;
            background: rgba(255, 255, 255, 0.2); border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
          ">
            <i class="fas fa-ambulance" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Emergency Medicines</h1>
          <p style="font-size: 1.3rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
            Essential first aid medications for emergency situations and urgent care
          </p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- Info Section -->
        <div class="info-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #fff5f5);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h2 style="color: #c0392b; font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">
              Emergency First Aid
            </h2>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
              Emergency medicines are essential first aid medications that can be life-saving in urgent situations. 
              These should be readily available in every home and workplace for immediate response to medical emergencies.
            </p>
          </div>
        </div>

        <!-- Emergency Situations -->
        <div class="symptoms-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; margin-bottom: 3rem;
          background: linear-gradient(145deg, #fff5f5, #ffffff);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #c0392b; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Emergency Situations
            </h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(192, 57, 43, 0.05); border-radius: 10px;
                  border-left: 4px solid #c0392b;
                ">
                  <i class="fas fa-heart" style="color: #c0392b; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Heart Attack</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(192, 57, 43, 0.05); border-radius: 10px;
                  border-left: 4px solid #c0392b;
                ">
                  <i class="fas fa-lungs" style="color: #c0392b; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Severe Allergic Reactions</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(192, 57, 43, 0.05); border-radius: 10px;
                  border-left: 4px solid #c0392b;
                ">
                  <i class="fas fa-band-aid" style="color: #c0392b; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Severe Cuts & Wounds</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex; align-items: center; padding: 1rem;
                  background: rgba(192, 57, 43, 0.05); border-radius: 10px;
                  border-left: 4px solid #c0392b;
                ">
                  <i class="fas fa-fire" style="color: #c0392b; margin-right: 1rem;"></i>
                  <span style="font-weight: 600;">Burns & Scalds</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Essential Emergency Medicines -->
        <div class="medicines-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; background: linear-gradient(145deg, #ffffff, #fff0f0);
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="color: #c0392b; font-size: 2.2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">
              Essential Emergency Medicines
            </h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(192, 57, 43, 0.1);
                ">
                  <h5 style="color: #c0392b; font-weight: 700;">Aspirin</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Life-saving for heart attacks. Chew 325mg immediately during heart attack symptoms.
                  </p>
                  <div class="dosage-info" style="background: rgba(192, 57, 43, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Emergency Dose:</strong> 325mg chewed<br>
                    <strong>Action:</strong> Call 911 immediately
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(192, 57, 43, 0.1);
                ">
                  <h5 style="color: #a93226; font-weight: 700;">EpiPen (Epinephrine)</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Life-saving auto-injector for severe allergic reactions and anaphylaxis.
                  </p>
                  <div class="dosage-info" style="background: rgba(169, 50, 38, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Usage:</strong> Inject into thigh muscle<br>
                    <strong>Emergency:</strong> Call 911 after use
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white; border-radius: 15px; padding: 2rem; text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 2px solid rgba(192, 57, 43, 0.1);
                ">
                  <h5 style="color: #922b20; font-weight: 700;">Burn Gel</h5>
                  <p style="color: #666; line-height: 1.6;">
                    Immediate relief for burns, scalds, and sunburn. Cools and soothes damaged skin.
                  </p>
                  <div class="dosage-info" style="background: rgba(146, 43, 32, 0.1); padding: 1rem; border-radius: 8px;">
                    <strong>Application:</strong> Apply liberally to affected area<br>
                    <strong>Reapply:</strong> Every 2-4 hours as needed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Critical Warning -->
        <div class="note-section card" style="
          border: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px; background: linear-gradient(135deg, #f8d7da, #f5c6cb);
          border-left: 6px solid #c0392b;
        ">
          <div class="card-body" style="padding: 2rem;">
            <div class="d-flex align-items-start">
              <i class="fas fa-exclamation-triangle" style="
                color: #721c24; font-size: 2rem; margin-right: 1rem; margin-top: 0.5rem;
              "></i>
              <div>
                <h4 style="color: #721c24; font-weight: 700; margin-bottom: 1rem;">Emergency Warning</h4>
                <p style="color: #721c24; font-size: 1rem; line-height: 1.6; margin-bottom: 0;">
                  Emergency medicines are for life-threatening situations only. Always call emergency services (911) 
                  first in any medical emergency. These medications are temporary measures while waiting for professional help. 
                  Proper training in first aid is essential before using emergency medications.
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
    .symptom-item:hover {
      transform: translateX(5px);
      background: rgba(192, 57, 43, 0.1) !important;
    }
  `]
})
export class EmergencyMedicinesComponent {}
