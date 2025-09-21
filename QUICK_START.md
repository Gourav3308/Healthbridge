# 🚀 Healthbridge Quick Start Guide

## ✅ Prerequisites Verified
- ✅ Java 23 (installed)
- ✅ Node.js v22.18.0 (installed)  
- ✅ MySQL 8.0.42 (installed)

## 📋 Setup Steps

### Step 1: Database Setup

**Option A: Using MySQL Command Line**
```cmd
# Connect to MySQL (you'll be prompted for password)
mysql -u root -p

# Create database
CREATE DATABASE IF NOT EXISTS healthprj;

# Import schema
USE healthprj;
SOURCE database/schema.sql;

# Exit MySQL
EXIT;
```

**Option B: Using MySQL Workbench or phpMyAdmin**
1. Open your MySQL GUI tool
2. Create a new database named `healthprj`
3. Import the file `database/schema.sql`

### Step 2: Update Database Configuration (if needed)

If your MySQL credentials are different, update `backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/healthprj
    username: root
    password: YOUR_MYSQL_PASSWORD  # Change this if different
```

### Step 3: Start Backend (Spring Boot)

**Option A: Using the batch file (easiest)**
```cmd
# Double-click start-backend.bat
# OR run from command line:
start-backend.bat
```

**Option B: Manual command**
```cmd
cd backend
mvnw.cmd spring-boot:run
```

Wait for the message: `Started HealthbridgeApplication in X.XXX seconds`

### Step 4: Start Frontend (Angular)

**Option A: Using the batch file (easiest)**
```cmd
# Double-click start-frontend.bat
# OR run from command line:
start-frontend.bat
```

**Option B: Manual commands**
```cmd
cd frontend
npm install
npm start
```

Wait for the message: `Angular Live Development Server is listening on localhost:4200`

## 🌐 Access the Application

### Frontend Application
- **URL**: http://localhost:4200
- **Admin Login**: adminhealth@gmail.com / admin123
- **Patient/Doctor**: Must register through the application

### Backend API
- **URL**: http://localhost:8080/api
- **Health Check**: http://localhost:8080/api/auth/check-email?email=test@example.com

## 🎯 What You Can Do Now

### 1. Register as a Patient
- Go to http://localhost:4200
- Click "Register" → Select "Patient"
- Fill in your details and register
- You'll be automatically logged in

### 2. Register as a Doctor
- Click "Register" → Select "Doctor"
- Fill in professional details (license, specialization, etc.)
- Submit application (requires admin approval)

### 3. Admin Approval (for Doctors)
- Login as admin: adminhealth@gmail.com / admin123
- Go to Admin Dashboard
- Approve pending doctor registrations

### 4. Book Appointments
- Login as a patient
- Search for doctors
- Book appointments with approved doctors

## 🔧 Troubleshooting

### Backend Won't Start
1. **Check Java Version**: `java -version` (should be 17+)
2. **Check Port 8080**: Make sure no other application is using port 8080
3. **Database Connection**: Verify MySQL is running and credentials are correct
4. **View Logs**: Check the console output for error messages

### Frontend Won't Start
1. **Check Node.js**: `node --version` (should be 18+)
2. **Check Port 4200**: Make sure no other Angular app is running
3. **Clear Cache**: Delete `node_modules` and run `npm install` again
4. **Dependencies**: Run `npm install` in the frontend directory

### Database Issues
1. **MySQL Not Running**: Start MySQL service
2. **Wrong Password**: Update `application.yml` with correct credentials
3. **Database Doesn't Exist**: Create `healthprj` database manually
4. **Schema Not Imported**: Import `database/schema.sql`

### Common Error Solutions

**"Port 8080 already in use"**
- Stop other Spring Boot applications
- Or change port in `application.yml`: `server.port: 8081`

**"Access denied for user 'root'"**
- Check MySQL password
- Update `application.yml` with correct credentials

**"Cannot GET /"**
- Make sure frontend is running on port 4200
- Backend should be on port 8080

## 📱 Application Features

### ✅ Implemented Features
- User registration (Patient/Doctor)
- Admin approval workflow
- JWT authentication
- Appointment booking
- Doctor search
- Professional UI/UX

### 🚀 Ready to Use
- All APIs are functional
- Database schema is complete
- Frontend is responsive
- Security is implemented

## 🎉 Success Indicators

When everything is working correctly, you should see:

1. **Backend Console**: "Started HealthbridgeApplication"
2. **Frontend Console**: "Angular Live Development Server is listening"
3. **Browser**: Healthbridge homepage loads at http://localhost:4200
4. **Database**: Tables created in `healthprj` database

## 📞 Need Help?

If you encounter any issues:
1. Check the error messages in console
2. Verify all prerequisites are installed
3. Ensure MySQL is running
4. Check that ports 8080 and 4200 are available

The application is now ready for use! 🎊
