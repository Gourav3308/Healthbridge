package com.healthbridge.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthbridge.entity.AppointmentSlot;
import com.healthbridge.entity.DoctorSchedule;
import com.healthbridge.repository.AppointmentSlotRepository;
import com.healthbridge.repository.DoctorScheduleRepository;

@Service
public class AppointmentSlotService {
    
    @Autowired
    private DoctorScheduleRepository scheduleRepository;
    
    @Autowired
    private AppointmentSlotRepository slotRepository;
    
    // Generate slots for a doctor's schedule
    public List<AppointmentSlot> generateSlotsForSchedule(DoctorSchedule schedule) {
        List<AppointmentSlot> slots = new ArrayList<>();
        
        LocalTime currentTime = schedule.getStartTime();
        LocalTime endTime = schedule.getEndTime();
        int slotDuration = schedule.getSlotDurationMinutes();
        
        while (currentTime.isBefore(endTime)) {
            LocalTime slotEndTime = currentTime.plusMinutes(slotDuration);
            
            // Skip if slot would exceed end time
            if (slotEndTime.isAfter(endTime)) {
                break;
            }
            
            // Skip break time if defined
            if (schedule.getBreakStartTime() != null && schedule.getBreakEndTime() != null) {
                if (!(currentTime.isBefore(schedule.getBreakStartTime()) || 
                      currentTime.isAfter(schedule.getBreakEndTime()))) {
                    currentTime = currentTime.plusMinutes(slotDuration);
                    continue;
                }
            }
            
            // Check if slot already exists
            boolean slotExists = slotRepository.findByDoctorIdAndSlotDateAndSlotTimeAndIsActive(
                schedule.getDoctor().getId(),
                schedule.getScheduleDate(),
                currentTime,
                true
            ).isPresent();
            
            if (!slotExists) {
                AppointmentSlot slot = new AppointmentSlot(
                    schedule.getDoctor(),
                    schedule,
                    schedule.getScheduleDate(),
                    currentTime,
                    slotEndTime
                );
                slot.setMaxCapacity(schedule.getMaxPatientsPerSlot());
                slots.add(slot);
            }
            
            currentTime = currentTime.plusMinutes(slotDuration);
        }
        
        return slots;
    }
    
    // Generate slots for all schedules of a doctor for a date range
    public void generateSlotsForDoctorDateRange(Long doctorId, LocalDate startDate, LocalDate endDate) {
        List<DoctorSchedule> schedules = scheduleRepository.findByDoctorIdAndDateRange(doctorId, startDate, endDate);
        
        for (DoctorSchedule schedule : schedules) {
            if (schedule.getStatus() == DoctorSchedule.ScheduleStatus.AVAILABLE) {
                List<AppointmentSlot> slots = generateSlotsForSchedule(schedule);
                slotRepository.saveAll(slots);
            }
        }
    }
    
    // Generate slots for the next 30 days for a doctor
    public void generateSlotsForNext30Days(Long doctorId) {
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = startDate.plusDays(30);
        generateSlotsForDoctorDateRange(doctorId, startDate, endDate);
    }
    
    // Create default schedule and slots for a doctor (for demo purposes)
    public void createDefaultScheduleForDoctor(Long doctorId) {
        // This method can be used to create a default schedule for doctors
        // For now, we'll create a simple 9 AM to 5 PM schedule for weekdays
        
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = startDate.plusDays(30);
        
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            // Skip weekends (Saturday = 6, Sunday = 7)
            if (date.getDayOfWeek().getValue() >= 6) {
                continue;
            }
            
            // Check if schedule already exists for this date
            List<DoctorSchedule> existingSchedules = scheduleRepository
                .findByDoctorIdAndScheduleDateAndIsActive(doctorId, date, true);
            
            if (existingSchedules.isEmpty()) {
                // Create morning schedule (9 AM to 1 PM)
                DoctorSchedule morningSchedule = new DoctorSchedule();
                morningSchedule.setDoctor(new com.healthbridge.entity.Doctor());
                morningSchedule.getDoctor().setId(doctorId);
                morningSchedule.setScheduleDate(date);
                morningSchedule.setStartTime(LocalTime.of(9, 0));
                morningSchedule.setEndTime(LocalTime.of(13, 0));
                morningSchedule.setSlotDurationMinutes(30);
                morningSchedule.setMaxPatientsPerSlot(1);
                morningSchedule.setStatus(DoctorSchedule.ScheduleStatus.AVAILABLE);
                
                scheduleRepository.save(morningSchedule);
                
                // Generate slots for morning schedule
                List<AppointmentSlot> morningSlots = generateSlotsForSchedule(morningSchedule);
                slotRepository.saveAll(morningSlots);
                
                // Create afternoon schedule (2 PM to 6 PM)
                DoctorSchedule afternoonSchedule = new DoctorSchedule();
                afternoonSchedule.setDoctor(new com.healthbridge.entity.Doctor());
                afternoonSchedule.getDoctor().setId(doctorId);
                afternoonSchedule.setScheduleDate(date);
                afternoonSchedule.setStartTime(LocalTime.of(14, 0));
                afternoonSchedule.setEndTime(LocalTime.of(18, 0));
                afternoonSchedule.setSlotDurationMinutes(30);
                afternoonSchedule.setMaxPatientsPerSlot(1);
                afternoonSchedule.setStatus(DoctorSchedule.ScheduleStatus.AVAILABLE);
                
                scheduleRepository.save(afternoonSchedule);
                
                // Generate slots for afternoon schedule
                List<AppointmentSlot> afternoonSlots = generateSlotsForSchedule(afternoonSchedule);
                slotRepository.saveAll(afternoonSlots);
            }
        }
    }
    
    // Clean up expired slots
    public void cleanupExpiredSlots() {
        LocalDate yesterday = LocalDate.now().minusDays(1);
        
        // You can implement cleanup logic here if needed
        // For example, mark old slots as inactive
    }
}
