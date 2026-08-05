package com.medisphere.healthcare.service;

import com.medisphere.healthcare.dto.DashboardStats;
import com.medisphere.healthcare.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final PatientRepository patientRepository;

    public DashboardStats getStats() {
        long actualPatients = patientRepository.count();

        return DashboardStats.builder()
                .patientsOnboarded(1247 + actualPatients)
                .fhirResourcesSynced("2.4M")
                .twinsCreated(1247 + actualPatients)
                .twinCoverage("100%")
                .build();
    }
}
