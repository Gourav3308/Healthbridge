-- Fix admin password with correct BCrypt hash for 'admin123'
USE healthprj;

-- Delete existing admin
DELETE FROM admins WHERE email = 'adminhealth@gmail.com';

-- Insert admin with correct password hash
-- This hash is for password 'admin123' using BCrypt
INSERT INTO admins (email, password, first_name, last_name, is_active) 
VALUES ('adminhealth@gmail.com', '$2a$10$N.zmdr9k7uOCQb0bKt6l2uARlRMhWQo1xXzAhI5wXGGZYhBp5b6Gq', 'Admin', 'Health', true);

-- Verify the insertion
SELECT id, email, first_name, last_name, is_active FROM admins;
