package com.healthbridge.config;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Configure static resource handling for uploaded profile images
        
        // For patients
        Path patientUploadDir = Paths.get("uploads/profile-images/patients");
        String patientUploadPath = patientUploadDir.toFile().getAbsolutePath();
        registry.addResourceHandler("/uploads/profile-images/patients/**")
                .addResourceLocations("file:" + patientUploadPath + "/");
        
        // For doctors
        Path doctorUploadDir = Paths.get("uploads/profile-images/doctors");
        String doctorUploadPath = doctorUploadDir.toFile().getAbsolutePath();
        registry.addResourceHandler("/uploads/profile-images/doctors/**")
                .addResourceLocations("file:" + doctorUploadPath + "/");
    }
}
