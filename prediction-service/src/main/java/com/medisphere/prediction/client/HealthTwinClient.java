package com.medisphere.prediction.client;

import com.medisphere.prediction.dto.PatientDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "healthcare-service")
public interface HealthTwinClient {

    @GetMapping("/api/patients/{id}")
    PatientDto getPatientById(@PathVariable("id") String id);
}
