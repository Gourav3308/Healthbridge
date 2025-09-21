package com.healthbridge.security;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class CustomOAuth2User implements OAuth2User {
    private Collection<? extends GrantedAuthority> authorities;
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private Long userId;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private String profileImage;
    
    public CustomOAuth2User(Collection<? extends GrantedAuthority> authorities, 
                           Map<String, Object> attributes, String nameAttributeKey,
                           Long userId, String email, String firstName, String lastName, 
                           String role, String profileImage) {
        this.authorities = authorities;
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.userId = userId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.profileImage = profileImage;
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
    
    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }
    
    @Override
    public String getName() {
        return (String) attributes.get(nameAttributeKey);
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public String getEmail() {
        return email;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public String getRole() {
        return role;
    }
    
    public String getProfileImage() {
        return profileImage;
    }
}
