import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, DollarSign, Calendar, Mail, Settings, MessageSquare } from 'lucide-react';
import { LeadDialog } from '@/components/leads/LeadDialog';
import { EmailTemplate } from '@/components/leads/EmailTemplate';
import { Timeline } from '@/components/leads/Timeline';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const initialColumns = {
  'col-1': {
    id: 'col-1',
    title: 'Nuovo Lead',
    leadIds: ['1', '2'],
  },
  'col-2': {
    id: 'col-2',
    title: 'Contattato',
    leadIds: ['3'],
  },
  'col-3': {
    id: 'col-3',
    title: 'Proposta',
    leadIds: ['4'],
  },
  'col-4': {
    id: 'col-4',
    title: 'Negoziazione',
    leadIds: ['5'],
  },
};

const initialLeads = {
  '1': {
    id: '1',
    title: 'Acme Corp',
    value: 50000,
    nextAction: new Date('2024-03-20'),
    description: 'Interessati al nostro servizio premium',
    email: 'contact@acme.com',
  },
  '2': {
    id: '2',
    title: 'Globex Corporation',
    value: 75000,
    nextAction: new Date('2024-03-22'),
    description: 'Richiesta demo prodotto',
    email: 'info@globex.com',
  },
  '3': {
    id: '3',
    title: 'Stark Industries',
    value: 100000,
    nextAction: new Date('2024-03-25'),
    description: 'Follow-up dopo la demo',
    email: 'procurement@stark.com',
  },
  '4': {
    id: '4',
    title: 'Wayne Enterprises',
    value: 150000,
    nextAction: new Date('2024-03-28'),
    description: 'In attesa di feedback sulla proposta',
    email: 'deals@wayne.com',
  },
  '5': {
    id: '5',
    title: 'Oscorp Industries',
    value: 200000,
    nextAction: new Date('2024-03-30'),
    description: 'Negoziazione termini contrattuali',
    email: 'legal@oscorp.com',
  },
};

export function Deals() {
  const [columns, setColumns] = useState(initialColumns);
  const [leads, setLeads] = useState(initialLeads);
  const [selectedLead, setSelectedLead] = useState(null);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newLeadIds = Array.from(start.leadIds);
      newLeadIds.splice(source.index, 1);
      newLeadIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        leadIds: newLeadIds,
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
      return;
    }

    const startLeadIds = Array.from(start.leadIds);
    startLeadIds.splice(source.index, 1);
    const newStart = {
      ...start,
      leadIds: startLeadIds,
    };

    const finishLeadIds = Array.from(finish.leadIds);
    finishLeadIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      leadIds: finishLeadIds,
    };

    setColumns({
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });
  };

  const getTotalValue = (columnId) => {
    return columns[columnId].leadIds.reduce((total, leadId) => {
      return total + (leads[leadId]?.value || 0);
    }, 0);
  };

  const handleSaveLead = (leadData) => {
    const newLead = {
      ...leadData,
      id: leadData.id || String(Date.now()),
    };

    setLeads((prev) => ({
      ...prev,
      [newLead.id]: newLead,
    }));

    if (!leadData.id) {
      const firstColumn = Object.values(columns)[0];
      setColumns((prev) => ({
        ...prev,
        [firstColumn.id]: {
          ...firstColumn,
          leadIds: [newLead.id, ...firstColumn.leadIds],
        },
      }));
    }
  };

  const mockActivities = [
    {
      type: 'status',
      title: 'Lead spostato in Contattato',
      description: 'Il lead è stato spostato da Nuovo Lead a Contattato',
      date: '2 ore fa',
    },
    {
      type: 'email',
      title: 'Email inviata',
      description: 'Inviata proposta commerciale',
      date: 'Ieri',
    },
    {
      type: 'note',
      title: 'Nota aggiunta',
      description: 'Cliente interessato al pacchetto enterprise',
      date: '2 giorni fa',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Pipeline Lead</h1>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Gestisci Stati
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Gestione Stati Pipeline</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <p className="text-muted-foreground">
                  Qui potrai gestire gli stati della tua pipeline di vendita.
                </p>
              </div>
            </DialogContent>
          </Dialog>
          
          <LeadDialog
            onSave={handleSaveLead}
            trigger={
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Nuovo Lead
              </Button>
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[calc(100vh-12rem)] overflow-hidden">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.values(columns).map((column) => (
            <div key={column.id} className="flex flex-col h-full">
              <div className="mb-4">
                <h2 className="font-semibold text-lg mb-1">{column.title}</h2>
                <div className="text-sm text-muted-foreground">
                  Valore totale: €{getTotalValue(column.id).toLocaleString()}
                </div>
              </div>

              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex-1 overflow-y-auto"
                  >
                    <div className="space-y-3">
                      {column.leadIds.map((leadId, index) => {
                        const lead = leads[leadId];
                        return (
                          <Draggable
                            key={lead.id}
                            draggableId={lead.id}
                            index={index}
                          >
                            {(provided) => (
                              <Sheet>
                                <SheetTrigger asChild>
                                  <Card
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                                    onClick={() => setSelectedLead(lead)}
                                  >
                                    <h3 className="font-medium mb-2">{lead.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-3">
                                      {lead.description}
                                    </p>
                                    <div className="flex items-center justify-between text-sm">
                                      <div className="flex items-center text-muted-foreground">
                                        <DollarSign className="h-4 w-4 mr-1" />
                                        €{lead.value.toLocaleString()}
                                      </div>
                                      <div className="flex items-center text-muted-foreground">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {new Date(lead.nextAction).toLocaleDateString()}
                                      </div>
                                    </div>
                                  </Card>
                                </SheetTrigger>
                                <SheetContent className="sm:max-w-[600px]">
                                  <SheetHeader>
                                    <SheetTitle>{lead.title}</SheetTitle>
                                  </SheetHeader>
                                  <div className="mt-6">
                                    <Tabs defaultValue="details">
                                      <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="details">Dettagli</TabsTrigger>
                                        <TabsTrigger value="timeline">Timeline</TabsTrigger>
                                        <TabsTrigger value="email">Email</TabsTrigger>
                                      </TabsList>
                                      <TabsContent value="details" className="mt-4">
                                        <LeadDialog
                                          lead={lead}
                                          onSave={handleSaveLead}
                                          trigger={
                                            <Button variant="outline" className="w-full">
                                              Modifica
                                            </Button>
                                          }
                                        />
                                      </TabsContent>
                                      <TabsContent value="timeline" className="mt-4">
                                        <Timeline activities={mockActivities} />
                                      </TabsContent>
                                      <TabsContent value="email" className="mt-4">
                                        <EmailTemplate lead={lead} />
                                      </TabsContent>
                                    </Tabs>
                                  </div>
                                </SheetContent>
                              </Sheet>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}