import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, UserCheck, Mail, Phone, Building } from 'lucide-react';
import { ContactDialog } from '@/components/contacts/ContactDialog';
import { ContentCard } from '@/components/ui/shared/ContentCard';
import { useToast } from '@/hooks/use-toast';
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

const mockContacts = [
  {
    id: '1',
    name: 'Mario Rossi',
    company: 'Acme Corp',
    email: 'mario.rossi@acme.com',
    phone: '+39 123 456 7890',
    type: 'lead',
    notes: 'Interessato ai nostri servizi premium',
  },
  {
    id: '2',
    name: 'Luigi Verdi',
    company: 'TechStart',
    email: 'l.verdi@techstart.it',
    phone: '+39 098 765 4321',
    type: 'lead',
    notes: 'Da ricontattare per demo',
  },
];

export function Contacts() {
  const [contacts, setContacts] = useState(mockContacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleDeleteContact = (contact) => {
    setSelectedContact(contact);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setContacts(prev => prev.filter(c => c.id !== selectedContact.id));
    setIsDeleteDialogOpen(false);
    setSelectedContact(null);
    toast({
      title: "Contatto eliminato",
      description: "Il contatto è stato eliminato con successo",
    });
  };

  const handleSaveContact = (contactData) => {
    if (contactData.id) {
      setContacts(prev => prev.map(contact => 
        contact.id === contactData.id ? contactData : contact
      ));
      toast({
        title: "Contatto aggiornato",
        description: "Le modifiche sono state salvate con successo",
      });
    } else {
      const newContact = {
        ...contactData,
        id: Date.now().toString(),
      };
      setContacts(prev => [...prev, newContact]);
      toast({
        title: "Contatto aggiunto",
        description: "Il nuovo contatto è stato creato con successo",
      });
    }
    setIsDialogOpen(false);
  };

  const convertToCustomer = (contact) => {
    setContacts(prev => prev.map(c => 
      c.id === contact.id ? { ...c, type: 'customer' } : c
    ));
    toast({
      title: "Contatto convertito",
      description: `${contact.name} è stato convertito in cliente`,
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
          <ContentCard
            key={contact.id}
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
            onDelete={() => handleDeleteContact(contact)}
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
        ))}
      </div>

      <ContactDialog
        contact={selectedContact}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveContact}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
            <AlertDialogDescription>
              Questa azione non può essere annullata. Il contatto verrà eliminato permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Elimina
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}