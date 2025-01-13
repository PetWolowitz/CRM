import { useState, useCallback, useEffect } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { it } from 'date-fns/locale';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { AppointmentDialog } from '@/components/appointments/AppointmentDialog';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';
import { useCalendarSync } from '@/hooks/use-calendar-sync';
import { useNotifications } from '@/hooks/use-notifications';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// ... (resto del codice esistente)

export function CalendarPage() {
  // ... (stato esistente)
  const { scheduleNotification, removeNotifications } = useNotifications();

  const handleSaveAppointment = async (appointmentData) => {
    let updatedAppointments;
    if (appointmentData.id) {
      updatedAppointments = appointments.map(app => 
        app.id === appointmentData.id ? appointmentData : app
      );
      toast({
        title: "Appuntamento aggiornato",
        description: "Le modifiche sono state salvate con successo",
      });
      // Aggiorna le notifiche per l'appuntamento modificato
      removeNotifications(appointmentData.id);
      scheduleNotification(appointmentData);
    } else {
      const newAppointment = {
        ...appointmentData,
        id: Date.now().toString(),
      };
      updatedAppointments = [...appointments, newAppointment];
      toast({
        title: "Appuntamento creato",
        description: "L'appuntamento è stato aggiunto al calendario",
      });
      // Pianifica le notifiche per il nuovo appuntamento
      scheduleNotification(newAppointment);
    }
    
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setIsDialogOpen(false);

    // Sincronizza con Google Calendar se connesso
    if (isConnected) {
      await sync([appointmentData]);
    }
  };

  const handleDeleteAppointment = () => {
    if (selectedAppointment) {
      // Rimuovi le notifiche associate all'appuntamento
      removeNotifications(selectedAppointment.id);
      
      const updatedAppointments = appointments.filter(app => app.id !== selectedAppointment.id);
      setAppointments(updatedAppointments);
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      toast({
        title: "Appuntamento eliminato",
        description: "L'appuntamento è stato rimosso dal calendario",
      });
      setIsDeleteDialogOpen(false);
      setIsDialogOpen(false);
      setSelectedAppointment(null);
    }
  };

  // ... (resto del codice esistente)
}