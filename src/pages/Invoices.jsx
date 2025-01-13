import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, FileText, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

// Funzione per generare ID univoci
const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Funzione per generare numeri di fattura univoci
const generateInvoiceNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `INV-${year}-${random}`;
};

const mockInvoices = [
  {
    id: generateUniqueId(),
    number: 'INV-2024-001',
    dealId: '5',
    dealTitle: 'Oscorp Industries',
    amount: 200000,
    completedAt: new Date('2024-03-15'),
    dueDate: new Date('2024-04-15'),
    status: 'pending', // pending, paid, overdue
    notes: 'Servizi di consulenza Q1 2024',
  },
];

export function Invoices() {
  const [invoices, setInvoices] = useState(mockInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewInvoiceDialogOpen, setIsNewInvoiceDialogOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    dealTitle: '',
    amount: '',
    dueDate: '',
    notes: '',
  });
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.newInvoice) {
      const invoiceWithUniqueId = {
        ...location.state.newInvoice,
        id: generateUniqueId(),
      };
      setInvoices(prev => [...prev, invoiceWithUniqueId]);
      toast({
        title: "Fattura creata",
        description: location.state.message || "La fattura è stata creata con successo",
      });
      // Pulisci lo state per evitare duplicati al refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleDownloadPdf = (invoice) => {
    toast({
      title: "Download iniziato",
      description: `Scaricamento fattura ${invoice.number}`,
    });
  };

  const handleCreateInvoice = () => {
    const invoice = {
      id: generateUniqueId(),
      number: generateInvoiceNumber(),
      dealTitle: newInvoice.dealTitle,
      amount: parseFloat(newInvoice.amount),
      completedAt: new Date(),
      dueDate: new Date(newInvoice.dueDate),
      status: 'pending',
      notes: newInvoice.notes,
    };

    setInvoices(prev => [...prev, invoice]);
    setIsNewInvoiceDialogOpen(false);
    setNewInvoice({
      dealTitle: '',
      amount: '',
      dueDate: '',
      notes: '',
    });

    toast({
      title: "Fattura creata",
      description: "La fattura è stata creata con successo",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'text-green-500';
      case 'overdue':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'paid':
        return 'Pagata';
      case 'overdue':
        return 'Scaduta';
      default:
        return 'In attesa';
    }
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.dealTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Fatture</h1>
        <Button onClick={() => setIsNewInvoiceDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuova Fattura
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Cerca fatture..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredInvoices.map((invoice) => (
          <Card key={invoice.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-medium">{invoice.number}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{invoice.dealTitle}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">€{invoice.amount.toLocaleString()}</p>
                <p className={`text-sm ${getStatusColor(invoice.status)}`}>
                  {getStatusText(invoice.status)}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <div>
                <p>Data: {new Date(invoice.completedAt).toLocaleDateString()}</p>
                <p>Scadenza: {new Date(invoice.dueDate).toLocaleDateString()}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownloadPdf(invoice)}
              >
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isNewInvoiceDialogOpen} onOpenChange={setIsNewInvoiceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuova Fattura</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="dealTitle">Cliente/Titolo</Label>
              <Input
                id="dealTitle"
                value={newInvoice.dealTitle}
                onChange={(e) => setNewInvoice({ ...newInvoice, dealTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Importo (€)</Label>
              <Input
                id="amount"
                type="number"
                value={newInvoice.amount}
                onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Data Scadenza</Label>
              <Input
                id="dueDate"
                type="date"
                value={newInvoice.dueDate}
                onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Note</Label>
              <Input
                id="notes"
                value={newInvoice.notes}
                onChange={(e) => setNewInvoice({ ...newInvoice, notes: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewInvoiceDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleCreateInvoice}>
              Crea Fattura
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}