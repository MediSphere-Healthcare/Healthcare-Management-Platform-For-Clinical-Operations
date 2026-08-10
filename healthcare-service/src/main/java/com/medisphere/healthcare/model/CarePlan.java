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

@Document(collection = "careplans")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarePlan {

    @Id
    private String id;
    private String patientId;
    private String patientName;
    private String riskLevel; // HIGH, MEDIUM, LOW
    private Double riskScore; // e.g. 24.3
    private String status; // PENDING, APPROVED, MODIFIED, COMPLETED
    private String reviewPeriod; // e.g. "30 Days", "15 Days"

    @Builder.Default
    private List<String> goals = new ArrayList<>();

    @Builder.Default
    private List<MedicineRecommendation> medicines = new ArrayList<>();

    @Builder.Default
    private List<String> diet = new ArrayList<>();

    @Builder.Default
    private List<String> exercise = new ArrayList<>();

    private String sleep; // e.g. "8 Hours"
    private String waterIntake; // e.g. "3 Liters"
    private String doctorNotes;

    @Builder.Default
    private List<DoctorComment> doctorComments = new ArrayList<>();

    @Builder.Default
    private Double adherencePercentage = 0.0;

    private String approvedBy;
    private LocalDateTime approvedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Builder.Default
    private Map<String, String> validations = new HashMap<>();

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MedicineRecommendation {
        private String name;
        private String dosage;
        private String frequency;
        private String instructions;
        private boolean active;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DoctorComment {
        private String id;
        private String author;
        private String role; // DOCTOR, NURSE, PATIENT
        private String comment;
        private LocalDateTime timestamp;
    }
}
