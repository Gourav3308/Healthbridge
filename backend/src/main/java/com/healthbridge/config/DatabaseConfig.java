package com.healthbridge.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Configuration
@Order(1)
public class DatabaseConfig implements CommandLineRunner {

    @Value("${spring.datasource.url}")
    private String databaseUrl;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("=== DATABASE CONNECTION TEST ===");
        System.out.println("Database URL: " + databaseUrl);
        System.out.println("Username: " + username);
        System.out.println("Password: " + (password != null ? "***" : "NULL"));
        
        try {
            System.out.println("Attempting to connect to database...");
            Connection connection = DriverManager.getConnection(databaseUrl, username, password);
            System.out.println("✅ Database connection successful!");
            System.out.println("Database Product: " + connection.getMetaData().getDatabaseProductName());
            System.out.println("Database Version: " + connection.getMetaData().getDatabaseProductVersion());
            connection.close();
        } catch (SQLException e) {
            System.err.println("❌ Database connection failed!");
            System.err.println("Error: " + e.getMessage());
            System.err.println("SQL State: " + e.getSQLState());
            System.err.println("Error Code: " + e.getErrorCode());
            e.printStackTrace();
        }
        System.out.println("=== END DATABASE TEST ===");
    }
}
