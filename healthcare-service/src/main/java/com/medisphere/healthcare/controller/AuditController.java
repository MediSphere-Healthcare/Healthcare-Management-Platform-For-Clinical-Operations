package com.medisphere.healthcare.controller;

import com.medisphere.healthcare.model.AuditLog;
import com.medisphere.healthcare.service.AuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit")
@RequiredArgsConstructor
public class AuditController {

    private final AuditService auditService;

    @GetMapping("/logs")
    public ResponseEntity<List<AuditLog>> getAuditLogs() {
        return ResponseEntity.ok(auditService.getAllLogs());
    }

    @GetMapping("/logs/{patientId}")
    public ResponseEntity<List<AuditLog>> getLogsByPatient(@PathVariable String patientId) {
        return ResponseEntity.ok(auditService.getLogsForPatient(patientId));
    }
}
