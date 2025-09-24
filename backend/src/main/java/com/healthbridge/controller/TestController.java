package com.healthbridge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins = {"http://localhost:4200", "https://healthbridge-frontend-jj1.onrender.com"})
public class TestController {
    
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Backend is running!");
    }
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JavaMailSender mailSender;
    
    @GetMapping("/hash-password")
    public ResponseEntity<String> hashPassword(@RequestParam String password) {
        String hash = passwordEncoder.encode(password);
        return ResponseEntity.ok("Hash for '" + password + "': " + hash);
    }
    
    @GetMapping("/verify-password")
    public ResponseEntity<String> verifyPassword(@RequestParam String password, @RequestParam String hash) {
        boolean matches = passwordEncoder.matches(password, hash);
        return ResponseEntity.ok("Password '" + password + "' matches hash: " + matches);
    }
    
    @PostMapping("/email")
    public ResponseEntity<String> testEmail(@RequestParam String email) {
        try {
            System.out.println("=== EMAIL TEST DEBUG ===");
            System.out.println("Testing email to: " + email);
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setFrom("healthbridge13012002@gmail.com");
            message.setSubject("🧪 Email Test - HealthBridge Medical Center");
            message.setText(
                "Hello!\n\n" +
                "This is a test email from HealthBridge Medical Center.\n\n" +
                "If you receive this email, it means our email system is working correctly!\n\n" +
                "Best regards,\n" +
                "HealthBridge Team"
            );
            
            mailSender.send(message);
            
            System.out.println("✅ Test email sent successfully to: " + email);
            System.out.println("=== EMAIL TEST DEBUG COMPLETE ===");
            
            return ResponseEntity.ok("Test email sent successfully to: " + email);
            
        } catch (Exception e) {
            System.err.println("❌ EMAIL TEST FAILED");
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            
            return ResponseEntity.badRequest().body("Failed to send test email: " + e.getMessage());
        }
    }
}
