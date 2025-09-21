package com.healthbridge.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthbridge.entity.AppointmentSlot;
import com.healthbridge.entity.DoctorSchedule;
import com.healthbridge.repository.AppointmentSlotRepository;
import com.healthbridge.repository.DoctorRepository;
import com.healthbridge.repository.DoctorScheduleRepository;
import com.healthbridge.service.AppointmentSlotService;

@RestController
@RequestMapping("/api/doctor-schedule")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:4201", "https://healthbridge-frontend-jj1.onrender.com"})
public class DoctorScheduleController {
    
    @Autowired
    private DoctorScheduleRepository scheduleRepository;
    
    @Autowired
    private AppointmentSlotRepository slotRepository;
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    @Autowired
    private AppointmentSlotService slotService;
    
    // Get available dates for a doctor (next 30 days)
    @GetMapping("/doctor/{doctorId}/available-dates")
    public ResponseEntity<?> getAvailableDates(@PathVariable Long doctorId) {
        try {
            LocalDate startDate = LocalDate.now();
            LocalDate endDate = startDate.plusDays(30);
            
            // Get all schedules for the doctor in the date range
            List<DoctorSchedule> schedules = scheduleRepository.findAvailableSchedules(doctorId, startDate);
            
            // Extract unique dates that have available slots
            List<LocalDate> availableDates = schedules.stream()
                .map(DoctorSchedule::getScheduleDate)
                .distinct()
                .filter(date -> {
                    // Check if there are available slots for this date
                    Long availableSlotCount = slotRepository.countAvailableSlots(doctorId, date);
                    return availableSlotCount > 0;
                })
                .sorted()
                .toList();
            
            return ResponseEntity.ok(Map.of(
                "doctorId", doctorId,
                "availableDates", availableDates,
                "totalDates", availableDates.size()
            ));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Failed to fetch available dates: " + e.getMessage()));
        }
    }
    
    // Get available time slots for a doctor on a specific date
    @GetMapping("/doctor/{doctorId}/available-slots")
    public ResponseEntity<?> getAvailableSlots(@PathVariable Long doctorId, 
                                             @RequestParam String date) {
        try {
            LocalDate slotDate = LocalDate.parse(date);
            
            // Check if the date is not in the past
            if (slotDate.isBefore(LocalDate.now())) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Cannot book appointments for past dates"));
            }
            
            // Get available slots
            List<AppointmentSlot> availableSlots = slotRepository.findAvailableSlots(doctorId, slotDate);
            
            // Convert to simple DTOs to avoid Hibernate lazy loading issues
            List<Map<String, Object>> slotDTOs = availableSlots.stream().map(slot -> {
                Map<String, Object> slotDTO = new HashMap<>();
                slotDTO.put("id", slot.getId());
                slotDTO.put("slotTime", slot.getSlotTime());
                slotDTO.put("endTime", slot.getEndTime());
                slotDTO.put("status", slot.getStatus());
                slotDTO.put("bookedCount", slot.getBookedCount());
                slotDTO.put("maxCapacity", slot.getMaxCapacity());
                slotDTO.put("isAvailable", slot.isAvailable());
                return slotDTO;
            }).toList();
            
            return ResponseEntity.ok(Map.of(
                "doctorId", doctorId,
                "date", date,
                "availableSlots", slotDTOs,
                "totalSlots", slotDTOs.size()
            ));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Failed to fetch available slots: " + e.getMessage()));
        }
    }
    
    // Initialize default schedule for a doctor (for demo/testing) - Public endpoint
    @PostMapping("/doctor/{doctorId}/initialize-schedule")
    public ResponseEntity<?> initializeDefaultSchedule(@PathVariable Long doctorId) {
        try {
            // Check if doctor exists
            if (!doctorRepository.existsById(doctorId)) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Doctor not found"));
            }
            
            // Create default schedule and slots
            slotService.createDefaultScheduleForDoctor(doctorId);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Default schedule and slots created for doctor " + doctorId,
                "scheduleCreated", "9 AM - 1 PM and 2 PM - 6 PM on weekdays for next 30 days"
            ));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Failed to initialize schedule: " + e.getMessage()));
        }
    }
    
    // Get doctor's schedule summary
    @GetMapping("/doctor/{doctorId}/schedule-summary")
    public ResponseEntity<?> getScheduleSummary(@PathVariable Long doctorId,
                                              @RequestParam(required = false) String startDate,
                                              @RequestParam(required = false) String endDate) {
        try {
            LocalDate start = startDate != null ? LocalDate.parse(startDate) : LocalDate.now();
            LocalDate end = endDate != null ? LocalDate.parse(endDate) : start.plusDays(7);
            
            List<DoctorSchedule> schedules = scheduleRepository.findByDoctorIdAndDateRange(doctorId, start, end);
            
            // Count total available slots
            long totalAvailableSlots = 0;
            for (LocalDate date = start; !date.isAfter(end); date = date.plusDays(1)) {
                totalAvailableSlots += slotRepository.countAvailableSlots(doctorId, date);
            }
            
            return ResponseEntity.ok(Map.of(
                "doctorId", doctorId,
                "dateRange", Map.of("start", start, "end", end),
                "schedules", schedules,
                "totalSchedules", schedules.size(),
                "totalAvailableSlots", totalAvailableSlots
            ));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Failed to fetch schedule summary: " + e.getMessage()));
        }
    }
}
