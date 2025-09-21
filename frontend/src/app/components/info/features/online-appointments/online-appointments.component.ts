import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-online-appointments',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="feature-detail-container" style="
      margin-top: 70px;
      background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 50%, #f0f8ff 100%);
      min-height: 100vh;
      animation: backgroundPulse 8s ease-in-out infinite;
    ">
      <!-- Hero Section -->
      <div class="hero-section" style="
        background: linear-gradient(135deg, #1e90ff, #00bfff, #1e90ff);
        background-size: 200% 200%;
        animation: gradientShift 6s ease-in-out infinite;
        color: white;
        padding: 4rem 0;
        position: relative;
        overflow: hidden;
      ">
        <div class="floating-appointments" style="position: absolute; width: 100%; height: 100%;">
          <div class="appointment-icon" style="
            position: absolute;
            top: 20%;
            left: 10%;
            font-size: 2rem;
            color: rgba(255, 255, 255, 0.2);
            animation: appointmentFloat 4s ease-in-out infinite;
          ">
            <i class="fas fa-calendar-check"></i>
          </div>
          <div class="appointment-icon" style="
            position: absolute;
            top: 60%;
            right: 15%;
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.3);
            animation: appointmentFloat 3s ease-in-out infinite 0.5s;
          ">
            <i class="fas fa-clock"></i>
          </div>
          <div class="appointment-icon" style="
            position: absolute;
            bottom: 30%;
            left: 20%;
            font-size: 2.5rem;
            color: rgba(255, 255, 255, 0.15);
            animation: appointmentFloat 5s ease-in-out infinite 1s;
          ">
            <i class="fas fa-user-md"></i>
          </div>
        </div>
        
        <div class="container text-center position-relative" style="z-index: 10;">
          <div class="feature-icon" style="
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
            animation: featurePulse 3s ease-in-out infinite;
          ">
            <i class="fas fa-calendar-check" style="font-size: 3rem; color: white;"></i>
          </div>
          <h1 style="
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1rem;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            animation: titleGlow 4s ease-in-out infinite;
          ">Online Appointments</h1>
          <p style="
            font-size: 1.3rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          ">Book appointments with top doctors instantly from anywhere, anytime</p>
        </div>
      </div>

      <div class="container" style="padding: 4rem 0;">
        <!-- What are Online Appointments Section -->
        <div class="info-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          overflow: hidden;
          background: linear-gradient(145deg, #ffffff, #f0f8ff);
          animation: cardFloat 6s ease-in-out infinite;
        ">
          <div class="card-body" style="padding: 3rem;">
            <div class="row align-items-center">
              <div class="col-lg-8">
                <h2 style="
                  color: #1e90ff;
                  font-size: 2.5rem;
                  font-weight: 700;
                  margin-bottom: 2rem;
                  background: linear-gradient(135deg, #1e90ff, #00bfff);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                ">What are Online Appointments?</h2>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #555; margin-bottom: 1.5rem;">
                  Online appointments revolutionize healthcare by allowing patients to book consultations with qualified 
                  doctors through our digital platform. No more waiting in long queues or calling multiple clinics - 
                  everything is available at your fingertips, 24/7.
                </p>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
                  Our system connects you with verified healthcare professionals across various specializations, 
                  making quality healthcare accessible, convenient, and efficient for everyone.
                </p>
              </div>
              <div class="col-lg-4 text-center">
                <div class="appointment-illustration" style="
                  font-size: 8rem;
                  color: rgba(30, 144, 255, 0.1);
                  animation: appointmentSpin 15s linear infinite;
                ">
                  <i class="fas fa-calendar-check"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- How It Works Section -->
        <div class="how-it-works-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #f0f8ff, #ffffff);
          animation: cardFloat 8s ease-in-out infinite 2s;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="
              color: #1e90ff;
              font-size: 2.2rem;
              font-weight: 700;
              margin-bottom: 3rem;
              text-align: center;
            ">How Online Appointments Work</h3>
            <div class="row">
              <div class="col-lg-3 col-md-6 mb-4">
                <div class="step-card text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(30, 144, 255, 0.1);
                  position: relative;
                ">
                  <div class="step-number" style="
                    position: absolute;
                    top: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #1e90ff, #00bfff);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 700;
                    font-size: 1.2rem;
                  ">1</div>
                  <div class="step-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 2rem auto 1.5rem;
                    background: linear-gradient(135deg, #1e90ff, #00bfff);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: stepIconPulse 3s ease-in-out infinite;
                  ">
                    <i class="fas fa-user-plus" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #1e90ff; font-weight: 700; margin-bottom: 1rem;">Register</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Create your account with basic details and verify your identity for secure access.
                  </p>
                </div>
              </div>
              
              <div class="col-lg-3 col-md-6 mb-4">
                <div class="step-card text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(30, 144, 255, 0.1);
                  position: relative;
                ">
                  <div class="step-number" style="
                    position: absolute;
                    top: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #00bfff, #87ceeb);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 700;
                    font-size: 1.2rem;
                  ">2</div>
                  <div class="step-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 2rem auto 1.5rem;
                    background: linear-gradient(135deg, #00bfff, #87ceeb);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: stepIconPulse 3s ease-in-out infinite 0.5s;
                  ">
                    <i class="fas fa-search" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #00bfff; font-weight: 700; margin-bottom: 1rem;">Find Doctor</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Search for doctors by specialization, location, ratings, and availability.
                  </p>
                </div>
              </div>
              
              <div class="col-lg-3 col-md-6 mb-4">
                <div class="step-card text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(30, 144, 255, 0.1);
                  position: relative;
                ">
                  <div class="step-number" style="
                    position: absolute;
                    top: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #87ceeb, #4682b4);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 700;
                    font-size: 1.2rem;
                  ">3</div>
                  <div class="step-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 2rem auto 1.5rem;
                    background: linear-gradient(135deg, #87ceeb, #4682b4);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: stepIconPulse 3s ease-in-out infinite 1s;
                  ">
                    <i class="fas fa-calendar-plus" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #4682b4; font-weight: 700; margin-bottom: 1rem;">Book Slot</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Select your preferred date and time slot from available appointments.
                  </p>
                </div>
              </div>
              
              <div class="col-lg-3 col-md-6 mb-4">
                <div class="step-card text-center" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(30, 144, 255, 0.1);
                  position: relative;
                ">
                  <div class="step-number" style="
                    position: absolute;
                    top: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #4682b4, #2e5c8a);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 700;
                    font-size: 1.2rem;
                  ">4</div>
                  <div class="step-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 2rem auto 1.5rem;
                    background: linear-gradient(135deg, #4682b4, #2e5c8a);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: stepIconPulse 3s ease-in-out infinite 1.5s;
                  ">
                    <i class="fas fa-stethoscope" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #2e5c8a; font-weight: 700; margin-bottom: 1rem;">Consult</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Attend your appointment and receive professional healthcare consultation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Benefits Section -->
        <div class="benefits-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 3rem;
          background: linear-gradient(145deg, #ffffff, #f0f8ff);
          animation: cardFloat 10s ease-in-out infinite 4s;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="
              color: #1e90ff;
              font-size: 2.2rem;
              font-weight: 700;
              margin-bottom: 3rem;
              text-align: center;
            ">Benefits of Online Appointments</h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="benefit-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(30, 144, 255, 0.1);
                ">
                  <div class="benefit-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: benefitIconFloat 4s ease-in-out infinite;
                  ">
                    <i class="fas fa-clock" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #ff6b6b; font-weight: 700; margin-bottom: 1rem;">Save Time</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    No more waiting rooms or travel time. Book appointments instantly from home or office.
                  </p>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="benefit-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(30, 144, 255, 0.1);
                ">
                  <div class="benefit-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #4ecdc4, #44a08d);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: benefitIconFloat 4s ease-in-out infinite 1s;
                  ">
                    <i class="fas fa-calendar-alt" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #4ecdc4; font-weight: 700; margin-bottom: 1rem;">24/7 Booking</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Book appointments anytime, anywhere. Our platform is available round the clock.
                  </p>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="benefit-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(30, 144, 255, 0.1);
                ">
                  <div class="benefit-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #a8e6cf, #7fcdcd);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: benefitIconFloat 4s ease-in-out infinite 2s;
                  ">
                    <i class="fas fa-user-check" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #7fcdcd; font-weight: 700; margin-bottom: 1rem;">Verified Doctors</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    All doctors are thoroughly verified with proper licenses and qualifications.
                  </p>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="benefit-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(30, 144, 255, 0.1);
                ">
                  <div class="benefit-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #ffd93d, #ff6b6b);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: benefitIconFloat 4s ease-in-out infinite 3s;
                  ">
                    <i class="fas fa-bell" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #ffd93d; font-weight: 700; margin-bottom: 1rem;">Smart Reminders</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Get automatic reminders and notifications about your upcoming appointments.
                  </p>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="benefit-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(30, 144, 255, 0.1);
                ">
                  <div class="benefit-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: benefitIconFloat 4s ease-in-out infinite 4s;
                  ">
                    <i class="fas fa-history" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #667eea; font-weight: 700; margin-bottom: 1rem;">Digital Records</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    All your appointment history and medical records are stored securely online.
                  </p>
                </div>
              </div>
              
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="benefit-card" style="
                  background: white;
                  border-radius: 15px;
                  padding: 2rem;
                  text-align: center;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  border: 2px solid rgba(30, 144, 255, 0.1);
                ">
                  <div class="benefit-icon" style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #f093fb, #f5576c);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: benefitIconFloat 4s ease-in-out infinite 5s;
                  ">
                    <i class="fas fa-shield-alt" style="font-size: 2rem; color: white;"></i>
                  </div>
                  <h5 style="color: #f5576c; font-weight: 700; margin-bottom: 1rem;">Secure & Private</h5>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
                    Your health data is protected with enterprise-grade security and privacy measures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="cta-section card" style="
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          background: linear-gradient(135deg, #1e90ff, #00bfff);
          color: white;
          text-align: center;
          animation: ctaGlow 6s ease-in-out infinite;
        ">
          <div class="card-body" style="padding: 3rem;">
            <h3 style="
              font-size: 2.5rem;
              font-weight: 800;
              margin-bottom: 1.5rem;
              text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            ">Ready to Book Your Appointment?</h3>
            <p style="
              font-size: 1.2rem;
              margin-bottom: 2.5rem;
              opacity: 0.9;
              max-width: 600px;
              margin-left: auto;
              margin-right: auto;
            ">Join thousands of patients who trust Healthbridge for convenient, quality healthcare</p>
            <div class="cta-buttons" style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
              <a routerLink="/patient/doctors" class="btn btn-light btn-lg" style="
                padding: 1rem 2.5rem;
                border-radius: 50px;
                font-weight: 700;
                font-size: 1.1rem;
                border: none;
                transition: all 0.3s ease;
                animation: ctaButtonPulse 4s ease-in-out infinite;
              ">
                <i class="fas fa-search me-2"></i>
                Find Doctors Now
              </a>
              <a routerLink="/auth/register" class="btn btn-outline-light btn-lg" style="
                padding: 1rem 2.5rem;
                border-radius: 50px;
                font-weight: 700;
                font-size: 1.1rem;
                border: 2px solid white;
                transition: all 0.3s ease;
              ">
                <i class="fas fa-user-plus me-2"></i>
                Register Now
              </a>
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
    
    @keyframes appointmentFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(10deg); }
    }
    
    @keyframes featurePulse {
      0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
      50% { transform: scale(1.1); box-shadow: 0 0 30px rgba(255, 255, 255, 0.5); }
    }
    
    @keyframes appointmentSpin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes titleGlow {
      0%, 100% { text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); }
      50% { text-shadow: 0 4px 30px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 255, 255, 0.3); }
    }
    
    @keyframes cardFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
    }
    
    @keyframes stepIconPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    @keyframes benefitIconFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    
    @keyframes ctaGlow {
      0%, 100% { box-shadow: 0 20px 60px rgba(30, 144, 255, 0.3); }
      50% { box-shadow: 0 25px 70px rgba(30, 144, 255, 0.5), 0 0 50px rgba(30, 144, 255, 0.3); }
    }
    
    @keyframes ctaButtonPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    .step-card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    }
    
    .benefit-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
    
    .cta-buttons .btn:hover {
      transform: translateY(-3px) scale(1.05);
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
      
      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .cta-buttons .btn {
        width: 100%;
        max-width: 300px;
      }
    }
  `]
})
export class OnlineAppointmentsComponent {}
