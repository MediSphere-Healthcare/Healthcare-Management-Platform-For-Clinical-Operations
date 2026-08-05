package com.medisphere.healthcare.controller;

import com.medisphere.healthcare.model.Patient;
import com.medisphere.healthcare.service.VitalsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/vitals")
@RequiredArgsConstructor
public class VitalsController {

    private final VitalsService vitalsService;

    @GetMapping(value = "/stream/{patientId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamVitals(@PathVariable String patientId) {
        return vitalsService.subscribe(patientId);
    }

    @GetMapping("/latest/{patientId}")
    public ResponseEntity<Patient.Vitals> getLatestVitals(@PathVariable String patientId) {
        Patient.Vitals vitals = vitalsService.getLatestVitals(patientId);
        if (vitals == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(vitals);
    }
}
