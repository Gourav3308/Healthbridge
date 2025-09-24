-- Add cancellation reason and cancelled_at fields to appointments table
-- This script adds the new fields for appointment cancellation tracking

ALTER TABLE appointments 
ADD COLUMN cancellation_reason TEXT,
ADD COLUMN cancelled_at TIMESTAMP;

-- Add index for better query performance
CREATE INDEX idx_appointments_cancelled_at ON appointments(cancelled_at);

-- Update existing cancelled appointments to have a default reason if they don't have one
UPDATE appointments 
SET cancellation_reason = 'Cancelled by patient' 
WHERE status = 'CANCELLED' AND cancellation_reason IS NULL;

COMMIT;
