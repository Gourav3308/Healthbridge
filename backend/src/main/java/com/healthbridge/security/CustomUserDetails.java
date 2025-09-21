package com.healthbridge.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class CustomUserDetails implements UserDetails {
    
    private final Long id;
    private final String email;
    private final String password;
    private final String firstName;
    private final String lastName;
    private final String role;
    private final String profileImage;
    private final Boolean isActive;
    
    public CustomUserDetails(Long id, String email, String password, String firstName, 
                           String lastName, String role, String profileImage, Boolean isActive) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.profileImage = profileImage;
        this.isActive = isActive;
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role));
    }
    
    @Override
    public String getPassword() {
        return password;
    }
    
    @Override
    public String getUsername() {
        return email;
    }
    
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    
    @Override
    public boolean isEnabled() {
        return isActive != null ? isActive : true;
    }
    
    public Long getUserId() {
        return id;
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
    
    public String getFullName() {
        return firstName + " " + lastName;
    }
}