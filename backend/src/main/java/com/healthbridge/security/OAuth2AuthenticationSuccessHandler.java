package com.healthbridge.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
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
    
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, 
                                      Authentication authentication) throws IOException, ServletException {
        
        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + getDefaultTargetUrl());
            return;
        }
        
        CustomOAuth2User oauth2User = (CustomOAuth2User) authentication.getPrincipal();
        
        // Generate JWT token
        String token = jwtUtil.generateToken(oauth2User.getEmail(), oauth2User.getRole(), oauth2User.getUserId());
        
        // Build redirect URL with token and user info  
        String targetUrl = UriComponentsBuilder.fromUriString("https://healthbridge-frontend-jj1l.onrender.com/auth/callback")
                .queryParam("token", token)
                .queryParam("userId", oauth2User.getUserId())
                .queryParam("email", oauth2User.getEmail())
                .queryParam("firstName", oauth2User.getFirstName())
                .queryParam("lastName", oauth2User.getLastName())
                .queryParam("role", oauth2User.getRole())
                .queryParam("profileImage", oauth2User.getProfileImage())
                .build().toUriString();
        
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
