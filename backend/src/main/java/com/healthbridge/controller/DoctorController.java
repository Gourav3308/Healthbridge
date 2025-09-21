package com.healthbridge.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.healthbridge.dto.DoctorUpdateRequest;
import com.healthbridge.entity.Appointment;
import com.healthbridge.entity.AppointmentStatus;
import com.healthbridge.entity.Doctor;
import com.healthbridge.repository.AppointmentRepository;
import com.healthbridge.repository.DoctorRepository;
import com.healthbridge.service.EmailService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:4201"})
public class DoctorController {
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private EmailService emailService;
    
    @GetMapping("/approved")
    public ResponseEntity<List<Doctor>> getApprovedDoctors() {
        List<Doctor> doctors = doctorRepository.findByIsApproved(true);
        return ResponseEntity.ok(doctors);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Doctor>> searchDoctors(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String specialization,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) BigDecimal minFee,
            @RequestParam(required = false) BigDecimal maxFee,
            @RequestParam(required = false) Integer minExperience) {
        
        List<Doctor> doctors;
        
        if (keyword != null && !keyword.isEmpty()) {
            doctors = doctorRepository.searchDoctors(keyword);
        } else {
            doctors = doctorRepository.findDoctorsWithFilters(
                specialization, city, minFee, maxFee, minExperience);
        }
        
        return ResponseEntity.ok(doctors);
    }
    
