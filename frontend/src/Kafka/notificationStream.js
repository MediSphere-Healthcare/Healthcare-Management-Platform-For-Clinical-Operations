// Kafka Integration: notification-stream listener
class NotificationStreamListener {
  constructor() {
    this.listeners = [];
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  pushNotification(notification) {
    this.listeners.forEach(cb => cb(notification));
  }
}

export const notificationStream = new NotificationStreamListener();
