package com.healthbridge.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.healthbridge.security.CustomUserDetailsService;
import com.healthbridge.security.JwtAuthenticationFilter;
import com.healthbridge.security.OAuth2AuthenticationSuccessHandler;
import com.healthbridge.security.OAuth2UserService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    
    @Autowired
    private CustomUserDetailsService userDetailsService;
    
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    
    @Autowired
    private OAuth2UserService oauth2UserService;
    
    @Autowired
    private OAuth2AuthenticationSuccessHandler oauth2AuthenticationSuccessHandler;
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(authz -> authz
                // Public endpoints
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/oauth2/**").permitAll()
                .requestMatchers("/login/oauth2/**").permitAll()
                .requestMatchers("/uploads/**").permitAll() // Allow access to uploaded files
                .requestMatchers("/api/specializations").permitAll()
                .requestMatchers("/api/doctors/approved").permitAll()
                .requestMatchers("/api/doctors/search").permitAll()
                .requestMatchers("/api/doctors/{id}/public").permitAll()
                .requestMatchers("/api/doctors/specializations").permitAll()
                .requestMatchers("/api/doctors/cities").permitAll()
                .requestMatchers("/api/reviews/doctor/**").permitAll()
                .requestMatchers("/api/doctor-schedule/doctor/*/available-dates").permitAll()
                .requestMatchers("/api/doctor-schedule/doctor/*/available-slots").permitAll()
                .requestMatchers("/api/doctor-schedule/doctor/*/schedule-summary").permitAll()
                .requestMatchers("/api/doctor-schedule/doctor/*/initialize-schedule").permitAll()
                
                // Patient endpoints
                .requestMatchers("/api/patients/profile").hasRole("PATIENT")
                .requestMatchers("/api/appointments/patient/**").hasRole("PATIENT")
                .requestMatchers("/api/appointment-booking/**").hasRole("PATIENT")
                .requestMatchers("/api/reviews/**").hasRole("PATIENT")
                
                // Doctor endpoints
                .requestMatchers("/api/doctors/profile").hasRole("DOCTOR")
                .requestMatchers("/api/doctors/availability/**").hasRole("DOCTOR")
                .requestMatchers("/api/appointments/doctor/**").hasRole("DOCTOR")
                .requestMatchers("/api/doctors/test-email").permitAll() // Test email endpoint
                .requestMatchers("/test/**").permitAll() // Test endpoints
                
                // Admin endpoints (temporarily public for testing)
                .requestMatchers("/api/admin/**").permitAll()
                .requestMatchers("/api/doctors/pending").hasRole("ADMIN")
                .requestMatchers("/api/doctors/{id}/approve").hasRole("ADMIN")
                .requestMatchers("/api/doctors/{id}/reject").hasRole("ADMIN")
                
                // All other requests need authentication
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo
                    .userService(oauth2UserService)
                )
                .successHandler(oauth2AuthenticationSuccessHandler)
            );
        
        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("http://localhost:4200", "http://localhost:4201", "http://localhost:3000", "http://127.0.0.1:4200", "http://127.0.0.1:4201", "http://10.45.254.162:4200", "https://healthbridge-frontend-jj1.onrender.com"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
