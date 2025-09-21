import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Notification, NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notifications-container" *ngIf="notifications.length > 0">
      <div class="notification-item" 
           *ngFor="let notification of notifications.slice(0, 3)"
           [class]="'notification-' + notification.type"
           [class.notification-unread]="!notification.read"
           (click)="markAsRead(notification)">
        <div class="notification-icon">
          <i class="fas fa-check-circle" *ngIf="notification.type === 'success'"></i>
          <i class="fas fa-exclamation-circle" *ngIf="notification.type === 'warning'"></i>
          <i class="fas fa-times-circle" *ngIf="notification.type === 'error'"></i>
          <i class="fas fa-info-circle" *ngIf="notification.type === 'info'"></i>
        </div>
        <div class="notification-content">
          <h6 class="notification-title">{{ notification.title }}</h6>
          <p class="notification-message">{{ notification.message }}</p>
          <small class="notification-time">{{ notification.timestamp | date:'short' }}</small>
        </div>
        <button class="notification-close" (click)="markAsRead(notification); $event.stopPropagation()">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .notifications-container {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 1050;
      max-width: 400px;
    }
    
    .notification-item {
      background: white;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      margin-bottom: 0.5rem;
      padding: 1rem;
      border-left: 4px solid;
      display: flex;
      align-items: flex-start;
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    
    .notification-item:hover {
      transform: translateX(-5px);
    }
    
    .notification-success {
      border-left-color: var(--success-color);
    }
    
    .notification-error {
      border-left-color: var(--danger-color);
    }
    
    .notification-warning {
      border-left-color: var(--warning-color);
    }
    
    .notification-info {
      border-left-color: var(--info-color);
    }
    
    .notification-unread {
      background: #f8f9fa;
    }
    
    .notification-icon {
      margin-right: 0.75rem;
      margin-top: 0.25rem;
    }
    
    .notification-success .notification-icon {
      color: var(--success-color);
    }
    
    .notification-error .notification-icon {
      color: var(--danger-color);
    }
    
    .notification-warning .notification-icon {
      color: var(--warning-color);
    }
    
    .notification-info .notification-icon {
      color: var(--info-color);
    }
    
    .notification-content {
      flex: 1;
    }
    
    .notification-title {
      margin: 0 0 0.25rem 0;
      font-size: 0.9rem;
      font-weight: 600;
    }
    
    .notification-message {
      margin: 0 0 0.25rem 0;
      font-size: 0.8rem;
      color: var(--text-secondary);
    }
    
    .notification-time {
      font-size: 0.7rem;
      color: var(--text-muted);
    }
    
    .notification-close {
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 0.25rem;
      margin-left: 0.5rem;
    }
    
    .notification-close:hover {
      color: var(--text-primary);
    }
  `]
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications.filter(n => !n.read);
    });
  }

  markAsRead(notification: Notification): void {
    this.notificationService.markAsRead(notification.id);
  }
}
