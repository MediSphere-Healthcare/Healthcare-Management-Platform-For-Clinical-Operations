package com.medisphere.prediction.service;

import com.medisphere.prediction.client.HealthTwinClient;
import com.medisphere.prediction.client.ModelServiceClient;
import com.medisphere.prediction.dto.PatientDto;
import com.medisphere.prediction.dto.ModelVersionDto;
import com.medisphere.prediction.dto.PredictionRequest;
import com.medisphere.prediction.dto.PredictionResponse;
import com.medisphere.prediction.entity.RiskPrediction;
import com.medisphere.prediction.repository.PredictionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PredictionService {

    private final PredictionRepository predictionRepository;
    private final HealthTwinClient healthTwinClient;
    private final ModelServiceClient modelServiceClient;
    private final RestTemplate restTemplate = new RestTemplate();

    private static final String FLASK_URL = "http://localhost:5000/predict";

    public PredictionResponse predictCvd(PredictionRequest request) {
        String patientId = (request != null && request.getPatientId() != null) ? request.getPatientId() : "saurabh";
        return generatePrediction(patientId, "CVD");
    }

    public PredictionResponse predictDiabetes(PredictionRequest request) {
        String patientId = (request != null && request.getPatientId() != null) ? request.getPatientId() : "saurabh";
        return generatePrediction(patientId, "DIABETES");
    }

    private PredictionResponse generatePrediction(String patientId, String riskType) {
        log.info("Generating prediction for patient: {} and riskType: {}", patientId, riskType);
        
        // 1. Fetch patient data using OpenFeign from healthcare-service
        PatientDto patient = healthTwinClient.getPatientById(patientId);
        if (patient == null) {
            throw new IllegalArgumentException("Patient not found: " + patientId);
        }

        // Extract features
        int age = patient.getAge() != null ? patient.getAge() : 30;
        
        double heartRate = 72;
        double bpSystolic = 120;
        if (patient.getCurrentVitals() != null) {
            if (patient.getCurrentVitals().getHeartRate() != null) {
                heartRate = patient.getCurrentVitals().getHeartRate();
            }
            if (patient.getCurrentVitals().getBpSystolic() != null) {
                try {
                    bpSystolic = Double.parseDouble(patient.getCurrentVitals().getBpSystolic());
                } catch (NumberFormatException e) {
                    log.warn("Invalid bpSystolic value: {}", patient.getCurrentVitals().getBpSystolic());
                }
            }
        }

        double bmi = 22;
        double hba1c = 5.5;
        double cholesterol = 180;

        if (patient.getLabResults() != null) {
            for (PatientDto.LabResultDto lab : patient.getLabResults()) {
                String name = lab.getTestName() != null ? lab.getTestName().toLowerCase() : "";
                try {
                    if (name.contains("bmi")) {
                        bmi = Double.parseDouble(lab.getValue());
                    } else if (name.contains("hba1c")) {
                        hba1c = Double.parseDouble(lab.getValue());
                    } else if (name.contains("cholesterol") || name.contains("ldl")) {
                        cholesterol = Double.parseDouble(lab.getValue());
                    }
                } catch (Exception e) {
                    log.warn("Failed to parse lab value for {}: {}", name, lab.getValue());
                }
            }
        }

        double riskPercentage = 0;
        String riskLevel = "LOW";
        double confidence = 90.0;
        String modelVersion = "1.0";

        // Query model-service for the active/latest model version dynamically
        String activeModelVersion = "1.0";
        try {
            ModelVersionDto latestModel = modelServiceClient.getLatestModel();
            if (latestModel != null && latestModel.getVersion() != null) {
                activeModelVersion = latestModel.getVersion();
            }
        } catch (Exception e) {
            log.warn("Failed to retrieve active model version from model-service, using default: {}", e.getMessage());
        }

        // Try Python Flask API first (Phase 17)
        boolean pythonSuccess = false;
        try {
            Map<String, Object> flaskRequest = new HashMap<>();
            flaskRequest.put("Age", age);
            flaskRequest.put("BP", bpSystolic);
            flaskRequest.put("BMI", bmi);
            flaskRequest.put("HbA1c", hba1c);
            flaskRequest.put("HeartRate", heartRate);
            flaskRequest.put("Cholesterol", cholesterol);

            log.info("Attempting to call Flask API for ML prediction: {}", flaskRequest);
            ResponseEntity<Map> response = restTemplate.postForEntity(FLASK_URL, flaskRequest, Map.class);
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                Map body = response.getBody();
                // Check keys based on predict.py
                if (body.containsKey("risk_probability")) {
                    riskPercentage = ((Number) body.get("risk_probability")).doubleValue() * 100;
                } else if (body.containsKey("highRiskProbability")) {
                    riskPercentage = ((Number) body.get("highRiskProbability")).doubleValue();
                }
                
                String risk = (String) body.get("risk");
                if (risk == null) {
                    risk = (int) body.getOrDefault("prediction", 0) == 1 ? "HIGH" : "LOW";
                }
                riskLevel = risk;
                confidence = 94.0; // standard ML model confidence
                modelVersion = activeModelVersion + " (TensorFlow)";
                pythonSuccess = true;
                log.info("Flask API success. Risk Level: {}, Prob: {}", riskLevel, riskPercentage);
            }
        } catch (Exception e) {
            log.warn("Flask API unavailable. Falling back to Java Rule Engine. Error: {}", e.getMessage());
        }

        // Fallback to Simple Java Rule Engine (Phase 7)
        if (!pythonSuccess) {
            double score = 0;
            if (age > 60) score += 15;
            if (bpSystolic > 140) score += 20;
            if (bmi > 30) score += 15;
            if (hba1c > 7) score += 20;
            if (heartRate > 110) score += 10;
            if (cholesterol > 220) score += 20;

            riskPercentage = score;
            if (score <= 30) {
                riskLevel = "LOW";
            } else if (score <= 60) {
                riskLevel = "MEDIUM";
            } else {
                riskLevel = "HIGH";
            }
            confidence = 85.0; // Rule engine confidence
            modelVersion = activeModelVersion + " (Rule Engine)";
            log.info("Java Rule Engine output. Score: {}, Risk: {}", score, riskLevel);
        }

        // 4. Save to MongoDB risk_predictions
        RiskPrediction prediction = RiskPrediction.builder()
                .patientId(patientId)
                .riskType(riskType)
                .riskPercentage(riskPercentage)
                .riskLevel(riskLevel)
                .confidence(confidence)
                .predictionDate(LocalDateTime.now())
                .modelVersion(modelVersion)
                .build();

        RiskPrediction saved = predictionRepository.save(prediction);

        return PredictionResponse.builder()
                .id(saved.getId())
                .patientId(saved.getPatientId())
                .riskType(saved.getRiskType())
                .riskPercentage(saved.getRiskPercentage())
                .riskLevel(saved.getRiskLevel())
                .confidence(saved.getConfidence())
                .predictionDate(saved.getPredictionDate())
                .modelVersion(saved.getModelVersion())
                .build();
    }

    public List<PredictionResponse> getHistory(String patientId) {
        return predictionRepository.findByPatientIdOrderByPredictionDateDesc(patientId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public PredictionResponse getLatest(String patientId) {
        List<RiskPrediction> list = predictionRepository.findByPatientIdOrderByPredictionDateDesc(patientId);
        if (list.isEmpty()) {
            return null;
        }
        return mapToResponse(list.get(0));
    }

    public void deletePrediction(String id) {
        predictionRepository.deleteById(id);
    }

    private PredictionResponse mapToResponse(RiskPrediction entity) {
        return PredictionResponse.builder()
                .id(entity.getId())
                .patientId(entity.getPatientId())
                .riskType(entity.getRiskType())
                .riskPercentage(entity.getRiskPercentage())
                .riskLevel(entity.getRiskLevel())
                .confidence(entity.getConfidence())
                .predictionDate(entity.getPredictionDate())
                .modelVersion(entity.getModelVersion())
                .build();
    }
}
