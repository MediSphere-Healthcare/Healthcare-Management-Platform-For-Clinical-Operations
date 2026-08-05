// Kafka Integration: alerts-stream listener
class AlertsStreamListener {
  constructor() {
    this.listeners = [];
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  publishAlert(alertEvent) {
    this.listeners.forEach(cb => cb(alertEvent));
  }
}

export const alertsStream = new AlertsStreamListener();
