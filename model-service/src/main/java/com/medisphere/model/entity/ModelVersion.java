package com.medisphere.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "models")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ModelVersion {
    @Id
    private String id;
    private String version;
    private double accuracy;
    private LocalDate createdDate;
    private String status; // ACTIVE, INACTIVE
}
