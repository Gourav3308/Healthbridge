package com.healthbridge.security;

public interface OAuth2UserInfo {
    String getId();
    String getEmail();
    String getFirstName();
    String getLastName();
    String getImageUrl();
}
