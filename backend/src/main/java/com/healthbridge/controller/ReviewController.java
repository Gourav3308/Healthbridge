package com.healthbridge.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthbridge.dto.ReviewRequest;
import com.healthbridge.dto.ReviewResponse;
import com.healthbridge.entity.Doctor;
import com.healthbridge.entity.Patient;
import com.healthbridge.entity.Review;
import com.healthbridge.repository.DoctorRepository;
import com.healthbridge.repository.PatientRepository;
import com.healthbridge.repository.ReviewRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:4201", "http://127.0.0.1:4200", "http://127.0.0.1:4201", "http://10.45.254.162:4200", "https://healthbridge-frontend-jj1.onrender.com"})
public class ReviewController {
    
    @Autowired
    private ReviewRepository reviewRepository;
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    @Autowired
    private PatientRepository patientRepository;
    
    // Get all reviews for a doctor (public endpoint)
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<ReviewResponse>> getReviewsByDoctorId(@PathVariable Long doctorId) {
        List<Review> reviews = reviewRepository.findByDoctorIdAndIsActiveOrderByCreatedAtDesc(doctorId, true);
        
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser") 
                                 ? auth.getName() : null;
        
        List<ReviewResponse> reviewResponses = reviews.stream().map(review -> {
            ReviewResponse response = convertToResponse(review);
            // Set canEdit flag if current user is the author of the review
            if (currentUserEmail != null && review.getPatient().getEmail().equals(currentUserEmail)) {
                response.setCanEdit(true);
            } else {
                response.setCanEdit(false);
            }
            return response;
        }).collect(Collectors.toList());
        
        return ResponseEntity.ok(reviewResponses);
    }
    
    // Get patient's own reviews
    @GetMapping("/my-reviews")
    public ResponseEntity<List<ReviewResponse>> getMyReviews() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        
        Patient patient = patientRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Patient not found"));
        
        List<Review> reviews = reviewRepository.findByPatientIdAndIsActiveOrderByCreatedAtDesc(patient.getId(), true);
        List<ReviewResponse> reviewResponses = reviews.stream()
            .map(review -> {
                ReviewResponse response = convertToResponse(review);
                response.setCanEdit(true); // Patient can always edit their own reviews
                return response;
            })
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(reviewResponses);
    }
    
    // Create a new review
    @PostMapping
    public ResponseEntity<?> createReview(@Valid @RequestBody ReviewRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            
            Patient patient = patientRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
            
            Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
            
            // Check if patient has already reviewed this doctor
            if (reviewRepository.existsByDoctorIdAndPatientIdAndIsActive(doctor.getId(), patient.getId(), true)) {
                return ResponseEntity.badRequest()
                    .body("{\"error\": \"You have already reviewed this doctor. Use update to modify your review.\"}");
            }
            
            Review review = new Review(doctor, patient, request.getRating(), request.getComment());
            Review savedReview = reviewRepository.save(review);
            
            ReviewResponse response = convertToResponse(savedReview);
            response.setCanEdit(true);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    // Update an existing review
    @PutMapping("/{reviewId}")
    public ResponseEntity<?> updateReview(@PathVariable Long reviewId, @Valid @RequestBody ReviewRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            
            Patient patient = patientRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
            
            Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));
            
            // Check if the review belongs to the current patient
            if (!review.getPatient().getId().equals(patient.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("{\"error\": \"You can only update your own reviews\"}");
            }
            
            // Check if review is active
            if (!review.getIsActive()) {
                return ResponseEntity.badRequest()
                    .body("{\"error\": \"Cannot update deleted review\"}");
            }
            
            // Update the review
            review.setRating(request.getRating());
            review.setComment(request.getComment());
            
            Review updatedReview = reviewRepository.save(review);
            
            ReviewResponse response = convertToResponse(updatedReview);
            response.setCanEdit(true);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    // Delete a review (soft delete)
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable Long reviewId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            
            Patient patient = patientRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
            
            Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));
            
            // Check if the review belongs to the current patient
            if (!review.getPatient().getId().equals(patient.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("{\"error\": \"You can only delete your own reviews\"}");
            }
            
            // Soft delete the review
            review.setIsActive(false);
            reviewRepository.save(review);
            
            return ResponseEntity.ok("{\"message\": \"Review deleted successfully\"}");
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    // Get patient's review for a specific doctor
    @GetMapping("/doctor/{doctorId}/my-review")
    public ResponseEntity<ReviewResponse> getMyReviewForDoctor(@PathVariable Long doctorId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        
        Patient patient = patientRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Patient not found"));
        
        return reviewRepository.findByDoctorIdAndPatientIdAndIsActive(doctorId, patient.getId(), true)
            .map(review -> {
                ReviewResponse response = convertToResponse(review);
                response.setCanEdit(true);
                return ResponseEntity.ok(response);
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    // Get doctor statistics (average rating, total reviews)
    @GetMapping("/doctor/{doctorId}/stats")
    public ResponseEntity<?> getDoctorReviewStats(@PathVariable Long doctorId) {
        try {
            Double avgRating = reviewRepository.getAverageRatingByDoctorId(doctorId);
            Long reviewCount = reviewRepository.getReviewCountByDoctorId(doctorId);
            
            // Create response object
            class ReviewStats {
                public final Double averageRating;
                public final Long totalReviews;
                
                public ReviewStats(Double avgRating, Long reviewCount) {
                    this.averageRating = avgRating != null ? Math.round(avgRating * 10.0) / 10.0 : 0.0;
                    this.totalReviews = reviewCount != null ? reviewCount : 0L;
                }
            }
            
            return ResponseEntity.ok(new ReviewStats(avgRating, reviewCount));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    // Helper method to convert Review entity to ReviewResponse DTO
    private ReviewResponse convertToResponse(Review review) {
        ReviewResponse response = new ReviewResponse();
        response.setId(review.getId());
        response.setDoctorId(review.getDoctor().getId());
        response.setDoctorName("Dr. " + review.getDoctor().getFirstName() + " " + review.getDoctor().getLastName());
        response.setPatientId(review.getPatient().getId());
        response.setPatientName(review.getPatient().getFirstName() + " " + review.getPatient().getLastName());
        response.setRating(review.getRating());
        response.setComment(review.getComment());
        response.setCreatedAt(review.getCreatedAt());
        response.setUpdatedAt(review.getUpdatedAt());
        return response;
    }
}
