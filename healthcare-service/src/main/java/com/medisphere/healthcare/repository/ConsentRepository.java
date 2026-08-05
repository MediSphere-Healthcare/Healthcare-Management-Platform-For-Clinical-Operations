package com.medisphere.healthcare.repository;

import com.medisphere.healthcare.model.Consent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConsentRepository extends MongoRepository<Consent, String> {
    List<Consent> findByPatientId(String patientId);
    Optional<Consent> findByPatientIdAndStatus(String patientId, String status);
}
