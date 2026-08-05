package com.medisphere.fhir.service;

import com.medisphere.fhir.model.FhirSyncLog;
import com.medisphere.fhir.repository.FhirSyncLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FhirSyncService {

    private final FhirSyncLogRepository syncLogRepository;

    public List<FhirSyncLog> getAllSyncLogs() {
        return syncLogRepository.findAllByOrderByTimestampDesc();
    }

    public List<FhirSyncLog> getSyncLogsByPatient(String patientEhrId) {
        return syncLogRepository.findByPatientEhrId(patientEhrId);
    }
}
