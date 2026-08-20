package com.medisphere.fhir.service;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;
import com.medisphere.fhir.model.FhirSyncLog;
import com.medisphere.fhir.repository.FhirSyncLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.hl7.fhir.instance.model.api.IBaseResource;
import org.hl7.fhir.r4.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.ZoneId;
import java.util.*;

@Service
@Slf4j
@SuppressWarnings("unchecked")
public class FhirIngestionService {

    private final FhirContext fhirContext = FhirContext.forR4();
    private final WebClient healthcareClient;
    private final FhirSyncLogRepository syncLogRepository;

    public FhirIngestionService(
            WebClient.Builder webClientBuilder,
            @Value("${healthcare-service.base-url}") String healthcareBaseUrl,
            FhirSyncLogRepository syncLogRepository) {
        this.healthcareClient = webClientBuilder.baseUrl(healthcareBaseUrl).build();
        this.syncLogRepository = syncLogRepository;
    }

    public Map<String, Object> ingestResource(String fhirJson) {
        IParser parser = fhirContext.newJsonParser();
        IBaseResource resource = parser.parseResource(fhirJson);

        try {
            if (resource instanceof Patient) {
                return ingestPatient((Patient) resource);
            } else if (resource instanceof Condition) {
                return ingestCondition((Condition) resource);
            } else if (resource instanceof Observation) {
                return ingestObservation((Observation) resource);
            } else if (resource instanceof MedicationRequest) {
                return ingestMedicationRequest((MedicationRequest) resource);
            } else if (resource instanceof Bundle) {
                return ingestBundle((Bundle) resource, parser);
            } else {
                log.warn("Unsupported FHIR resource type: {}", resource.getClass().getSimpleName());
                return Map.of("status", "UNSUPPORTED", "resourceType", resource.getClass().getSimpleName());
            }
        } catch (Exception e) {
            log.error("Error ingesting FHIR resource: {}", e.getMessage());
            logSync(resource.getClass().getSimpleName(), null, null, "FAILED", e.getMessage());
            return Map.of("status", "FAILED", "error", e.getMessage());
        }
    }

    private Map<String, Object> ingestPatient(Patient patient) {
        String ehrId = patient.getIdElement().getIdPart();
        log.info("Ingesting FHIR Patient resource with EHR ID: {}", ehrId);

        Map<String, Object> patientData = new HashMap<>();
        patientData.put("ehrId", ehrId);
        patientData.put("sourceEhr", "Epic EHR");

        if (patient.hasName() && !patient.getName().isEmpty()) {
            patientData.put("name", patient.getNameFirstRep().getNameAsSingleString());
        }
        if (patient.hasGender()) {
            patientData.put("gender", patient.getGender().getDisplay());
        }
        if (patient.hasBirthDate()) {
            LocalDate birthDate = patient.getBirthDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            patientData.put("birthDate", birthDate.toString());
            patientData.put("age", Period.between(birthDate, LocalDate.now()).getYears());
        }
        if (patient.hasTelecom() && !patient.getTelecom().isEmpty()) {
            patientData.put("contact", patient.getTelecomFirstRep().getValue());
        }

        // Call Healthcare Service to create/update patient
        Map<String, Object> response = healthcareClient.post()
                .uri("/api/patients")
                .bodyValue(patientData)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        logSync("Patient", ehrId, ehrId, "SUCCESS", "Ingested FHIR Patient");
        return Map.of("status", "SUCCESS", "resourceType", "Patient", "ehrId", ehrId, "data", response != null ? response : Map.of());
    }

