package com.healthbridge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthbridge.dto.AuthRequest;
import com.healthbridge.dto.AuthResponse;
import com.healthbridge.dto.DoctorRegistrationRequest;
import com.healthbridge.dto.PasswordResetConfirmRequest;
import com.healthbridge.dto.PasswordResetRequest;
import com.healthbridge.dto.PatientRegistrationRequest;
import com.healthbridge.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:4200", "https://healthbridge-frontend-jj1l.onrender.com"})
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        try {
            AuthResponse response = authService.authenticate(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new AuthResponse("Invalid email or password"));
        }
    }
    
    @PostMapping("/register/patient")
    public ResponseEntity<AuthResponse> registerPatient(@Valid @RequestBody PatientRegistrationRequest request) {
        try {
            AuthResponse response = authService.registerPatient(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new AuthResponse(e.getMessage()));
        }
    }
    
    @PostMapping("/register/doctor")
    public ResponseEntity<AuthResponse> registerDoctor(@Valid @RequestBody DoctorRegistrationRequest request) {
        try {
            AuthResponse response = authService.registerDoctor(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new AuthResponse(e.getMessage()));
        }
    }
    
    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmailAvailability(@RequestParam String email) {
        boolean available = authService.isEmailAvailable(email);
        return ResponseEntity.ok(available);
    }
    
    @GetMapping("/check-license")
    public ResponseEntity<Boolean> checkLicenseAvailability(@RequestParam String licenseNumber) {
        boolean available = authService.isLicenseNumberAvailable(licenseNumber);
        return ResponseEntity.ok(available);
    }
    
    @GetMapping("/google")
    public ResponseEntity<?> googleLogin() {
        // This endpoint will be handled by Spring Security OAuth2
        // Users should be redirected to: /oauth2/authorization/google
        return ResponseEntity.ok().body("{\"message\": \"Redirect to /oauth2/authorization/google\"}");
    }
    
    // Forgot Password Endpoints
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody PasswordResetRequest request) {
        try {
            authService.initiatePasswordReset(request.getEmail());
            return ResponseEntity.ok().body("{\"message\": \"Password reset link sent to your email if the account exists.\"}");
        } catch (Exception e) {
            // Always return success to prevent email enumeration
            return ResponseEntity.ok().body("{\"message\": \"Password reset link sent to your email if the account exists.\"}");
        }
    }
    
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody PasswordResetConfirmRequest request) {
        try {
            System.out.println("=== PASSWORD RESET DEBUG ===");
            System.out.println("Received reset password request");
            System.out.println("Token: " + request.getToken());
            System.out.println("New password length: " + (request.getNewPassword() != null ? request.getNewPassword().length() : "null"));
            
            authService.confirmPasswordReset(request.getToken(), request.getNewPassword());
            
            System.out.println("✅ Password reset successful");
            return ResponseEntity.ok().body("{\"message\": \"Password reset successfully. You can now login with your new password.\"}");
        } catch (Exception e) {
            System.err.println("❌ Password reset failed: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("{\"error\": \"Invalid or expired reset token.\"}");
        }
    }
}
