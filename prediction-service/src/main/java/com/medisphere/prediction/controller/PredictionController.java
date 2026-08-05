package com.medisphere.prediction.controller;

import com.medisphere.prediction.dto.PredictionRequest;
import com.medisphere.prediction.dto.PredictionResponse;
import com.medisphere.prediction.service.PredictionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prediction")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PredictionController {

    private final PredictionService predictionService;

    @PostMapping("/cvd")
    public ResponseEntity<PredictionResponse> predictCvd(
            @RequestBody(required = false) PredictionRequest request) {
        if (request == null) request = new PredictionRequest();
        return ResponseEntity.ok(predictionService.predictCvd(request));
    }

    @PostMapping("/diabetes")
    public ResponseEntity<PredictionResponse> predictDiabetes(
            @RequestBody(required = false) PredictionRequest request) {
        if (request == null) request = new PredictionRequest();
        return ResponseEntity.ok(predictionService.predictDiabetes(request));
    }

    @GetMapping("/history/{id}")
    public ResponseEntity<List<PredictionResponse>> getHistory(@PathVariable("id") String patientId) {
        return ResponseEntity.ok(predictionService.getHistory(patientId));
    }

    @GetMapping("/latest/{id}")
    public ResponseEntity<PredictionResponse> getLatest(@PathVariable("id") String patientId) {
        PredictionResponse latest = predictionService.getLatest(patientId);
        if (latest == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(latest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrediction(@PathVariable("id") String id) {
        predictionService.deletePrediction(id);
        return ResponseEntity.ok().build();
    }
}
