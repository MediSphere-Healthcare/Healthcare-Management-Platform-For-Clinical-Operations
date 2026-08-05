package com.medisphere.prediction.client;

import com.medisphere.prediction.dto.ModelVersionDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "model-service")
public interface ModelServiceClient {

    @GetMapping("/api/model/latest")
    ModelVersionDto getLatestModel();
}
