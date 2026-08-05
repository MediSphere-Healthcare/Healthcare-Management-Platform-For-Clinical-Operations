package com.medisphere.prediction.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PredictionResponse {
    private String id;
    private String patientId;
    private String riskType;
    private double riskPercentage;
    private String riskLevel;
    private double confidence;
    private LocalDateTime predictionDate;
    private String modelVersion;
}
