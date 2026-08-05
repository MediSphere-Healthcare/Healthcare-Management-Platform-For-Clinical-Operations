package com.medisphere.healthcare.service;

import com.medisphere.healthcare.model.AuditLog;
import com.medisphere.healthcare.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    public void log(String action, String accessedBy, String role, String patientId, String patientName, String status, String details) {
        AuditLog log = AuditLog.builder()
                .action(action)
                .accessedBy(accessedBy)
                .role(role)
                .patientId(patientId)
                .patientName(patientName)
                .status(status)
                .timestamp(LocalDateTime.now())
                .details(details)
                .build();
        auditLogRepository.save(log);
    }

    public List<AuditLog> getLogsForPatient(String patientId) {
        return auditLogRepository.findByPatientId(patientId);
    }

    public List<AuditLog> getAllLogs() {
        return auditLogRepository.findAll();
    }
}
