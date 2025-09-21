-- Updated Healthbridge Database Schema (Without Users Table)
-- Database: healthprj

-- Drop existing tables if they exist
DROP TABLE IF EXISTS doctor_reviews;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS doctor_availability;
DROP TABLE IF EXISTS doctors;
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS specializations;

-- Patients table (now the main user table)
CREATE TABLE patients (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    date_of_birth DATE,
    gender ENUM('MALE', 'FEMALE', 'OTHER'),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    emergency_contact VARCHAR(15),
    blood_group VARCHAR(5),
    medical_history TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Doctors table (now the main doctor user table)
CREATE TABLE doctors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    license_number VARCHAR(50) UNIQUE NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    qualification TEXT NOT NULL,
    experience_years INT NOT NULL,
    consultation_fee DECIMAL(10,2) NOT NULL,
    about TEXT,
    hospital_affiliation VARCHAR(200),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    is_approved BOOLEAN DEFAULT FALSE,
    approval_date TIMESTAMP NULL,
    approved_by VARCHAR(255) NULL,
    profile_image VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Admins table (simple admin table)
CREATE TABLE admins (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Doctor Availability table
CREATE TABLE doctor_availability (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    doctor_id BIGINT NOT NULL,
    day_of_week ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY') NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
    UNIQUE KEY unique_doctor_day (doctor_id, day_of_week)
);

-- Appointments table
CREATE TABLE appointments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status ENUM('SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW') DEFAULT 'SCHEDULED',
    reason_for_visit TEXT,
    notes TEXT,
    prescription TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
    UNIQUE KEY unique_doctor_datetime (doctor_id, appointment_date, appointment_time)
);

-- Doctor Reviews table
CREATE TABLE doctor_reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,
    appointment_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
    UNIQUE KEY unique_patient_appointment (patient_id, appointment_id)
);

-- Medical Specializations lookup table
CREATE TABLE specializations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- Insert default admin user
INSERT INTO admins (email, password, first_name, last_name) 
VALUES ('adminhealth@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'Health');

-- Insert common specializations
INSERT INTO specializations (name, description) VALUES
('Cardiology', 'Heart and cardiovascular system specialists'),
('Dermatology', 'Skin, hair, and nail disorders'),
('Endocrinology', 'Hormone and metabolic disorders'),
('Gastroenterology', 'Digestive system disorders'),
('General Medicine', 'Primary care and general health'),
('Gynecology', 'Women\'s reproductive health'),
('Neurology', 'Brain and nervous system disorders'),
('Oncology', 'Cancer treatment and care'),
('Orthopedics', 'Bone, joint, and muscle disorders'),
('Pediatrics', 'Children\'s health and development'),
('Psychiatry', 'Mental health and behavioral disorders'),
('Pulmonology', 'Lung and respiratory system'),
('Urology', 'Urinary system and male reproductive health'),
('Ophthalmology', 'Eye and vision care'),
('ENT', 'Ear, nose, and throat disorders');

-- Create indexes for better performance
CREATE INDEX idx_patients_email ON patients(email);
CREATE INDEX idx_doctors_email ON doctors(email);
CREATE INDEX idx_doctors_specialization ON doctors(specialization);
CREATE INDEX idx_doctors_approved ON doctors(is_approved);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX idx_appointments_status ON appointments(status);
