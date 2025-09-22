import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="not-found-container">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 text-center">
            <div class="not-found-content">
              <h1 class="error-code">404</h1>
              <h2 class="error-title">Page Not Found</h2>
              <p class="error-message">
                Sorry, the page you are looking for doesn't exist or has been moved.
              </p>
              <div class="error-actions">
                <a routerLink="/" class="btn btn-primary me-3">
                  <i class="fas fa-home me-2"></i>Go Home
                </a>
                <button class="btn btn-outline-secondary" (click)="goBack()">
                  <i class="fas fa-arrow-left me-2"></i>Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    .not-found-content {
      padding: 3rem 2rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .error-code {
      font-size: 8rem;
      font-weight: 900;
      margin-bottom: 1rem;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
      background: linear-gradient(45deg, #fff, #00ff7f, #1e90ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .error-title {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }
    
    .error-message {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }
    
    .error-actions .btn {
      padding: 0.75rem 2rem;
      border-radius: 50px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: all 0.3s ease;
    }
    
    .error-actions .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #00ff7f, #32cd32);
      border: none;
    }
    
    .btn-outline-secondary {
      border: 2px solid rgba(255, 255, 255, 0.5);
      color: white;
    }
    
    .btn-outline-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.8);
    }
    
    @media (max-width: 768px) {
      .error-code {
        font-size: 5rem;
      }
      
      .error-title {
        font-size: 2rem;
      }
      
      .error-message {
        font-size: 1rem;
      }
      
      .error-actions {
        flex-direction: column;
        gap: 1rem;
      }
      
      .error-actions .btn {
        width: 100%;
      }
    }
  `]
})
export class NotFoundComponent {
  
  goBack(): void {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  }
}
