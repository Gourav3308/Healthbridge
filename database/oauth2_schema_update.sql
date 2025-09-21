-- Update Patient table to allow NULL password for OAuth2 users
ALTER TABLE patients MODIFY COLUMN password VARCHAR(255) NULL;

-- Update Doctor table to allow NULL password for OAuth2 users  
ALTER TABLE doctors MODIFY COLUMN password VARCHAR(255) NULL;

-- Add Google ID column to patients if it doesn't exist
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE table_name = 'patients' 
     AND table_schema = 'healthprj' 
     AND column_name = 'google_id') > 0,
    'SELECT 1',
    'ALTER TABLE patients ADD COLUMN google_id VARCHAR(255) UNIQUE'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add auth_provider column to patients if it doesn't exist
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE table_name = 'patients' 
     AND table_schema = 'healthprj' 
     AND column_name = 'auth_provider') > 0,
    'SELECT 1',
    'ALTER TABLE patients ADD COLUMN auth_provider VARCHAR(50) DEFAULT ''LOCAL'''
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add Google ID column to doctors if it doesn't exist
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE table_name = 'doctors' 
     AND table_schema = 'healthprj' 
     AND column_name = 'google_id') > 0,
    'SELECT 1',
    'ALTER TABLE doctors ADD COLUMN google_id VARCHAR(255) UNIQUE'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add auth_provider column to doctors if it doesn't exist
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE table_name = 'doctors' 
     AND table_schema = 'healthprj' 
     AND column_name = 'auth_provider') > 0,
    'SELECT 1',
    'ALTER TABLE doctors ADD COLUMN auth_provider VARCHAR(50) DEFAULT ''LOCAL'''
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Update existing users to have 'LOCAL' auth provider
UPDATE patients SET auth_provider = 'LOCAL' WHERE auth_provider IS NULL;
UPDATE doctors SET auth_provider = 'LOCAL' WHERE auth_provider IS NULL;