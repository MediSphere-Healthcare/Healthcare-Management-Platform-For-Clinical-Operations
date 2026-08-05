package com.medisphere.healthcare.service;

import com.medisphere.healthcare.model.Consent;
import com.medisphere.healthcare.repository.ConsentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConsentService {

    private final ConsentRepository consentRepository;

    public boolean isConsentGranted(String patientId, String providerId) {
        Optional<Consent> consentOpt = consentRepository.findByPatientIdAndStatus(patientId, "ACTIVE");
        if (consentOpt.isEmpty()) {
            return false;
        }
        Consent consent = consentOpt.get();
        return consent.getAuthorizedProviders().contains(providerId) || consent.getAuthorizedProviders().contains("*");
    }

    public Consent createConsent(String patientId, String patientName, List<String> authorizedProviders, List<String> permittedResources) {
        Consent consent = Consent.builder()
                .patientId(patientId)
                .patientName(patientName)
                .status("ACTIVE")
                .consentType("HIPAA-Authorization")
                .authorizedProviders(authorizedProviders)
                .permittedResources(permittedResources)
                .signedDate(LocalDateTime.now())
                .expirationDate(LocalDateTime.now().plusYears(1))
                .digitalSignature(patientName)
                .build();
        return consentRepository.save(consent);
    }

    public Consent revokeConsent(String patientId) {
        Optional<Consent> consentOpt = consentRepository.findByPatientIdAndStatus(patientId, "ACTIVE");
        if (consentOpt.isPresent()) {
            Consent consent = consentOpt.get();
            consent.setStatus("REVOKED");
            return consentRepository.save(consent);
        }
        return null;
    }

    public List<Consent> getConsents(String patientId) {
        return consentRepository.findByPatientId(patientId);
    }
}
