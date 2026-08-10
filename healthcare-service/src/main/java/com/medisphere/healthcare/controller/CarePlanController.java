package com.medisphere.healthcare.controller;

import com.medisphere.healthcare.model.Adherence;
import com.medisphere.healthcare.model.CarePlan;
import com.medisphere.healthcare.model.Outcome;
import com.medisphere.healthcare.service.CarePlanService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/api/careplan", "/careplan"})
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CarePlanController {

    private final CarePlanService carePlanService;

    @PostMapping("/generate")
    public ResponseEntity<CarePlan> generateCarePlan(@RequestBody(required = false) Map<String, String> request) {
        String patientId = (request != null && request.containsKey("patientId")) ? request.get("patientId") : "saurabh";
        CarePlan plan = carePlanService.generateCarePlan(patientId);
        return ResponseEntity.ok(plan);
    }

    @GetMapping("/{patientId}")
    public ResponseEntity<CarePlan> getCarePlan(@PathVariable String patientId) {
        return carePlanService.getCarePlanByPatientId(patientId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/approve")
    public ResponseEntity<CarePlan> approveCarePlan(@RequestBody ApproveRequest request) {
        CarePlan plan = carePlanService.approveCarePlan(
                request.getCarePlanId(),
                request.getDoctorName(),
                request.getDoctorNotes(),
                request.getMedicines()
        );
        return ResponseEntity.ok(plan);
    }

    @PutMapping("/updateProgress")
    public ResponseEntity<CarePlan> updateProgress(@RequestBody ProgressRequest request) {
        CarePlan plan = carePlanService.updateProgress(
                request.getCarePlanId(),
                request.getTasks()
        );
        return ResponseEntity.ok(plan);
    }

    @GetMapping("/history/{patientId}")
    public ResponseEntity<List<CarePlan>> getHistory(@PathVariable String patientId) {
        return ResponseEntity.ok(carePlanService.getCarePlanHistory(patientId));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardSummary() {
        return ResponseEntity.ok(carePlanService.getDashboardSummary());
    }

    @GetMapping("/outcome/{patientId}")
    public ResponseEntity<Outcome> getOutcome(@PathVariable String patientId) {
        return ResponseEntity.ok(carePlanService.getOutcomeForPatient(patientId));
    }

    @PostMapping("/comment")
    public ResponseEntity<CarePlan> addComment(@RequestBody CommentRequest request) {
        CarePlan plan = carePlanService.addDoctorComment(
                request.getCarePlanId(),
                request.getAuthor(),
                request.getRole(),
                request.getComment()
        );
        return ResponseEntity.ok(plan);
    }

    @GetMapping("/validate/{id}")
    public ResponseEntity<Map<String, String>> validateCarePlan(@PathVariable String id) {
        return carePlanService.getCarePlanById(id)
                .map(plan -> ResponseEntity.ok(plan.getValidations()))
                .orElse(ResponseEntity.notFound().build());
    }

    @Data
    public static class ApproveRequest {
        private String carePlanId;
        private String doctorName;
        private String doctorNotes;
        private List<CarePlan.MedicineRecommendation> medicines;
    }

    @Data
    public static class ProgressRequest {
        private String carePlanId;
        private List<Adherence.TaskItem> tasks;
    }

    @Data
    public static class CommentRequest {
        private String carePlanId;
        private String author;
        private String role;
        private String comment;
    }
}
