package com.medisphere.healthcare.service;

import com.medisphere.healthcare.model.Patient;
import com.medisphere.healthcare.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PatientService {

    private final PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(String id) {
        return patientRepository.findById(id);
    }

    public Optional<Patient> getPatientByEhrId(String ehrId) {
        return patientRepository.findByEhrId(ehrId);
    }

    public Patient createPatient(Patient patient) {
        if (patient.getConditions() == null) patient.setConditions(new ArrayList<>());
        if (patient.getVitalsHistory() == null) patient.setVitalsHistory(new ArrayList<>());
        if (patient.getLabResults() == null) patient.setLabResults(new ArrayList<>());
        if (patient.getMedications() == null) patient.setMedications(new ArrayList<>());
        if (patient.getOrganRiskHeatmap() == null) {
            patient.setOrganRiskHeatmap(new HashMap<>());
            patient.getOrganRiskHeatmap().put("cardiovascular", 15);
            patient.getOrganRiskHeatmap().put("renal", 10);
            patient.getOrganRiskHeatmap().put("metabolic", 20);
            patient.getOrganRiskHeatmap().put("pulmonary", 12);
            patient.getOrganRiskHeatmap().put("hepatic", 8);
        }
        patient.setLastSynced(LocalDateTime.now());
        return patientRepository.save(patient);
    }

    public Patient updatePatient(String id, Patient updated) {
        return patientRepository.findById(id).map(existing -> {
            if (updated.getName() != null) existing.setName(updated.getName());
            if (updated.getGender() != null) existing.setGender(updated.getGender());
            if (updated.getBirthDate() != null) existing.setBirthDate(updated.getBirthDate());
            if (updated.getAge() != null) existing.setAge(updated.getAge());
            if (updated.getContact() != null) existing.setContact(updated.getContact());
            if (updated.getConditions() != null) existing.setConditions(updated.getConditions());
            if (updated.getLabResults() != null) existing.setLabResults(updated.getLabResults());
            if (updated.getMedications() != null) existing.setMedications(updated.getMedications());
            if (updated.getOrganRiskHeatmap() != null) existing.setOrganRiskHeatmap(updated.getOrganRiskHeatmap());
            if (updated.getCurrentVitals() != null) existing.setCurrentVitals(updated.getCurrentVitals());
            existing.setLastSynced(LocalDateTime.now());
            return patientRepository.save(existing);
        }).orElse(null);
    }

    public boolean deletePatient(String id) {
        return patientRepository.findById(id).map(patient -> {
            patientRepository.delete(patient);
            return true;
        }).orElse(false);
    }

    public Patient addCondition(String ehrId, Patient.ConditionInfo condition) {
        Patient patient = getOrCreateByEhrId(ehrId);
        boolean exists = patient.getConditions().stream()
                .anyMatch(c -> c.getCode().equals(condition.getCode()));
        if (!exists) {
            patient.getConditions().add(condition);
            updateRisksBasedOnConditions(patient);
        }
        patient.setLastSynced(LocalDateTime.now());
        return patientRepository.save(patient);
    }

    public Patient addLabResult(String ehrId, Patient.LabResult lab) {
        Patient patient = getOrCreateByEhrId(ehrId);
        patient.getLabResults().add(lab);
        patient.setLastSynced(LocalDateTime.now());
        return patientRepository.save(patient);
    }

    public Patient addMedication(String ehrId, Patient.MedicationInfo medication) {
        Patient patient = getOrCreateByEhrId(ehrId);
        boolean exists = patient.getMedications().stream()
                .anyMatch(m -> m.getCode().equals(medication.getCode()));
        if (!exists) {
            patient.getMedications().add(medication);
        } else {
            patient.getMedications().forEach(m -> {
                if (m.getCode().equals(medication.getCode())) {
                    m.setStatus(medication.getStatus());
                    m.setDosageInstruction(medication.getDosageInstruction());
                }
            });
        }
        patient.setLastSynced(LocalDateTime.now());
        return patientRepository.save(patient);
    }

    public Patient updateVitals(String ehrId, Patient.Vitals vitals) {
        Patient patient = getOrCreateByEhrId(ehrId);
        patient.setCurrentVitals(vitals);
        patient.setLastSynced(LocalDateTime.now());
        return patientRepository.save(patient);
    }

    public Patient getOrCreateByEhrId(String ehrId) {
        return patientRepository.findByEhrId(ehrId)
                .orElseGet(() -> {
                    Patient twin = Patient.builder()
                            .ehrId(ehrId)
                            .name("Patient " + ehrId)
                            .sourceEhr("Epic EHR")
                            .conditions(new ArrayList<>())
                            .vitalsHistory(new ArrayList<>())
                            .labResults(new ArrayList<>())
                            .medications(new ArrayList<>())
                            .organRiskHeatmap(new HashMap<>())
                            .build();
                    twin.getOrganRiskHeatmap().put("cardiovascular", 15);
                    twin.getOrganRiskHeatmap().put("renal", 10);
                    twin.getOrganRiskHeatmap().put("metabolic", 20);
                    twin.getOrganRiskHeatmap().put("pulmonary", 12);
                    twin.getOrganRiskHeatmap().put("hepatic", 8);
                    return patientRepository.save(twin);
                });
    }

    private void updateRisksBasedOnConditions(Patient patient) {
        var risks = patient.getOrganRiskHeatmap();
        for (Patient.ConditionInfo condition : patient.getConditions()) {
            String display = condition.getDisplay().toLowerCase();
            if (display.contains("hypertension") || display.contains("heart") || display.contains("cardio")) {
                risks.put("cardiovascular", Math.max(risks.getOrDefault("cardiovascular", 0), 75));
                risks.put("renal", Math.max(risks.getOrDefault("renal", 0), 45));
            }
            if (display.contains("diabetes") || display.contains("metabolic") || display.contains("obesity")) {
                risks.put("metabolic", Math.max(risks.getOrDefault("metabolic", 0), 80));
                risks.put("renal", Math.max(risks.getOrDefault("renal", 0), 60));
                risks.put("cardiovascular", Math.max(risks.getOrDefault("cardiovascular", 0), 60));
            }
            if (display.contains("asthma") || display.contains("copd") || display.contains("pulmonary")) {
                risks.put("pulmonary", Math.max(risks.getOrDefault("pulmonary", 0), 70));
            }
            if (display.contains("nephritis") || display.contains("kidney") || display.contains("renal")) {
                risks.put("renal", Math.max(risks.getOrDefault("renal", 0), 85));
            }
            if (display.contains("hepatitis") || display.contains("liver") || display.contains("cirrhosis")) {
                risks.put("hepatic", Math.max(risks.getOrDefault("hepatic", 0), 80));
            }
        }
    }
}
