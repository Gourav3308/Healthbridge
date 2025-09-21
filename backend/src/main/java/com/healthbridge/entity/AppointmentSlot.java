package com.healthbridge.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "appointment_slots")
public class AppointmentSlot {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    @NotNull(message = "Doctor is required")
    private Doctor doctor;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id", nullable = false)
    @NotNull(message = "Schedule is required")
    private DoctorSchedule schedule;
    
    @Column(name = "slot_date", nullable = false)
    @NotNull(message = "Slot date is required")
    private LocalDate slotDate;
    
    @Column(name = "slot_time", nullable = false)
    @NotNull(message = "Slot time is required")
    private LocalTime slotTime;
    
    @Column(name = "end_time", nullable = false)
    @NotNull(message = "End time is required")
    private LocalTime endTime;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private SlotStatus status = SlotStatus.AVAILABLE;
    
    @Column(name = "booked_count", nullable = false)
    private Integer bookedCount = 0;
    
    @Column(name = "max_capacity", nullable = false)
    private Integer maxCapacity = 1;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
    
    // Enums
    public enum SlotStatus {
        AVAILABLE, BOOKED, BLOCKED, CANCELLED
    }
    
    // Constructors
    public AppointmentSlot() {}
    
    public AppointmentSlot(Doctor doctor, DoctorSchedule schedule, LocalDate slotDate, 
                          LocalTime slotTime, LocalTime endTime) {
        this.doctor = doctor;
        this.schedule = schedule;
        this.slotDate = slotDate;
        this.slotTime = slotTime;
        this.endTime = endTime;
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (isActive == null) {
            isActive = true;
        }
        if (status == null) {
            status = SlotStatus.AVAILABLE;
        }
        if (bookedCount == null) {
            bookedCount = 0;
        }
        if (maxCapacity == null) {
            maxCapacity = 1;
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Business methods
    public boolean isAvailable() {
        return status == SlotStatus.AVAILABLE && bookedCount < maxCapacity && isActive;
    }
    
    public boolean canBook() {
        return isAvailable() && slotDate.isAfter(LocalDate.now().minusDays(1));
    }
    
    public void bookSlot() {
        if (canBook()) {
            bookedCount++;
            if (bookedCount >= maxCapacity) {
                status = SlotStatus.BOOKED;
            }
        } else {
            throw new RuntimeException("Slot cannot be booked");
        }
    }
    
    public void cancelBooking() {
        if (bookedCount > 0) {
            bookedCount--;
            if (status == SlotStatus.BOOKED && bookedCount < maxCapacity) {
                status = SlotStatus.AVAILABLE;
            }
        }
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Doctor getDoctor() {
        return doctor;
    }
    
    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }
    
    public DoctorSchedule getSchedule() {
        return schedule;
    }
    
    public void setSchedule(DoctorSchedule schedule) {
        this.schedule = schedule;
    }
    
    public LocalDate getSlotDate() {
        return slotDate;
    }
    
    public void setSlotDate(LocalDate slotDate) {
        this.slotDate = slotDate;
    }
    
    public LocalTime getSlotTime() {
        return slotTime;
    }
    
    public void setSlotTime(LocalTime slotTime) {
        this.slotTime = slotTime;
    }
    
    public LocalTime getEndTime() {
        return endTime;
    }
    
    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }
    
    public SlotStatus getStatus() {
        return status;
    }
    
    public void setStatus(SlotStatus status) {
        this.status = status;
    }
    
    public Integer getBookedCount() {
        return bookedCount;
    }
    
    public void setBookedCount(Integer bookedCount) {
        this.bookedCount = bookedCount;
    }
    
    public Integer getMaxCapacity() {
        return maxCapacity;
    }
    
    public void setMaxCapacity(Integer maxCapacity) {
        this.maxCapacity = maxCapacity;
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
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    
    @Override
    public String toString() {
        return "AppointmentSlot{" +
                "id=" + id +
                ", slotDate=" + slotDate +
                ", slotTime=" + slotTime +
                ", endTime=" + endTime +
                ", status=" + status +
                ", bookedCount=" + bookedCount +
                ", maxCapacity=" + maxCapacity +
                '}';
    }
}