    private Map<String, Object> ingestCondition(Condition condition) {
        String patientRef = condition.getSubject().getReference();
        String ehrId = extractPatientId(patientRef);
        log.info("Ingesting FHIR Condition for Patient ID: {}", ehrId);

        Map<String, Object> conditionData = new HashMap<>();
        if (condition.hasCode() && condition.getCode().hasCoding()) {
            Coding coding = condition.getCode().getCodingFirstRep();
            conditionData.put("code", coding.getCode());
            conditionData.put("system", coding.getSystem());
            conditionData.put("display", coding.getDisplay() != null ? coding.getDisplay() : coding.getCode());
        }

        String severity = "moderate";
        if (condition.hasSeverity() && condition.getSeverity().hasCoding()) {
            severity = condition.getSeverity().getCodingFirstRep().getDisplay();
        }
        conditionData.put("severity", severity);

        String onsetDate = condition.hasOnsetDateTimeType()
                ? condition.getOnsetDateTimeType().getValueAsString()
                : LocalDate.now().toString();
        conditionData.put("onsetDate", onsetDate);

        // Call Healthcare Service to add condition
        healthcareClient.post()
                .uri("/api/patients/{ehrId}/conditions", ehrId)
                .bodyValue(conditionData)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        logSync("Condition", null, ehrId, "SUCCESS", "Ingested FHIR Condition: " + conditionData.get("display"));
        return Map.of("status", "SUCCESS", "resourceType", "Condition", "ehrId", ehrId);
    }

    private Map<String, Object> ingestObservation(Observation observation) {
        String patientRef = observation.getSubject().getReference();
        String ehrId = extractPatientId(patientRef);
        log.info("Ingesting FHIR Observation for Patient ID: {}", ehrId);

        String code = "";
        String display = "";
        if (observation.hasCode() && observation.getCode().hasCoding()) {
            Coding coding = observation.getCode().getCodingFirstRep();
            code = coding.getCode();
            display = coding.getDisplay() != null ? coding.getDisplay() : coding.getCode();
        }

        // Check if vital sign
        boolean isVital = isVitalSign(code, display);

        if (isVital) {
            Map<String, Object> vitalsData = extractVitals(observation, code);
            healthcareClient.put()
                    .uri("/api/patients/{ehrId}/vitals", ehrId)
                    .bodyValue(vitalsData)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();
            logSync("Observation (Vital)", null, ehrId, "SUCCESS", "Ingested vital: " + display);
        } else if (observation.hasValue()) {
            Map<String, Object> labData = extractLabResult(observation, code, display);
            healthcareClient.post()
                    .uri("/api/patients/{ehrId}/labs", ehrId)
                    .bodyValue(labData)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();
            logSync("Observation (Lab)", null, ehrId, "SUCCESS", "Ingested lab: " + display);
        }

        return Map.of("status", "SUCCESS", "resourceType", "Observation", "ehrId", ehrId, "isVital", isVital);
    }

    private Map<String, Object> ingestMedicationRequest(MedicationRequest medRequest) {
        String patientRef = medRequest.getSubject().getReference();
        String ehrId = extractPatientId(patientRef);
        log.info("Ingesting FHIR MedicationRequest for Patient ID: {}", ehrId);

        Map<String, Object> medData = new HashMap<>();
        if (medRequest.hasMedicationCodeableConcept()) {
            CodeableConcept cc = medRequest.getMedicationCodeableConcept();
            if (cc.hasCoding()) {
                Coding coding = cc.getCodingFirstRep();
                medData.put("code", coding.getCode());
                medData.put("name", coding.getDisplay() != null ? coding.getDisplay() : coding.getCode());
            }
        }
        if (medRequest.hasDosageInstruction()) {
            medData.put("dosageInstruction", medRequest.getDosageInstructionFirstRep().getText());
        }
        medData.put("status", medRequest.hasStatus() ? medRequest.getStatus().toCode() : "active");
        medData.put("datePrescribed", medRequest.hasAuthoredOn()
                ? medRequest.getAuthoredOn().toString() : LocalDate.now().toString());

        healthcareClient.post()
                .uri("/api/patients/{ehrId}/medications", ehrId)
                .bodyValue(medData)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        logSync("MedicationRequest", null, ehrId, "SUCCESS", "Ingested medication: " + medData.get("name"));
        return Map.of("status", "SUCCESS", "resourceType", "MedicationRequest", "ehrId", ehrId);
    }

