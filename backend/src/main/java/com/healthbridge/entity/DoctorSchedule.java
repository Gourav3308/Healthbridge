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
@Table(name = "doctor_schedules")
public class DoctorSchedule {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    @NotNull(message = "Doctor is required")
    private Doctor doctor;
    
    @Column(name = "schedule_date", nullable = false)
    @NotNull(message = "Schedule date is required")
    private LocalDate scheduleDate;
    
    @Column(name = "start_time", nullable = false)
    @NotNull(message = "Start time is required")
    private LocalTime startTime;
    
    @Column(name = "end_time", nullable = false)
    @NotNull(message = "End time is required")
    private LocalTime endTime;
    
    @Column(name = "slot_duration_minutes", nullable = false)
    private Integer slotDurationMinutes = 30; // Default 30 minutes per slot
    
    @Column(name = "max_patients_per_slot", nullable = false)
    private Integer maxPatientsPerSlot = 1; // Default 1 patient per slot
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ScheduleStatus status = ScheduleStatus.AVAILABLE;
    
    @Column(name = "break_start_time")
    private LocalTime breakStartTime;
    
    @Column(name = "break_end_time")
    private LocalTime breakEndTime;
    
    @Column(name = "notes")
    private String notes;
    
    @Column(name = "is_recurring", nullable = false)
    private Boolean isRecurring = false;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "recurring_type")
    private RecurringType recurringType;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
    
    // Enums
    public enum ScheduleStatus {
        AVAILABLE, UNAVAILABLE, BLOCKED, HOLIDAY
    }
    
    public enum RecurringType {
        DAILY, WEEKLY, MONTHLY
    }
    
    // Constructors
    public DoctorSchedule() {}
    
    public DoctorSchedule(Doctor doctor, LocalDate scheduleDate, LocalTime startTime, LocalTime endTime) {
        this.doctor = doctor;
        this.scheduleDate = scheduleDate;
        this.startTime = startTime;
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
            status = ScheduleStatus.AVAILABLE;
        }
        if (slotDurationMinutes == null) {
            slotDurationMinutes = 30;
        }
        if (maxPatientsPerSlot == null) {
            maxPatientsPerSlot = 1;
        }
        if (isRecurring == null) {
            isRecurring = false;
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
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
    
    public LocalDate getScheduleDate() {
        return scheduleDate;
    }
    
    public void setScheduleDate(LocalDate scheduleDate) {
        this.scheduleDate = scheduleDate;
    }
    
    public LocalTime getStartTime() {
        return startTime;
    }
    
    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }
    
    public LocalTime getEndTime() {
        return endTime;
    }
    
    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }
    
    public Integer getSlotDurationMinutes() {
        return slotDurationMinutes;
    }
    
    public void setSlotDurationMinutes(Integer slotDurationMinutes) {
        this.slotDurationMinutes = slotDurationMinutes;
    }
    
    public Integer getMaxPatientsPerSlot() {
        return maxPatientsPerSlot;
    }
    
    public void setMaxPatientsPerSlot(Integer maxPatientsPerSlot) {
        this.maxPatientsPerSlot = maxPatientsPerSlot;
    }
    
    public ScheduleStatus getStatus() {
        return status;
    }
    
    public void setStatus(ScheduleStatus status) {
        this.status = status;
    }
    
    public LocalTime getBreakStartTime() {
        return breakStartTime;
    }
    
    public void setBreakStartTime(LocalTime breakStartTime) {
        this.breakStartTime = breakStartTime;
    }
    
    public LocalTime getBreakEndTime() {
        return breakEndTime;
    }
    
    public void setBreakEndTime(LocalTime breakEndTime) {
        this.breakEndTime = breakEndTime;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
    
    public Boolean getIsRecurring() {
        return isRecurring;
    }
    
    public void setIsRecurring(Boolean isRecurring) {
        this.isRecurring = isRecurring;
    }
    
    public RecurringType getRecurringType() {
        return recurringType;
    }
    
    public void setRecurringType(RecurringType recurringType) {
        this.recurringType = recurringType;
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
        return "DoctorSchedule{" +
                "id=" + id +
                ", scheduleDate=" + scheduleDate +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", status=" + status +
                ", slotDurationMinutes=" + slotDurationMinutes +
                ", isActive=" + isActive +
                '}';
    }
}
