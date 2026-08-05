package com.medisphere.explainability.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "explanations")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Explanation {
    @Id
    private String id;
    private String patientId;
    private String risk; // LOW, MEDIUM, HIGH
    private List<String> factors; // e.g. ["Blood Pressure +20", "HbA1c +18", "BMI +14"]
}
