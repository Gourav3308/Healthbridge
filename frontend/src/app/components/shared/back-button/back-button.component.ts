import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="back-button-container mb-3">
      <button 
        class="btn btn-outline-secondary btn-sm back-btn" 
        (click)="goBack()"
        [title]="tooltip || 'Go back'">
        <i class="fas fa-arrow-left me-2"></i>{{ text || 'Back' }}
      </button>
    </div>
  `,
  styles: [`
    .back-btn {
      border-radius: 20px;
      padding: 0.5rem 1rem;
      font-weight: 500;
      transition: all 0.3s ease;
      border: 1px solid #dee2e6;
      background: white;
    }

    .back-btn:hover {
      background: #f8f9fa;
      border-color: #007bff;
      color: #007bff;
      transform: translateX(-2px);
      box-shadow: 0 2px 8px rgba(0, 123, 255, 0.15);
    }

    .back-btn:active {
      transform: translateX(0);
    }

    .back-btn i {
      transition: transform 0.3s ease;
    }

    .back-btn:hover i {
      transform: translateX(-2px);
    }
  `]
})
export class BackButtonComponent {
  @Input() text: string = 'Back';
  @Input() tooltip: string = 'Go back';
  @Input() route: string = '';
  @Input() useHistory: boolean = true;

  constructor(private router: Router, private location: Location) {}

  goBack(): void {
    if (this.route) {
      this.router.navigate([this.route]);
    } else if (this.useHistory) {
      this.location.back();
    } else {
      // Default fallback navigation based on common patterns
      const currentUrl = this.router.url;
      
      if (currentUrl.includes('/admin/')) {
        this.router.navigate(['/admin/dashboard']);
      } else if (currentUrl.includes('/doctor/')) {
        this.router.navigate(['/doctor/dashboard']);
      } else if (currentUrl.includes('/patient/')) {
        this.router.navigate(['/patient/dashboard']);
      } else {
        this.router.navigate(['/']);
      }
    }
  }
}
