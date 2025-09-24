package com.healthbridge.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.healthbridge.util.JwtUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Value("${frontend.url}")
    private String frontendUrl;
    
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, 
                                      Authentication authentication) throws IOException, ServletException {
        
        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + getDefaultTargetUrl());
            return;
        }
        
        CustomOAuth2User oauth2User = (CustomOAuth2User) authentication.getPrincipal();
        
        System.out.println("=== OAUTH2 SUCCESS HANDLER DEBUG ===");
        System.out.println("Request URL: " + request.getRequestURL());
        System.out.println("Query String: " + request.getQueryString());
        System.out.println("Request Parameters: " + request.getParameterMap());
        System.out.println("User ID: " + oauth2User.getUserId());
        System.out.println("Email: " + oauth2User.getEmail());
        System.out.println("Role: " + oauth2User.getRole());
        System.out.println("First Name: " + oauth2User.getFirstName());
        System.out.println("Last Name: " + oauth2User.getLastName());
        
        // Always use PATIENT role for OAuth
        String finalRole = "PATIENT";
        System.out.println("Final role for token: " + finalRole);
        
        // Generate JWT token with the final role
        String token = jwtUtil.generateToken(oauth2User.getEmail(), finalRole, oauth2User.getUserId());
        
        // Build redirect URL with token and user info using configured frontend URL
        String targetUrl = UriComponentsBuilder.fromUriString(frontendUrl + "/auth/callback")
                .queryParam("token", token)
                .queryParam("userId", oauth2User.getUserId())
                .queryParam("email", oauth2User.getEmail())
                .queryParam("firstName", oauth2User.getFirstName())
                .queryParam("lastName", oauth2User.getLastName())
                .queryParam("role", finalRole)
                .queryParam("profileImage", oauth2User.getProfileImage())
                .build().toUriString();
        
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
