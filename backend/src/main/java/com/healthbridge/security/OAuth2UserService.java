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
        OAuth2User oauth2User = super.loadUser(userRequest);
        
        try {
            return processOAuth2User(userRequest, oauth2User);
        } catch (Exception ex) {
            throw new OAuth2AuthenticationException("OAuth2 authentication failed: " + ex.getMessage());
        }
    }
    
    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oauth2User) {
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        Map<String, Object> attributes = oauth2User.getAttributes();
        
        OAuth2UserInfo userInfo;
        if ("google".equals(registrationId)) {
            userInfo = new GoogleOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationException("Unsupported OAuth2 provider: " + registrationId);
        }
        
        // Check if user exists by Google ID
        Optional<Patient> existingPatient = patientRepository.findByGoogleId(userInfo.getId());
        Patient patient;
        
        if (existingPatient.isPresent()) {
            patient = existingPatient.get();
            // Update user info if needed
            patient = updateExistingUser(patient, userInfo);
        } else {
            // Check if user exists by email
            Optional<Patient> patientByEmail = patientRepository.findByEmail(userInfo.getEmail());
            if (patientByEmail.isPresent()) {
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
            } else {
                // Create new user
                patient = createNewUser(userInfo);
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
