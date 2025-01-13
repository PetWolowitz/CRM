import { useState, useEffect } from 'react';
import { NotificationService } from '@/lib/notifications';
import { useToast } from '@/hooks/use-toast';

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    // Controlla le notifiche ogni minuto
    const interval = setInterval(() => {
      const newNotifications = NotificationService.checkNotifications();
      if (newNotifications.length > 0) {
        setNotifications(prev => [...prev, ...newNotifications]);
        newNotifications.forEach(notification => {
          toast({
            title: notification.title,
            description: notification.message,
          });
        });
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const scheduleNotification = (appointment) => {
    NotificationService.scheduleNotification(appointment);
  };

  const removeNotifications = (appointmentId) => {
    NotificationService.removeNotifications(appointmentId);
  };

  return {
    notifications,
    scheduleNotification,
    removeNotifications,
  };
}