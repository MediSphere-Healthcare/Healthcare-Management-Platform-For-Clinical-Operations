package com.medisphere.healthcare.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "audit_logs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuditLog {

    @Id
    private String id;

    private String action; // e.g. "READ_PATIENT_TWIN", "INGEST_FHIR_RESOURCES", "CONSENT_UPDATED"
    private String accessedBy; // Username / Clinician ID
    private String role; // PROVIDER, PATIENT, SYSTEM
    private String patientId; // The ID of the patient whose records were accessed
    private String patientName;
    private String status; // SUCCESS, ACCESS_DENIED
    private LocalDateTime timestamp;
    private String details;
}
