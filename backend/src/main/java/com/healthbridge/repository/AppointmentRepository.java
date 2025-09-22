package com.healthbridge.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.healthbridge.entity.Appointment;
import com.healthbridge.entity.AppointmentStatus;
import com.healthbridge.entity.Doctor;
import com.healthbridge.entity.Patient;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
    List<Appointment> findByPatient(Patient patient);
    
    List<Appointment> findByDoctor(Doctor doctor);
    
    List<Appointment> findByPatientId(Long patientId);
    
    List<Appointment> findByDoctorId(Long doctorId);
    
    @Query("SELECT a FROM Appointment a WHERE a.patient.id = :patientId AND a.status = :status")
    List<Appointment> findByPatientIdAndStatus(@Param("patientId") Long patientId, @Param("status") AppointmentStatus status);
    
    @Query("SELECT a FROM Appointment a WHERE a.doctor.id = :doctorId AND a.status = :status")
    List<Appointment> findByDoctorIdAndStatus(@Param("doctorId") Long doctorId, @Param("status") AppointmentStatus status);
    
    @Query("SELECT a FROM Appointment a WHERE a.doctor.id = :doctorId AND a.appointmentDate = :date")
    List<Appointment> findByDoctorIdAndAppointmentDate(@Param("doctorId") Long doctorId, @Param("date") LocalDate date);
    
    @Query("SELECT a FROM Appointment a WHERE a.doctor.id = :doctorId AND a.appointmentDate = :date AND a.appointmentTime = :time")
    Optional<Appointment> findByDoctorIdAndAppointmentDateAndTime(
        @Param("doctorId") Long doctorId, 
        @Param("date") LocalDate date, 
        @Param("time") LocalTime time
    );
    
    @Query("SELECT a FROM Appointment a WHERE a.patient.id = :patientId AND a.appointmentDate >= :fromDate")
    List<Appointment> findUpcomingAppointmentsByPatient(@Param("patientId") Long patientId, @Param("fromDate") LocalDate fromDate);
    
    @Query("SELECT a FROM Appointment a WHERE a.doctor.id = :doctorId AND a.appointmentDate >= :fromDate")
    List<Appointment> findUpcomingAppointmentsByDoctor(@Param("doctorId") Long doctorId, @Param("fromDate") LocalDate fromDate);
    
    @Query("SELECT a FROM Appointment a WHERE a.appointmentDate = :date AND a.status IN :statuses")
    List<Appointment> findByAppointmentDateAndStatusIn(@Param("date") LocalDate date, @Param("statuses") List<AppointmentStatus> statuses);
    
    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.doctor.id = :doctorId AND a.status = 'COMPLETED'")
    long countCompletedAppointmentsByDoctor(@Param("doctorId") Long doctorId);
    
    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.patient.id = :patientId")
    long countAppointmentsByPatient(@Param("patientId") Long patientId);
    
    @Query("SELECT a FROM Appointment a WHERE a.appointmentDate BETWEEN :startDate AND :endDate")
    List<Appointment> findAppointmentsBetweenDates(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.status = :status")
    long countByStatus(@Param("status") AppointmentStatus status);
    
    // Find appointment by Razorpay order ID
    Optional<Appointment> findByRazorpayOrderId(String razorpayOrderId);
    
    // Find appointments by payment status
    @Query("SELECT a FROM Appointment a WHERE a.paymentStatus = :paymentStatus")
    List<Appointment> findByPaymentStatus(@Param("paymentStatus") Appointment.PaymentStatus paymentStatus);
    
    // Find pending payment appointments
    @Query("SELECT a FROM Appointment a WHERE a.paymentStatus = 'PENDING' AND a.createdAt < :cutoffTime")
    List<Appointment> findPendingPaymentAppointments(@Param("cutoffTime") java.time.LocalDateTime cutoffTime);
    
    // Find all appointments by doctor ordered by date and time (most recent first)
    @Query("SELECT a FROM Appointment a WHERE a.doctor.id = :doctorId ORDER BY a.appointmentDate DESC, a.appointmentTime DESC")
    List<Appointment> findByDoctorIdOrderByAppointmentDateDescAppointmentTimeDesc(@Param("doctorId") Long doctorId);
    
    // Batch update appointments to CANCELLED status for a doctor
    @Modifying
    @Query("UPDATE Appointment a SET a.status = 'CANCELLED' WHERE a.doctor.id = :doctorId AND a.status IN ('SCHEDULED', 'CONFIRMED')")
    int cancelAppointmentsByDoctorId(@Param("doctorId") Long doctorId);
}
