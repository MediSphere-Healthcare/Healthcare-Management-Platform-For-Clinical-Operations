package com.medisphere.healthcare.controller;

import com.medisphere.healthcare.dto.DashboardStats;
import com.medisphere.healthcare.service.AuditService;
import com.medisphere.healthcare.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;
    private final AuditService auditService;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStats> getDashboardStats() {
        auditService.log("VIEW_DASHBOARD_STATS", "system-admin", "SYSTEM",
                "all", "All Patients", "SUCCESS",
                "Fetched global KPI statistics for the dashboard");
        return ResponseEntity.ok(dashboardService.getStats());
    }
}
