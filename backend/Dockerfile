# Use OpenJDK 17 as base image
FROM openjdk:17-jdk-slim

# Install Maven
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy pom.xml first for better layer caching
COPY backend/pom.xml .

# Copy source code
COPY backend/src ./src

# Build the application
RUN mvn clean package -DskipTests

# Create uploads directory
RUN mkdir -p uploads/profile-images/doctors uploads/profile-images/patients

# Expose port (will be overridden by $PORT env var)
EXPOSE 8081

# Run the application with proper port binding
CMD ["java", "-Dserver.port=${PORT:-8081}", "-Dspring.profiles.active=${SPRING_PROFILES_ACTIVE:-prod}", "-jar", "target/healthbridge-backend-1.0.0.jar"]
