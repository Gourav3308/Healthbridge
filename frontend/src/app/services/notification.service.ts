import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  constructor() {
    // Load notifications from localStorage
    const saved = localStorage.getItem('healthbridge_notifications');
    if (saved) {
      try {
        const notifications = JSON.parse(saved);
        this.notificationsSubject.next(notifications);
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    }
  }

  addNotification(type: 'success' | 'error' | 'warning' | 'info', title: string, message: string): void {
    const notification: Notification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      timestamp: new Date(),
      read: false
    };

    const current = this.notificationsSubject.value;
    const updated = [notification, ...current].slice(0, 50); // Keep only last 50 notifications
    
    this.notificationsSubject.next(updated);
    this.saveToStorage(updated);
  }

  markAsRead(notificationId: string): void {
    const current = this.notificationsSubject.value;
    const updated = current.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    
    this.notificationsSubject.next(updated);
    this.saveToStorage(updated);
  }

  markAllAsRead(): void {
    const current = this.notificationsSubject.value;
    const updated = current.map(n => ({ ...n, read: true }));
    
    this.notificationsSubject.next(updated);
    this.saveToStorage(updated);
  }

  getUnreadCount(): Observable<number> {
    return new Observable(observer => {
      this.notifications$.subscribe(notifications => {
        const unreadCount = notifications.filter(n => !n.read).length;
        observer.next(unreadCount);
      });
    });
  }

  clearAll(): void {
    this.notificationsSubject.next([]);
    this.saveToStorage([]);
  }

  private saveToStorage(notifications: Notification[]): void {
    try {
      localStorage.setItem('healthbridge_notifications', JSON.stringify(notifications));
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  }

  // Helper methods for common notification types
  success(title: string, message: string): void {
    this.addNotification('success', title, message);
  }

  error(title: string, message: string): void {
    this.addNotification('error', title, message);
  }

  warning(title: string, message: string): void {
    this.addNotification('warning', title, message);
  }

  info(title: string, message: string): void {
    this.addNotification('info', title, message);
  }
}
