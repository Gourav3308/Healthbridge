package com.healthbridge.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.healthbridge.entity.Doctor;
import com.healthbridge.entity.DoctorReview;
import com.healthbridge.entity.Patient;

@Repository
public interface DoctorReviewRepository extends JpaRepository<DoctorReview, Long> {
    
    List<DoctorReview> findByDoctor(Doctor doctor);
    
    List<DoctorReview> findByPatient(Patient patient);
    
    List<DoctorReview> findByDoctorId(Long doctorId);
    
    List<DoctorReview> findByPatientId(Long patientId);
    
    @Query("SELECT dr FROM DoctorReview dr WHERE dr.appointment.id = :appointmentId")
    Optional<DoctorReview> findByAppointmentId(@Param("appointmentId") Long appointmentId);
    
    @Query("SELECT dr FROM DoctorReview dr WHERE dr.patient.id = :patientId AND dr.appointment.id = :appointmentId")
    Optional<DoctorReview> findByPatientIdAndAppointmentId(@Param("patientId") Long patientId, @Param("appointmentId") Long appointmentId);
    
    @Query("SELECT AVG(dr.rating) FROM DoctorReview dr WHERE dr.doctor.id = :doctorId")
    Double getAverageRatingByDoctorId(@Param("doctorId") Long doctorId);
    
    @Query("SELECT COUNT(dr) FROM DoctorReview dr WHERE dr.doctor.id = :doctorId")
    long countReviewsByDoctorId(@Param("doctorId") Long doctorId);
    
    @Query("SELECT dr FROM DoctorReview dr WHERE dr.doctor.id = :doctorId ORDER BY dr.createdAt DESC")
    List<DoctorReview> findByDoctorIdOrderByCreatedAtDesc(@Param("doctorId") Long doctorId);
    
    @Query("SELECT dr FROM DoctorReview dr WHERE dr.doctor.id = :doctorId AND dr.rating = :rating")
    List<DoctorReview> findByDoctorIdAndRating(@Param("doctorId") Long doctorId, @Param("rating") Integer rating);
    
    // Batch delete all doctor reviews for a doctor
    void deleteByDoctorId(Long doctorId);
}
