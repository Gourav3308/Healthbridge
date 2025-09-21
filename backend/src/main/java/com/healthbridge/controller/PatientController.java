package com.healthbridge.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.healthbridge.dto.PatientUpdateRequest;
import com.healthbridge.entity.Patient;
import com.healthbridge.repository.PatientRepository;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:4201", "http://127.0.0.1:4200", "http://127.0.0.1:4201", "http://10.45.254.162:4200", "https://healthbridge-frontend-jj1.onrender.com"})
public class PatientController {
    
    @Autowired
    private PatientRepository patientRepository;
    
    @GetMapping("/profile")
    public ResponseEntity<Patient> getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        
        return patientRepository.findByEmail(email)
            .map(patient -> ResponseEntity.ok(patient))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody PatientUpdateRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            
            Patient patient = patientRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
            
            // Update patient fields
            if (request.getFirstName() != null) patient.setFirstName(request.getFirstName());
            if (request.getLastName() != null) patient.setLastName(request.getLastName());
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
            
            Patient updatedPatient = patientRepository.save(patient);
            return ResponseEntity.ok(updatedPatient);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    @PostMapping("/profile/upload-image")
    public ResponseEntity<?> uploadProfileImage(@RequestParam("image") MultipartFile image) {
        try {
            System.out.println("=== PATIENT IMAGE UPLOAD DEBUG ===");
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
            String uploadDir = "uploads/profile-images/patients";
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
            
            // Get current patient
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            System.out.println("Current user email: " + email);
            
            Patient patient = patientRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
            
            // Update patient's profile image URL
            String imageUrl = "/uploads/profile-images/patients/" + filename;
            System.out.println("Setting image URL: " + imageUrl);
            patient.setProfileImageUrl(imageUrl);
            patientRepository.save(patient);
            System.out.println("Patient profile updated successfully");
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("imageUrl", imageUrl);
            response.put("message", "Profile image uploaded successfully");
            
            System.out.println("=== PATIENT IMAGE UPLOAD SUCCESS ===");
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            System.err.println("=== PATIENT IMAGE UPLOAD IO ERROR ===");
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("{\"success\": false, \"error\": \"Failed to upload image: " + e.getMessage() + "\"}");
        } catch (Exception e) {
            System.err.println("=== PATIENT IMAGE UPLOAD ERROR ===");
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("{\"success\": false, \"error\": \"" + e.getMessage() + "\"}");
        }
    }
}
