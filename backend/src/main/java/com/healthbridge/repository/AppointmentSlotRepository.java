package com.healthbridge.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.healthbridge.entity.AppointmentSlot;

@Repository
public interface AppointmentSlotRepository extends JpaRepository<AppointmentSlot, Long> {
    
    // Find slots by doctor ID and date
    List<AppointmentSlot> findByDoctorIdAndSlotDateAndIsActiveOrderBySlotTimeAsc(Long doctorId, LocalDate slotDate, Boolean isActive);
    
    // Find available slots by doctor ID and date
    @Query("SELECT slot FROM AppointmentSlot slot WHERE slot.doctor.id = :doctorId " +
           "AND slot.slotDate = :slotDate " +
           "AND slot.status = 'AVAILABLE' " +
           "AND slot.bookedCount < slot.maxCapacity " +
           "AND slot.isActive = true " +
           "ORDER BY slot.slotTime ASC")
    List<AppointmentSlot> findAvailableSlots(@Param("doctorId") Long doctorId, 
                                           @Param("slotDate") LocalDate slotDate);
    
    // Find slots by doctor ID and date range
    @Query("SELECT slot FROM AppointmentSlot slot WHERE slot.doctor.id = :doctorId " +
           "AND slot.slotDate BETWEEN :startDate AND :endDate " +
           "AND slot.isActive = true " +
           "ORDER BY slot.slotDate ASC, slot.slotTime ASC")
    List<AppointmentSlot> findByDoctorIdAndDateRange(@Param("doctorId") Long doctorId,
                                                   @Param("startDate") LocalDate startDate,
                                                   @Param("endDate") LocalDate endDate);
    
    // Find available slots by doctor ID and date range
    @Query("SELECT slot FROM AppointmentSlot slot WHERE slot.doctor.id = :doctorId " +
           "AND slot.slotDate BETWEEN :startDate AND :endDate " +
           "AND slot.status = 'AVAILABLE' " +
           "AND slot.bookedCount < slot.maxCapacity " +
           "AND slot.isActive = true " +
           "ORDER BY slot.slotDate ASC, slot.slotTime ASC")
    List<AppointmentSlot> findAvailableSlotsByDateRange(@Param("doctorId") Long doctorId,
                                                      @Param("startDate") LocalDate startDate,
                                                      @Param("endDate") LocalDate endDate);
    
    // Find specific slot by doctor, date and time
    Optional<AppointmentSlot> findByDoctorIdAndSlotDateAndSlotTimeAndIsActive(Long doctorId, 
                                                                            LocalDate slotDate, 
                                                                            LocalTime slotTime, 
                                                                            Boolean isActive);
    
    // Find slots by schedule ID
    List<AppointmentSlot> findByScheduleIdAndIsActiveOrderBySlotTimeAsc(Long scheduleId, Boolean isActive);
    
    // Count available slots for a doctor on a specific date
    @Query("SELECT COUNT(slot) FROM AppointmentSlot slot WHERE slot.doctor.id = :doctorId " +
           "AND slot.slotDate = :slotDate " +
           "AND slot.status = 'AVAILABLE' " +
           "AND slot.bookedCount < slot.maxCapacity " +
           "AND slot.isActive = true")
    Long countAvailableSlots(@Param("doctorId") Long doctorId, @Param("slotDate") LocalDate slotDate);
    
    // Find upcoming available slots for a doctor
    @Query("SELECT slot FROM AppointmentSlot slot WHERE slot.doctor.id = :doctorId " +
           "AND slot.slotDate >= CURRENT_DATE " +
           "AND slot.status = 'AVAILABLE' " +
           "AND slot.bookedCount < slot.maxCapacity " +
           "AND slot.isActive = true " +
           "ORDER BY slot.slotDate ASC, slot.slotTime ASC")
    List<AppointmentSlot> findUpcomingAvailableSlots(@Param("doctorId") Long doctorId);
    
    // Check if slot exists and is available
    @Query("SELECT COUNT(slot) > 0 FROM AppointmentSlot slot WHERE slot.id = :slotId " +
           "AND slot.status = 'AVAILABLE' " +
           "AND slot.bookedCount < slot.maxCapacity " +
           "AND slot.isActive = true")
    boolean isSlotAvailable(@Param("slotId") Long slotId);
    
    // Delete all slots for a specific doctor
    void deleteByDoctorId(Long doctorId);
    
    // Count slots by doctor ID and active status
    long countByDoctorIdAndIsActive(Long doctorId, Boolean isActive);
}
