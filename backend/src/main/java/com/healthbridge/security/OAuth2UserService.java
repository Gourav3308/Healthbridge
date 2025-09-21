package com.healthbridge.security;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.healthbridge.entity.Patient;
import com.healthbridge.repository.PatientRepository;

@Service
public class OAuth2UserService extends DefaultOAuth2UserService {
    
    @Autowired
    private PatientRepository patientRepository;
    
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("=== OAUTH2 USER LOADING ===");
        System.out.println("Registration ID: " + userRequest.getClientRegistration().getRegistrationId());
        System.out.println("Client ID: " + userRequest.getClientRegistration().getClientId());
        
        OAuth2User oauth2User = super.loadUser(userRequest);
        System.out.println("OAuth2 User loaded successfully from Google");
        System.out.println("User attributes: " + oauth2User.getAttributes().keySet());
        
        try {
            OAuth2User result = processOAuth2User(userRequest, oauth2User);
            System.out.println("OAuth2 user processing completed successfully");
            return result;
        } catch (Exception ex) {
            System.err.println("❌ OAuth2 user processing failed: " + ex.getMessage());
            ex.printStackTrace();
            throw new OAuth2AuthenticationException("OAuth2 authentication failed: " + ex.getMessage());
        }
    }
    
    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oauth2User) {
        System.out.println("=== PROCESSING OAUTH2 USER ===");
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        Map<String, Object> attributes = oauth2User.getAttributes();
        System.out.println("Registration ID: " + registrationId);
        System.out.println("User attributes: " + attributes);
        
        OAuth2UserInfo userInfo;
        if ("google".equals(registrationId)) {
            userInfo = new GoogleOAuth2UserInfo(attributes);
            System.out.println("Google user info created - Email: " + userInfo.getEmail());
        } else {
            System.err.println("❌ Unsupported OAuth2 provider: " + registrationId);
            throw new OAuth2AuthenticationException("Unsupported OAuth2 provider: " + registrationId);
        }
        
        // Check if user exists by Google ID
        System.out.println("Checking for existing user with Google ID: " + userInfo.getId());
        Optional<Patient> existingPatient = patientRepository.findByGoogleId(userInfo.getId());
        Patient patient;
        
        if (existingPatient.isPresent()) {
            System.out.println("Found existing user with Google ID");
            patient = existingPatient.get();
            // Update user info if needed
            patient = updateExistingUser(patient, userInfo);
        } else {
            System.out.println("No user found with Google ID, checking by email: " + userInfo.getEmail());
            // Check if user exists by email
            Optional<Patient> patientByEmail = patientRepository.findByEmail(userInfo.getEmail());
            if (patientByEmail.isPresent()) {
                System.out.println("Found existing user with email, linking Google account");
                // Link existing account with Google
                patient = patientByEmail.get();
                patient.setGoogleId(userInfo.getId());
                patient.setAuthProvider("GOOGLE");
                // Only set Google image if user doesn't have a custom uploaded image
                if (userInfo.getImageUrl() != null && 
                    (patient.getProfileImageUrl() == null || 
                     !patient.getProfileImageUrl().startsWith("/uploads/"))) {
                    patient.setProfileImageUrl(userInfo.getImageUrl());
                }
                patient = patientRepository.save(patient);
                System.out.println("Successfully linked existing account with Google");
            } else {
                System.out.println("Creating new user from Google OAuth");
                // Create new user
                patient = createNewUser(userInfo);
                System.out.println("New user created successfully with ID: " + patient.getId());
            }
        }
        
        return new CustomOAuth2User(oauth2User.getAuthorities(), oauth2User.getAttributes(), 
                                  "email", patient.getId(), patient.getEmail(), 
                                  patient.getFirstName(), patient.getLastName(), 
                                  patient.getRole(), patient.getProfileImageUrl());
    }
    
    private Patient updateExistingUser(Patient patient, OAuth2UserInfo userInfo) {
        // Only update profile image if user doesn't have a custom uploaded image
        // Custom uploaded images start with "/uploads/"
        if (userInfo.getImageUrl() != null && 
            (patient.getProfileImageUrl() == null || 
             !patient.getProfileImageUrl().startsWith("/uploads/"))) {
            patient.setProfileImageUrl(userInfo.getImageUrl());
            return patientRepository.save(patient);
        }
        return patient;
    }
    
    private Patient createNewUser(OAuth2UserInfo userInfo) {
        Patient patient = new Patient();
        patient.setEmail(userInfo.getEmail());
        patient.setFirstName(userInfo.getFirstName());
        patient.setLastName(userInfo.getLastName());
        patient.setGoogleId(userInfo.getId());
        patient.setAuthProvider("GOOGLE");
        patient.setProfileImageUrl(userInfo.getImageUrl());
        patient.setIsActive(true);
        
        return patientRepository.save(patient);
    }
}
