import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useCalendarSync() {
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  const connect = async () => {
    toast({
      title: "Funzionalità non disponibile",
      description: "La sincronizzazione con Google Calendar sarà disponibile a breve",
      variant: "destructive",
    });
  };

  const sync = async (events) => {
    toast({
      title: "Funzionalità non disponibile",
      description: "La sincronizzazione con Google Calendar sarà disponibile a breve",
      variant: "destructive",
    });
  };

  return {
    isConnected,
    isSyncing,
    connect,
    sync,
  };
}