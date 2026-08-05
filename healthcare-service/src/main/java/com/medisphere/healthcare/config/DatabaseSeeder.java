package com.medisphere.healthcare.config;

import com.medisphere.healthcare.model.Consent;
import com.medisphere.healthcare.model.Patient;
import com.medisphere.healthcare.repository.ConsentRepository;
import com.medisphere.healthcare.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class DatabaseSeeder implements CommandLineRunner {

    private final PatientRepository patientRepository;
    private final ConsentRepository consentRepository;

    @Override
    public void run(String... args) {
        log.info("Cleaning database collections before seeding...");
        patientRepository.deleteAll();
        consentRepository.deleteAll();

        log.info("Seeding Patient Twin: Saurabh...");

        // Organ Risk Heatmap
        Map<String, Integer> organRisk = new HashMap<>();
        organRisk.put("cardiovascular", 75);
        organRisk.put("renal", 65);
        organRisk.put("metabolic", 80);
        organRisk.put("pulmonary", 12);
        organRisk.put("hepatic", 18);

        // Conditions
        List<Patient.ConditionInfo> conditions = new ArrayList<>();
        conditions.add(Patient.ConditionInfo.builder()
                .code("38341003")
                .system("http://snomed.info/sct")
                .display("Hypertension")
                .severity("moderate")
                .onsetDate("2021-04-12")
                .build());
        conditions.add(Patient.ConditionInfo.builder()
                .code("44054006")
                .system("http://snomed.info/sct")
                .display("T2 Diabetes")
                .severity("moderate")
                .onsetDate("2022-09-18")
                .build());

        // Lab Results
        List<Patient.LabResult> labs = new ArrayList<>();
        labs.add(Patient.LabResult.builder()
                .code("4548-4").testName("HbA1c").value("7.2").unit("%")
                .referenceRange("4.0 - 5.6").date(LocalDateTime.now().minusDays(10)).build());
        labs.add(Patient.LabResult.builder()
                .code("33914-3").testName("eGFR").value("65").unit("mL/min/1.73m2")
                .referenceRange(">90").date(LocalDateTime.now().minusDays(10)).build());
        labs.add(Patient.LabResult.builder()
                .code("13457-7").testName("LDL").value("120").unit("mg/dL")
                .referenceRange("<100").date(LocalDateTime.now().minusDays(10)).build());

        // Medications
        List<Patient.MedicationInfo> meds = new ArrayList<>();
        meds.add(Patient.MedicationInfo.builder()
                .code("860975").name("Metformin 500mg")
                .dosageInstruction("Take 1 tablet daily by mouth with meals")
                .status("active").datePrescribed("2022-09-20").build());
        meds.add(Patient.MedicationInfo.builder()
                .code("311354").name("Lisinopril 10mg")
                .dosageInstruction("Take 1 tablet daily by mouth")
                .status("active").datePrescribed("2021-04-15").build());

        // Current Vitals
        Patient.Vitals vitals = Patient.Vitals.builder()
                .heartRate(72.0).bpSystolic("130").bpDiastolic("85")
                .spo2(98.0).temperature(36.8).respiratoryRate(16.0)
                .timestamp(LocalDateTime.now()).build();

        Patient saurabh = Patient.builder()
                .id("saurabh")
                .ehrId("saurabh")
                .sourceEhr("Epic EHR")
                .name("Saurabh")
                .gender("Male")
                .birthDate("2000-10-15")
                .age(25)
                .contact("+1 (555) 019-2834")
                .conditions(conditions)
                .currentVitals(vitals)
                .vitalsHistory(new ArrayList<>())
                .labResults(labs)
                .medications(meds)
                .organRiskHeatmap(organRisk)
                .lastSynced(LocalDateTime.now())
                .build();

        // Populate initial vitals history
        saurabh.getVitalsHistory().add(Patient.VitalsRecord.builder()
                .vitalType("HeartRate").value(72.0).unit("bpm")
                .timestamp(LocalDateTime.now().minusMinutes(10)).build());
        saurabh.getVitalsHistory().add(Patient.VitalsRecord.builder()
                .vitalType("SpO2").value(98.0).unit("%")
                .timestamp(LocalDateTime.now().minusMinutes(10)).build());

        patientRepository.save(saurabh);
        log.info("Patient Twin Saurabh seeded successfully!");

        // ------------------ Amit Sharma Seeding ------------------
        log.info("Seeding Patient Twin: Amit...");
        Map<String, Integer> amitRisk = new HashMap<>();
        amitRisk.put("cardiovascular", 20);
        amitRisk.put("renal", 10);
        amitRisk.put("metabolic", 25);
        amitRisk.put("pulmonary", 55);
        amitRisk.put("hepatic", 15);

        List<Patient.ConditionInfo> amitConditions = new ArrayList<>();
        amitConditions.add(Patient.ConditionInfo.builder()
                .code("59621000")
                .system("http://snomed.info/sct")
                .display("Asthma")
                .severity("mild")
                .onsetDate("2018-11-05")
                .build());

        List<Patient.LabResult> amitLabs = new ArrayList<>();
        amitLabs.add(Patient.LabResult.builder()
                .code("4548-4").testName("HbA1c").value("5.4").unit("%")
                .referenceRange("4.0 - 5.6").date(LocalDateTime.now().minusDays(15)).build());
        amitLabs.add(Patient.LabResult.builder()
                .code("33914-3").testName("eGFR").value("95").unit("mL/min/1.73m2")
                .referenceRange(">90").date(LocalDateTime.now().minusDays(15)).build());
        amitLabs.add(Patient.LabResult.builder()
                .code("13457-7").testName("LDL").value("90").unit("mg/dL")
                .referenceRange("<100").date(LocalDateTime.now().minusDays(15)).build());

        List<Patient.MedicationInfo> amitMeds = new ArrayList<>();
        amitMeds.add(Patient.MedicationInfo.builder()
                .code("311354").name("Albuterol Inhaler")
                .dosageInstruction("Inhale 2 puffs every 4-6 hours as needed")
                .status("active").datePrescribed("2018-11-06").build());

        Patient.Vitals amitVitals = Patient.Vitals.builder()
                .heartRate(80.0).bpSystolic("120").bpDiastolic("80")
                .spo2(96.0).temperature(37.0).respiratoryRate(18.0)
                .timestamp(LocalDateTime.now()).build();

        Patient amit = Patient.builder()
                .id("amit")
                .ehrId("amit")
                .sourceEhr("Apollo EHR")
                .name("Amit Sharma")
                .gender("Male")
                .birthDate("1985-05-20")
                .age(41)
                .contact("+91 98765 43210")
                .conditions(amitConditions)
                .currentVitals(amitVitals)
                .vitalsHistory(new ArrayList<>())
                .labResults(amitLabs)
                .medications(amitMeds)
                .organRiskHeatmap(amitRisk)
                .lastSynced(LocalDateTime.now())
                .build();

        amit.getVitalsHistory().add(Patient.VitalsRecord.builder()
                .vitalType("HeartRate").value(80.0).unit("bpm")
                .timestamp(LocalDateTime.now().minusMinutes(15)).build());

        patientRepository.save(amit);
        log.info("Patient Twin Amit seeded successfully!");

        // ------------------ Priya Patel Seeding ------------------
        log.info("Seeding Patient Twin: Priya...");
        Map<String, Integer> priyaRisk = new HashMap<>();
        priyaRisk.put("cardiovascular", 45);
        priyaRisk.put("renal", 72);
        priyaRisk.put("metabolic", 85);
        priyaRisk.put("pulmonary", 10);
        priyaRisk.put("hepatic", 20);

        List<Patient.ConditionInfo> priyaConditions = new ArrayList<>();
        priyaConditions.add(Patient.ConditionInfo.builder()
                .code("44054006")
                .system("http://snomed.info/sct")
                .display("T2 Diabetes")
                .severity("moderate")
                .onsetDate("2023-01-10")
                .build());
        priyaConditions.add(Patient.ConditionInfo.builder()
                .code("709044004")
                .system("http://snomed.info/sct")
                .display("Chronic Kidney Disease")
                .severity("moderate")
                .onsetDate("2023-06-15")
                .build());

        List<Patient.LabResult> priyaLabs = new ArrayList<>();
        priyaLabs.add(Patient.LabResult.builder()
                .code("4548-4").testName("HbA1c").value("8.1").unit("%")
                .referenceRange("4.0 - 5.6").date(LocalDateTime.now().minusDays(5)).build());
        priyaLabs.add(Patient.LabResult.builder()
                .code("33914-3").testName("eGFR").value("58").unit("mL/min/1.73m2")
                .referenceRange(">90").date(LocalDateTime.now().minusDays(5)).build());
        priyaLabs.add(Patient.LabResult.builder()
                .code("13457-7").testName("LDL").value("115").unit("mg/dL")
                .referenceRange("<100").date(LocalDateTime.now().minusDays(5)).build());

        List<Patient.MedicationInfo> priyaMeds = new ArrayList<>();
        priyaMeds.add(Patient.MedicationInfo.builder()
                .code("860975").name("Metformin 1000mg")
                .dosageInstruction("Take 1 tablet twice daily with meals")
                .status("active").datePrescribed("2023-01-12").build());
        priyaMeds.add(Patient.MedicationInfo.builder()
                .code("311354").name("Empagliflozin 10mg")
                .dosageInstruction("Take 1 tablet daily in the morning")
                .status("active").datePrescribed("2023-06-18").build());

        Patient.Vitals priyaVitals = Patient.Vitals.builder()
                .heartRate(75.0).bpSystolic("128").bpDiastolic("82")
                .spo2(99.0).temperature(36.5).respiratoryRate(14.0)
                .timestamp(LocalDateTime.now()).build();

        Patient priya = Patient.builder()
                .id("priya")
                .ehrId("priya")
                .sourceEhr("Epic EHR")
                .name("Priya Patel")
                .gender("Female")
                .birthDate("1992-08-14")
                .age(33)
                .contact("+1 (555) 234-5678")
                .conditions(priyaConditions)
                .currentVitals(priyaVitals)
                .vitalsHistory(new ArrayList<>())
                .labResults(priyaLabs)
                .medications(priyaMeds)
                .organRiskHeatmap(priyaRisk)
                .lastSynced(LocalDateTime.now())
                .build();

        priya.getVitalsHistory().add(Patient.VitalsRecord.builder()
                .vitalType("HeartRate").value(75.0).unit("bpm")
                .timestamp(LocalDateTime.now().minusMinutes(5)).build());

        patientRepository.save(priya);
        log.info("Patient Twin Priya seeded successfully!");

        // Seed Default Consents
        log.info("Seeding Default Consents...");
        Consent consent = Consent.builder()
                .patientId("saurabh")
                .patientName("Saurabh")
                .status("ACTIVE")
                .consentType("HIPAA-Authorization")
                .authorizedProviders(List.of("provider", "*"))
                .permittedResources(List.of("Patient", "Observation", "Condition", "Consent", "MedicationRequest"))
                .signedDate(LocalDateTime.now().minusMonths(3))
                .expirationDate(LocalDateTime.now().plusYears(1))
                .digitalSignature("Saurabh")
                .build();
        consentRepository.save(consent);

        Consent amitConsent = Consent.builder()
                .patientId("amit")
                .patientName("Amit Sharma")
                .status("ACTIVE")
                .consentType("HIPAA-Authorization")
                .authorizedProviders(List.of("provider", "*"))
                .permittedResources(List.of("Patient", "Observation", "Condition", "Consent", "MedicationRequest"))
                .signedDate(LocalDateTime.now().minusMonths(2))
                .expirationDate(LocalDateTime.now().plusYears(1))
                .digitalSignature("Amit Sharma")
                .build();
        consentRepository.save(amitConsent);

        Consent priyaConsent = Consent.builder()
                .patientId("priya")
                .patientName("Priya Patel")
                .status("ACTIVE")
                .consentType("HIPAA-Authorization")
                .authorizedProviders(List.of("provider", "*"))
                .permittedResources(List.of("Patient", "Observation", "Condition", "Consent", "MedicationRequest"))
                .signedDate(LocalDateTime.now().minusMonths(1))
                .expirationDate(LocalDateTime.now().plusYears(1))
                .digitalSignature("Priya Patel")
                .build();
        consentRepository.save(priyaConsent);

        // =================== SONU GUPTA ===================
        log.info("Seeding Patient Twin: Sonu...");
        Map<String, Integer> sonuRisk = new HashMap<>();
        sonuRisk.put("cardiovascular", 85);
        sonuRisk.put("renal", 40);
        sonuRisk.put("metabolic", 70);
        sonuRisk.put("pulmonary", 30);
        sonuRisk.put("hepatic", 25);

        List<Patient.ConditionInfo> sonuConditions = new ArrayList<>();
        sonuConditions.add(Patient.ConditionInfo.builder().code("44054006").system("http://snomed.info/sct")
                .display("T2 Diabetes").severity("severe").onsetDate("2019-03-11").build());
        sonuConditions.add(Patient.ConditionInfo.builder().code("38341003").system("http://snomed.info/sct")
                .display("Hypertension").severity("severe").onsetDate("2020-07-22").build());
        sonuConditions.add(Patient.ConditionInfo.builder().code("22298006").system("http://snomed.info/sct")
                .display("Myocardial Infarction").severity("moderate").onsetDate("2023-11-05").build());

        List<Patient.LabResult> sonuLabs = new ArrayList<>();
        sonuLabs.add(Patient.LabResult.builder().code("4548-4").testName("HbA1c").value("9.4").unit("%")
                .referenceRange("4.0 - 5.6").date(LocalDateTime.now().minusDays(3)).build());
        sonuLabs.add(Patient.LabResult.builder().code("33914-3").testName("eGFR").value("72").unit("mL/min/1.73m2")
                .referenceRange(">90").date(LocalDateTime.now().minusDays(3)).build());
        sonuLabs.add(Patient.LabResult.builder().code("13457-7").testName("Cholesterol").value("245").unit("mg/dL")
                .referenceRange("<200").date(LocalDateTime.now().minusDays(3)).build());
        sonuLabs.add(Patient.LabResult.builder().code("18262-6").testName("LDL").value("165").unit("mg/dL")
                .referenceRange("<100").date(LocalDateTime.now().minusDays(3)).build());

        List<Patient.MedicationInfo> sonuMeds = new ArrayList<>();
        sonuMeds.add(Patient.MedicationInfo.builder().code("860975").name("Metformin 1000mg")
                .dosageInstruction("Take 1 tablet twice daily with meals").status("active").datePrescribed("2019-03-15").build());
        sonuMeds.add(Patient.MedicationInfo.builder().code("311354").name("Amlodipine 5mg")
                .dosageInstruction("Take 1 tablet daily in morning").status("active").datePrescribed("2020-07-25").build());
        sonuMeds.add(Patient.MedicationInfo.builder().code("617314").name("Aspirin 75mg")
                .dosageInstruction("Take 1 tablet daily after food").status("active").datePrescribed("2023-11-06").build());

        Patient.Vitals sonuVitals = Patient.Vitals.builder()
                .heartRate(95.0).bpSystolic("155").bpDiastolic("98")
                .spo2(97.0).temperature(37.1).respiratoryRate(20.0)
                .timestamp(LocalDateTime.now()).build();

        Patient sonu = Patient.builder()
                .id("sonu").ehrId("sonu").sourceEhr("Fortis EHR")
                .name("Sonu Gupta").gender("Male").birthDate("1978-06-14").age(47)
                .contact("+91 99887 65432")
                .conditions(sonuConditions).currentVitals(sonuVitals).vitalsHistory(new ArrayList<>())
                .labResults(sonuLabs).medications(sonuMeds).organRiskHeatmap(sonuRisk)
                .lastSynced(LocalDateTime.now()).build();
        sonu.getVitalsHistory().add(Patient.VitalsRecord.builder().vitalType("HeartRate").value(95.0).unit("bpm")
                .timestamp(LocalDateTime.now().minusMinutes(8)).build());
        patientRepository.save(sonu);
        log.info("Patient Twin Sonu seeded successfully!");

        // =================== RIYA SINGH ===================
        log.info("Seeding Patient Twin: Riya...");
        Map<String, Integer> riyaRisk = new HashMap<>();
        riyaRisk.put("cardiovascular", 15);
        riyaRisk.put("renal", 20);
        riyaRisk.put("metabolic", 35);
        riyaRisk.put("pulmonary", 60);
        riyaRisk.put("hepatic", 10);

        List<Patient.ConditionInfo> riyaConditions = new ArrayList<>();
        riyaConditions.add(Patient.ConditionInfo.builder().code("59621000").system("http://snomed.info/sct")
                .display("Asthma").severity("moderate").onsetDate("2015-02-20").build());
        riyaConditions.add(Patient.ConditionInfo.builder().code("195967001").system("http://snomed.info/sct")
                .display("Allergic Rhinitis").severity("mild").onsetDate("2016-04-10").build());

        List<Patient.LabResult> riyaLabs = new ArrayList<>();
        riyaLabs.add(Patient.LabResult.builder().code("4548-4").testName("HbA1c").value("5.2").unit("%")
                .referenceRange("4.0 - 5.6").date(LocalDateTime.now().minusDays(20)).build());
        riyaLabs.add(Patient.LabResult.builder().code("33914-3").testName("eGFR").value("102").unit("mL/min/1.73m2")
                .referenceRange(">90").date(LocalDateTime.now().minusDays(20)).build());
        riyaLabs.add(Patient.LabResult.builder().code("13457-7").testName("LDL").value("85").unit("mg/dL")
                .referenceRange("<100").date(LocalDateTime.now().minusDays(20)).build());

        List<Patient.MedicationInfo> riyaMeds = new ArrayList<>();
        riyaMeds.add(Patient.MedicationInfo.builder().code("746763").name("Budesonide Inhaler")
                .dosageInstruction("Inhale 2 puffs twice daily").status("active").datePrescribed("2015-02-22").build());
        riyaMeds.add(Patient.MedicationInfo.builder().code("311354").name("Montelukast 10mg")
                .dosageInstruction("Take 1 tablet daily at night").status("active").datePrescribed("2016-04-12").build());

        Patient.Vitals riyaVitals = Patient.Vitals.builder()
                .heartRate(68.0).bpSystolic("112").bpDiastolic("72")
                .spo2(97.0).temperature(36.6).respiratoryRate(16.0)
                .timestamp(LocalDateTime.now()).build();

        Patient riya = Patient.builder()
                .id("riya").ehrId("riya").sourceEhr("Max EHR")
                .name("Riya Singh").gender("Female").birthDate("1998-11-03").age(27)
                .contact("+91 88776 54321")
                .conditions(riyaConditions).currentVitals(riyaVitals).vitalsHistory(new ArrayList<>())
                .labResults(riyaLabs).medications(riyaMeds).organRiskHeatmap(riyaRisk)
                .lastSynced(LocalDateTime.now()).build();
        riya.getVitalsHistory().add(Patient.VitalsRecord.builder().vitalType("SpO2").value(97.0).unit("%")
                .timestamp(LocalDateTime.now().minusMinutes(12)).build());
        patientRepository.save(riya);
        log.info("Patient Twin Riya seeded successfully!");

        // =================== RAHUL VERMA ===================
        log.info("Seeding Patient Twin: Rahul...");
        Map<String, Integer> rahulRisk = new HashMap<>();
        rahulRisk.put("cardiovascular", 55);
        rahulRisk.put("renal", 80);
        rahulRisk.put("metabolic", 60);
        rahulRisk.put("pulmonary", 20);
        rahulRisk.put("hepatic", 45);

        List<Patient.ConditionInfo> rahulConditions = new ArrayList<>();
        rahulConditions.add(Patient.ConditionInfo.builder().code("709044004").system("http://snomed.info/sct")
                .display("Chronic Kidney Disease Stage 3").severity("moderate").onsetDate("2021-08-15").build());
        rahulConditions.add(Patient.ConditionInfo.builder().code("38341003").system("http://snomed.info/sct")
                .display("Hypertension").severity("moderate").onsetDate("2020-03-10").build());
        rahulConditions.add(Patient.ConditionInfo.builder().code("197321007").system("http://snomed.info/sct")
                .display("Non-Alcoholic Fatty Liver Disease").severity("mild").onsetDate("2022-05-18").build());

        List<Patient.LabResult> rahulLabs = new ArrayList<>();
        rahulLabs.add(Patient.LabResult.builder().code("4548-4").testName("HbA1c").value("6.8").unit("%")
                .referenceRange("4.0 - 5.6").date(LocalDateTime.now().minusDays(7)).build());
        rahulLabs.add(Patient.LabResult.builder().code("33914-3").testName("eGFR").value("42").unit("mL/min/1.73m2")
                .referenceRange(">90").date(LocalDateTime.now().minusDays(7)).build());
        rahulLabs.add(Patient.LabResult.builder().code("14804-9").testName("Creatinine").value("2.1").unit("mg/dL")
                .referenceRange("0.6 - 1.2").date(LocalDateTime.now().minusDays(7)).build());
        rahulLabs.add(Patient.LabResult.builder().code("13457-7").testName("LDL").value("135").unit("mg/dL")
                .referenceRange("<100").date(LocalDateTime.now().minusDays(7)).build());

        List<Patient.MedicationInfo> rahulMeds = new ArrayList<>();
        rahulMeds.add(Patient.MedicationInfo.builder().code("311354").name("Lisinopril 20mg")
                .dosageInstruction("Take 1 tablet daily in morning").status("active").datePrescribed("2020-03-12").build());
        rahulMeds.add(Patient.MedicationInfo.builder().code("617314").name("Furosemide 40mg")
                .dosageInstruction("Take 1 tablet daily").status("active").datePrescribed("2021-08-18").build());

        Patient.Vitals rahulVitals = Patient.Vitals.builder()
                .heartRate(82.0).bpSystolic("148").bpDiastolic("92")
                .spo2(98.0).temperature(36.9).respiratoryRate(17.0)
                .timestamp(LocalDateTime.now()).build();

        Patient rahul = Patient.builder()
                .id("rahul").ehrId("rahul").sourceEhr("AIIMS EHR")
                .name("Rahul Verma").gender("Male").birthDate("1982-04-22").age(43)
                .contact("+91 77665 43210")
                .conditions(rahulConditions).currentVitals(rahulVitals).vitalsHistory(new ArrayList<>())
                .labResults(rahulLabs).medications(rahulMeds).organRiskHeatmap(rahulRisk)
                .lastSynced(LocalDateTime.now()).build();
        rahul.getVitalsHistory().add(Patient.VitalsRecord.builder().vitalType("HeartRate").value(82.0).unit("bpm")
                .timestamp(LocalDateTime.now().minusMinutes(20)).build());
        patientRepository.save(rahul);
        log.info("Patient Twin Rahul seeded successfully!");

        // =================== KAVYA NAIR ===================
        log.info("Seeding Patient Twin: Kavya...");
        Map<String, Integer> kavyaRisk = new HashMap<>();
        kavyaRisk.put("cardiovascular", 30);
        kavyaRisk.put("renal", 15);
        kavyaRisk.put("metabolic", 50);
        kavyaRisk.put("pulmonary", 12);
        kavyaRisk.put("hepatic", 55);

        List<Patient.ConditionInfo> kavyaConditions = new ArrayList<>();
        kavyaConditions.add(Patient.ConditionInfo.builder().code("197321007").system("http://snomed.info/sct")
                .display("Hypothyroidism").severity("mild").onsetDate("2020-09-05").build());
        kavyaConditions.add(Patient.ConditionInfo.builder().code("44054006").system("http://snomed.info/sct")
                .display("Pre-Diabetes").severity("mild").onsetDate("2023-03-18").build());

        List<Patient.LabResult> kavyaLabs = new ArrayList<>();
        kavyaLabs.add(Patient.LabResult.builder().code("4548-4").testName("HbA1c").value("6.1").unit("%")
                .referenceRange("4.0 - 5.6").date(LocalDateTime.now().minusDays(12)).build());
        kavyaLabs.add(Patient.LabResult.builder().code("33914-3").testName("eGFR").value("89").unit("mL/min/1.73m2")
                .referenceRange(">90").date(LocalDateTime.now().minusDays(12)).build());
        kavyaLabs.add(Patient.LabResult.builder().code("3016-3").testName("TSH").value("6.8").unit("mIU/L")
                .referenceRange("0.4 - 4.0").date(LocalDateTime.now().minusDays(12)).build());
        kavyaLabs.add(Patient.LabResult.builder().code("13457-7").testName("LDL").value("110").unit("mg/dL")
                .referenceRange("<100").date(LocalDateTime.now().minusDays(12)).build());

        List<Patient.MedicationInfo> kavyaMeds = new ArrayList<>();
        kavyaMeds.add(Patient.MedicationInfo.builder().code("617314").name("Levothyroxine 50mcg")
                .dosageInstruction("Take 1 tablet daily on empty stomach").status("active").datePrescribed("2020-09-08").build());
        kavyaMeds.add(Patient.MedicationInfo.builder().code("860975").name("Metformin 500mg")
                .dosageInstruction("Take 1 tablet daily with dinner").status("active").datePrescribed("2023-03-20").build());

        Patient.Vitals kavyaVitals = Patient.Vitals.builder()
                .heartRate(70.0).bpSystolic("118").bpDiastolic("76")
                .spo2(99.0).temperature(36.7).respiratoryRate(15.0)
                .timestamp(LocalDateTime.now()).build();

        Patient kavya = Patient.builder()
                .id("kavya").ehrId("kavya").sourceEhr("Manipal EHR")
                .name("Kavya Nair").gender("Female").birthDate("1995-07-29").age(30)
                .contact("+91 66554 32109")
                .conditions(kavyaConditions).currentVitals(kavyaVitals).vitalsHistory(new ArrayList<>())
                .labResults(kavyaLabs).medications(kavyaMeds).organRiskHeatmap(kavyaRisk)
                .lastSynced(LocalDateTime.now()).build();
        kavya.getVitalsHistory().add(Patient.VitalsRecord.builder().vitalType("HeartRate").value(70.0).unit("bpm")
                .timestamp(LocalDateTime.now().minusMinutes(18)).build());
        patientRepository.save(kavya);
        log.info("Patient Twin Kavya seeded successfully!");

        // =================== VIKRAM JOSHI ===================
        log.info("Seeding Patient Twin: Vikram...");
        Map<String, Integer> vikramRisk = new HashMap<>();
        vikramRisk.put("cardiovascular", 70);
        vikramRisk.put("renal", 35);
        vikramRisk.put("metabolic", 65);
        vikramRisk.put("pulmonary", 40);
        vikramRisk.put("hepatic", 30);

        List<Patient.ConditionInfo> vikramConditions = new ArrayList<>();
        vikramConditions.add(Patient.ConditionInfo.builder().code("44054006").system("http://snomed.info/sct")
                .display("T2 Diabetes").severity("moderate").onsetDate("2017-05-30").build());
        vikramConditions.add(Patient.ConditionInfo.builder().code("22298006").system("http://snomed.info/sct")
                .display("Coronary Artery Disease").severity("moderate").onsetDate("2022-01-14").build());
        vikramConditions.add(Patient.ConditionInfo.builder().code("59621000").system("http://snomed.info/sct")
                .display("Sleep Apnea").severity("mild").onsetDate("2021-09-20").build());

        List<Patient.LabResult> vikramLabs = new ArrayList<>();
        vikramLabs.add(Patient.LabResult.builder().code("4548-4").testName("HbA1c").value("8.5").unit("%")
                .referenceRange("4.0 - 5.6").date(LocalDateTime.now().minusDays(8)).build());
        vikramLabs.add(Patient.LabResult.builder().code("33914-3").testName("eGFR").value("78").unit("mL/min/1.73m2")
                .referenceRange(">90").date(LocalDateTime.now().minusDays(8)).build());
        vikramLabs.add(Patient.LabResult.builder().code("13457-7").testName("Cholesterol").value("228").unit("mg/dL")
                .referenceRange("<200").date(LocalDateTime.now().minusDays(8)).build());
        vikramLabs.add(Patient.LabResult.builder().code("18262-6").testName("LDL").value("145").unit("mg/dL")
                .referenceRange("<100").date(LocalDateTime.now().minusDays(8)).build());

        List<Patient.MedicationInfo> vikramMeds = new ArrayList<>();
        vikramMeds.add(Patient.MedicationInfo.builder().code("860975").name("Metformin 500mg")
                .dosageInstruction("Take 2 tablets twice daily with meals").status("active").datePrescribed("2017-06-01").build());
        vikramMeds.add(Patient.MedicationInfo.builder().code("617314").name("Atorvastatin 40mg")
                .dosageInstruction("Take 1 tablet at bedtime").status("active").datePrescribed("2022-01-16").build());
        vikramMeds.add(Patient.MedicationInfo.builder().code("311354").name("Clopidogrel 75mg")
                .dosageInstruction("Take 1 tablet daily after breakfast").status("active").datePrescribed("2022-01-16").build());

        Patient.Vitals vikramVitals = Patient.Vitals.builder()
                .heartRate(88.0).bpSystolic("142").bpDiastolic("90")
                .spo2(96.0).temperature(37.0).respiratoryRate(19.0)
                .timestamp(LocalDateTime.now()).build();

        Patient vikram = Patient.builder()
                .id("vikram").ehrId("vikram").sourceEhr("Narayana EHR")
                .name("Vikram Joshi").gender("Male").birthDate("1972-12-08").age(53)
                .contact("+91 55443 21098")
                .conditions(vikramConditions).currentVitals(vikramVitals).vitalsHistory(new ArrayList<>())
                .labResults(vikramLabs).medications(vikramMeds).organRiskHeatmap(vikramRisk)
                .lastSynced(LocalDateTime.now()).build();
        vikram.getVitalsHistory().add(Patient.VitalsRecord.builder().vitalType("HeartRate").value(88.0).unit("bpm")
                .timestamp(LocalDateTime.now().minusMinutes(6)).build());
        patientRepository.save(vikram);
        log.info("Patient Twin Vikram seeded successfully!");

        // =================== HIPAA CONSENTS FOR NEW PATIENTS ===================
        for (String[] pd : new String[][]{
                {"sonu",   "Sonu Gupta"},
                {"riya",   "Riya Singh"},
                {"rahul",  "Rahul Verma"},
                {"kavya",  "Kavya Nair"},
                {"vikram", "Vikram Joshi"}
        }) {
            consentRepository.save(Consent.builder()
                    .patientId(pd[0])
                    .patientName(pd[1])
                    .status("ACTIVE")
                    .consentType("HIPAA-Authorization")
                    .authorizedProviders(List.of("provider", "*"))
                    .permittedResources(List.of("Patient", "Observation", "Condition", "Consent", "MedicationRequest"))
                    .signedDate(LocalDateTime.now().minusWeeks(2))
                    .expirationDate(LocalDateTime.now().plusYears(1))
                    .digitalSignature(pd[1])
                    .build());
        }
        log.info("Default HIPAA Consents seeded successfully!");
    }
}
