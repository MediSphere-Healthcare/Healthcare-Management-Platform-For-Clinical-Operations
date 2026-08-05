package com.medisphere.healthcare.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Document(collection = "patients")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    private String id;

    // External identifiers (e.g., Epic EHR Patient ID)
    private String ehrId;
    private String sourceEhr; // e.g. "Epic EHR", "Cerner"

    // Demographics
    private String name;
    private String gender;
    private String birthDate;
    private Integer age;
    private String contact;

    // Active Conditions (e.g., Hypertension, Type 2 Diabetes)
    @Builder.Default
    private List<ConditionInfo> conditions = new ArrayList<>();

    // Current Vitals (most recent)
    private Vitals currentVitals;

    // Historical Vitals for stream/trends
    @Builder.Default
    private List<VitalsRecord> vitalsHistory = new ArrayList<>();

    // Lab Results (e.g. HbA1c, eGFR, LDL)
    @Builder.Default
    private List<LabResult> labResults = new ArrayList<>();

    // Active Medications
    @Builder.Default
    private List<MedicationInfo> medications = new ArrayList<>();

    // Organ Risk Heatmap Data (e.g. "cardiovascular": 75, "renal": 45)
    @Builder.Default
    private Map<String, Integer> organRiskHeatmap = new HashMap<>();

    private LocalDateTime lastSynced;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ConditionInfo {
        private String code;
        private String system;
        private String display;
        private String severity;
        private String onsetDate;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Vitals {
        private Double heartRate;
        private String bpSystolic;
        private String bpDiastolic;
        private Double spo2;
        private Double temperature;
        private Double respiratoryRate;
        private LocalDateTime timestamp;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VitalsRecord {
        private String vitalType; // e.g., "HeartRate", "SpO2"
        private Double value;
        private String unit;
        private LocalDateTime timestamp;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LabResult {
        private String code;
        private String testName;
        private String value;
        private String unit;
        private String referenceRange;
        private LocalDateTime date;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MedicationInfo {
        private String code;
        private String name;
        private String dosageInstruction;
        private String status;
        private String datePrescribed;
    }
}
