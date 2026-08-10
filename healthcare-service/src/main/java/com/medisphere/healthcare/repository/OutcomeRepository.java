package com.medisphere.healthcare.repository;

import com.medisphere.healthcare.model.Outcome;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OutcomeRepository extends MongoRepository<Outcome, String> {
    List<Outcome> findByPatientIdOrderByRecordedAtDesc(String patientId);
    Optional<Outcome> findFirstByPatientIdOrderByRecordedAtDesc(String patientId);
}
