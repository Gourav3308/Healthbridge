# Healthbridge Setup Instructions

## Prerequisites Installation

### 1. Install Java 17+ (Required for Spring Boot)
- Download from: https://adoptium.net/
- Choose JDK 17 or later
- Add to PATH environment variable

### 2. Install Maven (Required for Spring Boot)

**Option A: Download and Install Manually**
1. Download Maven from: https://maven.apache.org/download.cgi
2. Extract to a folder (e.g., `C:\apache-maven-3.9.6`)
3. Add Maven to PATH:
   - Open System Properties → Advanced → Environment Variables
   - Add to PATH: `C:\apache-maven-3.9.6\bin`
   - Add MAVEN_HOME: `C:\apache-maven-3.9.6`

**Option B: Use Chocolatey (Easier)**
```cmd
# Install Chocolatey first (if not installed)
# Run as Administrator in PowerShell:
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Then install Maven
choco install maven
```

**Option C: Use Maven Wrapper (No Installation Required)**
```cmd
# Use the Maven wrapper that comes with the project
.\mvnw spring-boot:run
```

### 3. Install Node.js (Required for Angular)
- Download from: https://nodejs.org/
- Choose LTS version (18.x or later)

### 4. Install MySQL (Required for Database)
- Download from: https://dev.mysql.com/downloads/installer/
- Or use XAMPP: https://www.apachefriends.org/

## Quick Start (Using Maven Wrapper - No Maven Installation Needed)

### 1. Setup Database
```sql
-- Create database in MySQL
CREATE DATABASE healthprj;

-- Import schema
mysql -u root -p healthprj < database/schema.sql
```

### 2. Start Backend (Spring Boot)
```cmd
cd backend
# Use Maven wrapper (no Maven installation needed)
mvnw.cmd spring-boot:run
```

### 3. Start Frontend (Angular)
```cmd
cd frontend
npm install
npm start
```

### 4. Access Application
- Frontend: http://localhost:4200
- Backend API: http://localhost:8080/api
- Admin Login: adminhealth@gmail.com / admin123

## Alternative: Using IDE

### IntelliJ IDEA or Eclipse
1. Import the backend folder as a Maven project
2. Run the main class: `HealthbridgeApplication.java`

### VS Code
1. Install Java Extension Pack
2. Open backend folder
3. Run Spring Boot application

## Troubleshooting

### Maven Issues
- If `mvn` not found, use `.\mvnw.cmd` instead
- Ensure JAVA_HOME points to JDK 17+
- Check PATH includes Maven bin directory

### Database Issues
- Ensure MySQL is running
- Check credentials in application.yml
- Verify database `healthprj` exists

### Port Issues
- Backend (8080): Stop other Spring applications
- Frontend (4200): Stop other Angular applications
