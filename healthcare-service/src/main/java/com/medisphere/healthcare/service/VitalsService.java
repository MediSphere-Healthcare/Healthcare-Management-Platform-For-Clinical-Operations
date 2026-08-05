package com.medisphere.healthcare.service;

import com.medisphere.healthcare.dto.VitalsEvent;
import com.medisphere.healthcare.model.Patient;
import com.medisphere.healthcare.model.VitalsRecord;
import com.medisphere.healthcare.repository.PatientRepository;
import com.medisphere.healthcare.repository.VitalsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
@RequiredArgsConstructor
@Slf4j
public class VitalsService {

    private final PatientRepository patientRepository;
    private final VitalsRepository vitalsRepository;
    private final KafkaTemplate<String, VitalsEvent> kafkaTemplate;

    @Value("${vitals.kafka.topic:vitals-stream}")
    private String vitalsTopic;

    private final Map<String, List<SseEmitter>> emitters = new ConcurrentHashMap<>();
    private final Random random = new Random();

    // ─── SSE Subscription ───

    public SseEmitter subscribe(String patientId) {
        log.info("Client subscribed to vitals stream for patient: {}", patientId);
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);

        emitters.computeIfAbsent(patientId, k -> new CopyOnWriteArrayList<>()).add(emitter);

        emitter.onCompletion(() -> removeEmitter(patientId, emitter));
        emitter.onTimeout(() -> removeEmitter(patientId, emitter));
        emitter.onError((e) -> removeEmitter(patientId, emitter));

        // Send initial connection event
        try {
            emitter.send(SseEmitter.event()
                    .name("INIT")
                    .data("Connected to vitals stream for patient " + patientId));
        } catch (IOException e) {
            removeEmitter(patientId, emitter);
        }

        return emitter;
    }

    private void removeEmitter(String patientId, SseEmitter emitter) {
        List<SseEmitter> patientEmitters = emitters.get(patientId);
        if (patientEmitters != null) {
            patientEmitters.remove(emitter);
            if (patientEmitters.isEmpty()) {
                emitters.remove(patientId);
            }
        }
    }

    // ─── Kafka Producer: Simulate wearable vitals and publish ───

    @Scheduled(fixedRateString = "${vitals.simulation.interval-ms:2000}")
    public void simulateAndPublishVitals() {
        if (emitters.isEmpty()) {
            return;
        }

        for (String patientId : emitters.keySet()) {
            patientRepository.findById(patientId).ifPresent(patient -> {
                Patient.Vitals current = patient.getCurrentVitals();
                if (current == null) {
                    current = Patient.Vitals.builder()
                            .heartRate(72.0).bpSystolic("120").bpDiastolic("80")
                            .spo2(98.0).temperature(37.0).respiratoryRate(16.0)
                            .timestamp(LocalDateTime.now()).build();
                }

                // Simulate slight vitals fluctuations
                double hr = Math.round((current.getHeartRate() + (random.nextDouble() * 4 - 2)) * 10.0) / 10.0;
                hr = Math.max(50.0, Math.min(130.0, hr));

                double spo2 = Math.round((current.getSpo2() + (random.nextDouble() * 0.6 - 0.3)) * 10.0) / 10.0;
                spo2 = Math.max(90.0, Math.min(100.0, spo2));

                int sys = Integer.parseInt(current.getBpSystolic()) + random.nextInt(3) - 1;
                sys = Math.max(90, Math.min(180, sys));

                int dia = Integer.parseInt(current.getBpDiastolic()) + random.nextInt(3) - 1;
                dia = Math.max(60, Math.min(110, dia));

                VitalsEvent event = VitalsEvent.builder()
                        .patientId(patientId)
                        .heartRate(hr)
                        .bpSystolic(String.valueOf(sys))
                        .bpDiastolic(String.valueOf(dia))
                        .spo2(spo2)
                        .temperature(current.getTemperature())
                        .respiratoryRate(current.getRespiratoryRate())
                        .timestamp(LocalDateTime.now())
                        .build();

                // Publish to Kafka
                kafkaTemplate.send(vitalsTopic, patientId, event);
                log.debug("Published vitals event to Kafka for patient: {}", patientId);
            });
        }
    }

    // ─── Kafka Consumer: Consume, save, and broadcast via SSE ───

    @KafkaListener(topics = "${vitals.kafka.topic:vitals-stream}", groupId = "${spring.kafka.consumer.group-id:healthcare-vitals-group}")
    public void consumeVitalsEvent(VitalsEvent event) {
        log.debug("Consumed vitals event from Kafka for patient: {}", event.getPatientId());

        // Save to vitals collection
        vitalsRepository.save(VitalsRecord.builder()
                .patientId(event.getPatientId())
                .vitalType("HeartRate")
                .value(event.getHeartRate())
                .unit("bpm")
                .source("kafka")
                .timestamp(event.getTimestamp())
                .build());

        // Update patient's current vitals
        patientRepository.findById(event.getPatientId()).ifPresent(patient -> {
            Patient.Vitals updated = Patient.Vitals.builder()
                    .heartRate(event.getHeartRate())
                    .bpSystolic(event.getBpSystolic())
                    .bpDiastolic(event.getBpDiastolic())
                    .spo2(event.getSpo2())
                    .temperature(event.getTemperature())
                    .respiratoryRate(event.getRespiratoryRate())
                    .timestamp(event.getTimestamp())
                    .build();

            patient.setCurrentVitals(updated);

            // Add to vitals history (cap at 50 records)
            if (patient.getVitalsHistory() == null) {
                patient.setVitalsHistory(new ArrayList<>());
            }
            patient.getVitalsHistory().add(Patient.VitalsRecord.builder()
                    .vitalType("HeartRate").value(event.getHeartRate()).unit("bpm")
                    .timestamp(event.getTimestamp()).build());
            patient.getVitalsHistory().add(Patient.VitalsRecord.builder()
                    .vitalType("SpO2").value(event.getSpo2()).unit("%")
                    .timestamp(event.getTimestamp()).build());

            if (patient.getVitalsHistory().size() > 50) {
                patient.setVitalsHistory(patient.getVitalsHistory()
                        .subList(patient.getVitalsHistory().size() - 50, patient.getVitalsHistory().size()));
            }

            patientRepository.save(patient);

            // Broadcast via SSE
            broadcast(event.getPatientId(), updated);
        });
    }

    // ─── Latest Vitals ───

    public Patient.Vitals getLatestVitals(String patientId) {
        return patientRepository.findById(patientId)
                .map(Patient::getCurrentVitals)
                .orElse(null);
    }

    // ─── SSE Broadcast ───

    private void broadcast(String patientId, Patient.Vitals vitals) {
        List<SseEmitter> patientEmitters = emitters.get(patientId);
        if (patientEmitters == null) return;

        List<SseEmitter> deadEmitters = new ArrayList<>();
        for (SseEmitter emitter : patientEmitters) {
            try {
                emitter.send(SseEmitter.event()
                        .name("VITALS_UPDATE")
                        .data(vitals));
            } catch (IOException e) {
                deadEmitters.add(emitter);
            }
        }
        deadEmitters.forEach(dead -> removeEmitter(patientId, dead));
    }
}
