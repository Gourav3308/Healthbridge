package com.healthbridge.controller;

import java.util.List;

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
@CrossOrigin(origins = "http://localhost:4200")
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
    public ResponseEntity<Appointment> updateAppointmentStatus(
            @PathVariable Long id, 
            @RequestParam AppointmentStatus status) {
        try {
            Appointment appointment = appointmentService.updateAppointmentStatus(id, status);
            return ResponseEntity.ok(appointment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
