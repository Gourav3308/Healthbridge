import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Stunning Health-themed 3D Footer -->
    <footer class="footer-3d" style="
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #00ff7f 50%, #1e90ff 75%, #1e3c72 100%);
      background-size: 400% 400%;
      animation: footerGradientFlow 25s ease-in-out infinite;
      color: white;
      padding: 5rem 0 2rem 0;
      position: relative;
      overflow: hidden;
      perspective: 1000px;
      border-top: 1px solid rgba(0, 255, 127, 0.4);
      box-shadow: 0 -8px 32px rgba(0, 255, 127, 0.2);
    ">
      <!-- Health-themed Animated Background -->
      <div class="bg-animation" style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
          radial-gradient(circle at 20% 20%, rgba(0, 255, 127, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(30, 144, 255, 0.12) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(255, 20, 147, 0.1) 0%, transparent 50%);
        animation: healthBackgroundPulse 10s ease-in-out infinite;
      "></div>
      
      <!-- Health Floating Particles -->
      <div class="particles" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none;">
        <div class="particle" style="
          position: absolute;
          width: 5px;
          height: 5px;
          background: #00ff7f;
          border-radius: 50%;
          top: 20%;
          left: 10%;
          animation: healthFloat1 6s ease-in-out infinite;
          box-shadow: 0 0 15px #00ff7f;
        "></div>
        <div class="particle" style="
          position: absolute;
          width: 7px;
          height: 7px;
          background: #1e90ff;
          border-radius: 50%;
          top: 60%;
          left: 80%;
          animation: healthFloat2 8s ease-in-out infinite;
          box-shadow: 0 0 18px #1e90ff;
        "></div>
        <div class="particle" style="
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ff1493;
          border-radius: 50%;
          top: 40%;
          left: 60%;
          animation: healthFloat3 7s ease-in-out infinite;
          box-shadow: 0 0 12px #ff1493;
        "></div>
        <div class="particle" style="
          position: absolute;
          width: 6px;
          height: 6px;
          background: #8a2be2;
          border-radius: 50%;
          top: 80%;
          left: 30%;
          animation: healthFloat1 9s ease-in-out infinite reverse;
          box-shadow: 0 0 16px #8a2be2;
        "></div>
        <div class="particle" style="
          position: absolute;
          width: 3px;
          height: 3px;
          background: #32cd32;
          border-radius: 50%;
          top: 15%;
          left: 75%;
          animation: healthFloat2 5s ease-in-out infinite 2s;
          box-shadow: 0 0 10px #32cd32;
        "></div>
      </div>
      
      <!-- Health 3D Grid Lines -->
      <div class="grid-3d" style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
          linear-gradient(rgba(0, 255, 127, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(30, 144, 255, 0.12) 1px, transparent 1px);
        background-size: 60px 60px;
        animation: healthGridMove 25s linear infinite;
        opacity: 0.4;
      "></div>
      
      <div class="container position-relative">
        <div class="row">
          <!-- Company Info -->
          <div class="col-lg-4 mb-4">
            <div class="footer-brand mb-3" style="
              background: rgba(255, 255, 255, 0.05);
              padding: 2rem;
              border-radius: 20px;
              backdrop-filter: blur(15px);
              border: 1px solid rgba(0, 255, 127, 0.4);
              transform: translateZ(20px);
              transition: all 0.3s ease;
              box-shadow: 0 15px 40px rgba(0, 255, 127, 0.2);
            " class="brand-card">
              <h4 class="fw-bold mb-3" style="
                color: #00ff7f;
                text-shadow: 0 0 25px rgba(0, 255, 127, 0.8);
                font-size: 1.9rem;
              ">
                <i class="fas fa-heartbeat me-2" style="color: #00ff7f; animation: healthHeartbeat 2s ease-in-out infinite;"></i>Healthbridge
              </h4>
              <p class="text-light mb-3" style="
                opacity: 0.95;
                line-height: 1.6;
                text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
              ">Your trusted healthcare partner connecting you with India's top medical professionals. Quality healthcare made accessible for everyone.</p>
              <div class="d-flex align-items-center mb-2" style="
                background: rgba(0, 255, 127, 0.15);
                padding: 0.9rem;
                border-radius: 15px;
                border-left: 4px solid #00ff7f;
                box-shadow: 0 5px 15px rgba(0, 255, 127, 0.2);
              ">
                <i class="fas fa-award me-2" style="color: #00ff7f; font-size: 1.3rem; animation: awardGlow 3s ease-in-out infinite;"></i>
                <span class="fw-semibold" style="color: #00ff7f;">Trusted by 10,000+ patients</span>
              </div>
            </div>
          </div>
          
          <!-- Contact Information -->
          <div class="col-lg-4 mb-4">
            <div class="contact-section" style="
              background: rgba(255, 255, 255, 0.05);
              padding: 2rem;
              border-radius: 20px;
              backdrop-filter: blur(15px);
              border: 1px solid rgba(30, 144, 255, 0.4);
              transform: translateZ(20px);
              transition: all 0.3s ease;
              box-shadow: 0 15px 40px rgba(30, 144, 255, 0.2);
            " class="contact-card">
              <h6 class="fw-bold mb-4" style="
                color: #1e90ff;
                font-size: 1.4rem;
                text-shadow: 0 0 20px rgba(30, 144, 255, 0.8);
              ">Contact Information</h6>
              <div class="contact-info">
                <div class="contact-item mb-4" style="
                  background: rgba(0, 255, 127, 0.12);
                  padding: 1.1rem;
                  border-radius: 15px;
                  border-left: 4px solid #00ff7f;
                  transition: all 0.3s ease;
                  box-shadow: 0 5px 15px rgba(0, 255, 127, 0.1);
                " class="contact-hover">
                  <div class="d-flex align-items-center">
                    <div class="icon-3d me-3" style="
                      width: 55px;
                      height: 55px;
                      background: linear-gradient(45deg, #00ff7f, #32cd32);
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      box-shadow: 0 10px 30px rgba(0, 255, 127, 0.4);
                      transform: translateZ(10px);
                      animation: healthIconPulse 3s ease-in-out infinite;
                    ">
                      <i class="fas fa-phone" style="color: white; font-size: 1.3rem;"></i>
                    </div>
                    <div>
                      <small class="d-block fw-bold" style="color: #00ff7f; font-size: 0.95rem;">Phone</small>
                      <a href="tel:7903840357" class="text-white text-decoration-none fw-bold" style="
                        font-size: 1.15rem;
                        text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
                        transition: all 0.3s ease;
                      " class="contact-link">+91 7903840357</a>
                    </div>
                  </div>
                </div>
                
                <div class="contact-item mb-4" style="
                  background: rgba(30, 144, 255, 0.12);
                  padding: 1.1rem;
                  border-radius: 15px;
                  border-left: 4px solid #1e90ff;
                  transition: all 0.3s ease;
                  box-shadow: 0 5px 15px rgba(30, 144, 255, 0.1);
                " class="contact-hover">
                  <div class="d-flex align-items-center">
                    <div class="icon-3d me-3" style="
                      width: 55px;
                      height: 55px;
                      background: linear-gradient(45deg, #1e90ff, #4169e1);
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      box-shadow: 0 10px 30px rgba(30, 144, 255, 0.4);
                      transform: translateZ(10px);
                      animation: healthIconPulse 3s ease-in-out infinite 1s;
                    ">
                      <i class="fas fa-envelope" style="color: white; font-size: 1.3rem;"></i>
                    </div>
                    <div>
                      <small class="d-block fw-bold" style="color: #1e90ff; font-size: 0.95rem;">Email</small>
                      <a href="mailto:healthbridge13012002@gmail.com" class="text-white text-decoration-none fw-bold" style="
                        font-size: 1.15rem;
                        text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
                        transition: all 0.3s ease;
                      " class="contact-link">healthbridge13012002@gmail.com</a>
                    </div>
                  </div>
                </div>
                
                <div class="contact-item mb-3" style="
                  background: rgba(255, 20, 147, 0.12);
                  padding: 1.1rem;
                  border-radius: 15px;
                  border-left: 4px solid #ff1493;
                  transition: all 0.3s ease;
                  box-shadow: 0 5px 15px rgba(255, 20, 147, 0.1);
                " class="contact-hover">
                  <div class="d-flex align-items-center">
                    <div class="icon-3d me-3" style="
                      width: 55px;
                      height: 55px;
                      background: linear-gradient(45deg, #ff1493, #8a2be2);
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      box-shadow: 0 10px 30px rgba(255, 20, 147, 0.4);
                      transform: translateZ(10px);
                      animation: healthIconPulse 3s ease-in-out infinite 2s;
                    ">
                      <i class="fas fa-map-marker-alt" style="color: white; font-size: 1.3rem;"></i>
                    </div>
                    <div>
                      <small class="d-block fw-bold" style="color: #ff1493; font-size: 0.95rem;">Location</small>
                      <span class="text-white fw-bold" style="
                        font-size: 1.15rem;
                        text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
                      ">Forbesganj, Bihar, India</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Social Media & Quick Links -->
          <div class="col-lg-4 mb-4">
            <div class="social-section" style="
              background: rgba(255, 255, 255, 0.05);
              padding: 2rem;
              border-radius: 20px;
              backdrop-filter: blur(15px);
              border: 1px solid rgba(138, 43, 226, 0.4);
              transform: translateZ(20px);
              transition: all 0.3s ease;
              box-shadow: 0 15px 40px rgba(138, 43, 226, 0.2);
            " class="social-card">
              <h6 class="fw-bold mb-4" style="
                color: #8a2be2;
                font-size: 1.4rem;
                text-shadow: 0 0 20px rgba(138, 43, 226, 0.8);
              ">Connect With Us</h6>
              <div class="social-links mb-4 d-flex justify-content-center">
                <a href="https://www.linkedin.com/in/gourav-java-dev" target="_blank" class="social-icon-3d me-3" style="
                  width: 60px;
                  height: 60px;
                  background: linear-gradient(45deg, #0077b5, #00a0dc);
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  text-decoration: none;
                  transition: all 0.4s ease;
                  transform: translateZ(15px);
                  box-shadow: 0 10px 30px rgba(0, 119, 181, 0.4);
                  animation: socialFloat 4s ease-in-out infinite;
                ">
                  <i class="fab fa-linkedin-in" style="font-size: 1.5rem;"></i>
                </a>
                <a href="https://github.com/Gourav3308" target="_blank" class="social-icon-3d me-3" style="
                  width: 60px;
                  height: 60px;
                  background: linear-gradient(45deg, #333, #666);
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  text-decoration: none;
                  transition: all 0.4s ease;
                  transform: translateZ(15px);
                  box-shadow: 0 10px 30px rgba(51, 51, 51, 0.4);
                  animation: socialFloat 4s ease-in-out infinite 1s;
                ">
                  <i class="fab fa-github" style="font-size: 1.5rem;"></i>
                </a>
                <a href="https://wa.me/917903840357" target="_blank" class="social-icon-3d" style="
                  width: 60px;
                  height: 60px;
                  background: linear-gradient(45deg, #25d366, #20c653);
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  text-decoration: none;
                  transition: all 0.4s ease;
                  transform: translateZ(15px);
                  box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4);
                  animation: socialFloat 4s ease-in-out infinite 2s;
                ">
                  <i class="fab fa-whatsapp" style="font-size: 1.5rem;"></i>
                </a>
              </div>
              
              <h6 class="fw-bold mb-3" style="
                color: #8a2be2;
                font-size: 1.3rem;
                text-shadow: 0 0 15px rgba(138, 43, 226, 0.8);
              ">Quick Links</h6>
              <div class="quick-links">
                <div class="link-item mb-2" style="
                  background: rgba(0, 255, 127, 0.12);
                  padding: 0.6rem 1.2rem;
                  border-radius: 12px;
                  border-left: 3px solid #00ff7f;
                  transition: all 0.3s ease;
                  box-shadow: 0 3px 10px rgba(0, 255, 127, 0.1);
                " class="link-hover">
                  <a routerLink="/info/legal/privacy-policy" class="text-white text-decoration-none fw-semibold">Privacy Policy</a>
                </div>
                <div class="link-item mb-2" style="
                  background: rgba(30, 144, 255, 0.12);
                  padding: 0.6rem 1.2rem;
                  border-radius: 12px;
                  border-left: 3px solid #1e90ff;
                  transition: all 0.3s ease;
                  box-shadow: 0 3px 10px rgba(30, 144, 255, 0.1);
                " class="link-hover">
                  <a routerLink="/info/legal/terms-of-service" class="text-white text-decoration-none fw-semibold">Terms of Service</a>
                </div>
                <div class="link-item mb-2" style="
                  background: rgba(255, 20, 147, 0.12);
                  padding: 0.6rem 1.2rem;
                  border-radius: 12px;
                  border-left: 3px solid #ff1493;
                  transition: all 0.3s ease;
                  box-shadow: 0 3px 10px rgba(255, 20, 147, 0.1);
                " class="link-hover">
                  <a routerLink="/info/support/faq" class="text-white text-decoration-none fw-semibold">FAQ</a>
                </div>
                <div class="link-item mb-2" style="
                  background: rgba(138, 43, 226, 0.12);
                  padding: 0.6rem 1.2rem;
                  border-radius: 12px;
                  border-left: 3px solid #8a2be2;
                  transition: all 0.3s ease;
                  box-shadow: 0 3px 10px rgba(138, 43, 226, 0.1);
                " class="link-hover">
                  <a routerLink="/info/support/contact" class="text-white text-decoration-none fw-semibold">Support</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Health 3D Bottom Bar -->
        <div class="bottom-bar" style="
          background: rgba(255, 255, 255, 0.05);
          margin: 3rem -2rem -2rem -2rem;
          padding: 2.2rem;
          border-top: 1px solid rgba(0, 255, 127, 0.4);
          border-radius: 20px 20px 0 0;
          backdrop-filter: blur(20px);
          transform: translateZ(10px);
          box-shadow: 0 -5px 25px rgba(0, 255, 127, 0.15);
        ">
          <div class="row align-items-center">
            <div class="col-md-6">
              <p class="mb-0" style="
                color: #00ff7f;
                font-weight: 600;
                text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
                font-size: 1.05rem;
              ">
                &copy; 2025 Healthbridge. All rights reserved. | Developed with 
                <span style="
                  color: #ff1493;
                  animation: healthHeartbeat 1.5s ease-in-out infinite;
                  display: inline-block;
                ">❤️</span> 
                by <span style="color: #1e90ff; font-weight: 700;">Gourav Kumar</span>
              </p>
            </div>
            <div class="col-md-6 text-md-end">
              <div style="
                display: inline-block;
                background: linear-gradient(45deg, rgba(0, 255, 127, 0.2), rgba(30, 144, 255, 0.2));
                padding: 0.6rem 1.2rem;
                border-radius: 15px;
                border: 1px solid rgba(0, 255, 127, 0.4);
                box-shadow: 0 5px 15px rgba(0, 255, 127, 0.1);
              ">
                <small style="
                  color: white;
                  font-weight: 600;
                  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
                ">
                  Made in India <span style="animation: flagWave 2s ease-in-out infinite;">🇮🇳</span> | Version 1.0.0
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    /* Health-themed 3D Animations */
    @keyframes footerGradientFlow {
      0%, 100% { background-position: 0% 50%; }
      25% { background-position: 100% 25%; }
      50% { background-position: 50% 100%; }
      75% { background-position: 25% 0%; }
    }
    
    @keyframes healthBackgroundPulse {
      0%, 100% { opacity: 0.4; transform: scale(1); filter: hue-rotate(0deg); }
      50% { opacity: 0.7; transform: scale(1.03); filter: hue-rotate(30deg); }
    }
    
    @keyframes healthFloat1 {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      25% { transform: translateY(-22px) translateX(12px); }
      50% { transform: translateY(-12px) translateX(-8px); }
      75% { transform: translateY(-18px) translateX(18px); }
    }
    
    @keyframes healthFloat2 {
      0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
      33% { transform: translateY(-18px) translateX(-12px) rotate(120deg); }
      66% { transform: translateY(-28px) translateX(10px) rotate(240deg); }
    }
    
    @keyframes healthFloat3 {
      0%, 100% { transform: translateY(0px) scale(1); }
      50% { transform: translateY(-22px) scale(1.3); }
    }
    
    @keyframes healthGridMove {
      0% { transform: translateX(0) translateY(0); }
      100% { transform: translateX(60px) translateY(60px); }
    }
    
    @keyframes healthHeartbeat {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.4); }
    }
    
    @keyframes healthIconPulse {
      0%, 100% { transform: translateZ(10px) scale(1); box-shadow: 0 10px 30px rgba(0, 255, 127, 0.4); }
      50% { transform: translateZ(22px) scale(1.15); box-shadow: 0 18px 50px rgba(0, 255, 127, 0.6); }
    }
    
    @keyframes awardGlow {
      0%, 100% { filter: drop-shadow(0 0 8px rgba(0, 255, 127, 0.6)); }
      50% { filter: drop-shadow(0 0 18px rgba(0, 255, 127, 0.9)) brightness(1.2); }
    }
    
    @keyframes socialFloat {
      0%, 100% { transform: translateZ(15px) translateY(0px); }
      50% { transform: translateZ(25px) translateY(-10px); }
    }
    
    @keyframes flagWave {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-10deg); }
      75% { transform: rotate(10deg); }
    }
    
    /* Health Hover Effects */
    .brand-card:hover {
      transform: translateZ(35px) rotateX(8deg);
      box-shadow: 0 25px 60px rgba(0, 255, 127, 0.3);
      border-color: rgba(0, 255, 127, 0.7);
    }
    
    .contact-card:hover {
      transform: translateZ(35px) rotateY(8deg);
      box-shadow: 0 25px 60px rgba(30, 144, 255, 0.3);
      border-color: rgba(30, 144, 255, 0.7);
    }
    
    .social-card:hover {
      transform: translateZ(35px) rotateX(-8deg);
      box-shadow: 0 25px 60px rgba(138, 43, 226, 0.3);
      border-color: rgba(138, 43, 226, 0.7);
    }
    
    .contact-hover:hover {
      transform: translateX(12px) scale(1.02);
      background: rgba(0, 255, 127, 0.2) !important;
      border-left-width: 6px;
      box-shadow: 0 8px 25px rgba(0, 255, 127, 0.2);
    }
    
    .link-hover:hover {
      transform: translateX(12px) scale(1.05);
      box-shadow: 0 8px 20px rgba(0, 255, 127, 0.2);
      background: rgba(0, 255, 127, 0.15) !important;
    }
    
    .social-icon-3d:hover {
      transform: translateZ(30px) scale(1.3) rotateY(360deg);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    }
    
    .contact-link:hover {
      color: #00ff7f !important;
      text-shadow: 0 0 15px rgba(0, 255, 127, 0.9);
    }
    
    /* Responsive 3D Effects */
    @media (max-width: 768px) {
      .brand-card, .contact-card, .social-card {
        transform: none !important;
      }
      
      .brand-card:hover, .contact-card:hover, .social-card:hover {
        transform: translateY(-5px) !important;
      }
    }
  `]
})
export class FooterComponent {}
