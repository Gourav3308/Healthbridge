# 🏥 Healthbridge - Digital Healthcare Platform

<div align="center">
  <img src="https://img.shields.io/badge/Angular-16.2.0-red?style=for-the-badge&logo=angular" alt="Angular">
  <img src="https://img.shields.io/badge/Spring%20Boot-3.1.5-green?style=for-the-badge&logo=spring" alt="Spring Boot">
  <img src="https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql" alt="MySQL">
  <img src="https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java" alt="Java">
  <img src="https://img.shields.io/badge/TypeScript-5.1.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
</div>

<div align="center">
  <h3>🚀 Modern Healthcare Management System</h3>
  <p>A comprehensive digital platform connecting patients with healthcare providers, featuring appointment booking, prescription management, and secure communication.</p>
</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [📱 User Roles](#-user-roles)
- [🔧 Configuration](#-configuration)
- [📊 Database Schema](#-database-schema)
- [🔒 Security Features](#-security-features)
- [🌐 API Documentation](#-api-documentation)
- [🚀 Deployment](#-deployment)
- [📝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🏥 **Patient Features**
- **User Registration & Authentication** - Secure account creation with JWT tokens
- **Doctor Search & Discovery** - Browse doctors by specialization, location, and availability
- **Appointment Booking** - Easy scheduling with real-time availability
- **Appointment Management** - View, reschedule, and cancel appointments
- **Profile Management** - Update personal information and medical history
- **Review System** - Rate and review doctors after appointments
- **OAuth2 Integration** - Quick login with Google accounts

### 👨‍⚕️ **Doctor Features**
- **Professional Registration** - Detailed profile setup with credentials verification
- **Availability Management** - Set working hours and days
- **Appointment Dashboard** - Manage incoming and scheduled appointments
- **Patient Management** - View patient history and medical records
- **Prescription Management** - Digital prescription creation and management
- **Profile Customization** - Professional profile with specializations
- **Earnings Tracking** - Monitor consultation fees and payments

### 👨‍💼 **Admin Features**
- **Doctor Verification** - Approve/reject doctor registrations
- **User Management** - Manage patients and doctors
- **Platform Analytics** - System statistics and monitoring
- **Content Management** - Manage medical information and categories
- **Security Oversight** - Monitor system security and user activities

### 💳 **Payment Integration**
- **Razorpay Integration** - Secure payment processing
- **Multiple Payment Methods** - Credit cards, UPI, net banking
- **Payment History** - Track all transactions

---

## 🛠️ Tech Stack

### **Frontend**
- **Angular 16.2.0** - Modern web framework
- **Angular Material** - UI component library
- **Bootstrap 5.3.0** - Responsive design framework
- **TypeScript 5.1.0** - Type-safe JavaScript
- **RxJS 7.8.0** - Reactive programming

### **Backend**
- **Spring Boot 3.1.5** - Java application framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database abstraction layer
- **Spring Boot OAuth2** - Social login integration
- **JWT (JSON Web Tokens)** - Stateless authentication
- **ModelMapper** - Object mapping utility

### **Database**
- **MySQL 8.0** - Relational database management system
- **JPA/Hibernate** - Object-relational mapping

### **Additional Tools**
- **Maven** - Build automation and dependency management
- **Razorpay Java SDK** - Payment gateway integration
- **Commons IO** - File upload utilities
- **Spring Boot Mail** - Email notifications

---

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Angular)     │◄──►│   (Spring Boot) │◄──►│   (MySQL)       │
│   Port: 4200    │    │   Port: 8081    │    │   Port: 3306    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   OAuth2        │    │   JWT Security  │    │   File Storage  │
│   (Google)      │    │   (Authentication)│    │   (Uploads)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **System Components**
1. **Presentation Layer** - Angular frontend with responsive UI
2. **Business Logic Layer** - Spring Boot REST API
3. **Data Access Layer** - JPA repositories and MySQL
4. **Security Layer** - JWT authentication and OAuth2
5. **Integration Layer** - Payment gateway and email services

---

## 🚀 Quick Start

### **Prerequisites**
- Java 17 or higher
- Node.js 18+ and npm
- MySQL 8.0+
- Maven 3.6+

### **1. Clone the Repository**
```bash
git clone https://github.com/Gourav3308/Healthbridge.git
cd Healthbridge
```

### **2. Database Setup**
```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE healthprj;
USE healthprj;

# Import schema
mysql -u root -p healthprj < database/schema.sql
```

### **3. Backend Setup**
```bash
cd backend

# Update database credentials in application.yml
# Edit: src/main/resources/application.yml
# Update: datasource.username and datasource.password

# Build and run
mvn clean install
mvn spring-boot:run
```

Backend will be available at: `http://localhost:8081`

### **4. Frontend Setup**
```bash
cd frontend

# Install dependencies
npm install

# Update API endpoint in environment files
# Edit: src/environments/environment.ts
# Update: apiUrl to match your backend URL

# Start development server
ng serve
```

Frontend will be available at: `http://localhost:4200`

### **5. Quick Test**
1. Visit `http://localhost:4200`
2. Register as a patient or doctor
3. Admin login: `adminhealth@gmail.com` / `admin123`

---

## 📱 User Roles

### **🔐 Default Admin Account**
- **Email**: `adminhealth@gmail.com`
- **Password**: `admin123`
- **Access**: Full platform management

### **👤 Patient Account**
- **Registration**: Public registration available
- **Access**: Book appointments, view doctors, manage profile
- **Verification**: Email verification required

### **👨‍⚕️ Doctor Account**
- **Registration**: Professional registration with credentials
- **Verification**: Admin approval required before activation
- **Access**: Manage appointments, view patients, create prescriptions

---

## 🔧 Configuration

### **Environment Variables**

#### Backend Configuration (`application.yml`)
```yaml
# Database
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/healthprj
    username: your_username
    password: your_password

# JWT
jwt:
  secret: your-secret-key
  expiration: 86400000

# Email (Gmail)
spring:
  mail:
    username: your-email@gmail.com
    password: your-app-password

# OAuth2 (Google)
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: your-google-client-id
            client-secret: your-google-client-secret

# Razorpay
razorpay:
  key:
    id: your-razorpay-key-id
    secret: your-razorpay-secret
```

#### Frontend Configuration (`environment.ts`)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081/api',
  razorpayKey: 'your-razorpay-key-id'
};
```

---

## 📊 Database Schema

### **Core Tables**
- **users** - Base user information (patients, doctors, admins)
- **patients** - Extended patient profile and medical history
- **doctors** - Professional doctor information and credentials
- **appointments** - Appointment scheduling and management
- **doctor_reviews** - Patient reviews and ratings
- **doctor_availability** - Doctor working hours and availability

### **Key Relationships**
```
users (1:1) patients
users (1:1) doctors
patients (1:N) appointments
doctors (1:N) appointments
doctors (1:N) doctor_availability
```

---

## 🔒 Security Features

### **Authentication & Authorization**
- **JWT Tokens** - Stateless authentication with 24-hour expiration
- **Role-Based Access Control** - PATIENT, DOCTOR, ADMIN roles
- **OAuth2 Integration** - Google social login
- **Password Encryption** - BCrypt hashing

### **Data Protection**
- **CORS Configuration** - Cross-origin request security
- **Input Validation** - Server-side validation for all inputs
- **SQL Injection Prevention** - JPA/Hibernate parameterized queries
- **File Upload Security** - Type and size validation

### **API Security**
- **Rate Limiting** - Request throttling
- **Secure Headers** - CSRF protection and security headers
- **Request Logging** - Audit trail for security monitoring

---

## 🌐 API Documentation

### **Authentication Endpoints**
```
POST /api/auth/login          - User login
POST /api/auth/register       - User registration
POST /api/auth/refresh        - Token refresh
POST /api/auth/oauth2/google  - Google OAuth2 login
```

### **Patient Endpoints**
```
GET  /api/patients/profile    - Get patient profile
PUT  /api/patients/profile    - Update patient profile
GET  /api/patients/doctors    - Search doctors
POST /api/patients/appointments - Book appointment
```

### **Doctor Endpoints**
```
GET  /api/doctors/profile     - Get doctor profile
PUT  /api/doctors/profile     - Update doctor profile
GET  /api/doctors/appointments - Get doctor appointments
PUT  /api/doctors/appointments/:id - Update appointment status
```

### **Admin Endpoints**
```
GET  /api/admin/doctors       - Get all doctors
PUT  /api/admin/doctors/:id/approve - Approve doctor
GET  /api/admin/statistics    - Platform statistics
```

---

## 🚀 Deployment

### **Production Deployment Options**

#### **Option 1: Render (Recommended)**
1. **Backend Deployment**:
   - Connect GitHub repository to Render
   - Set build command: `mvn clean install`
   - Set start command: `java -jar target/healthbridge-backend-1.0.0.jar`
   - Configure environment variables

2. **Frontend Deployment**:
   - Create new Static Site on Render
   - Connect to your repository
   - Set build command: `cd frontend && npm install && npm run build`
   - Set publish directory: `frontend/dist`

#### **Option 2: Railway**
1. **Backend Deployment**:
   - Connect GitHub repository to Railway
   - Railway will auto-detect Spring Boot
   - Configure database and environment variables

2. **Frontend Deployment**:
   - Deploy as separate service
   - Use static hosting with build configuration

### **Environment Variables for Production**
```bash
# Database
DATABASE_URL=mysql://username:password@host:port/database

# JWT
JWT_SECRET=your-production-secret-key

# Email
MAIL_USERNAME=your-production-email
MAIL_PASSWORD=your-production-password

# OAuth2
GOOGLE_CLIENT_ID=your-production-google-client-id
GOOGLE_CLIENT_SECRET=your-production-google-client-secret

# Razorpay
RAZORPAY_KEY_ID=your-production-razorpay-key
RAZORPAY_SECRET=your-production-razorpay-secret
```

---

## 📝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**
- Follow Angular and Spring Boot best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Support

For support and questions:
- **Email**: healthbridge13012002@gmail.com
- **Issues**: [GitHub Issues](https://github.com/Gourav3308/Healthbridge/issues)
- **Documentation**: Check the `docs/` folder for detailed guides

---

## 🙏 Acknowledgments

- **Spring Boot Team** - For the excellent framework
- **Angular Team** - For the powerful frontend framework
- **Razorpay** - For payment integration
- **Google** - For OAuth2 authentication
- **MySQL** - For reliable database management

---

<div align="center">
  <p>Made with ❤️ for better healthcare accessibility</p>
  <p><strong>Healthbridge</strong> - Connecting Healthcare, Building Trust</p>
</div>