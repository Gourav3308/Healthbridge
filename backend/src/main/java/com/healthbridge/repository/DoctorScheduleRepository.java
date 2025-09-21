package com.healthbridge.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.healthbridge.entity.DoctorSchedule;

@Repository
public interface DoctorScheduleRepository extends JpaRepository<DoctorSchedule, Long> {
    
    // Find schedules by doctor ID
    List<DoctorSchedule> findByDoctorIdAndIsActiveOrderByScheduleDateAscStartTimeAsc(Long doctorId, Boolean isActive);
    
    // Find schedules by doctor ID and date range
    @Query("SELECT ds FROM DoctorSchedule ds WHERE ds.doctor.id = :doctorId " +
           "AND ds.scheduleDate BETWEEN :startDate AND :endDate " +
           "AND ds.isActive = true " +
           "ORDER BY ds.scheduleDate ASC, ds.startTime ASC")
    List<DoctorSchedule> findByDoctorIdAndDateRange(@Param("doctorId") Long doctorId, 
                                                   @Param("startDate") LocalDate startDate, 
                                                   @Param("endDate") LocalDate endDate);
    
    // Find schedules by doctor ID and specific date
    List<DoctorSchedule> findByDoctorIdAndScheduleDateAndIsActive(Long doctorId, LocalDate scheduleDate, Boolean isActive);
    
    // Find available schedules for a doctor
    @Query("SELECT ds FROM DoctorSchedule ds WHERE ds.doctor.id = :doctorId " +
           "AND ds.scheduleDate >= :fromDate " +
           "AND ds.status = 'AVAILABLE' " +
           "AND ds.isActive = true " +
           "ORDER BY ds.scheduleDate ASC, ds.startTime ASC")
    List<DoctorSchedule> findAvailableSchedules(@Param("doctorId") Long doctorId, 
                                              @Param("fromDate") LocalDate fromDate);
    
    // Find schedules by status
    @Query("SELECT ds FROM DoctorSchedule ds WHERE ds.doctor.id = :doctorId " +
           "AND ds.status = :status " +
           "AND ds.isActive = true " +
           "ORDER BY ds.scheduleDate ASC, ds.startTime ASC")
    List<DoctorSchedule> findByDoctorIdAndStatus(@Param("doctorId") Long doctorId, 
                                               @Param("status") DoctorSchedule.ScheduleStatus status);
    
    // Check if schedule exists for doctor at specific date and time
    @Query("SELECT COUNT(ds) > 0 FROM DoctorSchedule ds WHERE ds.doctor.id = :doctorId " +
           "AND ds.scheduleDate = :scheduleDate " +
           "AND ((ds.startTime <= :startTime AND ds.endTime > :startTime) " +
           "OR (ds.startTime < :endTime AND ds.endTime >= :endTime) " +
           "OR (ds.startTime >= :startTime AND ds.endTime <= :endTime)) " +
           "AND ds.isActive = true")
    boolean hasConflictingSchedule(@Param("doctorId") Long doctorId,
                                 @Param("scheduleDate") LocalDate scheduleDate,
                                 @Param("startTime") LocalDate startTime,
                                 @Param("endTime") LocalDate endTime);
    
    // Find upcoming schedules for a doctor
    @Query("SELECT ds FROM DoctorSchedule ds WHERE ds.doctor.id = :doctorId " +
           "AND ds.scheduleDate >= CURRENT_DATE " +
           "AND ds.isActive = true " +
           "ORDER BY ds.scheduleDate ASC, ds.startTime ASC")
    List<DoctorSchedule> findUpcomingSchedules(@Param("doctorId") Long doctorId);
    
    // Delete all schedules for a specific doctor
    void deleteByDoctorId(Long doctorId);
}
