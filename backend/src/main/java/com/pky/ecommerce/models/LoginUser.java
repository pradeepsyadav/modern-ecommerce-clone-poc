package com.pky.ecommerce.models;


public class LoginUser {
    private String jwtToken;
    private User user;


    public LoginUser() {
    }
    public LoginUser(String jwtToken, User user) {
        this.jwtToken = jwtToken;
        this.user = user;
        this.user.setPassword(null);
    }
    public String getJwtToken() {
        return jwtToken;
    }
    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    
}
