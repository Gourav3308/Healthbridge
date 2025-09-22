package com.healthbridge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthbridge.dto.AuthRequest;
import com.healthbridge.dto.AuthResponse;
import com.healthbridge.dto.DoctorRegistrationRequest;
import com.healthbridge.dto.PatientRegistrationRequest;
import com.healthbridge.entity.Doctor;
import com.healthbridge.entity.Patient;
import com.healthbridge.repository.AdminRepository;
import com.healthbridge.repository.DoctorRepository;
import com.healthbridge.repository.PatientRepository;
import com.healthbridge.security.CustomUserDetails;
import com.healthbridge.util.JwtUtil;

@Service
@Transactional
public class AuthService {
    
    @Autowired
    private PatientRepository patientRepository;
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private EmailService emailService;
    
    @Value("${frontend.url:https://healthbridge-frontend-jj1l.onrender.com}")
    private String frontendUrl;
    
    // Fallback frontend URL in case environment variable is not set
    private static final String FALLBACK_FRONTEND_URL = "https://healthbridge-frontend-jj1l.onrender.com";
    
    public AuthResponse authenticate(AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            
            String token = jwtUtil.generateToken(userDetails.getEmail(), userDetails.getRole(), userDetails.getUserId());
            
            return new AuthResponse(token, userDetails.getUserId(), userDetails.getEmail(), 
                                  userDetails.getFirstName(), userDetails.getLastName(), userDetails.getRole(),
                                  userDetails.getProfileImage());
                                  
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid email or password");
        }
    }
    
    public AuthResponse registerPatient(PatientRegistrationRequest request) {
        // Check if email already exists in any table
        if (patientRepository.existsByEmail(request.getEmail()) || 
            doctorRepository.existsByEmail(request.getEmail()) || 
            adminRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        // Create patient
        Patient patient = new Patient();
        patient.setEmail(request.getEmail());
        patient.setPassword(passwordEncoder.encode(request.getPassword()));
        patient.setFirstName(request.getFirstName());
        patient.setLastName(request.getLastName());
        patient.setPhone(request.getPhone());
        patient.setDateOfBirth(request.getDateOfBirth());
        patient.setGender(request.getGender());
        patient.setAddress(request.getAddress());
        patient.setCity(request.getCity());
        patient.setState(request.getState());
        patient.setPincode(request.getPincode());
        patient.setEmergencyContact(request.getEmergencyContact());
        patient.setBloodGroup(request.getBloodGroup());
        patient.setMedicalHistory(request.getMedicalHistory());
        // Only set profile image if it's not null and not empty
        if (request.getProfileImageUrl() != null && !request.getProfileImageUrl().trim().isEmpty()) {
            patient.setProfileImageUrl(request.getProfileImageUrl());
        } else {
            patient.setProfileImageUrl(null);
        }
        patient.setIsActive(true);
        
        Patient savedPatient = patientRepository.save(patient);
        
        String token = jwtUtil.generateToken(savedPatient.getEmail(), savedPatient.getRole(), savedPatient.getId());
        
        return new AuthResponse(token, savedPatient.getId(), savedPatient.getEmail(), 
                              savedPatient.getFirstName(), savedPatient.getLastName(), savedPatient.getRole(),
                              savedPatient.getProfileImageUrl());
    }
    
    public AuthResponse registerDoctor(DoctorRegistrationRequest request) {
        // Check if email already exists in any table
        if (patientRepository.existsByEmail(request.getEmail()) || 
            doctorRepository.existsByEmail(request.getEmail()) || 
            adminRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        // Check if license number already exists
        if (doctorRepository.findByLicenseNumber(request.getLicenseNumber()).isPresent()) {
            throw new RuntimeException("License number already exists");
        }
        
        // Create doctor
        Doctor doctor = new Doctor();
        doctor.setEmail(request.getEmail());
        doctor.setPassword(passwordEncoder.encode(request.getPassword()));
        doctor.setFirstName(request.getFirstName());
        doctor.setLastName(request.getLastName());
        doctor.setPhone(request.getPhone());
        doctor.setLicenseNumber(request.getLicenseNumber());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setQualification(request.getQualification());
        doctor.setExperienceYears(request.getExperienceYears());
        doctor.setConsultationFee(request.getConsultationFee());
        doctor.setAbout(request.getAbout());
        doctor.setHospitalAffiliation(request.getHospitalAffiliation());
        doctor.setAddress(request.getAddress());
        doctor.setCity(request.getCity());
        doctor.setState(request.getState());
        doctor.setPincode(request.getPincode());
        // Only set profile image if it's not null and not empty
        if (request.getProfileImageUrl() != null && !request.getProfileImageUrl().trim().isEmpty()) {
            doctor.setProfileImageUrl(request.getProfileImageUrl());
        } else {
            doctor.setProfileImageUrl(null);
        }
        doctor.setIsApproved(false); // Requires admin approval
        doctor.setIsActive(true);
        
        doctorRepository.save(doctor);
        
        return new AuthResponse("🎉 Registration submitted successfully! Your application is under review. You will be notified via your registered email once approved. Thank you for joining HealthBridge!");
    }
    
    public boolean isEmailAvailable(String email) {
        return !patientRepository.existsByEmail(email) && 
               !doctorRepository.existsByEmail(email) && 
               !adminRepository.existsByEmail(email);
    }
    
    public boolean isLicenseNumberAvailable(String licenseNumber) {
        return !doctorRepository.findByLicenseNumber(licenseNumber).isPresent();
    }
    
    // Password Reset Methods
    public void initiatePasswordReset(String email) {
        // Check if email exists in any user table
        Patient patient = patientRepository.findByEmail(email).orElse(null);
        Doctor doctor = doctorRepository.findByEmail(email).orElse(null);
        
        if (patient == null && doctor == null) {
            // Don't reveal if email doesn't exist (security best practice)
            return;
        }
        
        // Generate reset token (valid for 1 hour)
        String resetToken = jwtUtil.generatePasswordResetToken(email);
        
        // Send reset email
        // Use fallback URL if frontend URL is null or empty
        String effectiveFrontendUrl = (frontendUrl != null && !frontendUrl.trim().isEmpty()) ? frontendUrl : FALLBACK_FRONTEND_URL;
        
        // Ensure frontend URL doesn't end with slash to avoid double slashes
        String cleanFrontendUrl = effectiveFrontendUrl.endsWith("/") ? effectiveFrontendUrl.substring(0, effectiveFrontendUrl.length() - 1) : effectiveFrontendUrl;
        String resetLink = cleanFrontendUrl + "/auth/reset-password?token=" + resetToken;
        
        // Debug logging
        System.out.println("=== PASSWORD RESET URL DEBUG ===");
        System.out.println("Frontend URL from config: " + frontendUrl);
        System.out.println("Effective frontend URL: " + effectiveFrontendUrl);
        System.out.println("Clean frontend URL: " + cleanFrontendUrl);
        System.out.println("Reset token: " + resetToken);
        System.out.println("Generated reset link: " + resetLink);
        
        try {
            emailService.sendPasswordResetEmail(email, resetLink, 
                patient != null ? patient.getFirstName() + " " + patient.getLastName() : 
                doctor != null ? doctor.getFirstName() + " " + doctor.getLastName() : "User");
            
            System.out.println("Password reset email sent to: " + email);
        } catch (Exception e) {
            System.err.println("Failed to send password reset email to: " + email);
            System.err.println("Error: " + e.getMessage());
            throw new RuntimeException("Failed to send password reset email");
        }
    }
    
    public void confirmPasswordReset(String token, String newPassword) {
        try {
            System.out.println("=== CONFIRM PASSWORD RESET DEBUG ===");
            System.out.println("Token received: " + token);
            System.out.println("New password length: " + (newPassword != null ? newPassword.length() : "null"));
            
            // Validate token and extract email
            String email = jwtUtil.extractEmailFromPasswordResetToken(token);
            System.out.println("Email extracted from token: " + email);
            
            if (email == null) {
                System.out.println("❌ No email extracted from token - invalid or expired");
                throw new RuntimeException("Invalid or expired reset token");
            }
            
            // Find user and update password
            Patient patient = patientRepository.findByEmail(email).orElse(null);
            Doctor doctor = doctorRepository.findByEmail(email).orElse(null);
            
            if (patient != null) {
                patient.setPassword(passwordEncoder.encode(newPassword));
                patientRepository.save(patient);
                System.out.println("Password reset successful for patient: " + email);
            } else if (doctor != null) {
                doctor.setPassword(passwordEncoder.encode(newPassword));
                doctorRepository.save(doctor);
                System.out.println("Password reset successful for doctor: " + email);
            } else {
                throw new RuntimeException("User not found");
            }
            
        } catch (Exception e) {
            System.err.println("Password reset failed: " + e.getMessage());
            throw new RuntimeException("Invalid or expired reset token");
        }
    }
}