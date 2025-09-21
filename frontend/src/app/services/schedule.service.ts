import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentSlot, DoctorSchedule } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = 'http://10.45.254.162:8081/api/doctor-schedule';

  constructor(private http: HttpClient) {}

  // Get available dates for a doctor
  getAvailableDates(doctorId: number): Observable<{
    doctorId: number;
    availableDates: string[];
    totalDates: number;
  }> {
    return this.http.get<{
      doctorId: number;
      availableDates: string[];
      totalDates: number;
    }>(`${this.apiUrl}/doctor/${doctorId}/available-dates`);
  }

  // Get available time slots for a doctor on a specific date
  getAvailableSlots(doctorId: number, date: string): Observable<{
    doctorId: number;
    date: string;
    availableSlots: AppointmentSlot[];
    totalSlots: number;
  }> {
    return this.http.get<{
      doctorId: number;
      date: string;
      availableSlots: AppointmentSlot[];
      totalSlots: number;
    }>(`${this.apiUrl}/doctor/${doctorId}/available-slots?date=${date}`);
  }

  // Get doctor's schedule summary
  getScheduleSummary(doctorId: number, startDate?: string, endDate?: string): Observable<{
    doctorId: number;
    dateRange: { start: string; end: string };
    schedules: DoctorSchedule[];
    totalSchedules: number;
    totalAvailableSlots: number;
  }> {
    let url = `${this.apiUrl}/doctor/${doctorId}/schedule-summary`;
    const params = new URLSearchParams();
    
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    return this.http.get<{
      doctorId: number;
      dateRange: { start: string; end: string };
      schedules: DoctorSchedule[];
      totalSchedules: number;
      totalAvailableSlots: number;
    }>(url);
  }

  // Initialize default schedule for a doctor (for testing)
  initializeDefaultSchedule(doctorId: number): Observable<{
    success: boolean;
    message: string;
    scheduleCreated: string;
  }> {
    return this.http.post<{
      success: boolean;
      message: string;
      scheduleCreated: string;
    }>(`${this.apiUrl}/doctor/${doctorId}/initialize-schedule`, {});
  }

  // Utility methods
  formatTimeSlot(slotTime: string, endTime: string): string {
    const start = this.formatTime(slotTime);
    const end = this.formatTime(endTime);
    return `${start} - ${end}`;
  }

  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  isDateToday(dateString: string): boolean {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isDateTomorrow(dateString: string): boolean {
    const date = new Date(dateString);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return date.toDateString() === tomorrow.toDateString();
  }

  getRelativeDate(dateString: string): string {
    if (this.isDateToday(dateString)) return 'Today';
    if (this.isDateTomorrow(dateString)) return 'Tomorrow';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }
}
