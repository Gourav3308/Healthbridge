package com.healthbridge.controller;

import java.util.List;

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
import com.healthbridge.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:4200", "https://healthbridge-frontend-jj1.onrender.com"})
// @PreAuthorize("hasRole('ADMIN')") // Temporarily disabled for testing
public class AdminController {
    
    @Autowired
    private AdminService adminService;
    
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
            Doctor approvedDoctor = adminService.approveDoctor(id);
            return ResponseEntity.ok(approvedDoctor);
        } catch (Exception e) {
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
}
