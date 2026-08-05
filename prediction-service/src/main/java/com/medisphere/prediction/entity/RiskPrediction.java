package com.medisphere.prediction.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "risk_predictions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RiskPrediction {
    @Id
    private String id;
    private String patientId;
    private String riskType; // CVD or DIABETES
    private double riskPercentage;
    private String riskLevel; // LOW, MEDIUM, HIGH
    private double confidence;
    private LocalDateTime predictionDate;
    private String modelVersion;
}
