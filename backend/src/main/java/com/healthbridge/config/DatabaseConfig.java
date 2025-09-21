package com.healthbridge.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Configuration
@Profile("production")
public class DatabaseConfig {

    @Value("${DATABASE_URL:jdbc:mysql://localhost:3306/healthprj}")
    private String databaseUrl;

    @Value("${DB_USERNAME:root}")
    private String username;

    @Value("${DB_PASSWORD:Sonu@12345}")
    private String password;

    @Bean
    public String databaseUrl() {
        System.out.println("DATABASE_URL from environment: " + databaseUrl);
        return databaseUrl;
    }

    @Bean
    public String databaseUsername() {
        System.out.println("DB_USERNAME from environment: " + username);
        return username;
    }

    @Bean
    public String databasePassword() {
        System.out.println("DB_PASSWORD from environment: " + (password != null ? "***SET***" : "NULL"));
        return password;
    }

    @Bean
    public void testDatabaseConnection() {
        try {
            System.out.println("Testing database connection...");
            System.out.println("URL: " + databaseUrl);
            System.out.println("Username: " + username);
            
            Connection connection = DriverManager.getConnection(databaseUrl, username, password);
            System.out.println("Database connection successful!");
            connection.close();
        } catch (SQLException e) {
            System.err.println("Database connection failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
