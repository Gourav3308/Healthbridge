-- Add cancelled_by field to appointments table
-- This field tracks who cancelled the appointment: "PATIENT" or "DOCTOR"

USE healthprj;

-- Add the cancelled_by column
ALTER TABLE appointments ADD COLUMN cancelled_by VARCHAR(20) NULL;

-- Add an index for better query performance
CREATE INDEX idx_appointments_cancelled_by ON appointments(cancelled_by);

-- Update existing cancelled appointments with default values
-- For appointments with cancellation_reason, assume they were cancelled by patient
-- (since doctor cancellations are new feature)
UPDATE appointments 
SET cancelled_by = 'PATIENT' 
WHERE status = 'CANCELLED' AND cancelled_by IS NULL;

-- Show the updated schema
DESCRIBE appointments;
