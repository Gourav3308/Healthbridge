package com.healthbridge.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.healthbridge.entity.Admin;
import com.healthbridge.entity.Doctor;
import com.healthbridge.entity.Patient;
import com.healthbridge.repository.AdminRepository;
import com.healthbridge.repository.DoctorRepository;
import com.healthbridge.repository.PatientRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    @Autowired
    private PatientRepository patientRepository;
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Try to find in patients first
        Patient patient = patientRepository.findByEmail(email).orElse(null);
        if (patient != null) {
            // For OAuth2 users, password might be null, so provide a default
            String password = patient.getPassword() != null ? patient.getPassword() : "";
            return new CustomUserDetails(patient.getId(), patient.getEmail(), password, 
                                       patient.getFirstName(), patient.getLastName(), "PATIENT", 
                                       patient.getProfileImageUrl(), patient.getIsActive());
        }
        
        // Try to find in doctors
        Doctor doctor = doctorRepository.findByEmail(email).orElse(null);
        if (doctor != null) {
            // For OAuth2 users, password might be null, so provide a default
            String password = doctor.getPassword() != null ? doctor.getPassword() : "";
            return new CustomUserDetails(doctor.getId(), doctor.getEmail(), password, 
                                       doctor.getFirstName(), doctor.getLastName(), "DOCTOR", 
                                       doctor.getProfileImageUrl(), doctor.getIsActive() && doctor.getIsApproved());
        }
        
        // Try to find in admins
        Admin admin = adminRepository.findByEmail(email).orElse(null);
        if (admin != null) {
            return new CustomUserDetails(admin.getId(), admin.getEmail(), admin.getPassword(), 
                                       admin.getFirstName(), admin.getLastName(), "ADMIN", 
                                       null, admin.getIsActive());
        }
        
        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}