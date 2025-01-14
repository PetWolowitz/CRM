import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';

const helpTopics = [
  {
    title: 'Dashboard',
    description: 'La dashboard fornisce una panoramica completa delle tue attività di vendita.',
    content: `
      - Visualizza KPI principali come fatturato, lead e tasso di conversione
      - Monitora l'andamento delle vendite con grafici interattivi
      - Analizza la distribuzione dei lead per fonte
      - Esporta report in vari formati
    `
  },
  {
    title: 'Gestione Contatti',
    description: 'Gestisci i tuoi contatti e converti i lead in clienti.',
    content: `
      - Aggiungi nuovi contatti con informazioni dettagliate
      - Converti lead in clienti
      - Filtra e cerca contatti
      - Gestisci informazioni di contatto
    `
  },
  {
    title: 'Pipeline Vendite',
    description: 'Monitora e gestisci le tue trattative commerciali.',
    content: `
      - Visualizza trattative in corso
      - Sposta deal tra le diverse fasi
      - Aggiungi note e attività
      - Monitora il valore delle opportunità
    `
  },
  {
    title: 'Calendario',
    description: 'Gestisci appuntamenti e scadenze.',
    content: `
      - Pianifica nuovi appuntamenti
      - Visualizza calendario mensile/settimanale/giornaliero
      - Imposta promemoria
      - Sincronizza con Google Calendar
    `
  },
  {
    title: 'Attività',
    description: 'Organizza e monitora le tue attività quotidiane.',
    content: `
      - Crea nuove attività
      - Assegna priorità e scadenze
      - Marca attività come completate
      - Filtra per stato e priorità
    `
  },
  {
    title: 'Fatturazione',
    description: 'Gestisci le fatture dei tuoi clienti.',
    content: `
      - Crea nuove fatture
      - Monitora lo stato dei pagamenti
      - Scarica fatture in PDF
      - Visualizza storico fatturazione
    `
  }
];

export function HelpDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Centro Assistenza</DialogTitle>
          <DialogDescription>
            Esplora le guide e le risorse per utilizzare al meglio il CRM
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-full pr-4">
          <Accordion type="single" collapsible className="w-full">
            {helpTopics.map((topic, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  <div>
                    <div className="font-medium">{topic.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {topic.description}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {topic.content.split('\n').map((line, i) => (
                      <p key={i} className="text-sm">
                        {line.trim()}
                      </p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-6 border-t pt-6">
            <h3 className="font-medium mb-2">Hai bisogno di ulteriore assistenza?</h3>
            <p className="text-sm text-muted-foreground">
              Contatta il nostro team di supporto all'indirizzo support@example.com
              o chiama il numero +39 02 1234567 dal lunedì al venerdì, 9:00-18:00.
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}