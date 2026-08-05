package com.medisphere.prediction.repository;

import com.medisphere.prediction.entity.RiskPrediction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PredictionRepository extends MongoRepository<RiskPrediction, String> {
    List<RiskPrediction> findByPatientId(String patientId);
    List<RiskPrediction> findByPatientIdOrderByPredictionDateDesc(String patientId);
}
