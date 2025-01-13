import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Mail, Phone, Building, Calendar } from 'lucide-react';
import { ContactDialog } from '@/components/contacts/ContactDialog';
import { ContentCard } from '@/components/ui/shared/ContentCard';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
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

const mockCustomers = [
  {
    id: '3',
    name: 'Anna Bianchi',
    company: 'InnovaTech',
    email: 'anna.b@innovatech.com',
    phone: '+39 333 444 5555',
    type: 'customer',
    notes: 'Cliente premium, contratto rinnovato',
  },
  {
    id: '4',
    name: 'Marco Neri',
    company: 'Digital Solutions',
    email: 'm.neri@digitalsolutions.it',
    phone: '+39 666 777 8888',
    type: 'customer',
    notes: 'Upgrade pacchetto servizi',
  },
];

export function Customers() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDeleteCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setCustomers(prev => prev.filter(c => c.id !== selectedCustomer.id));
    setIsDeleteDialogOpen(false);
    setSelectedCustomer(null);
    toast({
      title: "Cliente eliminato",
      description: "Il cliente è stato eliminato con successo",
    });
  };

  const handleSaveCustomer = (customerData) => {
    if (customerData.id) {
      setCustomers(prev => prev.map(customer => 
        customer.id === customerData.id ? customerData : customer
      ));
      toast({
        title: "Cliente aggiornato",
        description: "Le modifiche sono state salvate con successo",
      });
    } else {
      const newCustomer = {
        ...customerData,
        id: Date.now().toString(),
        type: 'customer',
      };
      setCustomers(prev => [...prev, newCustomer]);
      toast({
        title: "Cliente aggiunto",
        description: "Il nuovo cliente è stato creato con successo",
      });
    }
    setIsDialogOpen(false);
  };

  const navigateToCalendar = (customer) => {
    navigate('/calendar', {
      state: {
        createAppointment: true,
        customer: customer
      }
    });
  };

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Clienti</h1>
        <Button onClick={() => {
          setSelectedCustomer(null);
          setIsDialogOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Nuovo Cliente
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Cerca clienti..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCustomers.map((customer) => (
          <ContentCard
            key={customer.id}
            title={customer.name}
            subtitle={
              <span className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                {customer.company}
              </span>
            }
            metadata={[
              { icon: Mail, content: customer.email },
              { icon: Phone, content: customer.phone }
            ]}
            rightAction={
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateToCalendar(customer)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Appuntamento
              </Button>
            }
            onDelete={() => handleDeleteCustomer(customer)}
            actions={[
              {
                label: "Modifica",
                onClick: () => {
                  setSelectedCustomer(customer);
                  setIsDialogOpen(true);
                }
              }
            ]}
          />
        ))}
      </div>

      <ContactDialog
        contact={selectedCustomer}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveCustomer}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
            <AlertDialogDescription>
              Questa azione non può essere annullata. Il cliente verrà eliminato permanentemente.
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