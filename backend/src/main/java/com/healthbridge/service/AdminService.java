package com.healthbridge.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthbridge.dto.DoctorUpdateRequest;
import com.healthbridge.dto.PatientUpdateRequest;
import com.healthbridge.entity.Admin;
import com.healthbridge.entity.Appointment;
import com.healthbridge.entity.AppointmentStatus;
import com.healthbridge.entity.Doctor;
import com.healthbridge.entity.DoctorReview;
import com.healthbridge.entity.Patient;
import com.healthbridge.repository.AdminRepository;
import com.healthbridge.repository.AppointmentRepository;
import com.healthbridge.repository.AppointmentSlotRepository;
import com.healthbridge.repository.DoctorRepository;
import com.healthbridge.repository.DoctorReviewRepository;
import com.healthbridge.repository.DoctorScheduleRepository;
import com.healthbridge.repository.PatientRepository;
import com.healthbridge.repository.ReviewRepository;

@Service
@Transactional
public class AdminService {
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    @Autowired
    private PatientRepository patientRepository;
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private ReviewRepository reviewRepository;
    
    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private DoctorReviewRepository doctorReviewRepository;
    
    @Autowired
    private EmailService emailService;
    
    @Autowired
    private AppointmentSlotService appointmentSlotService;
    
    @Autowired
    private AppointmentSlotRepository appointmentSlotRepository;
    
    @Autowired
    private DoctorScheduleRepository doctorScheduleRepository;
    
    public List<Doctor> getPendingDoctors() {
        return doctorRepository.findByIsApproved(false);
    }
    
    public List<Doctor> getApprovedDoctors() {
        return doctorRepository.findByIsApproved(true);
    }
    
    public Doctor approveDoctor(Long doctorId) {
        System.out.println("=== ADMIN SERVICE DEBUG ===");
        System.out.println("Attempting to approve doctor with ID: " + doctorId);
        
        Doctor doctor = doctorRepository.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        System.out.println("Found doctor: " + doctor.getFirstName() + " " + doctor.getLastName() + " (" + doctor.getEmail() + ")");
        
        if (doctor.getIsApproved()) {
            throw new RuntimeException("Doctor is already approved");
        }
        
        // Get current admin user (handle case where no authentication context exists)
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String adminEmail = null;
        
        if (authentication != null && authentication.isAuthenticated() && 
            !authentication.getName().equals("anonymousUser")) {
            adminEmail = authentication.getName();
        } else {
            // For testing purposes, use default admin
            adminEmail = "adminhealth@gmail.com";
        }
        
        Admin admin = adminRepository.findByEmail(adminEmail)
            .orElseThrow(() -> new RuntimeException("Admin not found: " + adminEmail));
        
        doctor.setIsApproved(true);
        doctor.setApprovalDate(LocalDateTime.now());
        doctor.setApprovedBy(admin.getEmail()); // Store admin email as string
        
        Doctor savedDoctor = doctorRepository.save(doctor);
        System.out.println("Doctor approved successfully: " + savedDoctor.getEmail());
        
        // Send approval email notification
        try {
            System.out.println("Attempting to send approval email...");
            emailService.sendDoctorApprovalEmail(savedDoctor);
            System.out.println("✅ Approval email sent successfully to: " + savedDoctor.getEmail());
        } catch (Exception e) {
            System.err.println("❌ Failed to send approval email to doctor: " + savedDoctor.getEmail());
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            // Don't throw exception here - we don't want email failure to break the approval process
        }
        
        // Generate default schedule and appointment slots for the newly approved doctor
        // Temporarily disabled for testing
        /*
        try {
            appointmentSlotService.createDefaultScheduleForDoctor(savedDoctor.getId());
            System.out.println("Default schedule and slots created for doctor: " + savedDoctor.getEmail());
        } catch (Exception e) {
            System.err.println("Failed to create default schedule for doctor: " + savedDoctor.getEmail());
            System.err.println("Error: " + e.getMessage());
            // Don't throw exception here - we don't want slot generation failure to break the approval process
        }
        */
        System.out.println("Skipping schedule creation for testing purposes");
        
        return savedDoctor;
    }
    
    public void rejectDoctor(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        if (doctor.getIsApproved()) {
            throw new RuntimeException("Cannot reject an approved doctor");
        }
        
        // Delete doctor
        doctorRepository.delete(doctor);
    }
    
    public Doctor getDoctorById(Long doctorId) {
        return doctorRepository.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }
    
    public long getPendingDoctorsCount() {
        return doctorRepository.countPendingDoctors();
    }
    
    public long getApprovedDoctorsCount() {
        return doctorRepository.countApprovedDoctors();
    }
    
