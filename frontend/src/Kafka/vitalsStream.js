// Kafka Integration: vitals-stream listener & simulation subscriber
import { ENDPOINTS } from '../Backend/apiConfig';

class VitalsStreamListener {
  constructor() {
    this.listeners = [];
    this.socket = null;
    this.simulationTimer = null;
    this.isSimulating = false;
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify(vitalsPayload) {
    this.listeners.forEach(cb => cb(vitalsPayload));
  }

  connectWebSocket() {
    try {
      this.socket = new WebSocket(ENDPOINTS.KAFKA_WEBSOCKET);
      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.notify(data);
      };
      this.socket.onerror = (err) => {
        console.warn('Kafka WebSocket error, starting simulated vitals stream...', err);
        this.startSimulation();
      };
    } catch (e) {
      this.startSimulation();
    }
  }

  startSimulation() {
    if (this.isSimulating) return;
    this.isSimulating = true;

    this.simulationTimer = setInterval(() => {
      // Generate randomized realistic vital updates
      const baseHR = 72 + Math.floor(Math.random() * 15) - 5;
      const baseBP = 120 + Math.floor(Math.random() * 20) - 5;
      const baseSpO2 = 94 + Math.floor(Math.random() * 6);
      const baseTemp = (36.5 + Math.random() * 1.2).toFixed(1);

      const payload = {
        topic: 'vitals-stream',
        patientId: 'saurabh',
        patientName: 'Saurabh Kumar',
        heartRate: baseHR,
        bpSystolic: baseBP,
        bpDiastolic: Math.floor(baseBP * 0.65),
        spo2: baseSpO2,
        temperature: parseFloat(baseTemp),
        timestamp: new Date().toLocaleTimeString()
      };

      this.notify(payload);
    }, 4000);
  }

  stopSimulation() {
    if (this.simulationTimer) clearInterval(this.simulationTimer);
    this.isSimulating = false;
  }
}

export const vitalsStream = new VitalsStreamListener();
