package com.healthbridge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.healthbridge.entity.Appointment;
import com.healthbridge.entity.Doctor;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    public void sendDoctorApprovalEmail(Doctor doctor) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            // For testing purposes, send to test email
            message.setTo("saurabshubham903@gmail.com");
            // Also include the doctor's email for verification
            message.setCc(doctor.getEmail());
            message.setFrom("healthbridge13012002@gmail.com");
            message.setSubject("🎉 Congratulations! Your HealthBridge Application has been Approved");
            
            String emailBody = String.format(
                "Dear Dr. %s %s,\n\n" +
                "🎉 Congratulations! We are thrilled to inform you that your application to join HealthBridge has been approved!\n\n" +
                "Welcome to the HealthBridge family! 🏥\n\n" +
                "Here are your account details:\n" +
                "✅ Name: Dr. %s %s\n" +
                "✅ Email: %s\n" +
                "✅ Specialization: %s\n" +
                "✅ License Number: %s\n" +
                "✅ Approval Date: %s\n\n" +
                "What's Next?\n" +
                "• You can now log in to your HealthBridge account using your registered email and password\n" +
                "• Set up your consultation schedule and availability\n" +
                "• Start accepting patient appointments\n" +
                "• Manage your profile and consultation fees\n\n" +
                "Getting Started:\n" +
                "1. Visit our platform: https://healthbridge-frontend-jj1.onrender.com\n" +
                "2. Log in with your registered credentials\n" +
                "3. Complete your profile setup\n" +
                "4. Configure your availability schedule\n\n" +
                "We're excited to have you on board and look forward to the positive impact you'll make in providing quality healthcare to our patients.\n\n" +
                "If you have any questions or need assistance, please don't hesitate to reach out to our support team.\n\n" +
                "Best regards,\n" +
                "The HealthBridge Team\n" +
                "Email: healthbridge13012002@gmail.com\n" +
                "Website: https://healthbridge-frontend-jj1.onrender.com\n\n" +
                "Thank you for choosing HealthBridge to serve patients and make healthcare accessible! 🌟",
                
                doctor.getFirstName(), doctor.getLastName(),
                doctor.getFirstName(), doctor.getLastName(),
                doctor.getEmail(),
                doctor.getSpecialization(),
                doctor.getLicenseNumber(),
                doctor.getApprovalDate() != null ? doctor.getApprovalDate().toString() : "Today"
            );
            
            message.setText(emailBody);
            mailSender.send(message);
            
            System.out.println("Approval email sent successfully to: " + doctor.getEmail());
            
        } catch (Exception e) {
            System.err.println("Failed to send approval email to: " + doctor.getEmail());
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    public void sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setFrom("healthbridge13012002@gmail.com");
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            
            System.out.println("Email sent successfully to: " + to);
            
        } catch (Exception e) {
            System.err.println("Failed to send email to: " + to);
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    public void sendAppointmentConfirmation(Appointment appointment) {
        try {
            System.out.println("=== EMAIL SERVICE DEBUG ===");
            System.out.println("Attempting to send appointment confirmation email...");
            System.out.println("Patient Email: " + appointment.getPatientEmail());
            System.out.println("Patient Name: " + appointment.getPatient().getFirstName() + " " + appointment.getPatient().getLastName());
            System.out.println("Doctor Name: " + appointment.getDoctor().getFirstName() + " " + appointment.getDoctor().getLastName());
            System.out.println("Appointment Date: " + appointment.getAppointmentDate());
            System.out.println("Appointment Time: " + appointment.getAppointmentTime());
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(appointment.getPatientEmail());
            message.setFrom("healthbridge13012002@gmail.com");
            message.setSubject("✅ Appointment Confirmed - HealthBridge Medical Center");
            
            String emailBody = String.format(
                "Dear %s %s,\n\n" +
                "🎉 Great news! Your appointment has been confirmed by your doctor.\n\n" +
                "📋 Appointment Details:\n" +
                "• Doctor: Dr. %s %s\n" +
                "• Date: %s\n" +
                "• Time: %s\n" +
                "• Specialization: %s\n" +
                "• Consultation Fee: Rs.%.2f\n\n" +
                "📝 Important Reminders:\n" +
                "• Please arrive 15 minutes before your scheduled appointment time\n" +
                "• Bring a valid ID and any relevant medical documents\n" +
                "• If you need to reschedule, please contact us at least 24 hours in advance\n\n" +
                "We look forward to providing you with excellent healthcare services!\n\n" +
                "Best regards,\n" +
                "🏥 HealthBridge Medical Center Team\n" +
                "📧 Email: healthbridge13012002@gmail.com\n" +
                "🌐 Website: https://healthbridge-frontend-jj1l.onrender.com\n\n" +
                "Thank you for choosing HealthBridge for your healthcare needs!",
                
                appointment.getPatient().getFirstName(), 
                appointment.getPatient().getLastName(),
                appointment.getDoctor().getFirstName(), 
                appointment.getDoctor().getLastName(),
                appointment.getAppointmentDate().toString(),
                appointment.getAppointmentTime().toString(),
                appointment.getDoctor().getSpecialization(),
                appointment.getConsultationFee()
            );
            
            message.setText(emailBody);
            
            System.out.println("Email message prepared. Attempting to send...");
            mailSender.send(message);
            
            System.out.println("✅ SUCCESS: Appointment confirmation email sent successfully to: " + appointment.getPatientEmail());
            System.out.println("=== EMAIL SERVICE DEBUG COMPLETE ===");
            
        } catch (Exception e) {
            System.err.println("❌ ERROR: Failed to send appointment confirmation email to: " + appointment.getPatientEmail());
            System.err.println("Error Type: " + e.getClass().getSimpleName());
            System.err.println("Error Message: " + e.getMessage());
            System.err.println("Full Error Details:");
            e.printStackTrace();
            
            // Log additional SMTP debugging info
            if (e.getMessage() != null) {
                if (e.getMessage().contains("Authentication failed")) {
                    System.err.println("🔐 SMTP AUTHENTICATION ISSUE: Check Gmail app password");
                } else if (e.getMessage().contains("Connection refused")) {
                    System.err.println("🌐 SMTP CONNECTION ISSUE: Check network connectivity");
                } else if (e.getMessage().contains("SSL")) {
                    System.err.println("🔒 SSL/TLS ISSUE: Check SSL configuration");
                }
            }
            
            // Re-throw the exception so the calling code can handle it
            throw new RuntimeException("Email sending failed: " + e.getMessage(), e);
        }
    }
    
    public void sendAppointmentRejection(Appointment appointment) {
        try {
            System.out.println("=== APPOINTMENT REJECTION EMAIL DEBUG ===");
            System.out.println("Sending appointment rejection email to: " + appointment.getPatientEmail());
            System.out.println("Patient Name: " + appointment.getPatient().getFirstName() + " " + appointment.getPatient().getLastName());
            System.out.println("Doctor Name: " + appointment.getDoctor().getFirstName() + " " + appointment.getDoctor().getLastName());
            System.out.println("Appointment Date: " + appointment.getAppointmentDate());
            System.out.println("Appointment Time: " + appointment.getAppointmentTime());
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(appointment.getPatientEmail());
            message.setFrom("healthbridge13012002@gmail.com");
            message.setSubject("❌ Appointment Update - HealthBridge Medical Center");
            
            String emailBody = String.format(
                "Dear %s %s,\n\n" +
                "We hope this message finds you well. We are writing to inform you about an update regarding your appointment request.\n\n" +
                "📋 Appointment Details:\n" +
                "• Doctor: Dr. %s %s\n" +
                "• Date: %s\n" +
                "• Time: %s\n" +
                "• Specialization: %s\n" +
                "• Consultation Fee: Rs.%.2f\n\n" +
                "❌ Status Update:\n" +
                "Unfortunately, we are unable to accommodate your appointment request at the requested time. This could be due to:\n" +
                "• Doctor's schedule changes\n" +
                "• Emergency cases requiring immediate attention\n" +
                "• Unforeseen circumstances\n\n" +
                "🔄 Next Steps:\n" +
                "• Please log in to your HealthBridge account to reschedule your appointment\n" +
                "• You can choose from available time slots that work for you\n" +
                "• Your payment will be refunded within 3-5 business days\n" +
                "• If you need assistance, please contact our support team\n\n" +
                "We sincerely apologize for any inconvenience this may cause and appreciate your understanding.\n\n" +
                "Thank you for choosing HealthBridge for your healthcare needs.\n\n" +
                "Best regards,\n" +
                "🏥 HealthBridge Medical Center Team\n" +
                "📧 Email: healthbridge13012002@gmail.com\n" +
                "🌐 Website: https://healthbridge-frontend-jj1l.onrender.com\n\n" +
                "We look forward to serving you in the future!",
                
                appointment.getPatient().getFirstName(), 
                appointment.getPatient().getLastName(),
                appointment.getDoctor().getFirstName(), 
                appointment.getDoctor().getLastName(),
                appointment.getAppointmentDate().toString(),
                appointment.getAppointmentTime().toString(),
                appointment.getDoctor().getSpecialization(),
                appointment.getConsultationFee()
            );
            
            message.setText(emailBody);
            
            System.out.println("Email message prepared. Attempting to send...");
            mailSender.send(message);
            
            System.out.println("✅ SUCCESS: Appointment rejection email sent successfully to: " + appointment.getPatientEmail());
            System.out.println("=== APPOINTMENT REJECTION EMAIL DEBUG COMPLETE ===");
            
        } catch (Exception e) {
            System.err.println("❌ ERROR: Failed to send appointment rejection email to: " + appointment.getPatientEmail());
            System.err.println("Error Type: " + e.getClass().getSimpleName());
            System.err.println("Error Message: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Email sending failed: " + e.getMessage(), e);
        }
    }
    
    public void sendPasswordResetEmail(String email, String resetLink, String userName) {
        try {
            System.out.println("=== PASSWORD RESET EMAIL DEBUG ===");
            System.out.println("Sending password reset email to: " + email);
            System.out.println("User Name: " + userName);
            System.out.println("Reset Link: " + resetLink);
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setFrom("healthbridge13012002@gmail.com");
            message.setSubject("🔐 Password Reset Request - HealthBridge Medical Center");
            
            String emailBody = String.format(
                "Dear %s,\n\n" +
                "You have requested to reset your password for your HealthBridge account.\n\n" +
                "To reset your password, please click on the link below:\n" +
                "%s\n\n" +
                "📋 Important Information:\n" +
                "• This link will expire in 1 hour for security reasons\n" +
                "• If you didn't request this password reset, please ignore this email\n" +
                "• Your password will remain unchanged until you create a new one\n\n" +
                "🔒 Security Tips:\n" +
                "• Use a strong, unique password\n" +
                "• Never share your password with anyone\n" +
                "• If you suspect unauthorized access, contact us immediately\n\n" +
                "If you're having trouble clicking the link, copy and paste it into your browser.\n\n" +
                "Best regards,\n" +
                "🏥 HealthBridge Medical Center Team\n" +
                "📧 Email: healthbridge13012002@gmail.com\n" +
                "🌐 Website: https://healthbridge-frontend-jj1l.onrender.com\n\n" +
                "Thank you for choosing HealthBridge for your healthcare needs!",
                
                userName,
                resetLink
            );
            
            message.setText(emailBody);
            
            System.out.println("Password reset email prepared. Attempting to send...");
            mailSender.send(message);
            
            System.out.println("✅ SUCCESS: Password reset email sent successfully to: " + email);
            System.out.println("=== PASSWORD RESET EMAIL DEBUG COMPLETE ===");
            
        } catch (Exception e) {
            System.err.println("❌ ERROR: Failed to send password reset email to: " + email);
            System.err.println("Error Type: " + e.getClass().getSimpleName());
            System.err.println("Error Message: " + e.getMessage());
            System.err.println("Full Error Details:");
            e.printStackTrace();
            
            // Log additional SMTP debugging info
            if (e.getMessage() != null) {
                if (e.getMessage().contains("Authentication failed")) {
                    System.err.println("🔐 SMTP AUTHENTICATION ISSUE: Check Gmail app password");
                } else if (e.getMessage().contains("Connection refused")) {
                    System.err.println("🌐 SMTP CONNECTION ISSUE: Check network connectivity");
                } else if (e.getMessage().contains("SSL")) {
                    System.err.println("🔒 SSL/TLS ISSUE: Check SSL configuration");
                }
            }
            
            // Re-throw the exception so the calling code can handle it
            throw new RuntimeException("Password reset email sending failed: " + e.getMessage(), e);
        }
    }
}