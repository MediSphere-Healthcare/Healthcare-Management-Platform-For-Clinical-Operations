package com.medisphere.prediction.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientDto {
    private String id;
    private String name;
    private String gender;
    private String birthDate;
    private Integer age;
    private String contact;
    private VitalsDto currentVitals;
    @Builder.Default
    private List<LabResultDto> labResults = new ArrayList<>();

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VitalsDto {
        private Double heartRate;
        private String bpSystolic;
        private String bpDiastolic;
        private Double spo2;
        private Double temperature;
        private Double respiratoryRate;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LabResultDto {
        private String code;
        private String testName;
        private String value;
        private String unit;
    }
}
