import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment, AppointmentBookingRequest, AppointmentRequest, PaymentOrderResponse, PaymentVerificationRequest } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://10.45.254.162:8081/api';
  private bookingApiUrl = 'http://10.45.254.162:8081/api/appointment-booking';

  constructor(private http: HttpClient) {}

  bookAppointment(appointmentData: AppointmentRequest): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/appointments/book`, appointmentData);
  }

  getPatientAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointments/patient`);
  }

  getUpcomingPatientAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointments/patient/upcoming`);
  }

  getDoctorAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointments/doctor`);
  }

  getUpcomingDoctorAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointments/doctor/upcoming`);
  }

  updateAppointmentStatus(appointmentId: number, status: string): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/appointments/${appointmentId}/status?status=${status}`, {});
  }

  // New enhanced booking methods
  createPaymentOrder(bookingRequest: AppointmentBookingRequest): Observable<PaymentOrderResponse> {
    return this.http.post<PaymentOrderResponse>(`${this.bookingApiUrl}/create-payment-order`, bookingRequest);
  }

  verifyPayment(verificationRequest: PaymentVerificationRequest): Observable<{
    success: boolean;
    appointmentId: number;
    status: string;
    paymentStatus: string;
    message: string;
  }> {
    return this.http.post<{
      success: boolean;
      appointmentId: number;
      status: string;
      paymentStatus: string;
      message: string;
    }>(`${this.bookingApiUrl}/verify-payment`, verificationRequest);
  }

  getAppointmentDetails(appointmentId: number): Observable<any> {
    return this.http.get(`${this.bookingApiUrl}/appointment/${appointmentId}`);
  }

  // Utility methods
  formatAppointmentDateTime(date: string, time: string): string {
    const appointmentDate = new Date(date + 'T' + time);
    return appointmentDate.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  getAppointmentStatusColor(status: string): string {
    switch (status) {
      case 'SCHEDULED': return 'warning';
      case 'CONFIRMED': return 'primary';
      case 'COMPLETED': return 'success';
      case 'CANCELLED': return 'danger';
      case 'NO_SHOW': return 'secondary';
      default: return 'secondary';
    }
  }

  getPaymentStatusColor(status: string): string {
    switch (status) {
      case 'PAID': return 'success';
      case 'PENDING': return 'warning';
      case 'FAILED': return 'danger';
      case 'REFUNDED': return 'info';
      default: return 'secondary';
    }
  }
}
