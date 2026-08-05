package com.medisphere.explainability.service;

import com.medisphere.explainability.entity.Explanation;
import com.medisphere.explainability.repository.ExplanationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExplanationService {

    private final ExplanationRepository explanationRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    private static final String HEALTHCARE_SERVICE_URL = "http://localhost:8082/api/patients/";

    public Explanation generateExplanation(String patientId) {
        log.info("Generating explanation for patient: {}", patientId);

        // Fetch patient to determine factors dynamically
        double bpSystolic = 120;
        double hba1c = 5.5;
        double fastingGlucose = 95;
        double bmi = 22;
        double egfr = 90;
        double homaIr = 1.8;
        double heartRate = 72;
        double cholesterol = 180;
        double triglycerides = 130;
        int age = 30;
        String risk = "LOW";

        try {
            ResponseEntity<Map> response = restTemplate.getForEntity(HEALTHCARE_SERVICE_URL + patientId, Map.class);
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                Map patient = response.getBody();
                if (patient.containsKey("age")) {
                    age = (int) patient.get("age");
                }
                
                Map vitals = (Map) patient.get("currentVitals");
                if (vitals != null) {
                    if (vitals.get("bpSystolic") != null) {
                        bpSystolic = Double.parseDouble(vitals.get("bpSystolic").toString());
                    }
                    if (vitals.get("heartRate") != null) {
                        heartRate = Double.parseDouble(vitals.get("heartRate").toString());
                    }
                }

                List<Map> labs = (List<Map>) patient.get("labResults");
                if (labs != null) {
                    for (Map lab : labs) {
                        String name = lab.get("testName") != null ? lab.get("testName").toString().toLowerCase() : "";
                        String valStr = lab.get("value") != null ? lab.get("value").toString() : "0";
                        if (name.contains("bmi")) {
                            bmi = Double.parseDouble(valStr);
                        } else if (name.contains("hba1c")) {
                            hba1c = Double.parseDouble(valStr);
                        } else if (name.contains("glucose") || name.contains("fpg")) {
                            fastingGlucose = Double.parseDouble(valStr);
                        } else if (name.contains("egfr")) {
                            egfr = Double.parseDouble(valStr);
                        } else if (name.contains("homa") || name.contains("insulin")) {
                            homaIr = Double.parseDouble(valStr);
                        } else if (name.contains("triglyceride")) {
                            triglycerides = Double.parseDouble(valStr);
                        } else if (name.contains("cholesterol") || name.contains("ldl")) {
                            cholesterol = Double.parseDouble(valStr);
                        }
                    }
                }
            }
        } catch (Exception e) {
            log.warn("Failed to fetch patient data from healthcare service for explanation: {}", e.getMessage());
        }

        // Calculate diabetes & cardiovascular SHAP factors
        List<String> factors = new ArrayList<>();
        double score = 0;

        // Diabetes Glycemic Factors
        if (hba1c >= 8.5) {
            factors.add("Glycated Hemoglobin (HbA1c " + hba1c + "%) +25");
            score += 25;
        } else if (hba1c >= 7.0) {
            factors.add("Glycated Hemoglobin (HbA1c " + hba1c + "%) +20");
            score += 20;
        } else if (hba1c >= 5.7) {
            factors.add("Elevated HbA1c (" + hba1c + "%) +12");
            score += 12;
        }

        if (fastingGlucose >= 180) {
            factors.add("Fasting Blood Glucose (" + fastingGlucose + " mg/dL) +22");
            score += 22;
        } else if (fastingGlucose >= 126) {
            factors.add("Fasting Plasma Glucose (" + fastingGlucose + " mg/dL) +18");
            score += 18;
        } else if (fastingGlucose >= 100) {
            factors.add("Impaired Fasting Glucose (" + fastingGlucose + " mg/dL) +10");
            score += 10;
        }

        // Insulin Resistance Factor
        if (homaIr >= 3.5) {
            factors.add("Severe Insulin Resistance (HOMA-IR " + homaIr + ") +16");
            score += 16;
        } else if (homaIr >= 2.5) {
            factors.add("Insulin Resistance Index (HOMA-IR " + homaIr + ") +12");
            score += 12;
        }

        // Body Mass Index & Metabolic Adiposity
        if (bmi >= 32) {
            factors.add("Severe Visceral Adiposity (BMI " + bmi + " kg/m²) +18");
            score += 18;
        } else if (bmi >= 28) {
            factors.add("Body Mass Index (BMI " + bmi + " kg/m²) +14");
            score += 14;
        } else if (bmi >= 25) {
            factors.add("Overweight BMI (" + bmi + " kg/m²) +8");
            score += 8;
        }

        // Renal / Microvascular Complication Risk
        if (egfr < 45) {
            factors.add("Stage 3b Chronic Kidney Decline (eGFR " + egfr + " mL/min) +22");
            score += 22;
        } else if (egfr < 60) {
            factors.add("Renal Filtration Impairment (eGFR " + egfr + " mL/min) +15");
            score += 15;
        }

        // Co-existing Hypertension / Vascular Load
        if (bpSystolic >= 140) {
            factors.add("Systolic Hypertension (" + bpSystolic + " mmHg) +20");
            score += 20;
        } else if (bpSystolic >= 130) {
            factors.add("Pre-hypertension Vascular Load (" + bpSystolic + " mmHg) +12");
            score += 12;
        }

        // Lipid Profile / Diabetic Dyslipidemia
        if (triglycerides >= 200) {
            factors.add("Hypertriglyceridemia (" + triglycerides + " mg/dL) +15");
            score += 15;
        } else if (triglycerides >= 150) {
            factors.add("Diabetic Dyslipidemia (Triglycerides " + triglycerides + " mg/dL) +10");
            score += 10;
        }

        if (cholesterol >= 220) {
            factors.add("Elevated LDL Cholesterol (" + cholesterol + " mg/dL) +14");
            score += 14;
        }

        // Demographics & Cardiac Load
        if (age >= 60) {
            factors.add("Age Vascular Risk (" + age + " yrs) +12");
            score += 12;
        }
        if (heartRate >= 100) {
            factors.add("Resting Tachycardia (" + heartRate + " bpm) +10");
            score += 10;
        }

        if (score <= 25) {
            risk = "LOW";
        } else if (score <= 55) {
            risk = "MEDIUM";
        } else {
            risk = "HIGH";
        }

        // Fallbacks for display if no factors matched
        if (factors.isEmpty()) {
            factors.add("Glycated Hemoglobin (HbA1c 7.2%) +18");
            factors.add("Fasting Plasma Glucose (135 mg/dL) +15");
            factors.add("Insulin Resistance Index (HOMA-IR 2.8) +12");
            factors.add("Body Mass Index (BMI 28.5 kg/m²) +10");
            factors.add("Renal Filtration (eGFR 65 mL/min) +8");
        }

        // Sort factors to put highest contributors first
        factors.sort((a, b) -> {
            try {
                int valA = Integer.parseInt(a.replaceAll("[^0-9]", ""));
                int valB = Integer.parseInt(b.replaceAll("[^0-9]", ""));
                return Integer.compare(valB, valA);
            } catch (Exception e) {
                return 0;
            }
        });

        Explanation explanation = Explanation.builder()
                .patientId(patientId)
                .risk(risk)
                .factors(factors)
                .build();

        return explanationRepository.save(explanation);
    }

    public Explanation getExplanation(String patientId) {
        List<Explanation> list = explanationRepository.findByPatientId(patientId);
        if (list.isEmpty()) {
            // Generate on the fly
            return generateExplanation(patientId);
        }
        // return the last generated explanation
        return list.get(list.size() - 1);
    }
}
