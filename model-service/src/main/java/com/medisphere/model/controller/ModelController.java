package com.medisphere.model.controller;

import com.medisphere.model.entity.ModelVersion;
import com.medisphere.model.service.ModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/model")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ModelController {

    private final ModelService modelService;

    @PostMapping
    public ResponseEntity<ModelVersion> addModel(@RequestBody ModelVersion model) {
        return ResponseEntity.ok(modelService.addModel(model));
    }

    @GetMapping
    public ResponseEntity<List<ModelVersion>> getAllModels() {
        return ResponseEntity.ok(modelService.getAllModels());
    }

    @GetMapping("/latest")
    public ResponseEntity<ModelVersion> getLatestModel() {
        ModelVersion latest = modelService.getLatestModel();
        if (latest == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(latest);
    }

    @PutMapping("/{version}")
    public ResponseEntity<ModelVersion> activateModel(@PathVariable("version") String version) {
        try {
            return ResponseEntity.ok(modelService.activateModel(version));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{version}")
    public ResponseEntity<Void> deleteModel(@PathVariable("version") String version) {
        modelService.deleteModel(version);
        return ResponseEntity.ok().build();
    }
}