    private Map<String, Object> ingestBundle(Bundle bundle, IParser parser) {
        log.info("Ingesting FHIR Bundle with {} entries", bundle.getEntry().size());
        int success = 0;
        int failed = 0;

        for (Bundle.BundleEntryComponent entry : bundle.getEntry()) {
            if (entry.hasResource()) {
                try {
                    ingestResource(parser.encodeResourceToString(entry.getResource()));
                    success++;
                } catch (Exception e) {
                    failed++;
                    log.error("Failed to ingest bundle entry: {}", e.getMessage());
                }
            }
        }

        logSync("Bundle", null, null, failed == 0 ? "SUCCESS" : "PARTIAL",
                "Ingested " + success + "/" + (success + failed) + " resources");
        return Map.of("status", failed == 0 ? "SUCCESS" : "PARTIAL",
                "resourceType", "Bundle", "success", success, "failed", failed);
    }

    // ─── Helper Methods ───

    private boolean isVitalSign(String code, String display) {
        String d = display.toLowerCase();
        return code.equals("8867-4") || code.equals("2708-6") || code.equals("8310-5")
                || code.equals("9279-1") || code.equals("85354-9") || code.equals("55284-4")
                || d.contains("heart rate") || d.contains("oxygen saturation") || d.contains("spo2")
                || d.contains("body temperature") || d.contains("respiratory rate")
                || d.contains("blood pressure");
    }

    private Map<String, Object> extractVitals(Observation observation, String code) {
        Map<String, Object> vitals = new HashMap<>();
        vitals.put("timestamp", LocalDateTime.now().toString());

        if (observation.hasValueQuantity()) {
            double val = observation.getValueQuantity().getValue().doubleValue();
            if (code.equals("8867-4")) vitals.put("heartRate", val);
            else if (code.equals("2708-6")) vitals.put("spo2", val);
            else if (code.equals("8310-5")) vitals.put("temperature", val);
            else if (code.equals("9279-1")) vitals.put("respiratoryRate", val);
        }

        if (observation.hasComponent() && (code.equals("85354-9") || code.equals("55284-4"))) {
            for (Observation.ObservationComponentComponent comp : observation.getComponent()) {
                if (comp.hasCode() && comp.getCode().hasCoding()) {
                    String compCode = comp.getCode().getCodingFirstRep().getCode();
                    if (compCode.equals("8480-6")) {
                        vitals.put("bpSystolic", String.valueOf(comp.getValueQuantity().getValue().intValue()));
                    } else if (compCode.equals("8462-4")) {
                        vitals.put("bpDiastolic", String.valueOf(comp.getValueQuantity().getValue().intValue()));
                    }
                }
            }
        }

        return vitals;
    }

    private Map<String, Object> extractLabResult(Observation observation, String code, String display) {
        Map<String, Object> lab = new HashMap<>();
        lab.put("code", code);
        lab.put("testName", display);
        lab.put("date", LocalDateTime.now().toString());

        if (observation.hasValueQuantity()) {
            lab.put("value", String.valueOf(observation.getValueQuantity().getValue()));
            lab.put("unit", observation.getValueQuantity().getUnit());
        } else if (observation.hasValueCodeableConcept()) {
            lab.put("value", observation.getValueCodeableConcept().getCodingFirstRep().getDisplay());
            lab.put("unit", "");
        }

        if (observation.hasReferenceRange()) {
            Observation.ObservationReferenceRangeComponent ref = observation.getReferenceRangeFirstRep();
            String range = ref.getText() != null ? ref.getText() : "";
            if (range.isEmpty() && ref.hasLow() && ref.hasHigh()) {
                range = ref.getLow().getValue() + " - " + ref.getHigh().getValue();
            }
            lab.put("referenceRange", range);
        }

        return lab;
    }

    private String extractPatientId(String reference) {
        if (reference == null || reference.isEmpty()) return "unknown";
        return reference.contains("/") ? reference.substring(reference.lastIndexOf("/") + 1) : reference;
    }

    private void logSync(String resourceType, String resourceId, String patientEhrId, String status, String details) {
        syncLogRepository.save(FhirSyncLog.builder()
                .resourceType(resourceType)
                .resourceId(resourceId)
                .patientEhrId(patientEhrId)
                .status(status)
                .details(details)
                .timestamp(LocalDateTime.now())
                .build());
    }
}
