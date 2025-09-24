package com.healthbridge.security;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

@Component
public class OAuthRoleStore {
    
    // Store role temporarily using session ID as key
    private final Map<String, String> roleStore = new ConcurrentHashMap<>();
    
    public void storeRole(String sessionId, String role) {
        System.out.println("=== OAUTH ROLE STORE ===");
        System.out.println("Storing role for session: " + sessionId + " -> " + role);
        roleStore.put(sessionId, role);
    }
    
    public String getRole(String sessionId) {
        String role = roleStore.get(sessionId);
        System.out.println("=== OAUTH ROLE STORE ===");
        System.out.println("Retrieving role for session: " + sessionId + " -> " + role);
        return role;
    }
    
    public void removeRole(String sessionId) {
        System.out.println("=== OAUTH ROLE STORE ===");
        System.out.println("Removing role for session: " + sessionId);
        roleStore.remove(sessionId);
    }
}