    // Doctor CRUD Operations
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }
    
    public Doctor updateDoctor(Long doctorId, DoctorUpdateRequest request) {
        Doctor doctor = doctorRepository.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        // Update doctor fields
        if (request.getFirstName() != null) doctor.setFirstName(request.getFirstName());
        if (request.getLastName() != null) doctor.setLastName(request.getLastName());
        if (request.getEmail() != null) doctor.setEmail(request.getEmail());
        if (request.getPhone() != null) doctor.setPhone(request.getPhone());
        if (request.getLicenseNumber() != null) doctor.setLicenseNumber(request.getLicenseNumber());
        if (request.getSpecialization() != null) doctor.setSpecialization(request.getSpecialization());
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
        if (request.getIsActive() != null) doctor.setIsActive(request.getIsActive());
        
        return doctorRepository.save(doctor);
    }
    
    public void deleteDoctor(Long doctorId) {
        System.out.println("DEBUG: Starting deleteDoctor for ID: " + doctorId);
        Doctor doctor = doctorRepository.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        System.out.println("DEBUG: Found doctor: " + doctor.getFirstName() + " " + doctor.getLastName());
        
        // First, handle all active reviews for this doctor to avoid foreign key constraint
        try {
            List<com.healthbridge.entity.Review> activeReviews = reviewRepository.findByDoctorIdAndIsActiveOrderByCreatedAtDesc(doctorId, true);
            System.out.println("DEBUG: Found " + activeReviews.size() + " active reviews to delete");
            for (com.healthbridge.entity.Review review : activeReviews) {
                review.setIsActive(false);
                reviewRepository.save(review);
            }
            
            // Also handle inactive reviews to be safe
            List<com.healthbridge.entity.Review> inactiveReviews = reviewRepository.findByDoctorIdAndIsActiveOrderByCreatedAtDesc(doctorId, false);
            System.out.println("DEBUG: Found " + inactiveReviews.size() + " inactive reviews to delete");
            for (com.healthbridge.entity.Review review : inactiveReviews) {
                reviewRepository.delete(review);
            }
        } catch (Exception e) {
            System.err.println("DEBUG: Error handling Review entities: " + e.getMessage());
        }
        
        // Handle DoctorReviews (different entity) for this doctor
        try {
            List<DoctorReview> doctorReviewsList = doctorReviewRepository.findByDoctorId(doctorId);
            System.out.println("DEBUG: Found " + doctorReviewsList.size() + " doctor reviews to delete");
            for (DoctorReview doctorReview : doctorReviewsList) {
                doctorReviewRepository.delete(doctorReview);
            }
        } catch (Exception e) {
            System.err.println("DEBUG: Error handling DoctorReview entities: " + e.getMessage());
        }
        
        // Cancel all scheduled and confirmed appointments for this doctor to avoid foreign key constraint
        try {
            List<Appointment> scheduledAppointments = appointmentRepository.findByDoctorIdAndStatus(doctorId, AppointmentStatus.SCHEDULED);
            List<Appointment> confirmedAppointments = appointmentRepository.findByDoctorIdAndStatus(doctorId, AppointmentStatus.CONFIRMED);
            
            System.out.println("DEBUG: Found " + scheduledAppointments.size() + " scheduled appointments to cancel");
            System.out.println("DEBUG: Found " + confirmedAppointments.size() + " confirmed appointments to cancel");
            
            for (Appointment appointment : scheduledAppointments) {
                appointment.setStatus(AppointmentStatus.CANCELLED);
                appointmentRepository.save(appointment);
                System.out.println("DEBUG: Cancelled appointment ID: " + appointment.getId());
            }
            for (Appointment appointment : confirmedAppointments) {
                appointment.setStatus(AppointmentStatus.CANCELLED);
                appointmentRepository.save(appointment);
                System.out.println("DEBUG: Cancelled appointment ID: " + appointment.getId());
            }
        } catch (Exception e) {
            System.err.println("DEBUG: Error cancelling appointments: " + e.getMessage());
            e.printStackTrace();
        }
        
        // Delete all appointment slots for this doctor to avoid foreign key constraint
        try {
            appointmentSlotRepository.deleteByDoctorId(doctorId);
            System.out.println("Deleted appointment slots for doctor ID: " + doctorId);
        } catch (Exception e) {
            System.err.println("Error deleting appointment slots for doctor " + doctorId + ": " + e.getMessage());
        }
        
        // Delete all doctor schedules for this doctor to avoid foreign key constraint
        try {
            doctorScheduleRepository.deleteByDoctorId(doctorId);
            System.out.println("Deleted doctor schedules for doctor ID: " + doctorId);
        } catch (Exception e) {
            System.err.println("Error deleting doctor schedules for doctor " + doctorId + ": " + e.getMessage());
        }
        
        // Now delete the doctor
        try {
            System.out.println("DEBUG: About to delete doctor");
            doctorRepository.delete(doctor);
            System.out.println("DEBUG: Doctor deleted successfully");
        } catch (Exception e) {
            System.err.println("DEBUG: Error deleting doctor: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to delete doctor: " + e.getMessage());
        }
    }
    
    public Doctor toggleDoctorStatus(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        doctor.setIsActive(!doctor.getIsActive());
        return doctorRepository.save(doctor);
    }
    
    // Patient CRUD Operations
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }
    
    public Patient getPatientById(Long patientId) {
        return patientRepository.findById(patientId)
            .orElseThrow(() -> new RuntimeException("Patient not found"));
    }
    
    public Patient updatePatient(Long patientId, PatientUpdateRequest request) {
        Patient patient = patientRepository.findById(patientId)
            .orElseThrow(() -> new RuntimeException("Patient not found"));
        
        // Update patient fields
        if (request.getFirstName() != null) patient.setFirstName(request.getFirstName());
        if (request.getLastName() != null) patient.setLastName(request.getLastName());
        if (request.getEmail() != null) patient.setEmail(request.getEmail());
        if (request.getPhone() != null) patient.setPhone(request.getPhone());
        if (request.getDateOfBirth() != null) patient.setDateOfBirth(request.getDateOfBirth());
        if (request.getGender() != null) patient.setGender(request.getGender());
        if (request.getAddress() != null) patient.setAddress(request.getAddress());
        if (request.getCity() != null) patient.setCity(request.getCity());
        if (request.getState() != null) patient.setState(request.getState());
        if (request.getPincode() != null) patient.setPincode(request.getPincode());
        if (request.getEmergencyContact() != null) patient.setEmergencyContact(request.getEmergencyContact());
        if (request.getBloodGroup() != null) patient.setBloodGroup(request.getBloodGroup());
        if (request.getMedicalHistory() != null) patient.setMedicalHistory(request.getMedicalHistory());
        if (request.getProfileImageUrl() != null) patient.setProfileImageUrl(request.getProfileImageUrl());
        if (request.getIsActive() != null) patient.setIsActive(request.getIsActive());
        
        return patientRepository.save(patient);
    }
    
    public void deletePatient(Long patientId) {
        System.out.println("DEBUG: Starting deletePatient for ID: " + patientId);
        
        // Updated method to handle foreign key constraints properly
        Patient patient = patientRepository.findById(patientId)
            .orElseThrow(() -> new RuntimeException("Patient not found"));
        
        System.out.println("DEBUG: Found patient: " + patient.getFirstName() + " " + patient.getLastName());
        
        // First, DELETE all reviews by this patient (not just deactivate)
        List<com.healthbridge.entity.Review> patientReviews = reviewRepository.findByPatientIdAndIsActiveOrderByCreatedAtDesc(patientId, true);
        System.out.println("DEBUG: Found " + patientReviews.size() + " active reviews to delete");
        
        for (com.healthbridge.entity.Review review : patientReviews) {
            reviewRepository.delete(review);
            System.out.println("DEBUG: Deleted review ID: " + review.getId());
        }
        
        // Also delete any inactive reviews by this patient
        List<com.healthbridge.entity.Review> inactiveReviews = reviewRepository.findByPatientIdAndIsActiveOrderByCreatedAtDesc(patientId, false);
        System.out.println("DEBUG: Found " + inactiveReviews.size() + " inactive reviews to delete");
        
        for (com.healthbridge.entity.Review review : inactiveReviews) {
            reviewRepository.delete(review);
            System.out.println("DEBUG: Deleted inactive review ID: " + review.getId());
        }
        
        // Also handle DoctorReviews (different entity) by this patient
        List<DoctorReview> doctorReviews = doctorReviewRepository.findByPatientId(patientId);
        System.out.println("DEBUG: Found " + doctorReviews.size() + " doctor reviews to delete");
        
        for (DoctorReview doctorReview : doctorReviews) {
            doctorReviewRepository.delete(doctorReview);
            System.out.println("DEBUG: Deleted doctor review ID: " + doctorReview.getId());
        }
        
        // Delete ALL appointments for this patient (not just cancel)
        List<Appointment> allAppointments = appointmentRepository.findByPatientId(patientId);
        System.out.println("DEBUG: Found " + allAppointments.size() + " appointments to delete");
        
        for (Appointment appointment : allAppointments) {
            appointmentRepository.delete(appointment);
            System.out.println("DEBUG: Deleted appointment ID: " + appointment.getId());
        }
        
        System.out.println("DEBUG: About to delete patient");
        // Now delete the patient
        patientRepository.delete(patient);
        System.out.println("DEBUG: Patient deleted successfully");
    }
    
    public Patient togglePatientStatus(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
            .orElseThrow(() -> new RuntimeException("Patient not found"));
        
        patient.setIsActive(!patient.getIsActive());
        return patientRepository.save(patient);
    }
    
    // Statistics
    public long getTotalPatientsCount() {
        return patientRepository.count();
    }
    
    public long getActivePatientsCount() {
        return patientRepository.countByIsActive(true);
    }
    
    public long getTotalDoctorsCount() {
        return doctorRepository.count();
    }
} 
