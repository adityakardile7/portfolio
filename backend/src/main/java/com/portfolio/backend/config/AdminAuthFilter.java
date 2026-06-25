package com.portfolio.backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Protects write operations (POST/DELETE) on /api/projects with a simple
 * shared-secret password, sent by the frontend as the "X-Admin-Password"
 * header. GET requests (viewing the portfolio) are never blocked.
 *
 * The password is read from the ADMIN_PASSWORD environment variable -
 * it is never hardcoded, so this file is safe to commit to a public repo.
 */
@Component
public class AdminAuthFilter extends OncePerRequestFilter {

    @Value("${app.admin.password:}")
    private String adminPassword;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                     HttpServletResponse response,
                                     FilterChain filterChain) throws ServletException, IOException {

        boolean isProjectsApi = request.getRequestURI().startsWith("/api/projects");
        boolean isWrite = "POST".equalsIgnoreCase(request.getMethod())
                || "DELETE".equalsIgnoreCase(request.getMethod());

        if (isProjectsApi && isWrite) {
            String providedPassword = request.getHeader("X-Admin-Password");

            // If no password is configured on the server, fail closed (deny)
            // rather than silently allowing everyone through.
            boolean passwordConfigured = adminPassword != null && !adminPassword.isBlank();
            boolean matches = passwordConfigured && adminPassword.equals(providedPassword);

            if (!matches) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("{\"error\":\"Invalid or missing admin password\"}");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}
