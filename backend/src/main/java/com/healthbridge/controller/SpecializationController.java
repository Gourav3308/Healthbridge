package com.healthbridge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthbridge.entity.Specialization;
import com.healthbridge.repository.SpecializationRepository;

@RestController
@RequestMapping("/api/specializations")
@CrossOrigin(origins = "http://localhost:4200")
public class SpecializationController {
    
    @Autowired
    private SpecializationRepository specializationRepository;
    
    @GetMapping
    public ResponseEntity<List<Specialization>> getAllSpecializations() {
        List<Specialization> specializations = specializationRepository.findAllActiveSpecializations();
        return ResponseEntity.ok(specializations);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Specialization>> searchSpecializations(@RequestParam String keyword) {
        List<Specialization> specializations = specializationRepository.searchSpecializations(keyword);
        return ResponseEntity.ok(specializations);
    }
}
