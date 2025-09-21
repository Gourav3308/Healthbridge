package com.healthbridge.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthbridge.entity.Appointment;
import com.healthbridge.entity.AppointmentSlot;
import com.healthbridge.entity.AppointmentStatus;
import com.healthbridge.entity.Doctor;
import com.healthbridge.entity.DoctorSchedule;
import com.healthbridge.entity.Patient;
import com.healthbridge.repository.AppointmentRepository;
import com.healthbridge.repository.AppointmentSlotRepository;
import com.healthbridge.repository.DoctorRepository;
import com.healthbridge.repository.DoctorScheduleRepository;
import com.healthbridge.repository.PatientRepository;
import com.healthbridge.service.EmailService;
import com.healthbridge.service.PaymentService;
import com.razorpay.RazorpayException;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/appointment-booking")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:4201"})
public class AppointmentBookingController {
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    @Autowired
    private PatientRepository patientRepository;
    
    @Autowired
    private DoctorScheduleRepository scheduleRepository;
    
    @Autowired
    private AppointmentSlotRepository slotRepository;
    
    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private PaymentService paymentService;
    
    @Autowired
    private EmailService emailService;
    
    // Get available slots for a doctor on a specific date
    @GetMapping("/doctor/{doctorId}/slots")
    public ResponseEntity<?> getAvailableSlots(@PathVariable Long doctorId, 
                                             @RequestParam String date) {
        try {
            LocalDate slotDate = LocalDate.parse(date);
            
            // Check if doctor exists
            Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
            
            // Get available slots
            List<AppointmentSlot> availableSlots = slotRepository.findAvailableSlots(doctorId, slotDate);
            
            Map<String, Object> response = new HashMap<>();
            response.put("doctorId", doctorId);
            response.put("doctorName", "Dr. " + doctor.getFirstName() + " " + doctor.getLastName());
            response.put("date", date);
            response.put("availableSlots", availableSlots);
            response.put("totalSlots", availableSlots.size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Failed to fetch available slots: " + e.getMessage()));
        }
    }
    
    // Get doctor's schedule for a date range
    @GetMapping("/doctor/{doctorId}/schedule")
    public ResponseEntity<?> getDoctorSchedule(@PathVariable Long doctorId,
                                             @RequestParam(required = false) String startDate,
                                             @RequestParam(required = false) String endDate) {
        try {
            LocalDate start = startDate != null ? LocalDate.parse(startDate) : LocalDate.now();
            LocalDate end = endDate != null ? LocalDate.parse(endDate) : start.plusDays(30);
            
            List<DoctorSchedule> schedules = scheduleRepository.findByDoctorIdAndDateRange(doctorId, start, end);
            
            Map<String, Object> response = new HashMap<>();
            response.put("doctorId", doctorId);
            response.put("schedules", schedules);
            response.put("dateRange", Map.of("start", start, "end", end));
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Failed to fetch doctor schedule: " + e.getMessage()));
        }
    }
    
    // Create payment order for appointment
    @PostMapping("/create-payment-order")
    public ResponseEntity<?> createPaymentOrder(@RequestBody @Valid PaymentOrderRequest request) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String email = auth.getName();
            
            Patient patient = patientRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
            
            Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
            
            // Verify slot availability
            AppointmentSlot slot = slotRepository.findById(request.getSlotId())
                .orElseThrow(() -> new RuntimeException("Appointment slot not found"));
            
            if (!slot.isAvailable()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Selected time slot is no longer available"));
            }
            
            // Create temporary appointment record
            Appointment appointment = new Appointment();
            appointment.setPatient(patient);
            appointment.setDoctor(doctor);
            appointment.setAppointmentDate(slot.getSlotDate());
            appointment.setAppointmentTime(slot.getSlotTime());
            appointment.setConsultationFee(doctor.getConsultationFee().doubleValue());
            appointment.setReasonForVisit(request.getReasonForVisit());
            appointment.setSymptoms(request.getSymptoms());
            appointment.setAppointmentType(request.getAppointmentType());
            appointment.setIsFirstVisit(request.getIsFirstVisit());
            appointment.setPatientPhone(request.getPatientPhone());
            appointment.setPatientEmail(request.getPatientEmail() != null ? request.getPatientEmail() : patient.getEmail());
            appointment.setEmergencyContact(request.getEmergencyContact());
            appointment.setMedicalHistory(request.getMedicalHistory());
            appointment.setStatus(AppointmentStatus.SCHEDULED);
            appointment.setPaymentStatus(Appointment.PaymentStatus.PENDING);
            
            Appointment savedAppointment = appointmentRepository.save(appointment);
            
            // Create Razorpay order
            Map<String, Object> paymentOrder = paymentService.createAppointmentOrder(
                savedAppointment.getId(),
                doctor.getConsultationFee().doubleValue(),
                patient.getEmail()
            );
            
            // Store order ID in appointment
            savedAppointment.setRazorpayOrderId((String) paymentOrder.get("orderId"));
            appointmentRepository.save(savedAppointment);
            
            Map<String, Object> response = new HashMap<>();
            response.put("appointmentId", savedAppointment.getId());
            response.put("paymentOrder", paymentOrder);
            response.put("doctorName", "Dr. " + doctor.getFirstName() + " " + doctor.getLastName());
            response.put("appointmentDate", slot.getSlotDate());
            response.put("appointmentTime", slot.getSlotTime());
            response.put("consultationFee", doctor.getConsultationFee());
            
            return ResponseEntity.ok(response);
            
        } catch (RazorpayException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Payment service error: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Failed to create payment order: " + e.getMessage()));
        }
    }
    
    // Verify payment and confirm appointment
    @PostMapping("/verify-payment")
    public ResponseEntity<?> verifyPayment(@RequestBody @Valid PaymentVerificationRequest request) {
        try {
            // Verify payment signature
            boolean isValidPayment = paymentService.verifyPayment(
                request.getRazorpayOrderId(),
                request.getRazorpayPaymentId(),
                request.getRazorpaySignature()
            );
            
            if (!isValidPayment) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Invalid payment signature"));
            }
            
            // Find appointment
            Appointment appointment = appointmentRepository.findByRazorpayOrderId(request.getRazorpayOrderId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
            
            // Update appointment with payment details
            appointment.setRazorpayPaymentId(request.getRazorpayPaymentId());
            appointment.setRazorpaySignature(request.getRazorpaySignature());
            appointment.setPaymentStatus(Appointment.PaymentStatus.PAID);
            appointment.setPaymentDate(LocalDateTime.now());
            // Keep as SCHEDULED - requires doctor approval to become CONFIRMED
            appointment.setStatus(AppointmentStatus.SCHEDULED);
            
            Appointment confirmedAppointment = appointmentRepository.save(appointment);
            
            // Book the slot
            AppointmentSlot slot = slotRepository.findByDoctorIdAndSlotDateAndSlotTimeAndIsActive(
                appointment.getDoctor().getId(),
                appointment.getAppointmentDate(),
                appointment.getAppointmentTime(),
                true
            ).orElse(null);
            
            if (slot != null) {
                slot.bookSlot();
                slotRepository.save(slot);
            }
            
            // Note: Confirmation email will be sent when doctor approves the appointment
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("appointmentId", confirmedAppointment.getId());
            response.put("status", confirmedAppointment.getStatus());
            response.put("paymentStatus", confirmedAppointment.getPaymentStatus());
            response.put("message", "🎉 Appointment booked successfully! Your appointment is under review. You will be notified via your registered email once the doctor approves your booking. Thank you for choosing HealthBridge!");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Payment verification failed: " + e.getMessage()));
        }
    }
    
    // Get appointment details
    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<?> getAppointmentDetails(@PathVariable Long appointmentId) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String email = auth.getName();
            
            Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
            
            // Check if the appointment belongs to the current patient
            if (!appointment.getPatient().getEmail().equals(email)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Access denied"));
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("appointmentId", appointment.getId());
            response.put("doctorName", "Dr. " + appointment.getDoctor().getFirstName() + " " + appointment.getDoctor().getLastName());
            response.put("specialization", appointment.getDoctor().getSpecialization());
            response.put("appointmentDate", appointment.getAppointmentDate());
            response.put("appointmentTime", appointment.getAppointmentTime());
            response.put("status", appointment.getStatus());
            response.put("paymentStatus", appointment.getPaymentStatus());
            response.put("consultationFee", appointment.getConsultationFee());
            response.put("reasonForVisit", appointment.getReasonForVisit());
            response.put("appointmentType", appointment.getAppointmentType());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Failed to fetch appointment details: " + e.getMessage()));
        }
    }
    
    // DTOs for request bodies
    public static class PaymentOrderRequest {
        private Long doctorId;
        private Long slotId;
        private String reasonForVisit;
        private String symptoms;
        private String appointmentType = "CONSULTATION";
        private Boolean isFirstVisit = true;
        private String patientPhone;
        private String patientEmail;
        private String emergencyContact;
        private String medicalHistory;
        
        // Getters and setters
        public Long getDoctorId() { return doctorId; }
        public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }
        
        public Long getSlotId() { return slotId; }
        public void setSlotId(Long slotId) { this.slotId = slotId; }
        
        public String getReasonForVisit() { return reasonForVisit; }
        public void setReasonForVisit(String reasonForVisit) { this.reasonForVisit = reasonForVisit; }
        
        public String getSymptoms() { return symptoms; }
        public void setSymptoms(String symptoms) { this.symptoms = symptoms; }
        
        public String getAppointmentType() { return appointmentType; }
        public void setAppointmentType(String appointmentType) { this.appointmentType = appointmentType; }
        
        public Boolean getIsFirstVisit() { return isFirstVisit; }
        public void setIsFirstVisit(Boolean isFirstVisit) { this.isFirstVisit = isFirstVisit; }
        
        public String getPatientPhone() { return patientPhone; }
        public void setPatientPhone(String patientPhone) { this.patientPhone = patientPhone; }
        
        public String getPatientEmail() { return patientEmail; }
        public void setPatientEmail(String patientEmail) { this.patientEmail = patientEmail; }
        
        public String getEmergencyContact() { return emergencyContact; }
        public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }
        
        public String getMedicalHistory() { return medicalHistory; }
        public void setMedicalHistory(String medicalHistory) { this.medicalHistory = medicalHistory; }
    }
    
    public static class PaymentVerificationRequest {
        private String razorpayOrderId;
        private String razorpayPaymentId;
        private String razorpaySignature;
        
        // Getters and setters
        public String getRazorpayOrderId() { return razorpayOrderId; }
        public void setRazorpayOrderId(String razorpayOrderId) { this.razorpayOrderId = razorpayOrderId; }
        
        public String getRazorpayPaymentId() { return razorpayPaymentId; }
        public void setRazorpayPaymentId(String razorpayPaymentId) { this.razorpayPaymentId = razorpayPaymentId; }
        
        public String getRazorpaySignature() { return razorpaySignature; }
        public void setRazorpaySignature(String razorpaySignature) { this.razorpaySignature = razorpaySignature; }
    }
}
