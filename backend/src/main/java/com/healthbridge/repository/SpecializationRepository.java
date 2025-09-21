package com.healthbridge.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.healthbridge.entity.Specialization;

@Repository
public interface SpecializationRepository extends JpaRepository<Specialization, Long> {
    
    Optional<Specialization> findByName(String name);
    
    List<Specialization> findByIsActive(Boolean isActive);
    
    @Query("SELECT s FROM Specialization s WHERE s.isActive = true ORDER BY s.name")
    List<Specialization> findAllActiveSpecializations();
    
    @Query("SELECT s FROM Specialization s WHERE s.name LIKE %:keyword% AND s.isActive = true")
    List<Specialization> searchSpecializations(@Param("keyword") String keyword);
    
    boolean existsByName(String name);
}
