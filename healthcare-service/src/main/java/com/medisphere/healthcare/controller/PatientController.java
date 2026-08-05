package com.medisphere.healthcare.controller;

import com.medisphere.healthcare.model.Patient;
import com.medisphere.healthcare.service.AuditService;
import com.medisphere.healthcare.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;
    private final AuditService auditService;

    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients() {
        auditService.log("LIST_PATIENTS", "provider", "PROVIDER", "all", "All Patients", "SUCCESS",
                "Fetched list of all patient twins");
        return ResponseEntity.ok(patientService.getAllPatients());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable String id,
                                                   @RequestParam(defaultValue = "provider") String username) {
        return patientService.getPatientById(id)
                .map(patient -> {
                    auditService.log("READ_PATIENT_TWIN", username,
                            username.equals("patient") ? "PATIENT" : "PROVIDER",
                            id, patient.getName(), "SUCCESS",
                            "Read detailed Patient Digital Twin records");
                    return ResponseEntity.ok(patient);
                })
                .orElseGet(() -> {
                    auditService.log("READ_PATIENT_TWIN", username,
                            username.equals("patient") ? "PATIENT" : "PROVIDER",
                            id, "Unknown Patient", "FAILED",
                            "Attempted to read digital twin details but patient was not found");
                    return ResponseEntity.notFound().build();
                });
    }

    @PostMapping
    public ResponseEntity<Patient> createPatient(@RequestBody Patient patient) {
        Patient created = patientService.createPatient(patient);
        auditService.log("CREATE_PATIENT", "provider", "PROVIDER",
                created.getId(), created.getName(), "SUCCESS", "Created new patient record");
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable String id, @RequestBody Patient patient) {
        Patient updated = patientService.updatePatient(id, patient);
        if (updated == null) return ResponseEntity.notFound().build();
        auditService.log("UPDATE_PATIENT", "provider", "PROVIDER",
                id, updated.getName(), "SUCCESS", "Updated patient record");
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable String id) {
        return patientService.getPatientById(id)
                .map(patient -> {
                    patientService.deletePatient(id);
                    auditService.log("DELETE_PATIENT_TWIN", "provider", "PROVIDER",
                            id, patient.getName(), "SUCCESS", "Deleted Patient Digital Twin records");
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ─── Sub-resource endpoints for FHIR service integration ───

    @PostMapping("/{ehrId}/conditions")
    public ResponseEntity<Patient> addCondition(@PathVariable String ehrId,
                                                 @RequestBody Patient.ConditionInfo condition) {
        Patient updated = patientService.addCondition(ehrId, condition);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/{ehrId}/labs")
    public ResponseEntity<Patient> addLabResult(@PathVariable String ehrId,
                                                 @RequestBody Patient.LabResult lab) {
        Patient updated = patientService.addLabResult(ehrId, lab);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/{ehrId}/medications")
    public ResponseEntity<Patient> addMedication(@PathVariable String ehrId,
                                                  @RequestBody Patient.MedicationInfo medication) {
        Patient updated = patientService.addMedication(ehrId, medication);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{ehrId}/vitals")
    public ResponseEntity<Patient> updateVitals(@PathVariable String ehrId,
                                                 @RequestBody Patient.Vitals vitals) {
        Patient updated = patientService.updateVitals(ehrId, vitals);
        return ResponseEntity.ok(updated);
    }
}
