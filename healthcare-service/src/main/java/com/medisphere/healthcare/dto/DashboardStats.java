package com.medisphere.healthcare.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStats {
    private long patientsOnboarded;
    private String fhirResourcesSynced;
    private long twinsCreated;
    private String twinCoverage;
}
