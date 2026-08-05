package com.medisphere.explainability.repository;

import com.medisphere.explainability.entity.Explanation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExplanationRepository extends MongoRepository<Explanation, String> {
    List<Explanation> findByPatientId(String patientId);
}
