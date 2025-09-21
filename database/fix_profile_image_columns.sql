-- Fix profile image column names in database
-- Run this script to update the database schema

-- Update patients table
ALTER TABLE patients 
CHANGE COLUMN profile_image profile_image_url LONGTEXT;

-- Update doctors table  
ALTER TABLE doctors 
CHANGE COLUMN profile_image profile_image_url LONGTEXT;

-- Verify the changes
DESCRIBE patients;
DESCRIBE doctors;
