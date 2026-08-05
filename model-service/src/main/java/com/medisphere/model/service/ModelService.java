package com.medisphere.model.service;

import com.medisphere.model.entity.ModelVersion;
import com.medisphere.model.repository.ModelRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ModelService {

    private final ModelRepository modelRepository;

    @PostConstruct
    public void init() {
        if (modelRepository.count() == 0) {
            log.info("Initializing database with default model version 1.0");
            ModelVersion defaultModel = ModelVersion.builder()
                    .version("1.0")
                    .accuracy(91.4)
                    .createdDate(LocalDate.of(2026, 7, 12))
                    .status("ACTIVE")
                    .build();
            modelRepository.save(defaultModel);
        }
    }

    public ModelVersion addModel(ModelVersion model) {
        if (model.getCreatedDate() == null) {
            model.setCreatedDate(LocalDate.now());
        }
        if ("ACTIVE".equalsIgnoreCase(model.getStatus())) {
            deactivateAll();
        } else {
            model.setStatus("INACTIVE");
        }
        return modelRepository.save(model);
    }

    public List<ModelVersion> getAllModels() {
        return modelRepository.findAll();
    }

    public ModelVersion getLatestModel() {
        return modelRepository.findFirstByStatusOrderByCreatedDateDesc("ACTIVE")
                .orElseGet(() -> {
                    List<ModelVersion> all = modelRepository.findAll();
                    if (all.isEmpty()) {
                        return null;
                    }
                    return all.get(all.size() - 1);
                });
    }

    public ModelVersion activateModel(String version) {
        Optional<ModelVersion> optional = modelRepository.findByVersion(version);
        if (optional.isPresent()) {
            deactivateAll();
            ModelVersion model = optional.get();
            model.setStatus("ACTIVE");
            return modelRepository.save(model);
        }
        throw new IllegalArgumentException("Model not found: " + version);
    }

    public void deleteModel(String version) {
        Optional<ModelVersion> optional = modelRepository.findByVersion(version);
        optional.ifPresent(model -> modelRepository.deleteById(model.getId()));
    }

    private void deactivateAll() {
        List<ModelVersion> all = modelRepository.findAll();
        for (ModelVersion mv : all) {
            if ("ACTIVE".equalsIgnoreCase(mv.getStatus())) {
                mv.setStatus("INACTIVE");
                modelRepository.save(mv);
            }
        }
    }
}
