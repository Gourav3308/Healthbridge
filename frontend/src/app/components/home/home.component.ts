import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../shared/footer/footer.component';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, HeaderComponent],
  template: `
    <!-- Dynamic 3D Header -->
    <app-header></app-header>

    <!-- Professional 3D Hero Section with Dynamic Video Background -->
    <div class="hero-section-3d" style="
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #667eea 50%, #764ba2 75%, #1e3c72 100%);
      background-size: 400% 400%;
      animation: gradientFlow 20s ease-in-out infinite;
      color: white;
      padding: 8rem 0 6rem 0;
      margin-top: 70px;
      position: relative;
      overflow: hidden;
      perspective: 1000px;
      min-height: 100vh;
    ">
      <!-- Dynamic Health Video Background -->
      <div class="video-background" style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        opacity: 0.3;
      ">
        <!-- Simulated Video with Health-related animations -->
        <div class="health-video-simulation" style="
          position: absolute;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 30%, rgba(0, 255, 127, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 20, 147, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 20%, rgba(30, 144, 255, 0.25) 0%, transparent 60%),
            radial-gradient(circle at 30% 80%, rgba(255, 165, 0, 0.2) 0%, transparent 50%);
          animation: healthVideoFlow 25s ease-in-out infinite;
        "></div>
        
        <!-- Medical Data Visualization -->
        <div class="medical-data-viz" style="
          position: absolute;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(45deg, transparent 30%, rgba(0, 255, 127, 0.1) 50%, transparent 70%),
            linear-gradient(-45deg, transparent 30%, rgba(30, 144, 255, 0.1) 50%, transparent 70%);
          animation: dataVisualization 18s linear infinite;
        "></div>
        
        <!-- Heartbeat Line Animation -->
        <div class="heartbeat-lines" style="
          position: absolute;
          width: 100%;
          height: 100%;
          background: 
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 48px,
              rgba(0, 255, 127, 0.3) 50px,
              rgba(0, 255, 127, 0.3) 52px,
              transparent 54px
            );
          animation: heartbeatScan 8s linear infinite;
        "></div>
        
        <div class="medical-animation" style="
          position: absolute;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 20%, rgba(0, 255, 127, 0.25) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(30, 144, 255, 0.3) 0%, transparent 60%);
          animation: medicalWave 15s ease-in-out infinite;
        "></div>
        
        <!-- Enhanced 3D Medical Icons with Health Colors -->
        <div class="floating-medical-icons">
          <div class="medical-icon" style="
            position: absolute;
            top: 15%;
            left: 15%;
            font-size: 3.5rem;
            color: rgba(0, 255, 127, 0.8);
            animation: float3D 8s ease-in-out infinite, heartbeatPulse 2s ease-in-out infinite;
            transform-style: preserve-3d;
            filter: drop-shadow(0 0 20px rgba(0, 255, 127, 0.6));
          ">
            <i class="fas fa-heartbeat"></i>
          </div>
          <div class="medical-icon" style="
            position: absolute;
            top: 25%;
            right: 20%;
            font-size: 3rem;
            color: rgba(30, 144, 255, 0.7);
            animation: float3D 10s ease-in-out infinite 2s, stethoscopeSwing 4s ease-in-out infinite;
            transform-style: preserve-3d;
            filter: drop-shadow(0 0 18px rgba(30, 144, 255, 0.5));
          ">
            <i class="fas fa-stethoscope"></i>
          </div>
          <div class="medical-icon" style="
            position: absolute;
            bottom: 30%;
            left: 25%;
            font-size: 2.5rem;
            color: rgba(255, 20, 147, 0.6);
            animation: float3D 12s ease-in-out infinite 4s, pillsRotate 6s linear infinite;
            transform-style: preserve-3d;
            filter: drop-shadow(0 0 15px rgba(255, 20, 147, 0.4));
          ">
            <i class="fas fa-pills"></i>
          </div>
          <div class="medical-icon" style="
            position: absolute;
            bottom: 20%;
            right: 15%;
            font-size: 3.2rem;
            color: rgba(255, 165, 0, 0.8);
            animation: float3D 9s ease-in-out infinite 1s, doctorNod 5s ease-in-out infinite;
            transform-style: preserve-3d;
            filter: drop-shadow(0 0 22px rgba(255, 165, 0, 0.6));
          ">
            <i class="fas fa-user-md"></i>
          </div>
          <div class="medical-icon" style="
            position: absolute;
            top: 45%;
            left: 5%;
            font-size: 2.8rem;
            color: rgba(255, 69, 0, 0.7);
            animation: float3D 11s ease-in-out infinite 3s, ambulanceMove 7s ease-in-out infinite;
            transform-style: preserve-3d;
            filter: drop-shadow(0 0 20px rgba(255, 69, 0, 0.5));
          ">
            <i class="fas fa-ambulance"></i>
          </div>
          <div class="medical-icon" style="
            position: absolute;
            top: 65%;
            right: 10%;
            font-size: 3rem;
            color: rgba(138, 43, 226, 0.6);
            animation: float3D 13s ease-in-out infinite 5s, hospitalGlow 8s ease-in-out infinite;
            transform-style: preserve-3d;
            filter: drop-shadow(0 0 25px rgba(138, 43, 226, 0.4));
          ">
            <i class="fas fa-hospital"></i>
          </div>
          <div class="medical-icon" style="
            position: absolute;
            top: 35%;
            left: 45%;
            font-size: 2.3rem;
            color: rgba(50, 205, 50, 0.6);
            animation: float3D 14s ease-in-out infinite 6s, dnaRotate 10s linear infinite;
            transform-style: preserve-3d;
            filter: drop-shadow(0 0 18px rgba(50, 205, 50, 0.4));
          ">
            <i class="fas fa-dna"></i>
          </div>
          <div class="medical-icon" style="
            position: absolute;
            bottom: 45%;
            right: 35%;
            font-size: 2.6rem;
            color: rgba(255, 140, 0, 0.7);
            animation: float3D 16s ease-in-out infinite 8s, syringeFloat 12s ease-in-out infinite;
            transform-style: preserve-3d;
            filter: drop-shadow(0 0 20px rgba(255, 140, 0, 0.5));
          ">
            <i class="fas fa-syringe"></i>
          </div>
        </div>
      </div>

      <!-- Hero Background Animation -->
      <div class="hero-bg-animation" style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
          radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
        animation: heroBackgroundPulse 8s ease-in-out infinite;
        z-index: 2;
      "></div>
      
      <!-- Dynamic Particles -->
      <div class="hero-particles" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; z-index: 3;">
        <div class="hero-particle" style="
          position: absolute;
          width: 8px;
          height: 8px;
          background: #ffd700;
          border-radius: 50%;
          top: 20%;
          left: 10%;
          animation: heroFloat1 8s ease-in-out infinite;
          box-shadow: 0 0 20px #ffd700;
        "></div>
        <div class="hero-particle" style="
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          top: 60%;
          left: 85%;
          animation: heroFloat2 10s ease-in-out infinite;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
        "></div>
        <div class="hero-particle" style="
          position: absolute;
          width: 7px;
          height: 7px;
          background: #ffd700;
          border-radius: 50%;
          top: 80%;
          left: 20%;
          animation: heroFloat1 12s ease-in-out infinite reverse;
          box-shadow: 0 0 22px #ffd700;
        "></div>
        <div class="hero-particle" style="
          position: absolute;
          width: 5px;
          height: 5px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          top: 35%;
          right: 30%;
          animation: heroFloat2 14s ease-in-out infinite 2s;
          box-shadow: 0 0 18px rgba(255, 255, 255, 0.7);
        "></div>
      </div>
      
      <div class="container text-center position-relative" style="z-index: 10;">
        <div class="hero-content-3d" style="transform: translateZ(30px);">
          <!-- Professional Badge -->
          <div class="professional-badge" style="
            display: inline-block;
            background: linear-gradient(135deg, rgba(0, 255, 127, 0.2), rgba(30, 144, 255, 0.2));
            color: rgba(0, 255, 127, 1);
            padding: 0.6rem 2rem;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 700;
            margin-bottom: 2rem;
            border: 2px solid rgba(0, 255, 127, 0.4);
            backdrop-filter: blur(15px);
            animation: badgeGlow 3s ease-in-out infinite;
            box-shadow: 0 10px 30px rgba(0, 255, 127, 0.3);
          ">
            🏥 India's Most Trusted Healthcare Platform
          </div>
          
          <h1 class="hero-title-3d" style="
            font-size: 4.5rem;
            font-weight: 900;
            margin-bottom: 2rem;
            background: linear-gradient(45deg, #fff, #00ff7f, #1e90ff, #fff, #00ff7f);
            background-size: 400% 400%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 50px rgba(0, 255, 127, 0.8);
            animation: titleGlow 6s ease-in-out infinite, gradientShift 10s ease-in-out infinite;
            letter-spacing: 4px;
            line-height: 1.1;
          ">
            Your Health, Our Priority
          </h1>
          
          <h2 class="hero-subtitle-main" style="
            font-size: 2.2rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            color: rgba(255, 255, 255, 0.95);
            text-shadow: 0 3px 20px rgba(0, 0, 0, 0.4);
            animation: subtitleFade 4s ease-in-out infinite;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(0, 255, 127, 0.8));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          ">
            Book Appointments with India's Top Doctors
          </h2>
          
          <p class="hero-subtitle-3d" style="
            font-size: 1.3rem;
            margin-bottom: 3rem;
            opacity: 0.9;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.6;
            font-weight: 400;
          ">
            Connect with verified healthcare professionals, book appointments instantly, and experience world-class medical care from the comfort of your home.
          </p>
          
          <!-- Professional Stats -->
          <div class="hero-stats" style="
            display: flex;
            justify-content: center;
            gap: 3rem;
            margin-bottom: 3rem;
            flex-wrap: wrap;
          ">
            <div class="stat-item" style="
              text-align: center;
              animation: statCounter 2s ease-out;
            ">
              <div style="font-size: 2.5rem; font-weight: 800; color: #ffd700;">500+</div>
              <div style="font-size: 0.9rem; opacity: 0.8;">Verified Doctors</div>
            </div>
            <div class="stat-item" style="
              text-align: center;
              animation: statCounter 2s ease-out 0.5s both;
            ">
              <div style="font-size: 2.5rem; font-weight: 800; color: #ffd700;">10K+</div>
              <div style="font-size: 0.9rem; opacity: 0.8;">Happy Patients</div>
            </div>
            <div class="stat-item" style="
              text-align: center;
              animation: statCounter 2s ease-out 1s both;
            ">
              <div style="font-size: 2.5rem; font-weight: 800; color: #ffd700;">24/7</div>
              <div style="font-size: 0.9rem; opacity: 0.8;">Support Available</div>
            </div>
          </div>
          <div class="hero-buttons-3d d-flex justify-content-center flex-wrap" style="gap: 2rem;">
            <a routerLink="/auth/register" class="btn btn-lg hero-btn-primary" style="
              background: linear-gradient(135deg, #00ff7f, #32cd32, #00ff7f);
              background-size: 200% 200%;
              color: #fff;
              border: none;
              font-weight: 800;
              padding: 1.3rem 3.5rem;
              border-radius: 60px;
              font-size: 1.2rem;
              transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
              transform: translateZ(15px) perspective(1000px);
              box-shadow: 0 15px 40px rgba(0, 255, 127, 0.5), 0 5px 15px rgba(0, 0, 0, 0.2);
              position: relative;
              overflow: hidden;
              letter-spacing: 1.5px;
              text-transform: uppercase;
              animation: buttonGlow 4s ease-in-out infinite;
              text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            ">
              <i class="fas fa-rocket me-2" style="animation: iconSpin 4s ease-in-out infinite;"></i>
              <span>Start Your Journey</span>
            </a>
            
            <a routerLink="/patient/doctors" class="btn btn-lg hero-btn-secondary" style="
              background: rgba(30, 144, 255, 0.2);
              color: white;
              border: 3px solid rgba(30, 144, 255, 0.8);
              font-weight: 700;
              padding: 1.3rem 3.5rem;
              border-radius: 60px;
              font-size: 1.2rem;
              transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
              transform: translateZ(15px) perspective(1000px);
              backdrop-filter: blur(15px);
              position: relative;
              overflow: hidden;
              letter-spacing: 1.5px;
              text-transform: uppercase;
              box-shadow: 0 15px 40px rgba(30, 144, 255, 0.3), 0 5px 15px rgba(0, 0, 0, 0.1);
              text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            ">
              <i class="fas fa-search me-2" style="animation: iconPulse 3s ease-in-out infinite;"></i>
              <span>Find Doctors Now</span>
            </a>
            
            <a routerLink="/auth/login" class="btn btn-lg hero-btn-tertiary" style="
              background: rgba(138, 43, 226, 0.15);
              color: rgba(255, 255, 255, 0.95);
              border: 2px solid rgba(138, 43, 226, 0.6);
              font-weight: 600;
              padding: 1.2rem 3rem;
              border-radius: 60px;
              font-size: 1.1rem;
              transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
              transform: translateZ(15px);
              backdrop-filter: blur(12px);
              position: relative;
              overflow: hidden;
              letter-spacing: 1px;
              text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
              box-shadow: 0 10px 30px rgba(138, 43, 226, 0.2);
            ">
              <i class="fas fa-sign-in-alt me-2"></i>
              <span>Login</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Features Section with 3D Cards -->
    <div class="features-section" style="
      padding: 6rem 0;
      background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%);
      position: relative;
      overflow: hidden;
    ">
      <div class="container">
        <div class="text-center mb-5">
          <div class="section-badge" style="
            display: inline-block;
            background: linear-gradient(135deg, #00ff7f, #1e90ff);
            color: white;
            padding: 0.6rem 2.5rem;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 700;
            margin-bottom: 2rem;
            box-shadow: 0 15px 40px rgba(0, 255, 127, 0.4);
            animation: sectionBadgeFloat 3s ease-in-out infinite;
            border: 2px solid rgba(255, 255, 255, 0.2);
          ">
            ✨ Premium Healthcare Experience
          </div>
          <h2 class="section-title" style="
            font-size: 3.2rem; 
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, #1e3c72, #00ff7f, #1e90ff, #1e3c72);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 900;
            letter-spacing: 2px;
            animation: gradientShift 8s ease-in-out infinite;
          ">Why Choose Healthbridge?</h2>
          <p class="section-subtitle text-muted" style="
            font-size: 1.2rem;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          ">Experience healthcare like never before with our cutting-edge platform and world-class medical professionals</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 3rem; margin-top: 4rem;">
          <div class="feature-card card text-center clickable-card" 
               (click)="navigateToFeature('verified-medical-experts')"
               style="
            border: none; 
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
            border-radius: 20px;
            overflow: hidden;
            background: linear-gradient(145deg, #ffffff, #f8f9fa);
            position: relative;
            cursor: pointer;
          ">
            <div class="card-body" style="padding: 3rem 2rem;">
              <div class="feature-icon-container" style="
                width: 120px;
                height: 120px;
                margin: 0 auto 2rem;
                background: linear-gradient(135deg, #00ff7f, #32cd32);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 20px 50px rgba(0, 255, 127, 0.4);
                animation: iconFloat 4s ease-in-out infinite;
                border: 4px solid rgba(255, 255, 255, 0.2);
              ">
                <i class="fas fa-user-md" style="font-size: 3rem; color: white; filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.3));"></i>
              </div>
              <h4 class="feature-title" style="
                margin-bottom: 1.5rem;
                font-size: 1.5rem;
                font-weight: 700;
                color: #333;
              ">Verified Medical Experts</h4>
              <p class="feature-description text-muted" style="
                font-size: 1rem;
                line-height: 1.6;
              ">All our doctors are thoroughly verified, licensed professionals with years of experience in their respective specializations</p>
            </div>
          </div>
          
          <div class="feature-card card text-center clickable-card" 
               (click)="navigateToFeature('online-appointments')"
               style="
            border: none; 
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
            border-radius: 20px;
            overflow: hidden;
            background: linear-gradient(145deg, #ffffff, #f8f9fa);
            position: relative;
            cursor: pointer;
          ">
            <div class="card-body" style="padding: 3rem 2rem;">
              <div class="feature-icon-container" style="
                width: 120px;
                height: 120px;
                margin: 0 auto 2rem;
                background: linear-gradient(135deg, #1e90ff, #4169e1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 20px 50px rgba(30, 144, 255, 0.4);
                animation: iconFloat 4s ease-in-out infinite 1s;
                border: 4px solid rgba(255, 255, 255, 0.2);
              ">
                <i class="fas fa-calendar-check" style="font-size: 3rem; color: white; filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.3));"></i>
              </div>
              <h4 class="feature-title" style="
                margin-bottom: 1.5rem;
                font-size: 1.5rem;
                font-weight: 700;
                color: #333;
              ">Online Appointments</h4>
              <p class="feature-description text-muted" style="
                font-size: 1rem;
                line-height: 1.6;
              ">Book appointments with just a few clicks, get instant confirmations, and manage your healthcare schedule effortlessly</p>
            </div>
          </div>
          
          <div class="feature-card card text-center clickable-card" 
               (click)="navigateToFeature('prescription-management')"
               style="
            border: none; 
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
            border-radius: 20px;
            overflow: hidden;
            background: linear-gradient(145deg, #ffffff, #f8f9fa);
            position: relative;
            cursor: pointer;
          ">
            <div class="card-body" style="padding: 3rem 2rem;">
              <div class="feature-icon-container" style="
                width: 120px;
                height: 120px;
                margin: 0 auto 2rem;
                background: linear-gradient(135deg, #e91e63, #ff6b9d);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 20px 50px rgba(233, 30, 99, 0.4);
                animation: iconFloat 4s ease-in-out infinite 2s;
                border: 4px solid rgba(255, 255, 255, 0.2);
              ">
                <i class="fas fa-prescription-bottle-alt" style="font-size: 3rem; color: white; filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.3));"></i>
              </div>
              <h4 class="feature-title" style="
                margin-bottom: 1.5rem;
                font-size: 1.5rem;
                font-weight: 700;
                color: #333;
              ">Prescription Management</h4>
              <p class="feature-description text-muted" style="
                font-size: 1rem;
                line-height: 1.6;
              ">Digital prescription and medicine management with smart reminders and easy ordering</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cta-section" style="background-color: var(--bg-tertiary); padding: 4rem 0;">
      <div class="container text-center">
        <h2 style="font-size: 2.25rem; margin-bottom: 1rem;">Ready to Get Started?</h2>
        <p class="text-muted" style="font-size: 1.125rem; margin-bottom: 2rem;">Join thousands of patients who trust Healthbridge for their healthcare needs</p>
        
        <div class="cta-buttons d-flex justify-content-center" style="gap: 1rem;">
          <div class="cta-option card" style="padding: 2rem; max-width: 300px;">
            <h5 style="color: var(--primary-color); margin-bottom: 1rem;">
              <i class="fas fa-user" style="margin-right: 0.5rem;"></i>
              For Patients
            </h5>
            <p class="text-muted mb-3">Find and book appointments with top doctors</p>
            <a routerLink="/auth/register" class="btn btn-primary w-100">Register as Patient</a>
          </div>
          
          <div class="cta-option card" style="padding: 2rem; max-width: 300px;">
            <h5 style="color: var(--success-color); margin-bottom: 1rem;">
              <i class="fas fa-stethoscope" style="margin-right: 0.5rem;"></i>
              For Doctors
            </h5>
            <p class="text-muted mb-3">Join our platform and reach more patients</p>
            <a routerLink="/auth/register" class="btn btn-success w-100">Register as Doctor</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Services Section -->
    <div id="services" class="services-section" style="background: #f8f9fa; padding: 4rem 0;">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="section-title" style="font-size: 2.5rem; margin-bottom: 1rem;">Our Services</h2>
          <p class="section-subtitle text-muted" style="font-size: 1.125rem;">Comprehensive healthcare solutions</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
          <div class="service-card card text-center clickable-card" 
               (click)="navigateToFeature('online-appointments')"
               style="
            border: none; 
            box-shadow: var(--shadow-lg);
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body" style="padding: 2rem;">
              <div class="service-icon" style="font-size: 2.5rem; color: #1e90ff; margin-bottom: 1rem; transition: all 0.3s ease;">
                <i class="fas fa-calendar-check"></i>
              </div>
              <h5>Online Appointments</h5>
              <p class="text-muted">Book appointments with top doctors online - instant confirmations and flexible scheduling</p>
            </div>
          </div>
          
          <div class="service-card card text-center clickable-card" 
               (click)="navigateToFeature('prescription-management')"
               style="
            border: none; 
            box-shadow: var(--shadow-lg);
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body" style="padding: 2rem;">
              <div class="service-icon" style="font-size: 2.5rem; color: #e91e63; margin-bottom: 1rem; transition: all 0.3s ease;">
                <i class="fas fa-prescription-bottle-alt"></i>
              </div>
              <h5>Prescription Management</h5>
              <p class="text-muted">Digital prescription storage, smart reminders, and easy medicine ordering</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Medicines Section -->
    <div id="medicines" class="medicines-section" style="padding: 4rem 0;">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="section-title" style="font-size: 2.5rem; margin-bottom: 1rem;">Medicine Categories</h2>
          <p class="section-subtitle text-muted" style="font-size: 1.125rem;">Quality medicines at your doorstep</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('general-medicine')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-pills" style="font-size: 2rem; color: #28a745; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>General Medicine</h6>
              <p class="text-muted small">Common medications</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('heart-care')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-heartbeat" style="font-size: 2rem; color: #dc3545; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Heart Care</h6>
              <p class="text-muted small">Cardiac medications</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('neurological')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-brain" style="font-size: 2rem; color: #6f42c1; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Neurological</h6>
              <p class="text-muted small">Brain & nerve care</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('pediatric')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-child" style="font-size: 2rem; color: #fd7e14; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Pediatric</h6>
              <p class="text-muted small">Child healthcare</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('fever-care')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-thermometer-half" style="font-size: 2rem; color: #ff6b35; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Fever Care</h6>
              <p class="text-muted small">Temperature control</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('pain-relief')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-hand-holding-medical" style="font-size: 2rem; color: #e74c3c; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Pain Relief</h6>
              <p class="text-muted small">Pain management</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('digestive-health')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-stomach" style="font-size: 2rem; color: #f39c12; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Digestive Health</h6>
              <p class="text-muted small">Stomach & gut care</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('respiratory-care')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-lungs" style="font-size: 2rem; color: #3498db; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Respiratory Care</h6>
              <p class="text-muted small">Lung & breathing</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('skin-care')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-hand-sparkles" style="font-size: 2rem; color: #e67e22; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Skin Care</h6>
              <p class="text-muted small">Dermatological care</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('diabetes-care')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-tint" style="font-size: 2rem; color: #9b59b6; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Diabetes Care</h6>
              <p class="text-muted small">Blood sugar control</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('allergy-relief')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-allergies" style="font-size: 2rem; color: #1abc9c; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Allergy Relief</h6>
              <p class="text-muted small">Antihistamines</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('womens-health')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-female" style="font-size: 2rem; color: #e91e63; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Women's Health</h6>
              <p class="text-muted small">Gynecological care</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('mens-health')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-male" style="font-size: 2rem; color: #2980b9; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Men's Health</h6>
              <p class="text-muted small">Male wellness</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('eye-care')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-eye" style="font-size: 2rem; color: #16a085; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Eye Care</h6>
              <p class="text-muted small">Vision health</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('bone-joint-care')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-bone" style="font-size: 2rem; color: #8e44ad; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Bone & Joint Care</h6>
              <p class="text-muted small">Orthopedic health</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('immune-support')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-shield-virus" style="font-size: 2rem; color: #27ae60; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Immune Support</h6>
              <p class="text-muted small">Immunity boosters</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('mental-health')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-brain" style="font-size: 2rem; color: #9b59b6; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Mental Health</h6>
              <p class="text-muted small">Psychological wellness</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('elderly-care')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-user-friends" style="font-size: 2rem; color: #34495e; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Elderly Care</h6>
              <p class="text-muted small">Senior health</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('vitamins-supplements')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-leaf" style="font-size: 2rem; color: #2ecc71; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Vitamins & Supplements</h6>
              <p class="text-muted small">Nutritional support</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('emergency-medicines')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-ambulance" style="font-size: 2rem; color: #c0392b; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Emergency Medicines</h6>
              <p class="text-muted small">First aid essentials</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('chronic-conditions')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-procedures" style="font-size: 2rem; color: #7f8c8d; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Chronic Conditions</h6>
              <p class="text-muted small">Long-term care</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('herbal-natural')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-seedling" style="font-size: 2rem; color: #27ae60; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Herbal & Natural</h6>
              <p class="text-muted small">Natural remedies</p>
            </div>
          </div>
          
          <div class="medicine-card card clickable-card" 
               (click)="navigateToMedicineCategory('infection-control')"
               style="
            border: 1px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div class="card-body text-center" style="padding: 1.5rem;">
              <i class="fas fa-virus-slash" style="font-size: 2rem; color: #e74c3c; margin-bottom: 1rem; transition: all 0.3s ease;"></i>
              <h6>Infection Control</h6>
              <p class="text-muted small">Antibiotics & antivirals</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- About Section -->
    <div id="about" class="about-section" style="background: #f8f9fa; padding: 4rem 0;">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h2 class="section-title" style="font-size: 2.5rem; margin-bottom: 2rem;">About Healthbridge</h2>
            <p class="lead" style="margin-bottom: 2rem;">
              Healthbridge is India's leading healthcare platform connecting patients with verified doctors across the country.
            </p>
            <div class="about-stats" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
              <div class="stat-item">
                <h3 style="color: #667eea; font-size: 2rem; margin-bottom: 0.5rem;">500+</h3>
                <p class="text-muted">Verified Doctors</p>
              </div>
              <div class="stat-item">
                <h3 style="color: #667eea; font-size: 2rem; margin-bottom: 0.5rem;">10,000+</h3>
                <p class="text-muted">Happy Patients</p>
              </div>
              <div class="stat-item">
                <h3 style="color: #667eea; font-size: 2rem; margin-bottom: 0.5rem;">50+</h3>
                <p class="text-muted">Cities</p>
              </div>
              <div class="stat-item">
                <h3 style="color: #667eea; font-size: 2rem; margin-bottom: 0.5rem;">24/7</h3>
                <p class="text-muted">Support</p>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="about-image text-center">
              <i class="fas fa-hospital" style="font-size: 10rem; color: #667eea; opacity: 0.1;"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <div id="contact" class="contact-section" style="padding: 4rem 0;">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="section-title" style="font-size: 2.5rem; margin-bottom: 1rem;">Contact Us</h2>
          <p class="section-subtitle text-muted" style="font-size: 1.125rem;">Get in touch with our team</p>
        </div>
        
        <div class="row">
          <div class="col-lg-4 mb-4">
            <div class="contact-card card text-center" style="border: none; box-shadow: var(--shadow-lg);">
              <div class="card-body" style="padding: 2rem;">
                <i class="fas fa-phone" style="font-size: 2rem; color: #667eea; margin-bottom: 1rem;"></i>
                <h5>Phone</h5>
                <p class="text-muted">+91 7903840357</p>
              </div>
            </div>
          </div>
          
          <div class="col-lg-4 mb-4">
            <div class="contact-card card text-center" style="border: none; box-shadow: var(--shadow-lg);">
              <div class="card-body" style="padding: 2rem;">
                <i class="fas fa-envelope" style="font-size: 2rem; color: #667eea; margin-bottom: 1rem;"></i>
                <h5>Email</h5>
                <p class="text-muted">healthbridge13012002@gmail.com</p>
              </div>
            </div>
          </div>
          
          <div class="col-lg-4 mb-4">
            <div class="contact-card card text-center" style="border: none; box-shadow: var(--shadow-lg);">
              <div class="card-body" style="padding: 2rem;">
                <i class="fas fa-map-marker-alt" style="font-size: 2rem; color: #667eea; margin-bottom: 1rem;"></i>
                <h5>Address</h5>
                <p class="text-muted">Forbesganj, Bihar, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .nav-hover {
      transition: all 0.3s ease;
    }
    
    .nav-hover:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }
    
    .navbar-toggler:focus {
      box-shadow: none;
    }
    
    .social-icon:hover {
      transform: translateY(-3px) scale(1.1);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }
    
    .footer-link:hover {
      opacity: 1 !important;
      color: #ffd700 !important;
      padding-left: 5px;
      transition: all 0.3s ease;
    }
    
    .hero-section {
      position: relative;
      overflow: hidden;
    }
    
    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
      opacity: 0.1;
    }
    
    .hero-content {
      position: relative;
      z-index: 1;
    }
    
    /* Enhanced 3D Health Video Animations */
    @keyframes gradientFlow {
      0%, 100% { background-position: 0% 50%; }
      25% { background-position: 100% 25%; }
      50% { background-position: 50% 100%; }
      75% { background-position: 25% 0%; }
    }
    
    @keyframes healthVideoFlow {
      0%, 100% { 
        transform: translateX(0%) translateY(0%) rotate(0deg) scale(1);
        opacity: 0.8;
        filter: hue-rotate(0deg);
      }
      25% { 
        transform: translateX(3%) translateY(-2%) rotate(1deg) scale(1.02);
        opacity: 1;
        filter: hue-rotate(90deg);
      }
      50% { 
        transform: translateX(-2%) translateY(3%) rotate(-0.5deg) scale(0.98);
        opacity: 0.9;
        filter: hue-rotate(180deg);
      }
      75% { 
        transform: translateX(1%) translateY(-1%) rotate(0.8deg) scale(1.01);
        opacity: 0.95;
        filter: hue-rotate(270deg);
      }
    }
    
    @keyframes dataVisualization {
      0% { transform: translateX(-100%) skewX(0deg); opacity: 0.3; }
      50% { transform: translateX(0%) skewX(5deg); opacity: 0.6; }
      100% { transform: translateX(100%) skewX(0deg); opacity: 0.3; }
    }
    
    @keyframes heartbeatScan {
      0% { transform: translateX(-100%); opacity: 0.5; }
      50% { opacity: 0.8; }
      100% { transform: translateX(100%); opacity: 0.5; }
    }
    
    @keyframes heroBackgroundPulse {
      0%, 100% { opacity: 0.8; transform: scale(1) rotate(0deg); }
      50% { opacity: 1; transform: scale(1.03) rotate(1deg); }
    }
    
    @keyframes medicalWave {
      0%, 100% { 
        transform: translateX(0%) translateY(0%) rotate(0deg) scale(1);
        opacity: 0.6;
      }
      25% { 
        transform: translateX(5%) translateY(-3%) rotate(2deg) scale(1.05);
        opacity: 0.8;
      }
      50% { 
        transform: translateX(-3%) translateY(5%) rotate(-1deg) scale(0.95);
        opacity: 1;
      }
      75% { 
        transform: translateX(2%) translateY(-2%) rotate(1.5deg) scale(1.02);
        opacity: 0.7;
      }
    }
    
    /* Medical Icon Specific Animations */
    @keyframes heartbeatPulse {
      0%, 100% { transform: scale(1); filter: brightness(1); }
      50% { transform: scale(1.2); filter: brightness(1.3); }
    }
    
    @keyframes stethoscopeSwing {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(15deg); }
      75% { transform: rotate(-15deg); }
    }
    
    @keyframes pillsRotate {
      0% { transform: rotateY(0deg); }
      100% { transform: rotateY(360deg); }
    }
    
    @keyframes doctorNod {
      0%, 100% { transform: rotateX(0deg); }
      50% { transform: rotateX(10deg); }
    }
    
    @keyframes ambulanceMove {
      0%, 100% { transform: translateX(0px) rotateZ(0deg); }
      50% { transform: translateX(10px) rotateZ(2deg); }
    }
    
    @keyframes hospitalGlow {
      0%, 100% { filter: brightness(1) saturate(1); }
      50% { filter: brightness(1.3) saturate(1.5); }
    }
    
    @keyframes dnaRotate {
      0% { transform: rotateY(0deg) rotateZ(0deg); }
      100% { transform: rotateY(360deg) rotateZ(180deg); }
    }
    
    @keyframes syringeFloat {
      0%, 100% { transform: translateY(0px) rotateZ(0deg); }
      50% { transform: translateY(-8px) rotateZ(5deg); }
    }
    
    @keyframes float3D {
      0%, 100% { 
        transform: translateY(0px) translateX(0px) translateZ(0px) rotateY(0deg) rotateX(0deg);
        opacity: 0.6;
      }
      25% { 
        transform: translateY(-20px) translateX(15px) translateZ(10px) rotateY(90deg) rotateX(15deg);
        opacity: 0.9;
      }
      50% { 
        transform: translateY(-10px) translateX(-10px) translateZ(20px) rotateY(180deg) rotateX(-10deg);
        opacity: 1;
      }
      75% { 
        transform: translateY(-25px) translateX(20px) translateZ(5px) rotateY(270deg) rotateX(20deg);
        opacity: 0.8;
      }
    }
    
    @keyframes heroFloat1 {
      0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 1; }
      25% { transform: translateY(-20px) translateX(15px) scale(1.1); opacity: 0.8; }
      50% { transform: translateY(-10px) translateX(-8px) scale(0.9); opacity: 1; }
      75% { transform: translateY(-18px) translateX(20px) scale(1.05); opacity: 0.9; }
    }
    
    @keyframes heroFloat2 {
      0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); }
      33% { transform: translateY(-15px) translateX(-12px) rotate(120deg) scale(1.2); }
      66% { transform: translateY(-25px) translateX(8px) rotate(240deg) scale(0.8); }
    }
    
    @keyframes titleGlow {
      0%, 100% { 
        text-shadow: 0 0 40px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 255, 255, 0.3);
        transform: perspective(1000px) rotateX(0deg);
      }
      50% { 
        text-shadow: 0 0 60px rgba(255, 215, 0, 0.9), 0 0 40px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 215, 0, 0.4);
        transform: perspective(1000px) rotateX(2deg);
      }
    }
    
    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    
    @keyframes subtitleFade {
      0%, 100% { opacity: 0.9; transform: translateY(0px); }
      50% { opacity: 1; transform: translateY(-2px); }
    }
    
    @keyframes badgeGlow {
      0%, 100% { 
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
        transform: scale(1);
      }
      50% { 
        box-shadow: 0 0 30px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.2);
        transform: scale(1.05);
      }
    }
    
    @keyframes statCounter {
      0% { opacity: 0; transform: translateY(20px) scale(0.8); }
      100% { opacity: 1; transform: translateY(0px) scale(1); }
    }
    
    @keyframes buttonGlow {
      0%, 100% { 
        background-position: 0% 50%;
        box-shadow: 0 15px 40px rgba(255, 215, 0, 0.5), 0 5px 15px rgba(0, 0, 0, 0.1);
      }
      50% { 
        background-position: 100% 50%;
        box-shadow: 0 20px 50px rgba(255, 215, 0, 0.7), 0 10px 25px rgba(0, 0, 0, 0.2);
      }
    }
    
    @keyframes iconSpin {
      0% { transform: rotate(0deg) scale(1); }
      25% { transform: rotate(15deg) scale(1.1); }
      50% { transform: rotate(0deg) scale(1.2); }
      75% { transform: rotate(-15deg) scale(1.1); }
      100% { transform: rotate(0deg) scale(1); }
    }
    
    @keyframes iconPulse {
      0%, 100% { 
        transform: scale(1); 
        filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.5));
      }
      50% { 
        transform: scale(1.2); 
        filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.9));
      }
    }
    
    /* Enhanced Health-themed Button 3D Effects */
    .hero-btn-primary:hover {
      transform: translateZ(30px) scale(1.1) rotateX(10deg) perspective(1000px);
      box-shadow: 
        0 30px 70px rgba(0, 255, 127, 0.8),
        0 15px 40px rgba(0, 0, 0, 0.3),
        inset 0 2px 0 rgba(255, 255, 255, 0.4);
      background: linear-gradient(135deg, #32cd32, #00ff7f, #32cd32) !important;
      background-size: 300% 300%;
      animation: buttonHoverGlow 1s ease-in-out infinite;
      filter: brightness(1.1) saturate(1.2);
    }
    
    .hero-btn-primary::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7), transparent);
      transition: left 0.8s ease;
      z-index: 1;
    }
    
    .hero-btn-primary:hover::before {
      left: 100%;
    }
    
    .hero-btn-secondary:hover {
      transform: translateZ(30px) scale(1.1) rotateX(-10deg) perspective(1000px);
      background: rgba(30, 144, 255, 0.4) !important;
      border-color: #1e90ff !important;
      color: #1e90ff !important;
      text-shadow: 0 0 25px rgba(30, 144, 255, 1);
      box-shadow: 
        0 30px 70px rgba(30, 144, 255, 0.5),
        0 15px 40px rgba(255, 255, 255, 0.3),
        inset 0 2px 0 rgba(30, 144, 255, 0.4);
      filter: brightness(1.2) saturate(1.3);
    }
    
    .hero-btn-tertiary:hover {
      transform: translateZ(25px) scale(1.08) rotateY(8deg);
      background: rgba(138, 43, 226, 0.3) !important;
      border-color: rgba(138, 43, 226, 0.9) !important;
      color: rgba(138, 43, 226, 1) !important;
      text-shadow: 0 0 20px rgba(138, 43, 226, 0.8);
      box-shadow: 
        0 25px 60px rgba(138, 43, 226, 0.4),
        0 10px 30px rgba(255, 255, 255, 0.2);
      filter: brightness(1.15) saturate(1.2);
    }
    
    @keyframes buttonHoverGlow {
      0%, 100% { filter: brightness(1) saturate(1); }
      50% { filter: brightness(1.1) saturate(1.2); }
    }
    
    @keyframes sectionBadgeFloat {
      0%, 100% { 
        transform: translateY(0px) scale(1);
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
      }
      50% { 
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
      }
    }
    
    @keyframes iconFloat {
      0%, 100% { 
        transform: translateY(0px) rotateY(0deg);
        box-shadow: 0 15px 40px rgba(102, 126, 234, 0.3);
      }
      50% { 
        transform: translateY(-10px) rotateY(180deg);
        box-shadow: 0 25px 50px rgba(102, 126, 234, 0.4);
      }
    }

    .feature-card {
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      transform: translateZ(0) perspective(1000px);
      transform-style: preserve-3d;
    }
    
    .feature-card:hover {
      transform: translateZ(30px) translateY(-15px) rotateX(8deg) rotateY(5deg) perspective(1000px);
      box-shadow: 
        0 35px 80px rgba(0, 0, 0, 0.2),
        0 15px 40px rgba(102, 126, 234, 0.1);
    }
    
    .feature-card:hover .feature-icon-container {
      transform: translateY(-5px) rotateY(360deg) scale(1.1);
      animation-duration: 2s;
    }
    
    .cta-option {
      transition: transform 0.3s ease;
    }
    
    .cta-option:hover {
      transform: translateY(-3px);
    }
    
    .clickable-card {
      cursor: pointer;
    }
    
    .clickable-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15) !important;
    }
    
    .clickable-card:hover .service-icon {
      transform: scale(1.2);
      color: #667eea !important;
    }
    
    .medicine-card.clickable-card:hover {
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2) !important;
      border-color: #667eea !important;
    }
    
    .medicine-card.clickable-card:hover i {
      transform: scale(1.3) rotate(10deg);
    }
    
    /* Enhanced Mobile Responsive Styles */
    @media (max-width: 575.98px) {
      .hero-section-3d {
        padding: 4rem 0 3rem 0 !important;
        min-height: 90vh !important;
      }
      
      .hero-title-3d {
        font-size: 1.75rem !important;
        letter-spacing: 1px !important;
        line-height: 1.2 !important;
      }
      
      .hero-subtitle-main {
        font-size: 1.1rem !important;
        line-height: 1.3 !important;
      }
      
      .hero-subtitle-3d {
        font-size: 0.9rem !important;
        padding: 0 1rem;
      }
      
      .professional-badge {
        font-size: 0.8rem !important;
        padding: 0.5rem 1.5rem !important;
      }
      
      .hero-stats {
        flex-direction: column !important;
        gap: 1rem !important;
      }
      
      .stat-item {
        width: 100%;
      }
      
      .stat-item div:first-child {
        font-size: 2rem !important;
      }
      
      .hero-buttons-3d {
        flex-direction: column !important;
        align-items: center !important;
        gap: 1rem !important;
      }
      
      .hero-buttons-3d .btn {
        width: 100% !important;
        max-width: 300px !important;
        padding: 1rem 2rem !important;
        font-size: 1rem !important;
      }
      
      .hero-btn-primary:hover, 
      .hero-btn-secondary:hover, 
      .hero-btn-tertiary:hover {
        transform: none !important;
        box-shadow: var(--shadow-lg) !important;
      }
      
      .floating-medical-icons .medical-icon {
        display: none !important;
      }
      
      /* Mobile Features Section */
      .features-section {
        padding: 3rem 0 !important;
      }
      
      .section-title {
        font-size: 2rem !important;
      }
      
      .section-subtitle {
        font-size: 1rem !important;
      }
      
      .feature-card {
        margin-bottom: 1.5rem !important;
      }
      
      .feature-card:hover {
        transform: none !important;
        box-shadow: var(--shadow-lg) !important;
      }
      
      .feature-icon-container {
        width: 80px !important;
        height: 80px !important;
        margin-bottom: 1rem !important;
      }
      
      .feature-icon-container i {
        font-size: 2rem !important;
      }
      
      .feature-title {
        font-size: 1.25rem !important;
      }
      
      .feature-description {
        font-size: 0.9rem !important;
      }
      
      /* Mobile Services Section */
      .services-section {
        padding: 3rem 0 !important;
      }
      
      .service-card {
        margin-bottom: 1rem !important;
      }
      
      .service-card:hover {
        transform: none !important;
        box-shadow: var(--shadow-md) !important;
      }
      
      .service-icon {
        font-size: 2rem !important;
      }
      
      /* Mobile Medicines Section */
      .medicines-section {
        padding: 3rem 0 !important;
      }
      
      .medicine-card {
        margin-bottom: 1rem !important;
      }
      
      .medicine-card:hover {
        transform: none !important;
        box-shadow: var(--shadow-md) !important;
      }
      
      .medicine-card i {
        font-size: 1.5rem !important;
      }
      
      .medicine-card h6 {
        font-size: 0.9rem !important;
      }
      
      .medicine-card .small {
        font-size: 0.75rem !important;
      }
      
      /* Mobile CTA Section */
      .cta-section {
        padding: 3rem 0 !important;
      }
      
      .cta-buttons {
        flex-direction: column !important;
        align-items: center !important;
        gap: 1rem !important;
      }
      
      .cta-option {
        width: 100% !important;
        max-width: 300px !important;
        margin-bottom: 1rem !important;
      }
      
      /* Mobile About Section */
      .about-section {
        padding: 3rem 0 !important;
      }
      
      .about-stats {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 1rem !important;
      }
      
      .stat-item h3 {
        font-size: 1.5rem !important;
      }
      
      /* Mobile Contact Section */
      .contact-section {
        padding: 3rem 0 !important;
      }
      
      .contact-card {
        margin-bottom: 1rem !important;
      }
      
      .contact-card i {
        font-size: 1.5rem !important;
      }
    }
    
    @media (min-width: 576px) and (max-width: 767.98px) {
      .hero-title-3d {
        font-size: 2.2rem !important;
      }
      
      .hero-subtitle-main {
        font-size: 1.3rem !important;
      }
      
      .hero-subtitle-3d {
        font-size: 1rem !important;
      }
      
      .hero-buttons-3d {
        flex-direction: column !important;
        gap: 1rem !important;
      }
      
      .hero-buttons-3d .btn {
        width: 100% !important;
        max-width: 350px !important;
      }
      
      .feature-card:hover {
        transform: translateY(-5px) !important;
      }
    }
    
    @media (min-width: 768px) and (max-width: 991.98px) {
      .hero-title-3d {
        font-size: 2.8rem !important;
      }
      
      .hero-subtitle-main {
        font-size: 1.6rem !important;
      }
      
      .hero-buttons-3d {
        gap: 1.5rem !important;
      }
      
      .hero-buttons-3d .btn {
        padding: 1rem 2.5rem !important;
      }
      
      .cta-buttons {
        flex-direction: row !important;
        justify-content: center !important;
      }
    }
    
    /* Touch Device Optimizations */
    @media (hover: none) and (pointer: coarse) {
      .clickable-card:hover {
        transform: none !important;
        box-shadow: var(--shadow-md) !important;
      }
      
      .clickable-card:active {
        transform: scale(0.98) !important;
        transition: transform 0.1s ease !important;
      }
      
      .medicine-card.clickable-card:hover i,
      .service-card:hover .service-icon {
        transform: none !important;
      }
      
      .btn:hover::before {
        left: 0 !important;
      }
      
      .btn:active {
        transform: scale(0.98) !important;
      }
    }
    
    /* Reduced Motion Support */
    @media (prefers-reduced-motion: reduce) {
      .hero-section-3d *,
      .floating-medical-icons *,
      .hero-particles * {
        animation: none !important;
      }
      
      .feature-icon-container {
        animation: none !important;
      }
      
      .clickable-card,
      .btn {
        transition: none !important;
      }
    }
  `]
})
export class HomeComponent {
  
  constructor(private router: Router) {}
  
  navigateToMedicineCategory(category: string): void {
    this.router.navigate(['/info/medicine-categories', category]);
  }
  
  navigateToFeature(feature: string): void {
    this.router.navigate(['/info/features', feature]);
  }
}
