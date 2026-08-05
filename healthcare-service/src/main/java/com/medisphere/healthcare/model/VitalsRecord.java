package com.medisphere.healthcare.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "vitals")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VitalsRecord {

    @Id
    private String id;

    private String patientId;
    private String vitalType; // e.g., "HeartRate", "SpO2", "BloodPressure"
    private Double value;
    private String unit;
    private String source; // "wearable", "kafka", "manual"
    private LocalDateTime timestamp;
}
