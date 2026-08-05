package com.medisphere.fhir.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "fhir_sync_logs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FhirSyncLog {

    @Id
    private String id;

    private String resourceType; // Patient, Condition, Observation, MedicationRequest, Bundle
    private String resourceId;
    private String patientEhrId;
    private String status; // SUCCESS, FAILED, PARTIAL
    private String details;
    private LocalDateTime timestamp;
}
