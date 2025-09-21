package com.healthbridge.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "doctors")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Doctor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    @Email(message = "Please provide a valid email address")
    @NotBlank(message = "Email is required")
    private String email;
    
    @Column(nullable = true)
    @Size(min = 6, message = "Password must be at least 6 characters long")
    @JsonIgnore
    private String password;
    
    @Column(name = "first_name", nullable = false)
    @NotBlank(message = "First name is required")
    private String firstName;
    
    @Column(name = "last_name", nullable = false)
    @NotBlank(message = "Last name is required")
    private String lastName;
    
    @Column(length = 15)
    private String phone;
    
    @Column(name = "license_number", unique = true, nullable = false, length = 50)
    @NotBlank(message = "License number is required")
    private String licenseNumber;
    
    @Column(nullable = false, length = 100)
    @NotBlank(message = "Specialization is required")
    private String specialization;
    
    @Column(columnDefinition = "TEXT", nullable = false)
    @NotBlank(message = "Qualification is required")
    private String qualification;
    
    @Column(name = "experience_years", nullable = false)
    @NotNull(message = "Experience years is required")
    @Min(value = 0, message = "Experience years cannot be negative")
    private Integer experienceYears;
    
    @Column(name = "consultation_fee", nullable = false, precision = 10, scale = 2)
    @NotNull(message = "Consultation fee is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Consultation fee must be greater than 0")
    private BigDecimal consultationFee;
    
    @Column(columnDefinition = "TEXT")
    private String about;
    
    @Column(name = "hospital_affiliation", length = 200)
    private String hospitalAffiliation;
    
    @Column(columnDefinition = "TEXT")
    private String address;
    
    private String city;
    
    private String state;
    
    @Column(length = 10)
    private String pincode;
    
    @Column(name = "is_approved")
    private Boolean isApproved = false;
    
    @Column(name = "approval_date")
    private LocalDateTime approvalDate;
    
    @Column(name = "approved_by")
    private String approvedBy;
    
    @Column(name = "profile_image_url", columnDefinition = "LONGTEXT")
    private String profileImageUrl;
    
    @Column(name = "google_id", unique = true)
    private String googleId;
    
    @Column(name = "auth_provider")
    private String authProvider = "LOCAL"; // LOCAL, GOOGLE
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<DoctorAvailability> availabilities;
    
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Appointment> appointments;
    
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<DoctorReview> reviews;
    
    // Constructors
    public Doctor() {}
    
    public Doctor(String email, String password, String firstName, String lastName, String licenseNumber, 
                  String specialization, String qualification, Integer experienceYears, BigDecimal consultationFee) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.licenseNumber = licenseNumber;
        this.specialization = specialization;
        this.qualification = qualification;
        this.experienceYears = experienceYears;
        this.consultationFee = consultationFee;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getLicenseNumber() {
        return licenseNumber;
    }
    
    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }
    
    public String getSpecialization() {
        return specialization;
    }
    
    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }
    
    public String getQualification() {
        return qualification;
    }
    
    public void setQualification(String qualification) {
        this.qualification = qualification;
    }
    
    public Integer getExperienceYears() {
        return experienceYears;
    }
    
    public void setExperienceYears(Integer experienceYears) {
        this.experienceYears = experienceYears;
    }
    
    public BigDecimal getConsultationFee() {
        return consultationFee;
    }
    
    public void setConsultationFee(BigDecimal consultationFee) {
        this.consultationFee = consultationFee;
    }
    
    public String getAbout() {
        return about;
    }
    
    public void setAbout(String about) {
        this.about = about;
    }
    
    public String getHospitalAffiliation() {
        return hospitalAffiliation;
    }
    
    public void setHospitalAffiliation(String hospitalAffiliation) {
        this.hospitalAffiliation = hospitalAffiliation;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public String getCity() {
        return city;
    }
    
    public void setCity(String city) {
        this.city = city;
    }
    
    public String getState() {
        return state;
    }
    
    public void setState(String state) {
        this.state = state;
    }
    
    public String getPincode() {
        return pincode;
    }
    
    public void setPincode(String pincode) {
        this.pincode = pincode;
    }
    
    public Boolean getIsApproved() {
        return isApproved;
    }
    
    public void setIsApproved(Boolean isApproved) {
        this.isApproved = isApproved;
    }
    
    public LocalDateTime getApprovalDate() {
        return approvalDate;
    }
    
    public void setApprovalDate(LocalDateTime approvalDate) {
        this.approvalDate = approvalDate;
    }
    
    public String getApprovedBy() {
        return approvedBy;
    }
    
    public void setApprovedBy(String approvedBy) {
        this.approvedBy = approvedBy;
    }
    
    public String getProfileImageUrl() {
        return profileImageUrl;
    }
    
    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public List<DoctorAvailability> getAvailabilities() {
        return availabilities;
    }
    
    public void setAvailabilities(List<DoctorAvailability> availabilities) {
        this.availabilities = availabilities;
    }
    
    public List<Appointment> getAppointments() {
        return appointments;
    }
    
    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }
    
    public List<DoctorReview> getReviews() {
        return reviews;
    }
    
    public void setReviews(List<DoctorReview> reviews) {
        this.reviews = reviews;
    }
    
    public String getGoogleId() {
        return googleId;
    }
    
    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }
    
    public String getAuthProvider() {
        return authProvider;
    }
    
    public void setAuthProvider(String authProvider) {
        this.authProvider = authProvider;
    }
    
    public String getFullName() {
        return firstName + " " + lastName;
    }
    
    // Helper method to get role
    public String getRole() {
        return "DOCTOR";
    }
    
    @Override
    public String toString() {
        return "Doctor{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", licenseNumber='" + licenseNumber + '\'' +
                ", specialization='" + specialization + '\'' +
                ", experienceYears=" + experienceYears +
                ", consultationFee=" + consultationFee +
                ", isApproved=" + isApproved +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                '}';
    }
}