package com.medisphere.fhir.service;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;
import ca.uhn.fhir.validation.FhirValidator;
import ca.uhn.fhir.validation.ValidationResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class FhirValidationService {

    private final FhirContext fhirContext = FhirContext.forR4();

    public Map<String, Object> validateResource(String fhirJson) {
        Map<String, Object> result = new HashMap<>();

        try {
            // Parse the resource to check basic structure
            IParser parser = fhirContext.newJsonParser();
            parser.parseResource(fhirJson);

            // Use HAPI FHIR validator for schema validation
            FhirValidator validator = fhirContext.newValidator();
            ValidationResult validationResult = validator.validateWithResult(fhirJson);

            result.put("valid", validationResult.isSuccessful());
            result.put("issueCount", validationResult.getMessages().size());

            if (!validationResult.isSuccessful()) {
                result.put("issues", validationResult.getMessages().stream()
                        .map(msg -> Map.of(
                                "severity", msg.getSeverity().name(),
                                "message", msg.getMessage(),
                                "location", msg.getLocationString()
                        ))
                        .toList());
            }

            log.info("FHIR validation completed: valid={}, issues={}", 
                    validationResult.isSuccessful(), validationResult.getMessages().size());

        } catch (Exception e) {
            result.put("valid", false);
            result.put("error", "Parse error: " + e.getMessage());
            log.error("FHIR validation failed: {}", e.getMessage());
        }

        return result;
    }
}
