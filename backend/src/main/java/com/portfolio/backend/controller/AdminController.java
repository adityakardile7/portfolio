package com.portfolio.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Tiny endpoint used only by the Admin login screen to check whether a
 * password is correct, without performing any actual write operation.
 * The real protection is AdminAuthFilter, which guards POST/DELETE on
 * /api/projects - this endpoint just lets the frontend show a friendly
 * "wrong password" message before the user tries to add/delete anything.
 *
 * Because the path matches /api/projects is required for the filter to
 * apply, this lives under /api/admin instead and is intentionally left
 * GET-only (so AdminAuthFilter, which only checks POST/DELETE, doesn't
 * apply here) - we manually check the password inline instead.
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @org.springframework.beans.factory.annotation.Value("${app.admin.password:}")
    private String adminPassword;

    @GetMapping("/verify")
    public ResponseEntity<?> verifyPassword(
            @org.springframework.web.bind.annotation.RequestHeader(value = "X-Admin-Password", required = false) String providedPassword
    ) {
        boolean passwordConfigured = adminPassword != null && !adminPassword.isBlank();
        boolean matches = passwordConfigured && adminPassword.equals(providedPassword);

        if (matches) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(401).build();
    }
}
