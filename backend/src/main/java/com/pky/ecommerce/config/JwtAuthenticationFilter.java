package com.pky.ecommerce.config;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

        @Autowired
        private JwtUtil jwtutil;

        @Autowired
        private AuthContext authContext;

        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
                        throws ServletException, IOException {

                System.out.println("Current url" + request.getRequestURL());

                response.addHeader("SERVER", "TOMMY");

                // // Get authorization header and validate
                // http://localhost:8000/api/auth/seller/product

                List<String> authPatterns = Arrays.asList(".*/api/auth/seller/.*", ".*/api/auth/consumer/.*");

                if (authPatterns.stream().anyMatch(ptrn -> request.getRequestURL().toString().matches(ptrn))) {
                        final String token = request.getHeader("JWT");
                        if (token == null || token.equals("") || !jwtutil.validateToken(token)) {
                                response.sendError(401);
                                return;
                        }
                        authContext.createAuthenticatedPrincipal(token);
                }

                filterChain.doFilter(request, response);
        }

}
