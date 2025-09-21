package com.healthbridge.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.healthbridge.entity.DayOfWeek;
import com.healthbridge.entity.Doctor;
import com.healthbridge.entity.DoctorAvailability;

@Repository
public interface DoctorAvailabilityRepository extends JpaRepository<DoctorAvailability, Long> {
    
    List<DoctorAvailability> findByDoctor(Doctor doctor);
    
    List<DoctorAvailability> findByDoctorId(Long doctorId);
    
    @Query("SELECT da FROM DoctorAvailability da WHERE da.doctor.id = :doctorId AND da.dayOfWeek = :dayOfWeek")
    Optional<DoctorAvailability> findByDoctorIdAndDayOfWeek(@Param("doctorId") Long doctorId, @Param("dayOfWeek") DayOfWeek dayOfWeek);
    
    @Query("SELECT da FROM DoctorAvailability da WHERE da.doctor.id = :doctorId AND da.isAvailable = true")
    List<DoctorAvailability> findAvailableSlotsByDoctor(@Param("doctorId") Long doctorId);
    
    @Query("SELECT da FROM DoctorAvailability da WHERE da.doctor.id = :doctorId AND da.dayOfWeek = :dayOfWeek AND da.isAvailable = true")
    Optional<DoctorAvailability> findAvailableSlotByDoctorAndDay(@Param("doctorId") Long doctorId, @Param("dayOfWeek") DayOfWeek dayOfWeek);
}
