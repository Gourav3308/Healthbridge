package com.healthbridge.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.healthbridge.entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    // Find all active reviews for a doctor
    List<Review> findByDoctorIdAndIsActiveOrderByCreatedAtDesc(Long doctorId, Boolean isActive);
    
    // Find all active reviews by a patient
    List<Review> findByPatientIdAndIsActiveOrderByCreatedAtDesc(Long patientId, Boolean isActive);
    
    // Find a specific review by doctor and patient
    Optional<Review> findByDoctorIdAndPatientIdAndIsActive(Long doctorId, Long patientId, Boolean isActive);
    
    // Check if patient has already reviewed a doctor
    boolean existsByDoctorIdAndPatientIdAndIsActive(Long doctorId, Long patientId, Boolean isActive);
    
    // Get average rating for a doctor
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.doctor.id = :doctorId AND r.isActive = true")
    Double getAverageRatingByDoctorId(@Param("doctorId") Long doctorId);
    
    // Get total review count for a doctor
    @Query("SELECT COUNT(r) FROM Review r WHERE r.doctor.id = :doctorId AND r.isActive = true")
    Long getReviewCountByDoctorId(@Param("doctorId") Long doctorId);
    
    // Get rating distribution for a doctor
    @Query("SELECT r.rating, COUNT(r) FROM Review r WHERE r.doctor.id = :doctorId AND r.isActive = true GROUP BY r.rating ORDER BY r.rating")
    List<Object[]> getRatingDistributionByDoctorId(@Param("doctorId") Long doctorId);
    
    // Find recent reviews for a doctor (limit 10)
    @Query("SELECT r FROM Review r WHERE r.doctor.id = :doctorId AND r.isActive = true ORDER BY r.createdAt DESC")
    List<Review> findRecentReviewsByDoctorId(@Param("doctorId") Long doctorId);
}
