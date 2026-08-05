package com.medisphere.healthcare.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VitalsEvent {
    private String patientId;
    private Double heartRate;
    private String bpSystolic;
    private String bpDiastolic;
    private Double spo2;
    private Double temperature;
    private Double respiratoryRate;
    private LocalDateTime timestamp;
}
