package com.healthbridge.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthbridge.dto.AppointmentRequest;
import com.healthbridge.entity.Appointment;
import com.healthbridge.entity.AppointmentStatus;
import com.healthbridge.service.AppointmentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = {"http://localhost:4200", "https://healthbridge-frontend-jj1.onrender.com"})
public class AppointmentController {
    
    @Autowired
    private AppointmentService appointmentService;
    
    @PostMapping("/book")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<String> bookAppointment(@Valid @RequestBody AppointmentRequest request) {
        try {
            Appointment appointment = appointmentService.bookAppointment(request);
            return ResponseEntity.ok("🎉 Appointment booked successfully! Your appointment is under review. You will be notified via your registered email once the doctor approves your booking. Thank you for choosing HealthBridge! Appointment ID: " + appointment.getId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to book appointment: " + e.getMessage());
        }
    }
    
    @GetMapping("/patient")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<List<Appointment>> getPatientAppointments() {
        List<Appointment> appointments = appointmentService.getPatientAppointments();
        return ResponseEntity.ok(appointments);
    }
    
    @GetMapping("/patient/upcoming")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<List<Appointment>> getUpcomingPatientAppointments() {
        List<Appointment> appointments = appointmentService.getUpcomingPatientAppointments();
        return ResponseEntity.ok(appointments);
    }
    
    @GetMapping("/doctor")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<List<Appointment>> getDoctorAppointments() {
        List<Appointment> appointments = appointmentService.getDoctorAppointments();
        return ResponseEntity.ok(appointments);
    }
    
    @GetMapping("/doctor/upcoming")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<List<Appointment>> getUpcomingDoctorAppointments() {
        List<Appointment> appointments = appointmentService.getUpcomingDoctorAppointments();
        return ResponseEntity.ok(appointments);
    }
    
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('PATIENT')")
    public ResponseEntity<?> updateAppointmentStatus(
            @PathVariable Long id, 
            @RequestParam AppointmentStatus status) {
        try {
            System.out.println("=== APPOINTMENT STATUS UPDATE DEBUG ===");
            System.out.println("Appointment ID: " + id);
            System.out.println("New Status: " + status);
            
            Appointment appointment = appointmentService.updateAppointmentStatus(id, status);
            
            System.out.println("✅ Appointment status updated successfully");
            System.out.println("Patient Email: " + appointment.getPatientEmail());
            System.out.println("Doctor Name: " + appointment.getDoctor().getFirstName() + " " + appointment.getDoctor().getLastName());
            
            // Return success response with appointment details
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("appointment", appointment);
            response.put("message", "Appointment status updated successfully");
            
            if (status == AppointmentStatus.CONFIRMED) {
                response.put("emailMessage", "Confirmation email sent to patient");
            } else if (status == AppointmentStatus.CANCELLED) {
                response.put("emailMessage", "Cancellation notification sent to patient");
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("❌ Error updating appointment status: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Failed to update appointment status: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    @PostMapping("/{id}/cancel")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<?> cancelAppointment(
            @PathVariable Long id, 
            @RequestBody Map<String, String> request) {
        try {
            System.out.println("=== APPOINTMENT CANCELLATION DEBUG ===");
            System.out.println("Received request for appointment ID: " + id);
            System.out.println("Request body: " + request);
            
            String cancellationReason = request.get("cancellationReason");
            if (cancellationReason == null || cancellationReason.trim().isEmpty()) {
                System.out.println("❌ Cancellation reason is missing or empty");
                return ResponseEntity.badRequest().body("Cancellation reason is required");
            }
            
            System.out.println("Appointment ID: " + id);
            System.out.println("Cancellation Reason: " + cancellationReason);
            
            Appointment appointment = appointmentService.cancelAppointmentWithReason(id, cancellationReason);
            
            System.out.println("✅ Appointment cancelled successfully with reason");
            
            // Return success response with appointment details
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("appointment", appointment);
            response.put("message", "Appointment cancelled successfully");
            response.put("cancellationReason", cancellationReason);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("❌ Error cancelling appointment: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Failed to cancel appointment: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
