import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, UserCheck, Mail, Phone, Building } from 'lucide-react';
import { ContactDialog } from '@/components/contacts/ContactDialog';
import { ContactDetails } from '@/components/contacts/ContactDetails';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ContentCard } from '@/components/ui/shared/ContentCard';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { contactScoringService } from '@/lib/contact-scoring';
import { contactSegmentationService } from '@/lib/contact-segmentation';
import { interactionTrackingService } from '@/lib/interaction-tracking';
import { socialIntegrationService } from '@/lib/social-integration';

// Mock data arricchito con scoring e segmentazione
const enrichedMockContacts = [
  {
    id: '1',
    name: 'Mario Rossi',
    company: 'Acme Corp',
    email: 'mario.rossi@acme.com',
    phone: '+39 123 456 7890',
    type: 'lead',
    notes: 'Interessato ai nostri servizi premium',
    score: 85,
    conversionProbability: 75,
    engagementScore: 82,
    profileCompleteness: 90,
    daysSinceLastContact: 2,
    industryScore: 0.9,
    segments: [
      { id: 'high-value', name: 'Alto Valore', description: 'Lead con alto potenziale' },
      { id: 'engaged', name: 'Molto Coinvolti', description: 'Lead attivamente coinvolti' }
    ],
    interactions: [
      {
        type: 'email',
        title: 'Email di follow-up',
        description: 'Inviata proposta commerciale',
        timestamp: '2024-03-18T10:30:00Z'
      },
      {
        type: 'call',
        title: 'Chiamata commerciale',
        description: 'Discussione dettagli proposta',
        timestamp: '2024-03-15T14:00:00Z'
      }
    ],
    linkedin: 'https://linkedin.com/in/mario-rossi',
    linkedInProfile: {
      position: 'Sales Director',
      company: 'Acme Corp',
      connections: 500
    }
  },
  // ... altri contatti arricchiti
];

export function Contacts() {
  const [contacts, setContacts] = useState(enrichedMockContacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSaveContact = async (contactData) => {
    try {
      // Calcola scoring e segmentazione
      const enrichedContact = {
        ...contactData,
        score: await contactScoringService.predictConversionProbability(contactData),
        segments: contactSegmentationService.evaluateContact(contactData),
        interactions: interactionTrackingService.getInteractions(contactData.id),
        ...(await socialIntegrationService.enrichContactData(contactData))
      };

      if (contactData.id) {
        setContacts(prev => prev.map(contact => 
          contact.id === contactData.id ? enrichedContact : contact
        ));
        toast({
          title: "Contatto aggiornato",
          description: "Le modifiche sono state salvate con successo",
        });
      } else {
        const newContact = {
          ...enrichedContact,
          id: Date.now().toString(),
        };
        setContacts(prev => [...prev, newContact]);
        toast({
          title: "Contatto aggiunto",
          description: "Il nuovo contatto è stato creato con successo",
        });
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante il salvataggio",
        variant: "destructive",
      });
    }
  };

  const convertToCustomer = (contact) => {
    setContacts(prev => prev.filter(c => c.id !== contact.id));
    toast({
      title: "Contatto convertito",
      description: `${contact.name} è stato convertito in cliente`,
    });
    navigate('/customers', { 
      state: { 
        newCustomer: {
          ...contact,
          type: 'customer',
        }
      }
    });
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Contatti</h1>
        <Button onClick={() => {
          setSelectedContact(null);
          setIsDialogOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Nuovo Contatto
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Cerca contatti..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredContacts.map((contact) => (
          <Sheet key={contact.id}>
            <SheetTrigger asChild>
              <div>
                <ContentCard
                  title={contact.name}
                  subtitle={
                    <span className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {contact.company}
                    </span>
                  }
                  metadata={[
                    { icon: Mail, content: contact.email },
                    { icon: Phone, content: contact.phone }
                  ]}
                  rightAction={
                    contact.type === 'lead' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => convertToCustomer(contact)}
                      >
                        <UserCheck className="h-4 w-4 mr-2" />
                        Converti
                      </Button>
                    )
                  }
                  actions={[
                    {
                      label: "Modifica",
                      onClick: () => {
                        setSelectedContact(contact);
                        setIsDialogOpen(true);
                      }
                    }
                  ]}
                />
              </div>
            </SheetTrigger>
            <SheetContent className="w-[90vw] sm:max-w-2xl">
              <SheetHeader>
                <SheetTitle>{contact.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <ContactDetails contact={contact} />
              </div>
            </SheetContent>
          </Sheet>
        ))}
      </div>

      <ContactDialog
        contact={selectedContact}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveContact}
      />
    </div>
  );
}