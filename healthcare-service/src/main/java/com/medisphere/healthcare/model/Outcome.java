package com.medisphere.healthcare.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "outcomes")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Outcome {

    @Id
    private String id;
    private String patientId;
    private String carePlanId;
    private Double previousRisk;
    private Double currentRisk;
    private Double weightInitial;
    private Double weightCurrent;
    private String bpInitial;
    private String bpCurrent;
    private Double sugarInitial;
    private Double sugarCurrent;
    private String outcomeStatus; // RISK_REDUCED, STABLE, NEEDS_REVIEW
    private LocalDateTime recordedAt;
}
