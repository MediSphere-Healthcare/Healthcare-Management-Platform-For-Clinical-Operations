package com.medisphere.healthcare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HealthcareServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(HealthcareServiceApplication.class, args);
    }
}
