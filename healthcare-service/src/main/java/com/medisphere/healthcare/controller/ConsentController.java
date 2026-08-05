package com.medisphere.healthcare.controller;

import com.medisphere.healthcare.model.Consent;
import com.medisphere.healthcare.service.ConsentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/consent")
@RequiredArgsConstructor
public class ConsentController {

    private final ConsentService consentService;

    @PostMapping
    public ResponseEntity<Consent> createConsent(@RequestBody Map<String, Object> request) {
        String patientId = (String) request.get("patientId");
        String patientName = (String) request.get("patientName");
        @SuppressWarnings("unchecked")
        List<String> authorizedProviders = (List<String>) request.get("authorizedProviders");
        @SuppressWarnings("unchecked")
        List<String> permittedResources = (List<String>) request.get("permittedResources");

        Consent consent = consentService.createConsent(patientId, patientName, authorizedProviders, permittedResources);
        return ResponseEntity.ok(consent);
    }

    @PostMapping("/revoke")
    public ResponseEntity<Consent> revokeConsent(@RequestBody Map<String, String> request) {
        String patientId = request.get("patientId");
        Consent revoked = consentService.revokeConsent(patientId);
        if (revoked == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(revoked);
    }

    @GetMapping("/{patientId}")
    public ResponseEntity<List<Consent>> getConsents(@PathVariable String patientId) {
        return ResponseEntity.ok(consentService.getConsents(patientId));
    }
}
