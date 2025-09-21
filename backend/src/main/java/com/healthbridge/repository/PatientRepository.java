package com.healthbridge.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.healthbridge.entity.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    
    Optional<Patient> findByEmail(String email);
    
    Optional<Patient> findByGoogleId(String googleId);
    
    boolean existsByEmail(String email);
    
    boolean existsByGoogleId(String googleId);
    
    @Query("SELECT p FROM Patient p WHERE p.city = :city")
    List<Patient> findByCity(@Param("city") String city);
    
    @Query("SELECT p FROM Patient p WHERE p.state = :state")
    List<Patient> findByState(@Param("state") String state);
    
    @Query("SELECT p FROM Patient p WHERE p.bloodGroup = :bloodGroup")
    List<Patient> findByBloodGroup(@Param("bloodGroup") String bloodGroup);
    
    @Query("SELECT COUNT(p) FROM Patient p")
    long countAllPatients();
    
    @Query("SELECT COUNT(p) FROM Patient p WHERE p.isActive = :isActive")
    long countByIsActive(@Param("isActive") Boolean isActive);
    
    @Query("SELECT p FROM Patient p WHERE p.firstName LIKE %:name% OR p.lastName LIKE %:name%")
    List<Patient> findByNameContaining(@Param("name") String name);
}