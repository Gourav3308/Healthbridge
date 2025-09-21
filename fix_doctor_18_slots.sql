-- Fix for Dr. Sonu sah (ID: 18) - Generate appointment slots
-- This will create 30 days of available slots

-- First, create morning schedule (9 AM - 1 PM) for next 30 weekdays
INSERT INTO doctor_schedules (doctor_id, schedule_date, start_time, end_time, slot_duration_minutes, max_patients_per_slot, status, is_recurring, is_active, created_at, updated_at)
SELECT 
    18 as doctor_id,
    DATE_ADD(CURDATE(), INTERVAL seq DAY) as schedule_date,
    '09:00:00' as start_time,
    '13:00:00' as end_time,
    30 as slot_duration_minutes,
    1 as max_patients_per_slot,
    'AVAILABLE' as status,
    0 as is_recurring,
    1 as is_active,
    NOW() as created_at,
    NOW() as updated_at
FROM (
    SELECT 0 seq UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION
    SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION
    SELECT 20 UNION SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24 UNION SELECT 25 UNION SELECT 26 UNION SELECT 27 UNION SELECT 28 UNION SELECT 29
) seq_table
WHERE WEEKDAY(DATE_ADD(CURDATE(), INTERVAL seq DAY)) < 5  -- Monday=0 to Friday=4 (exclude weekends)
AND NOT EXISTS (
    SELECT 1 FROM doctor_schedules ds 
    WHERE ds.doctor_id = 18 
    AND ds.schedule_date = DATE_ADD(CURDATE(), INTERVAL seq DAY)
    AND ds.start_time = '09:00:00'
);

-- Create afternoon schedule (2 PM - 6 PM) for next 30 weekdays  
INSERT INTO doctor_schedules (doctor_id, schedule_date, start_time, end_time, slot_duration_minutes, max_patients_per_slot, status, is_recurring, is_active, created_at, updated_at)
SELECT 
    18 as doctor_id,
    DATE_ADD(CURDATE(), INTERVAL seq DAY) as schedule_date,
    '14:00:00' as start_time,
    '18:00:00' as end_time,
    30 as slot_duration_minutes,
    1 as max_patients_per_slot,
    'AVAILABLE' as status,
    0 as is_recurring,
    1 as is_active,
    NOW() as created_at,
    NOW() as updated_at
FROM (
    SELECT 0 seq UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION
    SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION
    SELECT 20 UNION SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24 UNION SELECT 25 UNION SELECT 26 UNION SELECT 27 UNION SELECT 28 UNION SELECT 29
) seq_table
WHERE WEEKDAY(DATE_ADD(CURDATE(), INTERVAL seq DAY)) < 5  -- Monday=0 to Friday=4 (exclude weekends)
AND NOT EXISTS (
    SELECT 1 FROM doctor_schedules ds 
    WHERE ds.doctor_id = 18 
    AND ds.schedule_date = DATE_ADD(CURDATE(), INTERVAL seq DAY)
    AND ds.start_time = '14:00:00'
);

-- Now generate appointment slots for morning schedules
INSERT INTO appointment_slots (doctor_id, schedule_id, slot_date, slot_time, end_time, status, booked_count, max_capacity, is_active, created_at, updated_at)
SELECT 
    ds.doctor_id,
    ds.id as schedule_id,
    ds.schedule_date,
    ADDTIME('09:00:00', SEC_TO_TIME(slot_seq.seq * 1800)) as slot_time,  -- 1800 seconds = 30 minutes
    ADDTIME('09:30:00', SEC_TO_TIME(slot_seq.seq * 1800)) as end_time,
    'AVAILABLE' as status,
    0 as booked_count,
    1 as max_capacity,
    1 as is_active,
    NOW() as created_at,
    NOW() as updated_at
FROM doctor_schedules ds
CROSS JOIN (
    SELECT 0 seq UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7
) slot_seq
WHERE ds.doctor_id = 18 
AND ds.start_time = '09:00:00'
AND ds.is_active = 1
AND ADDTIME('09:00:00', SEC_TO_TIME(slot_seq.seq * 1800)) < '13:00:00'
AND NOT EXISTS (
    SELECT 1 FROM appointment_slots aps 
    WHERE aps.doctor_id = 18 
    AND aps.slot_date = ds.schedule_date
    AND aps.slot_time = ADDTIME('09:00:00', SEC_TO_TIME(slot_seq.seq * 1800))
);

-- Generate appointment slots for afternoon schedules
INSERT INTO appointment_slots (doctor_id, schedule_id, slot_date, slot_time, end_time, status, booked_count, max_capacity, is_active, created_at, updated_at)
SELECT 
    ds.doctor_id,
    ds.id as schedule_id,
    ds.schedule_date,
    ADDTIME('14:00:00', SEC_TO_TIME(slot_seq.seq * 1800)) as slot_time,  -- 1800 seconds = 30 minutes
    ADDTIME('14:30:00', SEC_TO_TIME(slot_seq.seq * 1800)) as end_time,
    'AVAILABLE' as status,
    0 as booked_count,
    1 as max_capacity,
    1 as is_active,
    NOW() as created_at,
    NOW() as updated_at
FROM doctor_schedules ds
CROSS JOIN (
    SELECT 0 seq UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7
) slot_seq
WHERE ds.doctor_id = 18 
AND ds.start_time = '14:00:00'
AND ds.is_active = 1
AND ADDTIME('14:00:00', SEC_TO_TIME(slot_seq.seq * 1800)) < '18:00:00'
AND NOT EXISTS (
    SELECT 1 FROM appointment_slots aps 
    WHERE aps.doctor_id = 18 
    AND aps.slot_date = ds.schedule_date
    AND aps.slot_time = ADDTIME('14:00:00', SEC_TO_TIME(slot_seq.seq * 1800))
);

-- Verify the slots were created
SELECT 
    COUNT(*) as total_slots_created,
    MIN(slot_date) as first_available_date,
    MAX(slot_date) as last_available_date
FROM appointment_slots 
WHERE doctor_id = 18 AND is_active = 1 AND status = 'AVAILABLE';

-- Show sample of available slots for today and tomorrow
SELECT slot_date, slot_time, end_time, status 
FROM appointment_slots 
WHERE doctor_id = 18 
AND slot_date >= CURDATE() 
AND slot_date <= DATE_ADD(CURDATE(), INTERVAL 1 DAY)
AND is_active = 1 
ORDER BY slot_date, slot_time 
LIMIT 10;
