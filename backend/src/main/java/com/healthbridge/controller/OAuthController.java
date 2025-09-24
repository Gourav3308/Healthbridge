package com.healthbridge.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.healthbridge.security.OAuthRoleStore;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Controller
public class OAuthController {
    
    @Value("${frontend.url}")
    private String frontendUrl;
    
    @Autowired
    private OAuthRoleStore oauthRoleStore;
    
    @GetMapping("/auth/google")
    public void initiateGoogleOAuth(HttpServletRequest request, 
                                   HttpServletResponse response) throws IOException {
        
        System.out.println("=== CUSTOM OAUTH INITIATION ===");
        
        // Always create patients via OAuth
        String roleToStore = "PATIENT";
        
        // Store the role in both session and our custom store
        HttpSession session = request.getSession(true); // Force session creation
        String sessionId = session.getId();
        
        // Store in session (for compatibility)
        session.setAttribute("oauthRole", roleToStore);
        System.out.println("Stored role in session: " + roleToStore + " with session ID: " + sessionId);
        
        // Store in our custom store (for reliability) - use a more persistent key
        String persistentKey = "oauth_role_" + System.currentTimeMillis() + "_" + roleToStore;
        oauthRoleStore.storeRole(persistentKey, roleToStore);
        System.out.println("Stored role in custom store: " + roleToStore + " with key: " + persistentKey);
        
        // Also store the key in session for retrieval
        session.setAttribute("oauthRoleKey", persistentKey);
        
        // Redirect to the actual OAuth2 authorization endpoint
        String redirectUrl = "/oauth2/authorization/google";
        System.out.println("Redirecting to: " + redirectUrl);
        response.sendRedirect(redirectUrl);
    }
    
    @GetMapping("/auth/test-role")
    public void testRoleStorage(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession(false);
        if (session != null) {
            String role = (String) session.getAttribute("oauthRole");
            String roleKey = (String) session.getAttribute("oauthRoleKey");
            String roleFromStore = null;
            
            if (roleKey != null) {
                roleFromStore = oauthRoleStore.getRole(roleKey);
            }
            
            response.setContentType("text/plain");
            response.getWriter().write("Session Role: " + role + "\n");
            response.getWriter().write("Role Key: " + roleKey + "\n");
            response.getWriter().write("Role from Store: " + roleFromStore + "\n");
        } else {
            response.setContentType("text/plain");
            response.getWriter().write("No session found\n");
        }
    }
}
