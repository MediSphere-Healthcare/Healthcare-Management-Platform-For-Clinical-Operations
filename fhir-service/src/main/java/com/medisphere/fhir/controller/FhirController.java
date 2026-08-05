package com.medisphere.fhir.controller;

import com.medisphere.fhir.model.FhirSyncLog;
import com.medisphere.fhir.service.FhirIngestionService;
import com.medisphere.fhir.service.FhirSyncService;
import com.medisphere.fhir.service.FhirValidationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/fhir")
@RequiredArgsConstructor
public class FhirController {

    private final FhirIngestionService fhirIngestionService;
    private final FhirValidationService fhirValidationService;
    private final FhirSyncService fhirSyncService;

    @PostMapping("/ingest")
    public ResponseEntity<Map<String, Object>> ingestFhirResource(@RequestBody String fhirPayload) {
        try {
            Map<String, Object> result = fhirIngestionService.ingestResource(fhirPayload);
            if ("FAILED".equals(result.get("status"))) {
                return ResponseEntity.badRequest().body(result);
            }
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("status", "ERROR", "message", e.getMessage()));
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateFhirResource(@RequestBody String fhirPayload) {
        Map<String, Object> result = fhirValidationService.validateResource(fhirPayload);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/sync-logs")
    public ResponseEntity<List<FhirSyncLog>> getSyncLogs() {
        return ResponseEntity.ok(fhirSyncService.getAllSyncLogs());
    }

    @GetMapping("/sync-logs/{patientEhrId}")
    public ResponseEntity<List<FhirSyncLog>> getSyncLogsByPatient(@PathVariable String patientEhrId) {
        return ResponseEntity.ok(fhirSyncService.getSyncLogsByPatient(patientEhrId));
    }
}
