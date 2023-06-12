package com.pky.ecommerce.config;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

import com.pky.ecommerce.models.User;
import com.pky.ecommerce.repo.UserRepo;

@Component
public class AuthContext {

    private User principal;

    @Autowired
    private UserRepo userRepo;

    public User getPrincipal() {
        return principal;
    }

    @Autowired private JwtUtil util;
    
    public AuthContext() {
    }

    public void createAuthenticatedPrincipal(String jwtToken) {
        this.principal = util.getUser(jwtToken);
    }

    public Optional<User> doUsernamePasswordAuthentication(String username, String providedPassword) {
        Optional<User> requestedUser = userRepo.findByUsername(username);
        if (requestedUser.isPresent() && requestedUser.get().getPassword().equals(providedPassword)) {
            return Optional.ofNullable(requestedUser.get());
        }
        return Optional.ofNullable(null);
    }
}
