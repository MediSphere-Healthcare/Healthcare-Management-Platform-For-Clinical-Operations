package com.medisphere.fhir.repository;

import com.medisphere.fhir.model.FhirSyncLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FhirSyncLogRepository extends MongoRepository<FhirSyncLog, String> {
    List<FhirSyncLog> findByPatientEhrId(String patientEhrId);
    List<FhirSyncLog> findAllByOrderByTimestampDesc();
}
