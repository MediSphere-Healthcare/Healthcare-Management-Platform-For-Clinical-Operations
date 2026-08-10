package com.medisphere.healthcare.repository;

import com.medisphere.healthcare.model.CarePlan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarePlanRepository extends MongoRepository<CarePlan, String> {
    List<CarePlan> findByPatientIdOrderByCreatedAtDesc(String patientId);
    Optional<CarePlan> findFirstByPatientIdOrderByCreatedAtDesc(String patientId);
    List<CarePlan> findByStatus(String status);
    long countByStatus(String status);
}
