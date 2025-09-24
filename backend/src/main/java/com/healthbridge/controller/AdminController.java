package com.healthbridge.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthbridge.dto.DoctorUpdateRequest;
import com.healthbridge.dto.PatientUpdateRequest;
import com.healthbridge.entity.Doctor;
import com.healthbridge.entity.Patient;
import com.healthbridge.repository.AppointmentSlotRepository;
import com.healthbridge.repository.DoctorRepository;
import com.healthbridge.service.AdminService;
import com.healthbridge.service.AppointmentSlotService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:4200", "https://healthbridge-frontend-jj1l.onrender.com"})
// @PreAuthorize("hasRole('ADMIN')") // Temporarily disabled for testing
public class AdminController {
    
    @Autowired
    private AdminService adminService;
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    @Autowired
    private AppointmentSlotRepository appointmentSlotRepository;
    
    @Autowired
    private AppointmentSlotService appointmentSlotService;
    
    // Health check endpoint
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "healthbridge-backend"));
    }
    
    @GetMapping("/doctors/pending")
    public ResponseEntity<List<Doctor>> getPendingDoctors() {
        List<Doctor> pendingDoctors = adminService.getPendingDoctors();
        return ResponseEntity.ok(pendingDoctors);
    }
    
    @GetMapping("/doctors/approved")
    public ResponseEntity<List<Doctor>> getApprovedDoctors() {
        List<Doctor> approvedDoctors = adminService.getApprovedDoctors();
        return ResponseEntity.ok(approvedDoctors);
    }
    
    @GetMapping("/doctors/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        try {
            Doctor doctor = adminService.getDoctorById(id);
            return ResponseEntity.ok(doctor);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/doctors/{id}/approve")
    public ResponseEntity<Doctor> approveDoctor(@PathVariable Long id) {
        try {
            System.out.println("=== ADMIN CONTROLLER DEBUG ===");
            System.out.println("Received approval request for doctor ID: " + id);
            Doctor approvedDoctor = adminService.approveDoctor(id);
            System.out.println("Doctor approval successful: " + approvedDoctor.getEmail());
            return ResponseEntity.ok(approvedDoctor);
        } catch (Exception e) {
            System.err.println("Doctor approval failed for ID " + id + ": " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/doctors/{id}/reject")
    public ResponseEntity<String> rejectDoctor(@PathVariable Long id) {
        try {
            adminService.rejectDoctor(id);
            return ResponseEntity.ok("Doctor registration rejected successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/doctors/{id}/reject")
    public ResponseEntity<Map<String, String>> rejectDoctorWithReason(@PathVariable Long id, @RequestBody Map<String, String> request) {
        try {
            System.out.println("=== ADMIN REJECTION DEBUG ===");
            System.out.println("Doctor ID: " + id);
            System.out.println("Request: " + request);
            
            String reason = request.get("reason");
            System.out.println("Reason: " + reason);
            
            if (reason == null || reason.trim().isEmpty()) {
                System.out.println("❌ No reason provided");
                return ResponseEntity.badRequest().body(Map.of("error", "Rejection reason is required"));
            }
            
            if (reason.trim().length() < 10) {
                System.out.println("❌ Reason too short");
                return ResponseEntity.badRequest().body(Map.of("error", "Rejection reason must be at least 10 characters long"));
            }
            
            System.out.println("✅ Calling adminService.rejectDoctorWithReason");
            adminService.rejectDoctorWithReason(id, reason);
            System.out.println("✅ Doctor rejected successfully");
            return ResponseEntity.ok(Map.of("message", "Doctor registration rejected successfully. The doctor has been notified via email."));
        } catch (RuntimeException e) {
            System.out.println("❌ Business logic error rejecting doctor: " + e.getMessage());
            // Handle specific business logic errors
            if (e.getMessage().contains("Doctor not found")) {
                return ResponseEntity.notFound().build();
            } else if (e.getMessage().contains("already approved")) {
                return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
            }
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            System.out.println("❌ Unexpected error rejecting doctor: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error: " + e.getMessage()));
        }
    }
    
    @GetMapping("/stats/doctors/pending")
    public ResponseEntity<Long> getPendingDoctorsCount() {
        long count = adminService.getPendingDoctorsCount();
        return ResponseEntity.ok(count);
    }
    
    @GetMapping("/stats/doctors/approved")
    public ResponseEntity<Long> getApprovedDoctorsCount() {
        long count = adminService.getApprovedDoctorsCount();
        return ResponseEntity.ok(count);
    }
    
    // Doctor Management CRUD Operations
    @GetMapping("/doctors")
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        List<Doctor> doctors = adminService.getAllDoctors();
        return ResponseEntity.ok(doctors);
    }
    
    @PutMapping("/doctors/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody DoctorUpdateRequest request) {
        try {
            Doctor updatedDoctor = adminService.updateDoctor(id, request);
            return ResponseEntity.ok(updatedDoctor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/doctors/{id}")
    public ResponseEntity<String> deleteDoctor(@PathVariable Long id) {
        try {
            adminService.deleteDoctor(id);
            return ResponseEntity.ok("Doctor deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/doctors/{id}/toggle-status")
    public ResponseEntity<Doctor> toggleDoctorStatus(@PathVariable Long id) {
        try {
            Doctor doctor = adminService.toggleDoctorStatus(id);
            return ResponseEntity.ok(doctor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Patient Management CRUD Operations
    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> patients = adminService.getAllPatients();
        return ResponseEntity.ok(patients);
    }
    
    @GetMapping("/patients/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        try {
            Patient patient = adminService.getPatientById(id);
            return ResponseEntity.ok(patient);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/patients/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody PatientUpdateRequest request) {
        try {
            Patient updatedPatient = adminService.updatePatient(id, request);
            return ResponseEntity.ok(updatedPatient);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/patients/{id}")
    public ResponseEntity<String> deletePatient(@PathVariable Long id) {
        try {
            adminService.deletePatient(id);
            return ResponseEntity.ok("Patient deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/patients/{id}/toggle-status")
    public ResponseEntity<Patient> togglePatientStatus(@PathVariable Long id) {
        try {
            Patient patient = adminService.togglePatientStatus(id);
            return ResponseEntity.ok(patient);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Statistics
    @GetMapping("/stats/patients/total")
    public ResponseEntity<Long> getTotalPatientsCount() {
        long count = adminService.getTotalPatientsCount();
        return ResponseEntity.ok(count);
    }
    
    @GetMapping("/stats/patients/active")
    public ResponseEntity<Long> getActivePatientsCount() {
        long count = adminService.getActivePatientsCount();
        return ResponseEntity.ok(count);
    }
    
    @GetMapping("/stats/doctors/total")
    public ResponseEntity<Long> getTotalDoctorsCount() {
        long count = adminService.getTotalDoctorsCount();
        return ResponseEntity.ok(count);
    }
    
    // Generate slots for all approved doctors
    @PostMapping("/generate-slots")
    public ResponseEntity<String> generateSlotsForAllDoctors() {
        try {
            adminService.generateSlotsForAllApprovedDoctors();
            return ResponseEntity.ok("Slots generated successfully for all approved doctors");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to generate slots: " + e.getMessage());
        }
    }
    
    // Test endpoint to check slot generation for a specific doctor
    @GetMapping("/test-slots/{doctorId}")
    public ResponseEntity<?> testSlotsForDoctor(@PathVariable Long doctorId) {
        try {
            // Check if doctor exists and is approved
            Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);
            if (doctorOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Doctor not found with ID: " + doctorId);
            }
            
            Doctor doctor = doctorOpt.get();
            if (!doctor.getIsApproved()) {
                return ResponseEntity.badRequest().body("Doctor is not approved: " + doctor.getEmail());
            }
            
            // Check existing slots
            long existingSlots = appointmentSlotRepository.countByDoctorIdAndIsActive(doctorId, true);
            
            // Generate slots if none exist
            if (existingSlots == 0) {
                appointmentSlotService.createDefaultScheduleForDoctor(doctorId);
                existingSlots = appointmentSlotRepository.countByDoctorIdAndIsActive(doctorId, true);
            }
            
            return ResponseEntity.ok(Map.of(
                "doctorId", doctorId,
                "doctorEmail", doctor.getEmail(),
                "isApproved", doctor.getIsApproved(),
                "existingSlots", existingSlots,
                "message", "Slot generation completed"
            ));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
