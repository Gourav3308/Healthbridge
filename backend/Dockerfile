# Use OpenJDK 17 as base image
FROM openjdk:17-jdk-slim

# Install Maven
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy pom.xml first for better layer caching
COPY pom.xml .

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Expose port
EXPOSE 8081

# Run the application
CMD ["java", "-jar", "target/healthbridge-backend-1.0.0.jar"]
