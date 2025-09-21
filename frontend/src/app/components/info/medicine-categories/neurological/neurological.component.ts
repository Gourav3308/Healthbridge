import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-neurological',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="medicine-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #f3f0ff 0%, #e6e0ff 50%, #f3f0ff 100%);
      min-height: 100vh;
      animation: backgroundPulse 8s ease-in-out infinite;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #6f42c1, #8a2be2, #6f42c1);
        background-size: 200% 200%;
        animation: gradientShift 6s ease-in-out infinite;
        color: white;
        padding: 4rem 0;
        position: relative;
        overflow: hidden;
      ">
        <div class="floating-brains" style="position: absolute; width: 100%; height: 100%;">
          <div class="brain-icon" style="
            position: absolute;
            top: 20%;
            left: 10%;
            font-size: 2rem;
            color: rgba(255, 255, 255, 0.2);
            animation: brainPulse 3s ease-in-out infinite;
          ">
            <i class="fas fa-brain"></i>
          </div>
          <div class="brain-icon" style="
            position: absolute;
            top: 60%;
            right: 15%;
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.3);
            animation: brainPulse 2.5s ease-in-out infinite 0.5s;
          ">
            <i class="fas fa-head-side-brain"></i>
          </div>
          <div class="brain-icon" style="
            position: absolute;
            bottom: 30%;
            left: 20%;
            font-size: 2.5rem;
            color: rgba(255, 255, 255, 0.15);
            animation: brainPulse 4s ease-in-out infinite 1s;
          ">
            <i class="fas fa-user-md"></i>
          </div>
        </div>
        
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
            animation: neuronPulse 3s ease-in-out infinite;
          ">
            <i class="fas fa-brain" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1rem;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            animation: titleGlow 4s ease-in-out infinite;
          ">Neurological Care</h1>
          <p style="
            font-size: 1.3rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          ">Advanced medications for brain health, nerve care, and neurological disorders</p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- What is Neurological Care Section -->
        <div class="info-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          overflow: hidden;
          background: linear-gradient(145deg, #ffffff, #f8f6ff);
          animation: cardFloat 6s ease-in-out infinite;
        ">
          <div class="card-body" style="padding: 3rem;">
            <div class="row align-items-center">
              <div class="col-lg-8">
                <h2 style="
                  color: #6f42c1;
                  font-size: 2.5rem;
                  font-weight: 700;
                  margin-bottom: 2rem;
                  background: linear-gradient(135deg, #6f42c1, #8a2be2);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                ">What is Neurological Care?</h2>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #555; margin-bottom: 1.5rem;">
                  Neurological care encompasses specialized medications designed to treat disorders of the nervous system, 
                  including the brain, spinal cord, and peripheral nerves. These medicines help manage conditions like 
                  epilepsy, migraines, depression, anxiety, and neurodegenerative diseases.
                </p>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
                  From anticonvulsants and antidepressants to neuroprotective agents and pain management drugs, 
                  neurological medications play a crucial role in maintaining brain health and improving quality of life.
                </p>
              </div>
              <div class="col-lg-4 text-center">
                <div class="brain-illustration" style="
                  font-size: 8rem;
                  color: rgba(111, 66, 193, 0.1);
                  animation: brainRotate 12s linear infinite;
                ">
                  <i class="fas fa-brain"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Common Symptoms Section -->
        <div class="symptoms-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #f8f6ff, #ffffff);
          animation: cardFloat 8s ease-in-out infinite 2s;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="
              color: #6f42c1;
              font-size: 2.2rem;
              font-weight: 700;
              margin-bottom: 2rem;
              text-align: center;
            ">Neurological Symptoms</h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(111, 66, 193, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #6f42c1;
                ">
                  <i class="fas fa-bolt" style="color: #6f42c1; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Seizures & Epilepsy</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(111, 66, 193, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #6f42c1;
                ">
                  <i class="fas fa-head-side-cough" style="color: #6f42c1; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Severe Headaches & Migraines</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(111, 66, 193, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #6f42c1;
                ">
                  <i class="fas fa-sad-tear" style="color: #6f42c1; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Depression & Anxiety</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(111, 66, 193, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #6f42c1;
                ">
                  <i class="fas fa-hand-paper" style="color: #6f42c1; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Tremors & Parkinson's</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(111, 66, 193, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #6f42c1;
                ">
                  <i class="fas fa-memory" style="color: #6f42c1; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Memory Loss & Dementia</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="symptom-item" style="
                  display: flex;
                  align-items: center;
                  padding: 1rem;
                  background: rgba(111, 66, 193, 0.05);
                  border-radius: 10px;
                  margin-bottom: 1rem;
                  transition: all 0.3s ease;
                  border-left: 4px solid #6f42c1;
                ">
                  <i class="fas fa-bed" style="color: #6f42c1; margin-right: 1rem; font-size: 1.2rem;"></i>
                  <span style="font-weight: 600;">Sleep Disorders & Insomnia</span>
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
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #f0f0ff);
          animation: cardFloat 10s ease-in-out infinite 4s;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="
              color: #6f42c1;
              font-size: 2.2rem;
              font-weight: 700;
              margin-bottom: 2rem;
              text-align: center;
            ">Neurological Medications</h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(111, 66, 193, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #6f42c1, #563d7c);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 6s linear infinite;
                  ">
                    <i class="fas fa-tablets" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #6f42c1; font-weight: 700; margin-bottom: 1rem;">Anticonvulsants</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Essential for controlling seizures and epilepsy. Also used for neuropathic pain and mood stabilization.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(111, 66, 193, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #6f42c1; font-weight: 600;">Example: Phenytoin, Carbamazepine</small>
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(111, 66, 193, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #8a2be2, #7b68ee);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 8s linear infinite;
                  ">
                    <i class="fas fa-pills" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #8a2be2; font-weight: 700; margin-bottom: 1rem;">Antidepressants</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Treats depression, anxiety, and certain chronic pain conditions. Helps balance brain chemicals.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(138, 43, 226, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #8a2be2; font-weight: 600;">Example: Sertraline, Fluoxetine</small>
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(111, 66, 193, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #9370db, #8b5a8c);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 10s linear infinite;
                  ">
                    <i class="fas fa-prescription-bottle-alt" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #9370db; font-weight: 700; margin-bottom: 1rem;">Anti-Parkinson's</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Manages symptoms of Parkinson's disease including tremors, stiffness, and movement problems.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(147, 112, 219, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #9370db; font-weight: 600;">Example: Levodopa, Pramipexole</small>
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(111, 66, 193, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #4b0082, #663399);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 7s linear infinite;
                  ">
                    <i class="fas fa-capsules" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #4b0082; font-weight: 700; margin-bottom: 1rem;">Anxiolytics</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Provides relief from anxiety disorders, panic attacks, and acute stress reactions.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(75, 0, 130, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #4b0082; font-weight: 600;">Example: Lorazepam, Alprazolam</small>
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(111, 66, 193, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #9932cc, #8b008b);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 9s linear infinite;
                  ">
                    <i class="fas fa-pills" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #9932cc; font-weight: 700; margin-bottom: 1rem;">Migraine Relief</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Specialized medications for preventing and treating severe headaches and migraines.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(153, 50, 204, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #9932cc; font-weight: 600;">Example: Sumatriptan, Rizatriptan</small>
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="medicine-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(111, 66, 193, 0.1);
                ">
                  <div class="medicine-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #6a5acd, #483d8b);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: medicineIconSpin 11s linear infinite;
                  ">
                    <i class="fas fa-tablets" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #6a5acd; font-weight: 700; margin-bottom: 1rem;">Memory Enhancers</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Cognitive enhancers for memory improvement and treatment of dementia and Alzheimer's disease.
                  </p>
                  <div class="dosage-info" style="
                    background: rgba(106, 90, 205, 0.1);
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                  ">
                    <small style="color: #6a5acd; font-weight: 600;">Example: Donepezil, Memantine</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Important Note Section -->
        <div class="note-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          background: linear-gradient(135deg, #e2d5f7, #d6c7f0);
          border-left: 6px solid #6f42c1;
          animation: noteGlow 4s ease-in-out infinite;
        ">
          <div class="card-body" style="padding: 2rem;">
            <div class="d-flex align-items-start">
              <i class="fas fa-exclamation-triangle" style="
                color: #4a2c6b;
                font-size: 2rem;
                margin-right: 1rem;
                margin-top: 0.5rem;
              "></i>
              <div>
                <h4 style="color: #4a2c6b; font-weight: 700; margin-bottom: 1rem;">Critical Warning</h4>
                <p style="color: #4a2c6b; font-size: 1rem; line-height: 1.6; margin-bottom: 0;">
                  Neurological medications require careful monitoring by specialists. Never stop taking these medications 
                  suddenly as it may cause withdrawal symptoms or worsen conditions. Regular follow-ups with neurologists 
                  or psychiatrists are essential. This information is educational only and not a substitute for professional care.
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
    @keyframes backgroundPulse {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    
    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    
    @keyframes brainPulse {
      0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.7; }
      50% { transform: scale(1.2) rotate(5deg); opacity: 1; }
    }
    
    @keyframes neuronPulse {
      0%, 100% { 
        transform: scale(1);
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        filter: brightness(1);
      }
      50% { 
        transform: scale(1.1);
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
        filter: brightness(1.2);
      }
    }
    
    @keyframes brainRotate {
      0% { transform: rotateY(0deg); }
      100% { transform: rotateY(360deg); }
    }
    
    @keyframes titleGlow {
      0%, 100% { text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); }
      50% { text-shadow: 0 4px 30px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 255, 255, 0.3); }
    }
    
    @keyframes cardFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
    }
    
    @keyframes medicineIconSpin {
      0% { transform: rotateY(0deg); }
      100% { transform: rotateY(360deg); }
    }
    
    @keyframes noteGlow {
      0%, 100% { box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1); }
      50% { box-shadow: 0 25px 70px rgba(111, 66, 193, 0.2), 0 20px 60px rgba(0, 0, 0, 0.1); }
    }
    
    .medicine-card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    }
    
    .symptom-item:hover {
      transform: translateX(5px);
      background: rgba(111, 66, 193, 0.1) !important;
    }
    
    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 2rem !important;
      }
      
      .hero-section p {
        font-size: 1.1rem !important;
      }
      
      .container {
        padding: 2rem 1rem !important;
      }
    }
  `]
})
export class NeurologicalComponent {}
