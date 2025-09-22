package com.healthbridge.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthbridge.dto.AppointmentRequest;
import com.healthbridge.entity.Appointment;
import com.healthbridge.entity.AppointmentStatus;
import com.healthbridge.entity.Doctor;
import com.healthbridge.entity.Patient;
import com.healthbridge.repository.AppointmentRepository;
import com.healthbridge.repository.DoctorRepository;
import com.healthbridge.repository.PatientRepository;
import com.healthbridge.security.CustomUserDetails;

@Service
@Transactional
public class AppointmentService {
    
    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private PatientRepository patientRepository;
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    @Autowired
    private EmailService emailService;
    
    public Appointment bookAppointment(AppointmentRequest request) {
        // Get current patient
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        
        Patient patient = patientRepository.findById(userDetails.getUserId())
            .orElseThrow(() -> new RuntimeException("Patient not found"));
        
        // Get doctor
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        if (!doctor.getIsApproved()) {
            throw new RuntimeException("Doctor is not approved yet");
        }
        
        // Check if slot is already booked
        if (appointmentRepository.findByDoctorIdAndAppointmentDateAndTime(
                request.getDoctorId(), request.getAppointmentDate(), request.getAppointmentTime()).isPresent()) {
            throw new RuntimeException("This time slot is already booked");
        }
        
        // Check if appointment date is in the future
        if (request.getAppointmentDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("Cannot book appointment for past dates");
        }
        
        // Create appointment
        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setAppointmentTime(request.getAppointmentTime());
        appointment.setReasonForVisit(request.getReasonForVisit());
        appointment.setStatus(AppointmentStatus.SCHEDULED);
        
        return appointmentRepository.save(appointment);
    }
    
    public List<Appointment> getPatientAppointments() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        
        Patient patient = patientRepository.findById(userDetails.getUserId())
            .orElseThrow(() -> new RuntimeException("Patient not found"));
        
        return appointmentRepository.findByPatientId(patient.getId());
    }
    
    public List<Appointment> getDoctorAppointments() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        
        Doctor doctor = doctorRepository.findById(userDetails.getUserId())
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        return appointmentRepository.findByDoctorId(doctor.getId());
    }
    
    public Appointment updateAppointmentStatus(Long appointmentId, AppointmentStatus status) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        // Store the previous status to check if we need to send email
        AppointmentStatus previousStatus = appointment.getStatus();
        
        appointment.setStatus(status);
        Appointment updatedAppointment = appointmentRepository.save(appointment);
        
        // Send confirmation email if status changed to CONFIRMED
        if (status == AppointmentStatus.CONFIRMED && previousStatus != AppointmentStatus.CONFIRMED) {
            try {
                System.out.println("=== APPOINTMENT CONFIRMATION DEBUG ===");
                System.out.println("Appointment ID: " + updatedAppointment.getId());
                System.out.println("Patient Email: " + updatedAppointment.getPatientEmail());
                System.out.println("Patient Name: " + updatedAppointment.getPatient().getFirstName() + " " + updatedAppointment.getPatient().getLastName());
                System.out.println("Doctor Name: " + updatedAppointment.getDoctor().getFirstName() + " " + updatedAppointment.getDoctor().getLastName());
                System.out.println("Previous Status: " + previousStatus);
                System.out.println("New Status: " + status);
                
                emailService.sendAppointmentConfirmation(updatedAppointment);
                
                System.out.println("✅ Email sent successfully, updating emailSent flag");
                updatedAppointment.setEmailSent(true);
                appointmentRepository.save(updatedAppointment);
                System.out.println("✅ Email status updated in database");
                
            } catch (Exception emailError) {
                System.err.println("❌ EMAIL FAILURE: Failed to send confirmation email");
                System.err.println("Error: " + emailError.getMessage());
                emailError.printStackTrace();
                
                // Set emailSent to false and save
                updatedAppointment.setEmailSent(false);
                appointmentRepository.save(updatedAppointment);
                
                // Log the failure but don't fail the status update
                System.err.println("⚠️ WARNING: Appointment status updated but email notification failed");
                System.err.println("⚠️ Patient email: " + updatedAppointment.getPatientEmail());
            }
            
            System.out.println("=== APPOINTMENT CONFIRMATION DEBUG COMPLETE ===");
        }
        
        // Send rejection email if status changed to CANCELLED
        if (status == AppointmentStatus.CANCELLED && previousStatus != AppointmentStatus.CANCELLED) {
            try {
                System.out.println("=== APPOINTMENT REJECTION DEBUG ===");
                System.out.println("Appointment ID: " + updatedAppointment.getId());
                System.out.println("Patient Email: " + updatedAppointment.getPatientEmail());
                System.out.println("Patient Name: " + updatedAppointment.getPatient().getFirstName() + " " + updatedAppointment.getPatient().getLastName());
                System.out.println("Doctor Name: " + updatedAppointment.getDoctor().getFirstName() + " " + updatedAppointment.getDoctor().getLastName());
                System.out.println("Previous Status: " + previousStatus);
                System.out.println("New Status: " + status);
                
                emailService.sendAppointmentRejection(updatedAppointment);
                
                System.out.println("✅ Rejection email sent successfully");
                
            } catch (Exception emailError) {
                System.err.println("❌ EMAIL FAILURE: Failed to send rejection email");
                System.err.println("Error: " + emailError.getMessage());
                emailError.printStackTrace();
                
                // Log the failure but don't fail the status update
                System.err.println("⚠️ WARNING: Appointment status updated but rejection email notification failed");
                System.err.println("⚠️ Patient email: " + updatedAppointment.getPatientEmail());
            }
            
            System.out.println("=== APPOINTMENT REJECTION DEBUG COMPLETE ===");
        }
        
        return updatedAppointment;
    }
    
    public List<Appointment> getUpcomingPatientAppointments() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        
        Patient patient = patientRepository.findById(userDetails.getUserId())
            .orElseThrow(() -> new RuntimeException("Patient not found"));
        
        return appointmentRepository.findUpcomingAppointmentsByPatient(patient.getId(), LocalDate.now());
    }
    
    public List<Appointment> getUpcomingDoctorAppointments() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        
        Doctor doctor = doctorRepository.findById(userDetails.getUserId())
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        return appointmentRepository.findUpcomingAppointmentsByDoctor(doctor.getId(), LocalDate.now());
    }
}