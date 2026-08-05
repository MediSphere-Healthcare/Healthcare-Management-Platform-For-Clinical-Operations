package com.medisphere.healthcare.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfig {

    @Value("${vitals.kafka.topic:vitals-stream}")
    private String vitalsTopic;

    @Bean
    public NewTopic vitalsStreamTopic() {
        return TopicBuilder.name(vitalsTopic)
                .partitions(3)
                .replicas(1)
                .build();
    }
}
