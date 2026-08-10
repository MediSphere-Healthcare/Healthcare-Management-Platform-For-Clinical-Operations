package com.medisphere.healthcare.repository;

import com.medisphere.healthcare.model.Adherence;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdherenceRepository extends MongoRepository<Adherence, String> {
    List<Adherence> findByPatientIdOrderByDateDesc(String patientId);
    Optional<Adherence> findByCarePlanIdAndDate(String carePlanId, String date);
    Optional<Adherence> findFirstByPatientIdOrderByDateDesc(String patientId);
}