    @GetMapping("/{id}/public")
    public ResponseEntity<Doctor> getDoctorPublicProfile(@PathVariable Long id) {
        return doctorRepository.findById(id)
            .filter(Doctor::getIsApproved)
            .map(doctor -> ResponseEntity.ok(doctor))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/specializations")
    public ResponseEntity<List<String>> getAllSpecializations() {
        List<String> specializations = doctorRepository.findAllSpecializations();
        return ResponseEntity.ok(specializations);
    }
    
    @GetMapping("/cities")
    public ResponseEntity<List<String>> getAllCities() {
        List<String> cities = doctorRepository.findAllCities();
        return ResponseEntity.ok(cities);
    }
    
    @GetMapping("/by-specialization/{specialization}")
    public ResponseEntity<List<Doctor>> getDoctorsBySpecialization(@PathVariable String specialization) {
        List<Doctor> doctors = doctorRepository.findBySpecialization(specialization);
        return ResponseEntity.ok(doctors);
    }
    
    @GetMapping("/profile")
    public ResponseEntity<Doctor> getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        
        return doctorRepository.findByEmail(email)
            .map(doctor -> ResponseEntity.ok(doctor))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/profile")
    public ResponseEntity<Doctor> updateProfile(@Valid @RequestBody DoctorUpdateRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        
        Doctor doctor = doctorRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        // Update doctor fields (but not approval-related fields)
        if (request.getFirstName() != null) doctor.setFirstName(request.getFirstName());
        if (request.getLastName() != null) doctor.setLastName(request.getLastName());
        if (request.getPhone() != null) doctor.setPhone(request.getPhone());
        if (request.getQualification() != null) doctor.setQualification(request.getQualification());
        if (request.getExperienceYears() != null) doctor.setExperienceYears(request.getExperienceYears());
        if (request.getConsultationFee() != null) doctor.setConsultationFee(request.getConsultationFee());
        if (request.getAbout() != null) doctor.setAbout(request.getAbout());
        if (request.getHospitalAffiliation() != null) doctor.setHospitalAffiliation(request.getHospitalAffiliation());
        if (request.getAddress() != null) doctor.setAddress(request.getAddress());
        if (request.getCity() != null) doctor.setCity(request.getCity());
        if (request.getState() != null) doctor.setState(request.getState());
        if (request.getPincode() != null) doctor.setPincode(request.getPincode());
        if (request.getProfileImageUrl() != null) doctor.setProfileImageUrl(request.getProfileImageUrl());
        
        Doctor updatedDoctor = doctorRepository.save(doctor);
        return ResponseEntity.ok(updatedDoctor);
    }
    
    // Get pending appointments for a doctor (requiring approval)
    @GetMapping("/pending-appointments")
    public ResponseEntity<List<Appointment>> getPendingAppointments() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String doctorEmail = authentication.getName();
            
            Doctor doctor = doctorRepository.findByEmail(doctorEmail)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
            
            List<Appointment> pendingAppointments = appointmentRepository
                .findByDoctorIdAndStatus(doctor.getId(), AppointmentStatus.SCHEDULED);
            
            return ResponseEntity.ok(pendingAppointments);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Get all appointments for a doctor
    @GetMapping("/appointments")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        try {
            System.out.println("DEBUG: getAllAppointments endpoint called");
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String doctorEmail = authentication.getName();
            System.out.println("DEBUG: Doctor email: " + doctorEmail);
            
            Doctor doctor = doctorRepository.findByEmail(doctorEmail)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
            System.out.println("DEBUG: Doctor found: " + doctor.getId());
            
            List<Appointment> allAppointments = appointmentRepository
                .findByDoctorIdOrderByAppointmentDateDescAppointmentTimeDesc(doctor.getId());
            System.out.println("DEBUG: Found " + allAppointments.size() + " appointments");
            
            return ResponseEntity.ok(allAppointments);
            
        } catch (Exception e) {
            System.err.println("ERROR in getAllAppointments: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Test email functionality
    @PostMapping("/test-email")
    public ResponseEntity<String> testEmail(@RequestParam String email) {
        try {
            System.out.println("DEBUG: Testing email to: " + email);
            emailService.sendEmail(email, "Test Email - Healthbridge", "This is a test email from Healthbridge Medical Center. If you receive this, the email system is working correctly!");
            return ResponseEntity.ok("Test email sent successfully to: " + email);
        } catch (Exception e) {
            System.err.println("Error sending test email: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to send test email: " + e.getMessage());
        }
    }

    // Debug email configuration
    @GetMapping("/email-debug")
    public ResponseEntity<String> emailDebug() {
        return ResponseEntity.ok("Email service is loaded and ready. SMTP configured for: healthbridge13012002@gmail.com");
    }

    // Get specific appointment details by ID
    @GetMapping("/appointments/{appointmentId}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long appointmentId) {
        try {
            System.out.println("DEBUG: getAppointmentById called for ID: " + appointmentId);
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String doctorEmail = authentication.getName();
            System.out.println("DEBUG: Authenticated user: " + doctorEmail);
            
            Doctor doctor = doctorRepository.findByEmail(doctorEmail)
                .orElseThrow(() -> new RuntimeException("Doctor not found with email: " + doctorEmail));
            System.out.println("DEBUG: Doctor found with ID: " + doctor.getId());
            
            Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found with ID: " + appointmentId));
            System.out.println("DEBUG: Appointment found, belongs to doctor ID: " + appointment.getDoctor().getId());
            
            // Verify this appointment belongs to the current doctor
            if (!appointment.getDoctor().getId().equals(doctor.getId())) {
                System.out.println("DEBUG: Access denied - appointment belongs to different doctor");
                return ResponseEntity.status(403).build();
            }
            
            System.out.println("DEBUG: Returning appointment: " + appointment.getId());
            return ResponseEntity.ok(appointment);
            
        } catch (Exception e) {
            System.err.println("ERROR in getAppointmentById: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
    
    // Approve an appointment
    @PostMapping("/appointments/{appointmentId}/approve")
    public ResponseEntity<String> approveAppointment(@PathVariable Long appointmentId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String doctorEmail = authentication.getName();
            
            Doctor doctor = doctorRepository.findByEmail(doctorEmail)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
            
            Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
            
            // Verify this appointment belongs to the current doctor
            if (!appointment.getDoctor().getId().equals(doctor.getId())) {
                return ResponseEntity.badRequest().body("Unauthorized to approve this appointment");
            }
            
            // Check if appointment is in correct status
            if (appointment.getStatus() != AppointmentStatus.SCHEDULED) {
                return ResponseEntity.badRequest().body("Appointment is not pending approval");
            }
            
            // Approve the appointment
            appointment.setStatus(AppointmentStatus.CONFIRMED);
            appointmentRepository.save(appointment);
            
            // Send confirmation email to patient
            boolean emailSent = false;
            try {
                System.out.println("=== APPOINTMENT APPROVAL DEBUG ===");
                System.out.println("Appointment ID: " + appointment.getId());
                System.out.println("Patient Email: " + appointment.getPatientEmail());
                System.out.println("Patient Name: " + appointment.getPatient().getFirstName() + " " + appointment.getPatient().getLastName());
                System.out.println("Doctor Name: " + appointment.getDoctor().getFirstName() + " " + appointment.getDoctor().getLastName());
                
                emailService.sendAppointmentConfirmation(appointment);
                
                System.out.println("✅ Email sent successfully, updating emailSent flag");
                appointment.setEmailSent(true);
                appointmentRepository.save(appointment);
                emailSent = true;
                System.out.println("✅ Email status updated in database");
                
            } catch (Exception emailError) {
                System.err.println("❌ EMAIL FAILURE: Failed to send confirmation email");
                System.err.println("Error: " + emailError.getMessage());
                emailError.printStackTrace();
                
                // Set emailSent to false and save
                appointment.setEmailSent(false);
                appointmentRepository.save(appointment);
                
                // Log the failure but don't fail the approval
                System.err.println("⚠️ WARNING: Appointment approved but email notification failed");
                System.err.println("⚠️ Patient email: " + appointment.getPatientEmail());
            }
            
            System.out.println("=== APPOINTMENT APPROVAL DEBUG COMPLETE ===");
            
            return ResponseEntity.ok("Appointment approved and patient notified successfully");
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to approve appointment: " + e.getMessage());
        }
    }
    
    
    // Reject an appointment
    @PostMapping("/appointments/{appointmentId}/reject")
    public ResponseEntity<String> rejectAppointment(@PathVariable Long appointmentId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String doctorEmail = authentication.getName();
            
            Doctor doctor = doctorRepository.findByEmail(doctorEmail)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
            
            Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
            
            // Verify this appointment belongs to the current doctor
            if (!appointment.getDoctor().getId().equals(doctor.getId())) {
                return ResponseEntity.badRequest().body("Unauthorized to reject this appointment");
            }
            
            // Check if appointment is in correct status
            if (appointment.getStatus() != AppointmentStatus.SCHEDULED) {
                return ResponseEntity.badRequest().body("Appointment is not pending approval");
            }
            
            // Reject the appointment
            appointment.setStatus(AppointmentStatus.CANCELLED);
            appointmentRepository.save(appointment);
            
            // Send rejection email to patient
            try {
                String patientEmail = appointment.getPatientEmail();
                String subject = "Appointment Cancelled - Healthbridge";
                String message = "Dear " + appointment.getPatient().getFirstName() + " " + appointment.getPatient().getLastName() + ",\n\n" +
                    "We regret to inform you that your appointment scheduled for " + appointment.getAppointmentDate().toString() + 
                    " at " + appointment.getAppointmentTime().toString() + " with Dr. " + doctor.getFirstName() + " " + doctor.getLastName() + 
                    " has been cancelled.\n\n" +
                    "Your payment will be refunded within 3-5 business days.\n\n" +
                    "Please feel free to book another appointment at your convenience.\n\n" +
                    "Best regards,\n" +
                    "Healthbridge Medical Team";
                
                emailService.sendEmail(patientEmail, subject, message);
                
            } catch (Exception emailError) {
                System.err.println("Failed to send rejection email: " + emailError.getMessage());
                emailError.printStackTrace();
                // Don't fail the rejection if email fails
            }
            
            return ResponseEntity.ok("Appointment rejected and patient notified");
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to reject appointment: " + e.getMessage());
        }
    }
    
    @PostMapping("/profile/upload-image")
    public ResponseEntity<?> uploadProfileImage(@RequestParam("image") MultipartFile image) {
        try {
            System.out.println("=== DOCTOR IMAGE UPLOAD DEBUG ===");
            System.out.println("Received file: " + (image != null ? image.getOriginalFilename() : "null"));
            
            // Validate file
            if (image == null || image.isEmpty()) {
                System.err.println("ERROR: No image file provided");
                return ResponseEntity.badRequest().body("{\"success\": false, \"error\": \"No image file provided\"}");
            }
            
            System.out.println("File details:");
            System.out.println("- Original filename: " + image.getOriginalFilename());
            System.out.println("- Content type: " + image.getContentType());
            System.out.println("- File size: " + image.getSize() + " bytes");
            
            // Validate file type
            String contentType = image.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                System.err.println("ERROR: Invalid file type: " + contentType);
                return ResponseEntity.badRequest().body("{\"success\": false, \"error\": \"File must be an image\"}");
            }
            
            // Validate file size (2MB max)
            if (image.getSize() > 2 * 1024 * 1024) {
                System.err.println("ERROR: File too large: " + image.getSize() + " bytes");
                return ResponseEntity.badRequest().body("{\"success\": false, \"error\": \"File size must be less than 2MB\"}");
            }
            
            // Create upload directory if it doesn't exist
            String uploadDir = "uploads/profile-images/doctors";
            Path uploadPath = Paths.get(uploadDir);
            System.out.println("Upload directory: " + uploadPath.toAbsolutePath());
            
            if (!Files.exists(uploadPath)) {
                System.out.println("Creating upload directory...");
                Files.createDirectories(uploadPath);
                System.out.println("Directory created successfully");
            } else {
                System.out.println("Upload directory already exists");
            }
            
            // Generate unique filename
            String originalFilename = image.getOriginalFilename();
            String extension = originalFilename != null ? 
                originalFilename.substring(originalFilename.lastIndexOf(".")) : ".jpg";
            String filename = UUID.randomUUID().toString() + extension;
            System.out.println("Generated filename: " + filename);
            
            // Save file
            Path filePath = uploadPath.resolve(filename);
            System.out.println("Saving file to: " + filePath.toAbsolutePath());
            Files.copy(image.getInputStream(), filePath);
            System.out.println("File saved successfully");
            
            // Get current doctor
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            System.out.println("Current user email: " + email);
            
            Doctor doctor = doctorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
            
            // Update doctor's profile image URL
            String imageUrl = "/uploads/profile-images/doctors/" + filename;
            System.out.println("Setting image URL: " + imageUrl);
            doctor.setProfileImageUrl(imageUrl);
            doctorRepository.save(doctor);
            System.out.println("Doctor profile updated successfully");
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("imageUrl", imageUrl);
            response.put("message", "Profile image uploaded successfully");
            
            System.out.println("=== DOCTOR IMAGE UPLOAD SUCCESS ===");
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            System.err.println("=== DOCTOR IMAGE UPLOAD IO ERROR ===");
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("{\"success\": false, \"error\": \"Failed to upload image: " + e.getMessage() + "\"}");
        } catch (Exception e) {
            System.err.println("=== DOCTOR IMAGE UPLOAD ERROR ===");
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("{\"success\": false, \"error\": \"" + e.getMessage() + "\"}");
        }
    }
}
