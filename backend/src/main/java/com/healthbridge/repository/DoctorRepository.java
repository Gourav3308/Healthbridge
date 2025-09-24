package com.healthbridge.repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.healthbridge.entity.Doctor;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    
    Optional<Doctor> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    Optional<Doctor> findByLicenseNumber(String licenseNumber);
    
    @Query("SELECT d FROM Doctor d WHERE d.isApproved = :approved")
    List<Doctor> findByIsApproved(@Param("approved") Boolean approved);
    
    @Query("SELECT d FROM Doctor d WHERE d.specialization = :specialization AND d.isApproved = true")
    List<Doctor> findBySpecialization(@Param("specialization") String specialization);
    
    @Query("SELECT d FROM Doctor d WHERE d.city = :city AND d.isApproved = true")
    List<Doctor> findByCity(@Param("city") String city);
    
    @Query("SELECT d FROM Doctor d WHERE d.state = :state AND d.isApproved = true")
    List<Doctor> findByState(@Param("state") String state);
    
    @Query("SELECT d FROM Doctor d WHERE d.consultationFee BETWEEN :minFee AND :maxFee AND d.isApproved = true")
    List<Doctor> findByConsultationFeeBetween(@Param("minFee") BigDecimal minFee, @Param("maxFee") BigDecimal maxFee);
    
    @Query("SELECT d FROM Doctor d WHERE d.experienceYears >= :years AND d.isApproved = true")
    List<Doctor> findByExperienceYearsGreaterThanEqual(@Param("years") Integer years);
    
    @Query("SELECT d FROM Doctor d WHERE " +
           "(LOWER(d.specialization) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(d.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(d.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(d.hospitalAffiliation) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(d.city) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
           "d.isApproved = true")
    List<Doctor> searchDoctors(@Param("keyword") String keyword);
    
    @Query("SELECT d FROM Doctor d WHERE " +
           "(:specialization IS NULL OR LOWER(d.specialization) = LOWER(:specialization)) AND " +
           "(:city IS NULL OR LOWER(d.city) = LOWER(:city)) AND " +
           "(:minFee IS NULL OR d.consultationFee >= :minFee) AND " +
           "(:maxFee IS NULL OR d.consultationFee <= :maxFee) AND " +
           "(:minExperience IS NULL OR d.experienceYears >= :minExperience) AND " +
           "d.isApproved = true")
    List<Doctor> findDoctorsWithFilters(
        @Param("specialization") String specialization,
        @Param("city") String city,
        @Param("minFee") BigDecimal minFee,
        @Param("maxFee") BigDecimal maxFee,
        @Param("minExperience") Integer minExperience
    );
    
    @Query("SELECT COUNT(d) FROM Doctor d WHERE d.isApproved = true")
    long countApprovedDoctors();
    
    @Query("SELECT COUNT(d) FROM Doctor d WHERE d.isApproved = false")
    long countPendingDoctors();
    
    @Query("SELECT DISTINCT d.specialization FROM Doctor d WHERE d.isApproved = true ORDER BY d.specialization")
    List<String> findAllSpecializations();
    
    @Query("SELECT DISTINCT d.city FROM Doctor d WHERE d.isApproved = true AND d.city IS NOT NULL ORDER BY d.city")
    List<String> findAllCities();
    
    // OAuth2 methods
    List<Doctor> findAllByGoogleId(String googleId);
}