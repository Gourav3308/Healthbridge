package com.healthbridge.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class AppointmentResponse {
    
    private Long id;
    private PatientInfo patient;
    private DoctorInfo doctor;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String status;
    private String reasonForVisit;
    private String notes;
    private String prescription;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public static class PatientInfo {
        private Long id;
        private String firstName;
        private String lastName;
        private String email;
        private String phone;
        
        // Constructors, getters, setters
        public PatientInfo() {}
        
        public PatientInfo(Long id, String firstName, String lastName, String email, String phone) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.phone = phone;
        }
        
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }
        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
    }
    
    public static class DoctorInfo {
        private Long id;
        private String firstName;
        private String lastName;
        private String specialization;
        private Double consultationFee;
        private String hospitalAffiliation;
        
        // Constructors, getters, setters
        public DoctorInfo() {}
        
        public DoctorInfo(Long id, String firstName, String lastName, String specialization, 
                         Double consultationFee, String hospitalAffiliation) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.specialization = specialization;
            this.consultationFee = consultationFee;
            this.hospitalAffiliation = hospitalAffiliation;
        }
        
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }
        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }
        public String getSpecialization() { return specialization; }
        public void setSpecialization(String specialization) { this.specialization = specialization; }
        public Double getConsultationFee() { return consultationFee; }
        public void setConsultationFee(Double consultationFee) { this.consultationFee = consultationFee; }
        public String getHospitalAffiliation() { return hospitalAffiliation; }
        public void setHospitalAffiliation(String hospitalAffiliation) { this.hospitalAffiliation = hospitalAffiliation; }
    }
    
    // Main class constructors, getters, setters
    public AppointmentResponse() {}
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public PatientInfo getPatient() { return patient; }
    public void setPatient(PatientInfo patient) { this.patient = patient; }
    public DoctorInfo getDoctor() { return doctor; }
    public void setDoctor(DoctorInfo doctor) { this.doctor = doctor; }
    public LocalDate getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(LocalDate appointmentDate) { this.appointmentDate = appointmentDate; }
    public LocalTime getAppointmentTime() { return appointmentTime; }
    public void setAppointmentTime(LocalTime appointmentTime) { this.appointmentTime = appointmentTime; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getReasonForVisit() { return reasonForVisit; }
    public void setReasonForVisit(String reasonForVisit) { this.reasonForVisit = reasonForVisit; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getPrescription() { return prescription; }
    public void setPrescription(String prescription) { this.prescription = prescription; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
