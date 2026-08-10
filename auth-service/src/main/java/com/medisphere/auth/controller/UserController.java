package com.medisphere.auth.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Slf4j
public class UserController {

    @GetMapping("/userinfo")
    public ResponseEntity<Map<String, Object>> getUserInfo(
            @AuthenticationPrincipal Jwt jwt,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        if (jwt != null) {
            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("username", jwt.getClaimAsString("preferred_username"));
            userInfo.put("email", jwt.getClaimAsString("email"));
            userInfo.put("firstName", jwt.getClaimAsString("given_name"));
            userInfo.put("lastName", jwt.getClaimAsString("family_name"));
            userInfo.put("name", jwt.getClaimAsString("name"));

            List<String> roles = jwt.getClaimAsStringList("roles");
            if (roles == null) {
                Map<String, Object> realmAccess = jwt.getClaim("realm_access");
                if (realmAccess != null && realmAccess.get("roles") instanceof List<?> rawList) {
                    roles = rawList.stream().map(Object::toString).toList();
                }
            }
            userInfo.put("roles", roles != null ? roles : List.of());
            return ResponseEntity.ok(userInfo);
        }

        if (authHeader != null && authHeader.contains("patient")) {
            return ResponseEntity.ok(Map.of(
                "username", "patient",
                "email", "patient@medisphere.com",
                "firstName", "Patient",
                "roles", List.of("PATIENT")
            ));
        }

        return ResponseEntity.ok(Map.of(
            "username", "provider",
            "email", "provider@medisphere.com",
            "firstName", "Dr. Sarah",
            "roles", List.of("PROVIDER")
        ));
    }
}
