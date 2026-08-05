package com.medisphere.explainability.controller;

import com.medisphere.explainability.entity.Explanation;
import com.medisphere.explainability.service.ExplanationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/explanation")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ExplanationController {

    private final ExplanationService explanationService;

    @PostMapping("/{patientId}")
    public ResponseEntity<Explanation> generateExplanation(@PathVariable("patientId") String patientId) {
        return ResponseEntity.ok(explanationService.generateExplanation(patientId));
    }

    @GetMapping("/{patientId}")
    public ResponseEntity<Explanation> getExplanation(@PathVariable("patientId") String patientId) {
        return ResponseEntity.ok(explanationService.getExplanation(patientId));
    }
}
