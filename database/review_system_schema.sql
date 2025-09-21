-- Review System Schema Updates for Healthbridge
-- This script updates the existing schema to support the new review system

USE healthprj;

-- Drop the old doctor_reviews table if it exists
DROP TABLE IF EXISTS doctor_reviews;

-- Create the new reviews table
CREATE TABLE reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    doctor_id BIGINT NOT NULL,
    patient_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    UNIQUE KEY unique_doctor_patient_active (doctor_id, patient_id, is_active)
);

-- Create indexes for better performance
CREATE INDEX idx_reviews_doctor ON reviews(doctor_id);
CREATE INDEX idx_reviews_patient ON reviews(patient_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_active ON reviews(is_active);
CREATE INDEX idx_reviews_created ON reviews(created_at);

-- Insert some sample reviews for testing (optional)
-- Note: These will only work if you have existing doctors and patients in your database

-- Sample review data (uncomment if you want test data)
/*
INSERT INTO reviews (doctor_id, patient_id, rating, comment) VALUES
(1, 1, 5, 'Excellent doctor! Very professional and caring. Highly recommended.'),
(1, 2, 4, 'Good experience overall. The doctor was knowledgeable and explained everything clearly.'),
(2, 1, 5, 'Outstanding service. Dr. was very thorough and took time to answer all my questions.'),
(2, 3, 3, 'Average experience. The consultation was okay but felt a bit rushed.');
*/
