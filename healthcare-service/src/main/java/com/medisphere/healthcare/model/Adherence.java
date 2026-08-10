package com.medisphere.healthcare.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "adherence")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Adherence {

    @Id
    private String id;
    private String carePlanId;
    private String patientId;
    private String date; // YYYY-MM-DD

    @Builder.Default
    private List<TaskItem> tasks = new ArrayList<>();

    @Builder.Default
    private Double adherencePercentage = 0.0;

    private LocalDateTime updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TaskItem {
        private String taskId;
        private String title;
        private String category; // MEDICINE, EXERCISE, VITAL_CHECK, DIET
        private boolean completed;
        private String time;
    }
}
