package com.healthbridge.security;

import java.util.Map;

public class GoogleOAuth2UserInfo implements OAuth2UserInfo {
    private Map<String, Object> attributes;
    
    public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }
    
    @Override
    public String getId() {
        return (String) attributes.get("id");
    }
    
    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }
    
    @Override
    public String getFirstName() {
        return (String) attributes.get("given_name");
    }
    
    @Override
    public String getLastName() {
        return (String) attributes.get("family_name");
    }
    
    @Override
    public String getImageUrl() {
        return (String) attributes.get("picture");
    }
}
