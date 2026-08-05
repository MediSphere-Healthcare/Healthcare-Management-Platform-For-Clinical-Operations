package com.medisphere.healthcare.repository;

import com.medisphere.healthcare.model.VitalsRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VitalsRepository extends MongoRepository<VitalsRecord, String> {
    List<VitalsRecord> findByPatientIdOrderByTimestampDesc(String patientId);
    VitalsRecord findFirstByPatientIdOrderByTimestampDesc(String patientId);
}
