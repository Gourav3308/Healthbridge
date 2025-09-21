package com.healthbridge.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.healthbridge.entity.Admin;
import com.healthbridge.repository.AdminRepository;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Check if admin exists
        if (!adminRepository.existsByEmail("adminhealth@gmail.com")) {
            // Create admin with properly hashed password
            Admin admin = new Admin();
            admin.setEmail("adminhealth@gmail.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFirstName("Admin");
            admin.setLastName("Health");
            admin.setIsActive(true);
            
            adminRepository.save(admin);
            System.out.println("Default admin user created: adminhealth@gmail.com / admin123");
        } else {
            // Update existing admin password to ensure it's properly hashed
            Admin admin = adminRepository.findByEmail("adminhealth@gmail.com").orElse(null);
            if (admin != null && admin.getPassword().equals("admin123")) {
                admin.setPassword(passwordEncoder.encode("admin123"));
                adminRepository.save(admin);
                System.out.println("Admin password updated with proper hash");
            }
        }
    }
}
