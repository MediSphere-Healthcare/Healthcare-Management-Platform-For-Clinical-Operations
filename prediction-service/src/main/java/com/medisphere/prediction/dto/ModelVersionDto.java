package com.medisphere.prediction.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ModelVersionDto {
    private String id;
    private String version;
    private double accuracy;
    private LocalDate createdDate;
    private String status;
}
