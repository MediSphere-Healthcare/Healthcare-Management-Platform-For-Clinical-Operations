package com.medisphere.healthcare.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "consents")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Consent {

    @Id
    private String id;

    private String patientId;
    private String patientName;

    private String status; // ACTIVE, REVOKED, EXPIRED
    private String consentType; // e.g. "HIPAA-Authorization"

    @Builder.Default
    private List<String> authorizedProviders = new ArrayList<>(); // Usernames/IDs of doctors

    @Builder.Default
    private List<String> permittedResources = new ArrayList<>(); // Patient, Observation, Condition, etc.

    private LocalDateTime signedDate;
    private LocalDateTime expirationDate;

    private String ipAddress;
    private String digitalSignature; // text matching patient's name
}
