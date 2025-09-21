package com.healthbridge.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.validation.constraints.NotNull;

public class AppointmentRequest {
    
    @NotNull(message = "Doctor ID is required")
    private Long doctorId;
    
    @NotNull(message = "Appointment date is required")
    private LocalDate appointmentDate;
    
    @NotNull(message = "Appointment time is required")
    private LocalTime appointmentTime;
    
    private String reasonForVisit;
    
    public AppointmentRequest() {}
    
    public AppointmentRequest(Long doctorId, LocalDate appointmentDate, LocalTime appointmentTime, String reasonForVisit) {
        this.doctorId = doctorId;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.reasonForVisit = reasonForVisit;
    }
    
    public Long getDoctorId() {
        return doctorId;
    }
    
    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }
    
    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }
    
    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }
    
    public LocalTime getAppointmentTime() {
        return appointmentTime;
    }
    
    public void setAppointmentTime(LocalTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }
    
    public String getReasonForVisit() {
        return reasonForVisit;
    }
    
    public void setReasonForVisit(String reasonForVisit) {
        this.reasonForVisit = reasonForVisit;
    }
}
