// Simulazione del sistema di notifiche
export class NotificationService {
  static getNotifications() {
    const stored = localStorage.getItem('notifications');
    return stored ? JSON.parse(stored) : [];
  }

  static saveNotifications(notifications) {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }

  static scheduleNotification(appointment) {
    const notifications = this.getNotifications();
    
    // Crea notifica per 24 ore prima
    const dayBefore = new Date(appointment.start);
    dayBefore.setHours(dayBefore.getHours() - 24);
    
    // Crea notifica per 1 ora prima
    const hourBefore = new Date(appointment.start);
    hourBefore.setHours(hourBefore.getHours() - 1);

    notifications.push({
      id: `${appointment.id}-24h`,
      appointmentId: appointment.id,
      title: appointment.title,
      message: `Promemoria: hai un appuntamento domani alle ${new Date(appointment.start).toLocaleTimeString()}`,
      scheduledFor: dayBefore.toISOString(),
      type: 'appointment',
      status: 'pending'
    });

    notifications.push({
      id: `${appointment.id}-1h`,
      appointmentId: appointment.id,
      title: appointment.title,
      message: `Promemoria: hai un appuntamento tra un'ora alle ${new Date(appointment.start).toLocaleTimeString()}`,
      scheduledFor: hourBefore.toISOString(),
      type: 'appointment',
      status: 'pending'
    });

    this.saveNotifications(notifications);
  }

  static removeNotifications(appointmentId) {
    const notifications = this.getNotifications();
    const filtered = notifications.filter(n => n.appointmentId !== appointmentId);
    this.saveNotifications(filtered);
  }

  static checkNotifications() {
    const notifications = this.getNotifications();
    const now = new Date();
    const pending = notifications.filter(n => 
      n.status === 'pending' && new Date(n.scheduledFor) <= now
    );

    if (pending.length > 0) {
      pending.forEach(n => {
        n.status = 'sent';
        // In un'implementazione reale, qui invieremmo l'email
        console.log('Sending notification:', n);
      });
      this.saveNotifications(notifications);
      return pending;
    }

    return [];
  }
}